#!/usr/bin/env bun
/**
 * Fetch Anthropic platform docs from platform.claude.com sitemap.
 * Dispatches files into multiple skills based on path:
 *
 *   anthropic-api          — api/ top-level, admin, messages, models, completions, beta (REST spec)
 *   anthropic-sdk-{lang}   — api/{lang}/ (typescript, python, java, go, ruby, csharp)
 *   anthropic-agent-sdk    — agent-sdk/
 *   anthropic-docs         — everything else
 */

import { mkdirSync, writeFileSync, readFileSync, existsSync } from "fs";
import { join, dirname } from "path";

const SITEMAP_URL = "https://platform.claude.com/sitemap.xml";
const BASE_URL = "https://platform.claude.com";
const SKILLS_DIR = join(import.meta.dir, "../skills");
const RATE_LIMIT_MS = 200;

// SDK languages that support .md download
const SDK_LANGS = ["typescript", "python", "java", "go", "ruby", "csharp"];
// Languages known to fail (return HTML)
const SKIP_LANGS = ["kotlin", "terraform", "cli", "php"];

interface ManifestEntry {
  url: string;
  skill: string;
  etag?: string;
  lastModified?: string;
  size: number;
  updatedAt: string;
}

type Manifest = Record<string, ManifestEntry>;

const MANIFEST_PATH = join(SKILLS_DIR, ".anthropic-docs-manifest.json");

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

/** Determine which skill a path belongs to, and its relative filepath within that skill's references/ */
function routePath(docPath: string): { skill: string; filepath: string } | null {
  // docPath: /docs/en/api/typescript/messages/create
  const rel = docPath.replace(/^\/docs\/en\//, "").replace(/\/$/, "");

  // agent-sdk/**
  if (rel.startsWith("agent-sdk/") || rel === "agent-sdk") {
    return { skill: "anthropic-agent-sdk", filepath: rel + ".md" };
  }

  // api/{lang}/** → anthropic-sdk-{lang}
  for (const lang of SDK_LANGS) {
    if (rel.startsWith(`api/${lang}/`)) {
      const sub = rel.replace(`api/${lang}/`, "");
      return { skill: `anthropic-sdk-${lang}`, filepath: sub + ".md" };
    }
  }

  // Skip known failing languages
  for (const lang of SKIP_LANGS) {
    if (rel.startsWith(`api/${lang}/`)) return null;
  }

  // api/** (top-level REST spec, admin, sdks overview, beta non-lang, etc.)
  if (rel.startsWith("api/") || rel === "api") {
    return { skill: "anthropic-api", filepath: rel + ".md" };
  }

  // Everything else → anthropic-docs
  return { skill: "anthropic-docs", filepath: rel + ".md" };
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
  path: string,
  old: ManifestEntry | undefined,
): Promise<{ content: string; etag?: string; lastModified?: string } | "not-modified"> {
  const url = `${BASE_URL}${path}.md`;
  const headers: Record<string, string> = {
    "User-Agent": "Anthropic-Docs-Fetcher/1.0",
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
  const manifest = loadManifest();
  const newManifest: Manifest = {};
  const skillStats: Record<string, { updated: number; unchanged: number; failed: number }> = {};

  const allUrls = await fetchSitemap();
  const paths = filterEnglishDocs(allUrls);
  console.log(`Found ${paths.length} English doc pages\n`);

  let skipped = 0;

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    const route = routePath(path);

    if (!route) {
      skipped++;
      continue;
    }

    const { skill, filepath } = route;
    const key = `${skill}/${filepath}`;
    const fullPath = join(SKILLS_DIR, skill, "references", filepath);
    const old = manifest[key];

    if (!skillStats[skill]) skillStats[skill] = { updated: 0, unchanged: 0, failed: 0 };

    try {
      const result = await fetchMarkdown(path, old);

      if (result === "not-modified") {
        skillStats[skill].unchanged++;
        newManifest[key] = old;
      } else {
        mkdirSync(dirname(fullPath), { recursive: true });
        writeFileSync(fullPath, result.content);
        console.log(`[${i + 1}/${paths.length}] ${skill}/${filepath} ... ${old ? "updated" : `new (${(result.content.length / 1024).toFixed(0)}KB)`}`);
        skillStats[skill].updated++;
        newManifest[key] = {
          url: `${BASE_URL}${path}`,
          skill,
          etag: result.etag,
          lastModified: result.lastModified,
          size: result.content.length,
          updatedAt: new Date().toISOString(),
        };
      }
    } catch (e: any) {
      console.log(`[${i + 1}/${paths.length}] ${skill}/${filepath} ... FAILED: ${e.message}`);
      skillStats[skill].failed++;
      if (old) newManifest[key] = old;
    }

    if (i < paths.length - 1) {
      await new Promise((r) => setTimeout(r, RATE_LIMIT_MS));
    }
  }

  saveManifest(newManifest);

  console.log(`\n--- Summary ---`);
  console.log(`Skipped: ${skipped} (unsupported languages)`);
  for (const [skill, stats] of Object.entries(skillStats).sort(([a], [b]) => a.localeCompare(b))) {
    if (stats.updated > 0 || stats.failed > 0) {
      console.log(`${skill}: ${stats.updated} new/updated, ${stats.failed} failed`);
    }
  }
  console.log(`Total: ${Object.keys(newManifest).length} files in manifest`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
