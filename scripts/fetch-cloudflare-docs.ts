#!/usr/bin/env bun
/**
 * Fetch Cloudflare developer docs from developers.cloudflare.com sitemap.
 * Downloads markdown via {url}index.md convention and dispatches pages into
 * focused Cloudflare skills based on the first URL path segment.
 *
 * URL mapping: https://developers.cloudflare.com/workers/runtime-apis/fetch/
 *            → skills/cloudflare-workers/references/workers/runtime-apis/fetch.md
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, unlinkSync, writeFileSync } from "fs";
import { dirname, join, relative } from "path";
import { parseLimit } from "./fetch-utils.ts";

const SITEMAP_INDEX_URL = "https://developers.cloudflare.com/sitemap.xml";
const BASE_URL = "https://developers.cloudflare.com";
const SKILLS_DIR = join(import.meta.dir, "../skills");
const MANIFEST_PATH = join(SKILLS_DIR, ".cloudflare-docs-manifest.json");
const CONCURRENCY = 20;

const ROUTES: Record<string, string[]> = {
  "cloudflare-docs": ["index", "directory"],
  "cloudflare-workers": [
    "workers",
    "pages",
    "durable-objects",
    "workflows",
    "containers",
    "workers-vpc",
    "dynamic-workers",
    "browser-run",
    "sandbox",
    "docs-for-agents",
    "agent-setup",
  ],
  "cloudflare-data": [
    "d1",
    "r2",
    "r2-sql",
    "kv",
    "queues",
    "hyperdrive",
    "vectorize",
    "pipelines",
    "artifacts",
    "secrets-store",
  ],
  "cloudflare-ai": [
    "ai",
    "workers-ai",
    "ai-gateway",
    "ai-search",
    "ai-crawl-control",
    "agents",
    "agent-memory",
    "agent-lee",
    "realtime",
    "stream",
    "images",
    "videos",
  ],
  "cloudflare-zero-trust": [
    "cloudflare-one",
    "warp-client",
    "tunnel",
    "1.1.1.1",
    "privacy-proxy",
    "privacy-gateway",
    "cloudflare-wan",
  ],
  "cloudflare-security": [
    "waf",
    "ddos-protection",
    "bots",
    "api-shield",
    "turnstile",
    "cloudflare-challenges",
    "rules",
    "ruleset-engine",
    "firewall",
    "cloudflare-network-firewall",
    "client-side-security",
    "security-center",
    "security",
    "smart-shield",
    "dmarc-management",
  ],
  "cloudflare-networking": [
    "dns",
    "ssl",
    "cache",
    "load-balancing",
    "magic-transit",
    "spectrum",
    "byoip",
    "network-flow",
    "network-interconnect",
    "multi-cloud-networking",
    "argo-smart-routing",
    "health-checks",
    "waiting-room",
    "registrar",
    "web3",
    "email-service",
    "email-routing",
    "cloudflare-for-platforms",
    "network",
    "network-error-logging",
    "speed",
  ],
  "cloudflare-observability-admin": [
    "analytics",
    "logs",
    "log-explorer",
    "radar",
    "notifications",
    "billing",
    "support",
    "fundamentals",
    "terraform",
    "pulumi",
    "resource-tagging",
    "glossary",
    "reference-architecture",
    "learning-paths",
    "use-cases",
    "migration-guides",
    "data-localization",
    "china-network",
    "tenant",
    "automatic-platform-optimization",
    "flagship",
    "key-transparency",
    "randomness-beacon",
    "moq",
    "google-tag-gateway",
    "time-services",
    "version-management",
    "web-analytics",
    "sponsorships",
    "zaraz",
  ],
};

const PREFIX_TO_SKILL = new Map<string, string>();
for (const [skill, prefixes] of Object.entries(ROUTES)) {
  for (const prefix of prefixes) PREFIX_TO_SKILL.set(prefix, skill);
}
const CLOUDFLARE_SKILLS = Object.keys(ROUTES);

interface ManifestEntry {
  url: string;
  skill?: string;
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
  const content = JSON.stringify(manifest, null, 2) + "\n";
  if (existsSync(MANIFEST_PATH) && readFileSync(MANIFEST_PATH, "utf-8") === content) return;
  writeFileSync(MANIFEST_PATH, content);
}

function normalizeMarkdown(content: string): string {
  return content.replace(/[ \t]+$/gm, "");
}

/** /workers/runtime-apis/fetch/ → workers/runtime-apis/fetch.md */
function urlToFilepath(path: string): string {
  const rel = path.replace(/^\//, "").replace(/\/$/, "");
  return (rel || "index") + ".md";
}

function routeFilepath(filepath: string): { skill: string; filepath: string } {
  const first = filepath.split("/")[0].replace(/\.md$/, "");
  const skill = PREFIX_TO_SKILL.get(first) ?? "cloudflare-observability-admin";
  return { skill, filepath };
}

function manifestKey(skill: string, filepath: string): string {
  return `${skill}/${filepath}`;
}

function skillReferencePath(skill: string, filepath: string): string {
  return join(SKILLS_DIR, skill, "references", filepath);
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
    if (!res.ok) {
      console.log(`  FAILED: ${res.status}`);
      continue;
    }
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

function removeEmptyDirs(dir: string) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    removeEmptyDirs(join(dir, entry.name));
  }
  if (readdirSync(dir).length === 0) rmSync(dir, { recursive: true });
}

