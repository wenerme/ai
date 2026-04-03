#!/usr/bin/env bun
/**
 * Fetch Cloudflare developer docs from developers.cloudflare.com sitemap.
 * Downloads markdown via {url}index.md convention.
 * All pages go into a single skill: cloudflare-docs
 *
 * URL mapping: https://developers.cloudflare.com/workers/runtime-apis/fetch/
 *            → skills/cloudflare-docs/references/workers/runtime-apis/fetch.md
 */

import { mkdirSync, writeFileSync, readFileSync, existsSync, unlinkSync } from "fs";
import { join, dirname } from "path";
import { parseLimit } from "./fetch-utils.ts";

const SITEMAP_INDEX_URL = "https://developers.cloudflare.com/sitemap.xml";
const BASE_URL = "https://developers.cloudflare.com";
const SKILL_DIR = join(import.meta.dir, "../skills/cloudflare-docs/references");
const MANIFEST_PATH = join(import.meta.dir, "../skills/.cloudflare-docs-manifest.json");
const CONCURRENCY = 20;

interface ManifestEntry {
  url: string;
  etag?: string;
  lastModified?: string;
  size: number;
  updatedAt: string;
}

type Manifest = Record<string, ManifestEntry>;

function loadManifest(): Manifest {
  if (existsSync(MANIFEST_PATH)) {
    try {
      return JSON.parse(readFileSync(MANIFEST_PATH, "utf-8"));
    } catch {
      return {};
    }
  }
  return {};
}

function saveManifest(manifest: Manifest) {
  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
}

/** /workers/runtime-apis/fetch/ → workers/runtime-apis/fetch.md */
function urlToFilepath(path: string): string {
  const rel = path.replace(/^\//, "").replace(/\/$/, "");
  return (rel || "index") + ".md";
}

async function fetchSitemapUrls(): Promise<string[]> {
  console.log(`Fetching sitemap index: ${SITEMAP_INDEX_URL}`);
  const indexRes = await fetch(SITEMAP_INDEX_URL);
  if (!indexRes.ok) throw new Error(`Sitemap index fetch failed: ${indexRes.status}`);
  const indexXml = await indexRes.text();

  const sitemapUrls: string[] = [];
  for (const m of indexXml.matchAll(/<loc>(.*?)<\/loc>/g)) {
    sitemapUrls.push(m[1]);
  }

  const allUrls: string[] = [];
  for (const sitemapUrl of sitemapUrls) {
    console.log(`Fetching sitemap: ${sitemapUrl}`);
    const res = await fetch(sitemapUrl);
    if (!res.ok) { console.log(`  FAILED: ${res.status}`); continue; }
    const xml = await res.text();
    for (const m of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
      allUrls.push(m[1]);
    }
  }
  return allUrls;
}

// Skip changelogs (auto-generated, huge)
const SKIP_PREFIXES = ["/changelog/"];

function shouldSkip(path: string): boolean {
  return SKIP_PREFIXES.some((p) => path.startsWith(p));
}

async function fetchMarkdown(
  url: string,
  old: ManifestEntry | undefined,
): Promise<{ content: string; etag?: string; lastModified?: string } | "not-modified" | "skip"> {
  const headers: Record<string, string> = {
    "User-Agent": "Cloudflare-Docs-Fetcher/1.0",
  };
  if (old?.etag) headers["If-None-Match"] = old.etag;
  if (old?.lastModified) headers["If-Modified-Since"] = old.lastModified;

  const res = await fetch(url, { headers });
  if (res.status === 304) return "not-modified";
  if (res.status === 404) return "skip";
  if (!res.ok) throw new Error(`${res.status}`);

  const content = await res.text();
  if (content.startsWith("<!DOCTYPE") || content.includes("<html")) {
    return "skip"; // not all pages support .md — silently skip
  }
  return {
    content,
    etag: res.headers.get("etag") ?? undefined,
    lastModified: res.headers.get("last-modified") ?? undefined,
  };
}

async function main() {
  mkdirSync(SKILL_DIR, { recursive: true });

  const manifest = loadManifest();
  const newManifest: Manifest = {};
  let updated = 0;
  let unchanged = 0;
  let noMd = 0;
  let skipped = 0;

  const allUrls = await fetchSitemapUrls();
  const paths = [...new Set(allUrls.map((u) => new URL(u).pathname))].sort();
  const limit = parseLimit();
  console.log(`\nFound ${paths.length} pages\n`);

  // Process in batches with concurrency
  let tasks = paths.filter((p) => {
    if (shouldSkip(p)) { skipped++; return false; }
    return true;
  });
  if (limit) tasks = tasks.slice(0, limit);

  let done = 0;
  const total = tasks.length;

  async function processPath(path: string) {
    const filepath = urlToFilepath(path);
    const mdUrl = `${BASE_URL}${path}index.md`;
    const old = manifest[filepath];

    try {
      const result = await fetchMarkdown(mdUrl, old);
      if (result === "not-modified") {
        unchanged++;
        newManifest[filepath] = old;
      } else if (result === "skip") {
        noMd++;
        if (old) newManifest[filepath] = old;
      } else {
        const size = result.content.length;
        if (old && old.size === size) {
          unchanged++;
          newManifest[filepath] = old;
        } else {
          const fullPath = join(SKILL_DIR, filepath);
          mkdirSync(dirname(fullPath), { recursive: true });
          writeFileSync(fullPath, result.content);
          updated++;
          newManifest[filepath] = {
            url: `${BASE_URL}${path}`,
            etag: result.etag,
            lastModified: result.lastModified,
            size,
            updatedAt: new Date().toISOString(),
          };
        }
      }
    } catch (e: any) {
      noMd++;
      if (old) newManifest[filepath] = old;
    }

    done++;
    if (done % 200 === 0) {
      console.log(`  Progress: ${done}/${total} (${updated} saved, ${noMd} no-md)`);
    }
  }

  // Run with concurrency pool
  const queue = [...tasks];
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length > 0) {
      const path = queue.shift()!;
      await processPath(path);
    }
  });
  await Promise.all(workers);

  // Cleanup stale files (skip when using --limit)
  if (!limit) {
    const currentFiles = new Set(Object.keys(newManifest));
    for (const f of Object.keys(manifest)) {
      if (!currentFiles.has(f)) {
        const fp = join(SKILL_DIR, f);
        if (existsSync(fp)) {
          unlinkSync(fp);
          console.log(`Removed stale: ${f}`);
        }
      }
    }
  }

  const finalManifest = limit ? { ...manifest, ...newManifest } : newManifest;
  saveManifest(finalManifest);
  console.log(`\nDone: ${updated} saved, ${unchanged} cached, ${noMd} no-md, ${skipped} skipped`);
  console.log(`Total: ${Object.keys(newManifest).length} files in manifest`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
