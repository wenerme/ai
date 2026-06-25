---
title: "New Relic template variables | Grafana Enterprise Plugins documentation"
description: "Use template variables with the New Relic data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# New Relic template variables

Use template variables to create dynamic, reusable dashboards. Instead of hard-coding values like application names or metric namespaces, you can use variables that users can change from a drop-down at the top of the dashboard.

## Before you begin

- [Configure the New Relic data source](/docs/plugins/grafana-newrelic-datasource/latest/configure/).
- Familiarize yourself with [Grafana template variables](/docs/grafana/latest/dashboards/variables/).

## Supported variable query types

The New Relic data source supports the following variable query types:

Expand table

| Query type               | Description                                                                                 |
|--------------------------|---------------------------------------------------------------------------------------------|
| **Insights / NRQL**      | Run a NRQL query to populate variable values. This is the default and most flexible option. |
| **Applications (IDs)**   | List New Relic application IDs. Optionally filter by application name.                      |
| **Applications (Names)** | List New Relic application names.                                                           |
| **Metrics**              | List available metric names for a specific application.                                     |

## Create a query variable

To create a query variable:

1. Navigate to your dashboard and click **Dashboard settings** (gear icon).
2. Click **Variables** in the left-side menu.
3. Click **Add variable**.
4. Select **Query** as the variable type.
5. Select the **New Relic** data source.
6. Choose a **Query type** and configure the query.
7. Click **Apply**.

## Query type examples

The following sections describe each query type with examples.

### Insights / NRQL

Use a NRQL query to populate variable values. This is the default query type.

The default query returns a list of unique application names:

SQL [Copy code to clipboard] Copy

```sql
SELECT uniques(appName) FROM Transaction
```

Other examples:

List unique hostnames:

SQL [Copy code to clipboard] Copy

```sql
SELECT uniques(host) FROM SystemSample
```

List unique container names:

SQL [Copy code to clipboard] Copy

```sql
SELECT uniques(containerName) FROM ProcessSample
```

List transaction names for a specific application:

SQL [Copy code to clipboard] Copy

```sql
SELECT uniques(name) FROM Transaction WHERE appName = 'my-app'
```

List event types that have data in the current time range:

SQL [Copy code to clipboard] Copy

```sql
SELECT uniques(eventType) FROM NrdbQuery $__timeFilter
```

> Note
>
> The `$__timeFilter` macro is supported in variable queries. Add it to filter variable values by the dashboard time range.

### Applications (IDs)

Returns a list of New Relic application IDs.

Expand table

| Field              | Description                                                                                           |
|--------------------|-------------------------------------------------------------------------------------------------------|
| **Filter by name** | *(Optional)* Filter the application list by name. Only applications matching the filter are returned. |

Use this query type when you need application IDs for the Metrics query editor or deployment annotations.

### Applications (Names)

Returns a list of New Relic application names. Use this query type when you need human-readable names for use in NRQL `WHERE` clauses.

### Metrics

Returns a list of available metric names for a specific application. Select the application from the **Application** drop-down.

You can use another variable as the application selection, enabling cascading variables where the metric list updates based on the selected application.

## Use variables in queries

After creating a variable, reference it in your queries using standard Grafana [variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/).

### Single-value variables

Use `${variable}` or `$variable` syntax. Wrap in single quotes when used in string comparisons:

SQL [Copy code to clipboard] Copy

```sql
SELECT average(duration) FROM Transaction WHERE appName = '${app}' $__timeFilter TIMESERIES
```

### Multi-value variables

The New Relic data source supports multi-value variables. When a variable allows multiple selections, the plugin automatically formats the values for use in NRQL `IN` clauses:

SQL [Copy code to clipboard] Copy

```sql
SELECT average(duration) FROM Transaction WHERE appName IN (${app}) $__timeFilter TIMESERIES
```

For quoted contexts, use the `:singlequote` formatting option:

SQL [Copy code to clipboard] Copy

```sql
SELECT count(*) FROM Transaction WHERE appName IN (${app:singlequote}) $__timeFilter
```

### Variable usage examples

Filter by application and host:

SQL [Copy code to clipboard] Copy

```sql
SELECT average(duration) FROM Transaction WHERE appName = '${app}' AND host = '${host}' $__timeFilter TIMESERIES
```

Use a variable as an event type in Data Explorer’s **Where** field:

[Copy code to clipboard] Copy

```none
appName = '${app}' AND serverName IN (${servers:singlequote})
```

For more information about variables, refer to [Templates and variables](/docs/grafana/latest/dashboards/variables/).