function normalizeExistingReferenceFiles(manifest: Manifest) {
  for (const [key, entry] of Object.entries(manifest)) {
    const filepath = key.replace(`${entry.skill}/`, "");
    const fullPath = skillReferencePath(entry.skill!, filepath);
    if (!existsSync(fullPath)) continue;
    const content = readFileSync(fullPath, "utf-8");
    const normalized = normalizeMarkdown(content);
    if (content !== normalized) writeFileSync(fullPath, normalized);
    entry.size = normalized.length;
  }
}

function cleanupStaleReferenceFiles(validFiles: Set<string>) {
  let removed = 0;
  for (const skill of CLOUDFLARE_SKILLS) {
    const root = join(SKILLS_DIR, skill, "references");
    if (!existsSync(root)) continue;

    function walk(dir: string) {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(full);
        } else if (entry.isFile() && !validFiles.has(full)) {
          unlinkSync(full);
          removed++;
          console.log(`Removed stale: ${skill}/${relative(root, full)}`);
        }
      }
    }

    walk(root);
    removeEmptyDirs(root);
  }
  if (removed > 0) console.log(`Removed ${removed} stale files`);
}

async function main() {
  for (const skill of CLOUDFLARE_SKILLS) {
    mkdirSync(join(SKILLS_DIR, skill, "references"), { recursive: true });
  }

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
    if (shouldSkip(p)) {
      skipped++;
      return false;
    }
    return true;
  });
  if (limit) tasks = tasks.slice(0, limit);

  let done = 0;
  const total = tasks.length;

  async function processPath(path: string) {
    const filepath = urlToFilepath(path);
    const route = routeFilepath(filepath);
    const key = manifestKey(route.skill, route.filepath);
    const mdUrl = `${BASE_URL}${path}index.md`;
    const fullPath = skillReferencePath(route.skill, route.filepath);
    const old = existsSync(fullPath) ? (manifest[key] ?? manifest[filepath]) : undefined;

    try {
      const result = await fetchMarkdown(mdUrl, old);
      if (result === "not-modified") {
        unchanged++;
        newManifest[key] = { ...old!, skill: route.skill };
      } else if (result === "skip") {
        noMd++;
        if (old) newManifest[key] = { ...old, skill: route.skill };
      } else {
        const content = normalizeMarkdown(result.content);
        const size = content.length;
        if (old && old.size === size) {
          unchanged++;
          newManifest[key] = { ...old, skill: route.skill };
        } else {
          mkdirSync(dirname(fullPath), { recursive: true });
          writeFileSync(fullPath, content);
          updated++;
          newManifest[key] = {
            url: `${BASE_URL}${path}`,
            skill: route.skill,
            etag: result.etag,
            lastModified: result.lastModified,
            size,
            updatedAt: new Date().toISOString(),
          };
        }
      }
    } catch {
      noMd++;
      if (old) newManifest[key] = { ...old, skill: route.skill };
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
    const validFiles = new Set(
      Object.entries(newManifest).map(([key, entry]) => {
        const filepath = key.replace(`${entry.skill}/`, "");
        return skillReferencePath(entry.skill!, filepath);
      }),
    );
    cleanupStaleReferenceFiles(validFiles);
  }

  const finalManifest = limit ? { ...manifest, ...newManifest } : newManifest;
  normalizeExistingReferenceFiles(finalManifest);
  saveManifest(finalManifest);
  console.log(`\nDone: ${updated} saved, ${unchanged} cached, ${noMd} no-md, ${skipped} skipped`);
  console.log(`Total: ${Object.keys(newManifest).length} files in manifest`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
