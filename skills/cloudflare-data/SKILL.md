---
name: cloudflare-data
description: "Use when working with Cloudflare data and storage products: D1, R2, R2 SQL, KV, Queues, Hyperdrive, Vectorize, Pipelines, Artifacts, Secrets Store, bindings, limits, migrations, SQL, object storage, or data pipeline troubleshooting."
---

# Cloudflare Data Docs

Official Cloudflare developer docs fetched from [developers.cloudflare.com](https://developers.cloudflare.com), focused on Cloudflare data, storage, queueing, and vector products.

## Hard Rules

- MUST search `references/` before giving limits, pricing-sensitive behavior, Wrangler binding config, migration, or API details.
- MUST distinguish runtime/platform guidance from product-specific data APIs; use `cloudflare-workers` for Workers runtime questions.
- NEVER invent SQL support, consistency semantics, object storage behavior, queue delivery guarantees, or vector index configuration.

## Fast Lookup

```bash
rg -n "binding|wrangler|limit|pricing|migration" skills/cloudflare-data/references
rg -n "D1|SQL|database|migration" skills/cloudflare-data/references
rg -n "R2|bucket|object|KV|Queue|Hyperdrive|Vectorize|Pipelines" skills/cloudflare-data/references
```

## Reference Map

- `references/d1/` — D1 serverless SQL database.
- `references/r2/` and `references/r2-sql/` — R2 object storage and SQL.
- `references/kv/` — Workers KV.
- `references/queues/` — Queues.
- `references/hyperdrive/` — Hyperdrive database acceleration.
- `references/vectorize/` — Vectorize indexes.
- `references/pipelines/` — Pipelines.
- `references/artifacts/` — Artifacts docs.
- `references/secrets-store/` — Secrets Store.
