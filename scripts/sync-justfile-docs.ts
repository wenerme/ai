#!/usr/bin/env bun
/**
 * Sync justfile documentation from casey/just README.md.
 * Splits the single large README into per-section reference files.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { cloneOrPull, cleanupContent, cleanOutDir } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/casey/just");
const OUT_DIR = join(import.meta.dir, "../skills/justfile-docs/references");

cloneOrPull({
  name: "casey/just",
  dir: REPO,
  url: "https://github.com/casey/just.git",
  branch: "master",
});

const readme = readFileSync(join(REPO, "README.md"), "utf-8");

// Section grouping: map section slug → subdirectory
const GROUP: Record<string, string> = {
  // installation
  "prerequisites": "installation",
  "packages": "installation",
  "pre-built-binaries": "installation",
  "github-actions": "installation",
  "docker": "installation",
  "release-rss-feed": "installation",
  "node-js-installation": "installation",
  // editor support
  "vim-and-neovim": "editor-support",
  "emacs": "editor-support",
  "visual-studio-code": "editor-support",
  "jetbrains-ides": "editor-support",
  "kakoune": "editor-support",
  "helix": "editor-support",
  "sublime-text": "editor-support",
  "micro": "editor-support",
  "zed": "editor-support",
  "other-editors": "editor-support",
  "language-server-protocol": "editor-support",
  "model-context-protocol": "editor-support",
  // language
  "settings": "language",
  "documentation-comments": "language",
  "expressions-and-substitutions": "language",
  "strings": "language",
  "sigils": "language",
  "functions": "language",
  "constants": "language",
  "attributes": "language",
  "groups": "language",
  "command-evaluation-using-backticks": "language",
  "conditional-expressions": "language",
  "stopping-execution-with-error": "language",
  // variables
  "setting-variables-from-the-command-line": "variables",
  "getting-and-setting-environment-variables": "variables",
  "setting-variables-in-a-recipe": "variables",
  "sharing-environment-variables-between-recipes": "variables",
  // recipes
  "the-default-recipe": "recipes",
  "listing-available-recipes": "recipes",
  "invoking-multiple-recipes": "recipes",
  "aliases": "recipes",
  "recipe-parameters": "recipes",
  "dependencies": "recipes",
  "shebang-recipes": "recipes",
  "script-recipes": "recipes",
  "script-and-shebang-recipe-temporary-files": "recipes",
  "python-recipes-with-uv": "recipes",
  "safer-bash-shebang-recipes": "recipes",
  "private-recipes": "recipes",
  "quiet-recipes": "recipes",
  "selecting-recipes-to-run-with-an-interactive-chooser": "recipes",
  // execution
  "working-directory": "execution",
  "changing-the-working-directory-in-a-recipe": "execution",
  "indentation": "execution",
  "multi-line-constructs": "execution",
  "command-line-options": "execution",
  "configuring-the-shell": "execution",
  "timestamps": "execution",
  "signal-handling": "execution",
  "re-running-recipes-when-files-change": "execution",
  "parallelism": "execution",
  // organization
  "invoking-justfiles-in-other-directories": "organization",
  "imports": "organization",
  "modules": "organization",
  "hiding-justfiles": "organization",
  "just-scripts": "organization",
  "formatting-and-dumping-justfiles": "organization",
  "fallback-to-parent-justfiles": "organization",
  "global-and-user-justfiles": "organization",
  "remote-justfiles": "organization",
  // shell
  "shell-alias": "shell",
  "shell-completion-scripts": "shell",
  // misc
  "man-page": "misc",
  "grammar": "misc",
  "just-sh": "misc",
  "node-js-package-json-script-compatibility": "misc",
  "paths-on-windows": "misc",
  "printing-complex-strings": "misc",
  "alternatives-and-prior-art": "misc",
  "avoiding-argument-splitting": "misc",
  // contributing
  "getting-started": "contributing",
  "contribution-workflow": "contributing",
  "hints": "contributing",
  "janus": "contributing",
  "minimum-supported-rust-version": "contributing",
  "new-releases": "contributing",
  // faq
  "what-are-the-idiosyncrasies-of-make-that-just-avoids": "faq",
  "what-s-the-relationship-between-just-and-cargo-build-scripts": "faq",
};

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/`/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

interface Section {
  title: string;
  slug: string;
  content: string;
  group: string;
}

// Parse sections from README
const lines = readme.split("\n");
const sections: Section[] = [];
let introLines: string[] = [];

// Find all ### headings and their line indices
const headings: { line: number; title: string }[] = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^### (.+)$/);
  if (m) headings.push({ line: i, title: m[1] });
}

// Intro is everything before the first ### heading
if (headings.length > 0) {
  introLines = lines.slice(0, headings[0].line);
}

// Extract each section
for (let i = 0; i < headings.length; i++) {
  const start = headings[i].line;
  const end = i + 1 < headings.length ? headings[i + 1].line : lines.length;
  const title = headings[i].title;
  const slug = slugify(title);
  const content = lines.slice(start, end).join("\n");
  const group = GROUP[slug] ?? "misc";
  sections.push({ title, slug, content, group });
}

// Write intro
const introContent = cleanupContent(introLines.join("\n"));
const introPath = "introduction.md";
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, introPath), introContent);

// Write sections
const writtenFiles = new Set<string>([introPath]);
let copied = 0;

for (const sec of sections) {
  const dir = join(OUT_DIR, sec.group);
  mkdirSync(dir, { recursive: true });
  const relPath = `${sec.group}/${sec.slug}.md`;
  const outPath = join(OUT_DIR, relPath);
  const cleaned = cleanupContent(sec.content);

  if (existsSync(outPath)) {
    const existing = readFileSync(outPath, "utf-8");
    if (existing === cleaned) {
      writtenFiles.add(relPath);
      continue;
    }
  }
  writeFileSync(outPath, cleaned);
  writtenFiles.add(relPath);
  copied++;
}

console.log(`Split into ${writtenFiles.size} files (${copied} updated)`);
cleanOutDir(OUT_DIR, writtenFiles);
