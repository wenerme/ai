# Description & Claude Search Optimization (CSO)

The description field is the single most important piece of a skill. It determines whether Claude loads your skill for a given task.

## The Golden Rule

**Description = WHEN to use. NEVER WHAT it does.**

```yaml
# ✅ GOOD — triggering conditions only
description: Use when executing implementation plans with independent tasks in the current session

# ❌ BAD — summarizes workflow, Claude may follow this shortcut instead of reading the skill
description: Use when executing plans - dispatches subagent per task with code review between tasks
```

### Why This Matters

Testing revealed that when a description summarizes the skill's workflow, Claude follows the description instead of reading the full skill body. A description saying "code review between tasks" caused Claude to do ONE review, even though the skill's flowchart specified TWO reviews (spec compliance then code quality).

When changed to just triggering conditions, Claude correctly read and followed the full skill content.

**The trap:** Workflow summaries in descriptions create a shortcut Claude will take. The skill body becomes documentation Claude skips.

## Format Rules

| Rule | Detail |
|------|--------|
| Start with "Use when..." | Focus on triggering conditions |
| Single line | No newlines (YAML multiline causes issues) |
| English-first | Reliable LLM matching across languages |
| <500 chars recommended | <1024 hard limit |
| Third person | Injected into system prompt context |
| No XML tags | `<` `>` break system prompt parsing |

## Trigger Keywords

Trigger keywords (e.g., `Triggers on "argocd sync", "argocd diff"`) help with discovery for **reference skills** (API docs, CLI guides).

**Acceptable for:** Reference skills, migration guides
**Avoid for:** Pattern skills, discipline skills

```yaml
# Reference skill — trigger keywords OK
description: Use when managing Kubernetes apps via argocd CLI. Triggers on "argocd sync", "argocd diff", "app health"

# Pattern skill — no trigger keywords needed
description: Use when implementing React state management with Zustand, including context-scoped stores or mutative updates
```

## Good vs Bad Examples

### Too Vague

```yaml
# ❌ No context for when to activate
description: Helps with projects
description: ArgoCD CLI helper
description: Database patterns
```

### Missing Trigger Conditions

```yaml
# ❌ Says what, not when
description: Creates complex multi-page document systems
description: Processes payment transactions with compliance checks
```

### Summarizes Workflow

```yaml
# ❌ Claude will follow this shortcut
description: Migrates MikroORM by replacing packages, renaming APIs, and updating import paths
description: Runs biome lint, collects errors, groups by rule, and fixes them in batches
```

### Correct

```yaml
# ✅ Triggering conditions with specific symptoms
description: Use when upgrading @mikro-orm packages from v6 to v7, fixing v7 runtime/type errors (decorator SyntaxError, persistAndFlush removed, nativeInsert not found)

# ✅ Clear use-case boundaries
description: Use when fixing Biome linter errors, TypeScript/tsgo type-check errors, or running lint/typecheck workflows

# ✅ Technology-specific with context
description: Use when implementing event-driven communication between React components using Emittery, including event types, sidecar components, or subscription hooks
```

## Keyword Coverage

Use words Claude would search for when encountering a problem:

- **Error messages:** "Hook timed out", "persistAndFlush is not a function"
- **Symptoms:** "layout broken", "auth error", "perpetual diff"
- **Tool names:** Actual CLI commands, library names, file types
- **Synonyms:** Cover variations ("upgrade/migrate/update", "timeout/hang/freeze")

## Token Efficiency

Skills load into the conversation context. Every token counts.

**Move details to references:**
```markdown
# ❌ BAD: 50 lines of API flags in SKILL.md
argocd app sync supports --async, --dry-run, --prune, --force, --resource...

# ✅ GOOD: Core patterns in SKILL.md, full reference linked
See [references/api.md](references/api.md) for complete flag reference.
```

**Use cross-references between skills:**
```markdown
# ❌ BAD: Repeat config details inline
grpc-web can be persisted in ~/.config/argocd/config by setting...
[20 lines of config structure]

# ✅ GOOD: Link to reference
See [references/argocd-config.md](references/argocd-config.md) for config details.
```

**Compress examples:**
```markdown
# ❌ BAD: Verbose
User says: "I need to sync my ArgoCD application to the latest version"
Agent: "I'll first check the diff to see what changes will be applied..."
[runs argocd app diff ...]

# ✅ GOOD: Just the command pattern
argocd app diff <APP> && argocd app sync <APP>
```

## Testing Triggers

After creating a skill, verify:

1. **Positive test:** Ask Claude a question that SHOULD trigger the skill. Does it load?
2. **Negative test:** Ask something unrelated. Does it stay unloaded?
3. **Edge case:** Ask something adjacent but not quite matching. Correct behavior?

If the skill triggers too broadly, make the description more specific.
If it never triggers, add more symptom keywords.
