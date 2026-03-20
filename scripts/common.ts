/**
 * Shared utilities for sync-*.ts scripts.
 */

import { execSync } from "child_process";
import { existsSync, mkdirSync, readdirSync, rmSync, statSync, readFileSync, writeFileSync } from "fs";
import { join, relative, dirname } from "path";

export interface CloneOptions {
  /** Display name, e.g. "org/repo" */
  name: string;
  /** Local directory to clone into */
  dir: string;
  /** Full GitHub HTTPS URL */
  url: string;
  /** Default branch (default: "main") */
  branch?: string;
  /** Sparse checkout paths — if set, uses --filter=blob:none --sparse */
  sparse?: string[];
}

/** Clone repo if missing, otherwise pull latest. */
export function cloneOrPull(opts: CloneOptions): void {
  const branch = opts.branch ?? "main";
  if (!existsSync(opts.dir)) {
    if (opts.sparse) {
      console.log(`Cloning ${opts.name} (sparse: ${opts.sparse.join(" ")})...`);
      mkdirSync(dirname(opts.dir), { recursive: true });
      execSync(`git clone --depth 1 --filter=blob:none --sparse ${opts.url} ${opts.dir}`, { stdio: "pipe" });
      execSync(`git sparse-checkout set ${opts.sparse.join(" ")}`, { cwd: opts.dir, stdio: "pipe" });
    } else {
      console.log(`Cloning ${opts.name} (shallow)...`);
      mkdirSync(dirname(opts.dir), { recursive: true });
      execSync(`git clone --depth 1 ${opts.url} ${opts.dir}`, { stdio: "pipe" });
    }
  } else {
    console.log(`Pulling latest from ${opts.name}...`);
    try {
      execSync("git pull --ff-only", { cwd: opts.dir, stdio: "pipe" });
    } catch {
      execSync(`git fetch --depth 1 origin ${branch} && git reset --hard origin/${branch}`, { cwd: opts.dir, stdio: "pipe" });
    }
  }
  const hash = execSync("git rev-parse --short HEAD", { cwd: opts.dir, encoding: "utf-8" }).trim();
  console.log(`  Current commit: ${hash}`);
}

export interface CollectOptions {
  dir: string;
  base: string;
  /** Directory names to skip (matched by entry name or top-level path segment) */
  skipDirs?: Set<string>;
  /** Relative paths (from base) to skip entirely */
  skipPaths?: Set<string>;
  /** File extensions to include (default: [".md", ".mdx"]) */
  extensions?: string[];
  /** File names to skip */
  skipFiles?: Set<string>;
}

/** Recursively collect doc files under dir, returning paths relative to base. */
export function collectFiles(opts: CollectOptions): string[] {
  const exts = opts.extensions ?? [".md", ".mdx"];
  const files: string[] = [];

  function walk(current: string) {
    if (!existsSync(current)) return;
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const full = join(current, entry.name);
      const rel = relative(opts.base, full);
      if (entry.isDirectory()) {
        if (opts.skipDirs?.has(entry.name)) continue;
        if (opts.skipPaths?.has(rel)) continue;
        walk(full);
      } else if (entry.isFile()) {
        if (opts.skipFiles?.has(entry.name)) continue;
        const ext = entry.name.slice(entry.name.lastIndexOf(".")).toLowerCase();
        if (exts.includes(ext)) files.push(rel);
      }
    }
  }

  walk(opts.dir);
  return files;
}

/** Remove files from outDir that are not in validFiles. Remove empty dirs. */
export function cleanOutDir(outDir: string, validFiles: Set<string>): void {
  if (!existsSync(outDir)) return;
  let removed = 0;

  function walk(dir: string) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        if (readdirSync(full).length === 0) rmSync(full, { recursive: true });
      } else if (entry.isFile()) {
        if (!validFiles.has(relative(outDir, full))) { rmSync(full); removed++; }
      }
    }
  }

  walk(outDir);
  if (removed > 0) console.log(`  Removed ${removed} stale files`);
}

