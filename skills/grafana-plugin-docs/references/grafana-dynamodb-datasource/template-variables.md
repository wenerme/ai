---
title: "DynamoDB template variables | Grafana Enterprise Plugins documentation"
description: "Use template variables with the DynamoDB data source in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# DynamoDB template variables

Use template variables to create dynamic, reusable dashboards that let you change query parameters without editing individual panels. For general information about template variables, refer to [Templates and variables](/docs/grafana/latest/dashboards/variables/).

## Before you begin

- [Configure the DynamoDB data source](/docs/plugins/grafana-dynamodb-datasource/latest/configure/).
- Understand [Grafana template variables](/docs/grafana/latest/dashboards/variables/).

## Supported variable types

The DynamoDB data source supports the following variable types:

Expand table

| Variable type | Supported |
|---------------|-----------|
| Query         | Yes       |
| Custom        | Yes       |
| Data source   | Yes       |

## Create a query variable

The variable query editor uses the same PartiQL code editor as the main query editor.

To create a query variable:

1. Navigate to **Dashboard settings** &gt; **Variables**.
2. Click **Add variable**.
3. Select **Query** as the variable type.
4. Select the DynamoDB data source.
5. Enter a PartiQL query in the query editor.
6. Click **Run query** to preview the values.

> Caution
>
> Variable queries run each time the variable is refreshed. A `SELECT` without a partition key in the `WHERE` clause results in a full table scan. Use targeted queries to avoid excessive read capacity consumption.

## Query return format

The query editor determines variable values based on the number of columns your query returns:

Expand table

| Columns returned    | Behavior                                                                                                                                |
|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| One column          | Each value is used as both the display text and the variable value.                                                                     |
| Two or more columns | The first column is used as the variable value (ID), and the second column is used as the display text. Additional columns are ignored. |

### Single-column example

This query returns a list of unique customer IDs for use as variable values:

SQL [Copy code to clipboard] Copy

```sql
SELECT DISTINCT customerId FROM "orders"
```

Each `customerId` value becomes both the display text and the substituted value.

### Two-column example

This query returns an ID and a human-readable name:

SQL [Copy code to clipboard] Copy

```sql
SELECT sensorId, sensorName FROM "sensors"
```

The variable drop-down displays `sensorName` values, but the selected `sensorId` is substituted into queries.

## Use variables in queries

Reference template variables in your PartiQL queries using the `$variable` or `${variable}` syntax. Single-value variables are substituted as-is, so you must include quotes around string values in your query:

SQL [Copy code to clipboard] Copy

```sql
SELECT * FROM "orders" WHERE customerId = '$customer'
```

Or with the braced syntax:

SQL [Copy code to clipboard] Copy

```sql
SELECT timestamp AS time, metric_value
FROM "metrics"
WHERE sensorId = '${sensor}'
ORDER BY timestamp
```

For numeric values, omit the quotes:

SQL [Copy code to clipboard] Copy

```sql
SELECT * FROM "orders" WHERE orderTotal > $threshold
```

## Multi-value variables

When a variable allows multiple selections, the DynamoDB data source formats the values as a comma-separated, single-quoted list. For example, if a user selects `A`, `B`, and `C`, the variable expands to `'A','B','C'`.

Use multi-value variables with the `IN` operator:

SQL [Copy code to clipboard] Copy

```sql
SELECT * FROM "orders" WHERE status IN ($status)
```

If the user selects `pending` and `shipped`, this expands to:

SQL [Copy code to clipboard] Copy

```sql
SELECT * FROM "orders" WHERE status IN ('pending','shipped')
```

## Next steps

- Learn how to write queries in the [DynamoDB query editor](/docs/plugins/grafana-dynamodb-datasource/latest/query-editor/).
- [Set up alerting](/docs/plugins/grafana-dynamodb-datasource/latest/alerting/) based on DynamoDB data.
