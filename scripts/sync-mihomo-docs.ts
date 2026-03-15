#!/usr/bin/env bun
/**
 * Sync mihomo (Clash Meta) documentation from local clone of MetaCubeX/Meta-Docs.
 * Copies docs/ *.md files (zh + en, skip ru and assets) to skills/mihomo-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/MetaCubeX/Meta-Docs");
const DOCS_DIR = join(REPO, "docs");
const OUT_DIR = join(import.meta.dir, "../skills/mihomo-docs/references");

cloneOrPull({ name: "MetaCubeX/Meta-Docs", dir: REPO, url: "https://github.com/MetaCubeX/Meta-Docs.git" });

const allFiles = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  skipDirs: new Set(["assets"]),
  extensions: [".md"],
});

// Skip Russian translations
const files = allFiles.filter((f) => !f.endsWith(".ru.md"));
console.log(`Found ${files.length} doc files (${allFiles.length} total, skipped ${allFiles.length - files.length} ru)`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
