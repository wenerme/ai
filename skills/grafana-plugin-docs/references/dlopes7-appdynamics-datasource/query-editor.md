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

| Field           | Description                                                                                                                                     |
|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| **Application** | The AppDynamics application to query. Select from the drop-down or enter a template variable.                                                   |
| **Metric**      | The metric path to query. Navigate through the metric hierarchy by selecting segments, or click the edit icon to switch to raw text input mode. |
| **Aggregation** | The aggregation function applied to the metric data. Options: **Value**, **Sum**, **Min**, **Max**, **Count**. Default: **Value**.              |
| **Roll-up**     | Toggle on to return only the latest data point instead of a time series.                                                                        |
| **Delimiter**   | The character used to tokenize the metric path. Options: \`                                                                                     |

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

| Field     | Description                                                                          |
|-----------|--------------------------------------------------------------------------------------|
| **Query** | The ADQL query to execute. The editor supports syntax highlighting and autocomplete. |
| **Limit** | The maximum number of records to retrieve. Default: `100`. Maximum: `1000`.          |

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

Set the **Limit** field to control how many records are returned (default `100`, maximum `1000`). For aggregation queries like `count(*)` or `avg()`, the limit applies to the number of result rows, not the number of raw records scanned.

## Health, Events, Tiers, and Metric Names query types

The Health, Events, Tiers, and Metric Names query types use form-based editors to query the AppDynamics Controller REST API. Each type provides specific input fields relevant to its API endpoint.

These query types support a **Use dashboard’s time picker** toggle. When enabled (default), the query automatically uses the dashboard’s time range. When disabled, you can specify a fixed time range directly in the query using the **start-time** and **end-time** fields.

For details on using the Events query type with annotations, refer to [AppDynamics annotations](/docs/plugins/dlopes7-appdynamics-datasource/latest/annotations/).

## Use cases

The following examples demonstrate common use cases for the AppDynamics data source.

### Monitor application response time

Query the average response time for an application to track performance trends:

1. Select **Metrics** from the query type radio buttons.
2. Select your application from the **Application** drop-down.
3. Navigate to `Overall Application Performance|Average Response Time (ms)` in the **Metric** selector.
4. Set **Labels** to **Custom** and enter `{{app}} - Response Time`.

### Display a single metric value

Use the **Roll-up** toggle and a Stat panel to display the current value of a metric:

1. Select **Metrics** from the query type radio buttons.
2. Select your application from the **Application** drop-down.
3. Navigate to `Overall Application Performance|Calls per Minute` in the **Metric** selector.
4. Set **Aggregation** to **Sum**.
5. Toggle **Roll-up** on to return a single data point.
6. Use a **Stat** or **Gauge** visualization to display the value.

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
