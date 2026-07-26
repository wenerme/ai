---
name: duckdb-extensions
description: Use when installing, loading, configuring, developing, or troubleshooting DuckDB core and community extensions.
---

# DuckDB Extensions

This skill combines DuckDB's extension mechanism documentation with the official core extension catalog, because installation, loading, versioning, and capabilities are one user workflow.

CRITICAL: Search `references/` before giving `INSTALL`, `LOAD`, autoloading, repository, signature, versioning, or extension-specific guidance. Extension availability depends on platform and DuckDB release.

## Scope

- `references/extensions/` - installation, loading, autoloading, repositories, distribution, signing, advanced installation, and versioning.
- `references/core_extensions/` - official extension catalog and the HTTPFS, Iceberg, Postgres, spatial, Azure, AWS, and other core-extension references.

## Search

```bash
rg -n "INSTALL|LOAD|autoload|repository|signature|version|httpfs|iceberg|postgres|spatial" references/
```

Official source: `https://github.com/duckdb/duckdb-web/tree/main/docs/current`.
