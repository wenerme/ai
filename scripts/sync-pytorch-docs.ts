#!/usr/bin/env bun
/**
 * Sync PyTorch documentation from pytorch/pytorch.
 * Copies markdown and reStructuredText docs under docs/ to skills/pytorch-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/pytorch/pytorch");
const DOCS_DIR = join(REPO, "docs");
const OUT_DIR = join(import.meta.dir, "../skills/pytorch-docs/references");

cloneOrPull({
  name: "pytorch/pytorch",
  dir: REPO,
  url: "https://github.com/pytorch/pytorch.git",
  sparse: ["docs"],
});

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  skipDirs: new Set(["_static", "_templates", "scripts"]),
  extensions: [".md", ".rst"],
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR, (content) => content.replace(/[ \t]+$/gm, ""));
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