// Frontmatter keys that are noise for LLM consumption
const FM_DROP_KEYS = new Set([
  "icon", "sidebarTitle", "sidebar_position", "sidebar_label",
  "slug", "pagination_prev", "pagination_next", "sidebar_class_name",
  "custom_edit_url", "image", "draft", "toc_min_heading_level",
  "toc_max_heading_level", "hide_table_of_contents", "outline",
]);

// MDX component tags to strip (keep inner text).
// Self-closing variants are handled separately.
const MDX_STRIP_TAGS = [
  "Tabs", "Tab", "TabItem", "TabItems",
  "Tip", "Warning", "Note", "Info", "Danger", "Caution",
  "Accordion", "AccordionGroup",
  "Card", "CardGroup", "Cards",
  "Steps", "Step",
  "CodeGroup", "CodeBlock",
  "Details", "Summary",
  "Expandable",
  "Frame", "Aside",
];

// Self-closing MDX tags to remove entirely (snippet includes, icons, etc.)
const MDX_REMOVE_SELF_CLOSING = [
  "Snippet", "Icon", "UpdateReminder", "ReqHint", "Faq",
  "AddExternalModels", "InstallLink", "FirstGeneration",
  "UpdateComfyui", "TroubleshootingGpt", "PromptTechniques",
  "MirrorLinks", "MaintenancePage", "GetApiKey",
  "DesktopVenv", "DesktopResourceWarning", "UserDirectory",
  "PackageManagerBiomeCommand",
];

/**
 * Clean up doc content for LLM consumption.
 * - Strips MDX component tags (keeps inner content)
 * - Removes self-closing MDX includes
 * - Removes top-level MDX import statements
 * - Cleans frontmatter noise fields
 * - Converts VitePress ::: containers to blockquote-style
 * - Simplifies dead image links to [alt text]
 * - Collapses excessive blank lines
 *
 * IMPORTANT: Code blocks (``` ... ```) are protected and never modified.
 */
export function cleanupContent(content: string): string {
  // Split into code blocks and non-code segments to protect code
  const segments = splitCodeBlocks(content);

  for (let i = 0; i < segments.length; i++) {
    if (segments[i].isCode) continue;
    let text = segments[i].text;

    // 1. Clean frontmatter (only in first segment)
    if (i === 0) text = cleanFrontmatter(text);

    // 2. Remove top-level MDX import lines (import Foo from '...')
    text = text.replace(/^import\s+.*from\s+['"][^'"]+['"];?\s*$/gm, "");
    text = text.replace(/^import\s+['"][^'"]+['"];?\s*$/gm, "");

    // 3. Strip MDX component opening/closing tags (keep inner content)
    const stripRe = new RegExp(
      `<\\/?(${MDX_STRIP_TAGS.join("|")})(\\s[^>]*)?>`,
      "gi",
    );
    text = text.replace(stripRe, "");

    // 4. Remove self-closing MDX tags entirely
    const selfCloseRe = new RegExp(
      `<(${MDX_REMOVE_SELF_CLOSING.join("|")})(\\s[^>]*)?\\/?>`,
      "gi",
    );
    text = text.replace(selfCloseRe, "");

    // 5. Convert VitePress ::: containers to markdown blockquotes
    //    ::: tip TITLE  →  > **tip**: TITLE
    //    ::: warning    →  > **warning**:
    //    :::            →  (remove, end of container)
    text = text.replace(
      /^:::\s*(tip|warning|danger|info|note|details|caution|important)(?:\s+(.+))?$/gim,
      (_, type, title) => title ? `> **${type}**: ${title}` : `> **${type}**:`,
    );
    text = text.replace(/^:::\s*code-group\s*$/gim, "");
    text = text.replace(/^:::\s*tabs.*$/gim, "");
    text = text.replace(/^={2,}\s+\w+.*$/gm, ""); // == TabName lines
    text = text.replace(/^:::\s*$/gm, "");

    // 6. Simplify image refs with dead paths to alt text
    //    ![alt text](/images/foo.png)  →  [alt text]
    //    ![alt text](../images/foo.png) → [alt text]
    //    But keep external URLs (http) and inline data URIs
    text = text.replace(
      /!\[([^\]]*)\]\((?!https?:\/\/|data:)[^)]+\.(?:png|jpg|jpeg|gif|svg|webp|avif)[^)]*\)/gi,
      (_, alt) => alt ? `[${alt}]` : "",
    );

    // 7. Remove HTML comments
    text = text.replace(/<!--[\s\S]*?-->/g, "");

    // 8. Remove JSX-style {/* ... */} comments
    text = text.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");

    // 9. Clean up HTML img tags → [alt] or remove
    text = text.replace(
      /<img\s[^>]*?alt="([^"]*)"[^>]*>/gi,
      (_, alt) => alt ? `[${alt}]` : "",
    );
    text = text.replace(/<img\s[^>]*>/gi, ""); // img without alt

    // 10. Remove other decorative HTML elements (br, hr as HTML)
    text = text.replace(/<br\s*\/?>/gi, "");

    // 11. Collapse 3+ consecutive blank lines to 2
    text = text.replace(/\n{3,}/g, "\n\n");

    segments[i].text = text;
  }

  let result = segments.map((s) => s.text).join("");
  // Final collapse of blank lines (across segment boundaries)
  result = result.replace(/\n{3,}/g, "\n\n");
  // Trim trailing whitespace
  result = result.replace(/\s+$/, "\n");
  return result;
}

