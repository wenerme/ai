#!/usr/bin/env bun
/**
 * Sync Grafana documentation from local shallow clone of grafana/grafana.
 * Copies .md files from docs/sources/ to skills/grafana-docs/references/,
 * preserving directory structure. Excludes shared snippets, images, and whatsnew.
 *
 * Prerequisites: git clone --depth 1 --filter=blob:none --sparse https://github.com/grafana/grafana.git ~/gits/grafana/grafana
 *               cd ~/gits/grafana/grafana && git sparse-checkout set docs/sources
 */

import { execSync } from "child_process";
import { existsSync, mkdirSync, readdirSync, rmSync, statSync, readFileSync, writeFileSync } from "fs";
import { join, relative, dirname } from "path";

const GRAFANA_REPO = join(process.env.HOME!, "gits/grafana/grafana");
const DOCS_DIR = join(GRAFANA_REPO, "docs/sources");
const OUT_DIR = join(import.meta.dir, "../skills/grafana-docs/references");

// Directories to skip
const SKIP_DIRS = new Set([
  "shared",       // Reusable snippets, not standalone docs
  "whatsnew",     // Release notes, too noisy
  "breaking-changes", // Version-specific, low value for skill
]);

function pullLatest() {
  if (!existsSync(GRAFANA_REPO)) {
    console.error(`Grafana repo not found at ${GRAFANA_REPO}`);
    console.error(
      "Run: git clone --depth 1 --filter=blob:none --sparse https://github.com/grafana/grafana.git ~/gits/grafana/grafana"
    );
    console.error("     cd ~/gits/grafana/grafana && git sparse-checkout set docs/sources");
    process.exit(1);
  }

  console.log("Pulling latest from grafana/grafana...");
  try {
    execSync("git pull --ff-only", { cwd: GRAFANA_REPO, stdio: "pipe" });
    const hash = execSync("git rev-parse --short HEAD", { cwd: GRAFANA_REPO, encoding: "utf-8" }).trim();
    console.log(`  Current commit: ${hash}`);
  } catch (e: any) {
    console.warn(`  git pull failed: ${e.message?.split("\n")[0]}`);
  }
}

function collectFiles(dir: string, base: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      const relDir = relative(base, join(dir, entry.name));
      const topDir = relDir.split("/")[0];
      if (SKIP_DIRS.has(topDir)) continue;
      files.push(...collectFiles(join(dir, entry.name), base));
    } else if (entry.isFile()) {
      if (entry.name.endsWith(".md")) {
        files.push(relative(base, join(dir, entry.name)));
      }
    }
  }
  return files;
}

/**
 * Sanitize example secrets that trigger GitHub push protection.
 * These are dummy/example tokens from official docs, not real secrets.
 */
function sanitizeContent(content: string): string {
  return content
    // Grafana API keys (base64-encoded JSON starting with {"k":)
    .replace(/eyJrIjo[A-Za-z0-9+/=]{20,}/g, "EXAMPLE_GRAFANA_API_KEY")
    // Grafana service account tokens
    .replace(/glsa_[A-Za-z0-9]{32,}_[a-f0-9]+/g, "glsa_EXAMPLE_SERVICE_ACCOUNT_TOKEN");
}

function cleanOutDir(validFiles: Set<string>) {
  if (!existsSync(OUT_DIR)) return;
  let removed = 0;

  function walk(dir: string) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        if (readdirSync(full).length === 0) {
          rmSync(full, { recursive: true });
        }
      } else if (entry.isFile()) {
        const rel = relative(OUT_DIR, full);
        if (!validFiles.has(rel)) {
          rmSync(full);
          removed++;
        }
      }
    }
  }

  walk(OUT_DIR);
  if (removed > 0) console.log(`  Removed ${removed} stale files`);
}

function sync() {
  pullLatest();

  if (!existsSync(DOCS_DIR)) {
    console.error(`Docs directory not found: ${DOCS_DIR}`);
    process.exit(1);
  }

  const files = collectFiles(DOCS_DIR, DOCS_DIR);
  console.log(`Found ${files.length} doc files (excluding ${[...SKIP_DIRS].join(", ")})`);

  mkdirSync(OUT_DIR, { recursive: true });

  let copied = 0;
  let skipped = 0;

  for (const rel of files) {
    const src = join(DOCS_DIR, rel);
    const dst = join(OUT_DIR, rel);

    if (existsSync(dst)) {
      const srcStat = statSync(src);
      const dstStat = statSync(dst);
      if (srcStat.size === dstStat.size && srcStat.mtimeMs <= dstStat.mtimeMs) {
        skipped++;
        continue;
      }
    }

    mkdirSync(dirname(dst), { recursive: true });
    const content = sanitizeContent(readFileSync(src, "utf-8"));
    writeFileSync(dst, content);
    copied++;
  }

  cleanOutDir(new Set(files));

  console.log(`Synced: ${copied} copied, ${skipped} unchanged`);
}

sync();
