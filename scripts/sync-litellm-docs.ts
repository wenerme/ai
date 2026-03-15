#!/usr/bin/env bun
/**
 * Sync LiteLLM documentation from local clone of BerriAI/litellm.
 * Copies docs/my-website/docs/ files to skills/litellm-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/BerriAI/litellm");
const DOCS_DIR = join(REPO, "docs/my-website/docs");
const OUT_DIR = join(import.meta.dir, "../skills/litellm-docs/references");

cloneOrPull({ name: "BerriAI/litellm", dir: REPO, url: "https://github.com/BerriAI/litellm.git" });

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  skipDirs: new Set(["img", "static", "src"]),
  extensions: [".md", ".mdx"],
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
