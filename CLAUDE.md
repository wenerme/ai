# CLAUDE.md

A curated collection of AI Agent Skills — personal patterns and community skills.

## Project Structure

- `skills/<name>/` — Each skill follows the [Agent Skills spec](https://github.com/agentskills/agentskills)
  - `SKILL.md` — Skill definition (YAML frontmatter + instructions)
  - `references/` — Detailed docs loaded on demand
  - `scripts/`, `assets/` — Optional supporting files
- `scripts/update-skills.sh` — Pull external repos and sync skills
- `scripts/update-readme.ts` — Generate skills table in README.md

## Commands

```bash
just update-skills   # git pull external repos + rsync skills
just update-readme   # regenerate README.md skills table
```

## Adding a New Skill

### From an external repo

1. Add `ensure_repo` + `sync_skill` entries in `scripts/update-skills.sh`
2. Run `just update-skills`
3. Run `just update-readme`

### Local/custom skill

1. Create `skills/<name>/SKILL.md` with proper frontmatter (`name` must match directory name)
2. Keep SKILL.md body < 5000 tokens; move details to `references/`
3. Run `just update-readme`

## Skill Authoring Rules

- `name`: 1-64 chars, lowercase kebab-case, must match directory name
- `description`: English-first for reliable LLM matching, include trigger keywords
- Use `MUST`, `NEVER`, `CRITICAL RULE` for hard constraints (not just "注意" or "建议")
- Prefix with `USE THIS SKILL WHEN` for clear agent routing
- Personal/team patterns: prefix with `wode-` to distinguish from generic skills
