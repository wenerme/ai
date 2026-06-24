---
name: cloudflare-docs
description: "Use when a Cloudflare question is broad or you need to choose the right Cloudflare skill. Routes to Cloudflare Workers, Data, AI, Zero Trust, Security, Networking, or Observability/Admin docs."
---

# Cloudflare Docs Router

Official Cloudflare developer docs fetched from [developers.cloudflare.com](https://developers.cloudflare.com).

Use this router skill when the request is broad, spans multiple Cloudflare product families, or you need to pick the best focused Cloudflare skill.

## Route by Topic

- `cloudflare-workers` — Workers runtime, Pages, Durable Objects, Workflows, Containers, Browser Rendering, Sandbox, Workers VPC.
- `cloudflare-data` — D1, R2, R2 SQL, KV, Queues, Hyperdrive, Vectorize, Pipelines, Artifacts, Secrets Store.
- `cloudflare-ai` — Workers AI, AI Gateway, Agents, Agent Memory, AI Search, AI Crawl Control, Realtime, Stream, Images, Videos.
- `cloudflare-zero-trust` — Cloudflare One, Access/Gateway/WARP, Tunnel, Zero Trust networking, 1.1.1.1, privacy proxy/gateway.
- `cloudflare-security` — WAF, DDoS, Bots, API Shield, Turnstile, Rules/Ruleset Engine, firewall, client-side security.
- `cloudflare-networking` — DNS, SSL/TLS, cache, load balancing, Magic Transit, Spectrum, registrar, networking products.
- `cloudflare-observability-admin` — Analytics, Logs/Logpush, Radar, billing, support, fundamentals, Terraform/Pulumi, learning paths.

## Routing Rules

- MUST use a focused Cloudflare skill when the product family is known.
- Use this skill only for triage, broad cross-product questions, or top-level docs lookup.
- Search `references/directory.md` or `references/index.md` only when product routing is unclear.
