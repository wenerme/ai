#!/usr/bin/env bun
/**
 * Fetch Google AI (Gemini) docs from ai.google.dev.
 * Uses .md.txt suffix. Dispatches to:
 *   google-ai-api   — /api/** (Gemini REST API reference)
 *   google-ai-docs  — /gemini-api/docs/** (guides, quickstart, concepts)
 *
 * Google's sitemap is slow/unreliable, so we maintain a known page list
 * supplemented by link discovery from fetched pages.
 */

import { mkdirSync, writeFileSync, readFileSync, existsSync } from "fs";
import { join, dirname } from "path";

const BASE_URL = "https://ai.google.dev";
const SKILLS_DIR = join(import.meta.dir, "../skills");
const MANIFEST_PATH = join(SKILLS_DIR, ".google-ai-docs-manifest.json");
const RATE_LIMIT_MS = 300;

// Known API reference pages
const API_PAGES = [
  "/api",
  "/api/generate-content",
  "/api/caching",
  "/api/embeddings",
  "/api/files",
  "/api/live",
  "/api/models",
  "/api/tokens",
  "/api/batch-mode",
  "/api/semantic-retrieval",
  "/api/tuning",
];

// Known docs/guides pages
const DOC_PAGES = [
  "/gemini-api/docs/quickstart",
  "/gemini-api/docs/api-versions",
  "/gemini-api/docs/thinking",
  "/gemini-api/docs/text-generation",
  "/gemini-api/docs/image-understanding",
  "/gemini-api/docs/audio",
  "/gemini-api/docs/video",
  "/gemini-api/docs/document-processing",
  "/gemini-api/docs/structured-output",
  "/gemini-api/docs/function-calling",
  "/gemini-api/docs/code-execution",
  "/gemini-api/docs/grounding",
  "/gemini-api/docs/caching",
  "/gemini-api/docs/context-window",
  "/gemini-api/docs/long-context",
  "/gemini-api/docs/prompting-strategies",
  "/gemini-api/docs/safety",
  "/gemini-api/docs/embeddings",
  "/gemini-api/docs/pricing",
  "/gemini-api/docs/models/gemini-v2",
  "/gemini-api/docs/rate-limits",
  "/gemini-api/docs/openai",
  "/gemini-api/docs/files",
  "/gemini-api/docs/live",
  "/gemini-api/docs/imagen",
  "/gemini-api/docs/batch-mode",
  "/gemini-api/docs/tuning",
];

interface ManifestEntry {
  url: string;
  skill: string;
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

function routePath(path: string): { skill: string; filepath: string } | null {
  if (path.startsWith("/api/") || path === "/api") {
    const rel = path.replace(/^\/api\/?/, "") || "overview";
    return { skill: "google-ai-api", filepath: rel + ".md" };
  }
  if (path.startsWith("/gemini-api/docs/")) {
    const rel = path.replace(/^\/gemini-api\/docs\//, "");
    return { skill: "google-ai-docs", filepath: rel + ".md" };
  }
  return null;
}

async function fetchMdTxt(
  path: string,
  old: ManifestEntry | undefined,
): Promise<{ content: string; etag?: string; lastModified?: string } | "not-modified"> {
  const url = `${BASE_URL}${path}.md.txt`;
  const headers: Record<string, string> = { "User-Agent": "Google-AI-Docs-Fetcher/1.0" };
  if (old?.etag) headers["If-None-Match"] = old.etag;
  if (old?.lastModified) headers["If-Modified-Since"] = old.lastModified;

  const res = await fetch(url, { headers });
  if (res.status === 304) return "not-modified";
  if (!res.ok) throw new Error(`${res.status}`);

  const content = await res.text();
  if (content.startsWith("<!DOCTYPE") || content.includes("<html")) throw new Error("got HTML");
  return {
    content,
    etag: res.headers.get("etag") ?? undefined,
    lastModified: res.headers.get("last-modified") ?? undefined,
  };
}

/** Discover additional pages from links in fetched content */
function discoverLinks(content: string): string[] {
  const links: string[] = [];
  for (const m of content.matchAll(/https:\/\/ai\.google\.dev(\/api\/[^\s\)#]+|\/gemini-api\/docs\/[^\s\)#]+)/g)) {
    const path = m[1].replace(/\/$/, "");
    if (path && !path.includes(".") && path.length > 5) links.push(path);
  }
  return [...new Set(links)];
}

async function main() {
  const manifest = loadManifest();
  const newManifest: Manifest = {};
  const stats: Record<string, { updated: number; unchanged: number; failed: number }> = {};

  // Collect all pages (seed + discovered)
  const allPaths = new Set([...API_PAGES, ...DOC_PAGES]);
  const processed = new Set<string>();

  // Process in rounds to discover new links
  let round = 0;
  while (true) {
    const pending = [...allPaths].filter((p) => !processed.has(p));
    if (pending.length === 0) break;
    round++;
    if (round > 3) break; // max 3 rounds of discovery

    console.log(`Round ${round}: ${pending.length} pages to fetch\n`);

    for (let i = 0; i < pending.length; i++) {
      const path = pending[i];
      processed.add(path);
      const route = routePath(path);
      if (!route) continue;

      const { skill, filepath } = route;
      const key = `${skill}/${filepath}`;
      const fullPath = join(SKILLS_DIR, skill, "references", filepath);
      const old = manifest[key];

      if (!stats[skill]) stats[skill] = { updated: 0, unchanged: 0, failed: 0 };
      try {
        const result = await fetchMdTxt(path, old);
        if (result === "not-modified") {
          stats[skill].unchanged++;
          newManifest[key] = old;
        } else {
          mkdirSync(dirname(fullPath), { recursive: true });
          writeFileSync(fullPath, result.content);
          console.log(`[${i + 1}/${pending.length}] ${skill}/${filepath} ... ${old ? "updated" : `new (${(result.content.length / 1024).toFixed(0)}KB)`}`);
          stats[skill].updated++;
          newManifest[key] = { url: `${BASE_URL}${path}`, skill, etag: result.etag, lastModified: result.lastModified, size: result.content.length, updatedAt: new Date().toISOString() };

          // Discover new links (only in round 1)
          if (round === 1) {
            for (const link of discoverLinks(result.content)) {
              allPaths.add(link);
            }
          }
        }
      } catch (e: any) {
        console.log(`[${i + 1}/${pending.length}] ${skill}/${filepath} ... FAILED: ${e.message}`);
        stats[skill].failed++;
        if (old) newManifest[key] = old;
      }

      await new Promise((r) => setTimeout(r, RATE_LIMIT_MS));
    }
  }

  saveManifest(newManifest);
  console.log(`\n--- Summary ---`);
  for (const [skill, s] of Object.entries(stats).sort(([a], [b]) => a.localeCompare(b))) {
    if (s.updated > 0 || s.failed > 0) {
      console.log(`${skill}: ${s.updated} new/updated, ${s.failed} failed`);
    }
  }
  console.log(`Total: ${Object.keys(newManifest).length} files`);
}

main().catch((e) => { console.error(e); process.exit(1); });
