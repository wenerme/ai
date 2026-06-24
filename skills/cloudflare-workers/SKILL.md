---
name: cloudflare-workers
description: "Use when working with Cloudflare Workers platform: Workers runtime APIs, Wrangler deployment, Pages, Durable Objects, Workflows, Containers, Browser Rendering, Sandbox, Workers VPC, bindings, routing, compatibility dates, or edge application troubleshooting."
---

# Cloudflare Workers Platform Docs

Official Cloudflare developer docs fetched from [developers.cloudflare.com](https://developers.cloudflare.com), focused on Workers platform and edge application runtime topics.

## Hard Rules

- MUST search `references/` before giving version-sensitive Workers, Pages, Wrangler, binding, or compatibility-date guidance.
- MUST distinguish Workers runtime behavior from Cloudflare data products such as D1/R2/KV/Queues; use `cloudflare-data` for data-store specifics.
- MUST distinguish Workers AI/Agents topics; use `cloudflare-ai` for model, agent, media, and realtime docs.
- NEVER invent compatibility flags, binding syntax, Wrangler config keys, or runtime API behavior without checking docs.

## Fast Lookup

```bash
rg -n "compatibility|wrangler|binding|route|deploy" skills/cloudflare-workers/references
rg -n "Durable Object|Workflows|Container|Browser Rendering|Sandbox" skills/cloudflare-workers/references
rg -n "Pages|Functions|runtime API|fetch|Request|Response" skills/cloudflare-workers/references
```

## Reference Map

- `references/workers/` — Workers runtime APIs, configuration, bindings, deployment, observability, examples.
- `references/pages/` — Cloudflare Pages and Pages Functions.
- `references/durable-objects/` — Durable Objects API and patterns.
- `references/workflows/` — Workflows product docs.
- `references/containers/` — Containers on Cloudflare.
- `references/browser-run/` — Browser Rendering.
- `references/sandbox/` — Sandbox runtime docs.
- `references/workers-vpc/` — Workers VPC.
- `references/dynamic-workers/` — dynamic Workers docs.
