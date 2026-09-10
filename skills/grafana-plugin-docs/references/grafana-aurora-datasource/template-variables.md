---
title: "Amazon Aurora template variables | Grafana Enterprise Plugins documentation"
description: "Learn how to use template variables with the Amazon Aurora data source to create dynamic, reusable dashboards."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Amazon Aurora template variables

Use template variables with the Amazon Aurora data source to create dynamic, reusable dashboards. Instead of hard-coding values such as table names or filter values in your queries, you can use variables that users change from drop-downs at the top of the dashboard.

## Before you begin

- Ensure you have [configured the Amazon Aurora data source](/docs/plugins/grafana-aurora-datasource/latest/configure/).
- Understand [Grafana variables](/docs/grafana/latest/dashboards/variables/).

## Supported variable types

The Amazon Aurora data source works with the following variable types:

Expand table

| Variable type  | Supported |
|----------------|-----------|
| Query          | Yes       |
| Custom         | Yes       |
| Constant       | Yes       |
| Data source    | Yes       |
| Interval       | Yes       |
| Ad hoc filters | No        |

## Create a query variable

Query variables populate their options by running an SQL query against your Aurora cluster. The variable query editor provides the same SQL editor and macro support as the regular query editor, including the **Format data frames as** drop-down.

To create a query variable:

1. Navigate to **Dashboard settings** &gt; **Variables**.
2. Click **Add variable**.
3. Select **Query** as the variable type.
4. Select your Amazon Aurora data source.
5. Enter an SQL query in the query editor.
6. Click **Run query** to preview the variable options.
7. Click **Apply**.

### Query examples

Return all table names in a PostgreSQL-compatible database:

SQL [Copy code to clipboard] Copy

```sql
select table_name from information_schema.tables where table_schema = 'public'
```

Return all table names in the current MySQL-compatible database:

SQL [Copy code to clipboard] Copy

```sql
select table_name from information_schema.tables where table_schema = database()
```

Return distinct values from a column:

SQL [Copy code to clipboard] Copy

```sql
select distinct city from weather_readings
```

### Custom display names

To display a user-friendly label in the drop-down while using a different value in queries, alias the columns as `text` and `value`:

SQL [Copy code to clipboard] Copy

```sql
select city_name as text, city_id as value from cities
```

In this example, the variable drop-down shows city names, but queries use the `city_id` value.

## Use variables in queries

Reference a variable in any Aurora query with the `$variable` or `${variable}` syntax. Grafana interpolates the variable value before sending the query to your database. For example, with a variable named `tableName`, you can reuse the same panel across multiple tables:

SQL [Copy code to clipboard] Copy

```sql
select * from $tableName limit 3;
```

For more interpolation options, refer to [Variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/).

### Multi-value variables

When a variable allows multiple selections, use a format option so the values interpolate into valid SQL. Without a format option, Grafana renders multiple values as `{value1,value2}`, which isn’t valid SQL. Use `singlequote` for string columns:

SQL [Copy code to clipboard] Copy

```sql
select recorded_at, temperature
from weather_readings
where city in (${city:singlequote})
```

With `New York` and `Toronto` selected, the query becomes `where city in ('New York','Toronto')`. For numeric columns, use `${variable:csv}` instead.

### Create cascading variables

You can create dependent variables where one variable’s options depend on another variable’s selection. For example, create a `city` variable first, then create a `neighborhood` variable that queries values for the selected city:

SQL [Copy code to clipboard] Copy

```sql
select distinct neighborhood from weather_readings where city = ${city:singlequote}
```

When the user changes the `city` selection, the `neighborhood` options refresh automatically.

> Note
>
> Template variables don’t work with Grafana Alerting. Alert rule queries must not reference dashboard variables.

## Next steps

- [Amazon Aurora query editor](/docs/plugins/grafana-aurora-datasource/latest/query-editor/)
- [Troubleshooting](/docs/plugins/grafana-aurora-datasource/latest/troubleshooting/)
