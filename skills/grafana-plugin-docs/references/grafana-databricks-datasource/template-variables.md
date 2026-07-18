---
title: "Template variables and the Databricks data source | Grafana Enterprise Plugins documentation"
description: "This document describes the templates and variables for the Databricks data source."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Databricks template variables

Instead of hard-coding details such as server, application, and sensor names in metric queries, you can use variables. Grafana displays these variables in drop-down select boxes at the top of the dashboard to help you change the data displayed in your dashboard. Grafana refers to such variables as **template variables**.

After creating a variable, you can use it in your Databricks queries by using [Variable syntax](/docs/grafana/latest/variables/syntax/). For more information about variables, refer to [Templates and variables](/docs/grafana/latest/variables/).

## Create Databricks query variables

To add a new Databricks query variable, refer to [Add a query variable](/docs/grafana/latest/variables/variable-types/add-query-variable/).

To create a query variable for Databricks, write a SQL query that returns your desired variable options:

SQL [Copy code to clipboard] Copy

```sql
SELECT DISTINCT region FROM sales_data ORDER BY region
```

This query creates a drop-down with all unique regions from the `sales_data` table. You can enable multi-value selection or include an “All” option in the variable settings.

### Set separate value and display text

If your query returns a single column, Grafana uses that column for both the variable value and its display text. To show a friendly label while submitting a different value to your queries, return two columns: the first column is the value, and the second column is the display text.

SQL [Copy code to clipboard] Copy

```sql
SELECT region_code, region_name FROM sales_data ORDER BY region_name
```

In this example, the drop-down shows `region_name`, but the variable interpolates to the corresponding `region_code` in your queries.

### Create dependent variables

You can reference an existing variable in the query that defines another variable to create dependent, or chained, variables. For example, if you have a `region` variable, define a `city` variable whose options depend on the selected region:

SQL [Copy code to clipboard] Copy

```sql
SELECT DISTINCT city FROM sales_data WHERE region = '${region}' ORDER BY city
```

When the selected `region` changes, Grafana re-runs the `city` query and updates its options.

## Use variables in queries

After you create a variable, reference it in a query with `$variable` or `${variable}` syntax. When the query runs, Grafana interpolates the variable, replacing it with the selected value or values before sending the SQL to Databricks.

Match the interpolated value to the column’s data type:

- **String values** must be quoted. Wrap the variable in single quotes, for example `WHERE region = '${region}'`.
- **Numeric values** are unquoted, for example `WHERE id = ${id}`.

For multi-value variables, use a [variable format](/docs/grafana/latest/dashboards/variables/variable-syntax/) so the generated SQL is valid. For example, use `${region:singlequote}` for a quoted, comma-separated list suitable for an `IN` clause:

SQL [Copy code to clipboard] Copy

```sql
SELECT * FROM sales_data
WHERE region IN (${region:singlequote})
```

> Caution
>
> Variable interpolation behavior changed between major plugin versions. After a major upgrade, queries that relied on older interpolation behavior can return a data type mismatch and show `no data`, and data links that include variables can have different URL encoding. After upgrading, review queries that use variables and confirm quoting and data types are correct. Refer to [No data after upgrading the plugin](/docs/plugins/grafana-databricks-datasource/latest/troubleshooting/#no-data-after-upgrading-the-plugin).

You can also use built-in macros, such as `$__timeFilter`, in your queries. Refer to [Macros](/docs/plugins/grafana-databricks-datasource/latest/query-editor/#macros) for the full list.
