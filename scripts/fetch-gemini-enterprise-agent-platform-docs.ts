#!/usr/bin/env bun
/**
 * Fetch Google Cloud Gemini Enterprise Agent Platform docs from docs.cloud.google.com.
 * Uses .md.txt pages and recursively discovers product-local links.
 * Generated API references, legacy machine-learning docs, and notebooks docs are
 * intentionally excluded from this core docs skill.
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "fs";
import { dirname, join, relative } from "path";
import { cleanupContent } from "./common.ts";
import { type Manifest, type ManifestEntry, buildEntry, loadManifest, saveManifest } from "./fetch-utils.ts";

const BASE_URL = "https://docs.cloud.google.com";
const PREFIX = "/gemini-enterprise-agent-platform";
const SKILL = "gemini-enterprise-agent-platform-docs";
const OUT_DIR = join(import.meta.dir, `../skills/${SKILL}/references`);
const MANIFEST_PATH = join(import.meta.dir, `../skills/.${SKILL}-manifest.json`);
const USER_AGENT = "Gemini-Enterprise-Agent-Platform-Docs-Fetcher/1.0";
const CONCURRENCY = 4;
const MAX_PAGES = 700;
const MAX_RETRIES = 5;

const SEED_PATHS = [PREFIX];

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function normalizePath(raw: string, basePath: string): string | undefined {
  const cleaned = decodeEntities(raw.trim())
    .replace(/^['"]|['"]$/g, "")
    .replace(/%60/g, "")
    .replace(/[`)>.,;]+$/g, "");
  if (!cleaned || cleaned.startsWith("#") || cleaned.startsWith("mailto:")) return undefined;

  let url: URL;
  try {
    url = new URL(cleaned, `${BASE_URL}${basePath}`);
  } catch {
    return undefined;
  }

  if (url.hostname !== "docs.cloud.google.com" && url.hostname !== "cloud.google.com") return undefined;
  let pathname = url.pathname.replace(/\/$/, "");
  if (!pathname.startsWith(PREFIX)) return undefined;

  if (/\.(png|jpg|jpeg|gif|svg|webp|pdf|zip|ipynb)$/i.test(pathname)) return undefined;
  if (pathname.includes("/static/")) return undefined;
  if (pathname.endsWith(".md.txt")) pathname = pathname.slice(0, -7);
  if (pathname.endsWith(".md")) pathname = pathname.slice(0, -3);

  // These large subtrees belong in future dedicated skills, not the core docs skill.
  if (pathname.startsWith(`${PREFIX}/reference/`) || pathname === `${PREFIX}/reference`) return undefined;
  if (pathname.includes("/reference/rest/") || pathname.includes("/reference/rpc/")) return undefined;
  if (pathname.startsWith(`${PREFIX}/machine-learning/`) || pathname === `${PREFIX}/machine-learning`) return undefined;
  if (pathname.startsWith(`${PREFIX}/notebooks/`) || pathname === `${PREFIX}/notebooks`) return undefined;

  return pathname || PREFIX;
}

function discoverLinks(content: string, basePath: string): string[] {
  const links = new Set<string>();

  for (const match of content.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
    const normalized = normalizePath(match[1], basePath);
    if (normalized) links.add(normalized);
  }

  for (const match of content.matchAll(/https?:\/\/(?:docs\.cloud\.google\.com|cloud\.google\.com)\/gemini-enterprise-agent-platform[^\s)\]"'<>]+/g)) {
    const normalized = normalizePath(match[0], basePath);
    if (normalized) links.add(normalized);
  }

  return [...links].sort();
}

function filepathForPath(pathname: string): string {
  if (pathname === PREFIX) return "index.md";
  return `${pathname.replace(`${PREFIX}/`, "")}.md`;
}

function pageUrl(pathname: string): string {
  return `${BASE_URL}${pathname}.md.txt`;
}

function pathForFilepath(filepath: string): string {
  if (filepath === "index.md") return PREFIX;
  return `${PREFIX}/${filepath.replace(/\.md$/, "")}`;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function retryDelayMs(attempt: number, retryAfter: string | null): number {
  if (retryAfter) {
    const seconds = Number(retryAfter);
    if (Number.isFinite(seconds) && seconds > 0) return seconds * 1000;
    const dateMs = Date.parse(retryAfter);
    if (Number.isFinite(dateMs)) return Math.max(1000, dateMs - Date.now());
  }
  return Math.min(30_000, 1000 * 2 ** attempt) + Math.floor(Math.random() * 500);
}

function isRetryableStatus(status: number) {
  return status === 429 || (status >= 500 && status < 600);
}

function cleanDoc(content: string): string {
  return cleanupContent(content)
    .replace(/\[\]\((https?:\/\/[^)]+)\)/g, "")
    .replace(/\t/g, "    ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+$/gm, "")
    .trimEnd() + "\n";
}

async function fetchText(pathname: string, old: ManifestEntry | undefined) {
  const headers: Record<string, string> = { "User-Agent": USER_AGENT };
  if (old?.etag) headers["If-None-Match"] = old.etag;
  if (old?.lastModified) headers["If-Modified-Since"] = old.lastModified;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(pageUrl(pathname), { headers });
      if (response.status === 304) return "not-modified" as const;
      const contentType = response.headers.get("content-type") ?? "";
      const text = await response.text();
      if (!response.ok) {
        if (isRetryableStatus(response.status) && attempt < MAX_RETRIES) {
          const delay = retryDelayMs(attempt, response.headers.get("retry-after"));
          console.log(`Retrying ${pathname} after ${response.status} in ${delay}ms`);
          await sleep(delay);
          continue;
        }
        throw new Error(`${response.status}`);
      }
      if (!contentType.includes("text/markdown") || text.includes("<html")) throw new Error(`not markdown: ${contentType || "unknown"}`);
      return {
        content: text,
        etag: response.headers.get("etag") ?? undefined,
        lastModified: response.headers.get("last-modified") ?? undefined,
      };
    } catch (error: any) {
      if (attempt >= MAX_RETRIES) throw error;
      const delay = retryDelayMs(attempt, null);
      console.log(`Retrying ${pathname} after ${error?.message ?? error} in ${delay}ms`);
      await sleep(delay);
    }
  }

  throw new Error("unreachable retry state");
}

function removeStaleFiles(validFiles: Set<string>) {
  if (!existsSync(OUT_DIR)) return;
  let removed = 0;

  function walk(dir: string) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        if (readdirSync(fullPath).length === 0) rmSync(fullPath, { recursive: true });
      } else if (entry.isFile()) {
        const rel = relative(OUT_DIR, fullPath);
        if (!validFiles.has(rel)) {
          rmSync(fullPath);
          removed++;
        }
      }
    }
  }

  walk(OUT_DIR);
  if (removed > 0) console.log(`Removed ${removed} stale files`);
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  const manifest = loadManifest(MANIFEST_PATH);
  const existingEntries = Object.entries(manifest).filter(([filepath]) => existsSync(join(OUT_DIR, filepath)));
  const newManifest: Manifest = Object.fromEntries(existingEntries);
  const validFiles = new Set(existingEntries.map(([filepath]) => filepath));
  const initialPaths = [...SEED_PATHS, ...existingEntries.map(([filepath]) => pathForFilepath(filepath))];
  const queue = [...new Set(initialPaths)];
  const queued = new Set(queue);
  const seen = new Set<string>();
  const failed = new Map<string, string>();
  let updated = 0;
  let unchanged = 0;

  async function processPath(pathname: string) {
    const filepath = filepathForPath(pathname);
    const old = manifest[filepath];
    const fullPath = join(OUT_DIR, filepath);

    try {
      const result = await fetchText(pathname, old);
      let source: string | undefined;
      let cleaned: string | undefined;
      let entry: ManifestEntry | undefined;

      if (result === "not-modified") {
        unchanged++;
        entry = old;
        if (existsSync(fullPath)) source = readFileSync(fullPath, "utf-8");
      } else {
        cleaned = cleanDoc(result.content);
        source = cleaned;
        const size = cleaned.length;
        if (old && old.size === size && existsSync(fullPath)) {
          unchanged++;
          entry = old;
        } else {
          mkdirSync(dirname(fullPath), { recursive: true });
          writeFileSync(fullPath, cleaned);
          updated++;
          console.log(`${old ? "Updated" : "Added"}: ${filepath}`);
          entry = buildEntry(old, { url: `${BASE_URL}${pathname}`, skill: SKILL, size, etag: result.etag, lastModified: result.lastModified }) ?? old ?? {
            url: `${BASE_URL}${pathname}`,
            skill: SKILL,
            size,
            updatedAt: new Date().toISOString(),
          };
        }
      }

      if (entry) newManifest[filepath] = entry;
      validFiles.add(filepath);

      if (source) {
        for (const next of discoverLinks(source, pathname)) {
          if (queued.size >= MAX_PAGES) break;
          if (!queued.has(next)) {
            queued.add(next);
            queue.push(next);
          }
        }
      }
    } catch (error: any) {
      const message = String(error?.message ?? error);
      failed.set(pathname, message);
      if (old && existsSync(fullPath)) {
        newManifest[filepath] = old;
        validFiles.add(filepath);
      }
    }
  }

  async function worker() {
    while (true) {
      const pathname = queue.shift();
      if (!pathname) return;
      if (seen.has(pathname)) continue;
      seen.add(pathname);
      await processPath(pathname);
      if (seen.size % 50 === 0) console.log(`Progress: ${seen.size} seen, ${updated} updated, ${failed.size} failed, ${queued.size} discovered`);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  if (process.env.PRUNE_STALE === "1") {
    if (failed.size === 0 && queued.size < MAX_PAGES) {
      removeStaleFiles(validFiles);
    } else {
      console.log(`Skipped stale cleanup because discovery was incomplete (${failed.size} failed, ${queued.size} discovered)`);
    }
  }
  saveManifest(MANIFEST_PATH, newManifest);

  console.log(`Done: ${updated} new/updated, ${unchanged} unchanged, ${failed.size} failed, ${Object.keys(newManifest).length} total`);
  if (failed.size > 0) {
    for (const [pathname, message] of [...failed.entries()].slice(0, 10)) console.log(`Skipped: ${pathname} (${message})`);
    if (failed.size > 10) console.log(`Skipped: ${failed.size - 10} more`);
  }
  if (queued.size >= MAX_PAGES) console.log(`Discovery capped at ${MAX_PAGES} paths`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
