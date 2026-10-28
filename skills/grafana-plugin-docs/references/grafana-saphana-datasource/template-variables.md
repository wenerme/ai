---
title: "SAP HANA template variables | Grafana Enterprise Plugins documentation"
description: "Create template variables for SAP HANA in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Templates and variables

Template variables allow you to create dynamic, reusable dashboards. Instead of hard-coding values like table names or filter criteria, you can use variables that users can change from a drop-down menu.

For more information about variables in Grafana, refer to [Templates and variables](https://grafana.com/docs/grafana/latest/dashboards/variables/).

## Supported variable types

You can use most Grafana variable types in dashboards that query SAP HANA. The **Query** type is backed by the SAP HANA data source and runs an SQL query to fetch values. The other types listed below are provided by Grafana and work regardless of the data source. The **Ad hoc filters** type isn’t supported by this data source.

Expand table

| Variable type | Description                                                               |
|---------------|---------------------------------------------------------------------------|
| Query         | Dynamically fetches values from your SAP HANA database using SQL queries. |
| Custom        | Manually define a comma-separated list of values.                         |
| Text box      | Accept free-form user input.                                              |
| Constant      | Define a hidden constant value.                                           |

## Create a query variable

Query variables dynamically fetch values from your SAP HANA database using SQL queries.

To add a new SAP HANA query variable:

1. From the **Dashboard settings** gear icon, click **Variables**.
2. Click **New variable**.
3. Select **Query** as the variable type.
4. Select the SAP HANA data source.
5. Enter your SQL query.
6. Click **Apply**.

For general instructions, refer to [Add a query variable](https://grafana.com/docs/grafana/latest/dashboards/variables/add-template-variables/#add-a-query-variable).

### Single column queries

The most common approach is to return a single column of distinct values.

**Example:**

The following query returns the distinct list of `username` from the `users` table:

SQL ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

```sql
SELECT DISTINCT("username") FROM "users"
```

### Key-value variable queries

You can create a variable with different display text and underlying values by returning two columns named `__text` and `__value`.

**Example:**

The following query uses `host_name` as the display text and `host_id` as the actual value:

SQL ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

```sql
SELECT host_name AS "__text", host_id AS "__value" FROM hosts_list_table
```

> Note
>
> The `__text` column value should be unique. If it’s not unique, the first value is used. Options in the drop-down have a friendly name as text and an ID as the value.

### Query result behavior

The plugin handles query results as follows:

- **1 column:** The column values become both the display text and the variable value.
- **2 columns:** If columns are named `__text` and `__value`, they’re used for display and value respectively. Otherwise, the first column is used for display and the second for value.
- **More than 2 columns:** If columns named `__text` and `__value` exist, they’re used regardless of other columns. Otherwise, only the first column is used for both text and value.

## Use variables in queries

You can use Grafana template variables anywhere in your SAP HANA queries. Variables are replaced with their current values when the query executes.

By default, the data source quotes variable values with single quotes, so a value inserts as `'london'` and a multi-value selection inserts as `'london','perth'`. To change this behavior, use a format modifier as described in [Format variable values](https://grafana.com/docs/plugins/grafana-saphana-datasource/latest/template-variables/#format-variable-values).

> Note
>
> The default single-quote formatting doesn’t escape single quotes within a value, so a value such as `O'Brien` produces invalid SQL. Avoid the default quoting for values that might contain single quotes.

### Single value variables

Use the standard variable syntax to insert a single value:

SQL ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

```sql
-- Query with variable
SELECT * FROM "users" WHERE "city" = ${city}

-- Expands to (when city = 'london')
SELECT * FROM "users" WHERE "city" = 'london'
```

### Numeric variables

Variables also work with numeric fields. In this example, `${age}` is a text box variable that accepts numbers:

SQL ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

```sql
-- Query with variable
SELECT * FROM "users" WHERE "age" > ${age}

-- Expands to (when age = 36)
SELECT * FROM "users" WHERE "age" > '36'
```

### Multi-value variables

If your variable returns multiple values (multi-select enabled), use it with the `IN` clause. Note the parentheses around the variable:

SQL ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

```sql
-- Query with multi-value variable
SELECT * FROM "users" WHERE "city" IN (${cities})

-- Expands to (when cities = london, perth, delhi)
SELECT * FROM "users" WHERE "city" IN ('london','perth','delhi')
```

You can also use the shorthand notation without curly braces:

SQL ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

```sql
SELECT * FROM "users" WHERE "city" IN ($cities)
```

### Chained variables

You can build dependent variables where one query variable filters its results using the value of another. This creates cascading drop-downs, for example a schema variable that narrows a table variable.

In this example, a `${schema}` variable is defined first, then a `${table}` variable uses it:

SQL ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

```sql
-- Variable: schema
SELECT SCHEMA_NAME FROM SYS.SCHEMAS ORDER BY SCHEMA_NAME

-- Variable: table (depends on schema)
SELECT TABLE_NAME FROM SYS.TABLES WHERE SCHEMA_NAME IN (${schema}) ORDER BY TABLE_NAME
```

When you change the `${schema}` selection, Grafana re-runs the `table` variable query and updates its options.

## Variable syntax

The SAP HANA plugin supports multiple variable syntax formats:

Expand table

| Syntax            | Example   | Description                             |
|-------------------|-----------|-----------------------------------------|
| `$variablename`   | `$host`   | Simple syntax                           |
| `${variablename}` | `${host}` | Advanced syntax with formatting options |

### Format variable values

By default, the data source inserts variable values with single quotes. When you need different formatting, for example an unquoted value or a custom delimiter, append a format modifier to the variable name.

Expand table

| Syntax                | Result (single value) | Result (multi-value) |
|-----------------------|-----------------------|----------------------|
| `${city}`             | `'london'`            | `'london','perth'`   |
| `${city:raw}`         | `london`              | `london,perth`       |
| `${city:singlequote}` | `'london'`            | `'london','perth'`   |
| `${city:doublequote}` | `"london"`            | `"london","perth"`   |
| `${city:csv}`         | `london`              | `london,perth`       |

For the full list of format options, refer to [Advanced variable format options](https://grafana.com/docs/grafana/latest/dashboards/variables/variable-syntax/#advanced-variable-format-options).

## Additional resources

- [Templates and variables](https://grafana.com/docs/grafana/latest/dashboards/variables/)
- [Add a query variable](https://grafana.com/docs/grafana/latest/dashboards/variables/add-template-variables/#add-a-query-variable)
- [Variable syntax](https://grafana.com/docs/grafana/latest/dashboards/variables/variable-syntax/)
