#!/usr/bin/env bun
/**
 * Sync llama.cpp documentation from local clone of ggml-org/llama.cpp.
 * Copies .md files from docs/ to skills/llamacpp-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/ggml-org/llama.cpp");
const DOCS_DIR = join(REPO, "docs");
const OUT_DIR = join(import.meta.dir, "../skills/llamacpp-docs/references");

cloneOrPull({ name: "ggml-org/llama.cpp", dir: REPO, url: "https://github.com/ggml-org/llama.cpp.git", branch: "master" });

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  skipDirs: new Set(["android"]),
  extensions: [".md"],
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
