/**
 * Shared utilities for fetch-*.ts scripts.
 * Provides manifest management, HTTP fetching with cache headers,
 * and size-based change detection to minimize manifest diffs.
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync, unlinkSync } from "fs";
import { dirname } from "path";

// ─── Manifest ────────────────────────────────────────────────

export interface ManifestEntry {
  url: string;
  skill?: string;
  etag?: string;
  lastModified?: string;
  size: number;
  updatedAt: string;
}

export type Manifest = Record<string, ManifestEntry>;

export function loadManifest(path: string): Manifest {
  if (existsSync(path)) {
    try { return JSON.parse(readFileSync(path, "utf-8")); } catch { return {}; }
  }
  return {};
}

export function saveManifest(path: string, manifest: Manifest) {
  writeFileSync(path, JSON.stringify(manifest, null, 2) + "\n");
}

// ─── HTTP Fetch ──────────────────────────────────────────────

export type FetchResult =
  | { content: string; etag?: string; lastModified?: string }
  | "not-modified"
  | "skip";

/**
 * Fetch markdown from URL with conditional request support (etag/lastModified).
 * Returns "not-modified" on 304, "skip" on 404 or HTML response,
 * or the content with cache headers.
 */
export async function fetchMd(
  url: string,
  old: ManifestEntry | undefined,
  opts?: { userAgent?: string },
): Promise<FetchResult> {
  const headers: Record<string, string> = {
    "User-Agent": opts?.userAgent ?? "Docs-Fetcher/1.0",
  };
  if (old?.etag) headers["If-None-Match"] = old.etag;
  if (old?.lastModified) headers["If-Modified-Since"] = old.lastModified;

  const res = await fetch(url, { headers });
  if (res.status === 304) return "not-modified";
  if (res.status === 404) return "skip";
  if (!res.ok) throw new Error(`${res.status}`);

  const content = await res.text();
  if (content.startsWith("<!DOCTYPE") || content.includes("<html")) {
    return "skip";
  }
  return {
    content,
    etag: res.headers.get("etag") ?? undefined,
    lastModified: res.headers.get("last-modified") ?? undefined,
  };
}

// ─── Sitemap ─────────────────────────────────────────────────

/** Fetch sitemap XML and extract all <loc> URLs. Follows sitemap index. */
export async function fetchSitemapUrls(sitemapUrl: string): Promise<string[]> {
  console.log(`Fetching sitemap: ${sitemapUrl}`);
  const res = await fetch(sitemapUrl);
  if (!res.ok) throw new Error(`Sitemap fetch failed: ${res.status}`);
  const xml = await res.text();

  const urls: string[] = [];
  for (const m of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
    urls.push(m[1]);
  }

  // Check if this is a sitemap index (contains other sitemap URLs)
  const sitemapRefs = urls.filter((u) => u.endsWith(".xml") || u.includes("sitemap"));
  if (sitemapRefs.length > 0 && sitemapRefs.length === urls.length) {
    // It's a sitemap index — fetch each sub-sitemap
    const allUrls: string[] = [];
    for (const subUrl of sitemapRefs) {
      console.log(`Fetching sub-sitemap: ${subUrl}`);
      try {
        const subRes = await fetch(subUrl);
        if (!subRes.ok) { console.log(`  FAILED: ${subRes.status}`); continue; }
        const subXml = await subRes.text();
        for (const m of subXml.matchAll(/<loc>(.*?)<\/loc>/g)) {
          allUrls.push(m[1]);
        }
      } catch (e: any) {
        console.log(`  FAILED: ${e.message}`);
      }
    }
    return allUrls;
  }

  return urls;
}

// ─── Change Detection ────────────────────────────────────────

/**
 * Check if content has actually changed compared to old manifest entry.
 * Uses size comparison — if size is unchanged, treat as no change.
 * This avoids manifest churn when servers return new etags for identical content.
 */
export function hasChanged(old: ManifestEntry | undefined, newSize: number): boolean {
  if (!old) return true;
  return old.size !== newSize;
}

/**
 * Build a new manifest entry, preserving old entry if size unchanged.
 * Returns null if size unchanged (caller should use old entry instead).
 */
export function buildEntry(
  old: ManifestEntry | undefined,
  opts: { url: string; skill?: string; etag?: string; lastModified?: string; size: number },
): ManifestEntry | null {
  if (old && old.size === opts.size) return null; // no change
  return {
    url: opts.url,
    ...(opts.skill ? { skill: opts.skill } : {}),
    ...(opts.etag ? { etag: opts.etag } : {}),
    ...(opts.lastModified ? { lastModified: opts.lastModified } : {}),
    size: opts.size,
    updatedAt: new Date().toISOString(),
  };
}

// ─── File Operations ─────────────────────────────────────────

/** Write content to file, creating directories as needed. */
export function writeDoc(path: string, content: string) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

/** Remove stale files that are no longer in manifest. */
export function cleanStaleFiles(
  manifest: Manifest,
  newManifest: Manifest,
  getFilePath: (key: string) => string,
) {
  const currentFiles = new Set(Object.keys(newManifest));
  for (const f of Object.keys(manifest)) {
    if (!currentFiles.has(f)) {
      const fp = getFilePath(f);
      if (existsSync(fp)) {
        unlinkSync(fp);
        console.log(`Removed stale: ${f}`);
      }
    }
  }
}

// ─── Rate Limiting ───────────────────────────────────────────

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ─── CLI ─────────────────────────────────────────────────────

/** Parse --limit N from argv. Returns undefined if not set. */
export function parseLimit(): number | undefined {
  const idx = process.argv.indexOf("--limit");
  if (idx >= 0 && process.argv[idx + 1]) {
    return parseInt(process.argv[idx + 1], 10);
  }
  return undefined;
}
