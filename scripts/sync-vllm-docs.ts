#!/usr/bin/env bun
/**
 * Sync vLLM documentation from local clone of vllm-project/vllm.
 * Copies .md files from docs/ to skills/vllm-docs/references/.
 * Excludes assets, mkdocs config, governance, community, auto-generated API docs.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/vllm-project/vllm");
const DOCS_DIR = join(REPO, "docs");
const OUT_DIR = join(import.meta.dir, "../skills/vllm-docs/references");

cloneOrPull({ name: "vllm-project/vllm", dir: REPO, url: "https://github.com/vllm-project/vllm.git" });

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  skipDirs: new Set(["assets", "mkdocs", "governance", "community", "api", "examples", "contributing"]),
  skipPaths: new Set(["deployment/frameworks", "deployment/integrations"]),
  extensions: [".md"],
  skipFiles: new Set(["json_tip.inc.md"]),
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
