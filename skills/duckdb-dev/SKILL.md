---
name: duckdb-dev
description: Use when building DuckDB from source, configuring builds, profiling, benchmarking, release work, or writing and debugging sqllogictests.
---

# DuckDB Development

This skill mirrors DuckDB current developer documentation for source builds, development diagnostics, release practices, and SQL logic tests.

CRITICAL: Search `references/dev/` before giving build flags, platform instructions, benchmark/profiling guidance, release process advice, or sqllogictest rules.

## Scope

- `references/dev/building/` - supported platforms, build configuration, extension builds, and troubleshooting.
- `references/dev/sqllogictest/` - test syntax, result verification, loops, debugging, and multiple connections.
- Top-level `references/dev/*.md` - benchmarks, metrics, profiling, repositories, release cycle, and internal errors.

## Search

```bash
rg -n "build configuration|extension|CMake|benchmark|profiling|sqllogictest|release|internal error" references/dev
```

Official source: `https://github.com/duckdb/duckdb-web/tree/main/docs/current/dev`.
