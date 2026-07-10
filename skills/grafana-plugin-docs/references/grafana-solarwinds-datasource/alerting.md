---
title: "SolarWinds alerting | Grafana Enterprise Plugins documentation"
description: "Learn how to create Grafana alert rules based on SolarWinds data using SWQL queries."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# SolarWinds alerting

You can use the SolarWinds data source with Grafana Alerting to create alert rules based on your SolarWinds data. Use alert rules to get notified when infrastructure metrics cross a threshold, such as high CPU load, low free disk space, or a growing number of active alerts.

## Before you begin

Ensure you have:

- [Configured the SolarWinds data source](/docs/plugins/grafana-solarwinds-datasource/latest/configure/).
- Familiarity with [Grafana Alerting](/docs/grafana/latest/alerting/).

## Write SWQL queries for alerting

The SolarWinds data source returns point-in-time tabular results from your SWQL query rather than a historical time series. To alert on these results, write a query that returns a numeric column, then add expressions that reduce the result to a single value and compare it against a threshold.

Follow these guidelines when you write a SWQL query for an alert rule:

- Return a numeric column to evaluate, such as `CPULoad` or a `COUNT` aggregate.
- Filter to the specific entity you want to monitor, for example a single node, so the query returns one row.
- Keep the result small. A query that returns many rows produces a separate alert instance for each row.

## Create an alert rule

The SolarWinds data source supports Grafana-managed alert rules, which evaluate the SWQL query and expressions in Grafana. It doesn’t support data source-managed alert rules.

To create an alert rule that uses the SolarWinds data source:

1. Navigate to **Alerting** &gt; **Alert rules** in the left-side menu.
2. Click **New alert rule**.
3. In the query section, select your SolarWinds data source.
4. Enter a SWQL query that returns a numeric value.
5. Add a **Reduce** expression to convert the query result to a single value. Use **Last** for a point-in-time value.
6. Add a **Threshold** expression that triggers when the value crosses your limit.
7. Configure the evaluation behavior, labels, and notifications.
8. Click **Save rule**.

For detailed instructions, refer to [Create Grafana-managed alert rules](/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/).

## Alert examples

The following examples show SWQL queries you can use as the basis for an alert rule.

### Alert on a high number of active alerts

To receive an alert when the number of active alerts in SolarWinds exceeds a threshold:

1. Create a new alert rule and select the SolarWinds data source.
2. Enter the following query:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT COUNT(AlertActiveID) AS ActiveAlerts FROM Orion.AlertActive
   ```
3. Add a **Reduce** expression set to **Last**.
4. Add a **Threshold** expression that triggers when the value is above your limit, for example `> 0`.
5. Configure notifications and save.

### Alert on high CPU load

To receive an alert when a node’s CPU load is too high:

1. Create a new alert rule and select the SolarWinds data source.
2. Enter the following query, replacing the caption with your node:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT CPULoad FROM Orion.Nodes WHERE Caption = '<NODE_CAPTION>'
   ```
3. Add a **Reduce** expression set to **Last**.
4. Add a **Threshold** expression that triggers when the value is above your limit, for example `> 90`.
5. Configure notifications and save.

### Alert on low free disk space

To receive an alert when a volume is running low on free space:

1. Create a new alert rule and select the SolarWinds data source.
2. Enter the following query, replacing the caption with your volume:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT VolumePercentUsed FROM Orion.Volumes WHERE Caption = '<VOLUME_CAPTION>'
   ```
3. Add a **Reduce** expression set to **Last**.
4. Add a **Threshold** expression that triggers when the value is above your limit, for example `> 85`.
5. Configure notifications and save.

## Related documentation

- [Grafana Alerting](/docs/grafana/latest/alerting/)
- [Create alert rules](/docs/grafana/latest/alerting/alerting-rules/)
- [SolarWinds query editor](/docs/plugins/grafana-solarwinds-datasource/latest/query-editor/)
