# Description & Claude Search Optimization (CSO)

The description field is the single most important piece of a skill. It determines whether Claude loads your skill for a given task.

## The Golden Rule

First choose invocation:

- **Model-invoked:** description = WHEN to load, never the workflow.
- **User-invoked:** description = a concise human-facing command summary, with `disable-model-invocation: true`.

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

| Rule | Model-invoked | User-invoked |
|------|---------------|--------------|
| Purpose | Trigger autonomous loading | Help humans choose a slash command |
| Opening | Start with `Use when...` | Plain one-line summary |
| Language | English-first for matching | Language useful to the human audience |
| Length | <500 chars recommended | Prefer one short sentence |
| Workflow summary | Never | Brief job is acceptable; runbook is not |
| Visibility | Always-loaded model metadata | Hidden with `disable-model-invocation: true` |

Both modes require a single line, <1024 chars, and no XML tags.

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

## Branch Coverage

For model-invoked skills, use one trigger phrase per genuinely distinct branch. Synonyms that rename one branch are duplication and add context load.

Use words the model would search for when encountering a problem:

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

## Testing Invocation

Model-invoked:

1. Positive: a matching task loads the skill.
2. Negative: an unrelated task stays unloaded.
3. Adjacent: a confusable sibling task routes correctly.

User-invoked:

1. The slash command is discoverable and has a useful autocomplete summary.
2. The skill is absent from model-visible metadata before explicit invocation.
3. A realistic invocation follows the full body rather than only the description.

If a model skill triggers too broadly, narrow branches. If it never triggers, strengthen the leading words or missing symptom branch.
