#!/usr/bin/env bun
/**
 * Sync ComfyUI documentation from local clone of Comfy-Org/docs.
 * Copies *.mdx/*.md files (skip snippets, zh-CN, images, logo, public).
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/Comfy-Org/docs");
const DOCS_DIR = REPO;
const OUT_DIR = join(import.meta.dir, "../skills/comfyui-docs/references");

cloneOrPull({ name: "Comfy-Org/docs", dir: REPO, url: "https://github.com/Comfy-Org/docs.git" });

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  skipDirs: new Set([
    "snippets", "zh-CN", "images", "logo", "public",
    "node_modules", ".git", ".github", ".claude", ".notes",
    "CONTRIBUTORS",
  ]),
  extensions: [".mdx", ".md"],
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
