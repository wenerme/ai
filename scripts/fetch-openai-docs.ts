#!/usr/bin/env bun
/**
 * Fetch OpenAI developer docs from developers.openai.com sitemap.
 * Dispatches files into multiple skills based on path:
 *
 *   openai-docs             — api/docs/** (guides, concepts, changelog)
 *   openai-api              — api/reference/resources/** (REST API ref, language-agnostic)
 *   openai-sdk-typescript   — api/reference/typescript/resources/**
 *   openai-sdk-python       — api/reference/python/resources/**
 *
 * Path remapping:
 *   api/docs/guides/agents                                              → guides/agents.md
 *   api/reference/resources/audio/subresources/speech/methods/create    → audio/speech/create.md
 *   api/reference/typescript/resources/audio/subresources/speech/...    → audio/speech/create.md
 */

import { mkdirSync, writeFileSync, readFileSync, existsSync } from "fs";
import { join, dirname } from "path";

const SITEMAP_URL = "https://developers.openai.com/sitemap-0.xml";
const BASE_URL = "https://developers.openai.com";
const SKILLS_DIR = join(import.meta.dir, "../skills");
const MANIFEST_PATH = join(SKILLS_DIR, ".openai-docs-manifest.json");
const RATE_LIMIT_MS = 200;

// SDK languages to download (only those confirmed working with .md)
const SDK_LANGS = ["typescript", "python"];
// Languages that return HTML (skip)
const SKIP_LANGS = ["go", "java", "ruby"];
// Top-level reference sections that don't support .md
const SKIP_SECTIONS = ["responses", "chat-completions", "realtime-beta", "administration", "overview"];

// Codex paths to skip (marketing, community, non-text content)
const CODEX_SKIP_PREFIXES = [
  "/codex/ambassadors",
  "/codex/community",
  "/codex/codex-for-oss-terms",
  "/codex/open-source",
  "/codex/explore",
  "/codex/videos",
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

/**
 * Simplify verbose OpenAI reference paths:
 *   audio/subresources/speech/methods/create → audio/speech/create
 */
function simplifyRefPath(p: string): string {
  return p.replace(/\/subresources\//g, "/").replace(/\/methods\//g, "/");
}

interface Route { skill: string; filepath: string; mdUrl: string }

function routeUrl(urlPath: string): Route | null {
  const p = urlPath.replace(/\/$/, "");

  // api/docs/** → openai-docs
  if (p.startsWith("/api/docs/")) {
    const rel = p.replace("/api/docs/", "");
    if (!rel) return null;
    return {
      skill: "openai-docs",
      filepath: rel + ".md",
      mdUrl: `${BASE_URL}${p}.md`,
    };
  }
  if (p === "/api/docs") return null;

  // api/reference/resources/** → openai-api (REST, language-agnostic)
  if (p.startsWith("/api/reference/resources/")) {
    const rel = simplifyRefPath(p.replace("/api/reference/resources/", ""));
    if (!rel || rel.startsWith("$")) return null; // skip $client, $shared
    return {
      skill: "openai-api",
      filepath: rel + ".md",
      mdUrl: `${BASE_URL}${p}/index.md`,
    };
  }

  // api/reference/{lang}/resources/** → openai-sdk-{lang}
  for (const lang of SDK_LANGS) {
    const prefix = `/api/reference/${lang}/resources/`;
    if (p.startsWith(prefix)) {
      const rel = simplifyRefPath(p.replace(prefix, ""));
      if (!rel || rel.startsWith("$")) return null;
      return {
        skill: `openai-sdk-${lang}`,
        filepath: rel + ".md",
        mdUrl: `${BASE_URL}${p}/index.md`,
      };
    }
  }

  // Skip known non-.md sections and other languages
  for (const s of [...SKIP_SECTIONS, ...SKIP_LANGS]) {
    if (p.startsWith(`/api/reference/${s}`)) return null;
  }

  // /codex/** → codex-docs (skip marketing/community pages)
  if (p.startsWith("/codex/")) {
    for (const skip of CODEX_SKIP_PREFIXES) {
      if (p.startsWith(skip)) return null;
    }
    const rel = p.replace("/codex/", "").replace(/\/$/, "");
    if (!rel) return null; // skip /codex/ root
    return {
      skill: "codex-docs",
      filepath: rel + ".md",
      mdUrl: `${BASE_URL}/codex/${rel}.md`,
    };
  }

  return null;
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
  const headers: Record<string, string> = { "User-Agent": "OpenAI-Docs-Fetcher/1.0" };
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

async function main() {
  const manifest = loadManifest();
  const newManifest: Manifest = {};
  const stats: Record<string, { updated: number; unchanged: number; failed: number }> = {};

  const allUrls = await fetchSitemap();
  console.log(`Sitemap: ${allUrls.length} total URLs`);

  // Filter to routable URLs
  const routes: Route[] = [];
  let skipped = 0;
  for (const u of allUrls) {
    const path = new URL(u).pathname;
    const route = routeUrl(path);
    if (route) routes.push(route);
    else skipped++;
  }
  console.log(`Routable: ${routes.length}, Skipped: ${skipped}\n`);

  for (let i = 0; i < routes.length; i++) {
    const { skill, filepath, mdUrl } = routes[i];
    const key = `${skill}/${filepath}`;
    const fullPath = join(SKILLS_DIR, skill, "references", filepath);
    const old = manifest[key];

    if (!stats[skill]) stats[skill] = { updated: 0, unchanged: 0, failed: 0 };
    try {
      const result = await fetchMd(mdUrl, old);
      if (result === "not-modified") {
        stats[skill].unchanged++;
        newManifest[key] = old;
      } else {
        mkdirSync(dirname(fullPath), { recursive: true });
        writeFileSync(fullPath, result.content);
        console.log(`[${i + 1}/${routes.length}] ${skill}/${filepath} ... ${old ? "updated" : `new (${(result.content.length / 1024).toFixed(0)}KB)`}`);
        stats[skill].updated++;
        newManifest[key] = { url: mdUrl, skill, etag: result.etag, lastModified: result.lastModified, size: result.content.length, updatedAt: new Date().toISOString() };
      }
    } catch (e: any) {
      console.log(`[${i + 1}/${routes.length}] ${skill}/${filepath} ... FAILED: ${e.message}`);
      stats[skill].failed++;
      if (old) newManifest[key] = old;
    }

    if (i < routes.length - 1) await new Promise((r) => setTimeout(r, RATE_LIMIT_MS));
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
