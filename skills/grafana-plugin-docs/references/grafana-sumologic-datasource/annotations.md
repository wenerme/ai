---
title: "Sumo Logic annotations | Grafana Enterprise Plugins documentation"
description: "Use annotations with the Sumo Logic data source to mark events on dashboard panels."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Sumo Logic annotations

Annotations overlay event markers on time-series panels, helping you correlate changes or incidents with metric behavior. You can use any Sumo Logic query as an annotation source – each result becomes a marker on the panel at its corresponding timestamp.

For general information about annotations in Grafana, refer to [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Before you begin

- [Configure the Sumo Logic data source](/docs/plugins/grafana-sumologic-datasource/latest/configure/).
- Have a dashboard with at least one time-series panel.

## Create an annotation query

The annotation query editor is the same as the standard Sumo Logic [query editor](/docs/plugins/grafana-sumologic-datasource/latest/query-editor/), so you can use either **Metrics** or **Logs** queries. Logs queries are the most common choice for annotations because log events naturally represent discrete points in time.

To add a Sumo Logic annotation query to a dashboard:

1. Open a dashboard and click **Dashboard settings** (gear icon).
2. Select **Annotations** in the left-side menu.
3. Click **Add annotation query**.
4. Enter a name for the annotation.
5. Select the Sumo Logic data source.
6. Choose the query type (**Metrics** or **Logs**) and enter a query that returns the events you want to annotate.
7. Configure the field mappings to control which fields are used for the annotation text, tags, and time.
8. Set the annotation color and other display options as needed.
9. Click **Save dashboard**.

Annotation queries run against the dashboard time range and display matching results as vertical lines on time-series panels.

## Annotation query examples

The following examples use logs queries, which are the most common annotation use case.

Mark deployment events:

SQL [Copy code to clipboard] Copy

```sql
_sourceCategory=prod/deployments
```

Annotate error spikes from a specific service:

SQL [Copy code to clipboard] Copy

```sql
_sourceCategory=prod/app "ERROR" | count by _messageTime
```

Mark configuration changes from audit logs:

SQL [Copy code to clipboard] Copy

```sql
_sourceCategory=audit/config action=update
```

Annotate scaling events:

SQL [Copy code to clipboard] Copy

```sql
_sourceCategory=infrastructure "autoscaling" ("ScaleUp" OR "ScaleDown")
```

Mark alert state changes from Sumo Logic monitors:

SQL [Copy code to clipboard] Copy

```sql
_sourceCategory=alerts eventName="AlertSystemInfo" | parse "currentState\":\"*\"" as state | where state != "Normal"
```

Annotate user login failures for security monitoring:

SQL [Copy code to clipboard] Copy

```sql
_sourceCategory=auth action=login status=failure | count by _sourceHost
```
