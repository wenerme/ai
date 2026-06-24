#!/usr/bin/env bun
/**
 * Sync Ultralytics documentation from ultralytics/ultralytics.
 * Copies English docs under docs/en/ plus reusable macros to skills/ultralytics-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/ultralytics/ultralytics");
const DOCS_DIR = join(REPO, "docs");
const EN_DIR = join(DOCS_DIR, "en");
const OUT_DIR = join(import.meta.dir, "../skills/ultralytics-docs/references");

const clean = (content: string) => content.replace(/[ \t]+$/gm, "");

cloneOrPull({
  name: "ultralytics/ultralytics",
  dir: REPO,
  url: "https://github.com/ultralytics/ultralytics.git",
  sparse: ["docs"],
});

const enFiles = collectFiles({
  dir: EN_DIR,
  base: EN_DIR,
  extensions: [".md"],
});
const macroFiles = collectFiles({
  dir: join(DOCS_DIR, "macros"),
  base: DOCS_DIR,
  extensions: [".md"],
});
console.log(`Found ${enFiles.length} English docs and ${macroFiles.length} macro files`);

const enResult = syncFiles(enFiles, EN_DIR, OUT_DIR, clean);
const macroResult = syncFiles(macroFiles, DOCS_DIR, OUT_DIR, clean);
const validFiles = new Set([...enFiles, ...macroFiles]);
cleanOutDir(OUT_DIR, validFiles);

const copied = enResult.copied + macroResult.copied;
if (copied > 0) console.log(`Synced: ${copied} copied`);
