#!/usr/bin/env bun
/** Fetch the official Linear docs listed by https://linear.app/llms.txt. */

import {
  closeSync,
  existsSync,
  mkdirSync,
  openSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { randomUUID } from "node:crypto";
import { dirname, isAbsolute, join, posix, relative, resolve, sep } from "node:path";

const MANIFEST_URL = "https://linear.app/llms.txt";
const GRAPHQL_SCHEMA_URL = "https://raw.githubusercontent.com/linear/linear/master/packages/sdk/src/schema.graphql";
const SDK_REPOSITORY_URL = "https://github.com/linear/linear/tree/master/packages/sdk";
const NON_MIRRORED_RESOURCE_URLS = new Set([SDK_REPOSITORY_URL]);
const KNOWN_INCOMPLETE_URLS = new Set(["https://linear.app/docs/github-integration.md"]);
const SKILL_DIR = join(import.meta.dir, "../skills/linear-docs");
const OUT_DIR = join(SKILL_DIR, "references");
const STAGING_DIR = join(SKILL_DIR, ".references-next");
const BACKUP_DIR = join(SKILL_DIR, ".references-previous");
const GC_DIR = join(SKILL_DIR, ".references-gc");
const LOCK_FILE = join(SKILL_DIR, ".update.lock");
const USER_AGENT = "wenerme-ai-linear-docs-fetcher/1.0";
const CONCURRENCY = 4;
const MIN_EXPECTED_LINKS = 120;
const MAX_LINKS = 300;
const MAX_RETRIES = 3;
const REQUEST_TIMEOUT_MS = 45_000;

export interface LinearDocLink {
  label: string;
  url: string;
  filepath: string;
}

interface DirectoryStats {
  files: number;
  bytes: number;
  sizes: Map<string, number>;
}

interface LinearPage extends LinearDocLink {
  content: string;
}

interface ReplacementPaths {
  outDir: string;
  stagingDir: string;
  backupDir: string;
  gcDir: string;
}

const REPLACEMENT_PATHS: ReplacementPaths = {
  outDir: OUT_DIR,
  stagingDir: STAGING_DIR,
  backupDir: BACKUP_DIR,
  gcDir: GC_DIR,
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function retryDelayMs(attempt: number, retryAfter: string | null): number {
  if (retryAfter) {
    const seconds = Number(retryAfter);
    if (Number.isFinite(seconds) && seconds > 0) return seconds * 1000;
    const at = Date.parse(retryAfter);
    if (Number.isFinite(at)) return Math.max(0, at - Date.now());
  }
  return Math.min(15_000, 750 * 2 ** attempt) + Math.floor(Math.random() * 250);
}

function isRetryableStatus(status: number): boolean {
  return status === 408 || status === 429 || (status >= 500 && status < 600);
}

async function fetchText(url: string, accept: string): Promise<{ response: Response; text: string }> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    let response: Response;
    let text: string;
    try {
      response = await fetch(url, {
        headers: { Accept: accept, "User-Agent": USER_AGENT },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      text = await response.text();
    } catch (error) {
      if (attempt === MAX_RETRIES) throw error;
      const delay = retryDelayMs(attempt, null);
      console.log(`Retrying ${url} after ${String(error)} in ${delay}ms`);
      await sleep(delay);
      continue;
    }

    if (response.ok) return { response, text };
    if (!isRetryableStatus(response.status) || attempt === MAX_RETRIES) {
      throw new Error(`${url} failed: HTTP ${response.status}`);
    }
    const delay = retryDelayMs(attempt, response.headers.get("retry-after"));
    console.log(`Retrying ${url} after HTTP ${response.status} in ${delay}ms`);
    await sleep(delay);
  }
  throw new Error(`Unreachable retry state for ${url}`);
}

export function sourceFilepath(rawUrl: string): string {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error(`Invalid Linear docs URL: ${rawUrl}`);
  }
  if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash) {
    throw new Error(`Unexpected Linear docs URL form: ${rawUrl}`);
  }

  if (url.origin === "https://linear.app") {
    if (url.pathname.includes("%")) throw new Error(`Encoded Linear docs path is not allowed: ${rawUrl}`);
    const match = /^\/(docs|developers)\/([A-Za-z0-9][A-Za-z0-9._/-]*\.md)$/.exec(url.pathname);
    if (!match) throw new Error(`Unexpected Linear docs path: ${rawUrl}`);
    const filepath = `${match[1]}/${match[2]}`;
    if (
      posix.normalize(filepath) !== filepath
      || filepath.split("/").some((part) => part === "." || part === "..")
    ) {
      throw new Error(`Unsafe Linear docs path: ${rawUrl}`);
    }
    return filepath;
  }

  if (url.toString() === GRAPHQL_SCHEMA_URL) return "developers/schema.graphql";
  throw new Error(`Unexpected Linear docs source: ${rawUrl}`);
}

