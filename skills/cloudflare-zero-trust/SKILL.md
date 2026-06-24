---
name: cloudflare-zero-trust
description: "Use when working with Cloudflare Zero Trust: Cloudflare One, Access, Gateway, WARP, Tunnel, device posture, DEX, CASB, Magic WAN/Cloudflare WAN, Zero Trust networking, 1.1.1.1, privacy proxy, or secure access troubleshooting."
---

# Cloudflare Zero Trust Docs

Official Cloudflare developer docs fetched from [developers.cloudflare.com](https://developers.cloudflare.com), focused on Cloudflare One and Zero Trust products.

## Hard Rules

- MUST search `references/` before giving Access/Gateway/WARP/Tunnel policy, identity, posture, routing, or connector guidance.
- MUST distinguish Zero Trust routing/security policy from DNS/networking product docs; use `cloudflare-networking` for DNS/TLS/load-balancing specifics.
- NEVER invent policy selectors, device posture checks, WARP modes, Tunnel config keys, or Gateway behavior.

## Fast Lookup

```bash
rg -n "Access|Gateway|WARP|Tunnel|device posture|DEX|CASB" skills/cloudflare-zero-trust/references
rg -n "policy|identity|IdP|SAML|OIDC|private network|split tunnel" skills/cloudflare-zero-trust/references
rg -n "1.1.1.1|privacy proxy|Cloudflare One|WAN" skills/cloudflare-zero-trust/references
```

## Reference Map

- `references/cloudflare-one/` — Cloudflare One / Zero Trust.
- `references/warp-client/` — WARP client docs.
- `references/tunnel/` — Cloudflare Tunnel.
- `references/cloudflare-wan/` — Cloudflare WAN docs.
- `references/1.1.1.1/` — 1.1.1.1 resolver docs.
- `references/privacy-proxy/` and `references/privacy-gateway/` — privacy products.
