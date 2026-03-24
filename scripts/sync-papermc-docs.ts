#!/usr/bin/env bun
/**
 * Sync PaperMC documentation from local clone of PaperMC/docs.
 * Copies src/content/docs/ *.md/*.mdx files to skills/papermc-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/PaperMC/docs");
const DOCS_DIR = join(REPO, "src/content/docs");
const OUT_DIR = join(import.meta.dir, "../skills/papermc-docs/references");

cloneOrPull({
  name: "PaperMC/docs",
  dir: REPO,
  url: "https://github.com/PaperMC/docs.git",
  sparse: ["src/content/docs"],
});

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  extensions: [".md", ".mdx"],
  skipDirs: new Set(["assets", "images", "img"]),
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
