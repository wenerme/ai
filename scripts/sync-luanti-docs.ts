#!/usr/bin/env bun
/**
 * Sync Luanti documentation from local clone of luanti-org/luanti.
 * Copies doc/*.md files to skills/luanti-docs/references/.
 * Also syncs user-facing docs from luanti-org/docs.luanti.org.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

// 1. Engine docs from luanti-org/luanti/doc/
const ENGINE_REPO = join(process.env.HOME!, "gits/luanti-org/luanti");
const ENGINE_DOCS = join(ENGINE_REPO, "doc");
const OUT_DIR = join(import.meta.dir, "../skills/luanti-docs/references");

cloneOrPull({
  name: "luanti-org/luanti",
  dir: ENGINE_REPO,
  url: "https://github.com/luanti-org/luanti.git",
  sparse: ["doc"],
});

const engineFiles = collectFiles({
  dir: ENGINE_DOCS,
  base: ENGINE_DOCS,
  extensions: [".md"],
  skipDirs: new Set(["mkdocs", "ides"]),
  skipFiles: new Set(["README.md"]),
});
console.log(`Found ${engineFiles.length} engine doc files`);

const { copied: c1 } = syncFiles(engineFiles, ENGINE_DOCS, join(OUT_DIR, "engine"));
cleanOutDir(join(OUT_DIR, "engine"), new Set(engineFiles));
if (c1 > 0) console.log(`Engine docs: ${c1} copied`);

// 2. User-facing docs from luanti-org/docs.luanti.org
const SITE_REPO = join(process.env.HOME!, "gits/luanti-org/docs.luanti.org");
const SITE_DOCS = join(SITE_REPO, "content");

cloneOrPull({
  name: "luanti-org/docs.luanti.org",
  dir: SITE_REPO,
  url: "https://github.com/luanti-org/docs.luanti.org.git",
  sparse: ["content"],
});

const siteFiles = collectFiles({
  dir: SITE_DOCS,
  base: SITE_DOCS,
  extensions: [".md"],
  skipDirs: new Set(["images", "img", "assets"]),
});
console.log(`Found ${siteFiles.length} site doc files`);

const { copied: c2 } = syncFiles(siteFiles, SITE_DOCS, join(OUT_DIR, "site"));
cleanOutDir(join(OUT_DIR, "site"), new Set(siteFiles));
if (c2 > 0) console.log(`Site docs: ${c2} copied`);
