#!/usr/bin/env bun
/**
 * Sync Waku documentation from wakujs/waku.
 * Copies MDX docs under docs/ to skills/waku-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/wakujs/waku");
const DOCS_DIR = join(REPO, "docs");
const OUT_DIR = join(import.meta.dir, "../skills/waku-docs/references");

cloneOrPull({
  name: "wakujs/waku",
  dir: REPO,
  url: "https://github.com/wakujs/waku.git",
  sparse: ["docs"],
});

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  extensions: [".mdx"],
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR, (content) => content.replace(/[ \t]+$/gm, ""));
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
