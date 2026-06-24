---
name: cloudflare-observability-admin
description: "Use when working with Cloudflare observability and account administration: Analytics, Logs, Logpush, Log Explorer, Radar, notifications, billing, support, Terraform/Pulumi, fundamentals, learning paths, reference architectures, account resources, or admin docs."
---

# Cloudflare Observability and Admin Docs

Official Cloudflare developer docs fetched from [developers.cloudflare.com](https://developers.cloudflare.com), focused on analytics, logging, operations, account administration, IaC, and general docs.

## Hard Rules

- MUST search `references/` before giving Logpush, analytics, billing, Terraform/Pulumi, account resource, or support guidance.
- MUST distinguish observability/admin docs from product-specific runtime/security/networking docs; route to focused skills when the product family is known.
- NEVER invent dataset names, Logpush destination config, analytics API fields, Terraform resource names, or billing/support behavior.

## Fast Lookup

```bash
rg -n "Logpush|Logs|Analytics|Radar|dataset|Log Explorer" skills/cloudflare-observability-admin/references
rg -n "Terraform|Pulumi|account|resource|billing|support" skills/cloudflare-observability-admin/references
rg -n "learning path|reference architecture|migration|fundamentals" skills/cloudflare-observability-admin/references
```

## Reference Map

- `references/analytics/`, `logs/`, `log-explorer.md`, `radar/` — observability products.
- `references/billing/`, `support/`, `notifications/` — account administration.
- `references/terraform/`, `pulumi/` — infrastructure as code.
- `references/fundamentals/`, `learning-paths/`, `reference-architecture/` — general docs and guidance.
- `references/use-cases/`, `migration-guides/`, `data-localization/` — cross-product guidance.
