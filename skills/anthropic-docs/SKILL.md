---
name: anthropic-docs
description: "Use when learning about Claude models, capabilities, pricing, prompt engineering, extended thinking, effort levels, vision, PDF support, streaming, structured outputs, tool use, MCP, context windows, prompt caching, embeddings, testing, guardrails, data residency, or Anthropic platform features."
---

# Anthropic Platform Documentation

General Anthropic docs covering models, capabilities, and platform features (sourced from [platform.claude.com](https://platform.claude.com/docs/en/intro)).

CRITICAL: grep `references/` for keywords before answering.

## Topic Index

### About Claude
- `about-claude/models/` — Model overview, choosing a model, what's new, migration guide
- `about-claude/pricing.md` — Pricing and token costs
- `about-claude/model-deprecations.md` — Deprecation schedule
- `about-claude/glossary.md` — Terminology
- `about-claude/use-case-guides/` — Ticket routing, customer support, content moderation, legal

### Build with Claude
- `build-with-claude/overview.md` — Feature matrix
- `build-with-claude/working-with-messages.md` — Request/response patterns
- `build-with-claude/extended-thinking.md` — Chain-of-thought reasoning
- `build-with-claude/adaptive-thinking.md` — Dynamic thinking allocation
- `build-with-claude/effort.md` — Effort levels (low/medium/high)
- `build-with-claude/streaming.md` — SSE streaming
- `build-with-claude/structured-outputs.md` — JSON schema output
- `build-with-claude/vision.md` — Image understanding
- `build-with-claude/pdf-support.md` — PDF processing
- `build-with-claude/prompt-caching.md` — Cache prefixes
- `build-with-claude/context-windows.md` — Context management
- `build-with-claude/compaction.md` — Context compaction
- `build-with-claude/batch-processing.md` — Batch API guide
- `build-with-claude/files.md` — File uploads
- `build-with-claude/prompt-engineering/` — Prompting best practices

### Agents & Tools
- `agents-and-tools/tool-use/` — Tool use overview, web search, code execution, computer use, etc.
- `agents-and-tools/agent-skills/` — Agent skills spec
- `agents-and-tools/mcp-connector.md` — MCP connector
- `agents-and-tools/remote-mcp-servers.md` — Remote MCP

### Cloud Providers
- `build-with-claude/claude-on-amazon-bedrock.md`
- `build-with-claude/claude-on-vertex-ai.md`
- `build-with-claude/claude-in-microsoft-foundry.md`

### Test & Evaluate
- `test-and-evaluate/` — Develop tests, eval tool, guardrails

### Release Notes
- `release-notes/overview.md` — API changelog
- `release-notes/system-prompts.md` — System prompt history
