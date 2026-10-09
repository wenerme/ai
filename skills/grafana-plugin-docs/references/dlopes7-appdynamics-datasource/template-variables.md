---
title: "AppDynamics template variables | Grafana Enterprise Plugins documentation"
description: "Use template variables with the AppDynamics data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# AppDynamics template variables

Instead of hard-coding application names, tier names, or metric paths in your queries, you can use variables. Grafana displays these variables in drop-down select boxes at the top of the dashboard to help you change the data displayed in your dashboard. Grafana refers to such variables as **template variables**.

For an introduction to templates and variables, refer to the following topics:

- [Variables](/docs/grafana/latest/dashboards/variables/)
- [Templates](/docs/grafana/latest/dashboards/variables/#templates)
- [Add and manage variables](/docs/grafana/latest/dashboards/variables/add-template-variables/)
- [Variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/)

## Create AppDynamics query variables

To add a new AppDynamics query variable, refer to [Add a query variable](/docs/grafana/latest/dashboards/variables/add-template-variables/#add-a-query-variable). Select your AppDynamics data source and use one of the supported query patterns.

The following table lists the supported query patterns for AppDynamics variables. Replace `AppName` and `TierName` with the actual application and tier names, or use previously defined variables such as `${application}`.

Keywords after the application name (`Tiers`, `Nodes`, `BusinessTransactions`, `Path`) are case-sensitive. A query with no `.` lists applications, so `Applications` is the usual query for that variable.

Expand table

| Query                                   | Description                                                                                                                                                                                                                     |
|-----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Applications`                          | Returns all application names.                                                                                                                                                                                                  |
| `AppName.Tiers`                         | Returns all tiers for the specified application.                                                                                                                                                                                |
| `AppName.BusinessTransactions`          | Returns all business transactions for the specified application.                                                                                                                                                                |
| `AppName.Nodes`                         | Returns all nodes for the specified application.                                                                                                                                                                                |
| `AppName.TierName.BusinessTransactions` | Returns all business transactions for a specific tier within an application.                                                                                                                                                    |
| `AppName.TierName.Nodes`                | Returns all nodes for a specific tier within an application.                                                                                                                                                                    |
| `AppName.Path.segment1.segment2...`     | Returns metric names at a specific point in the metric hierarchy. Use `.` (not the metric-path pipe) to separate path segments. For example, `MyApp.Path.Overall Application Performance` returns metric names under that path. |
| `SELECT column FROM table`              | Returns the first column of results from an Analytics (ADQL) query. The query must start with `SELECT` and include `FROM`. For example, `SELECT distinct(transactionName) FROM transactions`.                                   |

### Query variable examples

**Chain variables for cascading drop-downs:**

Create dependent variables so that selecting an application populates tiers and business transactions:

1. Create a variable named `application` with the query `Applications`.
2. Create a variable named `tier` with the query `${application}.Tiers`.
3. Create a variable named `bt` with the query `${application}.${tier}.BusinessTransactions`.

To list every business transaction or node in the application, skip the tier and use `${application}.BusinessTransactions` or `${application}.Nodes`.

**Populate a variable from the metric hierarchy:**

To list metric names under a folder, use `Path` and separate folders with `.`:

- Top-level performance metrics: `${application}.Path.Overall Application Performance`
- Business transaction folders: `${application}.Path.Business Transaction Performance.Business Transactions`

**Populate a variable from an ADQL query:**

To list distinct transaction names (requires Analytics authentication):

- Query: `SELECT distinct(transactionName) FROM transactions`

To list user-experience values:

- Query: `SELECT distinct(userExperience) FROM transactions`

Only the first column of the result is used as the variable values.

## Use variables in queries

After you create a variable, you can use it in your AppDynamics queries using [variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/).

### Metrics queries

Use `${variableName}` in the **Application** field to choose which application to query. If you create a variable named `application`, select `${application}` from the **Application** drop-down.

When a multi-value variable is used in the **Application** field and multiple values are selected, the plugin generates a separate query for each application and displays them as individual series.

You can also put variables in the **Metric** path. For example, after you create `tier` and `bt` variables:

1. Select **Metrics** from the query type radio buttons.
2. Select `${application}` from the **Application** drop-down.
3. In raw edit mode, enter `Business Transaction Performance|Business Transactions|${tier}|${bt}|Calls per Minute`.

If `tier` or `bt` is multi-value, those path segments are replaced with `*`. Refer to [Limitations](#limitations).

### Analytics queries

Use variables in ADQL queries with the appropriate [variable format](/docs/grafana/latest/dashboards/variables/variable-syntax/#advanced-variable-format-options). Multi-value variables aren’t rewritten to `*` in Analytics queries. Use the `doublequote` formatter for string lists in `WHERE` clauses:

SQL [Copy code to clipboard] Copy

```sql
SELECT transactionName, avg(responseTime) FROM transactions WHERE transactionName IN (${transactionName:doublequote})
```

### API queries

Template variables work in input fields for the **Health**, **Events**, **Tiers**, and **Metric Names** query types.

- Health or Events: set **application\_id** to `${application}`.
- Events: set **tier** to `${tier}` to limit events to the selected tier.
- Metric Names: set **application\_id** to `${application}` and **metric-path** to a path such as `Overall Application Performance`.

## Limitations

The following limitations apply to template variables with the AppDynamics data source:

- **Multi-value variables in Metrics metric paths are replaced with wildcards.** When a multi-value variable is used in a metric path (not the **Application** field), all selected values are replaced with `*`. To filter by multiple specific values, use an Analytics (ADQL) query with the `IN` operator instead.
- **ADQL variable queries must start with `SELECT` and include `FROM`.** Queries that don’t match that pattern are treated as Controller templating queries. If the query has no `.`, the plugin lists applications.
- **Path queries use `.` as the segment separator.** Don’t use the metric-path pipe character in `AppName.Path...` variable queries.

For more information about variables, refer to [Templates and variables](/docs/grafana/latest/dashboards/variables/).
