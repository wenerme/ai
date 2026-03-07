#!/usr/bin/env bun
/**
 * Sync ClickHouse documentation from local shallow clone of ClickHouse/clickhouse-docs.
 * Copies .md/.mdx files from docs/ and knowledgebase/ to skills/clickhouse-docs/references/,
 * preserving directory structure. Excludes snippets, whats-new, home_links, about-us.
 *
 * Prerequisites: git clone --depth 1 --filter=blob:none --sparse https://github.com/ClickHouse/clickhouse-docs.git ~/gits/ClickHouse/clickhouse-docs
 *               cd ~/gits/ClickHouse/clickhouse-docs && git sparse-checkout set docs knowledgebase
 */

import { execSync } from "child_process";
import { existsSync, mkdirSync, readdirSync, rmSync, statSync, readFileSync, writeFileSync } from "fs";
import { join, relative, dirname } from "path";

const REPO = join(process.env.HOME!, "gits/ClickHouse/clickhouse-docs");
const DOCS_DIR = join(REPO, "docs");
const KB_DIR = join(REPO, "knowledgebase");
const OUT_DIR = join(import.meta.dir, "../skills/clickhouse-docs/references");

const SKIP_DIRS = new Set([
  "_snippets",    // Reusable doc snippets
  "_clients",     // Client include fragments
  "whats-new",    // Release announcements
  "home_links",   // Navigation links only
  "about-us",     // Company info
]);

function pullLatest() {
  if (!existsSync(REPO)) {
    console.log("Cloning ClickHouse/clickhouse-docs (sparse: docs/ knowledgebase/)...");
    mkdirSync(dirname(REPO), { recursive: true });
    execSync(`git clone --depth 1 --filter=blob:none --sparse https://github.com/ClickHouse/clickhouse-docs.git ${REPO}`, { stdio: "pipe" });
    execSync("git sparse-checkout set docs knowledgebase", { cwd: REPO, stdio: "pipe" });
  } else {
    console.log("Pulling latest from ClickHouse/clickhouse-docs...");
    try {
      execSync("git pull --ff-only", { cwd: REPO, stdio: "pipe" });
    } catch {
      execSync("git fetch --depth 1 origin main && git reset --hard origin/main", { cwd: REPO, stdio: "pipe" });
    }
  }
  const hash = execSync("git rev-parse --short HEAD", { cwd: REPO, encoding: "utf-8" }).trim();
  console.log(`  Current commit: ${hash}`);
}

function sanitizeContent(content: string): string {
  return content;
}

function collectFiles(dir: string, base: string): string[] {
  const files: string[] = [];
  if (!existsSync(dir)) return files;
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

  // Collect from both docs/ and knowledgebase/ with a shared output base
  const docsFiles = collectFiles(DOCS_DIR, DOCS_DIR).map((f) => `docs/${f}`);
  const kbFiles = collectFiles(KB_DIR, KB_DIR).map((f) => `knowledgebase/${f}`);
  const allFiles = [...docsFiles, ...kbFiles];
  console.log(`Found ${docsFiles.length} doc files + ${kbFiles.length} knowledgebase files (excluding ${[...SKIP_DIRS].join(", ")})`);

  mkdirSync(OUT_DIR, { recursive: true });
  let copied = 0, skipped = 0;

  for (const rel of allFiles) {
    // Map "docs/foo" -> REPO/docs/foo, "knowledgebase/foo" -> REPO/knowledgebase/foo
    const src = join(REPO, rel);
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

  cleanOutDir(new Set(allFiles));
  console.log(`Synced: ${copied} copied, ${skipped} unchanged`);
}

sync();
