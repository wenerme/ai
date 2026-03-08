#!/usr/bin/env bun
/**
 * Sync HuggingFace Transformers documentation from local clone.
 * Copies .md files from docs/source/en/ to skills/transformers-docs/references/.
 * Excludes model_doc (443 individual model pages), tasks, internal, kernel_doc.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/huggingface/transformers");
const DOCS_DIR = join(REPO, "docs/source/en");
const OUT_DIR = join(import.meta.dir, "../skills/transformers-docs/references");

cloneOrPull({ name: "huggingface/transformers", dir: REPO, url: "https://github.com/huggingface/transformers.git" });

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  skipDirs: new Set(["model_doc", "tasks", "internal", "kernel_doc"]),
  extensions: [".md"],
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
