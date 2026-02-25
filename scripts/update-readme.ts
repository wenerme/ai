import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parse as parseYaml } from "yaml";

const projectDir = join(import.meta.dirname, "..");
const skillsDir = join(projectDir, "skills");
const readmePath = join(projectDir, "README.md");
const skillsJsonPath = join(skillsDir, "skills.json");

interface ExternalSkill {
  repo: string;
  path: string;
  name: string;
}

interface SkillMeta {
  name: string;
  description: string;
  source?: string; // "repo" link or "local"
}

// Load external skills map: name -> repo
const externalSkills: ExternalSkill[] = JSON.parse(readFileSync(skillsJsonPath, "utf-8"));
const externalMap = new Map(externalSkills.map((s) => [s.name, s.repo]));

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
  const repo = externalMap.get(skillDir);
  return {
    name: meta.name,
    description: String(meta.description || "").trim(),
    source: repo ? `[${repo}](https://github.com/${repo})` : "local",
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
