#!/usr/bin/env bun
/**
 * Fetch Alibaba Cloud CLI docs from help.aliyun.com.
 * Discovers CLI pages from /zh/cli.md and /zh/cli/ links, then follows only
 * Markdown pages that resolve back into the /zh/cli documentation namespace.
 */

import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "fs";
import { dirname, join, relative } from "path";
import { sleep } from "./fetch-utils.ts";

const BASE_URL = "https://help.aliyun.com";
const ROOT_DOC_URL = `${BASE_URL}/zh/cli.md`;
const INDEX_HTML_URL = `${BASE_URL}/zh/cli/`;
const OUT_DIR = join(import.meta.dir, "../skills/aliyun-cli-docs/references");
const RATE_LIMIT_MS = 1_500;
const CHALLENGE_RETRY_MS = 25_000;
const USER_AGENT = "Aliyun-CLI-Docs-Fetcher/1.0";
const KNOWN_CLI_PATHS = [
  "/zh/cli/what-is-alibaba-cloud-cli.md",
  "/zh/cli/start-using.md",
  "/zh/cli/migrating-from-older-versions-to-plug-in-versions-of-cli.md",
  "/zh/cli/cloud-products-supporting-cli.md",
  "/zh/cli/install-update-alibaba-cloud-cli.md",
  "/zh/cli/quickly-start-using-alibaba-cloud-cli.md",
  "/zh/cli/configure-alibaba-cloud-cli.md",
  "/zh/cli/configure-credentials.md",
  "/zh/cli/environment-variables.md",
  "/zh/cli/use-an-http-proxy-server.md",
  "/zh/cli/use-alibaba-cloud-cli.md",
  "/zh/cli/command-input.md",
  "/zh/cli/understanding-command-structure.md",
  "/zh/cli/understanding-command-line-parameters.md",
  "/zh/cli/parameter-format-overview.md",
  "/zh/cli/sample-commands.md",
  "/zh/cli/filter-results-and-tabulate-output.md",
  "/zh/cli/advanced-techniques.md",
  "/zh/cli/control-how-api-calls-are-executed.md",
  "/zh/cli/safety-policy.md",
  "/zh/cli/ai-mode.md",
  "/zh/cli/use-aliyun-mcp-proxy-agent-openapi-mcp-server.md",
  "/zh/cli/best-practices.md",
  "/zh/cli/use-alibaba-cloud-cli-to-migrate-ecs-instances-across-regions.md",
  "/zh/cli/run-alibaba-cloud-cli-in-a-docker-container.md",
  "/zh/cli/managing-and-using-cli-plugins.md",
];

interface Page {
  url: string;
  filepath: string;
  content: string;
}

interface FetchPageResult {
  page?: Page;
  skipReason?: string;
}

function decodeEntities(text: string): string {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)));
}

