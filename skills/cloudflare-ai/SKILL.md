---
name: cloudflare-ai
description: "Use when working with Cloudflare AI and media products: Workers AI, AI Gateway, Agents, Agent Memory, AI Search, AI Crawl Control, Realtime, Stream, Images, Videos, model inference, agent workflows, media delivery, or AI observability."
---

# Cloudflare AI and Media Docs

Official Cloudflare developer docs fetched from [developers.cloudflare.com](https://developers.cloudflare.com), focused on AI, agents, realtime, and media products.

## Hard Rules

- MUST search `references/` before giving model, API, pricing, binding, gateway, or media processing details.
- MUST distinguish Workers runtime setup from AI/media product APIs; use `cloudflare-workers` for runtime and deployment mechanics.
- NEVER invent model names, endpoint paths, AI Gateway behavior, agent lifecycle hooks, media transformations, or realtime API semantics.

## Fast Lookup

```bash
rg -n "Workers AI|AI Gateway|model|inference|embedding" skills/cloudflare-ai/references
rg -n "Agent|Agent Memory|MCP|tool|workflow" skills/cloudflare-ai/references
rg -n "Realtime|Stream|Images|Videos|media" skills/cloudflare-ai/references
```

## Reference Map

- `references/ai/` and `references/workers-ai/` — AI platform and Workers AI.
- `references/ai-gateway/` — AI Gateway.
- `references/agents/` and `references/agent-memory/` — Agents and memory.
- `references/ai-search/` — AI Search.
- `references/ai-crawl-control/` — AI Crawl Control.
- `references/realtime/` — Realtime docs.
- `references/stream/`, `references/images/`, `references/videos/` — media products.
