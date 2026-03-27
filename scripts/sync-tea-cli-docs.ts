#!/usr/bin/env bun
/**
 * Sync tea CLI documentation from gitea/tea.
 * Splits docs/CLI.md by ## headings into per-command reference files,
 * and copies README.md and example-workflows.md as-is.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { cloneOrPull, cleanupContent, cleanOutDir } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/gitea/tea");
const OUT_DIR = join(import.meta.dir, "../skills/tea-cli/references");

cloneOrPull({
  name: "gitea/tea",
  dir: REPO,
  url: "https://gitea.com/gitea/tea.git",
  branch: "main",
});

const cliMd = readFileSync(join(REPO, "docs/CLI.md"), "utf-8");
const readmeMd = readFileSync(join(REPO, "README.md"), "utf-8");
const workflowsMd = readFileSync(join(REPO, "docs/example-workflows.md"), "utf-8");

mkdirSync(OUT_DIR, { recursive: true });

const writtenFiles = new Set<string>();
let copied = 0;

function writeRef(relPath: string, content: string) {
  const cleaned = cleanupContent(content);
  const outPath = join(OUT_DIR, relPath);
  mkdirSync(join(outPath, ".."), { recursive: true });
  if (existsSync(outPath)) {
    const existing = readFileSync(outPath, "utf-8");
    if (existing === cleaned) {
      writtenFiles.add(relPath);
      return;
    }
  }
  writeFileSync(outPath, cleaned);
  writtenFiles.add(relPath);
  copied++;
}

// Write README and example-workflows as-is
writeRef("readme.md", readmeMd);
writeRef("example-workflows.md", workflowsMd);

// Split CLI.md by ## headings into commands/ directory
const lines = cliMd.split("\n");

// Find intro (before first ## heading) — contains NAME, SYNOPSIS, DESCRIPTION, GLOBAL OPTIONS
const h2s: { line: number; title: string }[] = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^## (.+)$/);
  if (m) h2s.push({ line: i, title: m[1] });
}

// Write intro section
if (h2s.length > 0) {
  const intro = lines.slice(0, h2s[0].line).join("\n");
  writeRef("commands/overview.md", intro);
}

// Write each command section
for (let i = 0; i < h2s.length; i++) {
  const start = h2s[i].line;
  const end = i + 1 < h2s.length ? h2s[i + 1].line : lines.length;
  const title = h2s[i].title;
  // Use first alias as filename: "logins, login" -> "logins"
  const slug = title.split(",")[0].trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const content = lines.slice(start, end).join("\n");
  writeRef(`commands/${slug}.md`, content);
}

console.log(`Split into ${writtenFiles.size} files (${copied} updated)`);
cleanOutDir(OUT_DIR, writtenFiles);
