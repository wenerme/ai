#!/usr/bin/env bun
/**
 * Sync Immich documentation from local clone of immich-app/immich.
 * Copies docs/docs/ *.md/*.mdx files to skills/immich-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/immich-app/immich");
const DOCS_DIR = join(REPO, "docs/docs");
const OUT_DIR = join(import.meta.dir, "../skills/immich-docs/references");

cloneOrPull({
  name: "immich-app/immich",
  dir: REPO,
  url: "https://github.com/immich-app/immich.git",
  sparse: ["docs/docs"],
});

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  extensions: [".md", ".mdx"],
  skipDirs: new Set(["img", "partials"]),
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
