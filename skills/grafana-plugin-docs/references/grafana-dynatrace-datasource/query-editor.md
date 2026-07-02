---
title: "Dynatrace query editor | Grafana Enterprise Plugins documentation"
description: "Use the Dynatrace query editor in Grafana to query Dynatrace."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Dynatrace query editor

Grafana provides a query editor for the Dynatrace data source, which is located on the [Explore page](/docs/grafana/latest/explore/). You can also access the Dynatrace query editor from a dashboard panel. Click the menu in the upper right of the panel and select **Edit**.

This document explains querying specific to the Dynatrace data source. For general documentation on querying data sources in Grafana, refer to [Query and transform data](/docs/grafana/latest/panels-visualizations/query-transform-data/). For options and functions common to all query editors, refer to [Query editors](/docs/grafana/latest/panels-visualizations/query-transform-data/#query-editors).

> Tip
>
> You can also use [Grafana Assistant](/docs/grafana/latest/ai/assistant/) to build and run Dynatrace queries from natural language. Mention your Dynatrace data source with the `@` symbol in your prompt to get started.

The query editor allows you to create multiple Dynatrace query types.

## Query

Grafana supports the following Dynatrace query types, depending on the kind of data you want to query:

- [Grail](#grail-query-type)
- [Metrics](#metrics-query-type)
- [Problems](#problems-query-type)
- [Problems V2](#problems-v2-query-type)
- [USQL](#usql-query-type)
- [Logs](#logs-query-type)
- [Audit Logs](#audit-logs-query-type)
- [Management Zones](#management-zones-query-type)
- [Direct API Access](#direct-api-access-query-type)
- [SLO](#slo-query-type)
- [Events](#events-query-type)
- [Synthetic](#synthetic-query-type)
- [Tokens](#tokens-query-type)

### Grail query type

Grail is Dynatrace’s unified data lakehouse that stores all your observability data in one place. With Grail, you can query logs, metrics, events, spans, and business analytics data using **DQL (Dynatrace Query Language)**. Grail requires a Platform token to be configured.

DQL uses a pipe-based syntax that lets you chain operations together to fetch, filter, and transform data. Queries start with a `fetch` command to retrieve a data type, followed by additional commands separated by pipes (`|`).

**What you can query:**

- **logs** — Application and infrastructure log data
- **metrics** — Time-series performance and monitoring data
- **spans** — Distributed tracing data for analyzing request flows
- **events** — System events, deployment events, and custom events
- **bizevents** — Business events and user session analytics

DQL Query

Enter your DQL query to retrieve data from Grail. The query should start with a `fetch` command specifying the data type you want to query.

**Example queries:**

Fetch error logs from the last hour:

dql [Copy code to clipboard] Copy

```dql
fetch logs
| filter loglevel == "ERROR"
| sort timestamp desc
| limit 100
```

Query metrics with aggregation:

dql [Copy code to clipboard] Copy

```dql
fetch dt.metrics
| filter metric.key == "builtin:host.cpu.usage"
| summarize avg(value), by: {host.name}
```

Analyze spans for a specific service:

dql [Copy code to clipboard] Copy

```dql
fetch spans
| filter service.name == "checkout-service"
| filter duration > 1s
| summarize count(), avg(duration), by: {span.name}
```

For more information about DQL syntax and available commands, refer to [Dynatrace Query Language](https://docs.dynatrace.com/docs/discover-dynatrace/platform/grail/dynatrace-query-language) in the Dynatrace documentation.

### Metrics query type

The Metrics query type allows you to query Dynatrace metrics using either a visual builder or by writing metric selector expressions directly.

**Mode** - Select how you want to build your metric query:

- **Builder** - Use a visual interface to select metrics, aggregations, transformations, and filters. Recommended for most users.
- **Code** - Write metric selector expressions directly for advanced querying. Supports the full Dynatrace metric selector syntax.

**Management Zone** - *(Optional)* Select one or more management zones to filter results. Only metrics from entities within the selected management zones are returned.

#### Builder mode options

The following options are available when using Builder mode:

**Metric** - Select the metric you want to query. Use the search field to find metrics by name. Click the **Refresh** button to reload the metric list from Dynatrace.

**Aggregations** - Select the aggregation function to apply to the metric data. Click the aggregation value to change the type, or click **+** to add multiple aggregations. Common aggregations include `avg`, `sum`, `min`, `max`, and `count`.

**Transformations** - Apply transformations to modify the metric data. Click **+** to add a transformation. The `names` transformation is applied by default to display human-readable dimension names. For information about available transformations, refer to [Metric selector transformations](https://www.dynatrace.com/support/help/shortlink/api-metrics-v2-selector#transformations) in the Dynatrace documentation.

**Filters** - Filter metric results by dimension values. The plugin dynamically loads available filter options based on the selected metric.

- To add a filter, click **+** next to **Filters**, select a dimension to filter on, choose an operator, and select a value.
- Use **Filter Groups** to create complex logical comparisons by combining multiple filters with AND/OR operators. For most use cases, filter groups are not required.
- When filtering by **Tags**, Dynatrace always uses AND logic regardless of the conjunction selected.

**Alias** - Customize the display name for the metric series. You can use static text or dynamic alias variables:

Expand table

| Variable     | Description             | Example value                                                   |
|--------------|-------------------------|-----------------------------------------------------------------|
| $name        | The metric ID           | builtin:apps.other.keyUserActions.reportedErrorCount.os         |
| $aggregation | The applied aggregation | auto,value                                                      |
| $displayName | The metric display name | Reported error count (by key user action, OS) \[mobile, custom] |

Additional dynamic aliases based on dimensions (such as Host or Service) are available depending on the selected metric.

#### Code mode options

The following options are available when using Code mode:

**Expression** - Enter a Dynatrace metric selector expression. This field supports the full metric selector syntax, including metric IDs, transformations, filters, and aggregations. For syntax details, refer to [Metric selector](https://www.dynatrace.com/support/help/shortlink/api-metrics-v2-selector) in the Dynatrace documentation.

**Alias** - Customize the display name for the metric series, using the same static and dynamic alias variables available in Builder mode.

#### Series limit

**Limit** - Limits the number of metric series returned. The default is `1000`. Use this to prevent queries from returning too much data.

### Problems query type

> Note
>
> The Dynatrace Problems API (v1) is deprecated but remains functional for backward compatibility. For new implementations, consider using [Problems V2](#problems-v2-query-type) instead.

The Problems query type retrieves problem data from your Dynatrace environment using the Problems API v1. For additional information, refer to [Problems API - GET feed](https://www.dynatrace.com/support/help/dynatrace-api/environment-api/problems/problems/get-feed/) in the Dynatrace documentation.

**Problem Query Type** - Select the Problems API endpoint to use. Currently, only the **Feed** option is available, which returns a chronological feed of problems detected in your Dynatrace environment over the selected time range.

**Status Filter** - Filter problems by their lifecycle status:

Expand table

| Option | Description                                  |
|--------|----------------------------------------------|
| All    | Returns problems in any status               |
| Open   | Returns only actively occurring problems     |
| Closed | Returns only completed and archived problems |

**Impact Filter** - Filter problems by their business impact level:

Expand table

| Option         | Description                                |
|----------------|--------------------------------------------|
| All            | Returns problems with any impact level     |
| Application    | Returns problems affecting applications    |
| Environment    | Returns problems affecting the environment |
| Infrastructure | Returns problems affecting infrastructure  |
| Service        | Returns problems affecting services        |

**Severity Filter** - Filter problems by their severity classification:

Expand table

| Option                 | Description                                |
|------------------------|--------------------------------------------|
| All                    | Returns problems of any severity           |
| Availability           | Critical availability issues               |
| Custom Alert           | User-defined alert conditions              |
| Error                  | Error-level issues                         |
| Monitoring Unavailable | Monitoring agent or data collection issues |
| Performance            | Performance degradation issues             |
| Resource Contention    | Resource constraint issues                 |

**Tags** - Filter problems by Dynatrace tags. Enter one or more tags to return only problems associated with entities that have the specified tags. Press Enter after each tag to add it to the filter.

**Expand Details** - Toggle on to include additional contextual information in the results, such as related events, root cause analysis, and impact details. This provides a comprehensive view of each problem but may increase response size and query time.

### Problems V2 query type

The Problems V2 query type retrieves problem data using the current Dynatrace Problems API v2. This is the recommended query type for querying problems, as it provides more filtering options and better performance than the legacy Problems query type.

For additional information, refer to [Problems V2 API](https://docs.dynatrace.com/docs/discover-dynatrace/references/dynatrace-api/environment-api/problems-v2) in the Dynatrace documentation.

**Fields** - *(Optional)* Select additional properties to include in the response. Available fields include:

Expand table

| Field           | Description                                             |
|-----------------|---------------------------------------------------------|
| evidenceDetails | Includes detailed evidence information for each problem |
| impactAnalysis  | Includes impact analysis data                           |
| recentComments  | Includes recent comments added to problems              |

**ProblemSelector** - *(Optional)* Define filters to narrow down which problems to retrieve using Dynatrace selector syntax. Separate multiple criteria with commas.

Example selectors:

- `status("OPEN")` - Return only open problems
- `severityLevel("AVAILABILITY","ERROR")` - Return problems with specific severity levels
- `impactLevel("SERVICE")` - Return problems affecting services
- `managementZoneIds("123456789")` - Return problems in a specific management zone

For a complete list of selector options, refer to [problemSelector parameters](https://docs.dynatrace.com/docs/discover-dynatrace/references/dynatrace-api/environment-api/problems-v2/problems/get-problems-list#parameters) in the Dynatrace documentation.

**EntitySelector** - *(Optional)* Filter problems to those affecting specific entities using Dynatrace entity selector syntax.

Example selectors:

- `type("HOST")` - Return problems affecting hosts
- `entityId("HOST-1234567890ABCDEF")` - Return problems for a specific entity
- `tag("environment:production")` - Return problems for entities with a specific tag

For a complete list of entity selector options, refer to [Entity selector](https://docs.dynatrace.com/docs/discover-dynatrace/references/dynatrace-api/environment-api/entity-v2/entity-selector) in the Dynatrace documentation.

**Sort** - *(Optional)* Specify how to sort the returned problems. Enter a comma-separated list of fields with optional sort direction.

Example sort values:

- `status` - Sort by status ascending
- `-startTime` - Sort by start time descending (newest first)
- `severityLevel,-startTime` - Sort by severity, then by start time descending

For a complete list of sort properties, refer to [sort parameter](https://docs.dynatrace.com/docs/discover-dynatrace/references/dynatrace-api/environment-api/problems-v2/problems/get-problems-list#parameters) in the Dynatrace documentation.

### USQL query type

The USQL query type allows you to query user session data (real-user monitoring data) from Dynatrace using the User Session Query Language (USQL). Use this query type to analyze user behavior, session performance, and digital experience metrics.

For additional information, refer to:

- [Custom queries, segmentation, and aggregation of session data](https://docs.dynatrace.com/docs/observe/digital-experience/session-segmentation/custom-queries-segmentation-and-aggregation-of-session-data)
- [User sessions API](https://www.dynatrace.com/support/help/dynatrace-api/environment-api/user-sessions/table)

**USQL Query** - Enter your USQL query in the text area. USQL uses a SQL-like syntax to query user session data.

Example queries:

- `SELECT * FROM usersession LIMIT 100` - Return the first 100 user sessions
- `SELECT userId, duration, userActionCount FROM usersession WHERE duration > 60000` - Return sessions longer than 60 seconds
- `SELECT AVG(duration) AS avgDuration FROM usersession GROUP BY city` - Average session duration by city
- `SELECT COUNT(*) FROM useraction WHERE name = "Loading of page /home"` - Count specific user actions

For complete USQL syntax, refer to [USQL reference](https://www.dynatrace.com/support/help/shortlink/usql-info) in the Dynatrace documentation.

**Add deeplink fields** - Toggle on to include deeplink fields in the result set. These fields contain direct URLs to the corresponding data in Dynatrace, enabling you to:

- Create clickable links in table panels that navigate to Dynatrace
- Add “View in Dynatrace” buttons to your dashboards
- Quickly jump from Grafana visualizations to detailed Dynatrace views

After enabling this option, use Grafana transformations to format and display the deeplink values as needed.

### Logs query type

The Logs query type retrieves log data from Dynatrace Log Monitoring v2. Use this query type to search and analyze application and infrastructure log data within Grafana.

> Note
>
> The Logs query type is in beta. The underlying Dynatrace API is an Early Adopter release and may change in ways that are not compatible with the Dynatrace plugin. If you encounter issues, contact Grafana Support.

For additional information, refer to [Log Monitoring API](https://www.dynatrace.com/support/help/dynatrace-api/environment-api/log-monitoring-v2/get-search-logs) in the Dynatrace documentation.

**Query** - Enter a log search query using the [Dynatrace search query language](https://www.dynatrace.com/support/help/how-to-use-dynatrace/log-monitoring/analyze-log-data/log-viewer#sql).

Example queries:

- `loglevel="error"` - Return all error-level logs
- `log.source="/var/log/syslog"` - Return logs from a specific source
- `loglevel="error" OR loglevel="warn"` - Return error and warning logs
- `log.source="/var/log/syslog" AND loglevel="error"` - Combine multiple filters

**Sort** - Select the order for returned log entries. The dashboard’s time range is applied automatically.

Expand table

| Option       | Description                                                                           |
|--------------|---------------------------------------------------------------------------------------|
| Newest first | Returns logs in reverse chronological order (most recent first). This is the default. |
| Oldest first | Returns logs in chronological order (oldest first).                                   |

### Audit Logs query type

The Audit Logs query type retrieves security-relevant and configuration-change events from the Dynatrace Audit Log API. Use this query type to track administrative actions, not application or system logs.

For additional information, refer to [Audit logs API](https://www.dynatrace.com/support/help/dynatrace-api/environment-api/audit-logs/get-log) in the Dynatrace documentation.

**Filter** - *(Optional)* Enter filter criteria to narrow down audit log entries. You can filter by the following criteria:

Expand table

| Criteria  | Description                             | Example                        |
|-----------|-----------------------------------------|--------------------------------|
| user      | Filter by user who performed the action | `user("john.doe@example.com")` |
| eventType | Filter by event type                    | `eventType("CREATE","UPDATE")` |
| category  | Filter by category                      | `category("CONFIG")`           |
| entityId  | Filter by entity ID                     | `entityId("HOST-1234567890")`  |

Combine multiple filters by separating them with commas: `eventType("CREATE","UPDATE"),category("CONFIG")`

**Sort** - Select the order for returned audit log entries. The dashboard’s time range is applied automatically.

Expand table

| Option       | Description                                                                              |
|--------------|------------------------------------------------------------------------------------------|
| Newest first | Returns entries in reverse chronological order (most recent first). This is the default. |
| Oldest first | Returns entries in chronological order (oldest first).                                   |

### Management Zones query type

The Management Zones query type retrieves a list of all management zones configured in your Dynatrace environment. Management zones are used to define visibility and access boundaries within Dynatrace, allowing you to segment your monitored environment.

This query type returns management zone names and IDs, which can be useful for:

- Building dashboards that display management zone information
- Using management zone data in transformations
- Creating template variables for filtering other queries

For more information about management zones, refer to [Management zones](https://docs.dynatrace.com/docs/manage/management-zones) in the Dynatrace documentation.

### Direct API Access query type

Use Direct API Access when you need to query Dynatrace API endpoints that are not covered by the standard query types. This mode gives you full access to Dynatrace’s REST APIs and allows you to parse the response using [JSONPath](https://goessner.net/articles/JsonPath/).

**API Endpoint** - Enter the API path beginning with the version segment.

Expand table

| API                                                                                                                                       | Endpoint example         |
|-------------------------------------------------------------------------------------------------------------------------------------------|--------------------------|
| [Synthetics](https://www.dynatrace.com/support/help/dynatrace-api/environment-api/synthetic-v2/synthetic-locations-v2/get-all-locations/) | `v2/synthetic/locations` |
| [Events](https://www.dynatrace.com/support/help/dynatrace-api/environment-api/events-v2/get-events/)                                      | `v2/events`              |
| [Entities](https://www.dynatrace.com/support/help/dynatrace-api/environment-api/entity-v2/)                                               | `v2/entities`            |

**Fields** - Select how to parse the API response:

Expand table

| Option                  | Description                                                                                                         |
|-------------------------|---------------------------------------------------------------------------------------------------------------------|
| Auto                    | Returns a single frame with headers as JSON paths using the default parser.                                         |
| Parse Individual Fields | Allows you to extract specific fields using JSONPath expressions. Useful for large or deeply nested JSON responses. |

#### Parse Individual Fields options

When **Parse Individual Fields** is selected, configure the following options for each field you want to extract:

**Field** - Enter a [JSONPath](https://goessner.net/articles/JsonPath/) expression that identifies the value to extract from the API response.

**Type** - Specify how the extracted value should be interpreted:

Expand table

| Type    | Description                                                                                                                      |
|---------|----------------------------------------------------------------------------------------------------------------------------------|
| Auto    | Grafana detects the type automatically. Numbers within one year of the current Unix millisecond epoch are treated as timestamps. |
| String  | Treat value as text                                                                                                              |
| Number  | Treat value as a number                                                                                                          |
| Time    | Treat value as a timestamp                                                                                                       |
| Boolean | Treat value as true/false                                                                                                        |
| JSON    | Treat value as a JSON object                                                                                                     |

**Alias** - *(Optional)* Custom name for the extracted field. If left blank, the JSONPath expression becomes the column name.

**Nullable** - Toggle on to allow null values when the JSONPath expression does not match anything in the API response. This helps avoid parsing errors if data is missing for some items.

Click **+** to add more fields, or **-** to remove a field.

### SLO query type

The SLO query type retrieves Service Level Objectives from Dynatrace. SLOs measure how well a service is meeting its reliability targets, including error budgets, status, and burn rates.

For additional information, refer to [SLO API](https://docs.dynatrace.com/docs/discover-dynatrace/references/dynatrace-api/environment-api/service-level-objectives) in the Dynatrace documentation.

**SloSelector** - *(Optional)* Filter which SLOs to retrieve using Dynatrace selector syntax.

Example selectors:

- `name("my-slo-name")` - Filter by SLO name
- `id("slo-id")` - Filter by SLO ID
- `status("SUCCESS")` - Filter by status (SUCCESS, WARNING, or FAILURE)

**Sort** - *(Optional)* Control the ordering of returned SLO results. You can sort by name (ascending or descending) or by status.

**TimeFrame** - *(Optional)* Set the evaluation period for calculating SLO values. The default is `CURRENT`. You can use relative timeframes like `-1d` or `1h`.

**Demo** - *(Optional)* Toggle to retrieve demo/example SLOs instead of production SLOs. Useful for testing and training. Default is FALSE (production SLOs).

**Evaluate** - *(Optional)* Toggle to calculate and return current SLO values. When TRUE (default), SLOs include calculated metrics like error budget, status, and burn rate. Set to FALSE to return only SLO definitions.

**EnabledSlos** - *(Optional)* Filter SLOs by their enabled/disabled state:

Expand table

| Value   | Description                          |
|---------|--------------------------------------|
| TRUE    | Returns only enabled SLOs            |
| FALSE   | Returns only disabled SLOs           |
| (empty) | Returns all SLOs regardless of state |

**ShowGlobalSlos** - *(Optional)* Control whether to include global SLOs (not assigned to any management zone):

Expand table

| Value | Description                                                      |
|-------|------------------------------------------------------------------|
| TRUE  | Includes global SLOs visible to all users                        |
| FALSE | Excludes global SLOs, showing only management zone-specific SLOs |

### Events query type

The Events query type retrieves events from your Dynatrace environment using the Events API v2. Events include deployment markers, configuration changes, custom events, and other significant occurrences.

For additional information, refer to [Events API v2](https://docs.dynatrace.com/docs/discover-dynatrace/references/dynatrace-api/environment-api/events-v2) in the Dynatrace documentation.

**EventSelector** - *(Optional)* Filter which events to retrieve using Dynatrace selector syntax. The dashboard time range is applied automatically.

Example selectors:

- `eventType("CUSTOM_DEPLOYMENT")` - Filter by event type
- `eventType("CUSTOM_INFO","CUSTOM_ALERT")` - Filter by multiple event types
- `status("OPEN")` - Filter by event status

**EntitySelector** - *(Optional)* Filter events to those affecting specific entities.

Example selectors:

- `type("HOST")` - Events affecting hosts
- `entityId("HOST-1234567890ABCDEF")` - Events for a specific entity
- `tag("environment:production")` - Events for tagged entities

### Synthetic query type

The Synthetic query type retrieves synthetic monitoring data from Dynatrace. Use this query type to monitor simulated user interactions and API calls for availability and performance testing.

For additional information, refer to [Synthetic API](https://docs.dynatrace.com/docs/discover-dynatrace/references/dynatrace-api/environment-api/synthetic-v2) in the Dynatrace documentation.

Common use cases:

- Monitor synthetic test results and availability percentages
- Track synthetic test execution times and response times
- View synthetic monitor locations and configurations

**MonitorSelector** - *(Optional)* Filter which synthetic monitors to retrieve.

Example selectors:

- `type("HTTP")` - Filter by monitor type
- `name("Production Health Check")` - Filter by monitor name
- `enabled(true)` - Filter by enabled state

**EntitySelector** - *(Optional)* Filter synthetic data to specific entities or locations using Dynatrace entity selector syntax.

### Tokens query type

The Tokens query type retrieves information about API tokens configured in your Dynatrace environment. Use this query type for token auditing and management.

For additional information, refer to [Access tokens API](https://docs.dynatrace.com/docs/discover-dynatrace/references/dynatrace-api/environment-api/access-tokens-v2) in the Dynatrace documentation.

> Note
>
> Querying token information requires the `apiTokens.read` scope on your API token.

Common use cases:

- Audit API token usage and permissions
- Monitor token expiration dates
- Track token creation and modification
- Identify unused or overprivileged tokens

**TokenSelector** - *(Optional)* Filter which tokens to retrieve.

Example selectors:

- `owner("john.doe@example.com")` - Filter by token owner
- `name("grafana-token")` - Filter by token name
- `scopes("metrics.read")` - Filter by token scopes
