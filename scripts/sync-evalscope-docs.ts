#!/usr/bin/env bun
/**
 * Sync EvalScope documentation from local clone of modelscope/evalscope.
 * Copies:
 *   1. docs/en/*.md files (official English docs, skip images/blog/experiments)
 *   2. *.local.md files (hand-curated deep-dive docs) → references/local/
 *   3. datasets.json → references/datasets.csv (converted from JSON)
 */

import { join } from "path";
import { copyFileSync, mkdirSync, existsSync, statSync, writeFileSync } from "fs";
import { cloneOrPull, collectFiles, cleanOutDir, syncFiles } from "./common.ts";

function jsonToCsv(jsonPath: string): string {
  const data: any[] = JSON.parse(require("fs").readFileSync(jsonPath, "utf-8"));
  const rows = [["name", "title", "dataset_id", "backends", "tags", "metrics", "subsets", "description"]];
  for (const d of data) {
    const metrics = (d.metrics ?? []).map((m: any) => (typeof m === "string" ? m : Object.keys(m).join("|"))).join("|");
    rows.push([
      d.name ?? "",
      d.title ?? "",
      d.dataset_id ?? "",
      (d.backends ?? []).join("|"),
      (d.tags ?? []).join("|"),
      metrics,
      (d.subset_list ?? []).join("|"),
      d.description ?? "",
    ]);
  }
  return rows.map((r) => r.map((v) => (v.includes(",") || v.includes('"') || v.includes("\n") ? `"${v.replace(/"/g, '""')}"` : v)).join(",")).join("\n") + "\n";
}

const REPO = join(process.env.HOME!, "gits/modelscope/evalscope");
const DOCS_DIR = join(REPO, "docs/en");
const OUT_DIR = join(import.meta.dir, "../skills/evalscope-docs/references");

cloneOrPull({ name: "modelscope/evalscope", dir: REPO, url: "https://github.com/modelscope/evalscope.git" });

// 1. Sync docs/en/ (skip images, _static, blog, experiments)
const docFiles = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  skipDirs: new Set(["images", "_static", "blog", "experiments"]),
  extensions: [".md"],
});
console.log(`Found ${docFiles.length} English doc files`);

const { copied } = syncFiles(docFiles, DOCS_DIR, OUT_DIR);
cleanOutDir(OUT_DIR, new Set([
  ...docFiles,
  // Keep local/ and datasets.csv from cleanup
  "local/overview.md",
  "local/api.md",
  "local/dataset.md",
  "local/registry.md",
  "local/backend.md",
  "local/app.md",
  "datasets.csv",
]));

// 2. Sync *.local.md → references/local/
const localDir = join(OUT_DIR, "local");
mkdirSync(localDir, { recursive: true });
let localCopied = 0;
const localFiles = ["overview", "api", "dataset", "registry", "backend", "app"];
for (const name of localFiles) {
  const src = join(REPO, `${name}.local.md`);
  const dst = join(localDir, `${name}.md`);
  if (!existsSync(src)) continue;
  const srcStat = statSync(src);
  if (existsSync(dst) && statSync(dst).mtimeMs >= srcStat.mtimeMs) continue;
  copyFileSync(src, dst);
  localCopied++;
}

// 3. Convert datasets.json → datasets.csv
const datasetsSrc = join(REPO, "datasets.json");
const datasetsDst = join(OUT_DIR, "datasets.csv");
let datasetCopied = false;
if (existsSync(datasetsSrc)) {
  const srcStat = statSync(datasetsSrc);
  if (!existsSync(datasetsDst) || statSync(datasetsDst).mtimeMs < srcStat.mtimeMs) {
    writeFileSync(datasetsDst, jsonToCsv(datasetsSrc));
    datasetCopied = true;
  }
}

const total = copied + localCopied + (datasetCopied ? 1 : 0);
if (total > 0) console.log(`Synced: ${copied} docs, ${localCopied} local, ${datasetCopied ? 1 : 0} datasets.csv`);
