---
name: slopus-happy-docs
description: "Happy Coder (happy-coder) documentation — mobile and web client for Claude Code & Codex with end-to-end encryption. Covers wire protocol (WebSocket), HTTP API, encryption boundaries, backend architecture, CLI/daemon architecture, session protocol, permission resolution, deployment, and development plans. USE THIS SKILL WHEN the user asks about Happy Coder setup, protocol, architecture, or Claude Code mobile/web client integration."
version: 0.1.0
---

# Happy Coder Documentation

Official docs for [Happy Coder](https://github.com/slopus/happy) — mobile and web client for Claude Code & Codex with E2E encryption.

CRITICAL: grep `references/` for keywords before answering.

## Reference Index (19 docs)

### Core Architecture
- `references/protocol.md` — Wire protocol (WebSocket), payload formats, sequencing, concurrency rules
- `references/api.md` — HTTP endpoints and authentication flows
- `references/encryption.md` — Encryption boundaries and on-wire encoding
- `references/backend-architecture.md` — Internal backend structure, data flow, key subsystems
- `references/happy-wire.md` — Shared wire schemas/types package and migration notes

### CLI & Session
- `references/cli-architecture.md` — CLI and daemon architecture, server interaction
- `references/session-protocol.md` — Unified encrypted chat event protocol
- `references/session-protocol-claude.md` — Claude-specific session-protocol flow (local vs remote launchers)
- `references/permission-resolution.md` — State-based permission mode resolution (app and CLI)

### Deployment
- `references/deployment.md` — Backend deployment and required infrastructure

### Development Plans
- `references/plans/cli-v3-messages-api.md` — CLI v3 messages API plan
- `references/plans/generic-acp-runner.md` — Generic ACP runner
- `references/plans/happy-agent.md` — Happy agent design
- `references/plans/metadata-driven-model-mode-selection.md` — Model/mode selection
- `references/plans/portable-binary.md` — Portable binary distribution
- `references/plans/reliable-http-messages-api.md` — Reliable HTTP messages API
- `references/plans/sandbox-runtime.md` — Sandbox runtime
- `references/plans/session-protocol-impl.md` — Session protocol implementation
