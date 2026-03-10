#!/usr/bin/env bun
/**
 * Sync LlamaFactory documentation from local clone of hiyouga/LlamaFactory.
 * Copies:
 *   1. docs/zh/*.md (Chinese docs, skip empty stubs)
 *   2. data/README.md → dataset-format.md
 *   3. .github/copilot-instructions.md → architecture.md
 *   4. examples/README.md → examples.md
 *   5. README.md → overview.md
 */

import { join } from "path";
import { copyFileSync, mkdirSync, existsSync, statSync, readFileSync } from "fs";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/hiyouga/LlamaFactory");
const DOCS_DIR = join(REPO, "docs/zh");
const OUT_DIR = join(import.meta.dir, "../skills/llamafactory-docs/references");

cloneOrPull({ name: "hiyouga/LlamaFactory", dir: REPO, url: "https://github.com/hiyouga/LlamaFactory.git" });

// 1. Sync docs/zh/ (skip empty files < 10 bytes)
const allFiles = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  extensions: [".md"],
});
const docFiles = allFiles.filter((f) => {
  const fullPath = join(DOCS_DIR, f);
  return statSync(fullPath).size > 10;
});
console.log(`Found ${docFiles.length} non-empty Chinese doc files (of ${allFiles.length} total)`);

const { copied } = syncFiles(docFiles, DOCS_DIR, OUT_DIR);

// 2. Copy extra files with fixed names
const extras: [string, string][] = [
  [join(REPO, "data/README.md"), "dataset-format.md"],
  [join(REPO, ".github/copilot-instructions.md"), "architecture.md"],
  [join(REPO, "examples/README.md"), "examples.md"],
  [join(REPO, "README.md"), "overview.md"],
];

let extraCopied = 0;
const extraNames: string[] = [];
for (const [src, name] of extras) {
  extraNames.push(name);
  const dst = join(OUT_DIR, name);
  if (!existsSync(src)) continue;
  const srcStat = statSync(src);
  if (existsSync(dst) && statSync(dst).mtimeMs >= srcStat.mtimeMs) continue;
  mkdirSync(join(OUT_DIR), { recursive: true });
  copyFileSync(src, dst);
  extraCopied++;
}

cleanOutDir(OUT_DIR, new Set([...docFiles, ...extraNames]));

const total = copied + extraCopied;
if (total > 0) console.log(`Synced: ${copied} docs, ${extraCopied} extras`);
