---
title: "Catchpoint alerting | Grafana Enterprise Plugins documentation"
description: "Set up Grafana alert rules on Catchpoint Tests, RUM, and SLO data."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Catchpoint alerting

The Catchpoint data source supports Grafana alerting, so you can create alert rules on your Catchpoint Tests, RUM, and SLO data. Because it’s a backend data source, Grafana evaluates these rules server-side without an open dashboard.

## Before you begin

- [Configure the Catchpoint data source](/docs/plugins/grafana-catchpoint-datasource/latest/configure/).
- Verify your queries return data in a panel or in [Explore](/docs/grafana/latest/explore/).
- Understand [Grafana Alerting](/docs/grafana/latest/alerting/).

## Create an alert rule

To create an alert rule that uses Catchpoint data:

1. Navigate to **Alerting** &gt; **Alert rules**.
2. Click **New alert rule**.
3. Select the **Catchpoint** data source for the query.
4. Build a query with the [query editor](/docs/plugins/grafana-catchpoint-datasource/latest/query-editor/), such as a Tests query that returns availability.
5. Add an expression to reduce the query to a single value, then set the alert condition and threshold.
6. Set the evaluation behavior, labels, and notifications, then save the rule.

## Alert rule example

This example alerts when the availability of a critical test drops below 99% over the last 5 minutes. A Grafana alert rule combines a data source query with one or more expressions that reduce the series to a single value and compare it against a threshold.

1. Add a query and name it `A`, using the Catchpoint data source:

   Expand table

   | Field             | Value              |
   |-------------------|--------------------|
   | **Action**        | Tests Query        |
   | **Test**          | Your critical test |
   | **Metrics**       | Availability       |
   | **Time Interval** | 5m                 |
2. Add a **Reduce** expression named `B` to collapse the series to a single number:

   Expand table

   | Field        | Value |
   |--------------|-------|
   | **Function** | Last  |
   | **Input**    | A     |
3. Add a **Threshold** expression named `C` and set it as the alert condition:

   Expand table

   | Field         | Value         |
   |---------------|---------------|
   | **Input**     | B             |
   | **Condition** | Is below `99` |
4. Set the evaluation interval, pending period, labels, and notification policy, then save the rule.

The rule fires when the reduced availability value for the test falls below 99.

## Use cases

The following scenarios show common ways to alert on Catchpoint data:

- **Availability drop:** Alert when the availability metric for a critical test falls below a threshold.
- **Slow response time:** Alert when a test or RUM response time metric exceeds an acceptable value.
- **SLO compliance:** Alert when an SLO Status query returns compliance below the objective target.

## Next steps

- [Annotations](/docs/plugins/grafana-catchpoint-datasource/latest/annotations/)
- [Troubleshooting](/docs/plugins/grafana-catchpoint-datasource/latest/troubleshooting/)
