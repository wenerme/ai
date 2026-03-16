#!/usr/bin/env bun
/**
 * Sync Vite documentation from local clone of vitejs/vite.
 * Copies docs/ *.md files to skills/vite-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/vitejs/vite");
const DOCS_DIR = join(REPO, "docs");
const OUT_DIR = join(import.meta.dir, "../skills/vite-docs/references");

cloneOrPull({ name: "vitejs/vite", dir: REPO, url: "https://github.com/vitejs/vite.git" });

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  skipDirs: new Set([".vitepress", "public", "images", "node_modules", "_data"]),
  extensions: [".md"],
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
