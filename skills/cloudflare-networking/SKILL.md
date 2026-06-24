---
name: cloudflare-networking
description: "Use when working with Cloudflare networking products: DNS, SSL/TLS, cache, load balancing, Magic Transit, Spectrum, BYOIP, network flow, interconnect, registrar, Web3, email routing/service, health checks, waiting room, or traffic routing."
---

# Cloudflare Networking Docs

Official Cloudflare developer docs fetched from [developers.cloudflare.com](https://developers.cloudflare.com), focused on DNS, TLS, caching, traffic routing, and network products.

## Hard Rules

- MUST search `references/` before giving DNS record, SSL/TLS mode, cache rule, load balancing, Spectrum, Magic Transit, or registrar guidance.
- MUST distinguish networking/routing behavior from security rules; use `cloudflare-security` for WAF/firewall/ruleset security specifics.
- NEVER invent DNS settings, TLS modes, cache semantics, load balancer steering policies, or Magic Transit/Spectrum configuration.

## Fast Lookup

```bash
rg -n "DNS|SSL|TLS|cache|load balancing|health check" skills/cloudflare-networking/references
rg -n "Magic Transit|Spectrum|BYOIP|interconnect|network flow" skills/cloudflare-networking/references
rg -n "registrar|email|Web3|waiting room|routing" skills/cloudflare-networking/references
```

## Reference Map

- `references/dns/` — DNS.
- `references/ssl/` — SSL/TLS.
- `references/cache/` — cache docs.
- `references/load-balancing/` and `health-checks.md` — load balancing and health checks.
- `references/magic-transit/`, `spectrum/`, `byoip/` — network products.
- `references/network-flow/`, `network-interconnect/`, `multi-cloud-networking/` — network docs.
- `references/registrar/`, `web3/`, `email-service/` — adjacent products.
