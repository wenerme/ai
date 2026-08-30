---
name: skill-writer
description: Use when creating new skills, editing existing skills, optimizing skill descriptions and structure, splitting large skills into references, or validating skills against best practices
---

# Skill Writer

Create and optimize Claude Skills following best practices and validation rules.

## Core Principles

1. **Predictability is the goal** — A skill should drive the same process every run, even when outputs differ.
2. **Choose invocation deliberately** — Model-invoked skills spend context load; user-invoked skills spend human cognitive load. Use `disable-model-invocation: true` when only a human should start the skill.
3. **Description follows invocation** — A model-invoked description is a trigger and MUST describe WHEN to load. A user-invoked description is a concise human-facing command summary.
4. **Progressive disclosure** — Three levels: always-loaded metadata → `SKILL.md` on invocation → references/scripts/assets on demand.
5. **Every step needs a completion criterion** — The agent must be able to distinguish complete from incomplete before seeing the next step.
6. **Use leading words** — Prefer compact, established concepts such as `tight loop`, `red-green-refactor`, or `tracer bullet` over repeated explanatory sentences.
7. **Prune aggressively** — Remove duplication, stale sediment, and no-op instructions. Prompt the positive target; reserve `NEVER` for hard guardrails.
8. **No duplication** — Information lives in one source of truth. Keep core steps in `SKILL.md`; move branch-specific reference material behind precise context pointers.

## Skill Types

| Type | Purpose | Naming Convention | Example |
|------|---------|-------------------|---------|
| **Reference** | API docs, CLI guides, tool documentation | `<tool>-cli-guide`, `<lib>-sdk` | argocd-cli-guide |
| **Pattern** | Reusable code patterns and architecture | `<name>-pattern` | zustand-mutative-pattern |
| **Migration** | Version upgrade guides with before/after | `<lib>-v6-to-v7` | mikro-orm-v6-to-v7 |
| **Discipline** | Rules and workflows to enforce | `<name>-sops`, `<name>-lint` | biome-lint |

Personal/team patterns: use a clear org- or project-specific prefix to distinguish them from generic skills.

## Creation Workflow

### Step 1: Define Scope

```
Who will use this skill?
  ├─ Anyone (generic)         → skills repo, no hardcoded paths
  ├─ Only me (user-level)     → can hardcode user paths (~/gits/)
  ├─ One project              → can hardcode project paths, service names
  └─ One use-case             → can hardcode MCP server names, endpoints
```

See [references/patterns.md](references/patterns.md) for detailed scope analysis.

### Step 2: Choose Invocation

```text
Must the model discover this autonomously, or must another skill reach it?
  ├─ Yes → model-invoked; omit disable-model-invocation
  └─ No  → user-invoked; set disable-model-invocation: true
```

When user-invoked commands become hard to remember, add one user-invoked router that explains which command fits each branch. Do not make every command model-invoked just to solve discoverability.

### Step 3: Write Frontmatter

```yaml
# Model-invoked
---
name: my-skill-name
description: Use when [specific triggering conditions and symptoms]
---

# User-invoked
---
name: my-command
description: Concise human-facing command summary.
disable-model-invocation: true
---
```

**Quick rules:**
- `name`: lowercase kebab-case, 1-64 chars, MUST match directory name
- Model-invoked `description`: English trigger, single line, <500 chars
- User-invoked `description`: concise command summary for autocomplete; no trigger list required

See [references/frontmatter.md](references/frontmatter.md) for full invocation and field semantics.

### Step 4: Write Instructions

- Put ordered actions first; end each with a checkable completion criterion.
- Keep definitions/rules co-located and disclose branch-specific reference material.
- Use one strong leading word instead of restating the same behavioural idea.
- Include an error troubleshooting table when real recurring symptoms exist.
- One excellent, runnable example beats many mediocre examples.

### Step 5: Organize Resources

When SKILL.md approaches 500 lines or ~5000 tokens, split into bundled resources:

| Directory | Purpose | Loaded into context? |
|-----------|---------|---------------------|
| `references/` | Docs Claude reads while working | Yes, on demand |
| `scripts/` | Executable code for deterministic tasks | No (executed directly) |
| `assets/` | Files used in output (templates, images) | No (used in output) |

```markdown
# SKILL.md (overview + navigation)
## Quick Start
[Core instructions — enough to handle 80% of cases]

## Detailed Docs
- **API Reference**: See [references/api.md](references/api.md)
- **Config Guide**: See [references/config.md](references/config.md)
```

**Rules:**
- References only one level deep (no `references/sub/`)
- Add table of contents if file >100 lines
- For very large references (>10k words), include grep patterns in SKILL.md so Claude can search efficiently
- Link with relative paths: `[title](references/file.md)`

### Step 6: Validate

