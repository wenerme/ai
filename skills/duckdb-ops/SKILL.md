---
name: duckdb-ops
description: Use when deploying, operating, securing, sizing, logging, containerizing, or managing DuckDB in production or mission-critical environments.
---

# DuckDB Operations Manual

This skill mirrors DuckDB current operations-manual documentation.

CRITICAL: Search `references/operations_manual/` before giving production deployment, Docker, security, logging, filesystem-footprint, limit, or user-agent guidance.

## Scope

- `references/operations_manual/duckdb_docker.md` and `installing_duckdb/` - container and installation operations.
- `references/operations_manual/securing_duckdb/` - embedding and extension-security guidance.
- `references/operations_manual/footprint_of_duckdb/` - generated files, Git ignore rules, and reclaiming space.
- `references/operations_manual/logging/`, `limits.md`, `user_agents.md`, and `non-deterministic_behavior.md` - observability and runtime behavior.

## Search

```bash
rg -n "Docker|security|extension|logging|limit|footprint|Gitignore|user agent" references/operations_manual
```

Official source: `https://github.com/duckdb/duckdb-web/tree/main/docs/current/operations_manual`.
