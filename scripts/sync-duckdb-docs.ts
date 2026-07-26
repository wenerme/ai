#!/usr/bin/env bun
/**
 * Sync DuckDB's current documentation from duckdb/duckdb-web.
 * Mirrors only docs/current and partitions its Markdown by independently useful domain.
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { cleanOutDir, collectFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/duckdb/duckdb-web");
const DOCS_DIR = join(REPO, "docs/current");
const MIN_CURRENT_DOC_FILES = 400;
const DUCKDB_WEB_URL = "https://github.com/duckdb/duckdb-web.git";

export interface DuckDbDocsGroup {
  name: string;
  directories: readonly string[];
  files: readonly string[];
  includeRemaining?: boolean;
}

export const DUCKDB_DOC_SKILLS: readonly DuckDbDocsGroup[] = [
  {
    name: "duckdb-docs",
    directories: ["configuration", "connect", "guides", "internals"],
    files: ["index.md", "lakehouse_formats.md"],
    includeRemaining: true,
  },
  { name: "duckdb-clients", directories: ["clients"], files: [] },
  { name: "duckdb-extensions", directories: ["core_extensions", "extensions"], files: [] },
  { name: "duckdb-data", directories: ["data"], files: [] },
  { name: "duckdb-dev", directories: ["dev"], files: [] },
  { name: "duckdb-quack", directories: ["quack"], files: [] },
  { name: "duckdb-sql", directories: ["sql"], files: [] },
  { name: "duckdb-ops", directories: ["operations_manual"], files: [] },
];

interface Frontmatter {
  title?: string;
  body: string;
}

export function assertSafeDuckDbCheckout(status: string, branch: string): void {
  if (status.trim()) throw new Error(`Refusing to sync from dirty DuckDB source checkout at ${REPO}`);
  if (branch.trim() !== "main") throw new Error(`Refusing to sync DuckDB source branch ${branch.trim() || "(detached)"}; expected main`);
}

function gitOutput(args: string[]): string {
  return execFileSync("git", args, { cwd: REPO, encoding: "utf-8" });
}

function ensureDuckDbSourceCheckout(): void {
  if (!existsSync(REPO)) {
    mkdirSync(dirname(REPO), { recursive: true });
    execFileSync("git", ["clone", "--depth", "1", "--single-branch", "--branch", "main", DUCKDB_WEB_URL, REPO], {
      stdio: "inherit",
    });
  } else {
    assertSafeDuckDbCheckout(gitOutput(["status", "--porcelain"]), gitOutput(["branch", "--show-current"]));
    execFileSync("git", ["pull", "--ff-only"], { cwd: REPO, stdio: "inherit" });
  }
  console.log(`  Current commit: ${gitOutput(["rev-parse", "--short", "HEAD"]).trim()}`);
}

function splitFrontmatter(content: string): Frontmatter {
  const normalized = content.replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { body: normalized };
  const title = match[1].match(/^title:\s*(?:["']([^"']+)["']|(.+?))\s*$/m);
  return {
    title: (title?.[1] ?? title?.[2])?.trim(),
    body: normalized.slice(match[0].length),
  };
}

function duckDbUrl(path: string): string {
  const normalized = path.trim().replace(/^['"]|['"]$/g, "").replace(/^\/+/, "");
  if (!normalized || /^(?:https?:|mailto:|#)/.test(normalized)) return normalized;

  let output = normalized;
  if (output.endsWith("/index.md")) output = output.slice(0, -"index.md".length);
  else if (output.endsWith(".md")) output = `${output.slice(0, -3)}.html`;
  return `https://duckdb.org/${output}`;
}

function duckDbPostUrl(slug: string): string {
  const match = slug.trim().match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/);
  if (!match) return "https://duckdb.org/news/";
  const [, year, month, day, title] = match;
  return `https://duckdb.org/${year}/${month}/${day}/${title}.html`;
}

function includeReplacement(attrs: string): string {
  const label = attrs.match(/\blabel\s*=\s*["']([^"']+)["']/i)?.[1];
  if (label) return label;
  const src = attrs.match(/\bsrc\s*=\s*["']([^"']+)["']/i)?.[1];
  return src ? `[Embedded content](${src})` : "";
}

function dynamicLinkFallback(url: string): string | undefined {
  if (url.includes("github.com/duckdb/duckdb-odbc/releases/download/")) {
    return "https://github.com/duckdb/duckdb-odbc/releases";
  }
  const maven = url.match(/^(https:\/\/repo1\.maven\.org\/maven2\/org\/duckdb\/duckdb_jdbc\/)/);
  return maven?.[1];
}

function replaceDynamicMarkdownLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\(([^)\n]*(?:\{%\s*if\s+site\.|\{\{\s*site\.)[^)\n]*)\)/g, (_, label, url) => {
    const fallback = dynamicLinkFallback(url);
    return fallback ? `[${label}](${fallback})` : label;
  });
}

function replaceBoxLinks(text: string): string {
  return text.replace(
    /^[ \t]*<div\s+class=["']box-link(?:\s+[^"']*)?["'][^>]*>\s*<a\s+href=["']([^"']+)["'][^>]*><\/a>[\s\S]*?<span(?:\s+[^>]*)?>([^<]+)<\/span>[\s\S]*?<\/div>/gim,
    (_, href, label) => `[${label.trim()}](${duckDbUrl(href.match(/\{%\s*link\s+([^%]+?)\s*%\}/)?.[1] ?? href)})`,
  );
}

function cleanLiquidAndHtml(text: string): string {
  let output = replaceDynamicMarkdownLinks(replaceBoxLinks(text));

  // Current-release branches are display-only version selectors. Keep their current branch.
  let previous: string;
  do {
    previous = output;
    output = output.replace(
      /\{%\s*if\b[^%]*%\}([\s\S]*?)\{%\s*else\s*%\}([\s\S]*?)\{%\s*endif\s*%\}/g,
      "$1",
    );
  } while (output !== previous);

  return output
    .replace(/\{%\s*include\s+[^\s%]+\s*([^%]*?)%\}/g, (_, attrs) => includeReplacement(attrs))
    .replace(/\{%\s*link\s+([^%]+?)\s*%\}/g, (_, path) => duckDbUrl(path))
    .replace(/\{%\s*post_url\s+([^%]+?)\s*%\}/g, (_, slug) => duckDbPostUrl(slug))
    .replace(/\{%\s*(?:if|else|endif|raw|endraw)[^%]*%\}/g, "")
    .replace(/\{\{\s*site\.[^}]+\}\}/g, "current release")
    .replace(/\{:\s*[^}]+\}/g, "")
    .replace(/<\/?(?:div|span|svg|use)\b[^>]*>/gi, "")
    .replace(/<br\s*\/?\s*>/gi, "")
    .replace(/&nbsp;/g, " ")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n");
}

function transformOutsideFences(content: string, transform: (text: string) => string): string {
  const lines = content.split("\n");
  const output: string[] = [];
  const prose: string[] = [];
  let fence: { char: string; width: number } | undefined;

  const flushProse = () => {
    if (prose.length > 0) output.push(transform(prose.splice(0).join("\n")));
  };

  for (const line of lines) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (!fence) {
      if (!marker) {
        prose.push(line);
        continue;
      }
      flushProse();
      fence = { char: marker[1][0], width: marker[1].length };
      output.push(line);
      continue;
    }

    output.push(line);
    if (marker && marker[1][0] === fence.char && marker[1].length >= fence.width) fence = undefined;
  }

  flushProse();
  return output.join("\n");
}

function redactSensitiveExamples(content: string): string {
  return content
    .replace(
      /PRAGMA\s+add_parquet_key\((\s*'[^']+'\s*),\s*'[^']+'\);/g,
      "PRAGMA add_parquet_key($1, 'EXAMPLE_PARQUET_ENCRYPTION_KEY');",
    )
    .replace(/\banalytics-team-token\b/g, "EXAMPLE_QUACK_TOKEN")
    .replace(/\byour_hf_token\b/g, "EXAMPLE_HUGGING_FACE_TOKEN")
    .replace(/\bmy_secret_key\d*\b/g, "EXAMPLE_SECRET_KEY_ID")
    .replace(/\bmy_secret_value\d*\b/g, "EXAMPLE_SECRET_VALUE")
    .replace(/s3_access_key_id=accessKey\d*/g, "s3_access_key_id=EXAMPLE_S3_ACCESS_KEY_ID")
    .replace(/s3_secret_access_key=secretKey\d*/g, "s3_secret_access_key=EXAMPLE_S3_SECRET_ACCESS_KEY")
    .replace(/PGPASSWORD="secret"/g, "PGPASSWORD=\"$POSTGRES_PASSWORD\"")
    .replace(/([a-z][a-z0-9+.-]*:\/\/)([^\s/:@'"<>]+):([^\s/@'"<>]+)@/gi, "$1EXAMPLE_USER:EXAMPLE_PASSWORD@");
}

export function cleanDuckDbMarkdown(content: string): string {
  const { title, body } = splitFrontmatter(redactSensitiveExamples(content));
  const cleanedBody = transformOutsideFences(body, cleanLiquidAndHtml).replace(/^\n+/, "");
  const withTitle = title ? `# ${title}\n\n${cleanedBody}` : cleanedBody;
  return withTitle.endsWith("\n") ? withTitle : `${withTitle}\n`;
}

function collectGroupFiles(docsDir: string, group: DuckDbDocsGroup): string[] {
  const files: string[] = [];

  for (const directory of group.directories) {
    const sourceDir = join(docsDir, directory);
    if (!existsSync(sourceDir)) throw new Error(`Missing DuckDB docs directory for ${group.name}: ${directory}`);
    files.push(...collectFiles({
      dir: sourceDir,
      base: docsDir,
      extensions: [".md", ".mdx"],
    }));
  }

  for (const file of group.files) {
    if (!existsSync(join(docsDir, file))) throw new Error(`Missing DuckDB docs file for ${group.name}: ${file}`);
    files.push(file);
  }

  const unique = [...new Set(files)].sort();
  if (unique.length !== files.length) throw new Error(`Duplicate source file inside ${group.name}`);
  if (unique.length === 0) throw new Error(`No DuckDB Markdown files found for ${group.name}`);
  return unique;
}

export function validateDuckDbPartition(
  docsDir: string,
  groups: readonly DuckDbDocsGroup[] = DUCKDB_DOC_SKILLS,
  minDocFiles = MIN_CURRENT_DOC_FILES,
): Map<string, string[]> {
  const expected = new Set(collectFiles({
    dir: docsDir,
    base: docsDir,
    extensions: [".md", ".mdx"],
  }));
  if (expected.size < minDocFiles) {
    throw new Error(`DuckDB docs/current unexpectedly small: ${expected.size} Markdown files`);
  }

  const owners = new Map<string, string>();
  const manifests = new Map<string, string[]>();
  const remainingGroups = groups.filter((group) => group.includeRemaining);
  if (remainingGroups.length > 1) throw new Error("Only one DuckDB skill may include remaining docs");

  for (const group of groups.filter((group) => !group.includeRemaining)) {
    if (manifests.has(group.name)) throw new Error(`Duplicate DuckDB skill name: ${group.name}`);
    const files = collectGroupFiles(docsDir, group);
    for (const file of files) {
      if (!expected.has(file)) throw new Error(`Unexpected DuckDB source file in ${group.name}: ${file}`);
      const owner = owners.get(file);
      if (owner) throw new Error(`DuckDB source file has multiple owners: ${file} (${owner}, ${group.name})`);
      owners.set(file, group.name);
    }
    manifests.set(group.name, files);
  }

  const remainingGroup = remainingGroups[0];
  if (remainingGroup) {
    if (manifests.has(remainingGroup.name)) throw new Error(`Duplicate DuckDB skill name: ${remainingGroup.name}`);
    const files = [...new Set([
      ...collectGroupFiles(docsDir, remainingGroup),
      ...[...expected].filter((file) => !owners.has(file)),
    ])].sort();
    for (const file of files) {
      const owner = owners.get(file);
      if (owner) throw new Error(`DuckDB source file has multiple owners: ${file} (${owner}, ${remainingGroup.name})`);
      owners.set(file, remainingGroup.name);
    }
    manifests.set(remainingGroup.name, files);
  }

  const missing = [...expected].filter((file) => !owners.has(file));
  if (missing.length > 0) throw new Error(`Unassigned DuckDB docs/current files: ${missing.join(", ")}`);
  return manifests;
}

export function syncDuckDbFiles(files: readonly string[], srcDir: string, outDir: string): { copied: number; skipped: number } {
  mkdirSync(outDir, { recursive: true });
  let copied = 0;
  let skipped = 0;

  for (const file of files) {
    const output = cleanDuckDbMarkdown(readFileSync(join(srcDir, file), "utf-8"));
    const destination = join(outDir, file);
    if (existsSync(destination) && readFileSync(destination, "utf-8") === output) {
      skipped++;
      continue;
    }
    mkdirSync(dirname(destination), { recursive: true });
    writeFileSync(destination, output);
    copied++;
  }

  return { copied, skipped };
}

export function syncDuckDbDocs(): void {
  ensureDuckDbSourceCheckout();

  const manifests = validateDuckDbPartition(DOCS_DIR);
  let total = 0;
  for (const group of DUCKDB_DOC_SKILLS) {
    const files = manifests.get(group.name)!;
    const outDir = join(import.meta.dir, `../skills/${group.name}/references`);
    const { copied, skipped } = syncDuckDbFiles(files, DOCS_DIR, outDir);
    cleanOutDir(outDir, new Set(files));
    total += files.length;
    console.log(`Synced ${group.name}: ${files.length} files, ${copied} copied, ${skipped} unchanged`);
  }
  console.log(`Synced ${total} DuckDB docs/current Markdown files across ${DUCKDB_DOC_SKILLS.length} skills`);
}

if (import.meta.main) syncDuckDbDocs();
