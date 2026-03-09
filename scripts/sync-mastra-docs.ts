#!/usr/bin/env bun
/**
 * Sync Mastra documentation from local clone of mastra-ai/mastra.
 * Copies docs/src/content/en/*.mdx to skills/mastra-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/mastra-ai/mastra");
const DOCS_DIR = join(REPO, "docs/src/content/en");
const OUT_DIR = join(import.meta.dir, "../skills/mastra-docs/references");

cloneOrPull({ name: "mastra-ai/mastra", dir: REPO, url: "https://github.com/mastra-ai/mastra.git" });

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  extensions: [".mdx", ".md"],
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
