---
title: "Azure Cosmos DB template variables | Grafana Enterprise Plugins documentation"
description: "Use template variables to build dynamic Azure Cosmos DB dashboards in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Azure Cosmos DB template variables

Instead of hard-coding details such as databases, containers, partition keys, and `WHERE` clause filters, you can use variables. Grafana lists these variables in drop-down select boxes at the top of the dashboard to help you change the data displayed in your dashboard. Grafana refers to such variables as template variables.

## Before you begin

Before you create template variables:

- [Configure the Azure Cosmos DB data source](/docs/plugins/grafana-azurecosmosdb-datasource/latest/configure/).
- Familiarize yourself with Grafana template variables. For an introduction, refer to the following topics:

  - [Variables](/docs/grafana/latest/dashboards/variables/)
  - [Add and manage variables](/docs/grafana/latest/dashboards/variables/add-template-variables/)
  - [Variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/)

## Supported variable types

The Azure Cosmos DB data source provides its own query variable editor. Other variable types, such as **Custom**, **Constant**, **Interval**, and **Data source**, are standard Grafana features and are also available.

Expand table

| Variable type | Supported |
|---------------|-----------|
| Query         | Yes       |
| Custom        | Yes       |
| Data source   | Yes       |

## Add a query variable

To add an Azure Cosmos DB query variable:

1. Navigate to **Dashboard settings** &gt; **Variables**.
2. Click **Add variable**.
3. Select **Query** as the variable type.
4. Select your Azure Cosmos DB data source.
5. Select a **Query Type**.
6. Click **Run query**, then confirm the values under **Preview of values**.

The following query types are available:

Expand table

| Query Type     | Description                                                                                                                                             |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Databases**  | Returns all of the available databases.                                                                                                                 |
| **Containers** | After you select a database, returns all of the available containers in that database.                                                                  |
| **Query**      | After you select a database and container, runs an Azure Cosmos DB for NoSQL query and uses the first field of each returned item as a variable option. |

## Query variable examples

For the **Query** query type, write a query that returns a single field. Use the `VALUE` keyword to return a flat list of scalar values instead of objects.

Return the distinct set of regions to populate a region variable:

SQL [Copy code to clipboard] Copy

```sql
SELECT DISTINCT VALUE c.region FROM c
```

Return the distinct set of status values:

SQL [Copy code to clipboard] Copy

```sql
SELECT DISTINCT VALUE c.status FROM c
```

## Create dependent variables

Because the **Containers** query type requires a database, you can chain variables so that one variable’s options depend on another.

To create a container variable that depends on a database variable:

1. Create a **Databases** query variable, for example named `database`.
2. Create a second query variable and select the **Containers** query type.
3. In the container variable’s **Database** field, select the `database` variable.

When you change the database variable on the dashboard, the container variable updates its options automatically.

## Use variables in queries

Reference variables in the query editor using the `$variable` syntax. The data source interpolates variables in the query text and in the **Database**, **Container**, and **PartitionKey** fields.

Filter a query by a single-value variable:

SQL [Copy code to clipboard] Copy

```sql
SELECT c.timestamp, c.temperature
FROM c
WHERE c.region = '$region' AND $__timeFilter(c.timestamp)
```

For a multi-value variable, the data source formats the selected values as a quoted, comma-separated list, so you can use the variable with the `IN` operator:

SQL [Copy code to clipboard] Copy

```sql
SELECT c.timestamp, c.status
FROM c
WHERE c.status IN ($status) AND $__timeFilter(c.timestamp)
```

## Next steps

- [Azure Cosmos DB query editor](/docs/plugins/grafana-azurecosmosdb-datasource/latest/query-editor/)
- [Set up alerting](/docs/plugins/grafana-azurecosmosdb-datasource/latest/alerting/)