export function portablePathKey(filepath: string): string {
  return filepath.normalize("NFC").toLowerCase();
}

export function parseLlmsManifest(source: string): LinearDocLink[] {
  const links: LinearDocLink[] = [];
  const seenUrls = new Set<string>();
  const normalized = source.replace(/\r\n/g, "\n");
  const markdownUrls = new Set<string>();
  const linkPattern = /\[([^\]\n]+)\]\((https:\/\/[^\s)]+)\)/g;
  for (const match of normalized.matchAll(linkPattern)) {
    const [, label, url] = match;
    markdownUrls.add(url);
    if (NON_MIRRORED_RESOURCE_URLS.has(url) || seenUrls.has(url)) continue;
    seenUrls.add(url);
    links.push({ label, url, filepath: sourceFilepath(url) });
  }

  const unsupportedLink = /\[[^\]\n]+\]\((?!https:\/\/)([^)\s]+)\)/.exec(normalized);
  if (unsupportedLink) throw new Error(`Unsupported llms.txt link target: ${unsupportedLink[1]}`);
  for (const match of normalized.matchAll(/https:\/\/[^\s)<>'"`]+/g)) {
    const url = match[0].replace(/[.,;:!?]+$/, "");
    if (!markdownUrls.has(url)) throw new Error(`Unrecognized non-Markdown URL in llms.txt: ${url}`);
  }
  if (links.length === 0) throw new Error("Linear llms.txt contained no documentation links");
  return links;
}

export function validateManifest(
  links: LinearDocLink[],
  previousCount: number,
  options: { allowShrink?: boolean } = {},
) {
  if (links.length < MIN_EXPECTED_LINKS) {
    throw new Error(`Discovered only ${links.length} links, below safety minimum ${MIN_EXPECTED_LINKS}`);
  }
  if (links.length > MAX_LINKS) {
    throw new Error(`Discovered ${links.length} links, over safety maximum ${MAX_LINKS}`);
  }
  if (!options.allowShrink && previousCount > 0 && links.length < previousCount) {
    throw new Error(
      `Refusing llms.txt shrink from ${previousCount} to ${links.length} links; set ALLOW_LINEAR_DOCS_SHRINK=1 after verifying upstream removal`,
    );
  }

  const urls = new Set<string>();
  const paths = new Map<string, string>();
  let docs = 0;
  let developers = 0;
  let schema = 0;
  for (const link of links) {
    if (urls.has(link.url)) throw new Error(`Duplicate Linear docs URL: ${link.url}`);
    urls.add(link.url);
    const key = portablePathKey(link.filepath);
    const prior = paths.get(key);
    if (prior) throw new Error(`Portable output path collision: ${prior} and ${link.filepath}`);
    paths.set(key, link.filepath);
    if (link.filepath.startsWith("docs/")) docs++;
    else if (link.filepath === "developers/schema.graphql") schema++;
    else if (link.filepath.startsWith("developers/")) developers++;
  }
  if (docs < 95 || developers < 15 || schema !== 1) {
    throw new Error(`Unexpected Linear docs distribution: docs=${docs}, developers=${developers}, schema=${schema}`);
  }
}