function normalizeCandidate(raw: string, baseUrl: string): string | undefined {
  const cleaned = decodeEntities(raw.trim())
    .replace(/^['"]|['"]$/g, "")
    .replace(/[),.;]+$/g, "");
  if (!cleaned || cleaned.startsWith("mailto:") || cleaned.startsWith("#") || cleaned.includes("~~")) return undefined;

  let url: URL;
  try {
    url = new URL(cleaned, baseUrl);
  } catch {
    return undefined;
  }
  if (url.origin !== BASE_URL) return undefined;

  url.hash = "";
  url.search = "";

  if (url.pathname === "/zh/cli" || url.pathname === "/zh/cli/") {
    url.pathname = "/zh/cli.md";
    return url.toString();
  }

  if (!url.pathname.startsWith("/zh/cli/")) return undefined;

  url.pathname = url.pathname.replace(/\/$/, "");
  if (url.pathname.endsWith(".html")) url.pathname = url.pathname.replace(/\.html$/, ".md");
  if (!url.pathname.endsWith(".md")) url.pathname = `${url.pathname}.md`;
  return url.toString();
}

function canonicalCliUrl(effectiveUrl: string): string | undefined {
  const url = new URL(effectiveUrl);
  url.hash = "";
  url.search = "";

  if (url.origin !== BASE_URL) return undefined;
  if (url.pathname === "/zh/cli" || url.pathname === "/zh/cli/") url.pathname = "/zh/cli.md";
  if (url.pathname === "/zh/cli.md") return url.toString();
  if (!url.pathname.startsWith("/zh/cli/")) return undefined;
  if (!url.pathname.endsWith(".md")) return undefined;
  return url.toString();
}

function filepathForUrl(url: string): string {
  const pathname = new URL(url).pathname;
  if (pathname === "/zh/cli.md") return "index.md";
  return pathname.replace(/^\/zh\/cli\//, "").replace(/^\/+/, "");
}

function extractCandidates(content: string, baseUrl: string): string[] {
  const candidates = new Set<string>();

  for (const match of content.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
    const normalized = normalizeCandidate(match[1], baseUrl);
    if (normalized) candidates.add(normalized);
  }

  for (const match of content.matchAll(/href=["']([^"']+)["']/g)) {
    const normalized = normalizeCandidate(match[1], baseUrl);
    if (normalized) candidates.add(normalized);
  }

  for (const match of content.matchAll(/https:\/\/help\.aliyun\.com\/[^\s)\]"'<>]+/g)) {
    const normalized = normalizeCandidate(match[0], baseUrl);
    if (normalized) candidates.add(normalized);
  }

  return [...candidates].sort();
}

function normalizeFenceLanguage(language: string): string {
  if (language === "plaintext") return "text";
  return language.toLowerCase();
}

function splitCodeBlocks(content: string): Array<{ text: string; isCode: boolean }> {
  const segments: Array<{ text: string; isCode: boolean }> = [];
  const re = /^([ \t]*`{3,}|[ \t]*~{3,}).*$\n[\s\S]*?^\1\s*$/gm;
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

function cleanInlineHtml(text: string): string {
  let result = text;
  result = result.replace(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, label) => `[${cleanInlineHtml(label).trim()}](${href})`);
  result = result.replace(/<code>([\s\S]*?)<\/code>/gi, (_, code) => `\`${decodeEntities(code).trim()}\``);
  result = result.replace(/<(?:b|strong)>([\s\S]*?)<\/(?:b|strong)>/gi, (_, body) => `**${cleanInlineHtml(body).trim()}**`);
  result = result.replace(/<br\s*\/?>/gi, " ");
  result = result.replace(/<\/?p\b[^>]*>/gi, " ");
  result = result.replace(/<\/?(?:ul|ol)\b[^>]*>/gi, " ");
  result = result.replace(/<li\b[^>]*>/gi, "- ");
  result = result.replace(/<\/li>/gi, "; ");
  result = result.replace(/<!--[\s\S]*?-->/g, "");
  return decodeEntities(result).replace(/\s+/g, " ").trim();
}

function cleanTableCell(cell: string): string {
  return cleanInlineHtml(cell)
    .replace(/\s*;\s*$/g, "")
    .replace(/\|/g, "\\|");
}

function convertHtmlTable(table: string): string {
  const rows: string[][] = [];
  for (const rowMatch of table.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const cells: string[] = [];
    for (const cellMatch of rowMatch[1].matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)) {
      cells.push(cleanTableCell(cellMatch[1]));
    }
    if (cells.length > 0) rows.push(cells);
  }

  if (rows.length === 0) return cleanInlineHtml(table);

  const columnCount = Math.max(...rows.map((row) => row.length));
  const paddedRows = rows.map((row) => [...row, ...Array(Math.max(0, columnCount - row.length)).fill("")]);
  const header = paddedRows[0].map((cell, index) => cell || `Column ${index + 1}`);
  const separator = Array(columnCount).fill("---");
  const body = paddedRows.slice(1);

  const lines = [header, separator, ...body].map((row) => `| ${row.join(" | ")} |`);
  return `\n${lines.join("\n")}\n`;
}

function cleanInlineHtmlPreserveLines(text: string): string {
  return decodeEntities(text)
    .replace(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, label) => `[${cleanInlineHtml(label).trim()}](${href})`)
    .replace(/<code>([\s\S]*?)<\/code>/gi, (_, code) => `\`${decodeEntities(code).trim()}\``)
    .replace(/<(?:b|strong)>([\s\S]*?)<\/(?:b|strong)>/gi, (_, body) => `**${cleanInlineHtml(body).trim()}**`)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?p\b[^>]*>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");
}

function cleanNonCode(text: string): string {
  let result = text;
  result = result.replace(/<table\b[\s\S]*?<\/table>/gi, (table) => convertHtmlTable(table));
  result = cleanInlineHtmlPreserveLines(result);
  result = result.replace(/\n?[ \t]*\*\*[说明注意]\*\*[ \t]*\n/g, (match) => match.replace(/\s+$/g, "\n"));
  result = result.replace(/[ \t]+$/gm, "");
  return result;
}

