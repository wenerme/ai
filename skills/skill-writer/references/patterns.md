# Skill Patterns & Scope

## Skill Scope

Different skills have different scopes, which determines how specific the content should be.

| Scope | Location | Can Hardcode | Example |
|-------|----------|-------------|---------|
| Generic | Public repo | Nothing specific | skill-writer, zustand-mutative-pattern |
| User-level | `~/.claude/skills/` | User paths (`~/gits/`) | Personal SDK reference |
| Project-level | `.claude/skills/` | Project paths, service names | Project deployment guide |
| Domain-level | Either | Tech concepts, NOT MCP instance names | Cloud logging query guide |
| Case-level | Project | MCP server names, endpoints | Incident RCA workflow |

### Decision Guide

```
Will this skill be used by others?
  ├─ Yes → Generic scope
  │        - No hardcoded paths or server names
  │        - Use placeholders: <SERVER_ADDRESS>, <APP_NAME>
  │        - Example descriptions, not real ones
  │
  └─ No → Personal/project scope
           ├─ Used across projects? → User-level (~/.claude/skills/)
           │   Can hardcode: user paths, personal preferences
           │
           └─ Used in one project? → Project-level (.claude/skills/)
               Can hardcode: project paths, service names, MCP servers
```

### Scope Examples

```yaml
# Generic — no hardcoded specifics
description: Use when managing Kubernetes apps via argocd CLI

# User-level — personal environment
description: Use when querying MaaS API. Local SDK at ~/gits/openai/openai-node/

# Project-level — specific project
description: Use when deploying backend services to production clusters

# Case-level — specific problem + specific tools
description: Use when investigating LLM API latency issues. Requires cloud-logging MCP server.
```

## Freedom vs Precision

Match the instruction style to how much flexibility the task allows:

| Freedom | When | Style |
|---------|------|-------|
| High | Multiple valid approaches | Text guidance, principles |
| Medium | Preferred approach with room for variation | Pseudocode, parameterized scripts |
| Low | Fragile operations, exact steps required | Concrete scripts, minimal parameters |

```markdown
# High freedom — general guidance
Use semantic HTML elements. Prefer flexbox for layout.

# Medium freedom — pattern with flexibility
def process(data):
    validated = validate(data)       # always validate first
    transformed = transform(validated)  # apply business rules
    return save(transformed)         # persist results

# Low freedom — exact command
argocd context <SERVER> && argocd app diff argocd/<APP> && argocd app sync argocd/<APP>
```

## Instruction Patterns

### Pattern 1: Sequential Workflow

For multi-step processes that must execute in order.

```markdown
## Deployment Workflow

### Step 1: Pre-check
Run diff to understand changes:
\`\`\`bash
argocd app diff <APP>
\`\`\`

### Step 2: Sync
Apply changes:
\`\`\`bash
argocd app sync <APP>
\`\`\`

### Step 3: Verify
Confirm deployment health:
\`\`\`bash
argocd app get <APP>
\`\`\`
```

**Key:** Clear step numbers, each step has expected output, dependency between steps is explicit.

### Pattern 2: Decision Tree

For choosing between approaches based on context.

```markdown
## Entity Definition

\`\`\`
Need to define entities?
  ├─ New project / no legacy decorators → defineEntity (best type inference)
  ├─ Existing project / many decorator entities → Legacy decorators
  └─ TC39 decorator environment (Node 22.6+) → ES spec decorators
\`\`\`
```

**Key:** ASCII tree format is scannable and copy-pastable (unlike flowchart images).

### Pattern 3: Error Troubleshooting Table

For mapping symptoms to fixes — the most useful reference pattern.

```markdown
## Common Errors

| Symptom | Cause | Fix |
|---------|-------|-----|
| `persistAndFlush is not a function` | API removed in v7 | `em.persist(entity).flush()` |
| `Cannot find module '@mikro-orm/knex'` | Package renamed | Replace with `@mikro-orm/sql` |
| `Unauthenticated` | Token expired | `argocd relogin` or full login |
```

**Key:** Symptom uses actual error message text (for searchability). Fix is a concrete action.

### Pattern 4: Before/After Diff

For migration and refactoring skills.

````markdown
## API Migration

```diff
- em.persistAndFlush(entity)
+ em.persist(entity).flush()

- em.getKnex()
+ em.getKysely()
```
````

**Key:** Use `diff` language for syntax highlighting. Group related changes together.

### Pattern 5: Guardrails

For discipline skills that need hard enforcement.

```markdown
**CRITICAL RULE:** ALWAYS run a diff before performing a manual sync.

**CRITICAL GUARDRAIL:** If the diff shows unexpected massive deletions, STOP and ask the user.

**MUST:** Switch context before operating on a different server.

**NEVER:** Run `--prune --force` without explicit user confirmation.
```

**Key:** Use `MUST`, `NEVER`, `CRITICAL` — not "should", "try to", "consider".

## Anti-Patterns

### Narrative Storytelling

```markdown
# ❌ BAD
In session 2025-10-03, we found that empty projectDir caused a crash.
After investigating for 2 hours, we discovered that...

# ✅ GOOD
Empty `projectDir` causes crash. Always validate before use:
\`\`\`typescript
if (!projectDir) throw new Error('projectDir is required');
\`\`\`
```

### Multi-Language Dilution

```markdown
# ❌ BAD — mediocre in 5 languages
example-js.js, example-py.py, example-go.go, example-rs.rs

# ✅ GOOD — excellent in 1 language
One complete, well-commented example in the most relevant language.
```

### Workflow Summary in Description

```yaml
# ❌ BAD — Claude shortcuts to description, skips skill body
description: Runs lint, collects errors, groups by rule, fixes in batches, then runs typecheck

# ✅ GOOD — triggers only, Claude reads the full skill
description: Use when fixing Biome linter errors or TypeScript type-check errors
```

### Over-Documentation

```markdown
# ❌ BAD — Claude already knows this
Git is a version control system. To commit changes, use `git commit`.

# ✅ GOOD — only what Claude doesn't know
## Commit Convention
This project uses conventional commits: `feat(scope): description`
```

## Common Mistakes and Fixes

| Mistake | Fix |
|---------|-----|
| SKILL.md >500 lines | Split into `references/` |
| Description has newlines | Run `just fix-skills` to flatten |
| Description in Chinese only | Add English translation for LLM matching |
| Generic description ("helps with X") | Rewrite with specific "Use when..." triggers |
| Hardcoded paths in generic skill | Use `<PLACEHOLDER>` format |
| No error troubleshooting table | Add symptom → cause → fix table |
| Code examples are pseudocode | Make them complete and runnable |
| "Should" / "try to" for hard rules | Use `MUST` / `NEVER` / `CRITICAL` |
