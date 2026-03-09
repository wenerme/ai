#!/usr/bin/env bun
/**
 * Sync EvalScope documentation from local clone of modelscope/evalscope.
 * Copies:
 *   1. docs/en/*.md files (official English docs, skip images/blog/experiments)
 *   2. datasets.json → references/datasets.csv (converted from JSON)
 */

import { join } from "path";
import { existsSync, statSync, writeFileSync } from "fs";
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
cleanOutDir(OUT_DIR, new Set([...docFiles, "datasets.csv"]));

// 2. Convert datasets.json → datasets.csv
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

const total = copied + (datasetCopied ? 1 : 0);
if (total > 0) console.log(`Synced: ${copied} docs, ${datasetCopied ? 1 : 0} datasets.csv`);
