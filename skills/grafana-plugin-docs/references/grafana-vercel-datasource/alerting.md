---
title: "Vercel alerting | Grafana Enterprise Plugins documentation"
description: "Create Grafana alert rules on Vercel data with the Vercel data source."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Vercel alerting

The Vercel data source supports [Grafana Alerting](/docs/grafana/latest/alerting/), so you can create alert rules on Vercel data, such as deployment failures or firewall attack activity. The plugin is a backend data source, so Grafana evaluates these queries server-side during each alert rule evaluation.

## Before you begin

Before you create an alert rule, ensure you have [configured the Vercel data source](/docs/plugins/grafana-vercel-datasource/latest/configure/) and are familiar with the [Vercel query editor](/docs/plugins/grafana-vercel-datasource/latest/query-editor/).

## How alerting works

The Vercel data source doesn’t have a dedicated alerting query type. Instead, an alert rule runs a standard Vercel action, reduces the result to a single number, and evaluates that number against a condition. Vercel actions return tables, so you typically add a **Reduce** expression that counts the returned rows, or reduces a numeric field, before applying a threshold. Common patterns include:

- **List deployments** filtered by `state` to count failed or building deployments.
- **Read active attack data** to alert on firewall activity for a project.

An alert query uses the rule’s own time range, so the `since` and `until` parameters resolve to the range you set on the query.

## Create an alert rule

To create an alert rule on a Vercel query:

1. Navigate to **Alerting** &gt; **Alert rules**, then select **New alert rule**.
2. Enter a name for the rule.
3. In the query section, select your Vercel data source.
4. Select an action and set any required parameters, such as a `state` filter on **List deployments**.
5. Set the query’s time range to the window you want to evaluate.
6. Add a **Reduce** expression to convert the query result to a single value, then add a **Threshold** expression to define the alert condition.
7. Set the alert condition to the threshold expression, set the evaluation behavior, add labels and notifications, then save the rule.

## Example: alert on failed deployments

Use this example to fire an alert whenever a deployment fails to build.

1. Navigate to **Alerting** &gt; **Alert rules**, then select **New alert rule** and name it `Failed Vercel deployments`.
2. For query **A**, select your Vercel data source and select the **List deployments** action.
3. Expand **Additional Parameters**, set `projectId` to your project, and set `state` to `ERROR`.
4. Set the query time range to the window you want to check, such as the last 10 minutes.
5. Add a **Reduce** expression **B** with the **Count** function and input **A** to count the failed deployments.
6. Add a **Threshold** expression **C** with input **B** and the condition **is above** `0`.
7. Set expression **C** as the alert condition, then configure the evaluation interval, labels, and notifications.
8. Save the rule.

The rule fires when the **List deployments** action returns one or more `ERROR` deployments within the evaluation window.

## Next steps

- Configure [notification policies and contact points](/docs/grafana/latest/alerting/configure-notifications/) to route alerts.
- Refer to [Troubleshooting](/docs/plugins/grafana-vercel-datasource/latest/troubleshooting/) if alert queries return no data.
