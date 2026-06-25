---
title: "ServiceNow alerting | Grafana Enterprise Plugins documentation"
description: "Set up Grafana alert rules using ServiceNow data source queries."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# ServiceNow alerting

The ServiceNow data source supports Grafana’s unified alerting system. You can create alert rules that evaluate ServiceNow Stats queries and trigger notifications when conditions are met, such as a spike in high-priority incidents or a backlog of unresolved changes.

## Before you begin

- [Configure the ServiceNow data source](/docs/plugins/grafana-servicenow-datasource/latest/configure/).
- Familiarize yourself with [Grafana alerting](/docs/grafana/latest/alerting/).
- Ensure the ServiceNow user has read access to the tables you want to alert on.

## Create an alert rule

To create an alert rule using the ServiceNow data source:

01. Click **Alerting** in the left-side menu.
02. Click **Alert rules**.
03. Click **New alert rule**.
04. Enter a name for the alert rule.
05. In the **Define query and alert condition** section, select the **ServiceNow** data source.
06. Set the **Query** type to **Stats**.
07. Select a **Table** (for example, `incident`).
08. In **Show Field**, select the field you want to aggregate (for example, `number`).
09. In the **Aggregation** selector next to the field, select an aggregation (for example, **count**).
10. Add filters to scope the query to the data you want to monitor.
11. In the **Expressions** section, configure the threshold condition (for example, when the count is above a value).
12. Set the evaluation interval and pending period.
13. Configure labels, notifications, and contact points as needed.
14. Click **Save rule and exit**.

> Note
>
> Use Stats queries for alert rules. Stats queries return numeric aggregations that work with threshold conditions. Table queries return individual records and aren’t suited for alert rule evaluation.

## Understand time field behavior

The **Time Field** toggle on the Stats query controls the scope of records included in each alert evaluation:

- **Time field disabled (default):** The query counts all matching records in the table, regardless of when they were created. Use this when you want to monitor the total number of open or active records (for example, all unresolved critical incidents).
- **Time field enabled:** The query only counts records where the selected time field falls within the evaluation time range. Use this when you want to monitor the rate of new records (for example, incidents created in the last 10 minutes).

Choosing the right setting depends on what you want to alert on. See the examples below for both approaches.

## Examples

The following examples demonstrate common alerting use cases with the ServiceNow data source.

### Alert on total open critical incidents

This example creates an alert that fires when the total number of open critical incidents exceeds a threshold. It uses the time field **disabled** so that all matching records are counted regardless of creation time.

1. Create a new alert rule and select the **ServiceNow** data source.
2. Configure the query:

   - Set **Query** to **Stats**.
   - Set **Table** to `incident`.
   - In **Show Field**, select `number`.
   - In **Aggregation**, select **count**.
   - Leave the **Time Field** toggle disabled.
   - Add a filter: **Priority** **Equals** `1` (Critical).
   - Add a filter: **State** **Not Equals** `7` (Closed).
3. Configure the condition:

   - In the **Expressions** section, use a **Threshold** expression.
   - Set the condition to fire when the value **Is above** your desired threshold (for example, `5`).
4. Set the evaluation behavior:

   - Set **Evaluate every** to `5m`.
   - Set **for** to `0s` to fire immediately when the threshold is exceeded.
5. Add a notification policy and contact point to receive alerts.

This alert monitors the total count of open critical incidents and fires when more than five are active at the same time.

### Alert on unresolved incident volume by category

This example creates an alert that fires when unresolved incidents in any category exceed a threshold, using **Group By** to monitor each category independently.

1. Create a new alert rule and select the **ServiceNow** data source.
2. Configure the query:

   - Set **Query** to **Stats**.
   - Set **Table** to `incident`.
   - In **Show Field**, select `number`.
   - In **Aggregation**, select **count**.
   - Leave the **Time Field** toggle disabled.
   - Add a filter: **State** **Not Equals** `6` (Resolved).
   - Add a filter: **State** **Not Equals** `7` (Closed).
   - Set **Group By** to `category`.
3. Configure the condition:

   - In the **Expressions** section, use a **Threshold** expression.
   - Set the condition to fire when the value **Is above** your desired threshold (for example, `20`).
4. Set the evaluation behavior:

   - Set **Evaluate every** to `10m`.
   - Set **for** to `5m` to avoid alerting on brief spikes.

This alert evaluates unresolved incident counts per category and fires separately for any category that exceeds the threshold.

### Alert on new incident creation rate

This example creates an alert that fires when too many new incidents are created within each evaluation window. It uses the time field **enabled** so that only recently created records are counted.

1. Create a new alert rule and select the **ServiceNow** data source.
2. Configure the query:

   - Set **Query** to **Stats**.
   - Set **Table** to `incident`.
   - In **Show Field**, select `number`.
   - In **Aggregation**, select **count**.
   - Enable the **Time Field** toggle and select `sys_created_on`.
   - Optionally, add a filter to scope to a specific category or priority.
3. Configure the condition:

   - In the **Expressions** section, use a **Threshold** expression.
   - Set the condition to fire when the value **Is above** your desired threshold (for example, `10`).
4. Set the evaluation behavior:

   - Set **Evaluate every** to `10m`.
   - Set **for** to `0s` to fire immediately.

This alert counts incidents created within each 10-minute evaluation window. If more than 10 new incidents are created in any 10-minute period, the alert fires, helping you detect incident storms early.

> Note
>
> The state and priority integer values used in the examples (for example, State `6` for Resolved, `7` for Closed, Priority `1` for Critical) are defaults for the standard ServiceNow incident table. If your ServiceNow instance uses customized state or priority values, adjust the filter values to match your configuration.

## Considerations

Keep the following in mind when setting up ServiceNow alert rules:

- **Keep queries focused.** For alert evaluation, select a single field with a single aggregation to produce one clear numeric value for the threshold condition. While Stats queries support multiple fields and aggregations, simpler queries are easier to reason about in alert rules.
- **Add filters to keep queries efficient.** Alerting queries run at regular intervals. Use filters to reduce the data scanned by each evaluation and avoid unnecessary load on your ServiceNow instance.
- **Set appropriate evaluation intervals.** Choose an interval that balances responsiveness with ServiceNow API usage. For most use cases, evaluating every 5 to 10 minutes is sufficient.
- **Be aware of API rate limits.** Frequent alert evaluations generate API calls to ServiceNow. If you have many alert rules, consider spacing out evaluation intervals or enabling query caching in Grafana Enterprise or Grafana Cloud.
