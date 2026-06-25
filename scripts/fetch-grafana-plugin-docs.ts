#!/usr/bin/env bun
/**
 * Fetch Grafana plugin docs from grafana.com.
 * Discovers plugin markdown pages from llms-full.txt and docs/plugins.md.
 */

import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "fs";
import { dirname, join, relative } from "path";
import { cleanupContent } from "./common.ts";
import { type Manifest, type ManifestEntry, buildEntry, fetchMd, loadManifest, parseLimit, saveManifest, sleep } from "./fetch-utils.ts";

const BASE_URL = "https://grafana.com";
const FULL_INDEX_URL = `${BASE_URL}/llms-full.txt`;
const PLUGINS_INDEX_URL = `${BASE_URL}/docs/plugins.md`;
const OUT_DIR = join(import.meta.dir, "../skills/grafana-plugin-docs/references");
const MANIFEST_PATH = join(import.meta.dir, "../skills/.grafana-plugin-docs-manifest.json");
const RATE_LIMIT_MS = 50;
const USER_AGENT = "Grafana-Plugin-Docs-Fetcher/1.0";

interface PageTarget {
  url: string;
  filepath: string;
  priority: number;
}

function sanitize(content: string): string {
  return cleanupContent(content)
    .replace(/eyJrIjo[A-Za-z0-9+/=]{20,}/g, "EXAMPLE_GRAFANA_API_KEY")
    .replace(/glsa_[A-Za-z0-9]{32,}_[a-f0-9]+/g, "glsa_EXAMPLE_SERVICE_ACCOUNT_TOKEN")
    .replace(/\t/g, "    ")
    .replace(/[ \t]+$/gm, "");
}

function normalizeUrl(raw: string): string | undefined {
  const cleaned = raw.trim().replace(/[),.;]+$/g, "");
  if (cleaned !== `${BASE_URL}/docs/plugins` && cleaned !== `${BASE_URL}/docs/plugins.md` && !cleaned.startsWith(`${BASE_URL}/docs/plugins/`)) return undefined;
  let url: URL;
  try {
    url = new URL(cleaned);
  } catch {
    return undefined;
  }
  url.hash = "";
  url.search = "";

  if (url.pathname.endsWith("/")) url.pathname = `${url.pathname.slice(0, -1)}.md`;
  if (!url.pathname.endsWith(".md")) url.pathname = `${url.pathname}.md`;
  return url.toString();
}

function targetForUrl(url: string): PageTarget | undefined {
  const pathname = new URL(url).pathname;
  if (pathname === "/docs/plugins.md") return { url, filepath: "index.md", priority: 10 };
  if (!pathname.startsWith("/docs/plugins/")) return undefined;

  const withoutPrefix = pathname.replace(/^\/docs\/plugins\//, "").replace(/\.md$/, "").replace(/\/$/, "");
  const parts = withoutPrefix.split("/").filter(Boolean);
  if (parts.length === 0) return undefined;

  const pluginId = parts[0];
  if (parts.length === 1) return { url, filepath: `${pluginId}/index.md`, priority: 20 };
  if (parts[1] === "latest") {
    if (parts.length === 2) return { url, filepath: `${pluginId}/index.md`, priority: 30 };
    return { url, filepath: `${pluginId}/${parts.slice(2).join("/")}.md`, priority: 20 };
  }
  return { url, filepath: `${parts.join("/")}.md`, priority: 10 };
}

function addTarget(targets: Map<string, PageTarget>, target: PageTarget | undefined) {
  if (!target) return;
  const previous = targets.get(target.filepath);
  if (!previous || target.priority > previous.priority || (target.priority === previous.priority && target.url.localeCompare(previous.url) < 0)) {
    targets.set(target.filepath, target);
  }
}

function extractPluginUrls(markdown: string): string[] {
  const urls = new Set<string>();

  for (const match of markdown.matchAll(/https:\/\/grafana\.com\/docs\/plugins\/[^\s)\]"<>]+/g)) {
    const normalized = normalizeUrl(match[0]);
    if (normalized) urls.add(normalized);
  }

  for (const match of markdown.matchAll(/\]\((\/docs\/plugins\/[^\s)\]"<>]+)\)/g)) {
    const normalized = normalizeUrl(`${BASE_URL}${match[1]}`);
    if (normalized) urls.add(normalized);
  }

  return [...urls].sort();
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

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) throw new Error(`${url} failed: ${response.status}`);
  return response.text();
}

function writeUnavailablePage(target: PageTarget, reason: string) {
  const content = [
    "---",
    `title: \"${target.filepath} unavailable\"`,
    "---",
    "",
    `# ${target.filepath} unavailable`,
    "",
    `Grafana listed this plugin documentation page, but it could not be fetched while building this skill.`,
    "",
    `- Source: ${target.url}`,
    `- Fetch result: ${reason}`,
    "",
    "Re-run `just update-grafana-plugin-docs` later to refresh this page.",
    "",
  ].join("\n");
  const fullPath = join(OUT_DIR, target.filepath);
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, content);
  return { url: target.url, size: content.length, updatedAt: new Date().toISOString() } satisfies ManifestEntry;
}

