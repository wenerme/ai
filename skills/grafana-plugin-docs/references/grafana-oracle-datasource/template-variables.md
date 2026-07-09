---
title: "Oracle template variables | Grafana Enterprise Plugins documentation"
description: "Use template variables with the Oracle data source to create dynamic, reusable dashboards in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Oracle template variables

Use template variables to create dynamic, reusable dashboards. Instead of hard-coding details such as server names, applications, or regions in your queries, you can use variables that appear as drop-down selectors at the top of the dashboard.

## Before you begin

- [Configure the Oracle data source](/docs/plugins/grafana-oracle-datasource/latest/configure/).
- Understand [Grafana template variables](/docs/grafana/latest/dashboards/variables/).

## Supported variable types

Expand table

| Variable type | Supported |
|---------------|-----------|
| Query         | Yes       |
| Custom        | Yes       |
| Data source   | Yes       |
| Interval      | Yes       |

## Create a query variable

To create a query variable:

1. Navigate to **Dashboard settings** &gt; **Variables**.
2. Click **Add variable**.
3. Select **Query** as the variable type.
4. Select the Oracle data source.
5. Enter a SQL query that returns the values you want as variable options.

For detailed instructions, refer to [Add a query variable](/docs/grafana/latest/dashboards/variables/add-template-variables/#add-a-query-variable).

## Query examples

An Oracle variable query returns column values that populate the variable drop-down.

### Single column

Return all values from a single column:

SQL [Copy code to clipboard] Copy

```sql
SELECT hostname FROM host
```

### Multiple columns

A query can return multiple columns. Grafana creates a combined list from all returned columns:

SQL [Copy code to clipboard] Copy

```sql
SELECT host.hostname, other_host.hostname2
FROM host
JOIN other_host ON host.city = other_host.city
```

### Key/value variables

Return two columns named `__text` and `__value` to create a variable where the display name differs from the stored value. The `__text` column values must be unique:

SQL [Copy code to clipboard] Copy

```sql
SELECT hostname AS __text, id AS __value
FROM host
```

### Time-dependent variables

To use time range macros like `$__timeFilter(column)` in your variable query, set the variable refresh to **On Time Range Change**:

SQL [Copy code to clipboard] Copy

```sql
SELECT event_name
FROM event_log
WHERE $__timeFilter(time_column)
```

### Chained variables

Create nested variables by referencing one variable inside another. For example, create a `region` variable, then use it to filter a `hosts` variable:

SQL [Copy code to clipboard] Copy

```sql
SELECT hostname
FROM host
WHERE region = '$region'
```

## Use variables in queries

Reference variables in your Oracle queries using the `$variable` or `${variable}` syntax.

### Multi-value variables

If a variable allows multiple selections, use the `IN` operator instead of `=`:

SQL [Copy code to clipboard] Copy

```sql
SELECT *
FROM host
WHERE hostname IN ($hostname)
```

Grafana interpolates multi-value variables as single-quoted, comma-separated values (for example, `'host1','host2','host3'`).

### Variable syntax reference

For the full variable syntax including advanced formatting options, refer to [Variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/).
