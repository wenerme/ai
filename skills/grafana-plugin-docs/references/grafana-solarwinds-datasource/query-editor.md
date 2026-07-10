---
title: "SolarWinds query editor | Grafana Enterprise Plugins documentation"
description: "Learn how to use the SolarWinds query editor to query data with SolarWinds Query Language (SWQL)."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# SolarWinds query editor

Grafana provides a query editor for the SolarWinds data source. The editor is available on the [Explore](/docs/grafana/latest/explore/) page and from dashboard panels. To open the query editor from a panel, click the ellipsis in the upper right of the panel and select **Edit**.

The SolarWinds data source supports SolarWinds Query Language (SWQL) queries through a text interface, which lets you use the full power of the SolarWinds API directly within Grafana.

## Before you begin

Ensure you have [configured the SolarWinds data source](/docs/plugins/grafana-solarwinds-datasource/latest/configure/).

## Key concepts

If you’re new to SolarWinds, these terms are used throughout this documentation:

Expand table

| Term                    | Description                                                                                       |
|-------------------------|---------------------------------------------------------------------------------------------------|
| **SWQL**                | SolarWinds Query Language, an SQL-like language used to query the SolarWinds Information Service. |
| **Orion**               | The SolarWinds platform that exposes monitored entities, such as nodes, volumes, and alerts.      |
| **Entity**              | A SolarWinds object you query, such as `Orion.Nodes`, `Orion.Volumes`, or `Orion.AlertActive`.    |
| **Information Service** | The SolarWinds API that the data source queries to run SWQL statements.                           |

## Create a query

To create a query:

1. Select the **SolarWinds** data source.
2. In the query editor, the **SWQL Query** action is selected automatically in the **Action** drop-down.
3. Enter your query in the **SWQL Query** field.
4. Run the query to visualize the results.

The **SWQL Query** field is a code editor with syntax highlighting. Write your query using the same SWQL format that the SolarWinds API accepts. The data source reads results from the `results` array returned by the SolarWinds Information Service.

## Query examples

The following examples show common SWQL queries.

### Top nodes by CPU load

This query returns the nodes with the highest CPU load:

SQL [Copy code to clipboard] Copy

```sql
SELECT TOP 10 Caption, CPULoad FROM Orion.Nodes ORDER BY CPULoad DESC
```

### Top nodes by memory usage

This query returns the nodes with the highest percentage of memory used:

SQL [Copy code to clipboard] Copy

```sql
SELECT TOP 10 Caption, PercentMemoryUsed FROM Orion.Nodes ORDER BY PercentMemoryUsed DESC
```

### Active alerts by severity

Severity isn’t stored on `Orion.AlertActive` directly. Join the active alerts to their alert objects and configurations to group by `ac.Severity`:

SQL [Copy code to clipboard] Copy

```sql
SELECT ac.Severity, COUNT(aa.AlertActiveID) AS AlertCount
FROM Orion.AlertActive aa
JOIN Orion.AlertObjects o ON aa.AlertObjectID = o.AlertObjectID
JOIN Orion.AlertConfigurations ac ON ac.AlertID = o.AlertID
GROUP BY ac.Severity
```

`Severity` is a numeric code: `0` (Informational), `1` (Warning), `2` (Critical), `3` (Serious), and `4` (Notice).

### List active alerts with details

To surface SolarWinds alerts in Grafana, join the active alerts to their configuration to return the alert name and trigger time. Adjust the entity and column names to match your SolarWinds environment:

SQL [Copy code to clipboard] Copy

```sql
SELECT ac.Name, aa.TriggeredDateTime
FROM Orion.AlertActive aa
JOIN Orion.AlertObjects ao ON aa.AlertObjectID = ao.AlertObjectID
JOIN Orion.AlertConfigurations ac ON ao.AlertID = ac.AlertID
ORDER BY aa.TriggeredDateTime DESC
```

### Volumes by percentage used

This query returns the volumes with the highest percentage of space used:

SQL [Copy code to clipboard] Copy

```sql
SELECT TOP 10 Caption, VolumePercentUsed FROM Orion.Volumes ORDER BY VolumePercentUsed DESC
```

## Use cases

The following real-world scenarios show how to use the SolarWinds data source effectively.

### Monitor infrastructure health

Track server and node health to detect problems before they affect users.

- **CPU load panel:** Use a query against `Orion.Nodes` with `CPULoad` to track utilization across your fleet.
- **Memory usage panel:** Use `PercentMemoryUsed` from `Orion.Nodes` to identify nodes under memory pressure.
- **Response time panel:** Use the node response time metrics to monitor latency.

### Track active alerts

Surface active alerts from SolarWinds inside Grafana so you can correlate them with other telemetry.

- **Alerts by severity:** Join `Orion.AlertActive` to `Orion.AlertConfigurations` and group by `Severity` to see the distribution of active alerts.
- **Alert table:** List active alerts with their details for triage.

### Monitor storage capacity

Identify volumes that are running low on space to plan capacity.

- **Volumes by percentage used:** Query `Orion.Volumes` ordered by `VolumePercentUsed` to find the volumes closest to full.

## Next steps

- [Use SolarWinds template variables](/docs/plugins/grafana-solarwinds-datasource/latest/template-variables/)
- [Set up SolarWinds alerting](/docs/plugins/grafana-solarwinds-datasource/latest/alerting/)
- [Troubleshoot the SolarWinds data source](/docs/plugins/grafana-solarwinds-datasource/latest/troubleshooting/)

## Additional resources

- [Use SolarWinds Query Language (SWQL)](https://support.solarwinds.com/SuccessCenter/s/article/Use-SolarWinds-Query-Language-SWQL?language=en_US)
- [SWQL built-in functions](https://github.com/solarwinds/OrionSDK/wiki/SWQL-Functions)
- [SWQL examples for new widgets](https://documentation.solarwinds.com/en/success_center/orionplatform/content/core-fusion-swql-data-model-examples.htm)
