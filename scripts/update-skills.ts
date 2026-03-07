import { $ } from "bun";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const projectDir = join(import.meta.dirname, "..");
const skillsDir = join(projectDir, "skills");
const skillsJson = join(skillsDir, "skills.json");
const gitsPath = process.env.GITS_PATH || join(process.env.HOME!, "gits");

interface SkillEntry {
  repo: string;
  path: string;
  name: string;
}

const skills: SkillEntry[] = await Bun.file(skillsJson).json();

// Collect unique repos
const repos = [...new Set(skills.map((s) => s.repo))];

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
for (const { repo, path, name } of skills) {
  const src = join(gitsPath, repo, path);
  const dst = join(skillsDir, name);

  if (!existsSync(src)) {
    console.log(`    SKIP: ${src} not found`);
    continue;
  }

  console.log(`    Syncing ${name} ...`);
  mkdirSync(dst, { recursive: true });
  await $`rsync -aL --delete ${src}/ ${dst}/`;
  console.log(`    Done: ${name}`);
}

console.log("\nAll skills updated.");
