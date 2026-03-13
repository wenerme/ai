#!/usr/bin/env bun
/**
 * Sync Three.js API documentation from local clone of mrdoob/three.js.
 * Copies docs/pages/*.html.md files to skills/threejs-docs/references/.
 * Renames from .html.md to .md for cleaner paths.
 */

import { join, basename } from "path";
import { existsSync, mkdirSync, readdirSync, copyFileSync, statSync, unlinkSync } from "fs";
import { cloneOrPull } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/mrdoob/three.js");
const PAGES_DIR = join(REPO, "docs/pages");
const OUT_DIR = join(import.meta.dir, "../skills/threejs-docs/references");

cloneOrPull({ name: "mrdoob/three.js", dir: REPO, url: "https://github.com/mrdoob/three.js.git" });

// Collect all .html.md files (flat directory)
const files = readdirSync(PAGES_DIR).filter((f) => f.endsWith(".html.md"));
console.log(`Found ${files.length} API doc files`);

mkdirSync(OUT_DIR, { recursive: true });

let copied = 0;
const validFiles = new Set<string>();

for (const file of files) {
  const src = join(PAGES_DIR, file);
  const outName = file.replace(/\.html\.md$/, ".md");
  const dst = join(OUT_DIR, outName);
  validFiles.add(outName);

  const srcStat = statSync(src);
  if (!existsSync(dst) || statSync(dst).mtimeMs < srcStat.mtimeMs) {
    copyFileSync(src, dst);
    copied++;
  }
}

// Clean stale files
for (const f of readdirSync(OUT_DIR)) {
  if (f.endsWith(".md") && !validFiles.has(f)) {
    unlinkSync(join(OUT_DIR, f));
    console.log(`  Removed stale: ${f}`);
  }
}

if (copied > 0) console.log(`Synced: ${copied} copied`);
