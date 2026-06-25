---
title: "Oracle templates and variables | Grafana Enterprise Plugins documentation"
description: "This document describes Oracle templates and variables for Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Oracle templates and variables

Instead of hard-coding details such as server, application, and sensor names in metric queries, you can use variables. Grafana lists these variables in drop-down select boxes at the top of the dashboard to help you change the data displayed in your dashboard. Grafana refers to such variables as `template` variables.

For instructions on how to create variables refer to [Variables](/docs/grafana/latest/dashboards/variables/) and [Add a query variable](/docs/grafana/latest/dashboards/variables/add-template-variables/#add-a-query-variable). Use Oracle as the data source.

Read more about templates and variables in the following documentation:

- [Templates](/docs/grafana/latest/dashboards/variables/#templates)
- [Add and manage variables](//docs/grafana/latest/dashboards/variables/add-template-variables/)
- [Variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/)

## Variable examples

An Oracle query returns results such as measurement names, key names or key values which are displayed as options in a drop-down select box.

Examples:

You can have a variable that contains all values for the `hostname` column in the `host` table.

SQL [Copy code to clipboard] Copy

```sql
SELECT hostname FROM host
```

A query can return multiple columns and Grafana will automatically create a list from them. For example, the following query retrieves a list with values from `hostname` and `hostname2`.

SQL [Copy code to clipboard] Copy

```sql
SELECT host.hostname, other_host.hostname2
FROM host
JOIN other_host ON host.city = other_host.city
```

To use time range dependent macros like `$__timeFilter(column)` in your query, set the refresh mode of the template variable to `On Time Range Change`.

SQL [Copy code to clipboard] Copy

```sql
SELECT event_name
FROM event_log
sWHERE $__timeFilter(time_column)
```

You can write a query that creates a key/value variable. The query returns two columns, one called `__text` and the other `__value`. The `__text` column value should be unique. If duplicates exist in \_\_text , only the first value is used. The drop-down options display `__text` as the name and `__value` as the ID. The query below sets hostname as the `text` and `id` as the value:

SQL [Copy code to clipboard] Copy

```sql
SELECT hostname AS __text, id AS __value
FROM host
```

You can also create nested variables. You can create a variable called `region`, and have the `hosts` variable only show hosts from the current selected region with the following query:

SQL [Copy code to clipboard] Copy

```sql
SELECT hostname
FROM host
WHERE region = '$region'
```

If `region` is a multi-value variable then use the `IN` comparison operator rather than `=` to match against multiple values.

Once you have created a variable, you can use it in Oracle queries by following [variable syntax](/docs/grafana/latest/variables/syntax/).

## Environment variables

> Note
>
> Environment variables are not supported in Grafana Cloud.

### Max response size

You can set `GF_PLUGINS_ORACLE_DATASOURCE_MAX_RESPONSE_SIZE` in your environment variable to change query response data size. The default is `16`, the maximum is `512`.

[Copy code to clipboard] Copy

```none
export GF_PLUGINS_ORACLE_DATASOURCE_MAX_RESPONSE_SIZE=<number>
```

### Connection pool size

You can set `GF_PLUGINS_ORACLE_DATASOURCE_POOLSIZE` in your environment variable to change connection pool size. The default value is `50`

[Copy code to clipboard] Copy

```none
export GF_PLUGINS_ORACLE_DATASOURCE_POOLSIZE=<number>
```
