#!/usr/bin/env bun
/**
 * Sync ms-swift documentation from local clone of modelscope/swift.
 * Copies docs/source_en/*.md to skills/swift-ms-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/modelscope/swift");
const DOCS_DIR = join(REPO, "docs/source_en");
const OUT_DIR = join(import.meta.dir, "../skills/swift-ms-docs/references");

cloneOrPull({ name: "modelscope/swift", dir: REPO, url: "https://github.com/modelscope/swift.git" });

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  skipDirs: new Set(["_templates"]),
  extensions: [".md"],
});
console.log(`Found ${files.length} English doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
