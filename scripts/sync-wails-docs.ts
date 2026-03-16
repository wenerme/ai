#!/usr/bin/env bun
/**
 * Sync Wails documentation from local clone of wailsapp/wails.
 * Copies website/docs/ *.mdx files to skills/wails-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/wailsapp/wails");
const DOCS_DIR = join(REPO, "website/docs");
const OUT_DIR = join(import.meta.dir, "../skills/wails-docs/references");

cloneOrPull({ name: "wailsapp/wails", dir: REPO, url: "https://github.com/wailsapp/wails.git" });

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  skipDirs: new Set(["showcase"]),
  extensions: [".mdx", ".md"],
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
