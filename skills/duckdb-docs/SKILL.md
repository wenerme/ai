---
name: duckdb-docs
description: Use when working with DuckDB current documentation for connections, configuration, guides, performance, integration, or storage internals.
---

# DuckDB Current Documentation

Use this skill for the general DuckDB documentation not owned by a more focused DuckDB skill. It mirrors the official `docs/current` tree from `duckdb/duckdb-web`.

CRITICAL: Search `references/` before answering DuckDB configuration, connection, performance, integration, or storage-internal questions. Current documentation can change between releases.

## Scope

- `references/configuration/` - configuration options, pragmas, and secrets management.
- `references/connect/` - embedded, persistent, and concurrent connection behavior.
- `references/guides/` - file formats, cloud storage, database integrations, Python workflows, SQL features, and performance guidance.
- `references/internals/` - storage, vectorized execution, allocators, and pivot internals.
- `references/index.md` and `references/lakehouse_formats.md` - documentation entry point and Lakehouse format overview.

For SQL syntax and functions use `duckdb-sql`; for client APIs use `duckdb-clients`; for importing data use `duckdb-data`; for extension behavior use `duckdb-extensions`; for build and test work use `duckdb-dev`; for deployment use `duckdb-ops`; and for the Quack protocol use `duckdb-quack`.

## Search

```bash
rg -n "secret|pragma|configuration|concurrency|performance|S3|Postgres|storage|vector" references/
```

Official source: `https://github.com/duckdb/duckdb-web/tree/main/docs/current`.
