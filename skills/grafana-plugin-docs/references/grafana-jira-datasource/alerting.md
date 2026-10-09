---
title: "Set up alerting for Jira data | Grafana Enterprise Plugins documentation"
description: "Learn how to create alerts based on Jira issue data"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Set up alerting for Jira data

The Jira data source supports [Grafana Alerting](/docs/grafana/latest/alerting/). Alert evaluation runs on the backend. Use alerts to get notified when issue counts exceed a threshold, work is overdue, or an SLA has breached.

## Before you begin

- [Configure the Jira data source](/docs/plugins/grafana-jira-datasource/latest/configure/) and confirm **Save &amp; test** returns **Plugin health check successful**.
- Understand [Grafana Alerting](/docs/grafana/latest/alerting/).
- Ensure you have permission to create Grafana-managed alert rules.

## Query requirements

Jira queries return a **table**: one row per issue, not a Prometheus-style time series. Grafana Alerting’s default **Reduce** and **Threshold** expressions expect a wide time-series frame and fail on that table with an error such as `input data must be a wide series`.

To evaluate Jira results:

1. Select at least one field in **Select Fields**. For counts, **Key** is enough. For sums, select a numeric field such as **Story point estimate**.
2. Filter with JQL. Don’t use dashboard template variables such as `$project`. Alert rules evaluate outside the dashboard, so those variables are empty or wrong. Hard-code project keys, or use `$__timeFrom` and `$__timeTo` (they follow the **alert rule** time range).
3. Set **Limit** higher than the number of issues you expect. The default is `50`. If Limit is lower than the matching issue count, the alert under-counts.
4. Add a **Classic condition** on query A (for example, `WHEN count() OF A IS ABOVE 50`). Use `count()` for issue counts and `sum()` for numeric fields.

Queries that return only text, such as **Summary** with no aggregation condition, can’t be evaluated as a threshold.

## Create an alert rule

To create an alert rule based on Jira data:

1. Go to **Alerts &amp; IRM** &gt; **Alert rules**.
2. Click **New alert rule**.
3. Enter a name for the rule.
4. In **Define query and alert condition**:

   - Select your Jira data source.
   - Select fields and enter JQL. Refer to [Jira query editor](/docs/plugins/grafana-jira-datasource/latest/query-editor/).
   - Add a **Classic condition** that uses `count()` or `sum()` on query A, then set the threshold.
5. In **Add folder and labels**, choose a folder, and add labels and annotations so notifications include the project and a link to a dashboard.
6. In **Set evaluation behavior**, choose an evaluation group, set the evaluation interval, and set the pending period (how long the condition must be true before the alert fires).
7. Select a contact point, or configure [contact points](/docs/grafana/latest/alerting/configure-notifications/manage-contact-points/) later.
8. Click **Preview** to confirm the query runs, then click **Save rule**.

You can also open a dashboard panel, click **Edit**, open the **Alert** tab, and click **Create alert rule from this panel**. Copy the JQL into the rule and add a Classic condition. Panel transformations aren’t a substitute for that condition.

For detailed Grafana UI steps, refer to [Create Grafana-managed alert rules](/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/).

## Examples

The following examples assume a Classic condition on query A. Replace `'Your Project'` with your project key and raise **Limit** so every matching issue is included.

### Alert when too many issues are open

1. Select Fields: **Key**
2. Filter (JQL): `project = 'Your Project' AND status != done`
3. Classic condition: `WHEN count() OF A IS ABOVE 50`
4. Evaluation interval: `10m`. Pending period: `10m`.

### Alert on overdue issues

1. Select Fields: **Key**, **Due Date**
2. Filter (JQL): `project = 'Your Project' AND due < now() AND status != done`
3. Classic condition: `WHEN count() OF A IS ABOVE 0`

### Alert on remaining story points in the current sprint

1. Select Fields: **Story point estimate**
2. Filter (JQL): `project = 'Your Project' AND sprint in openSprints() AND type != epic AND status != done`
3. Classic condition: `WHEN sum() OF A IS ABOVE 20` (use your team’s threshold)

### Alert on new critical issues

1. Select Fields: **Key**
2. Filter (JQL): `project = 'Your Project' AND priority IN ('Critical', 'Blocker') AND created >= -1h`
3. Classic condition: `WHEN count() OF A IS ABOVE 0`
4. Evaluation interval: `5m`. Pending period: `0s` (or a short pending period if you want to avoid single-evaluation noise).

### Alert on a breached SLA

Jira Query Language can filter SLA fields directly. You don’t need to parse the SLA JSON for this alert.

1. Select Fields: **Key**
2. Filter (JQL): `project = 'Your Project' AND "Time to resolution" = breached() AND status != done`
3. Classic condition: `WHEN count() OF A IS ABOVE 0`

The SLA field name is instance-specific. Check **Select Fields** or Jira’s advanced search for the exact name (for example, **Time to first response**).

## Best practices

- **Evaluation interval:** Jira issue data usually changes slowly. Evaluate every 5 to 15 minutes unless you need faster detection for critical issues.
- **Pending period:** Require the condition to stay true for one or more intervals so a single slow query doesn’t flap the alert.
- **Limit:** Set Limit high enough that the count or sum includes every matching issue.
- **JQL in the rule:** Hard-code project keys and statuses. Don’t rely on dashboard variables.
- **Preview:** Use **Preview** on the rule before you enable notifications.
- **Contact points:** Configure [contact points](/docs/grafana/latest/alerting/configure-notifications/manage-contact-points/) (email, Slack, PagerDuty, and others) rather than legacy notification channels.

If **Preview** fails with `input data must be a wide series`, the rule is still using Reduce and Threshold on a Jira table. Switch the condition to a **Classic condition** with `count()` or `sum()`.
