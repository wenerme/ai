#!/usr/bin/env bun
/**
 * Sync glab CLI documentation from local clone of gitlab-org/cli.
 * Copies docs/ *.md files to skills/glab-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/gitlab-org/cli");
const DOCS_DIR = join(REPO, "docs");
const OUT_DIR = join(import.meta.dir, "../skills/glab-docs/references");

cloneOrPull({
  name: "gitlab-org/cli",
  dir: REPO,
  url: "https://gitlab.com/gitlab-org/cli.git",
  sparse: ["docs"],
});

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  extensions: [".md"],
  skipDirs: new Set(["img", "images"]),
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
