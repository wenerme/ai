#!/usr/bin/env bun
/**
 * Sync Gemini CLI documentation from local clone of google-gemini/gemini-cli.
 * Copies .md files from docs/ to skills/gemini-cli-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/google-gemini/gemini-cli");
const DOCS_DIR = join(REPO, "docs");
const OUT_DIR = join(import.meta.dir, "../skills/gemini-cli-docs/references");

cloneOrPull({ name: "google-gemini/gemini-cli", dir: REPO, url: "https://github.com/google-gemini/gemini-cli.git" });

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  skipDirs: new Set(["assets", "mermaid", "changelogs", "examples"]),
  extensions: [".md"],
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
