#!/usr/bin/env bun
/**
 * Sync Zellij documentation from zellij-org/zellij-org.github.io.
 * Copies docs/src/*.md files to skills/zellij-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/zellij-org/zellij-org.github.io");
const DOCS_DIR = join(REPO, "docs/src");
const OUT_DIR = join(import.meta.dir, "../skills/zellij-docs/references");

cloneOrPull({
  name: "zellij-org/zellij-org.github.io",
  dir: REPO,
  url: "https://github.com/zellij-org/zellij-org.github.io.git",
  sparse: ["docs/src"],
});

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  extensions: [".md"],
  skipDirs: new Set(["img"]),
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
