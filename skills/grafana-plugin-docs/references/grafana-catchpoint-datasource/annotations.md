---
title: "Catchpoint annotations | Grafana Enterprise Plugins documentation"
description: "Use the Catchpoint data source to add annotations to Grafana dashboards."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Catchpoint annotations

The Catchpoint data source supports annotations, which let you overlay events from Catchpoint data onto your dashboard panels. Annotations mark points in time so you can correlate test failures or performance changes with other metrics.

The data source doesn’t define a dedicated annotation query type, so annotations use the standard Catchpoint query types described in the [query editor](/docs/plugins/grafana-catchpoint-datasource/latest/query-editor/).

## Before you begin

- [Configure the Catchpoint data source](/docs/plugins/grafana-catchpoint-datasource/latest/configure/).
- Understand [Grafana annotations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Add an annotation query

To add an annotation query that uses Catchpoint data:

1. Navigate to **Dashboard settings** &gt; **Annotations**.
2. Click **Add annotation query**.
3. Select the **Catchpoint** data source.
4. Build a query with the [query editor](/docs/plugins/grafana-catchpoint-datasource/latest/query-editor/) that returns the time-based events you want to mark.
5. Save the dashboard.

Grafana renders the returned events as annotation markers on panels that share the dashboard time range.

## Next steps

- [Alerting](/docs/plugins/grafana-catchpoint-datasource/latest/alerting/)
- [Troubleshooting](/docs/plugins/grafana-catchpoint-datasource/latest/troubleshooting/)
