#!/usr/bin/env bun
/**
 * Sync MikroORM documentation from local clone of mikro-orm/mikro-orm.
 * Copies docs/docs/*.md to skills/mikroorm-docs/references/.
 */

import { join } from "path";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/mikro-orm/mikro-orm");
const DOCS_DIR = join(REPO, "docs/docs");
const OUT_DIR = join(import.meta.dir, "../skills/mikroorm-docs/references");

cloneOrPull({ name: "mikro-orm/mikro-orm", dir: REPO, url: "https://github.com/mikro-orm/mikro-orm.git" });

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  skipDirs: new Set(["static", "src", "blog"]),
  extensions: [".md"],
});
console.log(`Found ${files.length} doc files`);

const { copied } = syncFiles(files, DOCS_DIR, OUT_DIR);
cleanOutDir(OUT_DIR, new Set(files));
if (copied > 0) console.log(`Synced: ${copied} copied`);
