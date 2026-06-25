---
title: "Snowflake template variables | Grafana Enterprise Plugins documentation"
description: "Learn how to use template variables with the Snowflake data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Snowflake template variables

Use template variables to create dynamic, reusable dashboards with the Snowflake data source.

## Before you begin

- [Configure the Snowflake data source](/docs/plugins/grafana-snowflake-datasource/latest/configure/).
- Understand [Grafana template variables](/docs/grafana/latest/dashboards/variables/), which allow you to create interactive dashboards with drop-down filters that dynamically update your queries.

## Supported variable types

Expand table

| Variable type | Supported |
|---------------|-----------|
| Query         | Yes       |
| Custom        | Yes       |
| Data source   | Yes       |

## Create a query variable

To add a new Snowflake query variable, refer to [Add a query variable](/docs/grafana/latest/dashboards/variables/add-template-variables/#add-a-query-variable). Use your Snowflake data source as the data source for your variable query.

Any value queried from a Snowflake table can be used as a variable. Avoid selecting too many values, as this can cause performance issues.

> Note
>
> If the variable query returns two columns, the values from the second column will be used as display values.

## Use variables in queries

After creating a variable, you can use it in your Snowflake queries using variable syntax.

For more information about variables, refer to [Templates and variables](/docs/grafana/latest/dashboards/variables/).

You can optionally set the [interpolation format](/docs/grafana/latest/dashboards/variables/variable-syntax/#advanced-variable-format-options). You can also configure the default interpolation format in the data source configuration.

## Variable examples

The following examples show how to use variables in different scenarios.

### Single-value variables

If a variable returns a single value, use the following format.

The example below assumes you have set `sqlstring` as default interpolation and you have two variables:

- `queryTypeSingle` with value `SELECT`
- `limit` with value `2`

**Query with variables:**

SQL [Copy code to clipboard] Copy

```sql
SELECT query_type FROM account_usage.query_history WHERE query_type = ${queryTypeSingle} LIMIT ${limit:raw}
```

**Interpolated query:**

SQL [Copy code to clipboard] Copy

```sql
SELECT query_type FROM account_usage.query_history WHERE query_type = 'SELECT' LIMIT 10
```

> Note
>
> The default variable interpolation type `sqlstring` was introduced in version 1.2. From this version, you can set the default interpolation type to `sqlstring`.

Prior to version 1.2 of the plugin, or if you use `none` as the default interpolation type, write the same query as follows:

SQL [Copy code to clipboard] Copy

```sql
SELECT query_type FROM account_usage.query_history WHERE query_type = '${queryTypeSingle}' LIMIT ${limit:raw}
```

### Multi-value variables with sqlstring interpolation

When consuming a variable that returns multiple options, use the following method.

The example below assumes you have set `sqlstring` as default interpolation and you have two variables:

- `queryTypeMulti` with values `CREATE,SELECT`
- `limit` with value `2`

**Query with variables:**

SQL [Copy code to clipboard] Copy

```sql
SELECT query_type FROM account_usage.query_history WHERE query_type IN (${queryTypeMulti}) LIMIT ${limit:raw}
```

**Interpolated query:**

SQL [Copy code to clipboard] Copy

```sql
SELECT query_type FROM account_usage.query_history WHERE query_type IN ('CREATE','SELECT') LIMIT 10
```

### Multi-value variables with regex

To use a variable that has multiple values with pattern matching, use the [regex modifier option](/docs/grafana/latest/dashboards/variables/variable-syntax/#advanced-variable-format-options) and the [`regexp` Snowflake function](https://docs.snowflake.com/en/sql-reference/functions/regexp.html).

Use `${variable:regex}` syntax:

**Query with variables:**

SQL [Copy code to clipboard] Copy

```sql
SELECT *
FROM account_usage.query_history
WHERE query_type REGEXP '${queryType:regex}'
```

**Interpolated query:**

SQL [Copy code to clipboard] Copy

```sql
SELECT *
FROM account_usage.query_history
WHERE query_type REGEXP '(DESCRIBE|CREATE_USER|DROP|TRUNCATE_TABLE|ALTER)'
```

## Configure default interpolation

You can set a default interpolation format in the data source configuration:

1. Navigate to **Connections** &gt; **Data sources**.
2. Select your Snowflake data source.
3. In the **Default Interpolation** field, select your preferred format (for example, `sqlstring`).
4. Click **Save &amp; test**.

When set, all variables without an explicit format modifier will use this default interpolation.