function sanitizeMarkdown(content: string): string {
  let result = content.replace(/\r\n/g, "\n");
  result = result.replace(
    /(^[ \t]*```)[^\S\n]*\n[ \t]*HELPCODEESCAPE-([A-Za-z0-9_+-]+)[^\S\n]*\n/gm,
    (_, fence, language) => `${fence}${normalizeFenceLanguage(language)}\n`,
  );
  result = result.replace(/^[ \t]*HELPCODEESCAPE-[A-Za-z0-9_+-]+[ \t]*$/gm, "");

  const segments = splitCodeBlocks(result);
  result = segments.map((segment) => segment.isCode ? segment.text : cleanNonCode(segment.text)).join("");
  return result
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trimEnd() + "\n";
}

function isChallengePage(text: string): boolean {
  return text.includes("x5secdata=") || text.includes("sessionStorage.x5referer") || text.includes("____tmd_____");
}

async function fetchResponseText(url: string, retries = 2): Promise<{ response: Response; text: string }> {
  for (let attempt = 0; ; attempt++) {
    const response = await fetch(url, { headers: { "User-Agent": USER_AGENT, "Accept": "text/markdown,text/plain,text/html,*/*" } });
    const text = await response.text();
    if (!isChallengePage(text) || attempt >= retries) return { response, text };
    console.log(`Challenge page from help.aliyun.com; retrying ${url} after ${CHALLENGE_RETRY_MS / 1000}s`);
    await sleep(CHALLENGE_RETRY_MS);
  }
}

async function fetchText(url: string): Promise<string> {
  const { response, text } = await fetchResponseText(url);
  if (!response.ok) throw new Error(`${url} failed: ${response.status}`);
  if (isChallengePage(text)) throw new Error(`${url} returned challenge page`);
  return text;
}

async function fetchPage(url: string): Promise<FetchPageResult> {
  const { response, text } = await fetchResponseText(url);
  const contentType = response.headers.get("content-type") ?? "";
  const canonicalUrl = canonicalCliUrl(response.url);

  if (isChallengePage(text)) return { skipReason: "challenge page" };
  if (!response.ok) return { skipReason: `${response.status}` };
  if (!canonicalUrl) return { skipReason: `outside CLI namespace: ${response.url}` };
  if (!contentType.includes("text/markdown")) return { skipReason: `not markdown: ${contentType || "unknown"}` };
  if (text.startsWith("# Document Not Found") || text.includes("The requested document does not have Markdown content available")) {
    return { skipReason: "document not found" };
  }

  return {
    page: {
      url: canonicalUrl,
      filepath: filepathForUrl(canonicalUrl),
      content: sanitizeMarkdown(text),
    },
  };
}

function removeStaleFiles(validFiles: Set<string>) {
  if (!existsSync(OUT_DIR)) return;
  let removed = 0;

  function walk(dir: string) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        if (readdirSync(fullPath).length === 0) rmSync(fullPath, { recursive: true });
      } else if (entry.isFile()) {
        const rel = relative(OUT_DIR, fullPath);
        if (!validFiles.has(rel)) {
          rmSync(fullPath);
          removed++;
        }
      }
    }
  }

  walk(OUT_DIR);
  if (removed > 0) console.log(`Removed ${removed} stale files`);
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  const seeds = new Set<string>([ROOT_DOC_URL, ...KNOWN_CLI_PATHS.map((path) => `${BASE_URL}${path}`)]);
  const indexHtml = await fetchText(INDEX_HTML_URL);
  for (const candidate of extractCandidates(indexHtml, INDEX_HTML_URL)) seeds.add(candidate);

  const queue = [...seeds].sort();
  const queued = new Set(queue);
  const visited = new Set<string>();
  const pages = new Map<string, Page>();
  const skipped = new Map<string, string>();

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current)) continue;
    visited.add(current);

    const result = await fetchPage(current);
    if (result.page) {
      const page = result.page;
      if (!pages.has(page.url)) {
        pages.set(page.url, page);
        for (const candidate of extractCandidates(page.content, page.url)) {
          if (!queued.has(candidate) && !visited.has(candidate)) {
            queued.add(candidate);
            queue.push(candidate);
          }
        }
        queue.sort();
      }
    } else if (result.skipReason) {
      skipped.set(current, result.skipReason);
    }

    if (queue.length > 0) await sleep(RATE_LIMIT_MS);
  }

  const allPages = [...pages.values()].sort((a, b) => a.filepath.localeCompare(b.filepath));
  let written = 0;
  for (const page of allPages) {
    const fullPath = join(OUT_DIR, page.filepath);
    const oldContent = existsSync(fullPath) ? await Bun.file(fullPath).text() : undefined;
    if (oldContent !== page.content) {
      mkdirSync(dirname(fullPath), { recursive: true });
      writeFileSync(fullPath, page.content);
      written++;
      console.log(`${oldContent ? "Updated" : "Added"}: ${page.filepath}`);
    }
  }

  removeStaleFiles(new Set(allPages.map((page) => page.filepath)));

  console.log(`Found ${allPages.length} CLI doc pages`);
  console.log(`Fetched ${visited.size} candidate URLs, skipped ${skipped.size}, wrote ${written}`);
  if (skipped.size > 0) {
    const sample = [...skipped.entries()].slice(0, 8);
    for (const [url, reason] of sample) console.log(`Skipped: ${url} (${reason})`);
    if (skipped.size > sample.length) console.log(`Skipped: ${skipped.size - sample.length} more`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
