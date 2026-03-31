#!/usr/bin/env bun
/**
 * Sync OpenCode documentation from local clone of anomalyco/opencode.
 * Sources:
 *   1. packages/docs/ — dev/meta docs (including essentials/)
 *   2. packages/web/src/content/docs/ — main product docs (English only, skip i18n subdirs)
 *   3. Root-level files: README.md, AGENTS.md, CONTRIBUTING.md, STYLE_GUIDE.md
 */

import { existsSync, writeFileSync, readFileSync } from "fs";
import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/anomalyco/opencode");
const DOCS_DIR = join(REPO, "packages/docs");
const WEB_DOCS_DIR = join(REPO, "packages/web/src/content/docs");
const OUT_DIR = join(import.meta.dir, "../skills/opencode-docs/references");

const EXTRA_FILES = ["README.md", "AGENTS.md", "CONTRIBUTING.md", "STYLE_GUIDE.md"];

// i18n subdirs under packages/web/src/content/docs/ to skip
const I18N_DIRS = new Set([
  "ar", "bs", "da", "de", "es", "fr", "it", "ja", "ko",
  "nb", "pl", "pt-br", "ru", "th", "tr", "zh-cn", "zh-tw",
]);

cloneOrPull({ name: "anomalyco/opencode", dir: REPO, url: "https://github.com/anomalyco/opencode.git" });

// 1. packages/docs/ (including essentials/)
const pkgDocFiles = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
});

// 2. packages/web/src/content/docs/ (English only)
const webDocFiles = collectFiles({
  dir: WEB_DOCS_DIR,
  base: WEB_DOCS_DIR,
  skipDirs: I18N_DIRS,
});

// Prefix web docs to avoid name collisions with packages/docs
const webDocPrefixed = webDocFiles.map((f) => join("web", f));

// 3. Root-level files
const extraFiles = EXTRA_FILES.filter((f) => existsSync(join(REPO, f)));

const allFiles = [...pkgDocFiles, ...webDocPrefixed, ...extraFiles];
console.log(`Found ${pkgDocFiles.length} pkg/docs + ${webDocFiles.length} web/docs + ${extraFiles.length} root files`);

const { copied: c1 } = syncFiles(pkgDocFiles, DOCS_DIR, OUT_DIR);
const { copied: c2 } = syncFiles(webDocFiles, WEB_DOCS_DIR, join(OUT_DIR, "web"));

// Sync extra files from REPO root
let c3 = 0;
for (const rel of extraFiles) {
  const src = join(REPO, rel);
  const dst = join(OUT_DIR, rel);
  writeFileSync(dst, readFileSync(src, "utf-8"));
  c3++;
}

cleanOutDir(OUT_DIR, new Set(allFiles));
if (c1 + c2 + c3 > 0) console.log(`Synced: ${c1 + c2 + c3} copied`);
