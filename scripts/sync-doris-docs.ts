#!/usr/bin/env bun
/**
 * Sync Apache Doris documentation from local shallow clone of apache/doris-website.
 * Copies .md/.mdx files from docs/ to skills/doris-docs/references/,
 * preserving directory structure. Excludes releasenotes.
 *
 * Prerequisites: git clone --depth 1 --filter=blob:none --sparse https://github.com/apache/doris-website.git ~/gits/apache/doris-website
 *               cd ~/gits/apache/doris-website && git sparse-checkout set docs
 */

import { execSync } from "child_process";
import { existsSync, mkdirSync, readdirSync, rmSync, statSync, readFileSync, writeFileSync } from "fs";
import { join, relative, dirname } from "path";

const REPO = join(process.env.HOME!, "gits/apache/doris-website");
const DOCS_DIR = join(REPO, "docs");
const OUT_DIR = join(import.meta.dir, "../skills/doris-docs/references");

const SKIP_DIRS = new Set([
  "releasenotes", // Version-specific release notes
]);

function pullLatest() {
  if (!existsSync(REPO)) {
    console.error(`Doris website repo not found at ${REPO}`);
    console.error(
      "Run: git clone --depth 1 --filter=blob:none --sparse https://github.com/apache/doris-website.git ~/gits/apache/doris-website"
    );
    console.error("     cd ~/gits/apache/doris-website && git sparse-checkout set docs");
    process.exit(1);
  }
  console.log("Pulling latest from apache/doris-website...");
  try {
    execSync("git pull --ff-only", { cwd: REPO, stdio: "pipe" });
    const hash = execSync("git rev-parse --short HEAD", { cwd: REPO, encoding: "utf-8" }).trim();
    console.log(`  Current commit: ${hash}`);
  } catch (e: any) {
    console.warn(`  git pull failed: ${e.message?.split("\n")[0]}`);
  }
}

function sanitizeContent(content: string): string {
  return content;
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
      if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) {
        files.push(relative(base, join(dir, entry.name)));
      }
    }
  }
  return files;
}

function cleanOutDir(validFiles: Set<string>) {
  if (!existsSync(OUT_DIR)) return;
  let removed = 0;
  function walk(dir: string) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        if (readdirSync(full).length === 0) rmSync(full, { recursive: true });
      } else if (entry.isFile()) {
        const rel = relative(OUT_DIR, full);
        if (!validFiles.has(rel)) { rmSync(full); removed++; }
      }
    }
  }
  walk(OUT_DIR);
  if (removed > 0) console.log(`  Removed ${removed} stale files`);
}

function sync() {
  pullLatest();
  if (!existsSync(DOCS_DIR)) { console.error(`Docs not found: ${DOCS_DIR}`); process.exit(1); }

  const files = collectFiles(DOCS_DIR, DOCS_DIR);
  console.log(`Found ${files.length} doc files (excluding ${[...SKIP_DIRS].join(", ")})`);

  mkdirSync(OUT_DIR, { recursive: true });
  let copied = 0, skipped = 0;

  for (const rel of files) {
    const src = join(DOCS_DIR, rel);
    const dst = join(OUT_DIR, rel);
    if (existsSync(dst)) {
      const srcStat = statSync(src);
      const dstStat = statSync(dst);
      if (srcStat.size === dstStat.size && srcStat.mtimeMs <= dstStat.mtimeMs) { skipped++; continue; }
    }
    mkdirSync(dirname(dst), { recursive: true });
    writeFileSync(dst, sanitizeContent(readFileSync(src, "utf-8")));
    copied++;
  }

  cleanOutDir(new Set(files));
  console.log(`Synced: ${copied} copied, ${skipped} unchanged`);
}

sync();
