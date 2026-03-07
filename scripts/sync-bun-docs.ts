#!/usr/bin/env bun
/**
 * Sync Bun documentation from local shallow clone of oven-sh/bun.
 * Copies .mdx/.md files from docs/ to skills/bun-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/oven-sh/bun");
const DOCS_DIR = join(REPO, "docs");
const OUT_DIR = join(import.meta.dir, "../skills/bun-docs/references");

/** Sanitize example secrets that trigger GitHub push protection. */
function sanitize(content: string): string {
  return content
    .replace(/[A-Za-z0-9]{24,26}\.[A-Za-z0-9_-]{6}\.[A-Za-z0-9_-]{20,30}/g, "EXAMPLE_DISCORD_BOT_TOKEN")
    .replace(/eyJrIjo[A-Za-z0-9+/=]{20,}/g, "EXAMPLE_GRAFANA_API_KEY")
    .replace(/glsa_[A-Za-z0-9]{32,}_[a-f0-9]+/g, "glsa_EXAMPLE_SERVICE_ACCOUNT_TOKEN");
}

cloneOrPull({ name: "oven-sh/bun", dir: REPO, url: "https://github.com/oven-sh/bun.git", sparse: ["docs"] });

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  skipDirs: new Set(["images", "icons", "logo", "snippets"]),
  skipFiles: new Set(["docs.json", "normalize-internal-links.js", "style.css", "README.md"]),
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR, sanitize);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
