---
title: "AppDynamics query editor | Grafana Enterprise Plugins documentation"
description: "Learn how to use the AppDynamics query editor in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# AppDynamics query editor

The AppDynamics query editor allows you to build queries for AppDynamics data in dashboards, [Explore](/docs/grafana/latest/explore/), and alerting. The query editor supports the following query types:

- **Metrics** - Query application performance metrics from the AppDynamics Metrics API.
- **Analytics** - Query analytics data using ADQL (AppDynamics Query Language) from the Analytics Events API.
- **Health** - Query health rule violations for an application.
- **Events** - Query application events such as deployments, errors, and policy violations.
- **Tiers** - Query tier information for an application.
- **Metric Names** - Browse the metric hierarchy for an application.

Select a query type using the radio buttons at the top of the query editor. For general information on Grafana query editors, refer to [Query editors](/docs/grafana/latest/panels-visualizations/query-transform-data/#query-editors).

## Key concepts

If you’re new to AppDynamics, here are key terms used in this documentation:

Expand table

| Term                     | Description                                                                                                                                  |
|--------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| **Metric path**          | A hierarchical identifier for a specific metric within an application, such as `Overall Application Performance|Average Response Time (ms)`. |
| **ADQL**                 | AppDynamics Query Language, used for querying the Analytics Events API.                                                                      |
| **Business transaction** | A user-defined unit of work in an application, such as a web request or message processing.                                                  |
| **Tier**                 | A logical grouping of nodes that perform the same function in an application.                                                                |

## Metrics query type

To create a Metrics query, select **Metrics** from the query type radio buttons. The Metrics query editor queries application performance metrics from the AppDynamics Controller REST API.

Expand table

| Field           | Description                                                                                                                                                                                                               |
|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Application** | The AppDynamics application to query. Select from the drop-down or enter a template variable. The list includes your Controller applications plus **Server &amp; Infrastructure Monitoring** and **Database Monitoring**. |
| **Metric**      | The metric path to query. Navigate through the metric hierarchy by selecting segments, or click the edit icon to switch to raw text input mode. Each segment also offers `*` as a wildcard.                               |
| **Aggregation** | The aggregation function applied to the metric data. Options: **Value**, **Sum**, **Min**, **Max**, **Count**. Default: **Value**.                                                                                        |
| **Roll-up**     | When on, AppDynamics rolls up metric values for the selected time range, which typically returns fewer points (often a single value). When off (the plugin default), the query returns all available data points.         |
| **Delimiter**   | The character used to tokenize the metric path. The default is the pipe character. A period is also available, and you can enter a custom delimiter. The metric path can’t contain the selected delimiter.                |
| **Labels**      | Sets how series are labeled in your visualizations. Options: **Full Path**, **Segments**, or **Custom**. For details, refer to [Configure labels](#configure-labels).                                                     |

### Raw edit mode

By default, the metric field uses segment-based selection where you navigate through the metric hierarchy one level at a time. Click the edit icon (pencil) next to the **Metric** field to switch to raw text input mode, which allows you to type or paste a full metric path directly. Click the checkmark icon to apply changes when using raw edit mode.

### Configure labels

Customize how series are labeled in your visualizations using the **Labels** drop-down below the main query fields.

- **Full Path** - Uses the full metric path as the label. For example: `Overall Application Performance|Average Response Time (ms)`.
- **Segments** - Builds the label from specific segments of the metric path. Segment indexing starts at 1. For example, with a metric path of `Errors|mywebsite|Error|Errors per Minute` and segments `2, 4`, the label shows `mywebsite|Errors per Minute`.
- **Custom** - Combines free text with aliasing patterns to include metric metadata:

  - `{{app}}` - The application name.
  - `{{n}}` - The nth segment from the metric path.

  For example, with the metric path `Overall Application Performance|Average Response Time (ms)` and the custom label `{{app}} MetricPart2: {{2}}`, the result is `myApp MetricPart2: Average Response Time (ms)`.

> Note
>
> If your query is for a Stat panel or another visualization where the label isn’t visible, click **Show Metadata** below the query to view the label. This button appears after running a query that returns data.

## Analytics query type

To create an Analytics query, select **Analytics** from the query type radio buttons. Analytics queries use [ADQL](https://docs.appdynamics.com/appd/24.x/latest/en/analytics/adql-reference/adql-queries) to query AppDynamics analytics data.

> Note
>
> Analytics queries require separate authentication. Ensure you’ve configured the Analytics API URL, API key, and Global Account Name in the [data source configuration](/docs/plugins/dlopes7-appdynamics-datasource/latest/configure/).

The query editor provides a code editor with autocomplete suggestions for fields, tables, and template variables as you type your ADQL query.

Expand table

| Field     | Description                                                                                                                                     |
|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| **Query** | The ADQL query to execute. The editor supports syntax highlighting and autocomplete.                                                            |
| **Limit** | The maximum number of records to retrieve. Default: `100`. The query editor suggests a maximum of `1000`; the backend doesn’t enforce that cap. |

### Analytics query examples

The following examples demonstrate common ADQL query patterns.

**Count transactions grouped by name, filtered by a template variable:**

SQL [Copy code to clipboard] Copy

```sql
SELECT distinct(transactionName), count(*) FROM transactions WHERE transactionName IN (${transactionName:doublequote})
```

**Aggregate response times into a time series by user experience:**

SQL [Copy code to clipboard] Copy

```sql
SELECT series(eventTimestamp, '1m'), userExperience, count(*) FROM transactions
```

**Query the slowest transactions over the selected time range:**

SQL [Copy code to clipboard] Copy

```sql
SELECT transactionName, max(responseTime) AS maxResponseTime FROM transactions ORDER BY maxResponseTime DESC LIMIT 10
```

**Query application logs for errors:**

SQL [Copy code to clipboard] Copy

```sql
SELECT eventTimestamp, MSGTY, MSGTXT, Application FROM application_logs WHERE MSGTY = 'E'
```

**Query browser performance records:**

SQL [Copy code to clipboard] Copy

```sql
SELECT pageUrl, avg(domReadyTime) AS avgDomReady, count(*) AS total FROM browser_records ORDER BY avgDomReady DESC
```

**Filter to the dashboard or alert time range:**

SQL [Copy code to clipboard] Copy

```sql
SELECT series(eventTimestamp, '1m'), count(*) FROM transactions WHERE eventTimestamp >= $__from AND eventTimestamp <= $__to
```

Set the **Limit** field to control how many records are returned (default `100`). The query editor suggests a maximum of `1000`; the backend doesn’t enforce that cap. For aggregation queries like `count(*)` or `avg()`, the limit applies to the number of result rows, not the number of raw records scanned.

### Time macros

The plugin interpolates the following time macros in Analytics queries to epoch milliseconds from the dashboard or alert time range. Use them in ADQL filters so queries work in dashboards and in alerting:

Expand table

| Macro                       | Description                                                          |
|-----------------------------|----------------------------------------------------------------------|
| `$__from` / `${__from}`     | Start of the time range, in milliseconds since epoch.                |
| `$__to` / `${__to}`         | End of the time range, in milliseconds since epoch.                  |
| `$__fromMs` / `${__fromMs}` | Same as `$__from`. Use when you want the `Ms` suffix to be explicit. |
| `$__toMs` / `${__toMs}`     | Same as `$__to`. Use when you want the `Ms` suffix to be explicit.   |

Example:

SQL [Copy code to clipboard] Copy

```sql
SELECT count(*) FROM transactions WHERE eventTimestamp >= $__from AND eventTimestamp <= $__to
```

To use these macros in alert rules, refer to [AppDynamics alerting](/docs/plugins/dlopes7-appdynamics-datasource/latest/alerting/).

## Health, Events, Tiers, and Metric Names query types

The Health, Events, Tiers, and Metric Names query types use form-based editors to query the AppDynamics Controller REST API. Each type provides specific input fields for its API endpoint.

The Health, Events, and Tiers query types include a **Use dashboard’s time picker** toggle. When enabled (the default for new queries), the query uses the dashboard time range and hides **start-time** and **end-time**. When disabled, set a fixed range with **time-range-type**, **start-time**, **end-time**, and **duration-in-mins** as needed. Metric Names queries don’t include this toggle.

In alerting, the toggle is hidden and the alert evaluation window is used as the time range.

**Time-range-type** values are `BETWEEN_TIMES` (default), `BEFORE_NOW`, `BEFORE_TIME`, and `AFTER_TIME`:

- `BETWEEN_TIMES` uses the dashboard or alert time range.
- `BEFORE_NOW` requires **duration-in-mins**.
- `BEFORE_TIME` requires **duration-in-mins** and **end-time**.
- `AFTER_TIME` requires **duration-in-mins** and **start-time**.

Times are in milliseconds since epoch.

### Health

Health queries retrieve health rule violations for an application. Use a table visualization.

Expand table

| Field                         | Required | Description                                                                  |
|-------------------------------|----------|------------------------------------------------------------------------------|
| **application\_id**           | Yes      | Application name or ID. Select from the drop-down.                           |
| **time-range-type**           | Yes      | How the time window is calculated. Default: `BETWEEN_TIMES`.                 |
| **duration-in-mins**          | No       | Duration in minutes. Used with `BEFORE_NOW`, `BEFORE_TIME`, or `AFTER_TIME`. |
| **start-time** / **end-time** | No       | Hidden when **Use dashboard’s time picker** is on.                           |

To list open and recent health rule violations:

1. Select **Health** from the query type radio buttons.
2. Select your application from **application\_id**.
3. Leave **Use dashboard’s time picker** enabled.
4. Use a **Table** visualization.

### Events

Events queries retrieve application events such as deployments, errors, and policy violations. Use a table panel, or overlay the same query as annotations. For annotation setup and a list of common event types, refer to [AppDynamics annotations](/docs/plugins/dlopes7-appdynamics-datasource/latest/annotations/).

**eventtype** and **event-types** are different fields. Use **event-types** to choose which events AppDynamics returns. Leave **eventtype** at the editor default unless you have a reason to change it. The editor marks **summary** and **comment** required.

Expand table

| Field                         | Required | Description                                                                                                                                                                |
|-------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **application\_id**           | Yes      | Application name or ID. Select from the drop-down, or type `${application}` as a custom value.                                                                             |
| **summary**                   | Yes      | Summary text. Required by the editor.                                                                                                                                      |
| **comment**                   | Yes      | Comment text. Required by the editor.                                                                                                                                      |
| **eventtype**                 | Yes      | Separate from **event-types**. The editor default is `APPLICATION_DEVELOPMENT`.                                                                                            |
| **time-range-type**           | Yes      | How the time window is calculated. Default: `BETWEEN_TIMES`.                                                                                                               |
| **duration-in-mins**          | No       | Duration in minutes for relative range types.                                                                                                                              |
| **start-time** / **end-time** | No       | Hidden when **Use dashboard’s time picker** is on.                                                                                                                         |
| **event-types**               | No       | Event types to retrieve. Pick one value, or type a comma-separated list. AppDynamics retrieve requests require this field even though the editor doesn’t mark it required. |
| **severities**                | Yes      | `INFO`, `WARN`, or `ERROR`. Pick one value, or type a comma-separated list such as `WARN,ERROR`.                                                                           |
| **tier**                      | No       | Limit events to a tier.                                                                                                                                                    |

To list deployment events in a table:

1. Select **Events** from the query type radio buttons.
2. Select your application from **application\_id**, or type `${application}`.
3. Fill **summary** and **comment**.
4. Leave **eventtype** at the default.
5. Select `APPLICATION_DEPLOYMENT` from **event-types**.
6. Select `INFO` from **severities**.
7. Leave **Use dashboard’s time picker** enabled.

The **application\_id** drop-down lists applications, not dashboard variables. Type `${application}` as a custom value rather than selecting a numeric application ID.

### Tiers

Tiers queries list tiers in an application. When you set a time range, SaaS Controllers can limit results to tiers that were alive in that window. On-premises Controllers return all tiers.

Expand table

| Field                         | Required | Description                                        |
|-------------------------------|----------|----------------------------------------------------|
| **application\_id**           | Yes      | Application name or ID.                            |
| **time-range-type**           | No       | Optional. Default: `BETWEEN_TIMES`.                |
| **duration-in-mins**          | No       | Duration in minutes for relative range types.      |
| **start-time** / **end-time** | No       | Hidden when **Use dashboard’s time picker** is on. |

To list tiers:

1. Select **Tiers** from the query type radio buttons.
2. Select your application from **application\_id**.
3. Leave **Use dashboard’s time picker** enabled.
4. Use a **Table** visualization.

### Metric Names

Metric Names queries browse the metric hierarchy. They don’t return time-series values. Use this type to discover valid metric paths for Metrics queries or template variables.

Expand table

| Field               | Required | Description                                                                                                         |
|---------------------|----------|---------------------------------------------------------------------------------------------------------------------|
| **application\_id** | Yes      | Application name or ID.                                                                                             |
| **metric-path**     | No       | Path in the metric hierarchy, such as `Overall Application Performance`. Leave empty to list the top-level folders. |

To list metrics under overall application performance:

1. Select **Metric Names** from the query type radio buttons.
2. Select your application from **application\_id**.
3. Set **metric-path** to `Overall Application Performance`.
4. Use a **Table** visualization.

## Use cases

The following examples demonstrate common use cases for the AppDynamics data source.

### Monitor application response time

Query the average response time for an application to track performance trends:

1. Select **Metrics** from the query type radio buttons.
2. Select your application from the **Application** drop-down.
3. Navigate to `Overall Application Performance|Average Response Time (ms)` in the **Metric** selector.
4. Set **Labels** to **Custom** and enter `{{app}} - Response Time`.

### Display a single metric value

Use **Roll-up** and a Stat panel to display a rolled-up value for the time range:

1. Select **Metrics** from the query type radio buttons.
2. Select your application from the **Application** drop-down.
3. Navigate to `Overall Application Performance|Calls per Minute` in the **Metric** selector.
4. Set **Aggregation** to **Sum**.
5. Toggle **Roll-up** on.
6. Use a **Stat** or **Gauge** visualization.

### Monitor a business transaction

Query calls per minute for a business transaction. Use `*` in a path segment to match all transactions:

1. Select **Metrics** from the query type radio buttons.
2. Select your application from the **Application** drop-down.
3. In raw edit mode, enter `Business Transaction Performance|Business Transactions|*|Calls per Minute`.
4. Set **Labels** to **Segments** and enter `3` so the series name is the business transaction.

### Track error rates

Query error metrics to monitor application health:

1. Select **Metrics** from the query type radio buttons.
2. Select your application from the **Application** drop-down.
3. Navigate to `Overall Application Performance|Errors per Minute` in the **Metric** selector.
4. Set **Aggregation** to **Max** to see peak error rates.

### Compare metrics across applications

Use a template variable for the application to compare the same metric across multiple applications:

1. Create a template variable with the query `Applications`.
2. Select **Metrics** from the query type radio buttons.
3. Select `${application}` from the **Application** drop-down.
4. Navigate to the desired metric path.

When multiple applications are selected, the plugin generates a separate query for each application and displays them as individual series.

### List health rule violations

Use the **Health** query type to show violations in a table:

1. Select **Health** from the query type radio buttons.
2. Select your application from **application\_id**.
3. Leave **Use dashboard’s time picker** enabled.
4. Use a **Table** visualization.

### Analyze business transactions

Use an Analytics query to analyze business transaction volume and performance:

SQL [Copy code to clipboard] Copy

```sql
SELECT transactionName, count(*) AS total, avg(responseTime) AS avgResponseTime FROM transactions ORDER BY total DESC
```

### Identify slow transactions

Find transactions that exceed a response time threshold:

SQL [Copy code to clipboard] Copy

```sql
SELECT transactionName, responseTime, eventTimestamp FROM transactions WHERE responseTime > 5000 ORDER BY responseTime DESC
```

Set **Limit** to `50` to retrieve the top 50 slowest transactions.

### Monitor user experience distribution

Visualize how user experience is distributed across transactions:

SQL [Copy code to clipboard] Copy

```sql
SELECT series(eventTimestamp, '5m'), userExperience, count(*) FROM transactions
```

This query returns a time series grouped by user experience category (`NORMAL`, `SLOW`, `VERY_SLOW`, `STALL`, `ERROR`), suitable for a stacked bar or time series visualization.
