#!/usr/bin/env bun
/**
 * Sync terraform-docs CLI documentation from terraform-docs/terraform-docs.
 * Copies Markdown docs under docs/ to skills/terraform-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/terraform-docs/terraform-docs");
const DOCS_DIR = join(REPO, "docs");
const OUT_DIR = join(import.meta.dir, "../skills/terraform-docs/references");

cloneOrPull({
  name: "terraform-docs/terraform-docs",
  dir: REPO,
  url: "https://github.com/terraform-docs/terraform-docs.git",
  branch: "master",
  sparse: ["docs"],
});

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  extensions: [".md"],
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR, (content) => content.replace(/[ \t]+$/gm, ""));
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
