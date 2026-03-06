---
name: grafana-docs
description: "Use when working with Grafana: dashboards, panels, visualizations, alerting, data sources (Prometheus, Loki, Elasticsearch, InfluxDB, MySQL, PostgreSQL, CloudWatch, Azure Monitor), provisioning, as-code (Terraform, Ansible, Grafana Operator), RBAC, SSO/SAML/LDAP, plugins, API, or Grafana setup and administration."
---

# Grafana Documentation

Official Grafana docs (sourced from [github.com/grafana/grafana/docs/sources](https://github.com/grafana/grafana/tree/main/docs/sources)).

CRITICAL: grep `references/` for keywords before answering.

## Topic Index

### Core Concepts
- `fundamentals/` — Architecture, timeseries, exemplars, annotations
- `introduction/` — Getting started

### Setup & Administration
- `setup-grafana/` — Installation, configuration, Docker, Kubernetes, upgrade
- `administration/` — RBAC, SSO, SAML, LDAP, OAuth, API keys, orgs, teams, service accounts
- `upgrade-guide/` — Version upgrade guides

### Dashboards & Visualizations
- `visualizations/` — Panels: time series, bar chart, stat, gauge, table, heatmap, geomap, logs, traces, canvas, etc.

### Alerting
- `alerting/` — Alert rules, contact points, notification policies, silences, Alertmanager

### Data Sources
- `datasources/prometheus/` — Prometheus
- `datasources/loki/` — Loki
- `datasources/elasticsearch/` — Elasticsearch
- `datasources/influxdb/` — InfluxDB
- `datasources/mysql/`, `datasources/postgres/`, `datasources/mssql/` — SQL databases
- `datasources/aws-cloudwatch/` — AWS CloudWatch
- `datasources/azure-monitor/` — Azure Monitor
- `datasources/google-cloud-monitoring/` — Google Cloud Monitoring
- `datasources/tempo/`, `datasources/jaeger/`, `datasources/zipkin/` — Tracing
- `datasources/graphite/`, `datasources/opentsdb/` — TSDB
- `datasources/pyroscope/`, `datasources/parca.md` — Profiling

### As-Code & Provisioning
- `as-code/` — Terraform, Ansible, Grafana Operator, file provisioning, dashboards/datasources as code

### Developer Resources
- `developer-resources/` — HTTP API, plugin development, SDK

### Tutorials & Troubleshooting
- `tutorials/` — Step-by-step guides
- `troubleshooting/` — Common issues and diagnostics
