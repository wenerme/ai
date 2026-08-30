#!/usr/bin/env bun
/**
 * Sync official Argo CD documentation from argoproj/argo-cd.
 * Mirrors published MkDocs pages while excluding proposal history.
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, realpathSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { cleanOutDir, cleanupContent, collectFiles } from "./common.ts";

const REPO = join(process.env.HOME!, "gits/argoproj/argo-cd");
const DOCS_DIR = join(REPO, "docs");
const OUT_DIR = join(import.meta.dir, "../skills/argocd-docs/references");
const ARGO_CD_REPOSITORY_URL = "https://github.com/argoproj/argo-cd.git";
const ARGO_CD_BRANCH = "master";
const MIN_DOC_FILES = 400;

const INCLUDED_TEXT_EXTENSIONS = new Set([".md", ".yaml", ".yml", ".lua"]);
const INCLUDE_PATTERN = /\{!([^!{}\r\n]+)!\}/g;

export function assertSafeArgoCdCheckout(status: string, branch: string, originUrl: string, shallow: string): void {
  if (status.trim()) throw new Error(`Refusing to sync from dirty Argo CD source checkout at ${REPO}`);
  if (branch.trim() !== ARGO_CD_BRANCH) {
    throw new Error(`Refusing to sync Argo CD source branch ${branch.trim() || "(detached)"}; expected ${ARGO_CD_BRANCH}`);
  }
  if (originUrl.trim() !== ARGO_CD_REPOSITORY_URL) {
    throw new Error(`Refusing to sync Argo CD source with unexpected origin: ${originUrl.trim() || "(missing)"}`);
  }
  if (shallow.trim() !== "true") throw new Error("Refusing to sync from a non-shallow Argo CD source checkout");
}

function gitOutput(args: string[]): string {
  return execFileSync("git", args, { cwd: REPO, encoding: "utf-8" });
}

function ensureArgoCdSourceCheckout(): void {
  if (!existsSync(REPO)) {
    mkdirSync(dirname(REPO), { recursive: true });
    execFileSync("git", ["clone", "--depth", "1", "--single-branch", "--branch", ARGO_CD_BRANCH, ARGO_CD_REPOSITORY_URL, REPO], {
      stdio: "inherit",
    });
  } else {
    assertSafeArgoCdCheckout(
      gitOutput(["status", "--porcelain"]),
      gitOutput(["branch", "--show-current"]),
      gitOutput(["remote", "get-url", "origin"]),
      gitOutput(["rev-parse", "--is-shallow-repository"]),
    );
    execFileSync("git", ["pull", "--ff-only"], { cwd: REPO, stdio: "inherit" });
  }
  console.log(`  Current commit: ${gitOutput(["rev-parse", "--short", "HEAD"]).trim()}`);
}

function normalizeNewlines(content: string): string {
  return content.replace(/\r\n/g, "\n");
}

function resolveIncludePath(repoDir: string, rawPath: string): string {
  const includePath = rawPath.trim();
  if (!includePath || isAbsolute(includePath) || includePath.includes("\0")) {
    throw new Error(`Invalid Argo CD documentation include path: ${rawPath}`);
  }

  const repoRoot = realpathSync(repoDir);
  const target = resolve(repoRoot, includePath);
  const repoRelative = relative(repoRoot, target);
  if (!repoRelative || repoRelative.startsWith(`..${sep}`) || repoRelative === ".." || isAbsolute(repoRelative)) {
    throw new Error(`Argo CD documentation include escapes source repository: ${rawPath}`);
  }
  if (!existsSync(target) || !statSync(target).isFile()) {
    throw new Error(`Missing Argo CD documentation include: ${rawPath}`);
  }
  const resolvedTarget = realpathSync(target);
  const resolvedRelative = relative(repoRoot, resolvedTarget);
  if (!resolvedRelative || resolvedRelative.startsWith(`..${sep}`) || resolvedRelative === ".." || isAbsolute(resolvedRelative)) {
    throw new Error(`Argo CD documentation include symlink escapes source repository: ${rawPath}`);
  }
  if (!INCLUDED_TEXT_EXTENSIONS.has(extname(resolvedTarget).toLowerCase())) {
    throw new Error(`Unsupported Argo CD documentation include type: ${rawPath}`);
  }
  return resolvedTarget;
}

function includeLanguage(path: string): string {
  switch (extname(path).toLowerCase()) {
    case ".yaml":
    case ".yml":
      return "yaml";
    case ".lua":
      return "lua";
    default:
      throw new Error(`Cannot infer fence language for Argo CD include: ${path}`);
  }
}

function readInclude(path: string): string {
  return normalizeNewlines(readFileSync(path, "utf-8"));
}

function withTrailingNewline(content: string): string {
  return content.endsWith("\n") ? content : `${content}\n`;
}

function indentLines(content: string, indentation: string): string {
  return content.split("\n").map((line) => line ? `${indentation}${line}` : line).join("\n");
}

export function expandArgoCdIncludes(
  content: string,
  repoDir: string,
  sourceFile: string,
  includeStack: readonly string[] = [sourceFile],
): string {
  const output: string[] = [];
  let fence: { char: string; width: number } | undefined;

  const expandMarkdown = (target: string): string => {
    if (includeStack.includes(target)) {
      throw new Error(`Circular Argo CD documentation include: ${[...includeStack, target].join(" -> ")}`);
    }
    return expandArgoCdIncludes(readInclude(target), repoDir, target, [...includeStack, target]);
  };

  for (const line of normalizeNewlines(content).split("\n")) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (!fence) {
      if (marker) {
        fence = { char: marker[1][0], width: marker[1].length };
        output.push(line);
        continue;
      }
      output.push(line.replace(INCLUDE_PATTERN, (_, rawPath) => {
        const target = resolveIncludePath(repoDir, rawPath);
        if (extname(target).toLowerCase() === ".md") return expandMarkdown(target);
        const included = withTrailingNewline(readInclude(target));
        return `\`\`\`${includeLanguage(target)}\n${included}\`\`\``;
      }));
      continue;
    }

    const include = line.match(/^(\s*)\{!([^!{}\r\n]+)!\}\s*$/);
    if (include) {
      const target = resolveIncludePath(repoDir, include[2]);
      if (extname(target).toLowerCase() === ".md") {
        throw new Error(`Markdown Argo CD include must not appear inside a fenced code block: ${include[2]}`);
      }
      output.push(indentLines(readInclude(target).replace(/\n$/, ""), include[1]));
    } else {
      output.push(line);
    }
    const closeMarker = line.match(/^\s*(`{3,}|~{3,})\s*$/);
    if (closeMarker && closeMarker[1][0] === fence.char && closeMarker[1].length >= fence.width) fence = undefined;
  }

  return output.join("\n");
}

export function redactArgoCdExamples(content: string): string {
  return content
    .replace(
      /-----BEGIN (?:[A-Z0-9 ]+ )?PRIVATE KEY-----[\s\S]*?-----END (?:[A-Z0-9 ]+ )?PRIVATE KEY-----/g,
      "EXAMPLE_PRIVATE_KEY_PEM",
    )
    .replace(/\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g, "EXAMPLE_JWT")
    .replace(/(Authorization:\s*Bearer\s+)(?![$]|EXAMPLE_)[^\s"'`\\]+/gi, "$1$ARGOCD_AUTH_TOKEN")
    .replace(
      /((?:^|\s)(?:-u|--user)\s+)(?!(?:"|')?(?:[$<{]|EXAMPLE_|X{5,}|x{5,}))(?:"[^"]*"|'[^']*'|[^\s"'`\\]+)/gim,
      "$1$ARGOCD_AUTH_USERNAME:$ARGOCD_AUTH_PASSWORD",
    )
    .replace(/\bxoxb-[A-Za-z0-9-]+\b/g, "EXAMPLE_SLACK_BOT_TOKEN")
    .replace(/(argocd\.token=)(?![$<]|EXAMPLE_)[^;\s"'`]+/gi, "$1EXAMPLE_ARGOCD_TOKEN")
    .replace(
      /([a-z][a-z0-9+.-]*:\/\/)(?![${]|EXAMPLE_|X{5,})[^\s/:@'"<>]+:(?![${]|EXAMPLE_|X{5,})[^\s/@'"<>]+@/gi,
      "$1EXAMPLE_USER:EXAMPLE_PASSWORD@",
    )
    .replace(
      /(^\s*[A-Za-z0-9._-]*password\s*:\s*)(?!\s*[$<{]|\s*(?:EXAMPLE_|X{5,}|x{5,}))[^\r\n#]+?(\s*(?:#.*)?)$/gim,
      "$1EXAMPLE_PASSWORD$2",
    )
    .replace(/((?:^|\s)(?:-p|--parameter)\s+password=)(?![$<{]|EXAMPLE_)[^\s"'`\\]+/gim, "$1EXAMPLE_PASSWORD")
    .replace(
      /^(\s*[A-Za-z0-9._-]*clientSecret\s*:\s*)(?!\s*[$<{]|\s*(?:EXAMPLE_|X{5,}|x{5,}))[^\r\n#]+?(\s*(?:#.*)?)$/gim,
      "$1EXAMPLE_CLIENT_SECRET$2",
    )
    .replace(
      /# this value corresponds to: `printf "hello-world" \| base64`\n(\s*oidc\.auth0\.clientSecret:\s*)"[^"]+"/g,
      "# Example base64-encoded client secret\n$1\"EXAMPLE_AUTH0_CLIENT_SECRET_BASE64\"",
    )
    .replace(/(ClientSecret:\s*`)(?![$<{]|EXAMPLE_)[A-Za-z0-9_-]{32,}(`)/gi, "$1EXAMPLE_CLIENT_SECRET$2")
    .replace(/(pushover-token:\s*)(?![$<{]|EXAMPLE_)[A-Za-z0-9]{20,}/gi, "$1EXAMPLE_PUSHOVER_TOKEN")
    .replace(/(plugin\.myplugin\.token:\s*["']?)(?![$<{]|EXAMPLE_)[A-Za-z0-9+/_=-]{16,}/gi, "$1EXAMPLE_PLUGIN_TOKEN");
}

export function cleanArgoCdMarkdown(content: string, repoDir: string, sourceFile: string): string {
  const expanded = expandArgoCdIncludes(content, repoDir, sourceFile);
  if (INCLUDE_PATTERN.test(expanded)) throw new Error(`Unresolved Argo CD documentation include in ${sourceFile}`);
  INCLUDE_PATTERN.lastIndex = 0;
  return cleanupContent(redactArgoCdExamples(expanded));
}

export function collectArgoCdDocs(docsDir: string, minDocFiles = MIN_DOC_FILES): string[] {
  const files = collectFiles({
    dir: docsDir,
    base: docsDir,
    extensions: [".md"],
    skipDirs: new Set(["proposals"]),
  }).sort();
  if (files.length < minDocFiles) {
    throw new Error(`Argo CD product documentation unexpectedly small: ${files.length} Markdown files`);
  }
  return files;
}

export function syncArgoCdFiles(
  files: readonly string[],
  sourceDir: string,
  outDir: string,
  repoDir: string,
): { copied: number; skipped: number } {
  mkdirSync(outDir, { recursive: true });
  let copied = 0;
  let skipped = 0;

  for (const file of files) {
    const source = join(sourceDir, file);
    const output = cleanArgoCdMarkdown(readFileSync(source, "utf-8"), repoDir, source);
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

export function syncArgoCdDocs(): void {
  ensureArgoCdSourceCheckout();
  const files = collectArgoCdDocs(DOCS_DIR);
  const { copied, skipped } = syncArgoCdFiles(files, DOCS_DIR, OUT_DIR, REPO);
  cleanOutDir(OUT_DIR, new Set(files));
  console.log(`Synced ${files.length} Argo CD product documentation files: ${copied} copied, ${skipped} unchanged`);
}

if (import.meta.main) syncArgoCdDocs();
