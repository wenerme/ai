#!/usr/bin/env bun
/**
 * Fetch OpenRouter docs from openrouter.ai sitemap.
 * Strips YAML-like frontmatter (delimited by ***) from .md content.
 * Dispatches to: openrouter-docs (single skill, not split — moderate size)
 */

import { mkdirSync, writeFileSync, readFileSync, existsSync } from "fs";
import { join, dirname } from "path";

const SITEMAP_URL = "https://openrouter.ai/sitemap.xml";
const BASE_URL = "https://openrouter.ai";
const SKILL_DIR = join(import.meta.dir, "../skills/openrouter-docs/references");
const MANIFEST_PATH = join(import.meta.dir, "../skills/.openrouter-docs-manifest.json");
const RATE_LIMIT_MS = 200;

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
    try { return JSON.parse(readFileSync(MANIFEST_PATH, "utf-8")); } catch { return {}; }
  }
  return {};
}
function saveManifest(m: Manifest) {
  writeFileSync(MANIFEST_PATH, JSON.stringify(m, null, 2) + "\n");
}

/** Strip OpenRouter's *** frontmatter block */
function stripFrontmatter(content: string): string {
  const lines = content.split("\n");
  if (lines[0]?.trim() !== "***") return content;
  // Find the end: a line of dashes (---+) or first heading (##)
  for (let i = 1; i < lines.length; i++) {
    if (/^-{3,}$/.test(lines[i].trim()) || /^##\s/.test(lines[i])) {
      // If it's a separator line, skip it too
      const start = /^-{3,}$/.test(lines[i].trim()) ? i + 1 : i;
      return lines.slice(start).join("\n").trimStart();
    }
  }
  return content;
}

async function fetchSitemap(): Promise<string[]> {
  console.log(`Fetching sitemap: ${SITEMAP_URL}`);
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`Sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  const urls: string[] = [];
  for (const m of xml.matchAll(/<loc>(.*?)<\/loc>/g)) urls.push(m[1]);
  return urls;
}

async function fetchMd(
  url: string,
  old: ManifestEntry | undefined,
): Promise<{ content: string; etag?: string; lastModified?: string } | "not-modified"> {
  const headers: Record<string, string> = { "User-Agent": "OpenRouter-Docs-Fetcher/1.0" };
  if (old?.etag) headers["If-None-Match"] = old.etag;
  if (old?.lastModified) headers["If-Modified-Since"] = old.lastModified;

  const res = await fetch(url, { headers });
  if (res.status === 304) return "not-modified";
  if (!res.ok) throw new Error(`${res.status}`);

  const content = await res.text();
  if (content.startsWith("<!DOCTYPE") || content.includes("<html")) throw new Error("got HTML");
  return {
    content: stripFrontmatter(content),
    etag: res.headers.get("etag") ?? undefined,
    lastModified: res.headers.get("last-modified") ?? undefined,
  };
}

async function main() {
  mkdirSync(SKILL_DIR, { recursive: true });

  const manifest = loadManifest();
  const newManifest: Manifest = {};
  let updated = 0, unchanged = 0, failed = 0;

  const allUrls = await fetchSitemap();
  const docPaths = allUrls
    .filter((u) => u.includes("/docs/") || u.includes("/docs"))
    .map((u) => new URL(u).pathname)
    .filter((p) => p !== "/docs" && p !== "/docs/");

  console.log(`Found ${docPaths.length} doc pages\n`);

  for (let i = 0; i < docPaths.length; i++) {
    const path = docPaths[i];
    const filepath = path.replace(/^\/docs\//, "").replace(/\/$/, "") + ".md";
    const mdUrl = `${BASE_URL}${path.replace(/\/$/, "")}.md`;
    const fullPath = join(SKILL_DIR, filepath);
    const old = manifest[filepath];

    process.stdout.write(`[${i + 1}/${docPaths.length}] ${filepath} ... `);

    try {
      const result = await fetchMd(mdUrl, old);
      if (result === "not-modified") {
        console.log("not modified");
        unchanged++;
        newManifest[filepath] = old;
      } else {
        mkdirSync(dirname(fullPath), { recursive: true });
        writeFileSync(fullPath, result.content);
        console.log(old ? "updated" : `new (${(result.content.length / 1024).toFixed(0)}KB)`);
        updated++;
        newManifest[filepath] = { url: mdUrl, etag: result.etag, lastModified: result.lastModified, size: result.content.length, updatedAt: new Date().toISOString() };
      }
    } catch (e: any) {
      console.log(`FAILED: ${e.message}`);
      failed++;
      if (old) newManifest[filepath] = old;
    }

    if (i < docPaths.length - 1) await new Promise((r) => setTimeout(r, RATE_LIMIT_MS));
  }

  saveManifest(newManifest);
  console.log(`\nDone: ${updated} new/updated, ${unchanged} unchanged, ${failed} failed, ${Object.keys(newManifest).length} total`);
}

main().catch((e) => { console.error(e); process.exit(1); });
