#!/usr/bin/env bun
/**
 * Sync Bun documentation from local shallow clone of oven-sh/bun.
 * Copies .mdx/.md files from docs/ to skills/bun-docs/references/,
 * preserving directory structure. Excludes images, icons, logos, snippets, and config files.
 *
 * Prerequisites: git clone --depth 1 --filter=blob:none --sparse https://github.com/oven-sh/bun.git ~/gits/oven-sh/bun
 *               cd ~/gits/oven-sh/bun && git sparse-checkout set docs
 */

import { execSync } from "child_process";
import { existsSync, mkdirSync, readdirSync, rmSync, statSync, readFileSync, writeFileSync } from "fs";
import { join, relative, dirname } from "path";

const BUN_REPO = join(process.env.HOME!, "gits/oven-sh/bun");
const DOCS_DIR = join(BUN_REPO, "docs");
const OUT_DIR = join(import.meta.dir, "../skills/bun-docs/references");

// Directories to skip (non-doc assets)
const SKIP_DIRS = new Set(["images", "icons", "logo", "snippets"]);
// Files to skip
const SKIP_FILES = new Set(["docs.json", "normalize-internal-links.js", "style.css", "README.md"]);

function pullLatest() {
  if (!existsSync(BUN_REPO)) {
    console.error(`Bun repo not found at ${BUN_REPO}`);
    console.error(
      "Run: git clone --depth 1 --filter=blob:none --sparse https://github.com/oven-sh/bun.git ~/gits/oven-sh/bun"
    );
    console.error("     cd ~/gits/oven-sh/bun && git sparse-checkout set docs");
    process.exit(1);
  }

  console.log("Pulling latest from oven-sh/bun...");
  try {
    execSync("git pull --ff-only", { cwd: BUN_REPO, stdio: "pipe" });
    const hash = execSync("git rev-parse --short HEAD", { cwd: BUN_REPO, encoding: "utf-8" }).trim();
    console.log(`  Current commit: ${hash}`);
  } catch (e: any) {
    console.warn(`  git pull failed: ${e.message?.split("\n")[0]}`);
  }
}

function collectFiles(dir: string, base: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      files.push(...collectFiles(join(dir, entry.name), base));
    } else if (entry.isFile()) {
      if (SKIP_FILES.has(entry.name)) continue;
      if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) {
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
    // Discord bot tokens (base64.base64.base64 pattern)
    .replace(/[A-Za-z0-9]{24,26}\.[A-Za-z0-9_-]{6}\.[A-Za-z0-9_-]{20,30}/g, "EXAMPLE_DISCORD_BOT_TOKEN")
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
        // Remove empty dirs
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
  console.log(`Found ${files.length} doc files`);

  mkdirSync(OUT_DIR, { recursive: true });

  let copied = 0;
  let skipped = 0;

  for (const rel of files) {
    const src = join(DOCS_DIR, rel);
    const dst = join(OUT_DIR, rel);

    // Skip if unchanged
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

  // Clean up files that no longer exist in source
  cleanOutDir(new Set(files));

  console.log(`Synced: ${copied} copied, ${skipped} unchanged`);
}

sync();
