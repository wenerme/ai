---
title: "Azure Cosmos DB query editor | Grafana Enterprise Plugins documentation"
description: "Use the Azure Cosmos DB query editor to build and run NoSQL queries in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Azure Cosmos DB query editor

The Azure Cosmos DB query editor lets you create and run Azure Cosmos DB for NoSQL queries in Grafana.

## Before you begin

Before you use the query editor, [configure the Azure Cosmos DB data source](/docs/plugins/grafana-azurecosmosdb-datasource/latest/configure/).

## Key concepts

If you’re new to Azure Cosmos DB, these terms are used throughout the query editor:

Expand table

| Term                       | Description                                                                                                                                                                                                    |
|----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Database**               | A logical container for one or more Azure Cosmos DB containers.                                                                                                                                                |
| **Container**              | The unit that stores your items (documents) and is partitioned across physical partitions.                                                                                                                     |
| **Partition key**          | The property path Azure Cosmos DB uses to distribute items across partitions (for example, `/deviceId`). In the query editor, the **PartitionKey** field takes a value for that property, not the path itself. |
| **Single-partition query** | A query scoped to one partition by entering a value in the **PartitionKey** field.                                                                                                                             |
| **Multi-partition query**  | A query that runs across all partitions when the **PartitionKey** field is empty. This query type has keyword limitations.                                                                                     |

## Build a query

Use the query editor header to scope the query, then write your NoSQL query in the editor:

Expand table

| Field            | Description                                                                                                                                                                                                         |
|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Database**     | Select a database.                                                                                                                                                                                                  |
| **Container**    | After you select a database, select a container.                                                                                                                                                                    |
| **PartitionKey** | Enter the partition key **value** (for example, `device-01`), not the partition key path or property name (for example, `/deviceId`). Leave this field empty to run a multi-partition query, which has limitations. |
| **Query**        | Enter an Azure Cosmos DB for NoSQL query. Refer to [Queries in Azure Cosmos DB for NoSQL](https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/query/) for more information about writing queries.               |

To create a query:

1. Select a **Database**.
2. Select a **Container**.
3. Optionally, enter a value in the **PartitionKey** field to run a single-partition query.
4. Enter your query in the **Query** editor.
5. Click outside the editor or press the run shortcut to run the query.

Multi-partition queries don’t support the `TOP`, `ORDER BY`, `OFFSET`, `LIMIT`, `Aggregates`, `DISTINCT`, and `GROUP BY` keywords. To use these keywords, enter a value in the **PartitionKey** field to run a single-partition query.

To visualize results as a time series, return a timestamp field and one or more numeric fields, and filter the timestamp with a time macro.

## Query examples

The following examples use the Azure Cosmos DB for NoSQL query language. The alias `c` refers to the items in the selected container.

Return recent telemetry for a device, scoped to the dashboard time range:

SQL [Copy code to clipboard] Copy

```sql
SELECT c.timestamp, c.temperature, c.humidity
FROM c
WHERE c.deviceId = "device-01" AND $__timeFilter(c.timestamp)
```

Count items by status over the time range. Aggregations and `GROUP BY` require a single-partition query, so set the **PartitionKey** field:

SQL [Copy code to clipboard] Copy

```sql
SELECT COUNT(1) AS total, c.status
FROM c
WHERE $__timeFilter(c.createdAt)
GROUP BY c.status
```

Return the most recent items using `$__timeFrom` to filter from the start of the time range:

SQL [Copy code to clipboard] Copy

```sql
SELECT c.timestamp, c.orderId, c.amount
FROM c
WHERE $__timeFrom(c.timestamp)
```

## Use cases

Use the query editor to support scenarios such as:

- **Monitor IoT telemetry:** Chart sensor readings such as temperature or humidity over time by returning a timestamp and numeric fields, filtered with `$__timeFilter`.
- **Track application events:** Count events, orders, or errors by category with a single-partition `GROUP BY` query to power stat and bar chart panels.
- **Audit recent activity:** Return the latest records within the dashboard time range for table panels, using `$__timeFrom` to limit results to the current window.

## Macros

To simplify syntax and allow for dynamic parts, such as date range filters, a query can contain macros.

The following example uses a macro that applies the Grafana time range filter:

SQL [Copy code to clipboard] Copy

```sql
SELECT c.date_time, c.data_stuff
FROM c
WHERE $__timeFilter(c.date_time)
```

The query editor supports the following macros:

Expand table

| Macro                   | Description                                                                                                                                                                                       |
|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `$__timeFilter(column)` | Replaced by a condition that filters the data, using the provided column, based on the panel time range. Output example: `column >= '2024-05-10T16:00:00Z' AND column <= '2024-05-10T17:00:00Z'`. |
| `$__timeFrom(column)`   | Replaced by a condition that filters the data, using the provided column, based on the panel’s **from** time. Output example: `column >= '2024-05-10T16:00:00Z'`.                                 |
| `$__timeTo(column)`     | Replaced by a condition that filters the data, using the provided column, based on the panel’s **to** time. Output example: `column <= '2024-05-10T17:00:00Z'`.                                   |

## Next steps

- [Use templates and variables](/docs/plugins/grafana-azurecosmosdb-datasource/latest/template-variables/)
- [Set up alerting](/docs/plugins/grafana-azurecosmosdb-datasource/latest/alerting/)
- [Troubleshoot the Azure Cosmos DB data source](/docs/plugins/grafana-azurecosmosdb-datasource/latest/troubleshooting/)
