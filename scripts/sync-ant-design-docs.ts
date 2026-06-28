#!/usr/bin/env bun
/**
 * Sync Ant Design zh-CN documentation from ant-design/ant-design.
 * Copies only zh-CN Markdown files under docs/ to skills/ant-design-docs/references/.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { cleanupContent, cleanOutDir, cloneOrPull, collectFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/ant-design/ant-design");
const DOCS_DIR = join(REPO, "docs");
const OUT_DIR = join(import.meta.dir, "../skills/ant-design-docs/references");

function outputPath(rel: string): string {
  return rel.replace(/\.zh-CN\.md$/, ".md");
}

function formatInstallDependencies(attrs: string): string {
  const commands: string[] = [];
  for (const match of attrs.matchAll(/([a-z]+)=(['"])(.*?)\2/g)) {
    const manager = match[1];
    const command = match[3].replace(/^\$\s*/, "").trim();
    if (command) commands.push(`- ${manager}: \`${command}\``);
  }
  return commands.length > 0 ? `\nInstall dependencies:\n${commands.join("\n")}\n` : "";
}

function cleanAntDesignDoc(content: string): string {
  return cleanupContent(content)
    .replace(/<code\s+[^>]*src=["']([^"']+)["'][^>]*>([\s\S]*?)<\/code>/g, (_, src, title) => {
      const label = String(title || "Demo").replace(/<[^>]+>/g, "").trim() || "Demo";
      return `> Demo: ${label} (source not bundled: ${src})`;
    })
    .replace(/<code\s+[^>]*src=["']([^"']+)["'][^>]*\/?>/g, (_, src) => `> Demo: Demo (source not bundled: ${src})`)
    .replace(/<InstallDependencies\s+([^>]*)><\/InstallDependencies>/g, (_, attrs) => formatInstallDependencies(attrs))
    .replace(/<InstallDependencies\s+([^>]*)\/?>/g, (_, attrs) => formatInstallDependencies(attrs))
    .replace(/\]\(((?!https?:\/\/)[^)]*)\.zh-CN\.md(#[^)]*)?\)/g, (_, link, hash = "") => `](${link}.md${hash})`)
    .replace(/<!--\s*prettier-ignore\s*-->/g, "")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trimEnd() + "\n";
}

cloneOrPull({
  name: "ant-design/ant-design",
  dir: REPO,
  url: "https://github.com/ant-design/ant-design.git",
  branch: "master",
  sparse: ["docs"],
});

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  extensions: [".md"],
}).filter((rel) => rel.endsWith(".zh-CN.md"));

console.log(`Found ${files.length} zh-CN doc files`);

mkdirSync(OUT_DIR, { recursive: true });
let copied = 0;
const validFiles = new Set<string>();

for (const rel of files) {
  const dstRel = outputPath(rel);
  const dst = join(OUT_DIR, dstRel);
  const output = cleanAntDesignDoc(readFileSync(join(DOCS_DIR, rel), "utf-8"));
  validFiles.add(dstRel);

  if (existsSync(dst) && readFileSync(dst, "utf-8") === output) continue;

  mkdirSync(dirname(dst), { recursive: true });
  writeFileSync(dst, output);
  copied++;
}

cleanOutDir(OUT_DIR, validFiles);
if (copied > 0) console.log(`Synced: ${copied} copied`);
