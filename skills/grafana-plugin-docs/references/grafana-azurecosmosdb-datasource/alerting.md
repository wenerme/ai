---
title: "Azure Cosmos DB alerting | Grafana Enterprise Plugins documentation"
description: "Use the Azure Cosmos DB data source with Grafana alerting to create alert rules on your data."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Azure Cosmos DB alerting

The Azure Cosmos DB data source supports Grafana alerting. Because the plugin runs queries in the backend, you can use Azure Cosmos DB for NoSQL queries as the source for Grafana-managed alert rules.

## Before you begin

Before you create an alert rule, ensure you have:

- [Configured the Azure Cosmos DB data source](/docs/plugins/grafana-azurecosmosdb-datasource/latest/configure/).
- A query that returns numeric data. Alert rules evaluate numeric values, so your query must return one or more numeric fields.
- Familiarity with [Grafana alerting](/docs/grafana/latest/alerting/).

## How alerting works with the data source

Grafana-managed alert rules run a query on a schedule and evaluate the results against a condition. For the Azure Cosmos DB data source:

- The rule runs your Azure Cosmos DB for NoSQL query in the backend on the rule’s evaluation interval.
- The query result passes through one or more expressions, such as **Reduce** or **Threshold**, to produce a single numeric value per series.
- Grafana compares that value to the alert condition to determine whether the alert fires.

## Create an alert rule

To create an alert rule that uses the Azure Cosmos DB data source:

1. Navigate to **Alerting** &gt; **Alert rules**.
2. Click **New alert rule**.
3. Enter a name for the rule.
4. Under **Define query and alert condition**, select the **Azure Cosmos DB** data source.
5. In the query editor, select the **Database** and **Container**, and optionally enter a value in the **PartitionKey** field.
6. Enter an Azure Cosmos DB for NoSQL query that returns numeric data. Use the `$__timeFilter`, `$__timeFrom`, and `$__timeTo` macros to scope the query to the evaluation time range.
7. Add expressions to reduce the query result to a single value and define the threshold that triggers the alert.
8. Set the evaluation behavior, including the evaluation group and interval.
9. Add labels and notifications, then click **Save rule and exit**.

## Alert query examples

Alert queries must return numeric data. Aggregate functions such as `COUNT`, `MAX`, and `AVG` require a single-partition query, so enter a value in the **PartitionKey** field when you use them.

Alert when the number of error events in the time range exceeds a threshold. This query returns a single numeric value, which you compare with a **Threshold** expression:

SQL [Copy code to clipboard] Copy

```sql
SELECT VALUE COUNT(1)
FROM c
WHERE c.level = "error" AND $__timeFilter(c.timestamp)
```

Alert on the maximum temperature reported by a device:

SQL [Copy code to clipboard] Copy

```sql
SELECT VALUE MAX(c.temperature)
FROM c
WHERE c.deviceId = "device-01" AND $__timeFilter(c.timestamp)
```

Return a numeric time series and let a **Reduce** expression collapse it to a single value before the threshold check:

SQL [Copy code to clipboard] Copy

```sql
SELECT c.timestamp, c.temperature
FROM c
WHERE c.deviceId = "device-01" AND $__timeFilter(c.timestamp)
```

## Query considerations

Keep the following considerations in mind when you write alerting queries:

- **Return numeric data.** The query must return at least one numeric field for the alert condition to evaluate.
- **Scope the time range with macros.** Use `$__timeFilter(column)`, `$__timeFrom(column)`, or `$__timeTo(column)` so the query only evaluates data in the rule’s time range. For more information, refer to [Azure Cosmos DB query editor](/docs/plugins/grafana-azurecosmosdb-datasource/latest/query-editor/#macros).
- **Set a partition key when possible.** Multi-partition queries don’t support the `TOP`, `ORDER BY`, `OFFSET`, `LIMIT`, `Aggregates`, `DISTINCT`, and `GROUP BY` keywords. Enter a value in the **PartitionKey** field to run a single-partition query when your alert query needs these keywords.
- **Limit the result set.** Narrow the time range and filter the data to reduce request units (RU/s) consumed on each evaluation.

## Next steps

- [Configure the Azure Cosmos DB data source](/docs/plugins/grafana-azurecosmosdb-datasource/latest/configure/)
- [Azure Cosmos DB query editor](/docs/plugins/grafana-azurecosmosdb-datasource/latest/query-editor/)
- [Troubleshoot the Azure Cosmos DB data source](/docs/plugins/grafana-azurecosmosdb-datasource/latest/troubleshooting/)
