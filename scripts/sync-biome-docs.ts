#!/usr/bin/env bun
/**
 * Sync Biome documentation from local clone of biomejs/website.
 * Copies src/content/docs/ English files to skills/biome-docs/references/.
 * Skips non-English locale dirs (es, fr, ja, pl, pt-BR, ru, uk, zh-CN).
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/biomejs/website");
const DOCS_DIR = join(REPO, "src/content/docs");
const OUT_DIR = join(import.meta.dir, "../skills/biome-docs/references");

cloneOrPull({ name: "biomejs/website", dir: REPO, url: "https://github.com/biomejs/website.git" });

const LOCALE_DIRS = new Set(["es", "fr", "ja", "pl", "pt-BR", "ru", "uk", "zh-CN"]);

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  skipDirs: LOCALE_DIRS,
  extensions: [".md", ".mdx"],
});
console.log(`Found ${files.length} English doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
