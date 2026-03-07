/**
 * Shared utilities for sync-*.ts scripts.
 */

import { execSync } from "child_process";
import { existsSync, mkdirSync, readdirSync, rmSync, statSync, readFileSync, writeFileSync } from "fs";
import { join, relative, dirname } from "path";

export interface CloneOptions {
  /** Display name, e.g. "org/repo" */
  name: string;
  /** Local directory to clone into */
  dir: string;
  /** Full GitHub HTTPS URL */
  url: string;
  /** Default branch (default: "main") */
  branch?: string;
  /** Sparse checkout paths — if set, uses --filter=blob:none --sparse */
  sparse?: string[];
}

/** Clone repo if missing, otherwise pull latest. */
export function cloneOrPull(opts: CloneOptions): void {
  const branch = opts.branch ?? "main";
  if (!existsSync(opts.dir)) {
    if (opts.sparse) {
      console.log(`Cloning ${opts.name} (sparse: ${opts.sparse.join(" ")})...`);
      mkdirSync(dirname(opts.dir), { recursive: true });
      execSync(`git clone --depth 1 --filter=blob:none --sparse ${opts.url} ${opts.dir}`, { stdio: "pipe" });
      execSync(`git sparse-checkout set ${opts.sparse.join(" ")}`, { cwd: opts.dir, stdio: "pipe" });
    } else {
      console.log(`Cloning ${opts.name} (shallow)...`);
      mkdirSync(dirname(opts.dir), { recursive: true });
      execSync(`git clone --depth 1 ${opts.url} ${opts.dir}`, { stdio: "pipe" });
    }
  } else {
    console.log(`Pulling latest from ${opts.name}...`);
    try {
      execSync("git pull --ff-only", { cwd: opts.dir, stdio: "pipe" });
    } catch {
      execSync(`git fetch --depth 1 origin ${branch} && git reset --hard origin/${branch}`, { cwd: opts.dir, stdio: "pipe" });
    }
  }
  const hash = execSync("git rev-parse --short HEAD", { cwd: opts.dir, encoding: "utf-8" }).trim();
  console.log(`  Current commit: ${hash}`);
}

export interface CollectOptions {
  dir: string;
  base: string;
  /** Directory names to skip (matched by entry name or top-level path segment) */
  skipDirs?: Set<string>;
  /** Relative paths (from base) to skip entirely */
  skipPaths?: Set<string>;
  /** File extensions to include (default: [".md", ".mdx"]) */
  extensions?: string[];
  /** File names to skip */
  skipFiles?: Set<string>;
}

/** Recursively collect doc files under dir, returning paths relative to base. */
export function collectFiles(opts: CollectOptions): string[] {
  const exts = opts.extensions ?? [".md", ".mdx"];
  const files: string[] = [];

  function walk(current: string) {
    if (!existsSync(current)) return;
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const full = join(current, entry.name);
      const rel = relative(opts.base, full);
      if (entry.isDirectory()) {
        if (opts.skipDirs?.has(entry.name)) continue;
        if (opts.skipPaths?.has(rel)) continue;
        walk(full);
      } else if (entry.isFile()) {
        if (opts.skipFiles?.has(entry.name)) continue;
        const ext = entry.name.slice(entry.name.lastIndexOf(".")).toLowerCase();
        if (exts.includes(ext)) files.push(rel);
      }
    }
  }

  walk(opts.dir);
  return files;
}

/** Remove files from outDir that are not in validFiles. Remove empty dirs. */
export function cleanOutDir(outDir: string, validFiles: Set<string>): void {
  if (!existsSync(outDir)) return;
  let removed = 0;

  function walk(dir: string) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        if (readdirSync(full).length === 0) rmSync(full, { recursive: true });
      } else if (entry.isFile()) {
        if (!validFiles.has(relative(outDir, full))) { rmSync(full); removed++; }
      }
    }
  }

  walk(outDir);
  if (removed > 0) console.log(`  Removed ${removed} stale files`);
}

/** Copy files from srcDir to outDir, skipping unchanged. Returns { copied, skipped }. */
export function syncFiles(
  files: string[],
  srcDir: string,
  outDir: string,
  transform?: (content: string) => string,
): { copied: number; skipped: number } {
  mkdirSync(outDir, { recursive: true });
  let copied = 0, skipped = 0;

  for (const rel of files) {
    const src = join(srcDir, rel);
    const dst = join(outDir, rel);
    if (existsSync(dst)) {
      const ss = statSync(src), ds = statSync(dst);
      if (ss.size === ds.size && ss.mtimeMs <= ds.mtimeMs) { skipped++; continue; }
    }
    mkdirSync(dirname(dst), { recursive: true });
    const content = readFileSync(src, "utf-8");
    writeFileSync(dst, transform ? transform(content) : content);
    copied++;
  }

  return { copied, skipped };
}
