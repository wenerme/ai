---
title: "SAP HANA template variables | Grafana Enterprise Plugins documentation"
description: "Create template variables for SAP HANA in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Templates and variables

Template variables allow you to create dynamic, reusable dashboards. Instead of hard-coding values like table names or filter criteria, you can use variables that users can change from a drop-down menu.

For more information about variables in Grafana, refer to [Templates and variables](/docs/grafana/latest/dashboards/variables/).

## Supported variable types

The SAP HANA plugin provides data source support for the following Grafana variable types:

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

For general instructions, refer to [Add a query variable](/docs/grafana/latest/dashboards/variables/add-template-variables/#add-a-query-variable).

### Single column queries

The most common approach is to return a single column of distinct values.

**Example:**

The following query returns the distinct list of `username` from the `users` table:

SQL [Copy code to clipboard] Copy

```sql
SELECT DISTINCT("username") FROM "users"
```

### Key-value variable queries

You can create a variable with different display text and underlying values by returning two columns named `__text` and `__value`.

**Example:**

The following query uses `host_name` as the display text and `host_id` as the actual value:

SQL [Copy code to clipboard] Copy

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

### Single value variables

Use the standard variable syntax to insert a single value:

SQL [Copy code to clipboard] Copy

```sql
-- Query with variable
SELECT * FROM "users" WHERE "city" = ${city}

-- Expands to (when city = 'london')
SELECT * FROM "users" WHERE "city" = 'london'
```

### Numeric variables

Variables also work with numeric fields. In this example, `${age}` is a text box variable that accepts numbers:

SQL [Copy code to clipboard] Copy

```sql
-- Query with variable
SELECT * FROM "users" WHERE "age" > ${age}

-- Expands to (when age = 36)
SELECT * FROM "users" WHERE "age" > '36'
```

### Multi-value variables

If your variable returns multiple values (multi-select enabled), use it with the `IN` clause. Note the parentheses around the variable:

SQL [Copy code to clipboard] Copy

```sql
-- Query with multi-value variable
SELECT * FROM "users" WHERE "city" IN (${cities})

-- Expands to (when cities = london, perth, delhi)
SELECT * FROM "users" WHERE "city" IN ('london','perth','delhi')
```

You can also use the shorthand notation without curly braces:

SQL [Copy code to clipboard] Copy

```sql
SELECT * FROM "users" WHERE "city" IN ($cities)
```

## Variable syntax

The SAP HANA plugin supports multiple variable syntax formats:

Expand table

| Syntax            | Example   | Description                             |
|-------------------|-----------|-----------------------------------------|
| `$variablename`   | `$host`   | Simple syntax                           |
| `${variablename}` | `${host}` | Advanced syntax with formatting options |

## Additional resources

- [Templates and variables](/docs/grafana/latest/dashboards/variables/)
- [Add a query variable](/docs/grafana/latest/dashboards/variables/add-template-variables/#add-a-query-variable)
- [Variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/)
