---
name: duckdb-clients
description: Use when integrating DuckDB through C, CLI, C++, Go, Java, Node.js, ODBC, Python, R, Rust, WebAssembly, ADBC, or tertiary client APIs.
---

# DuckDB Client APIs

This skill mirrors the official DuckDB current client API documentation.

CRITICAL: Search `references/clients/` before giving DuckDB client setup, connection, API, binding, configuration, or compatibility guidance. Client behavior and support tiers vary by language and release.

## Scope

- `references/clients/overview.md` - client support tiers and compatibility.
- `references/clients/c/`, `cli/`, `node_neo/`, `odbc/`, `python/`, and `wasm/` - maintained client-specific guides and references.
- Top-level `references/clients/*.md` - C++, Go, Java/JDBC, R, Rust, ADBC, and other client pages.
- `references/clients/tertiary_clients/` - community-maintained client integrations.

## Search

```bash
rg -n "connect|install|API|Appender|prepared statement|Arrow|DataFrame|Wasm|ODBC" references/clients
```

Official source: `https://github.com/duckdb/duckdb-web/tree/main/docs/current/clients`.
