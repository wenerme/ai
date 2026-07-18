---
title: "Databricks data source alerting | Grafana Enterprise Plugins documentation"
description: "This document describes how to use the Databricks data source with Grafana alerting."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Databricks alerting

The Databricks data source supports Grafana alerting. You can create alert rules from Databricks SQL queries to monitor your data and notify your team when conditions are met. For an overview of alerting, refer to [Grafana Alerting](/docs/grafana/latest/alerting/).

## Supported authentication methods for alerting

Alert rules run on a schedule in the background, without a logged-in user present. Authentication methods that depend on an individual user’s identity can’t run alert rules.

Expand table

| Authentication method     | Supports alerting | Reason                                                                                         |
|---------------------------|-------------------|------------------------------------------------------------------------------------------------|
| **Personal Access Token** | Yes               | Uses a static token that doesn’t require a user context.                                       |
| **OAuth M2M**             | Yes               | Authenticates as a service principal, so no user context is required.                          |
| **Azure Entra ID M2M**    | Yes               | Authenticates as a service principal, so no user context is required.                          |
| **OAuth Passthrough**     | No                | Requires the signed-in user’s credentials, which aren’t available during alert evaluation.     |
| **Azure (On-Behalf-Of)**  | No                | Acts on behalf of a specific user, whose credentials aren’t available during alert evaluation. |

> Warning
>
> Don’t configure alert rules on a Databricks data source that uses **OAuth Passthrough** or **Azure (On-Behalf-Of)** authentication. Alert rules can’t run because there is no user context available to provide credentials for the query. For alerting, configure the data source with **Personal Access Token**, **OAuth M2M**, or **Azure Entra ID M2M**. Refer to [Configure the Databricks data source](/docs/plugins/grafana-databricks-datasource/latest/configure/#authentication-methods).

## Create an alert rule

To create an alert rule from a Databricks query:

1. Write and test your query in a dashboard panel or in [Explore](/docs/grafana/latest/explore/).
2. Make sure the query returns a numeric value that an alert condition can evaluate.
3. Create the alert rule. Refer to [Configure alert rules](/docs/grafana/latest/alerting/alerting-rules/) for the full workflow.

An alert query should reduce to a single numeric value that the alert condition can compare against a threshold. For example, the following query counts error events in the evaluation window:

SQL [Copy code to clipboard] Copy

```sql
SELECT count(*) AS error_count
FROM main.logs.application_events
WHERE severity = 'ERROR'
  AND $__timeFilter(event_time)
```

You can then add a threshold condition, such as `error_count IS ABOVE 0`, to fire the alert. If your query returns multiple rows or columns, use a [reduce expression](/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/#reduce) to collapse the result to a single value before the threshold condition.

## Best practices for alert queries

Alert rules evaluate on a schedule, so an inefficient query runs repeatedly and adds load to your SQL warehouse. Follow these practices to keep alerting reliable:

- **Filter to a bounded time range.** Use the `$__timeFilter` macro or an explicit `WHERE` clause so each evaluation scans only recent data instead of the whole table. Refer to [Macros](/docs/plugins/grafana-databricks-datasource/latest/query-editor/#macros).
- **Return a small result.** Aggregate to a single numeric value rather than selecting many rows. Avoid `SELECT *`.
- **Choose a sensible evaluation interval.** Frequent evaluation of heavy queries multiplies warehouse load and cost.

> Caution
>
> A failing alert query is retried according to the data source’s retry settings. A misconfigured rule that queries a large, unfiltered table can generate a storm of retried queries that consume significant memory and can crash Grafana. Always filter alert queries and test them before you save the rule. Refer to [Grafana runs out of memory or crashes](/docs/plugins/grafana-databricks-datasource/latest/troubleshooting/#grafana-runs-out-of-memory-or-crashes).

## Retry and timeout settings

The [retry and timeout settings](/docs/plugins/grafana-databricks-datasource/latest/configure/#additional-configuration-options) you configure on the data source also apply to alert rule evaluations:

- **Timeout** - If a Databricks SQL warehouse is idle, the first query can be slow while the warehouse starts. Set the **Timeout** high enough that scheduled evaluations don’t fail while the warehouse resumes. Consider a serverless SQL warehouse for faster startup.
- **Retries** and **Retry timeout** - Alert evaluations are retried on transient errors using the same retry settings as dashboard queries. Refer to [Troubleshooting](/docs/plugins/grafana-databricks-datasource/latest/troubleshooting/#query-retries) for the list of errors that trigger a retry.

## Handle No Data and Error states

A Databricks SQL warehouse that has scaled to zero can take time to resume, so the first scheduled evaluation after an idle period might time out and put the rule in the **Error** state. Plan for this:

- Configure how the rule behaves when it returns no data or encounters an error. Refer to [Configure no data and error handling](/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/#configure-no-data-and-error-handling).
- Set the **Timeout** and evaluation interval high enough to tolerate warehouse startup, or use a serverless SQL warehouse for faster resume times.

For more detail, refer to [Alert evaluation times out while the SQL warehouse starts](/docs/plugins/grafana-databricks-datasource/latest/troubleshooting/#alert-evaluation-times-out-while-the-sql-warehouse-starts).
