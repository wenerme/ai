#!/usr/bin/env bun
/**
 * Sync NATS documentation from local clone of nats-io/nats.docs.
 * Copies current English GitBook markdown docs to skills/nats-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/nats-io/nats.docs");
const OUT_DIR = join(import.meta.dir, "../skills/nats-docs/references");

cloneOrPull({
  name: "nats-io/nats.docs",
  dir: REPO,
  url: "https://github.com/nats-io/nats.docs.git",
  branch: "master",
  sparse: [
    "README.md",
    "SUMMARY.md",
    "overview.md",
    "feature_comparison.md",
    "reference-protocols.md",
    "nats-concepts",
    "using-nats",
    "running-a-nats-service",
    "release_notes",
    "reference",
    "ngs",
    "howto-examples",
  ],
});

const files = collectFiles({
  dir: REPO,
  base: REPO,
  extensions: [".md"],
  skipDirs: new Set([
    ".git",
    ".github",
    ".gitbook",
    "_examples",
    "_layouts",
    "_tools",
    "assets",
    "docs",
    "legacy",
    "zh-cn",
  ]),
  skipFiles: new Set(["FEEDBACK.md", "building_the_book.md"]),
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, REPO, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
