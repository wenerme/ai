#!/usr/bin/env bun
/**
 * Sync Ghostty documentation from local clone of ghostty-org/website.
 * Copies docs/ *.mdx files to skills/ghostty-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/ghostty-org/website");
const DOCS_DIR = join(REPO, "docs");
const OUT_DIR = join(import.meta.dir, "../skills/ghostty-docs/references");

cloneOrPull({ name: "ghostty-org/website", dir: REPO, url: "https://github.com/ghostty-org/website.git" });

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  extensions: [".mdx", ".md"],
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
