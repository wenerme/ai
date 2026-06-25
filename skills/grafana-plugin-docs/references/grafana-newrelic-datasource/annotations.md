---
title: "New Relic annotations | Grafana Enterprise Plugins documentation"
description: "Add annotations to Grafana dashboards using New Relic data."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# New Relic annotations

Annotations overlay event markers on your Grafana dashboard graphs, helping you correlate changes and incidents with metric data. The New Relic data source supports three annotation query types: Deployments, Alerts, and Insights.

## Before you begin

- [Configure the New Relic data source](/docs/plugins/grafana-newrelic-datasource/latest/configure/).
- Familiarize yourself with [Grafana annotations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Create an annotation query

To add a New Relic annotation to your dashboard:

1. Navigate to your dashboard and click **Dashboard settings** (gear icon).
2. Click **Annotations** in the left-side menu.
3. Click **Add annotation query**.
4. Select the **New Relic** data source.
5. Choose a **Query Type** and configure the fields.
6. Click **Apply**.

## Query types

The annotation editor supports the following query types.

### Deployments

The Deployments query type overlays application deployment markers on your graphs.

Expand table

| Field              | Description                                                                        |
|--------------------|------------------------------------------------------------------------------------|
| **Application ID** | The New Relic application ID. You can use a template variable, for example `$app`. |

### Alerts

The Alerts query type overlays New Relic alert events on your graphs. You can filter by product, event type, entity type, and entity ID.

Expand table

| Field           | Description                                                                                                                                                     |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Product**     | *(Optional)* Filter by New Relic product. Options: `APM`, `BROWSER`, `MOBILE`, `SERVERS`, `PLUGINS`, `SYNTHETICS`, `ALERTS`.                                    |
| **Event Type**  | *(Optional)* Filter by alert event type. Options: `NOTIFICATION`, `DEPLOYMENT`, `VIOLATION_OPEN`, `VIOLATION_CLOSE`, `VIOLATION`, `INSTRUMENTATION`.            |
| **Entity Type** | *(Optional)* Filter by entity type. Options: `Application`, `Server`, `KeyTransaction`, `Plugin`, `MobileApplication`, `BrowserApplication`, `Monitor`, `Host`. |
| **Entity ID**   | *(Optional)* Filter by a specific entity ID. You can use a template variable, for example `$app` or `$server`.                                                  |

### Insights

The Insights query type lets you use a raw NRQL query to generate annotation events. This provides the most flexibility for custom annotation data.

Enter your NRQL query in the query editor. The `$__timeFilter` macro is supported.

Mark a deployment event:

SQL [Copy code to clipboard] Copy

```sql
SELECT timestamp, description FROM NrAuditEvent WHERE actionIdentifier = 'dashboard.update' $__timeFilter
```

Annotate application error spikes:

SQL [Copy code to clipboard] Copy

```sql
SELECT count(*) FROM TransactionError WHERE appName = 'my-app' $__timeFilter TIMESERIES
```

Show Synthetics monitor failures:

SQL [Copy code to clipboard] Copy

```sql
SELECT timestamp, monitorName, result FROM SyntheticCheck WHERE result = 'FAILED' $__timeFilter
```

Display configuration changes:

SQL [Copy code to clipboard] Copy

```sql
SELECT timestamp, actionIdentifier, actorEmail FROM NrAuditEvent $__timeFilter
```

## Next steps

- [New Relic query editor](/docs/plugins/grafana-newrelic-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-newrelic-datasource/latest/template-variables/)
