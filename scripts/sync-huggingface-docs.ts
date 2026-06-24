#!/usr/bin/env bun
/**
 * Sync Hugging Face Hub documentation from huggingface/hub-docs.
 * Copies markdown files under docs/ to skills/huggingface-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/huggingface/hub-docs");
const DOCS_DIR = join(REPO, "docs");
const OUT_DIR = join(import.meta.dir, "../skills/huggingface-docs/references");

cloneOrPull({
  name: "huggingface/hub-docs",
  dir: REPO,
  url: "https://github.com/huggingface/hub-docs.git",
  sparse: ["docs"],
});

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  extensions: [".md"],
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR, (content) => content.replace(/[ \t]+$/gm, ""));
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
