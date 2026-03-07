#!/usr/bin/env bun
/**
 * Sync Apache Doris documentation from local shallow clone of apache/doris-website.
 * Copies .md/.mdx files from docs/ to skills/doris-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/apache/doris-website");
const DOCS_DIR = join(REPO, "docs");
const OUT_DIR = join(import.meta.dir, "../skills/doris-docs/references");

cloneOrPull({ name: "apache/doris-website", dir: REPO, url: "https://github.com/apache/doris-website.git", branch: "master", sparse: ["docs"] });

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  skipDirs: new Set(["releasenotes"]),
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
