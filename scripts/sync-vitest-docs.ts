#!/usr/bin/env bun
/**
 * Sync Vitest documentation from local clone of vitest-dev/vitest.
 * Copies docs/ *.md files to skills/vitest-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/vitest-dev/vitest");
const DOCS_DIR = join(REPO, "docs");
const OUT_DIR = join(import.meta.dir, "../skills/vitest-docs/references");

cloneOrPull({ name: "vitest-dev/vitest", dir: REPO, url: "https://github.com/vitest-dev/vitest.git" });

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  skipDirs: new Set([".vitepress", "public", "node_modules"]),
  extensions: [".md"],
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
