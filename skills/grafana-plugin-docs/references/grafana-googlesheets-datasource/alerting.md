---
title: "Alerting | Grafana Plugins documentation"
description: "Create alert rules from Google Sheets queries to get notified when your data meets conditions."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Alerting

You can create [alert rules](/docs/grafana/latest/alerting/) that use the Google Sheets data source. When your query results meet the conditions you define, Grafana can send notifications to your configured contact points.

For an overview of alerting in Grafana, refer to [Alerting](/docs/grafana/latest/alerting/).

## Use cases

Alerting on Google Sheets is useful when your metrics or status live in a spreadsheet (for example, updated by scripts, forms, or exports) and you want Grafana to notify you when values cross a threshold or change state. Typical examples:

- **Budgets and quotas** – Track spending, usage, or limits in a sheet; alert when a value exceeds or falls short of a target.
- **KPIs and SLAs** – Monitor a single row or cell that holds a key metric (for example, uptime, error rate, NPS); alert when it goes above or below a set level.
- **Status or health** – Use a sheet as a simple status board (for example, “ok”, “degraded”, “down”); alert when the status indicates a problem.
- **Inventory or capacity** – Alert when stock, seats, or capacity in a sheet drops below (or rises above) a threshold.
- **Form or survey results** – Alert when the count or average of responses in a sheet crosses a limit (for example, number of support tickets, satisfaction score).

## Before you begin

- [Configure the Google Sheets data source](/docs/plugins/grafana-googlesheets-datasource/latest/configure/) and ensure **Save &amp; test** shows **Success**.
- Have a dashboard panel that uses a Google Sheets query whose data you want to alert on (for example, a metric that should stay above or below a threshold).

## Create an alert rule from a panel

1. Open a dashboard that has a panel using the **Google Sheets** data source.
2. Click the panel title and select **Edit** (or create a new panel and add a Google Sheets query).
3. In the query editor, set **Spreadsheet ID** and **Range** (and **Use Time Filter** if needed) so the panel shows the data you want to evaluate.
4. Save the panel and the dashboard if you have made changes.
5. Click the panel title and select **Edit** → open the **Alert** tab (or **Alert** in the panel editor).
6. Click **Create alert rule from this panel**.
7. Define the rule: name, folder, condition (for example, when a value is above or below a threshold), evaluation group, and contact points. For details, refer to [Configure Grafana-managed alert rules](/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/).
8. Save the rule.

After the rule is created, Grafana will evaluate it on the schedule you configured and send notifications when the condition is met.

## Query and data considerations

- Use the same [query editor](/docs/plugins/grafana-googlesheets-datasource/latest/query-editor/) options as in panels: **Spreadsheet ID**, **Range**, **Use Time Filter**, and **Cache Time**. The alert evaluation runs your query and then applies the condition to the result.
- For threshold-style rules, your sheet should return data that Grafana can treat as numeric or time series (for example, a column with numbers or a time column plus value column). The exact condition you can set depends on your panel type and how the data is shaped.
- If your sheet data or range changes (for example, new rows), ensure the alert rule’s query still matches the range you intend (for example, a fixed range like `Sheet1!A1:E100` or a range that includes new rows).

## Example sheet layout

A simple layout for a threshold alert is a time column plus one or more numeric columns. Format the time column as date or date-time in Google Sheets so the plugin detects it. Example:

Expand table

| time                | value |
|---------------------|-------|
| 2025-02-11 08:00:00 | 94.2  |
| 2025-02-11 09:00:00 | 96.1  |
| 2025-02-11 10:00:00 | 98.5  |

Use a range such as `Sheet1!A1:B100`. In the panel, choose a time series or stat visualization and create an alert rule that fires when `value` is above (or below) a threshold.

For a single KPI (for example, one cell or row updated by a script or formula), use a small range (for example, `Sheet1!A1:B1` with headers `metric` and `value`) and a stat or gauge panel; then add an alert rule on that panel.

## Next steps

- [Query editor](/docs/plugins/grafana-googlesheets-datasource/latest/query-editor/) – Spreadsheet ID, Range, and Use Time Filter
- [Configure the data source](/docs/plugins/grafana-googlesheets-datasource/latest/configure/)
- [Alerting](/docs/grafana/latest/alerting/) – Grafana alerting documentation