async function fetchPage(target: PageTarget, old: ManifestEntry | undefined, fullPath: string) {
  const oldForConditional = existsSync(fullPath) ? old : undefined;
  const result = await fetchMd(target.url, oldForConditional, { userAgent: USER_AGENT });
  if (result === "skip") return "skip" as const;
  if (result === "not-modified") return "not-modified" as const;

  const content = sanitize(result.content);
  const size = content.length;
  if (old && old.size === size && existsSync(fullPath)) return { status: "unchanged" as const, entry: old };

  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, content);
  const entry = buildEntry(old, { url: target.url, size, etag: result.etag, lastModified: result.lastModified });
  return { status: "updated" as const, entry: entry ?? old ?? { url: target.url, size, updatedAt: new Date().toISOString() } };
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  const fullIndex = await fetchText(FULL_INDEX_URL);
  const pluginsIndex = await fetchText(PLUGINS_INDEX_URL);
  const discoveredUrls = new Set([...extractPluginUrls(fullIndex), normalizeUrl(PLUGINS_INDEX_URL)].filter((url): url is string => !!url));
  for (const url of extractPluginUrls(pluginsIndex)) discoveredUrls.add(url);

  const targets = new Map<string, PageTarget>();
  for (const url of discoveredUrls) addTarget(targets, targetForUrl(url));

  const allTargets = [...targets.values()].sort((a, b) => a.filepath.localeCompare(b.filepath));
  const limit = parseLimit();
  const runTargets = typeof limit === "number" ? allTargets.slice(0, limit) : allTargets;

  const pluginIds = new Set(allTargets.map((target) => target.filepath.split("/")[0]).filter((part) => part !== "index.md"));
  console.log(`Found ${allTargets.length} plugin doc pages across ${pluginIds.size} plugins`);
  if (limit) console.log(`Limit: fetching first ${runTargets.length} pages`);

  const manifest = loadManifest(MANIFEST_PATH);
  const newManifest: Manifest = limit ? { ...manifest } : {};
  let updated = 0;
  let unchanged = 0;
  let skipped = 0;
  let failed = 0;

  for (let index = 0; index < runTargets.length; index++) {
    const target = runTargets[index];
    const fullPath = join(OUT_DIR, target.filepath);
    const old = manifest[target.filepath];

    try {
      const result = await fetchPage(target, old, fullPath);
      if (result === "skip") {
        skipped++;
        if (old) newManifest[target.filepath] = old;
        else newManifest[target.filepath] = writeUnavailablePage(target, "skipped by fetcher");
      } else if (result === "not-modified") {
        unchanged++;
        if (old) newManifest[target.filepath] = old;
      } else {
        if (result.status === "updated") {
          updated++;
          console.log(`[${index + 1}/${runTargets.length}] ${target.filepath} ... ${old ? "updated" : "new"}`);
        } else {
          unchanged++;
        }
        newManifest[target.filepath] = result.entry;
      }
    } catch (error: any) {
      const message = String(error?.message ?? error);
      skipped++;
      if (old) {
        console.log(`[${index + 1}/${runTargets.length}] ${target.filepath} ... kept existing after fetch error: ${message}`);
        newManifest[target.filepath] = old;
      } else {
        console.log(`[${index + 1}/${runTargets.length}] ${target.filepath} ... unavailable placeholder: ${message}`);
        newManifest[target.filepath] = writeUnavailablePage(target, message);
      }
    }

    if (index < runTargets.length - 1) await sleep(RATE_LIMIT_MS);
  }

  if (!limit) removeStaleFiles(new Set(Object.keys(newManifest)));
  saveManifest(MANIFEST_PATH, newManifest);

  const total = Object.keys(newManifest).length;
  console.log(`Done: ${updated} new/updated, ${unchanged} unchanged, ${skipped} skipped, ${failed} failed, ${total} total`);
  if (failed > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
