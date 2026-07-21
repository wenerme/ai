#!/usr/bin/env bun
/** Sync Storybook documentation and reusable code snippets from storybookjs/storybook. */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { cleanOutDir, collectFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/storybookjs/storybook");
const DOCS_DIR = join(REPO, "docs");
const SNIPPETS_DIR = join(DOCS_DIR, "_snippets");
const OUT_DIR = join(import.meta.dir, "../skills/storybook-docs/references");

interface TextSegment {
  text: string;
  isCode: boolean;
}

export interface StorybookDocument {
  path: string;
  content: string;
}

function splitCodeBlocks(content: string): TextSegment[] {
  const segments: TextSegment[] = [];
  const lines = content.match(/[^\n]*(?:\n|$)/g) ?? [];
  let proseStart = 0;

  for (let index = 0; index < lines.length; index++) {
    const opening = /^([ \t]*)(`{3,}|~{3,})[^\r\n]*$/.exec(lines[index].replace(/\r?\n$/, ""));
    if (!opening) continue;

    const [, indent, marker] = opening;
    const closer = new RegExp(`^${indent.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}${marker[0]}{${marker.length},}[ \\t]*$`);
    let closingIndex = index + 1;
    while (closingIndex < lines.length && !closer.test(lines[closingIndex].replace(/\r?\n$/, ""))) closingIndex++;

    if (proseStart < index) segments.push({ text: lines.slice(proseStart, index).join(""), isCode: false });
    if (closingIndex === lines.length) {
      segments.push({ text: lines.slice(index).join(""), isCode: true });
      return segments;
    }
    segments.push({ text: lines.slice(index, closingIndex + 1).join(""), isCode: true });
    index = closingIndex;
    proseStart = closingIndex + 1;
  }
  if (proseStart < lines.length) segments.push({ text: lines.slice(proseStart).join(""), isCode: false });
  return segments;
}

function attributeValue(attrs: string, name: string): string | undefined {
  const match = new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|\\{([^}]*)\\})`).exec(attrs);
  return match?.[1] ?? match?.[2] ?? match?.[3];
}

function snippetPath(attrs: string): string {
  const path = attributeValue(attrs, "path");
  if (
    !path
    || !path.endsWith(".md")
    || path.startsWith("/")
    || path.includes("\\")
    || path.split("/").some((part) => part === "." || part === ".." || part.length === 0)
  ) {
    throw new Error(`Invalid CodeSnippets path: ${path ?? "missing path"}`);
  }
  return path;
}

function formatSnippetReference(attrs: string): string {
  const path = snippetPath(attrs);
  const variant = attributeValue(attrs, "variant");
  const variantNote = variant ? ` (variant: \`${variant}\`)` : "";
  return `> Code snippet: \`_snippets/${path}\`${variantNote}`;
}

function formatIfCondition(attrs: string): string {
  const renderer = attributeValue(attrs, "renderer");
  if (renderer) return `> **Renderer: \`${renderer}\`**`;

  const notRenderer = attributeValue(attrs, "notRenderer");
  if (notRenderer) return `> **Except renderer: \`${notRenderer}\`**`;

  return `> **Conditional content: \`${attrs.trim()}\`**`;
}

function transformStorybookText(text: string): string {
  return text
    .replace(/^import\s+.*from\s+['"][^'"]+['"];?\s*$/gm, "")
    .replace(/^import\s+['"][^'"]+['"];?\s*$/gm, "")
    .replace(/<CodeSnippets\b([\s\S]*?)\/>/g, (_, attrs) => formatSnippetReference(attrs))
    .replace(/<\/?Callout\b(?:\s[^>]*)?>/g, "")
    .replace(/<If\b([^>]*)>/g, (_, attrs) => formatIfCondition(attrs))
    .replace(/<\/If\s*>/g, "")
    .replace(/<(?:Video|YouTubeCallout|HomeRenderers|HomeConcepts|HomeResources|CommunityRenderers|GetStartedVersions)\b[\s\S]*?\/>/g, "")
    .replace(/[ \t]+$/gm, "");
}

/** Convert Storybook-specific MDX outside code fences into portable agent references. */
export function cleanStorybookMdx(content: string): string {
  const output = splitCodeBlocks(content)
    .map((segment) => segment.isCode ? segment.text : transformStorybookText(segment.text))
    .join("");
  return output.replace(/(?:[ \t]*\r?\n)+[ \t]*$/, "\n");
}

/** Return CodeSnippets paths from prose only; example tags in fenced code are not dependencies. */
export function codeSnippetPaths(content: string): string[] {
  const paths: string[] = [];
  for (const segment of splitCodeBlocks(content)) {
    if (segment.isCode) continue;
    for (const match of segment.text.matchAll(/<CodeSnippets\b([\s\S]*?)\/>/g)) {
      paths.push(snippetPath(match[1]));
    }
  }
  return paths;
}

export function assertCodeSnippetTargets(documents: StorybookDocument[], snippets: Set<string>): void {
  const missing: string[] = [];
  for (const document of documents) {
    for (const path of codeSnippetPaths(document.content)) {
      const target = `_snippets/${path}`;
      if (!snippets.has(target)) missing.push(`${document.path}: ${target}`);
    }
  }
  if (missing.length > 0) throw new Error(`Missing CodeSnippets targets:\n${missing.join("\n")}`);
}

function normalizeSnippet(content: string): string {
  return content.replace(/\r\n/g, "\n").replace(/[ \t]+$/gm, "").replace(/\s+$/, "\n");
}

function assertSourceLayout(pages: string[], snippets: string[], documents: StorybookDocument[]): void {
  if (pages.length === 0 || snippets.length === 0) throw new Error("Storybook docs or snippets source is empty");
  if (pages.some((path) => !path.endsWith(".mdx") || path.startsWith("_"))) {
    throw new Error("Unexpected Storybook documentation page path");
  }
  if (snippets.some((path) => !path.startsWith("_snippets/") || !path.endsWith(".md"))) {
    throw new Error("Unexpected Storybook snippet path");
  }
  for (const document of documents) {
    if (!/^---\n[\s\S]*?^title:\s*.+$/m.test(document.content)) {
      throw new Error(`Storybook page lacks frontmatter title: ${document.path}`);
    }
  }
  assertCodeSnippetTargets(documents, new Set(snippets));
}

function writeFileIfChanged(path: string, content: string): boolean {
  if (existsSync(path) && readFileSync(path, "utf-8") === content) return false;
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
  return true;
}

function syncStorybookSource(): void {
  if (!existsSync(REPO)) {
    console.log("Cloning storybookjs/storybook docs from next...");
    mkdirSync(dirname(REPO), { recursive: true });
    execFileSync("git", [
      "clone", "--depth", "1", "--filter=blob:none", "--sparse", "--branch", "next",
      "https://github.com/storybookjs/storybook.git", REPO,
    ], { stdio: "inherit" });
    execFileSync("git", ["sparse-checkout", "set", "docs"], { cwd: REPO, stdio: "inherit" });
  } else {
    const changes = execFileSync("git", ["status", "--porcelain"], { cwd: REPO, encoding: "utf-8" }).trim();
    if (changes) throw new Error(`Refusing to update dirty Storybook source checkout:\n${changes}`);
  }

  execFileSync("git", ["fetch", "--depth", "1", "origin", "next"], { cwd: REPO, stdio: "inherit" });
  execFileSync("git", ["checkout", "--detach", "FETCH_HEAD"], { cwd: REPO, stdio: "inherit" });
  const commit = execFileSync("git", ["rev-parse", "--short", "HEAD"], { cwd: REPO, encoding: "utf-8" }).trim();
  console.log(`  Checked out Storybook next: ${commit}`);
}

export function syncStorybookDocs(): void {
  syncStorybookSource();

  const pages = collectFiles({
    dir: DOCS_DIR,
    base: DOCS_DIR,
    extensions: [".mdx"],
    skipDirs: new Set(["_assets", "_snippets"]),
  }).sort();
  const snippets = collectFiles({
    dir: SNIPPETS_DIR,
    base: DOCS_DIR,
    extensions: [".md"],
  }).sort();
  const documents = pages.map((path) => ({ path, content: readFileSync(join(DOCS_DIR, path), "utf-8") }));
  assertSourceLayout(pages, snippets, documents);

  const files = [...pages, ...snippets];
  const validFiles = new Set(files);
  mkdirSync(OUT_DIR, { recursive: true });
  let copied = 0;

  for (const path of files) {
    const source = readFileSync(join(DOCS_DIR, path), "utf-8");
    const output = path.endsWith(".mdx") ? cleanStorybookMdx(source) : normalizeSnippet(source);
    if (writeFileIfChanged(join(OUT_DIR, path), output)) copied++;
  }

  cleanOutDir(OUT_DIR, validFiles);
  console.log(`Found ${pages.length} MDX pages and ${snippets.length} snippets`);
  if (copied > 0) console.log(`Synced: ${copied} copied`);
}

if (import.meta.main) syncStorybookDocs();
