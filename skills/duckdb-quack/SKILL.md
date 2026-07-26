---
name: duckdb-quack
description: Use when deploying, connecting to, securing, configuring, or troubleshooting DuckDB Quack remote protocol servers and clients.
---

# DuckDB Quack Remote Protocol

This skill mirrors DuckDB current documentation for the Quack remote protocol.

CRITICAL: Search `references/quack/` before giving Quack connection, authentication, TLS, reverse-proxy, deployment, configuration, or troubleshooting guidance. Quack is under active development and its protocol surface may change.

## Scope

- `references/quack/overview.md` - protocol model, server/client usage, URI format, and connection caching.
- `references/quack/reference.md` - functions, settings, and logging controls.
- `references/quack/security.md` and `references/quack/setup/` - tokens, authorization, TLS, reverse proxy, Wasm, and deployment.
- `references/quack/troubleshooting.md` - diagnosis guidance.

## Search

```bash
rg -n "quack_serve|ATTACH|token|TLS|reverse proxy|authorization|logging|timeout" references/quack
```

Official source: `https://github.com/duckdb/duckdb-web/tree/main/docs/current/quack`.
