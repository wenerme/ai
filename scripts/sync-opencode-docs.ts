#!/usr/bin/env bun
/**
 * Sync OpenCode documentation from local clone of anomalyco/opencode.
 * Copies .md/.mdx files from packages/docs/ plus key root-level docs.
 */

import { existsSync, writeFileSync, readFileSync } from "fs";
import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/anomalyco/opencode");
const DOCS_DIR = join(REPO, "packages/docs");
const OUT_DIR = join(import.meta.dir, "../skills/opencode-docs/references");

const EXTRA_FILES = ["README.md", "AGENTS.md", "CONTRIBUTING.md", "STYLE_GUIDE.md"];

cloneOrPull({ name: "anomalyco/opencode", dir: REPO, url: "https://github.com/anomalyco/opencode.git" });

const docFiles = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  skipDirs: new Set(["essentials"]),
});

// Extra root-level files
const extraFiles = EXTRA_FILES.filter((f) => existsSync(join(REPO, f)));

const allFiles = [...docFiles, ...extraFiles];
console.log(`Found ${docFiles.length} doc files + ${extraFiles.length} root files`);

const { copied: c1 } = syncFiles(docFiles, DOCS_DIR, OUT_DIR);

// Sync extra files from REPO root to OUT_DIR
let c2 = 0;
for (const rel of extraFiles) {
  const src = join(REPO, rel);
  const dst = join(OUT_DIR, rel);
  writeFileSync(dst, readFileSync(src, "utf-8"));
  c2++;
}

cleanOutDir(OUT_DIR, new Set(allFiles));
if (c1 + c2 > 0) console.log(`Synced: ${c1 + c2} copied`);
