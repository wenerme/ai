---
title: "Dynatrace template variables | Grafana Enterprise Plugins documentation"
description: "Create template variables for Dynatrace in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Templates and variables

Template variables allow you to create dynamic, reusable dashboards. Instead of hard-coding values like metric names or host names, you can use variables that users can change from a drop-down menu.

## Supported variable types

The Dynatrace plugin provides data source support for the following Grafana variable types:

Expand table

| Variable type  | Description                                                                                                  |
|----------------|--------------------------------------------------------------------------------------------------------------|
| Query          | Dynamically fetches values from your Dynatrace environment. This is the primary variable type for Dynatrace. |
| Ad-hoc filters | Automatically applies key-value filters to all metric queries on a dashboard.                                |

> Note
>
> You can also use Grafana’s built-in variable types (Custom, Text box, Constant, Interval) with Dynatrace queries. These variables are defined manually and are not populated from Dynatrace. For more information, refer to [Variable types](/docs/grafana/latest/dashboards/variables/add-template-variables/#variable-types).

## Query variables

Query variables dynamically fetch values from your Dynatrace environment. To add a new Dynatrace query variable, refer to [Add a query variable](/docs/grafana/latest/dashboards/variables/add-template-variables/#add-a-query-variable).

When creating a query variable, select your Dynatrace data source and choose from the following query types:

Expand table

| Query type               | Description                                                                                                                                                                                                                                                                                                                     |
|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Metric names             | Returns a list of all metric names.                                                                                                                                                                                                                                                                                             |
| Filter keys              | Returns a list of all possible dimensions (for example, Hostname) that can be used to filter.                                                                                                                                                                                                                                   |
| Filter values for key    | Returns a list of filtered values by a key name or a key name template variable.                                                                                                                                                                                                                                                |
| Problem status options   | Returns a list of all problem statuses.                                                                                                                                                                                                                                                                                         |
| Problem impact options   | Returns a list of all problem impacted areas.                                                                                                                                                                                                                                                                                   |
| Problem severity options | Returns a list of all problem severity types.                                                                                                                                                                                                                                                                                   |
| Management Zones         | Returns a list of all management zones configured in your Dynatrace environment.                                                                                                                                                                                                                                                |
| Query Editor             | Allows you to configure a custom query using the query editor to create a custom template variable. The query must return only 1 column. When your query returns 1 column, click the **Apply** button. Optionally, a raw query can return two columns named `text` and `value` to have different display values for the values. |

**Regex** - *(Optional)* Filter out any of the returned values from your query with a regular expression.

> Note
>
> `Multi-value` and `Include All option` support varies by query type. Test your specific use case to verify compatibility.

## Ad-hoc filters

Ad-hoc filters let users add filters to all metric queries on a dashboard without editing each panel. The Dynatrace plugin populates filter options from your Dynatrace entity types (such as Host, Process, or Service).

To create an ad-hoc filter variable:

1. Go to **Dashboard settings** &gt; **Variables** &gt; **New variable**.
2. Select **Ad hoc filters** as the variable type.
3. Select your Dynatrace data source.
4. Click **Apply**.

Once configured, a filter bar appears at the top of your dashboard. Users can add filters by selecting an entity type (key) and a specific entity (value). These filters automatically apply to all metric queries on the dashboard.

## Variable syntax

The Dynatrace plugin supports multiple variable syntax formats:

Expand table

| Syntax             | Example    | Description                             |
|--------------------|------------|-----------------------------------------|
| `$variablename`    | `$host`    | Simple syntax                           |
| `[[variablename]]` | `[[host]]` | Legacy syntax                           |
| `${variablename}`  | `${host}`  | Advanced syntax with formatting options |

## Where to use variables

You can use template variables in the following query fields:

Expand table

| Query type | Supported fields                                                                     |
|------------|--------------------------------------------------------------------------------------|
| Metrics    | Metric name, Management Zones, Filter keys, Filter values, Alias, Code mode selector |
| Problems   | Status, Impact, Severity, Tags                                                       |
| USQL       | Query text                                                                           |
| Logs       | Query text                                                                           |
| Audit Logs | Filter text                                                                          |
| Direct API | API endpoint                                                                         |

## Chaining variables

A common pattern is to chain “Filter keys” and “Filter values for key” variables together. This allows users to first select a dimension (like Host or Process), then select a specific value for that dimension.

To chain variables:

1. Create a variable using **Filter keys** query type. Name it something like `filterKey`.
2. Create a second variable using **Filter values for key** query type.
3. In the **Filter key name** field, enter `$filterKey`.

Now the second variable’s options dynamically update based on the first variable’s selection.

## Additional resources

For more information about variables in Grafana, refer to [Templates and variables](/docs/grafana/latest/dashboards/variables/).
