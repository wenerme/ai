#!/usr/bin/env bun
/**
 * Sync vLLM documentation from local clone of vllm-project/vllm.
 * Copies .md files from docs/ to skills/vllm-docs/references/,
 * preserving directory structure. Excludes assets, mkdocs config,
 * governance, community, and auto-generated API docs.
 *
 * Prerequisites: git clone --depth 1 https://github.com/vllm-project/vllm.git ~/gits/vllm-project/vllm
 */

import { execSync } from "child_process";
import { existsSync, mkdirSync, readdirSync, rmSync, statSync, readFileSync, writeFileSync } from "fs";
import { join, relative, dirname } from "path";

const REPO = join(process.env.HOME!, "gits/vllm-project/vllm");
const DOCS_DIR = join(REPO, "docs");
const OUT_DIR = join(import.meta.dir, "../skills/vllm-docs/references");

const SKIP_DIRS = new Set([
  "assets",        // Images and logos
  "mkdocs",        // MkDocs build config and theme
  "governance",    // Project governance
  "community",     // Community links
  "api",           // Auto-generated API reference
  "examples",      // Just a README pointer
  "contributing",  // Contributor guides
]);

// Skip large integration directories — too many small framework-specific pages
const SKIP_PATHS = new Set([
  "deployment/frameworks",
  "deployment/integrations",
]);

function pullLatest() {
  if (!existsSync(REPO)) {
    console.log(`Cloning vllm-project/vllm (shallow)...`);
    mkdirSync(dirname(REPO), { recursive: true });
    execSync(`git clone --depth 1 https://github.com/vllm-project/vllm.git ${REPO}`, { stdio: "pipe" });
  } else {
    console.log("Pulling latest from vllm-project/vllm...");
    try {
      execSync("git pull --ff-only", { cwd: REPO, stdio: "pipe" });
    } catch (e: any) {
      console.warn(`  git pull failed, trying fetch+reset...`);
      execSync("git fetch --depth 1 origin main && git reset --hard origin/main", { cwd: REPO, stdio: "pipe" });
    }
  }
  const hash = execSync("git rev-parse --short HEAD", { cwd: REPO, encoding: "utf-8" }).trim();
  console.log(`  Current commit: ${hash}`);
}

function collectFiles(dir: string, base: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    const relPath = relative(base, fullPath);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      if (SKIP_PATHS.has(relPath)) continue;
      files.push(...collectFiles(fullPath, base));
    } else if (entry.isFile()) {
      if (entry.name.endsWith(".md") && !entry.name.startsWith(".")) {
        // Skip include fragments
        if (entry.name.endsWith(".inc.md")) continue;
        files.push(relative(base, fullPath));
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
  console.log(`Found ${files.length} doc files (excluding ${[...SKIP_DIRS, ...SKIP_PATHS].join(", ")})`);

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
    writeFileSync(dst, readFileSync(src, "utf-8"));
    copied++;
  }

  cleanOutDir(new Set(files));
  if (copied > 0) console.log(`Synced: ${copied} copied`);
}

sync();
