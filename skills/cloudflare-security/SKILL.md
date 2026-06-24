---
name: cloudflare-security
description: "Use when working with Cloudflare security products: WAF, DDoS protection, Bot Management, API Shield, Turnstile, Rules, Ruleset Engine, firewall rules, network firewall, client-side security, challenges, DMARC, or security troubleshooting."
---

# Cloudflare Security Docs

Official Cloudflare developer docs fetched from [developers.cloudflare.com](https://developers.cloudflare.com), focused on security, rules, bot protection, and application/network defense.

## Hard Rules

- MUST search `references/` before giving ruleset, WAF, DDoS, Bot, Turnstile, API Shield, or firewall syntax and behavior.
- MUST distinguish security rules from caching/routing/networking behavior; use `cloudflare-networking` for DNS/TLS/cache/load-balancing.
- NEVER invent expression syntax, phase names, ruleset IDs, challenge behavior, bot score meanings, or WAF managed rule behavior.

## Fast Lookup

```bash
rg -n "WAF|DDoS|Bot|Turnstile|API Shield|challenge" skills/cloudflare-security/references
rg -n "Ruleset Engine|ruleset|phase|expression|firewall" skills/cloudflare-security/references
rg -n "client-side security|DMARC|security center" skills/cloudflare-security/references
```

## Reference Map

- `references/waf/` — Web Application Firewall.
- `references/ddos-protection/` — DDoS protection.
- `references/bots/` — Bot products.
- `references/api-shield/` — API Shield.
- `references/turnstile/` — Turnstile.
- `references/rules/` and `references/ruleset-engine/` — Rules and Ruleset Engine.
- `references/firewall/` and `references/cloudflare-network-firewall/` — firewall products.
- `references/client-side-security/`, `security-center/`, `security/` — additional security docs.
