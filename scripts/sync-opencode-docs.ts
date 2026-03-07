#!/usr/bin/env bun
/**
 * Sync OpenCode documentation from local clone of anomalyco/opencode.
 * Copies .md/.mdx files from packages/docs/ plus key root-level docs
 * to skills/opencode-docs/references/.
 *
 * Prerequisites: git clone https://github.com/anomalyco/opencode.git ~/gits/anomalyco/opencode
 */

import { execSync } from "child_process";
import { existsSync, mkdirSync, readdirSync, rmSync, statSync, readFileSync, writeFileSync } from "fs";
import { join, relative, dirname } from "path";

const REPO = join(process.env.HOME!, "gits/anomalyco/opencode");
const DOCS_DIR = join(REPO, "packages/docs");
const OUT_DIR = join(import.meta.dir, "../skills/opencode-docs/references");

// Extra root-level files to include
const EXTRA_FILES = ["README.md", "AGENTS.md", "CONTRIBUTING.md", "STYLE_GUIDE.md"];

const SKIP_DIRS = new Set(["essentials"]); // Mintlify template files, not opencode-specific

function pullLatest() {
  if (!existsSync(REPO)) {
    console.log("Cloning anomalyco/opencode (shallow)...");
    mkdirSync(dirname(REPO), { recursive: true });
    execSync(`git clone --depth 1 https://github.com/anomalyco/opencode.git ${REPO}`, { stdio: "pipe" });
  } else {
    console.log("Pulling latest from anomalyco/opencode...");
    try {
      execSync("git pull --ff-only", { cwd: REPO, stdio: "pipe" });
    } catch {
      execSync("git fetch --depth 1 origin main && git reset --hard origin/main", { cwd: REPO, stdio: "pipe" });
    }
  }
  const hash = execSync("git rev-parse --short HEAD", { cwd: REPO, encoding: "utf-8" }).trim();
  console.log(`  Current commit: ${hash}`);
}

function collectFiles(dir: string, base: string): string[] {
  const files: string[] = [];
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
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

  // Collect from packages/docs/
  const docFiles = collectFiles(DOCS_DIR, DOCS_DIR);

  // Collect extra root-level files
  const extraFiles: string[] = [];
  for (const f of EXTRA_FILES) {
    if (existsSync(join(REPO, f))) extraFiles.push(f);
  }

  const allOutputFiles = [...docFiles, ...extraFiles];
  console.log(`Found ${docFiles.length} doc files + ${extraFiles.length} root files`);

  mkdirSync(OUT_DIR, { recursive: true });
  let copied = 0, skipped = 0;

  for (const rel of docFiles) {
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

  for (const rel of extraFiles) {
    const src = join(REPO, rel);
    const dst = join(OUT_DIR, rel);
    if (existsSync(dst)) {
      const srcStat = statSync(src);
      const dstStat = statSync(dst);
      if (srcStat.size === dstStat.size && srcStat.mtimeMs <= dstStat.mtimeMs) { skipped++; continue; }
    }
    writeFileSync(dst, readFileSync(src, "utf-8"));
    copied++;
  }

  cleanOutDir(new Set(allOutputFiles));
  if (copied > 0) console.log(`Synced: ${copied} copied`);
}

sync();
