---
title: "GitLab alerting | Grafana Enterprise Plugins documentation"
description: "Set up alerting with the GitLab data source in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# GitLab alerting

The GitLab data source supports Grafana Alerting, which lets you create alert rules based on GitLab query results. You can monitor GitLab activity and receive notifications when conditions are met.

For general information about Grafana Alerting, refer to [Alerting](/docs/grafana/latest/alerting/).

## Before you begin

- [Configure the GitLab data source](/docs/plugins/grafana-gitlab-datasource/latest/configure/).
- Familiarize yourself with [Grafana alert rules](/docs/grafana/latest/alerting/alerting-rules/).

## Create an alert rule

Any GitLab query can be used as the data source for an alert rule. To create an alert:

1. Navigate to **Alerting** &gt; **Alert rules**.
2. Click **New alert rule**.
3. Select your GitLab data source.
4. Configure a query using any supported [resource type](/docs/plugins/grafana-gitlab-datasource/latest/query-editor/).
5. Add reduce and threshold expressions to define your alert condition.
6. Configure labels, notifications, and evaluation intervals.
7. Click **Save rule**.

## Example use cases

The following examples show common alerting scenarios with the GitLab data source. Each requires adding [transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) or expressions to produce a numeric value for the alert condition.

### Alert on failed pipelines

Monitor a project for pipeline failures:

1. Create a query with resource type **Pipelines**.
2. Set the **Project Id** and filter **Status** to `failed`.
3. Add a **Reduce** expression that counts the number of results.
4. Add a **Threshold** expression to alert when the count exceeds `0`.

### Alert on open merge requests

Monitor when too many merge requests are open:

1. Create a query with resource type **Merge Requests**.
2. Set the **Project Id** and filter **State** to `opened`.
3. Add a **Reduce** expression that counts the number of results.
4. Add a **Threshold** expression to alert when the count exceeds your desired limit.

### Alert on deployment failures

Monitor for failed deployments in an environment:

1. Create a query with resource type **Deployments**.
2. Set the **Project Id** and filter **Status Query** to `failed`.
3. Add a **Reduce** expression that counts the number of results.
4. Add a **Threshold** expression to alert when the count exceeds `0`.

### Alert when no deployments occur

Detect when a project has not deployed within the evaluation window, which may indicate a stalled release process:

1. Create a query with resource type **Deployments**.
2. Set the **Project Id** and filter **Status Query** to `success`.
3. Add a **Reduce** expression that counts the number of results.
4. Add a **Threshold** expression to alert when the count is below `1`.
5. Set the evaluation interval to match your expected deployment cadence (for example, every 24 hours).

### Alert on stale merge requests

Detect merge requests that have been open longer than a specific number of days:

1. Create a query with resource type **Merge Requests**.
2. Set the **Project Id** and filter **State** to `opened`.
3. Add a **Math** expression that calculates the age in days: `($A.created_at - now()) / -86400000`.
4. Add a **Reduce** expression with function **Max** to find the oldest open merge request.
5. Add a **Threshold** expression to alert when the value exceeds your limit (for example, `14` for two weeks).
