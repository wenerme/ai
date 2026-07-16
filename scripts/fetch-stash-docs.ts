#!/usr/bin/env bun
/**
 * Fetch Stash user documentation from stash.wiki.
 *
 * The site does not negotiate text/markdown responses. Nextra embeds the
 * Markdown/MDX source used by its Copy page action in the Next.js Flight
 * payload, so this script extracts that source from each server-rendered page.
 */

import {
  existsSync,
  mkdirSync,
  readdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, isAbsolute, join, posix, relative, resolve, sep } from "node:path";

const BASE_URL = "https://stash.wiki";
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;
const SKILL_DIR = join(import.meta.dir, "../skills/stash-docs");
const OUT_DIR = join(SKILL_DIR, "references");
const STAGING_DIR = join(SKILL_DIR, ".references-next");
const BACKUP_DIR = join(SKILL_DIR, ".references-previous");
const USER_AGENT = "wenerme-ai-stash-docs-fetcher/1.0";
const CONCURRENCY = 4;
const MAX_PAGES = 300;
const MIN_EXPECTED_PAGES = 80;
const MAX_RETRIES = 3;
const REQUEST_TIMEOUT_MS = 45_000;

interface StashPage {
  url: string;
  filepath: string;
  content: string;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function retryDelayMs(attempt: number, retryAfter: string | null): number {
  if (retryAfter) {
    const seconds = Number(retryAfter);
    if (Number.isFinite(seconds) && seconds > 0) return seconds * 1000;
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
        headers: {
          Accept: accept,
          "User-Agent": USER_AGENT,
        },
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

function decodeXml(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function normalizedSiteUrl(raw: string): string | undefined {
  let url: URL;
  try {
    url = new URL(decodeXml(raw.trim()));
  } catch {
    return undefined;
  }
  if (url.origin !== BASE_URL) return undefined;
  url.hash = "";
  url.search = "";
  return url.toString();
}

async function discoverPageUrls(): Promise<string[]> {
  const sitemapQueue = [SITEMAP_URL];
  const seenSitemaps = new Set<string>();
  const pages = new Set<string>();

  while (sitemapQueue.length > 0) {
    const sitemapUrl = sitemapQueue.shift()!;
    if (seenSitemaps.has(sitemapUrl)) continue;
    seenSitemaps.add(sitemapUrl);

    const { response, text } = await fetchText(sitemapUrl, "application/xml,text/xml;q=0.9,*/*;q=0.1");
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("xml") || !/<(?:sitemapindex|urlset)\b/.test(text)) {
      throw new Error(`${sitemapUrl} did not return a valid sitemap (${contentType || "unknown content type"})`);
    }

    const locations = [...text.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map((match) => match[1]);
    if (text.includes("<sitemapindex")) {
      for (const location of locations) {
        const next = normalizedSiteUrl(location);
        if (!next || !new URL(next).pathname.startsWith("/sitemap")) {
          throw new Error(`Unexpected sitemap location: ${location}`);
        }
        if (!seenSitemaps.has(next)) sitemapQueue.push(next);
      }
    } else {
      for (const location of locations) {
        const page = normalizedSiteUrl(location);
        if (!page) throw new Error(`Unexpected page location: ${location}`);
        pages.add(page);
      }
    }
  }

  if (pages.size === 0) throw new Error("No Stash documentation pages were discovered");
  if (pages.size > MAX_PAGES) throw new Error(`Discovered ${pages.size} pages, over safety limit ${MAX_PAGES}`);
  return [...pages].sort();
}

export function validateDiscoveredPageUrls(
  urls: string[],
  previousCount: number,
  options: { allowShrink?: boolean; allowLanguageMismatch?: boolean } = {},
) {
  if (!options.allowShrink && urls.length < MIN_EXPECTED_PAGES) {
    throw new Error(`Discovered only ${urls.length} pages, below safety minimum ${MIN_EXPECTED_PAGES}`);
  }
  if (!options.allowShrink && previousCount > 0 && urls.length < previousCount) {
    throw new Error(
      `Refusing sitemap shrink from ${previousCount} to ${urls.length} pages; set ALLOW_STASH_DOCS_SHRINK=1 after verifying upstream removal`,
    );
  }

  const paths = new Set(urls.map((url) => new URL(url).pathname.replace(/\/$/, "") || "/"));
  const missingPairs: string[] = [];
  for (const pathname of paths) {
    const counterpart = pathname === "/"
      ? "/en"
      : pathname === "/en"
        ? "/"
        : pathname.startsWith("/en/")
          ? pathname.slice(3)
          : `/en${pathname}`;
    if (!paths.has(counterpart)) missingPairs.push(`${pathname} -> ${counterpart}`);
  }
  if (missingPairs.length > 0 && !options.allowLanguageMismatch) {
    throw new Error(
      `Stash Chinese/English sitemap mismatch: ${missingPairs.slice(0, 5).join(", ")}${missingPairs.length > 5 ? ` (+${missingPairs.length - 5} more)` : ""}`,
    );
  }
}

export function flightPayloadFromHtml(html: string, url: string): string {
  const chunks: string[] = [];
  const scriptPattern = /<script(?:\s[^>]*)?>self\.__next_f\.push\((.*?)\)<\/script>/gs;

  for (const match of html.matchAll(scriptPattern)) {
    try {
      const payload = JSON.parse(match[1]);
      if (payload[0] === 1 && typeof payload[1] === "string") chunks.push(payload[1]);
    } catch {
      // Ignore non-JSON or unrelated script blocks.
    }
  }

  if (chunks.length === 0) throw new Error(`${url} did not contain a Next.js Flight payload`);
  return chunks.join("");
}

export function decodeFlightTextReference(flight: string, reference: string, url: string): string {
  const id = reference.slice(1);
  const rowMatch = new RegExp(`(?:^|\\n)${id}:T([0-9a-f]+),`, "i").exec(flight);
  if (!rowMatch) throw new Error(`${url} did not contain Flight text row ${id}`);

  const rowStart = rowMatch.index + (rowMatch[0].startsWith("\n") ? 1 : 0);
  const contentStart = rowStart + `${id}:T${rowMatch[1]},`.length;
  const declaredBytes = Number.parseInt(rowMatch[1], 16);
  const remaining = Buffer.from(flight.slice(contentStart), "utf8");
  if (remaining.byteLength < declaredBytes) {
    throw new Error(`${url} Flight row ${id} is truncated: ${remaining.byteLength} < ${declaredBytes}`);
  }

  const source = remaining.subarray(0, declaredBytes).toString("utf8");
  if (Buffer.byteLength(source, "utf8") !== declaredBytes || source.includes("\uFFFD")) {
    throw new Error(`${url} Flight row ${id} failed UTF-8 length validation`);
  }
  return source;
}

export function sourceFilepathBefore(flight: string, sourceIndex: number, url: string): string {
  const context = flight.slice(Math.max(0, sourceIndex - 1_500), sourceIndex);
  const matches = [...context.matchAll(/"filePath":("(?:\\.|[^"\\])*")/g)];
  const encoded = matches.at(-1)?.[1];
  if (!encoded) throw new Error(`${url} did not expose source metadata.filePath`);

  const sourcePath = JSON.parse(encoded) as string;
  if (
    !sourcePath.startsWith("content/")
    || !/\.mdx?$/.test(sourcePath)
    || /[\\\0:*?"<>|]/.test(sourcePath)
  ) {
    throw new Error(`${url} exposed unexpected source path: ${sourcePath}`);
  }

  const filepath = sourcePath.slice("content/".length).replace(/\.mdx$/, ".md");
  if (
    !filepath
    || filepath.startsWith("/")
    || posix.normalize(filepath) !== filepath
    || filepath.split("/").includes("..")
  ) {
    throw new Error(`${url} exposed unsafe source path: ${sourcePath}`);
  }
  return filepath;
}

export function portablePathKey(filepath: string): string {
  return filepath.normalize("NFC").toLowerCase();
}

export function transformOutsideCode(content: string, transform: (text: string) => string): string {
  const segments: string[] = [];
  const fencePattern = /^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1[ \t]*$/gm;
  let cursor = 0;

  for (const match of content.matchAll(fencePattern)) {
    const index = match.index ?? 0;
    if (index > cursor) segments.push(transform(content.slice(cursor, index)));
    segments.push(match[0]);
    cursor = index + match[0].length;
  }
  if (cursor < content.length) segments.push(transform(content.slice(cursor)));
  return segments.join("");
}

export function cleanNextraMdx(content: string): string {
  return transformOutsideCode(content, (text) => text
    .replace(/^import\s+\{\s*Callout\s*\}\s+from\s+['"]nextra\/components['"];?\s*$/gm, "")
    .replace(/^export const TwitterContent = async \(\) => \{[\s\S]*?^\}\s*$/gm, "")
    .replace(/^<TwitterContent\s*\/>\s*$/gm, "")
    .replace(/<Callout\b([^>]*)>([\s\S]*?)<\/Callout>/g, (_, attrs: string, body: string) => {
      const type = /emoji=["'][^"']*⚠|type=["'](?:warning|error)["']/i.test(attrs) ? "WARNING" : "NOTE";
      const quoted = body.trim().replace(/^[ \t]+/gm, "").split("\n").map((line) => `> ${line}`.trimEnd()).join("\n");
      return `\n> [!${type}]\n${quoted}\n`;
    }));
}

function isExplicitPlaceholder(value: string): boolean {
  return /^(?:<.*>|(?:your|example|sample|dummy|redacted|placeholder|password|pass)[-_A-Za-z0-9]*|[A-Z][A-Z0-9_]*_EXAMPLE|EXAMPLE_[A-Z0-9_]+|x{6,})$/i.test(value);
}

export function redactSensitiveExamples(content: string): string {
  return content
    .replace(
      /^([ \t]*)private-key:\s*[|>][+-]?\s*\n(?:(?:\1[ \t]+[^\n]*|[ \t]*)\n?)+/gm,
      (_, indent: string) => `${indent}private-key: EXAMPLE_PRIVATE_KEY\n`,
    )
    .replace(
      /^([ \t]*private-key:\s*)(['"]?)([^'"\n#]+?)\2([ \t]*(?:#.*)?)$/gm,
      (line, prefix: string, _quote: string, rawValue: string, suffix: string) => {
        const value = rawValue.trim();
        return isExplicitPlaceholder(value) || value === "EXAMPLE_PRIVATE_KEY"
          ? line
          : `${prefix}EXAMPLE_PRIVATE_KEY${suffix}`;
      },
    )
    .replace(/\bgl(?:pat|rt|ptt)-[0-9A-Za-z_-]{10,}\b/g, "GITLAB_TOKEN_EXAMPLE")
    .replace(/\bgh[pousr]_[0-9A-Za-z]{20,}\b/g, "GITHUB_TOKEN_EXAMPLE")
    .replace(/\bsk-[A-Za-z0-9_-]{20,}\b/g, "API_KEY_EXAMPLE")
    .replace(/\bAKIA[0-9A-Z]{16}\b/g, "AWS_ACCESS_KEY_EXAMPLE")
    .replace(/\bAIza[0-9A-Za-z_-]{30,}\b/g, "GOOGLE_API_KEY_EXAMPLE")
    .replace(/\bxox[baprs]-[0-9A-Za-z-]{10,}\b/g, "SLACK_TOKEN_EXAMPLE")
    .replace(/\btskey-(?:auth|client|api)-[0-9A-Za-z_-]{10,}\b/g, "TAILSCALE_AUTH_KEY_EXAMPLE")
    .replace(/\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g, "JWT_TOKEN_EXAMPLE")
    .replace(
      /(\bBearer\s+)(?!your|example|sample|dummy|redacted|placeholder)[A-Za-z0-9._~+/-]{16,}={0,2}/gi,
      "$1BEARER_TOKEN_EXAMPLE",
    )
    .replace(
      /^([ \t]*(?:#\s*)?(?:api[-_]?key|access[-_]?token|auth[-_]?token|auth-key|auth-str|auth|secret|token|password):\s*)(['"]?)([^'"\s#]{12,})\2([ \t]*(?:#.*)?)$/gim,
      (line, prefix: string, _quote: string, value: string, suffix: string) => isExplicitPlaceholder(value)
        ? line
        : `${prefix}CREDENTIAL_EXAMPLE${suffix}`,
    )
    .replace(
      /-{3,5}BEGIN ([A-Z ]*PRIVATE KEY)-{3,5}[\s\S]*?-{3,5}END \1\s*-{3,5}/g,
      "REDACTED_EXAMPLE_PRIVATE_KEY",
    );
}

export function normalizeMarkdown(source: string): string {
  const cleaned = redactSensitiveExamples(cleanNextraMdx(source.replace(/\r\n/g, "\n")))
    .replace(/^={7,}(.*)$/gm, "======$1")
    .replace(/[ \t]+$/gm, "");
  return transformOutsideCode(cleaned, (text) => text.replace(/\n{3,}/g, "\n\n")).trimEnd() + "\n";
}

export function extractPage(html: string, url: string): StashPage {
  const flight = flightPayloadFromHtml(html, url);
  const sourceMatch = /"sourceCode":("(?:\\.|[^"\\])*")/.exec(flight);
  if (!sourceMatch) throw new Error(`${url} did not expose Nextra sourceCode`);

  const filepath = sourceFilepathBefore(flight, sourceMatch.index, url);
  const sourceValue = JSON.parse(sourceMatch[1]) as string;
  const source = /^\$[0-9a-f]+$/i.test(sourceValue)
    ? decodeFlightTextReference(flight, sourceValue, url)
    : sourceValue.startsWith("$$")
      ? sourceValue.slice(1)
      : sourceValue;
  const content = normalizeMarkdown(source);

  if (content.trim().length === 0) throw new Error(`${url} exposed empty sourceCode`);
  if (/<!doctype html>|self\.__next_f\.push/i.test(content)) {
    throw new Error(`${url} sourceCode contains rendered HTML or Flight data`);
  }
  return { url, filepath, content };
}

async function fetchPage(url: string): Promise<StashPage> {
  const { response, text } = await fetchText(url, "text/html,application/xhtml+xml;q=0.9,*/*;q=0.1");
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) {
    throw new Error(`${url} returned ${contentType || "unknown content type"}, expected HTML`);
  }
  return extractPage(text, url);
}

function recoverInterruptedReplacement() {
  mkdirSync(SKILL_DIR, { recursive: true });
  rmSync(STAGING_DIR, { recursive: true, force: true });
  if (existsSync(BACKUP_DIR) && !existsSync(OUT_DIR)) renameSync(BACKUP_DIR, OUT_DIR);
  else rmSync(BACKUP_DIR, { recursive: true, force: true });
}

function replaceReferences(pages: StashPage[]) {
  recoverInterruptedReplacement();
  mkdirSync(STAGING_DIR, { recursive: true });

  const stagingRoot = resolve(STAGING_DIR);
  for (const page of pages) {
    const destination = resolve(STAGING_DIR, page.filepath);
    const destinationRelative = relative(stagingRoot, destination);
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

  try {
    if (existsSync(OUT_DIR)) renameSync(OUT_DIR, BACKUP_DIR);
    renameSync(STAGING_DIR, OUT_DIR);
    rmSync(BACKUP_DIR, { recursive: true, force: true });
  } catch (error) {
    rmSync(STAGING_DIR, { recursive: true, force: true });
    if (!existsSync(OUT_DIR) && existsSync(BACKUP_DIR)) renameSync(BACKUP_DIR, OUT_DIR);
    throw error;
  }
}

async function main() {
  recoverInterruptedReplacement();
  const previousCount = existsSync(OUT_DIR)
    ? readdirSync(OUT_DIR, { recursive: true, withFileTypes: true }).filter((entry) => entry.isFile()).length
    : 0;
  const urls = await discoverPageUrls();
  validateDiscoveredPageUrls(urls, previousCount, {
    allowShrink: process.env.ALLOW_STASH_DOCS_SHRINK === "1",
    allowLanguageMismatch: process.env.ALLOW_STASH_DOCS_LANGUAGE_MISMATCH === "1",
  });
  console.log(`Discovered ${urls.length} Stash documentation pages`);

  const pages: StashPage[] = [];
  let cursor = 0;
  async function worker() {
    while (true) {
      const index = cursor++;
      if (index >= urls.length) return;
      const page = await fetchPage(urls[index]);
      pages.push(page);
      if (pages.length % 20 === 0 || pages.length === urls.length) {
        console.log(`Fetched ${pages.length}/${urls.length} pages`);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  const byPath = new Map<string, StashPage>();
  const byPortablePath = new Map<string, StashPage>();
  for (const page of pages) {
    const previous = byPath.get(page.filepath);
    if (previous) throw new Error(`Duplicate output path ${page.filepath}: ${previous.url} and ${page.url}`);
    const portableKey = portablePathKey(page.filepath);
    const portablePrevious = byPortablePath.get(portableKey);
    if (portablePrevious) {
      throw new Error(`Portable output path collision ${page.filepath}: ${portablePrevious.url} and ${page.url}`);
    }
    byPath.set(page.filepath, page);
    byPortablePath.set(portableKey, page);
  }
  if (byPath.size !== urls.length) throw new Error(`Fetched ${byPath.size}/${urls.length} unique pages`);

  const sortedPages = [...byPath.values()].sort((a, b) => a.filepath.localeCompare(b.filepath));
  replaceReferences(sortedPages);

  const files = readdirSync(OUT_DIR, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile()).length;
  if (files !== sortedPages.length) throw new Error(`Wrote ${files}/${sortedPages.length} reference files`);
  const totalBytes = sortedPages.reduce((sum, page) => sum + Buffer.byteLength(page.content), 0);
  console.log(`Synced ${files} references (${totalBytes} bytes)`);
}

if (import.meta.main) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
