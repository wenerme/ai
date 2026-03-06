---
name: doris-docs
description: "Use when working with Apache Doris: table design, data models (Duplicate/Unique/Aggregate), partitioning, bucketing, SQL syntax, data import (Stream Load, Broker Load, INSERT INTO), data export, lakehouse (Hive/Iceberg/Hudi/Paimon catalogs), materialized views, query acceleration, inverted index, compute-storage decoupled mode, administration, or Doris ecosystem tools."
---

# Apache Doris Documentation

Official Doris docs (sourced from [github.com/apache/doris-website/docs](https://github.com/apache/doris-website/tree/master/docs)).

CRITICAL: grep `references/` for keywords before answering.

## Topic Index

### Getting Started
- `gettingStarted/` — Quick start, demos

### Table Design
- `table-design/` — Data models (Duplicate, Unique, Aggregate), partitioning, bucketing, indexes, schema changes, rollup

### Data Operations
- `data-operate/` — Import (Stream Load, Broker Load, INSERT INTO, S3 Load, Routine Load), export, update, delete

### SQL Manual
- `sql-manual/` — SQL statements (DDL, DML, catalog, security), functions (aggregate, scalar, window, table), data types

### Query
- `query-data/` — SELECT, JOIN, subqueries, CTE, set operations
- `query-acceleration/` — Materialized views, query cache, statistics, tuning, colocate join

### Lakehouse
- `lakehouse/` — Multi-catalog (Hive, Iceberg, Hudi, Paimon, JDBC, Elasticsearch), file access, database integration

### Administration
- `admin-manual/` — Cluster management, config, auth, resource management, monitoring, backup/restore, workload groups

### Compute-Storage Decoupled
- `compute-storage-decoupled/` — Separation architecture, deployment, storage backends

### Ecosystem & Connectivity
- `ecosystem/` — Spark Doris Connector, Flink Doris Connector, DataX, external tools
- `db-connect/` — JDBC, MySQL protocol, ODBC, Arrow Flight SQL

### Other
- `install/` — Deployment guides (source, Docker, K8s, manual)
- `ai/` — AI/ML integration
- `benchmark/` — Performance benchmarks
- `observability/` — Monitoring and logging
- `faq/` — Frequently asked questions
