---
title: "CockroachDB template variables | Grafana Enterprise Plugins documentation"
description: "Use template variables with the CockroachDB data source in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# CockroachDB template variables

Template variables let you create dynamic, reusable dashboards. Instead of hard-coding values like database names, table names, or regions into your queries, you can use variables that appear as drop-down menus at the top of the dashboard. When a user changes a variable’s value, every panel that references it updates automatically.

## Before you begin

- [Configure the CockroachDB data source](/docs/plugins/grafana-cockroachdb-datasource/latest/configure/).
- Familiarize yourself with [Grafana template variables](/docs/grafana/latest/dashboards/variables/).

## Supported variable types

The CockroachDB data source supports the following variable types.

Expand table

| Variable type   | Supported | Description                                                            |
|-----------------|-----------|------------------------------------------------------------------------|
| **Query**       | Yes       | Fetches values dynamically by running a SQL query against CockroachDB. |
| **Custom**      | Yes       | Uses a manually defined list of values.                                |
| **Data source** | Yes       | Lets users switch between CockroachDB data source instances.           |

## Create a query variable

Query variables populate their options by running a SQL query against your CockroachDB instance. The query must return a single column – each row becomes an option in the variable drop-down.

To create a query variable:

1. Navigate to **Dashboard settings** &gt; **Variables**.
2. Click **Add variable**.
3. Select **Query** as the variable type.
4. Select your CockroachDB data source.
5. Enter a SQL query that returns the values you want.
6. Optionally, set **Refresh** to control when the variable re-runs its query:

   - **On dashboard load:** Re-runs the query each time the dashboard loads.
   - **On time range change:** Re-runs the query when the dashboard time range changes.
7. Click **Apply**.

## Variable query examples

The following examples show common SQL queries for populating variables.

### List all databases

SQL [Copy code to clipboard] Copy

```sql
SELECT database_name FROM information_schema.databases
```

### List all tables

SQL [Copy code to clipboard] Copy

```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
```

### List distinct values from a column

Useful for building region, environment, or status selectors:

SQL [Copy code to clipboard] Copy

```sql
SELECT DISTINCT region FROM clusters ORDER BY region
```

### Cascading variables

You can reference one variable inside another variable’s query to create dependent drop-down menus. For example, if you have a `$database` variable, you can create a `$table` variable that lists tables for the selected database:

SQL [Copy code to clipboard] Copy

```sql
SELECT table_name FROM information_schema.tables
WHERE table_catalog = '$database'
AND table_schema = 'public'
```

When the user changes the `$database` selection, the `$table` drop-down automatically updates.

### List CockroachDB cluster nodes

SQL [Copy code to clipboard] Copy

```sql
SELECT DISTINCT node_id::text FROM crdb_internal.gossip_nodes ORDER BY 1
```

## Use variables in queries

After creating variables, reference them in your CockroachDB panel queries using the `$variable` syntax.

### Single-value variable

When a variable holds one value at a time, use it directly in a comparison:

SQL [Copy code to clipboard] Copy

```sql
SELECT created_at AS time, temperature
FROM sensor_readings
WHERE region = '$region'
AND $__timeFilter(created_at)
ORDER BY created_at ASC
```

### Multi-value variable

When a variable allows multiple selections, use `IN` to match any of the selected values:

SQL [Copy code to clipboard] Copy

```sql
SELECT created_at AS time, temperature, region
FROM sensor_readings
WHERE region IN ($region)
AND $__timeFilter(created_at)
ORDER BY created_at ASC
```

### Variable in a GROUP BY clause

You can also use variables to control grouping dynamically:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  date_trunc('$interval', created_at) AS time,
  AVG(response_time_ms) AS avg_response_time
FROM requests
WHERE $__timeFilter(created_at)
GROUP BY time
ORDER BY time ASC
```

In this example, `$interval` is a custom variable with options like `minute`, `hour`, and `day`, letting users control the time granularity.

For more information about variable syntax, refer to [Variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/).
