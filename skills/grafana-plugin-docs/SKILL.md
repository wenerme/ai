---
name: grafana-plugin-docs
description: "Use when working with Grafana plugins and plugin-specific docs, including data source/app/panel plugins such as Infinity, CloudWatch, ClickHouse, Zabbix, GitHub, GitLab, Jira, ServiceNow, MongoDB, OpenSearch, Volkov Labs panels, plugin configuration, query editors, variables, annotations, alerting, provisioning, or troubleshooting."
---

# Grafana Plugin Docs

Grafana plugin documentation fetched from `https://grafana.com/llms-full.txt`, `https://grafana.com/docs/plugins.md`, and plugin Markdown pages under [`https://grafana.com/docs/plugins/`](https://grafana.com/docs/plugins/).

Use this skill for plugin-specific Grafana questions. For core Grafana dashboards, panels, alerting, data sources, provisioning, RBAC, or Grafana server behavior, use `grafana-docs` first.

## Coverage

This skill discovers all plugin docs exposed through Grafana's `llms-full.txt` plugin links and the `docs/plugins.md` plugin index. It stores pages under `references/<plugin-id>/`:

- `references/<plugin-id>/index.md` — plugin overview (`/latest.md` preferred over root alias).
- `references/<plugin-id>/*.md` — plugin subpages such as configure, query editor, variables, annotations, alerting, examples, or troubleshooting.
- `references/index.md` — Grafana plugin index page.

## Hard Rules

- MUST search `references/` before giving plugin-specific configuration, query editor, authentication, provisioning, variable, annotation, alerting, or troubleshooting guidance.
- MUST distinguish plugin-specific behavior from core Grafana behavior; use `grafana-docs` for core concepts and this skill for plugin pages.
- MUST name the plugin ID or human plugin name when answering, especially when docs differ across plugins.
- NEVER invent plugin query syntax, auth modes, backend capabilities, alerting support, variable behavior, provisioning fields, or known limitations without checking references.

## Fast Lookup

```bash
rg -n "Infinity|yesoreyeram-infinity|UQL|JSONata|JQ|backend parser" skills/grafana-plugin-docs/references
rg -n "CloudWatch|ClickHouse|Zabbix|GitHub|GitLab|Jira|ServiceNow|MongoDB|OpenSearch" skills/grafana-plugin-docs/references
rg -n "configure|authentication|provision|query editor|template variable|annotation|alerting|troubleshooting" skills/grafana-plugin-docs/references/<plugin-id>
find skills/grafana-plugin-docs/references -maxdepth 1 -type d | sort
```

## Reference Map

- `references/yesoreyeram-infinity-datasource/` — Infinity data source docs: JSON/CSV/XML/GraphQL, UQL, JSONata, JQ, backend parser, auth, variables, annotations, examples.
- `references/cloudwatch/` — Amazon CloudWatch data source docs.
- `references/grafana-clickhouse-datasource/` — ClickHouse data source docs.
- `references/alexanderzobnin-zabbix-app/` — Zabbix app/plugin docs.
- `references/volkovlabs-*/` — Volkov Labs panel/data source plugin docs.
- `references/grafana-*-datasource/` and `references/*-app/` — Grafana Labs plugin docs by plugin ID.

## Workflow

1. Identify the plugin name or plugin ID from the user's question.
2. Search the plugin directory first; if unknown, search all references for the plugin's human name.
3. Check both overview and relevant subpage: configure, query editor, variables, annotations, examples, alerting, or troubleshooting.
4. If the answer depends on core Grafana semantics, cross-check `grafana-docs` before responding.