function hasBalancedFences(content: string): boolean {
  let open: { marker: string; length: number } | undefined;
  for (const line of content.split("\n")) {
    const match = /^\s*(`{3,}|~{3,})(.*)$/.exec(line);
    if (!match) continue;
    const marker = match[1][0];
    if (!open) open = { marker, length: match[1].length };
    else if (marker === open.marker && match[1].length >= open.length && match[2].trim() === "") {
      open = undefined;
    }
  }
  return open === undefined;
}

function isPlaceholder(value: string): boolean {
  return /^<[^>]+>$|^(?:EXAMPLE|YOUR|REDACTED|PLACEHOLDER)[-_A-Z0-9]*$/i.test(value);
}

export function redactSensitiveExamples(content: string): string {
  return content
    .replace(
      /(^|[ \t])(-H|--header)(?:[ \t]+|=)(['"])Authorization:\s*Bearer\s+(?:<[^>]+>|[A-Za-z0-9._~+/-]{20,})\3/gim,
      (_line, prefix: string, flag: string) => `${prefix}${flag} "$LINEAR_AUTHORIZATION_HEADER"`,
    )
    .replace(
      /(["']?(?:access_token|refresh_token)["']?\s*:\s*["'])([A-Za-z0-9._~+/=-]{20,})(["'])/gi,
      (line, prefix: string, value: string, suffix: string) => isPlaceholder(value)
        ? line
        : `${prefix}EXAMPLE_TOKEN${suffix}`,
    )
    .replace(
      /(Authorization:\s*Bearer\s+)(?!<|EXAMPLE)([A-Za-z0-9._~+/-]{20,})/gi,
      "$1EXAMPLE_ACCESS_TOKEN",
    );
}

export function normalizeMarkdown(source: string): string {
  return redactSensitiveExamples(source.replace(/\r\n/g, "\n"))
    .replace(
      /!\[([^\]]*)\]\((https:\/\/(?:www\.)?youtube\.com\/watch\?[^)]+)\)/g,
      "[$1]($2)",
    )
    .replace(/^={7,}(.*)$/gm, "======$1")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trimEnd() + "\n";
}

export function validateMarkdown(content: string, url: string): string {
  if (/<!doctype html>|<html\b/i.test(content)) throw new Error(`${url} returned HTML instead of Markdown`);
  const first = content.split("\n").find((line) => line.trim().length > 0) ?? "";
  const title = /^#\s+(.+?)\s*$/.exec(first)?.[1];
  if (!title) throw new Error(`${url} did not start with an H1`);
  const body = content.slice(content.indexOf(first) + first.length).trim();
  if (body.length < 80) throw new Error(`${url} is an incomplete title-only page`);
  if (!hasBalancedFences(content)) throw new Error(`${url} contains an unclosed code fence`);
  return title;
}

export function isKnownIncompletePage(content: string, url: string): boolean {
  return KNOWN_INCOMPLETE_URLS.has(url) && content.trim() === "# GitHub";
}

export function validateGraphqlSchema(content: string, url = GRAPHQL_SCHEMA_URL) {
  if (Buffer.byteLength(content) < 500_000 || content.split("\n").length < 20_000) {
    throw new Error(`${url} returned an unexpectedly small GraphQL schema`);
  }
  for (const anchor of ["type Query", "type Mutation", "type Issue"]) {
    if (!content.includes(anchor)) throw new Error(`${url} GraphQL schema is missing ${anchor}`);
  }
  if (/<!doctype html>|<html\b/i.test(content)) throw new Error(`${url} returned HTML instead of GraphQL SDL`);
}

export function renderLocalIndex(
  manifestSource: string,
  links: LinearDocLink[],
  fetchedUrls: Set<string>,
): string {
  const byUrl = new Map(links.map((link) => [link.url, link]));
  const body = manifestSource.replace(/\r\n/g, "\n").replace(
    /\[([^\]\n]+)\]\((https:\/\/[^\s)]+)\)/g,
    (original, label: string, url: string) => {
      const link = byUrl.get(url);
      if (!link && NON_MIRRORED_RESOURCE_URLS.has(url)) return original;
      if (!link) throw new Error(`Index link was not parsed from llms.txt: ${url}`);
      if (fetchedUrls.has(link.url)) return `[${label}](${link.filepath})`;
      return `[${label}](${link.url}) _(not mirrored: upstream page is currently incomplete)_`;
    },
  ).trimEnd();
  return `<!-- Generated from ${MANIFEST_URL}; do not edit manually. -->\n\n${body}\n`;
}

async function fetchPage(link: LinearDocLink): Promise<LinearPage | undefined> {
  const schema = link.url === GRAPHQL_SCHEMA_URL;
  const { response, text } = await fetchText(
    link.url,
    schema ? "text/plain,*/*;q=0.1" : "text/markdown,text/plain;q=0.9,*/*;q=0.1",
  );
  const contentType = (response.headers.get("content-type") ?? "").toLowerCase();
  if (schema) {
    if (!contentType.includes("text/plain") && !contentType.includes("application/octet-stream")) {
      throw new Error(`${link.url} returned ${contentType || "unknown content type"}, expected GraphQL SDL text`);
    }
    const content = text.replace(/\r\n/g, "\n").replace(/[ \t]+$/gm, "").trimEnd() + "\n";
    validateGraphqlSchema(content, link.url);
    return { ...link, content };
  }

  if (!contentType.includes("text/markdown") && !contentType.includes("text/plain")) {
    throw new Error(`${link.url} returned ${contentType || "unknown content type"}, expected Markdown`);
  }
  const content = normalizeMarkdown(text);
  if (isKnownIncompletePage(content, link.url)) {
    console.warn(`Skipping known incomplete upstream page: ${link.url}`);
    return undefined;
  }
  validateMarkdown(content, link.url);
  return { ...link, content };
}

export function acquireLock(lockFile = LOCK_FILE): () => void {
  mkdirSync(dirname(lockFile), { recursive: true });
  const owner = `${process.pid}:${randomUUID()}`;
  let fd: number;
  try {
    fd = openSync(lockFile, "wx");
  } catch (error: any) {
    if (error?.code !== "EEXIST") throw error;
    const existing = readFileSync(lockFile, "utf8").trim();
    throw new Error(
      `Linear docs update lock already exists (${existing || "unknown owner"}); remove ${lockFile} only after verifying no update is running`,
    );
  }
  try {
    writeFileSync(fd, `${owner}\n`);
  } catch (error) {
    unlinkSync(lockFile);
    throw error;
  } finally {
    closeSync(fd);
  }
  return () => {
    if (!existsSync(lockFile)) throw new Error("Linear docs update lock disappeared before release");
    const currentOwner = readFileSync(lockFile, "utf8").trim();
    if (currentOwner !== owner) {
      throw new Error(`Refusing to release Linear docs lock owned by ${currentOwner || "unknown owner"}`);
    }
    unlinkSync(lockFile);
  };
}

export function recoverInterruptedReplacement(paths: ReplacementPaths = REPLACEMENT_PATHS) {
  rmSync(paths.stagingDir, { recursive: true, force: true });
  if (existsSync(paths.backupDir)) {
    rmSync(paths.outDir, { recursive: true, force: true });
    renameSync(paths.backupDir, paths.outDir);
  }
  rmSync(paths.gcDir, { recursive: true, force: true });
}

function collectDirectoryStats(root: string): DirectoryStats {
  const sizes = new Map<string, number>();
  if (!existsSync(root)) return { files: 0, bytes: 0, sizes };
  function walk(current: string) {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const filepath = join(current, entry.name);
      if (entry.isDirectory()) walk(filepath);
      else if (entry.isFile()) {
        const key = relative(root, filepath).split(sep).join("/");
        sizes.set(key, readFileSync(filepath).byteLength);
      } else {
        throw new Error(`Unexpected non-file entry in references: ${filepath}`);
      }
    }
  }
  walk(root);
  return {
    files: sizes.size,
    bytes: [...sizes.values()].reduce((sum, size) => sum + size, 0),
    sizes,
  };
}

function pageSizes(pages: LinearPage[]): Map<string, number> {
  return new Map(pages.map((page) => [page.filepath, Buffer.byteLength(page.content)]));
}

export function validateContentShrink(
  current: Map<string, number>,
  previous: Map<string, number>,
  options: { allowShrink?: boolean } = {},
) {
  if (previous.size === 0 || options.allowShrink) return;
  const isSource = (filepath: string) => filepath.startsWith("docs/") || filepath.startsWith("developers/");
  const previousSource = [...previous].filter(([filepath]) => isSource(filepath));
  const currentSource = [...current].filter(([filepath]) => isSource(filepath));
  const previousBytes = previousSource.reduce((sum, [, size]) => sum + size, 0);
  const currentBytes = currentSource.reduce((sum, [, size]) => sum + size, 0);
  if (previousBytes > 0 && currentBytes < previousBytes * 0.8) {
    throw new Error(
      `Refusing aggregate content shrink from ${previousBytes} to ${currentBytes} bytes; set ALLOW_LINEAR_DOCS_CONTENT_SHRINK=1 after verifying upstream changes`,
    );
  }
  const severe: string[] = [];
  for (const [filepath, oldSize] of previousSource) {
    const size = current.get(filepath) ?? 0;
    if (oldSize >= 512 && size < oldSize * 0.5) severe.push(`${filepath}: ${oldSize} -> ${size}`);
  }
  if (severe.length > 0) {
    throw new Error(
      `Refusing severe page shrink (${severe.slice(0, 5).join(", ")}); set ALLOW_LINEAR_DOCS_CONTENT_SHRINK=1 after verification`,
    );
  }
}

function assertDirectoryMatches(root: string, expected: Map<string, number>): DirectoryStats {
  const actual = collectDirectoryStats(root);
  if (actual.files !== expected.size) {
    throw new Error(`${root} contains ${actual.files}/${expected.size} expected files`);
  }
  for (const [filepath, size] of expected) {
    if (actual.sizes.get(filepath) !== size) {
      throw new Error(`${root}/${filepath} has ${actual.sizes.get(filepath) ?? "no"}/${size} expected bytes`);
    }
  }
  return actual;
}

export function commitStagedDirectory(
  paths: ReplacementPaths,
  validate: (root: string) => void,
  cleanup: (path: string) => void = (path) => rmSync(path, { recursive: true, force: true }),
): { cleanupPending: boolean } {
  let oldMoved = false;
  let newInstalled = false;
  try {
    if (existsSync(paths.outDir)) {
      renameSync(paths.outDir, paths.backupDir);
      oldMoved = true;
    }
    renameSync(paths.stagingDir, paths.outDir);
    newInstalled = true;
    validate(paths.outDir);
    if (oldMoved) renameSync(paths.backupDir, paths.gcDir);
  } catch (error) {
    if (newInstalled) rmSync(paths.outDir, { recursive: true, force: true });
    if (oldMoved && existsSync(paths.backupDir)) renameSync(paths.backupDir, paths.outDir);
    throw error;
  }

  if (!existsSync(paths.gcDir)) return { cleanupPending: false };
  try {
    cleanup(paths.gcDir);
    return { cleanupPending: false };
  } catch {
    return { cleanupPending: true };
  }
}

function replaceReferences(pages: LinearPage[]): DirectoryStats {
  recoverInterruptedReplacement(REPLACEMENT_PATHS);
  mkdirSync(STAGING_DIR, { recursive: true });
  const root = resolve(STAGING_DIR);
  for (const page of pages) {
    const destination = resolve(STAGING_DIR, page.filepath);
    const destinationRelative = relative(root, destination);
    if (
      !destinationRelative
      || isAbsolute(destinationRelative)
      || destinationRelative === ".."
      || destinationRelative.startsWith(`..${sep}`)
    ) {
      throw new Error(`Refusing output path outside staging directory: ${page.filepath}`);
    }
    mkdirSync(dirname(destination), { recursive: true });
    writeFileSync(destination, page.content);
  }

  const expected = pageSizes(pages);
  assertDirectoryMatches(STAGING_DIR, expected);

  let stats: DirectoryStats | undefined;
  const { cleanupPending } = commitStagedDirectory(REPLACEMENT_PATHS, (root) => {
    stats = assertDirectoryMatches(root, expected);
  });
  if (cleanupPending) {
    console.warn(`Linear docs update committed, but old-tree cleanup is pending at ${GC_DIR}`);
  }
  return stats!;
}

async function main() {
  const releaseLock = acquireLock();
  try {
    recoverInterruptedReplacement();
    const previousManifest = join(OUT_DIR, "llms.txt");
    const previousCount = existsSync(previousManifest)
      ? parseLlmsManifest(readFileSync(previousManifest, "utf8")).length
      : 0;

    const { response, text: manifestSource } = await fetchText(
      MANIFEST_URL,
      "text/plain,text/markdown;q=0.9,*/*;q=0.1",
    );
    const manifestType = (response.headers.get("content-type") ?? "").toLowerCase();
    if (!manifestType.includes("text/plain") && !manifestType.includes("text/markdown")) {
      throw new Error(`${MANIFEST_URL} returned ${manifestType || "unknown content type"}`);
    }
    const links = parseLlmsManifest(manifestSource);
    validateManifest(links, previousCount, {
      allowShrink: process.env.ALLOW_LINEAR_DOCS_SHRINK === "1",
    });
    console.log(`Discovered ${links.length} Linear documentation links`);

    const fetched: LinearPage[] = [];
    let completed = 0;
    let cursor = 0;
    async function worker() {
      while (true) {
        const index = cursor++;
        if (index >= links.length) return;
        const page = await fetchPage(links[index]);
        if (page) fetched.push(page);
        completed++;
        if (completed % 20 === 0 || completed === links.length) {
          console.log(`Processed ${completed}/${links.length} links`);
        }
      }
    }
    await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

    const fetchedUrls = new Set(fetched.map((page) => page.url));
    const skipped = links.filter((link) => !fetchedUrls.has(link.url));
    if (skipped.some((link) => !KNOWN_INCOMPLETE_URLS.has(link.url))) {
      throw new Error(`Unexpected skipped pages: ${skipped.map((link) => link.url).join(", ")}`);
    }
    const pages: LinearPage[] = [
      ...fetched,
      {
        label: "Linear llms.txt source manifest",
        url: MANIFEST_URL,
        filepath: "llms.txt",
        content: manifestSource.replace(/\r\n/g, "\n").trimEnd() + "\n",
      },
      {
        label: "Linear documentation index",
        url: MANIFEST_URL,
        filepath: "index.md",
        content: renderLocalIndex(manifestSource, links, fetchedUrls),
      },
    ];

    const byPath = new Map<string, LinearPage>();
    const byPortablePath = new Map<string, LinearPage>();
    for (const page of pages) {
      const prior = byPath.get(page.filepath);
      if (prior) throw new Error(`Duplicate output path ${page.filepath}: ${prior.url} and ${page.url}`);
      const key = portablePathKey(page.filepath);
      const portablePrior = byPortablePath.get(key);
      if (portablePrior) {
        throw new Error(`Portable output path collision ${page.filepath}: ${portablePrior.url} and ${page.url}`);
      }
      byPath.set(page.filepath, page);
      byPortablePath.set(key, page);
    }

    const sorted = [...byPath.values()].sort((a, b) => a.filepath.localeCompare(b.filepath));
    const previousStats = collectDirectoryStats(OUT_DIR);
    validateContentShrink(pageSizes(sorted), previousStats.sizes, {
      allowShrink: process.env.ALLOW_LINEAR_DOCS_CONTENT_SHRINK === "1",
    });
    const stats = replaceReferences(sorted);
    console.log(`Synced ${stats.files} references (${stats.bytes} bytes); skipped ${skipped.length} known incomplete page(s)`);
  } finally {
    releaseLock();
  }
}

if (import.meta.main) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
