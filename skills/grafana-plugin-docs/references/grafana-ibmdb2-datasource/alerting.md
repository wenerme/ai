---
title: "IBM Db2 alerting | Grafana Enterprise Plugins documentation"
description: "Create Grafana alert rules based on IBM Db2 queries"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# IBM Db2 alerting

The IBM Db2 data source supports Grafana Alerting. You can create alert rules that evaluate SQL queries against your IBM Db2 database and notify you when a condition is met.

## Before you begin

Before you create alert rules, ensure you have:

- [Configured the IBM Db2 data source](/docs/plugins/grafana-ibmdb2-datasource/latest/configure/)
- A query that returns a numeric value you can evaluate against a threshold

## Create an alert rule

To create an alert rule from an IBM Db2 query:

1. Click **Alerts &amp; IRM** in the left-side menu, then click **Alert rules**.
2. Click **New alert rule**.
3. Enter a name for the alert rule.
4. In the query section, select your IBM Db2 data source.
5. Enter a SQL query that returns the value you want to evaluate.
6. Select **Advanced options** to reveal the **Expressions** section.
7. Add an expression to reduce the query result to a single value and define the alert condition.
8. Set the evaluation behavior, labels, and notifications, then save the rule.

For a full walkthrough, refer to [Grafana Alerting](/docs/grafana/latest/alerting/).

## Example alert queries

An alert query typically returns a single numeric value that Grafana reduces and compares against a threshold. Set **Format as** to **Table** for these queries. The following examples use placeholder table names. Replace them with your own schema.

> Note
>
> The IBM Db2 data source doesn’t support SQL macros such as `$__timeFilter` or `$__timeGroup`. Alert rules also don’t have access to dashboard template variables, which are only available in dashboard and Explore queries. Scope alert queries with standard Db2 SQL, for example a labeled duration like `CURRENT_TIMESTAMP - 15 MINUTES`.

### Alert on a row count

Alert when the number of failed orders is too high. In the alert rule, add a **Threshold** condition such as `IS ABOVE 100`:

SQL [Copy code to clipboard] Copy

```sql
SELECT COUNT(*) AS value
FROM orders
WHERE status = 'FAILED'
```

### Alert on an aggregate value

Alert when the deepest job queue grows too large:

SQL [Copy code to clipboard] Copy

```sql
SELECT MAX(queue_depth) AS value
FROM job_queue
```

### Alert on recent activity

Alert when too few rows arrive in a recent window. This query counts rows created in the last 15 minutes, so you can add a **Threshold** condition such as `IS BELOW 1` to detect a stalled pipeline:

SQL [Copy code to clipboard] Copy

```sql
SELECT COUNT(*) AS value
FROM events
WHERE created_at >= CURRENT_TIMESTAMP - 15 MINUTES
```

### Alert on data freshness

Alert when a table hasn’t received new rows recently. This query returns the approximate number of minutes since the most recent row, so a **Threshold** of `IS ABOVE 15` fires when no new rows have arrived in the last 15 minutes:

SQL [Copy code to clipboard] Copy

```sql
SELECT TIMESTAMPDIFF(4, CHAR(CURRENT_TIMESTAMP - MAX(created_at))) AS value
FROM events
```

> Note
>
> `TIMESTAMPDIFF` returns an estimate based on assumptions about the length of months and years. It’s suitable for freshness checks measured in minutes or hours. The first argument, `4`, selects minutes as the unit.

### Return a single value per alert

Alert conditions evaluate one value per series, so each query should return a single row. Aggregate in SQL with a function such as `COUNT`, `MAX`, or `AVG`, as the previous examples do.

If a query returns multiple rows, Grafana evaluates each row as a separate series, which can create multiple alert instances. A **Reduce** expression collapses the data points within a single series to one value; it doesn’t merge multiple rows into one. To evaluate a single value, aggregate in SQL so the query returns one row.

## Query errors during evaluation

When a SQL query fails during alert-rule evaluation, the plugin reports the failure as a downstream error. The alert rule enters an error state and the message identifies the database as the source of the problem, rather than Grafana. Verify the SQL, the database connection, and the user’s permissions when an alert rule reports a query error.

## Performance considerations

Alert rules run on their own evaluation schedule, independent of dashboard usage. Two configuration options affect how alert queries run:

- **Query Timeout:** Long-running alert queries are canceled when they exceed the query timeout. If alert evaluations fail with timeout errors, increase the **Query Timeout** in the data source configuration or optimize the query so it completes within the limit.
- **Connection pool size:** Alert evaluations borrow connections from the same connection pool as dashboard queries, one pool per data source. If you run many alert rules against the same data source, size the **Connection pool size** to accommodate the combined concurrency of alerting and dashboards.

For more information about both settings, refer to [Configure the IBM Db2 data source](/docs/plugins/grafana-ibmdb2-datasource/latest/configure/).

## Related resources

- [IBM Db2 query editor](/docs/plugins/grafana-ibmdb2-datasource/latest/query-editor/)
- [Grafana Alerting](/docs/grafana/latest/alerting/)
