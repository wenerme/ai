---
name: duckdb-sql
description: Use when writing, debugging, optimizing, or checking DuckDB SQL syntax, statements, functions, data types, dialect, or query semantics.
---

# DuckDB SQL Reference

This skill mirrors DuckDB current SQL documentation.

CRITICAL: Search `references/sql/` before giving DuckDB SQL syntax, function signatures, type semantics, statement options, dialect compatibility, or query-planning guidance. Do not infer function names or argument behavior from other SQL engines.

## Scope

- `references/sql/query_syntax/` - `SELECT`, joins, CTEs, windowing, `FROM`, `QUALIFY`, sampling, and related syntax.
- `references/sql/statements/` - DDL, DML, `COPY`, secrets, extension commands, transactions, and maintenance statements.
- `references/sql/functions/` - scalar, aggregate, window, utility, and table-function references.
- `references/sql/data_types/` and `references/sql/dialect/` - type behavior, identifiers, and compatibility rules.

## Search

```bash
rg -n "SELECT|JOIN|COPY|CREATE|function|aggregate|window|type|cast|PostgreSQL" references/sql
```

Official source: `https://github.com/duckdb/duckdb-web/tree/main/docs/current/sql`.
