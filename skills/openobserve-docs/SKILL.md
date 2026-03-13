---
name: openobserve-docs
description: >-
  OpenObserve documentation — open-source observability platform for logs, metrics, traces, and RUM.
  Covers architecture, deployment, ingestion (OTLP, Fluent Bit, Vector, syslog), SQL functions,
  alerts, dashboards, pipelines, RBAC, API reference, and 50+ integrations (AWS, GCP, K8s, databases).
  USE THIS SKILL WHEN the user asks about OpenObserve setup, configuration, querying, alerting,
  or integration with observability pipelines.
version: 0.1.0
---

# OpenObserve Documentation

Official docs for [OpenObserve](https://github.com/openobserve/openobserve) — a cloud-native observability platform (logs, metrics, traces, RUM) built in Rust.

## Key Concepts

- **Streams**: Log, metric, and trace data streams with configurable schema, retention, and indexing
- **Pipelines**: Real-time and scheduled data transformation pipelines
- **Functions**: VRL (Vector Remap Language) and Lua functions for data enrichment
- **Alerts**: Condition-based alerts with multi-window selectors and various destinations
- **Dashboards**: Panels with SQL/PromQL queries, variables, custom charts (ECharts)

## Reference Index (311 docs)

### Architecture & Operations
- `references/architecture.md` — System architecture
- `references/ha_deployment.md` — High-availability deployment
- `references/environment-variables.md` — All configuration env vars
- `references/capacity-planning.md` — Sizing guide
- `references/operator-guide/` — etcd, nginx proxy, Grafana plugin, systemd, SIMD, mimalloc

### Getting Started
- `references/quickstart.md` — Quick start guide
- `references/getting-started.md` — Detailed getting started
- `references/overview/` — Comparison, guiding principles

### Ingestion (22 docs)
- `references/ingestion/logs/` — curl, Fluent Bit, Fluentd, Filebeat, Vector, OTLP, syslog, Python, Go, Kinesis
- `references/ingestion/metrics/` — Prometheus, Telegraf
- `references/ingestion/traces/` — OpenTelemetry, Go, Node.js, Python, Rust, TypeScript

### Integrations (56 docs)
- `references/integration/aws/` — ALB, API Gateway, CloudWatch, EC2, ECS, Lambda, RDS, S3, WAF, VPC Flow
- `references/integration/gcp/` — Cloud Run, GCP Logs
- `references/integration/database/` — PostgreSQL, MySQL, MongoDB, Redis, Cassandra, DynamoDB, Snowflake
- `references/integration/k8s.md` — Kubernetes
- `references/integration/message-brokers/` — Kafka, NATS, RabbitMQ
- `references/integration/mcp/` — MCP integration with Claude

### User Guide (139 docs)
- `references/user-guide/logs/` — Log search, quick mode, search around, insights
- `references/user-guide/dashboards/` — Panels, variables, custom charts, filters, trellis layout
- `references/user-guide/alerts/` — Conditions, history, multi-window selectors, Telegram
- `references/user-guide/pipelines/` — Real-time & scheduled pipelines, import/export
- `references/user-guide/streams/` — Schema, retention, summary streams, distinct values
- `references/user-guide/functions/` — VRL/Lua functions
- `references/user-guide/identity-and-access-management/` — RBAC, SSO, organizations, quotas
- `references/user-guide/rum/` — Real User Monitoring setup, session replay, error tracking
- `references/user-guide/management/` — Audit trail, cipher keys, query management, sensitive data redaction

### API Reference (37 docs)
- `references/api/` — REST API for ingestion (logs/metrics/traces), search, streams, users, functions

### SQL Functions (8 docs)
- `references/sql-functions/` — Aggregate, array, full-text search, secondary index, approximate aggregate

### Storage & Performance
- `references/storage-management/` — S3/object storage, multiple storage accounts
- `references/user-guide/performance/` — Disk cache, result cache, Tantivy index, broadcast join

### CLI & Operator
- `references/o2-cli/` — OpenObserve CLI
- `references/o2-k8s-operator/` — Kubernetes operator deployment and features
