#!/usr/bin/env bun
/**
 * Sync ClickHouse documentation from local shallow clone of ClickHouse/clickhouse-docs.
 * Copies .md/.mdx files from docs/ and knowledgebase/ to skills/clickhouse-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/ClickHouse/clickhouse-docs");
const OUT_DIR = join(import.meta.dir, "../skills/clickhouse-docs/references");

const SKIP_DIRS = new Set(["_snippets", "_clients", "whats-new", "home_links", "about-us"]);

cloneOrPull({ name: "ClickHouse/clickhouse-docs", dir: REPO, url: "https://github.com/ClickHouse/clickhouse-docs.git", sparse: ["docs", "knowledgebase"] });

// Collect from docs/ and knowledgebase/, prefix paths so they don't collide
const docsFiles = collectFiles({ dir: join(REPO, "docs"), base: join(REPO, "docs"), skipDirs: SKIP_DIRS }).map((f) => `docs/${f}`);
const kbFiles = collectFiles({ dir: join(REPO, "knowledgebase"), base: join(REPO, "knowledgebase"), skipDirs: SKIP_DIRS }).map((f) => `knowledgebase/${f}`);
const allFiles = [...docsFiles, ...kbFiles];
console.log(`Found ${docsFiles.length} docs + ${kbFiles.length} knowledgebase files`);

// syncFiles expects paths relative to srcDir — use REPO as base since paths include prefix
const { copied } = syncFiles(allFiles, REPO, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(allFiles));
if (copied > 0) console.log(`Synced: ${copied} copied`);
