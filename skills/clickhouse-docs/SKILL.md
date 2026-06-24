---
name: clickhouse-docs
description: "Use when working with ClickHouse: MergeTree engine family, SQL syntax, data types, table functions, materialized views, dictionaries, data modeling (denormalization, sharding, replication), integrations (Kafka, S3, PostgreSQL, MySQL), ClickHouse Cloud, Kubernetes operator, data compression, query optimization, or troubleshooting ClickHouse issues."
---

# ClickHouse Documentation

Official ClickHouse docs (sourced from [github.com/ClickHouse/clickhouse-docs](https://github.com/ClickHouse/clickhouse-docs)).

CRITICAL: grep `references/` for keywords before answering.

## Topic Index

### Getting Started
- `docs/getting-started/` — Installation, quick start
- `docs/intro.md`, `docs/tutorial.md` — Introduction, tutorial

### Concepts & Data Modeling
- `docs/concepts/` — Core concepts
- `docs/data-modeling/` — Schema design, denormalization, sharding, replication
- `docs/data-compression/` — Compression codecs and optimization

### SQL & Engine Reference
- `docs/guides/` — SQL reference, table engines, MergeTree family, data types, functions
- `docs/dictionary/` — External dictionaries
- `docs/materialized-view/` — Materialized views

### Data Management
- `docs/managing-data/` — Insert, update, delete, migrations, TTL

### Integrations
- `docs/integrations/` — Kafka, S3, PostgreSQL, MySQL, ClickPipes, language clients, visualization tools (Grafana, Superset, Metabase)

### Operations
- `docs/operations_/` — Configuration, monitoring, access control, backup, scaling
- `docs/deployment-guides/` — Self-managed deployment
- `docs/kubernetes-operator/` — K8s operator

### Cloud
- `docs/cloud/` — ClickHouse Cloud: setup, security, billing, migrations

### Advanced
- `docs/best-practices/` — Best practices
- `docs/use-cases/` — Analytics, observability, time series
- `docs/native-protocol/` — Native binary protocol
- `docs/chdb/` — chDB (embedded ClickHouse)
- `docs/tools-and-utilities/` — clickhouse-client, clickhouse-local, clickhouse-benchmark

### Troubleshooting & FAQ
- `docs/troubleshooting/` — Common issues
- `docs/faq/` — Frequently asked questions
- `knowledgebase/` — 118 community knowledge base articles
