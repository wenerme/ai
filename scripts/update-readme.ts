import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parse as parseYaml } from "yaml";

const projectDir = join(import.meta.dirname, "..");
const skillsDir = join(projectDir, "skills");
const readmePath = join(projectDir, "README.md");
const skillsJsonPath = join(skillsDir, "skills.json");
const metadataJsonPath = join(skillsDir, "metadata.json");

interface ExternalSkill {
  repo: string;
  path: string;
  name: string;
}

interface SourceMeta {
  repo?: string;
  url?: string;
  host?: string; // non-GitHub host, e.g. "gitlab.alpinelinux.org"
  path?: string;
  ref?: string;
}

interface SkillMeta {
  name: string;
  description: string;
  source?: string; // markdown link or empty
  files: number;
  sizeBytes: number;
}

// Load external skills map (rsync-based): name -> repo
const externalSkills: ExternalSkill[] = JSON.parse(readFileSync(skillsJsonPath, "utf-8"));
const externalMap = new Map(externalSkills.map((s) => [s.name, s.repo]));

// Load metadata (manual source mapping): name -> SourceMeta
const metadata: { sources: Record<string, SourceMeta> } = JSON.parse(readFileSync(metadataJsonPath, "utf-8"));

function resolveSource(name: string): string {
  // 1. skills.json (rsync-based external)
  const extRepo = externalMap.get(name);
  if (extRepo) return `[${extRepo}](https://github.com/${extRepo})`;

  // 2. metadata.json (manual)
  const meta = metadata.sources[name];
  if (!meta) return "";

  if (meta.repo) {
    const host = meta.host ?? "github.com";
    if (meta.path) {
      const cleanPath = meta.path.replace(/^\/+/, "").replace(/\/+$/, "");
      const label = `${meta.repo}/${cleanPath}`;
      const ref = meta.ref ?? "main";
      const treePath = host === "github.com" ? `tree/${ref}/${cleanPath}` : `-/tree/${ref}/${cleanPath}`;
      return `[${label}](https://${host}/${meta.repo}/${treePath})`;
    }
    return `[${meta.repo}](https://${host}/${meta.repo})`;
  }
  if (meta.url) {
    // Show domain as label
    const label = meta.url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    return `[${label}](${meta.url})`;
  }
  return "";
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  const cut = s.lastIndexOf(" ", max);
  return s.slice(0, cut > 0 ? cut : max) + "...";
}

function collectSkillStats(skillDir: string): { files: number; sizeBytes: number } {
  const root = join(skillsDir, skillDir);
  let files = 0;
  let sizeBytes = 0;

  function walk(dir: string) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(path);
      } else if (entry.isFile()) {
        files++;
        sizeBytes += statSync(path).size;
      }
    }
  }

  walk(root);
  return { files, sizeBytes };
}

function parseSkillMeta(skillDir: string): SkillMeta | undefined {
  const skillMd = join(skillsDir, skillDir, "SKILL.md");
  let content: string;
  try {
    content = readFileSync(skillMd, "utf-8");
  } catch {
    return undefined;
  }

  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return undefined;

  const meta = parseYaml(match[1]);
  const stats = collectSkillStats(skillDir);
  return {
    name: meta.name,
    description: String(meta.description || "").trim(),
    source: resolveSource(skillDir),
    ...stats,
  };
}

// Collect all skills
const skills = readdirSync(skillsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => parseSkillMeta(d.name))
  .filter((s): s is SkillMeta => !!s)
  .sort((a, b) => a.name.localeCompare(b.name));

// Summary line for description in table
const shortDesc = (s: SkillMeta) => truncate(s.description.split("\n")[0].trim(), 120);
const skillLink = (s: SkillMeta) => `[${s.name}](./skills/${s.name}/SKILL.md)`;

function formatBytes(bytes: number): string {
  const units = ["B", "KiB", "MiB", "GiB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit++;
  }
  if (unit === 0) return `${bytes} B`;
  const digits = value >= 10 ? 0 : 1;
  return `${value.toFixed(digits)} ${units[unit]}`;
}

const totalFiles = skills.reduce((sum, skill) => sum + skill.files, 0);
const totalSizeBytes = skills.reduce((sum, skill) => sum + skill.sizeBytes, 0);

// Generate markdown
const lines = [
  "## Skills",
  "",
  `> ${skills.length} skills available`,
  "",
  "| Skill | Description | Source |",
  "|-------|-------------|--------|",
  ...skills.map((s) => `| ${skillLink(s)} | ${shortDesc(s)} | ${s.source} |`),
  "",
  ...skills.map((s) =>
    [
      `<details>`,
      `<summary><code>${s.name}</code></summary>`,
      "",
      "```bash",
      `npx skills add wenerme/ai --skill ${s.name}`,
      "```",
      "",
      s.description,
      "",
      `</details>`,
    ].join("\n"),
  ),
  "## Stats",
  "",
  `> ${skills.length} skills, ${totalFiles} files, ${formatBytes(totalSizeBytes)} total`,
  "",
  "| Skill | Files | Size |",
  "|-------|-------|------|",
  ...skills.map((s) => `| ${skillLink(s)} | ${s.files} | ${formatBytes(s.sizeBytes)} |`),
  "",
];

const block = lines.join("\n");

// Update README
const readme = readFileSync(readmePath, "utf-8");
const updated = readme.replace(
  /<!--region skills-->[\s\S]*?<!--endregion-->/,
  `<!--region skills-->\n${block}\n<!--endregion-->`,
);

writeFileSync(readmePath, updated);
console.log(`Updated README.md with ${skills.length} skills.`);
