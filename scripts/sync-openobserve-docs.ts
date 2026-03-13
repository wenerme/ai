#!/usr/bin/env bun
/**
 * Sync OpenObserve documentation from local clone of openobserve/openobserve-docs.
 * Copies docs/ *.md files to skills/openobserve-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/openobserve/openobserve-docs");
const DOCS_DIR = join(REPO, "docs");
const OUT_DIR = join(import.meta.dir, "../skills/openobserve-docs/references");

cloneOrPull({ name: "openobserve/openobserve-docs", dir: REPO, url: "https://github.com/openobserve/openobserve-docs.git" });

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  skipDirs: new Set(["images", "assets", "stylesheets", "js", "css"]),
  extensions: [".md"],
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
