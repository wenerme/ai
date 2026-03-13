#!/usr/bin/env bun
/**
 * Sync Happy Coder documentation from local clone of slopus/happy.
 * Copies docs/ *.md files to skills/slopus-happy-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/slopus/happy");
const DOCS_DIR = join(REPO, "docs");
const OUT_DIR = join(import.meta.dir, "../skills/slopus-happy-docs/references");

cloneOrPull({ name: "slopus/happy", dir: REPO, url: "https://github.com/slopus/happy.git" });

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  extensions: [".md"],
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
