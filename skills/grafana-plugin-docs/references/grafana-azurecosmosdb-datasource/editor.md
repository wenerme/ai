---
title: "Azure Cosmos DB query editor | Grafana Enterprise Plugins documentation"
description: "This document describes the Azure Cosmos DB query editor"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Azure Cosmos DB query editor

Grafana provides a query editor for Azure Cosmos DB, which allows you to create and execute Azure Cosmos DB queries.

## Query

- **Database** - Select a database
- **Container** - After a database has been selected, select a container
- **Partition Key** - Enter a partition key to make a single partition query. Leave this field empty to make a multi partition query with limitations. See [Known limitations](/docs/plugins/grafana-azurecosmosdb-datasource/latest/_index/#known-limitations)
- **Query** - Enter a Cosmos DB NoSQL query. Refer to [Queries in Azure Cosmos DB for NoSQL](https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/query/) for more information on writing queries. Multi partition queries are not supported with these keywords: `TOP` `ORDER BY` `OFFSET` `LIMIT` `Aggregates` `DISTINCT` `GROUP BY`. To query a single partition set the Partition Key field.

## Macros

To simplify syntax and to allow for dynamic parts, like date range filters, the query can contain macros.

Here is an example of a query with a macro that will use Grafana’s time filter:

SQL [Copy code to clipboard] Copy

```sql
SELECT c.date_time, c.data_stuff
FROM c
WHERE $__timeFilter(c.date_time)
```

- **$\_\_timeFilter(columnName)** - Replaced by a conditional that filters the data (using the provided column) based on the time **range** of the panel. Output example: `columnName >= '2024-05-10T16:00:00Z' AND columnName <= '2024-05-10T17:00:00Z'`
- **$\_\_fromTime(columnName)** - Replaced by a conditional that filters the data (using the provided column) based on the **from** time of the panel. Output example: `columnName >= '2024-05-10T16:00:00Z'`
- **$\_\_toTime(columnName)** - Replaced by a conditional that filters the data (using the provided column) based on the **to** time of the panel. Output example: `columnName <= '2024-05-10T16:00:00Z'`
