#!/usr/bin/env bun
/**
 * Fetch Claude Code documentation from code.claude.com sitemap.
 * Downloads English .md files to skills/claude-code-docs/references/
 *
 * Replaces the previous git-clone-based sync from ericbuess/claude-code-docs.
 * Also fetches the Claude Code CHANGELOG from GitHub.
 */

import { mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync, unlinkSync } from "fs";
import { join } from "path";

const SITEMAP_URL = "https://code.claude.com/docs/sitemap.xml";
const BASE_URL = "https://code.claude.com";
const CHANGELOG_URL = "https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md";
const OUT_DIR = join(import.meta.dir, "../skills/claude-code-docs/references");
const MANIFEST_PATH = join(OUT_DIR, "manifest.json");
const RATE_LIMIT_MS = 300;

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

/** /docs/en/hooks -> hooks.md */
function urlToFilename(path: string): string {
  return path.replace(/^\/docs\/en\//, "").replace(/\/$/, "") + ".md";
}

async function fetchSitemap(): Promise<string[]> {
  console.log(`Fetching sitemap: ${SITEMAP_URL}`);
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`Sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  const urls: string[] = [];
  for (const m of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
    urls.push(m[1]);
  }
  return urls;
}

function filterEnglishDocs(urls: string[]): string[] {
  return urls.filter((u) => u.includes("/docs/en/")).map((u) => new URL(u).pathname);
}

async function fetchMarkdown(
  url: string,
  old: ManifestEntry | undefined,
): Promise<{ content: string; etag?: string; lastModified?: string } | "not-modified"> {
  const headers: Record<string, string> = {
    "User-Agent": "Claude-Code-Docs-Fetcher/1.0",
  };
  if (old?.etag) headers["If-None-Match"] = old.etag;
  if (old?.lastModified) headers["If-Modified-Since"] = old.lastModified;

  const res = await fetch(url, { headers });
  if (res.status === 304) return "not-modified";
  if (!res.ok) throw new Error(`${res.status}`);

  const content = await res.text();
  if (content.startsWith("<!DOCTYPE") || content.includes("<html")) {
    throw new Error("got HTML");
  }
  return {
    content,
    etag: res.headers.get("etag") ?? undefined,
    lastModified: res.headers.get("last-modified") ?? undefined,
  };
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  const manifest = loadManifest();
  const newManifest: Manifest = {};
  let updated = 0;
  let unchanged = 0;
  let failed = 0;

  // --- Fetch docs from sitemap ---
  const allUrls = await fetchSitemap();
  const paths = filterEnglishDocs(allUrls);
  console.log(`Found ${paths.length} English doc pages\n`);

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    const filename = urlToFilename(path);
    const mdUrl = `${BASE_URL}${path}.md`;
    const old = manifest[filename];

    try {
      const result = await fetchMarkdown(mdUrl, old);
      if (result === "not-modified") {
        unchanged++;
        newManifest[filename] = old;
      } else {
        writeFileSync(join(OUT_DIR, filename), result.content);
        console.log(`[${i + 1}/${paths.length + 1}] ${filename} ... ${old ? "updated" : `new (${(result.content.length / 1024).toFixed(0)}KB)`}`);
        updated++;
        newManifest[filename] = {
          url: `${BASE_URL}${path}`,
          etag: result.etag,
          lastModified: result.lastModified,
          size: result.content.length,
          updatedAt: new Date().toISOString(),
        };
      }
    } catch (e: any) {
      console.log(`[${i + 1}/${paths.length + 1}] ${filename} ... FAILED: ${e.message}`);
      failed++;
      if (old) newManifest[filename] = old;
    }

    if (i < paths.length - 1) await new Promise((r) => setTimeout(r, RATE_LIMIT_MS));
  }

  // --- Fetch CHANGELOG ---
  {
    const filename = "changelog.md";
    const old = manifest[filename];

    try {
      const result = await fetchMarkdown(CHANGELOG_URL, old);
      if (result === "not-modified") {
        unchanged++;
        newManifest[filename] = old;
      } else {
        const header = `# Claude Code Changelog\n\n> **Source**: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md\n\n---\n\n`;
        const content = header + result.content;
        writeFileSync(join(OUT_DIR, filename), content);
        console.log(`[${paths.length + 1}/${paths.length + 1}] ${filename} ... ${old ? "updated" : `new (${(content.length / 1024).toFixed(0)}KB)`}`);
        updated++;
        newManifest[filename] = {
          url: CHANGELOG_URL,
          etag: result.etag,
          lastModified: result.lastModified,
          size: content.length,
          updatedAt: new Date().toISOString(),
        };
      }
    } catch (e: any) {
      console.log(`[${paths.length + 1}/${paths.length + 1}] ${filename} ... FAILED: ${e.message}`);
      failed++;
      if (old) newManifest[filename] = old;
    }
  }

  // --- Cleanup stale files ---
  const currentFiles = new Set(Object.keys(newManifest));
  const previousFiles = new Set(Object.keys(manifest));
  for (const f of previousFiles) {
    if (!currentFiles.has(f)) {
      const fp = join(OUT_DIR, f);
      if (existsSync(fp)) {
        unlinkSync(fp);
        console.log(`Removed stale: ${f}`);
      }
    }
  }

  saveManifest(newManifest);
  if (updated > 0 || failed > 0) {
    console.log(`\nDone: ${updated} new/updated, ${failed} failed, ${Object.keys(newManifest).length} total`);
  } else {
    console.log(`\nDone: no changes (${Object.keys(newManifest).length} files)`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
