#!/usr/bin/env bun
/**
 * Sync oRPC documentation from local clone of unnoq/orpc.
 * Copies .md files from apps/content/docs/ to skills/orpc-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/unnoq/orpc");
const DOCS_DIR = join(REPO, "apps/content/docs");
const OUT_DIR = join(import.meta.dir, "../skills/orpc-docs/references");

cloneOrPull({ name: "unnoq/orpc", dir: REPO, url: "https://github.com/unnoq/orpc.git" });

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  extensions: [".md"],
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
