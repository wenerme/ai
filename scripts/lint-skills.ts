import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parse as parseYaml, stringify as stringifyYaml } from "yaml";

const projectDir = join(import.meta.dirname, "..");
const skillsDir = join(projectDir, "skills");
const fix = process.argv.includes("--fix");

interface Issue {
  skill: string;
  level: "error" | "warn" | "info";
  message: string;
  fixed?: boolean;
}

const issues: Issue[] = [];

function addIssue(skill: string, level: Issue["level"], message: string, fixed = false) {
  issues.push({ skill, level, message, fixed });
}

const NAME_RE = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

const dirs = readdirSync(skillsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

for (const dir of dirs) {
  const skillMdPath = join(skillsDir, dir, "SKILL.md");
  let content: string;
  try {
    content = readFileSync(skillMdPath, "utf-8");
  } catch {
    addIssue(dir, "error", "Missing SKILL.md");
    continue;
  }

  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) {
    addIssue(dir, "error", "Missing YAML frontmatter (--- block)");
    continue;
  }

  const fmRaw = fmMatch[1];
  const body = content.slice(fmMatch[0].length);
  let meta: any;
  try {
    meta = parseYaml(fmRaw);
  } catch (e: any) {
    addIssue(dir, "error", `Invalid YAML: ${e.message}`);
    continue;
  }

  // --- name checks ---
  const name: string = meta.name || "";
  if (!name) {
    addIssue(dir, "error", "Missing 'name' field");
  } else {
    if (name !== dir) {
      addIssue(dir, "error", `name '${name}' does not match directory '${dir}'`);
    }
    if (name.length > 64) {
      addIssue(dir, "error", `name exceeds 64 chars (${name.length})`);
    }
    if (!NAME_RE.test(name)) {
      addIssue(dir, "warn", `name '${name}' is not lowercase kebab-case`);
    }
  }

  // --- description checks ---
  const desc: string = meta.description || "";
  if (!desc) {
    addIssue(dir, "error", "Missing 'description' field");
  } else {
    if (desc.length > 1024) {
      addIssue(dir, "warn", `description exceeds 1024 chars (${desc.length})`);
    }

    // Check for multiline description (contains newlines)
    const trimmed = desc.trim();
    if (trimmed.includes("\n")) {
      // Flatten: join lines with space, collapse whitespace
      const flat = trimmed.replace(/\n\s*/g, " ").replace(/\s{2,}/g, " ").trim();
      if (fix) {
        meta.description = flat;
        const newFm = stringifyYaml(meta, { lineWidth: 0 }).trim();
        const newContent = `---\n${newFm}\n---${body}`;
        writeFileSync(skillMdPath, newContent);
        addIssue(dir, "warn", "description had newlines → flattened to single line", true);
      } else {
        addIssue(dir, "warn", "description contains newlines (run with --fix to flatten)");
      }
    }
  }

  // --- description best practices ---
  if (desc) {
    const descLower = desc.toLowerCase();
    // Check for "Trigger keywords" — info for reference skills, may be intentional
    if (/trigger keywords?[:\s]/i.test(desc) || /triggers? (?:on|include)[:\s]/i.test(desc)) {
      addIssue(dir, "info", "description contains trigger keywords — acceptable for reference skills, avoid for pattern/discipline skills");
    }
    // Description should describe when to use, not what it does
    if (descLower.startsWith("use this skill") || descLower.startsWith("use when")) {
      // good
    } else if (!descLower.includes("use when") && !descLower.includes("use this")) {
      addIssue(dir, "warn", "description should start with 'Use when...' (triggering conditions only)");
    }
    // Check for workflow summaries in description
    if (/provides? (?:strict )?sops? for/i.test(desc) || /this (?:pattern|skill) enforces/i.test(desc)) {
      addIssue(dir, "warn", "description may summarize workflow — should only describe when to use, not what it does");
    }
    if (desc.length > 500) {
      addIssue(dir, "warn", `description is ${desc.length} chars (recommended < 500)`);
    }
  }

  // --- metadata (always in context) checks ---
  const metadataText = `${name} ${desc}`;
  const metadataTokens = Math.round(metadataText.length / 4);
  if (metadataTokens > 200) {
    addIssue(dir, "warn", `metadata ~${metadataTokens} tokens (recommended < 200 — loaded in every conversation)`);
  } else if (metadataTokens > 150) {
    addIssue(dir, "info", `metadata ~${metadataTokens} tokens (ideal < 150 — loaded in every conversation)`);
  }

  // --- body checks ---
  const bodyLines = body.trim().split("\n");
  const lineCount = bodyLines.length;
  if (lineCount > 500) {
    addIssue(dir, "warn", `SKILL.md body is ${lineCount} lines (recommended < 500)`);
  }

  // Estimate tokens (~4 chars per token)
  const bodyTokens = Math.round(body.length / 4);
  if (bodyTokens > 5000) {
    addIssue(dir, "warn", `SKILL.md body ~${bodyTokens} tokens (recommended < 5000)`);
  }
}

// --- Report ---
const errors = issues.filter((i) => i.level === "error");
const warns = issues.filter((i) => i.level === "warn");
const infos = issues.filter((i) => i.level === "info");
const fixed = issues.filter((i) => i.fixed);

console.log(`Checked ${dirs.length} skills\n`);

if (issues.length === 0) {
  console.log("All skills pass validation ✓");
} else {
  const icons = { error: "✗", warn: "⚠", info: "ℹ" } as const;
  for (const issue of issues) {
    const fixTag = issue.fixed ? " [FIXED]" : "";
    console.log(`  ${icons[issue.level]} ${issue.skill}: ${issue.message}${fixTag}`);
  }
  const parts = [`${errors.length} error(s)`, `${warns.length} warning(s)`, `${infos.length} info(s)`];
  if (fixed.length) parts.push(`${fixed.length} fixed`);
  console.log(`\n${parts.join(", ")}`);
}

if (errors.length > 0 && !fix) {
  process.exit(1);
}
