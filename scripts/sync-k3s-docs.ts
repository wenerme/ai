#!/usr/bin/env bun
/**
 * Sync K3s documentation from local clone of k3s-io/docs.
 * Copies docs/ *.md/*.mdx files to skills/k3s-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/k3s-io/docs");
const DOCS_DIR = join(REPO, "docs");
const OUT_DIR = join(import.meta.dir, "../skills/k3s-docs/references");

cloneOrPull({
  name: "k3s-io/docs",
  dir: REPO,
  url: "https://github.com/k3s-io/docs.git",
  sparse: ["docs"],
});

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  extensions: [".md", ".mdx"],
  skipDirs: new Set(["release-notes", "release-notes-old"]),
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
