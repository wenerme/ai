#!/usr/bin/env bun
/**
 * Sync PowerDNS Authoritative Server documentation from PowerDNS/pdns.
 * Keeps the upstream reStructuredText source format and expands Sphinx include
 * directives that point to files outside the docs tree.
 */

import { execSync } from "child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "fs";
import { dirname, extname, join, relative, resolve } from "path";
import { cloneOrPull, collectFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/PowerDNS/pdns");
const DOCS_DIR = join(REPO, "docs");
const OUT_DIR = join(import.meta.dir, "../skills/powerdns-docs/references");

const SPARSE_PATHS = [
  "docs",
  "COPYING",
  "modules/godbcbackend/schema.mssql.sql",
  "modules/gmysqlbackend/enable-foreign-keys.mysql.sql",
  "modules/gmysqlbackend/schema.mysql.sql",
  "modules/gpgsqlbackend/schema.pgsql.sql",
  "modules/gsqlite3backend/4.3.0_to_4.3.1_schema.sqlite3.sql",
  "modules/gsqlite3backend/schema.sqlite3.sql",
  "modules/ldapbackend/dnsdomain2.schema",
  "modules/pipebackend/backend-v3.pl",
  "modules/pipebackend/backend-v5.pl",
  "modules/pipebackend/backend.pl",
];

const SKIP_FILES = new Set([
  "http-api/openapi/spectral-ruleset.yaml",
  "security-advisories/security-policy.rst",
]);

cloneOrPull({
  name: "PowerDNS/pdns",
  dir: REPO,
  url: "https://github.com/PowerDNS/pdns.git",
  branch: "master",
  sparse: ["docs"],
});
execSync(`git sparse-checkout set --skip-checks ${SPARSE_PATHS.join(" ")}`, { cwd: REPO, stdio: "pipe" });

const files = collectFiles({
  dir: DOCS_DIR,
  base: DOCS_DIR,
  extensions: [".rst", ".yaml"],
  skipDirs: new Set(["_build", "_static"]),
  skipPaths: new Set(["common/api"]),
}).filter((rel) => !SKIP_FILES.has(rel));
console.log(`Found ${files.length} PowerDNS doc files`);

function cleanText(content: string): string {
  return content
    .replace(/\r\n/g, "\n")
    .replace(/\t/g, "    ")
    .replace(/^=======$/gm, "========")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{4,}/g, "\n\n\n")
    .trimEnd() + "\n";
}

function languageFromPath(path: string): string {
  const ext = extname(path).toLowerCase();
  if (ext === ".sql") return "sql";
  if (ext === ".pl") return "perl";
  if (ext === ".schema") return "text";
  if (ext === ".rst") return "rst";
  return "text";
}

function safeReadInclude(currentRel: string, target: string): { path: string; content: string } | undefined {
  const sourcePath = resolve(DOCS_DIR, dirname(currentRel), target);
  const repoRoot = resolve(REPO);
  if (!sourcePath.startsWith(repoRoot + "/") && sourcePath !== repoRoot) return undefined;
  if (!existsSync(sourcePath)) return undefined;
  return { path: sourcePath, content: readFileSync(sourcePath, "utf-8") };
}

function expandRstIncludes(content: string, currentRel: string, stack = new Set<string>()): string {
  const lines = cleanText(content).split("\n");
  const out: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^(\s*)\.\. (include|literalinclude)::\s+(.+?)\s*$/);
    if (!match) {
      out.push(line);
      continue;
    }

    const [, indent, kind, rawTarget] = match;
    const target = rawTarget.trim();
    const options: string[] = [];
    let j = i + 1;
    while (j < lines.length && /^\s+:[A-Za-z0-9_-]+:/.test(lines[j])) {
      options.push(lines[j]);
      j++;
    }
    i = j - 1;

    const found = safeReadInclude(currentRel, target);
    if (!found) {
      out.push(`${indent}.. warning:: Unable to expand ${kind}: ${target}`);
      continue;
    }

    const includedRel = relative(DOCS_DIR, found.path);
    if (kind === "include") {
      if (stack.has(found.path)) {
        out.push(`${indent}.. warning:: Recursive include skipped: ${target}`);
        continue;
      }
      stack.add(found.path);
      const expanded = expandRstIncludes(found.content, includedRel, stack).trimEnd();
      stack.delete(found.path);
      out.push(`${indent}.. Expanded include: ${target}`);
      out.push("");
      out.push(expanded);
      continue;
    }

    const explicitLanguage = options
      .map((option) => option.match(/^\s+:language:\s*(\S+)/)?.[1])
      .find(Boolean);
    const language = explicitLanguage ?? languageFromPath(found.path);
    const expanded = cleanText(found.content).trimEnd();

    out.push(`${indent}.. Expanded literalinclude: ${target}`);
    out.push("");
    out.push(`${indent}.. code-block:: ${language}`);
    out.push("");
    for (const includedLine of expanded.split("\n")) {
      out.push(`${indent}  ${includedLine}`);
    }
  }

  return cleanText(out.join("\n"));
}

function transform(rel: string): string {
  const src = join(DOCS_DIR, rel);
  const content = readFileSync(src, "utf-8");
  if (rel.endsWith(".rst")) return expandRstIncludes(content, rel);
  return cleanText(content);
}

function cleanOutDir(outDir: string, validFiles: Set<string>) {
  if (!existsSync(outDir)) return;
  let removed = 0;

  function walk(dir: string) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        if (readdirSync(full).length === 0) rmSync(full, { recursive: true });
      } else if (entry.isFile()) {
        const rel = relative(outDir, full);
        if (!validFiles.has(rel)) {
          rmSync(full);
          removed++;
        }
      }
    }
  }

  walk(outDir);
  if (removed > 0) console.log(`Removed ${removed} stale files`);
}

mkdirSync(OUT_DIR, { recursive: true });
let copied = 0;
let skipped = 0;
for (const rel of files) {
  const output = transform(rel);
  const dst = join(OUT_DIR, rel);
  if (existsSync(dst) && readFileSync(dst, "utf-8") === output) {
    skipped++;
    continue;
  }
  mkdirSync(dirname(dst), { recursive: true });
  writeFileSync(dst, output);
  copied++;
}

cleanOutDir(OUT_DIR, new Set(files));
console.log(`Synced PowerDNS docs: ${copied} copied, ${skipped} unchanged`);
