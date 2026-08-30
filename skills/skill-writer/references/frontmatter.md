# YAML Frontmatter Specification

Based on the [Agent Skills Specification](https://github.com/agentskills/agentskills).

## Required Fields

Every skill needs `name` and `description`. Invocation determines description semantics:

```yaml
# Model-invoked: visible to the model
---
name: skill-name-in-kebab-case
description: Use when [specific triggering conditions and symptoms]
---

# User-invoked: visible only through an explicit skill command
---
name: command-name
description: Concise human-facing command summary.
disable-model-invocation: true
---
```

## name (required)

- 1-64 characters
- Lowercase letters, numbers, hyphens only
- Cannot start or end with hyphen
- No consecutive hyphens
- MUST match the directory name

```yaml
# Good
name: my-cool-skill
name: mikro-orm-v6-to-v7
name: wode-db-schema-pattern

# Bad
name: My Cool Skill       # uppercase
name: my_cool_skill        # underscores
name: -my-skill            # starts with hyphen
name: my--skill            # consecutive hyphens
```

**Reserved prefixes:** Names starting with `claude` or `anthropic` are reserved.

## description (required)

- Max 1024 characters (recommended <500)
- Single line — no newlines (use `just fix-skills` to auto-flatten)
- No XML tags (`<` `>`)
- Model-invoked: start with `Use when...`, English-first, and describe distinct trigger branches
- User-invoked: concise human-facing summary for autocomplete; trigger phrasing is optional

```yaml
# Good — specific triggers
description: Use when upgrading react-resizable-panels from v3 to v4, fixing v4 type/runtime errors (PanelGroup not exported, direction prop invalid, layout broken)

# Good — reference skill with keywords
description: Use when managing Kubernetes apps via argocd CLI, including syncing deployments, viewing logs, or switching server contexts

# Bad — no triggering condition
description: ArgoCD CLI helper

# Bad — summarizes workflow instead of triggers
description: Migrates apps by renaming components, converting units, and updating CSS
```

See [description-rules.md](description-rules.md) for the full rationale and CSO guidelines.

## Optional Fields

```yaml
name: skill-name
description: Use when [...]

# Hide from model discovery; user must invoke explicitly
# Supported by Pi; verify support in other target harnesses.
disable-model-invocation: true

# Pre-approved tool calls (experimental)
allowed-tools: Bash(git:*) Read mcp__server-name

# Open source license
license: MIT

# Environment requirements (1-500 chars)
compatibility: Requires Python 3.9+

# Custom metadata
metadata:
  author: Your Name
  version: 1.0.0
```

### disable-model-invocation

Use `true` for human-only orchestration commands. This removes the skill from Pi's model-visible skill metadata while retaining `/skill:<name>` invocation.

Tradeoff:

- `false`/omitted: pays context load, gains autonomous model discovery and cross-skill reach.
- `true`: pays human cognitive load, gains explicit control and zero model metadata load.

If user-invoked commands become hard to remember, add a user-invoked router instead of exposing all commands to the model.

### allowed-tools (experimental)

Space-separated list of pre-approved tools. Allows skill to auto-authorize tool calls.

| Format | Meaning |
|--------|---------|
| `Bash(command:*)` | Allow specific Bash commands |
| `Read` / `Write` / `Edit` | File operation tools |
| `mcp__<server>` | All tools from an MCP server |
| `mcp__<server>__<tool>` | Specific MCP tool |

```yaml
# Allow git commands and file reading
allowed-tools: Bash(git:*) Read

# Allow specific MCP server tools
allowed-tools: mcp__my-server mcp__my-server__specific-tool

# Combined
allowed-tools: Bash(curl:*) Read mcp__my-server
```

**Note:** This feature is experimental. Support varies across agent implementations.

## Complete Example

```yaml
---
name: payment-processing
description: Use when handling online payment workflows including account creation, payment setup, and subscription management via PayFlow API
license: MIT
compatibility: Requires PayFlow MCP server
metadata:
  author: PayFlow Inc
  version: 2.1.0
---
```
