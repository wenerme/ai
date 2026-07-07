#!/usr/bin/env bun
/**
 * Sync GitLab product documentation from gitlab-org/gitlab doc subtrees.
 * Produces separate skills for user, CI/CD, REST/GraphQL API, and administration docs.
 */

import { execSync } from "child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "fs";
import { dirname, join, relative } from "path";
import { parse as parseYaml } from "yaml";
import { cleanupContent, cloneOrPull, collectFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/gitlab-org/gitlab");
const DOC_DIR = join(REPO, "doc");

const DOCS = [
  {
    name: "gitlab-user-docs",
    source: "user",
    includeExtensions: [".md"],
  },
  {
    name: "gitlab-ci-docs",
    source: "ci",
    includeExtensions: [".md"],
  },
  {
    name: "gitlab-api-docs",
    source: "api",
    includeExtensions: [".md", ".yaml"],
  },
  {
    name: "gitlab-admin-docs",
    source: "administration",
    includeExtensions: [".md"],
  },
] as const;

const SPARSE_PATHS = DOCS.map((doc) => `doc/${doc.source}`);

function ensureGitlabSourceCheckout() {
  if (!existsSync(REPO)) return;
  const status = execSync("git status --porcelain", { cwd: REPO, encoding: "utf-8" }).trim();
  if (status) throw new Error(`Refusing to sync from dirty GitLab source clone at ${REPO}`);

  const branch = execSync("git branch --show-current", { cwd: REPO, encoding: "utf-8" }).trim();
  if (branch !== "master") {
    execSync("git switch master", { cwd: REPO, stdio: "pipe" });
  }
  execSync(`git sparse-checkout set ${SPARSE_PATHS.join(" ")}`, { cwd: REPO, stdio: "pipe" });
}

ensureGitlabSourceCheckout();
cloneOrPull({
  name: "gitlab-org/gitlab",
  dir: REPO,
  url: "https://gitlab.com/gitlab-org/gitlab.git",
  branch: "master",
  sparse: SPARSE_PATHS,
});
ensureGitlabSourceCheckout();

interface FrontmatterResult {
  fields: Record<string, any>;
  body: string;
}

function parseFrontmatter(content: string): FrontmatterResult {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { fields: {}, body: content };
  try {
    return { fields: parseYaml(match[1]) ?? {}, body: content.slice(match[0].length) };
  } catch {
    return { fields: {}, body: content.slice(match[0].length) };
  }
}

function splitCodeBlocks(content: string): Array<{ text: string; isCode: boolean }> {
  const segments: Array<{ text: string; isCode: boolean }> = [];
  const re = /^[ \t]{0,3}(`{3,}|~{3,}).*$\n[\s\S]*?^[ \t]{0,3}\1\s*$/gm;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(content)) !== null) {
    if (match.index > lastIndex) segments.push({ text: content.slice(lastIndex, match.index), isCode: false });
    segments.push({ text: match[0], isCode: true });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) segments.push({ text: content.slice(lastIndex), isCode: false });
  return segments;
}

function shortcodeTitle(attrs: string): string | undefined {
  return attrs.match(/\btitle="([^"]+)"/)?.[1] ?? attrs.match(/\btitle='([^']+)'/)?.[1];
}

function replaceHugoShortcodes(text: string): string {
  text = text.replace(/\{\{<\s*(details|\/details|history|\/history|cards|\/cards|tabs|\/tabs|\/tab|\/collapsible)\s*>\s*\}\}/g, "");
  text = text.replace(/\{\{<\s*tab\s+([^>]*)>\s*\}\}/g, (_, attrs) => {
    const title = shortcodeTitle(attrs);
    return title ? `\n### ${title}\n` : "";
  });
  text = text.replace(/\{\{<\s*collapsible\s+([^>]*)>\s*\}\}/g, (_, attrs) => {
    const title = shortcodeTitle(attrs);
    return title ? `\n### ${title}\n` : "";
  });
  text = text.replace(/\{\{<\s*yes\s*>\s*\}\}/g, "Yes");
  text = text.replace(/\{\{<\s*no\s*>\s*\}\}/g, "No");
  text = text.replace(/\{\{<\s*icon\s+[^>]*>\s*\}\}/g, "");
  text = text.replace(/\{\{<\s*([^\s>/]+)([^>]*)>\s*\}\}/g, (_, name, attrs) => {
    const title = shortcodeTitle(attrs);
    if (title) return title;
    return name === "br" ? "\n" : "";
  });
  text = text.replace(/\{\{<\s*\/[^>]+>\s*\}\}/g, "");
  return text;
}

