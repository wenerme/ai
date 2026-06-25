---
title: "Sumo Logic template variables | Grafana Enterprise Plugins documentation"
description: "Use template variables with the Sumo Logic data source to create dynamic, reusable dashboards."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Sumo Logic template variables

Template variables let you create dynamic, reusable dashboards where users can change what data is displayed using drop-down selectors instead of editing queries directly. For example, you can create a variable that lists all available hosts, then use it to filter dashboard panels to a specific host.

For general information about variables in Grafana, refer to [Templates and variables](/docs/grafana/latest/dashboards/variables/).

## Before you begin

- [Configure the Sumo Logic data source](/docs/plugins/grafana-sumologic-datasource/latest/configure/).
- Familiarize yourself with [Grafana template variables](/docs/grafana/latest/dashboards/variables/).

## Supported variable types

The following table lists the variable types supported by the Sumo Logic data source.

Expand table

| Variable type | Supported |
|---------------|-----------|
| Query         | Yes       |
| Custom        | Yes       |
| Constant      | Yes       |
| Data source   | Yes       |
| Interval      | Yes       |

## Create a query variable

Query variables populate their options by running a query against the data source. The Sumo Logic data source runs variable queries as metrics queries using the raw code editor – the visual Builder mode isn’t available for variable queries.

The query returns values from the first string field in the results. If no string field exists, it uses the first non-time field. If the query returns an error or no data, the variable has no options.

Variable queries are time-range aware. When the dashboard time range changes and the variable refresh setting is set to **On time range change**, the query re-runs and the variable options update accordingly.

To create a query variable:

1. Navigate to **Dashboard settings** &gt; **Variables**.
2. Click **Add variable**.
3. Select **Query** as the variable type.
4. Select your Sumo Logic data source.
5. Enter a metrics query in the **Query** field that returns the values you want as variable options.
6. Choose a **Refresh** option to control when the variable updates.

### Variable query examples

Return a list of available metrics:

SQL [Copy code to clipboard] Copy

```sql
* | count by metric
```

Return a list of hosts reporting CPU metrics:

SQL [Copy code to clipboard] Copy

```sql
metric=cpu_idle | count by host
```

Return a list of departments:

SQL [Copy code to clipboard] Copy

```sql
metric=cpu_idle | count by department
```

Return a list of source categories from a specific metric:

SQL [Copy code to clipboard] Copy

```sql
metric=http_requests | count by _sourceCategory
```

## Use variables in queries

After creating a variable, reference it in your Sumo Logic queries using [variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/). Variable substitution is supported in the following query fields:

- **Query:** The main query string for both metrics and logs queries.
- **Rollup:** The rollup function for metrics queries.

### Metrics query examples

Filter by a single-value variable named `host`:

SQL [Copy code to clipboard] Copy

```sql
metric=cpu_idle host=$host
```

Use a multi-value variable named `department` with the `in` filter syntax:

SQL [Copy code to clipboard] Copy

```sql
metric=cpu_idle department=($department)
```

Combine multiple variables to drill down:

SQL [Copy code to clipboard] Copy

```sql
metric=$metric host=$host | avg by _sourceCategory
```

Use a variable in the rollup field by setting the **Rollup** drop-down to `$rollup`, where `rollup` is a Custom variable with values like `Avg`, `Sum`, `Max`.

### Logs query examples

Filter logs by host:

SQL [Copy code to clipboard] Copy

```sql
_sourceHost=$host error | count by _sourceCategory
```

Use a variable for the source category:

SQL [Copy code to clipboard] Copy

```sql
_sourceCategory=$sourceCategory | count by _sourceHost | sort by _count desc
```

Combine variables to scope log searches:

SQL [Copy code to clipboard] Copy

```sql
_sourceHost=$host _sourceCategory=$sourceCategory $search_term | count by _messageSeverity
```
