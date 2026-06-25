#!/usr/bin/env bun
/**
 * Sync Hono documentation from honojs/website.
 * Copies Markdown docs under docs/ to skills/hono-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/honojs/website");
const DOCS_DIR = join(REPO, "docs");
const OUT_DIR = join(import.meta.dir, "../skills/hono-docs/references");

function cleanHonoDocs(content: string): string {
  return content
    .replace(/<Badge\s+[^>]*\/>/g, "")
    .replace(/[ \t]+$/gm, "");
}

cloneOrPull({
  name: "honojs/website",
  dir: REPO,
  url: "https://github.com/honojs/website.git",
  sparse: ["docs"],
});

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  extensions: [".md"],
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR, cleanHonoDocs);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
