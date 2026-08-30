import { $ } from "bun";
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";

const projectDir = join(import.meta.dirname, "..");
const skillsDir = join(projectDir, "skills");
const skillsJson = join(skillsDir, "skills.json");
const gitsPath = process.env.GITS_PATH || join(process.env.HOME!, "gits");

interface SkillEntry {
  repo: string;
  path: string;
  name: string;
  sourceType?: "directory" | "file";
}

const skills: SkillEntry[] = await Bun.file(skillsJson).json();
const requestedNames = process.argv.slice(2);
const requestedSkills = requestedNames.length === 0
  ? skills
  : skills.filter((skill) => requestedNames.includes(skill.name));
const foundNames = new Set(requestedSkills.map((skill) => skill.name));
const unknownNames = requestedNames.filter((name) => !foundNames.has(name));

if (unknownNames.length > 0) {
  throw new Error(`Unknown skill name(s): ${unknownNames.join(", ")}`);
}

// Collect unique repos
const repos = [...new Set(requestedSkills.map((s) => s.repo))];

async function retry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  for (let i = 1; i <= retries; i++) {
    try {
      return await fn();
    } catch (e) {
      if (i === retries) throw e;
      console.log(`    Retry ${i}/${retries - 1} ...`);
    }
  }
  throw new Error("unreachable");
}

// Ensure repos are cloned / up-to-date
for (const repo of repos) {
  const dir = join(gitsPath, repo);
  if (!existsSync(dir)) {
    console.log(`==> Cloning ${repo} (shallow) ...`);
    mkdirSync(dirname(dir), { recursive: true });
    await retry(() => $`git clone --depth 1 https://github.com/${repo}.git ${dir}`);
  } else {
    console.log(`==> Pulling ${repo} ...`);
    await retry(() => $`git -C ${dir} pull`);
  }
}

// Sync each skill
for (const { repo, path, name, sourceType = "directory" } of requestedSkills) {
  const src = join(gitsPath, repo, path);
  const dst = join(skillsDir, name);

  if (!existsSync(src)) {
    console.log(`    SKIP: ${src} not found`);
    continue;
  }

  console.log(`    Syncing ${name} ...`);
  if (sourceType === "file") {
    rmSync(dst, { recursive: true, force: true });
    mkdirSync(dst, { recursive: true });
    await Bun.write(join(dst, "SKILL.md"), Bun.file(src));
  } else {
    mkdirSync(dst, { recursive: true });
    await $`rsync -aL --delete ${src}/ ${dst}/`;
  }

  // Fix name field in SKILL.md to match the local directory name
  const skillMd = join(dst, "SKILL.md");
  if (existsSync(skillMd)) {
    const content = await Bun.file(skillMd).text();
    const fixed = content.replace(/^(name:\s*)(\S+)/m, `$1${name}`);
    if (fixed !== content) {
      await Bun.write(skillMd, fixed);
      console.log(`    Fixed name: ${name}`);
    }
  }

  console.log(`    Done: ${name}`);
}

console.log("\nAll skills updated.");
