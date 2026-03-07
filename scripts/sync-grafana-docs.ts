#!/usr/bin/env bun
/**
 * Sync Grafana documentation from local shallow clone of grafana/grafana.
 * Copies .md files from docs/sources/ to skills/grafana-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/grafana/grafana");
const DOCS_DIR = join(REPO, "docs/sources");
const OUT_DIR = join(import.meta.dir, "../skills/grafana-docs/references");

function sanitize(content: string): string {
  return content
    .replace(/eyJrIjo[A-Za-z0-9+/=]{20,}/g, "EXAMPLE_GRAFANA_API_KEY")
    .replace(/glsa_[A-Za-z0-9]{32,}_[a-f0-9]+/g, "glsa_EXAMPLE_SERVICE_ACCOUNT_TOKEN");
}

cloneOrPull({ name: "grafana/grafana", dir: REPO, url: "https://github.com/grafana/grafana.git", sparse: ["docs/sources"] });

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  skipDirs: new Set(["shared", "whatsnew", "breaking-changes"]),
  extensions: [".md"],
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR, sanitize);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
