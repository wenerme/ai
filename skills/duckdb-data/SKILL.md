---
name: duckdb-data
description: Use when importing, exporting, reading, writing, or bulk-loading CSV, JSON, Parquet, Iceberg, or other data in DuckDB.
---

# DuckDB Data I/O

This skill mirrors DuckDB current documentation for data loading, file formats, appender APIs, and data sources.

CRITICAL: Search `references/data/` before giving file-format options, ingestion, export, scanning, or bulk-load advice. Syntax and defaults can differ across formats and releases.

## Scope

- `references/data/overview.md` - loading methods and file-format entry points.
- `references/data/csv/`, `json/`, and `parquet/` - format-specific reading, writing, metadata, and options.
- Top-level `references/data/*.md` - `INSERT`, appender APIs, data sources, and related data operations.

## Search

```bash
rg -n "read_csv|read_json|read_parquet|COPY|Appender|compression|schema|partition" references/data
```

Official source: `https://github.com/duckdb/duckdb-web/tree/main/docs/current/data`.
