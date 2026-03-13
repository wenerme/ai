#!/usr/bin/env bun
/**
 * Sync Gitea documentation from local clone of gitea.com/gitea/docs.
 * Copies docs/ *.md files (latest dev version) to skills/gitea-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/go-gitea/gitea-docs");
const DOCS_DIR = join(REPO, "docs");
const OUT_DIR = join(import.meta.dir, "../skills/gitea-docs/references");

cloneOrPull({ name: "gitea/docs", dir: REPO, url: "https://gitea.com/gitea/docs.git" });

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  extensions: [".md"],
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
