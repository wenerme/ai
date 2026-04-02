---
name: cloudflare-docs
description: "USE THIS SKILL WHEN working with Cloudflare: Workers, Pages, D1, R2, KV, Durable Objects, Queues, Vectorize, Hyperdrive, AI Gateway, Workers AI, Cloudflare Tunnel, Zero Trust, WAF, DNS, SSL/TLS, Load Balancing, CDN/Cache, Stream, Images, Turnstile, Terraform provider, Pulumi, Email Routing, or any Cloudflare developer product."
---

# Cloudflare Developer Documentation

Official Cloudflare developer docs fetched from [developers.cloudflare.com](https://developers.cloudflare.com).

## URL ↔ File Path Mapping

```
URL:  https://developers.cloudflare.com/workers/runtime-apis/fetch/
File: references/workers/runtime-apis/fetch.md

URL:  https://developers.cloudflare.com/d1/
File: references/d1.md

URL:  https://developers.cloudflare.com/
File: references/index.md
```

**Rule**: strip `https://developers.cloudflare.com`, drop trailing `/`, append `.md`. Subdirectories map to nested file paths.

CRITICAL: grep `references/` for keywords before answering.

## Topic Index

### Compute & Serverless
- `workers/` — Workers runtime, APIs, configuration, Wrangler CLI, bindings
- `pages/` — Cloudflare Pages, framework guides, build config, functions
- `durable-objects/` — Durable Objects (stateful serverless), storage API, alarms
- `workflows/` — Workflows (durable execution engine)
- `containers/` — Container support on Workers
- `browser-rendering/` — Headless browser rendering

### Storage & Databases
- `d1/` — D1 serverless SQL database
- `r2/` — R2 object storage (S3-compatible)
- `kv/` — Workers KV (key-value store)
- `queues/` — Cloudflare Queues (message queues)
- `vectorize/` — Vectorize (vector database)
- `hyperdrive/` — Hyperdrive (database connection pooling/caching)
- `pipelines/` — Data pipelines

### AI & ML
- `workers-ai/` — Workers AI (inference API)
- `ai-gateway/` — AI Gateway (proxy, caching, rate limiting for AI APIs)
- `ai-search/` — AI Search
- `ai-crawl-control/` — AI crawl control (robots.txt for AI)

### Networking & Security
- `cloudflare-one/` — Cloudflare Zero Trust (Access, Gateway, WARP, Tunnel)
- `waf/` — Web Application Firewall
- `ddos-protection/` — DDoS protection
- `ssl/` — SSL/TLS certificates and encryption
- `dns/` — DNS management
- `load-balancing/` — Load Balancing
- `tunnel/` — Cloudflare Tunnel (Argo Tunnel)
- `spectrum/` — Spectrum (TCP/UDP proxy)
- `magic-transit/` — Magic Transit (network-layer DDoS)
- `turnstile/` — Turnstile (CAPTCHA alternative)
- `firewall/` — Firewall rules
- `rules/` — Transform Rules, redirect rules, etc.
- `warp-client/` — WARP client

### Content Delivery & Optimization
- `cache/` — CDN cache configuration
- `speed/` — Speed optimizations
- `images/` — Cloudflare Images (transform, deliver)
- `stream/` — Cloudflare Stream (video)
- `zaraz/` — Zaraz (third-party tool manager)
- `web-analytics/` — Web Analytics

### Platform & Infrastructure
- `fundamentals/` — Account setup, API tokens, dashboard basics
- `registrar/` — Domain registration
- `email-routing/` — Email Routing
- `notifications/` — Notification system
- `logs/` — Logpush, Logpull
- `terraform/` — Terraform provider
- `pulumi/` — Pulumi provider
- `analytics/` — Analytics

### Reference
- `reference-architecture/` — Reference architectures
- `learning-paths/` — Learning paths / tutorials
- `glossary.md` — Cloudflare glossary