/** Split content into alternating text/code segments, preserving code blocks verbatim. */
function splitCodeBlocks(content: string): Array<{ text: string; isCode: boolean }> {
  const segments: Array<{ text: string; isCode: boolean }> = [];
  // Match fenced code blocks: ``` or ~~~, with optional language tag
  const re = /^(`{3,}|~{3,}).*$\n[\s\S]*?^\1\s*$/gm;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(content)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: content.slice(lastIndex, match.index), isCode: false });
    }
    segments.push({ text: match[0], isCode: true });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) {
    segments.push({ text: content.slice(lastIndex), isCode: false });
  }
  return segments;
}

/** Remove noise keys from YAML frontmatter. */
function cleanFrontmatter(text: string): string {
  const fmMatch = text.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return text;

  const lines = fmMatch[1].split("\n");
  const kept: string[] = [];
  let skipIndented = false;

  for (const line of lines) {
    const keyMatch = line.match(/^([a-zA-Z_-]+)\s*:/);
    if (keyMatch) {
      if (FM_DROP_KEYS.has(keyMatch[1])) {
        skipIndented = true;
        continue;
      }
      skipIndented = false;
    } else if (skipIndented && /^\s/.test(line)) {
      continue; // skip continuation lines of dropped key
    } else {
      skipIndented = false;
    }
    kept.push(line);
  }

  const newFm = kept.join("\n").replace(/\n{2,}/g, "\n");
  return text.replace(fmMatch[0], `---\n${newFm}\n---`);
}

/** Copy files from srcDir to outDir, skipping unchanged.
 *  All files go through cleanupContent(). transform runs AFTER cleanup. */
export function syncFiles(
  files: string[],
  srcDir: string,
  outDir: string,
  transform?: (content: string) => string,
): { copied: number; skipped: number } {
  mkdirSync(outDir, { recursive: true });
  let copied = 0, skipped = 0;

  for (const rel of files) {
    const src = join(srcDir, rel);
    const dst = join(outDir, rel);
    let output = cleanupContent(readFileSync(src, "utf-8"));
    if (transform) output = transform(output);

    if (existsSync(dst)) {
      const existing = readFileSync(dst, "utf-8");
      if (existing === output) { skipped++; continue; }
    }
    mkdirSync(dirname(dst), { recursive: true });
    writeFileSync(dst, output);
    copied++;
  }

  return { copied, skipped };
}
