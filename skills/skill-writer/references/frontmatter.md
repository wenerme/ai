# YAML Frontmatter Specification

Based on the [Agent Skills Specification](https://github.com/agentskills/agentskills).

## Required Fields

```yaml
---
name: skill-name-in-kebab-case
description: Use when [specific triggering conditions and symptoms]
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
- Start with "Use when..." — describe triggering conditions
- English-first for reliable LLM matching
- No XML tags (`<` `>`) — frontmatter appears in system prompt
- Third person voice

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