function cleanHugoShortcodes(content: string): string {
  return splitCodeBlocks(content)
    .map((segment) => segment.isCode ? segment.text : replaceHugoShortcodes(segment.text))
    .join("");
}

function normalizeHeadingUnderline(content: string): string {
  // Git treats lines starting with 7+ equals signs as conflict markers in diff --check.
  return content.replace(/^={7,}(.*)$/gm, "======$1");
}

function privateKeyPlaceholder(prefix: "BEGIN" | "END", keyType: string): string {
  return `EXAMPLE_${prefix}_${keyType.trim().replace(/\s+/g, "_")}`;
}

function redactSensitiveExamples(content: string): string {
  return content
    .replace(/("personal_access_token"\s*:\s*")([^"<][^"]{9,})(")/g, "$1PERSONAL_ACCESS_TOKEN_EXAMPLE$3")
    .replace(/\bgl(?:pat|rt|ptt)-[0-9A-Za-z_-]{10,}\b/g, "GITLAB_TOKEN_EXAMPLE")
    .replace(/\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g, "JWT_TOKEN_EXAMPLE")
    .replace(
      /-{3,5}BEGIN ([A-Z ]*PRIVATE KEY)-{3,5}[\s\S]*?-{3,5}END \1\s*-{3,5}/g,
      (_, keyType) => `${privateKeyPlaceholder("BEGIN", keyType)}\nREDACTED_EXAMPLE_PRIVATE_KEY\n${privateKeyPlaceholder("END", keyType)}`,
    )
    .replace(/-{3,5}BEGIN ([A-Z ]*PRIVATE KEY)-{3,5}/g, (_, keyType) => privateKeyPlaceholder("BEGIN", keyType))
    .replace(/-{3,5}END ([A-Z ]*PRIVATE KEY)\s*-{3,5}/g, (_, keyType) => privateKeyPlaceholder("END", keyType));
}

function cleanMarkdown(content: string): string {
  const { fields, body } = parseFrontmatter(redactSensitiveExamples(content));
  const title = typeof fields.title === "string" ? fields.title.trim() : "";
  const description = typeof fields.description === "string" ? fields.description.trim().replace(/\s+/g, " ") : "";
  const header: string[] = [];
  const trimmedBody = body.trimStart();

  if (title && !trimmedBody.startsWith(`# ${title}`)) header.push(`# ${title}`);
  if (description) header.push(description);

  const withHeader = [header.join("\n\n"), body].filter(Boolean).join("\n\n");
  return normalizeHeadingUnderline(cleanHugoShortcodes(cleanupContent(cleanHugoShortcodes(withHeader)))
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+$/gm, "")
    .trimEnd() + "\n");
}

function isRedirectOnlyMarkdown(content: string): boolean {
  const { fields } = parseFrontmatter(content);
  return Boolean(fields.redirect_to);
}

function cleanYaml(content: string): string {
  return redactSensitiveExamples(content).replace(/\r\n/g, "\n").replace(/\t/g, "  ").replace(/[ \t]+$/gm, "").trimEnd() + "\n";
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
  if (removed > 0) console.log(`  Removed ${removed} stale files`);
}

for (const docs of DOCS) {
  const srcDir = join(DOC_DIR, docs.source);
  if (!existsSync(srcDir)) throw new Error(`Missing GitLab docs source directory: ${srcDir}`);

  const outDir = join(import.meta.dir, `../skills/${docs.name}/references`);
  const files = collectFiles({
    dir: srcDir,
    base: srcDir,
    extensions: [...docs.includeExtensions],
  }).filter((rel) => {
    if (rel.endsWith(".md")) return !isRedirectOnlyMarkdown(readFileSync(join(srcDir, rel), "utf-8"));
    if (docs.name === "gitlab-api-docs" && rel.match(/^openapi\/openapi_v[23]\.yaml$/)) return true;
    return false;
  });
  if (files.length === 0) throw new Error(`No GitLab docs source files collected for ${docs.name} from ${srcDir}`);

  mkdirSync(outDir, { recursive: true });
  let copied = 0;
  let skipped = 0;

  for (const rel of files) {
    const src = join(srcDir, rel);
    const dst = join(outDir, rel);
    const raw = readFileSync(src, "utf-8");
    const output = rel.endsWith(".md") ? cleanMarkdown(raw) : cleanYaml(raw);
    if (existsSync(dst) && readFileSync(dst, "utf-8") === output) {
      skipped++;
      continue;
    }
    mkdirSync(dirname(dst), { recursive: true });
    writeFileSync(dst, output);
    copied++;
  }

  cleanOutDir(outDir, new Set(files));
  console.log(`Synced ${docs.name}: ${files.length} files, ${copied} copied, ${skipped} unchanged`);
}