```bash
just lint-skills     # Check all skills
just fix-skills      # Auto-fix (e.g., flatten multiline descriptions)
just update-readme   # Regenerate README.md skills table
```

## Validation Rules

Enforced by `lint-skills.ts`:

| Rule | Level | Detail |
|------|-------|--------|
| SKILL.md exists | error | Every skill directory must have SKILL.md |
| Valid YAML frontmatter | error | `---` delimited block at top of file |
| `name` matches directory | error | `name: foo` must be in `skills/foo/` |
| `name` kebab-case | warn | `^[a-z][a-z0-9]*(-[a-z0-9]+)*$` |
| `name` ≤ 64 chars | error | Hard limit from spec |
| `description` exists | error | Required field |
| `description` no newlines | warn | Must be single line (auto-fixable with `--fix`) |
| `description` ≤ 1024 chars | warn | Spec hard limit |
| `description` ≤ 500 chars | warn | Recommended for conciseness |
| Invocation mode explicit | info | `disable-model-invocation: true` for human-only commands |
| Model description starts "Use when..." | warn | Model-facing descriptions encode triggering branches |
| User description is concise | warn | Human-facing autocomplete summary; no trigger list required |
| No workflow summary in model description | warn | Description = WHEN to use, not the runbook |
| Metadata ≤ 150 tokens | info | name + description always loaded in every conversation |
| Metadata ≤ 200 tokens | warn | Metadata is too heavy for "always in context" cost |
| Body ≤ 500 lines | warn | Move excess to `references/` |
| Body ≤ 5000 tokens | warn | ~4 chars per token estimate |

## Description Rules (CRITICAL)

For a **model-invoked** skill:

- MUST start with `Use when...` and cover distinct trigger branches.
- NEVER summarize the workflow; the model may shortcut the body.
- Front-load the leading words users and agents actually use.

For a **user-invoked** skill:

- MUST set `disable-model-invocation: true`.
- Write a short human-facing summary suitable for slash-command autocomplete.
- Do not spend words on model trigger synonyms because the model cannot auto-invoke it.

```yaml
# GOOD — model-invoked trigger
description: Use when upgrading @mikro-orm packages from v6 to v7 or fixing v7 runtime/type errors

# BAD — workflow shortcut
description: Migrates MikroORM by replacing packages, renaming APIs, and updating decorators

# GOOD — user-invoked orchestration
description: Turn the current conversation into an implementation spec.
disable-model-invocation: true
```

**Trigger keywords** are useful for model-invoked reference skills, but avoid synonym duplication: one trigger per genuinely different branch.

See [references/description-rules.md](references/description-rules.md) for full guidelines.

## Directory Structure

```
skill-name/
├── SKILL.md           # Required. Case-sensitive.
├── references/        # Docs loaded into context on demand
│   ├── api.md
│   └── config.md
├── scripts/           # Executable code (token efficient, deterministic)
└── assets/            # Output resources (templates, images, fonts)
```

**Do NOT include:** README.md, CHANGELOG.md, INSTALLATION_GUIDE.md, or any auxiliary documentation. Skills contain only what an AI agent needs to do the job.

## External Skills

Track external skill sources in `skills/skills.json`:

```json
[
  { "repo": "vercel/ai", "path": "skills/use-ai-sdk", "name": "ai-sdk" }
]
```

Workflow: add entry → `just update-skills` → `just update-readme`

- [ ] Identify 2-3 concrete use cases
- [ ] Determine scope (generic / user / project / case)
- [ ] Choose type (reference / pattern / migration / discipline)
- [ ] Choose invocation (model / user) and account for context vs cognitive load

**During creation:**
- [ ] `name` kebab-case, matches directory, ≤64 chars
- [ ] Frontmatter matches invocation semantics
- [ ] Model description has triggers but no workflow summary
- [ ] User description is concise and sets `disable-model-invocation: true`
- [ ] Every ordered step has a checkable completion criterion
- [ ] Branch-specific reference lives behind a precise context pointer
- [ ] Repeated explanations collapsed into leading words or one source of truth
- [ ] No-op, stale, duplicate, and primarily negative instructions removed
- [ ] Body <500 lines / <5000 tokens
- [ ] Code examples are complete and runnable where examples are needed

**After creation:**
- [ ] `just lint-skills` — 0 errors
- [ ] `just update-readme` — table updated when repository workflow requires it
- [ ] Model-invoked: positive, negative, and adjacent trigger tests
- [ ] User-invoked: slash command appears, but skill metadata is absent from model context
- [ ] Execute one realistic scenario and verify each completion criterion

## References

- [YAML Frontmatter Specification](references/frontmatter.md)
- [Description & CSO Rules](references/description-rules.md)
- [Skill Patterns & Scope](references/patterns.md)
