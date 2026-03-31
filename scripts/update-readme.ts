import { readdirSync, readFileSync, writeFileSync } from "node:fs";
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
}

interface SkillMeta {
  name: string;
  description: string;
  source?: string; // markdown link or empty
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
  return {
    name: meta.name,
    description: String(meta.description || "").trim(),
    source: resolveSource(skillDir),
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

// Generate markdown
const lines = [
  "## Skills",
  "",
  `> ${skills.length} skills available`,
  "",
  "| Skill | Description | Source |",
  "|-------|-------------|--------|",
  ...skills.map((s) => `| \`${s.name}\` | ${shortDesc(s)} | ${s.source} |`),
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
