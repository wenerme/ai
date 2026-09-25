---
title: "Salesforce query editor | Grafana Enterprise Plugins documentation"
description: "Learn how to use the Salesforce query editor in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Salesforce query editor

You can use the Salesforce query editor when you edit a dashboard panel or on the [Explore page](/docs/grafana/latest/explore/). Grafana provides three query modes for Salesforce:

- [SOQL (Salesforce Object Query Language)](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql.htm) editor
- Query builder
- Reports

For general information on Grafana query editors, refer to [Query editors](/docs/grafana/latest/panels-visualizations/query-transform-data/#query-editors).

Refer to [Query management in Explore](/docs/grafana/latest/explore/query-management/) to learn more about options for managing your queries in Grafana.

## SOQL editor mode

SOQL is the Salesforce query language. The SOQL editor allows you to query Salesforce objects using a SOQL query. The SOQL editor also provides autocomplete suggestions, such as available entities per tables and corresponding fields. Use `Ctrl+Space` after `SELECT` or `WHERE` to see the available entities per table. You can view the available fields by entering a dot after the entity name.

For example, the following query returns the most recent opportunities:

soql [Copy code to clipboard] Copy

```soql
SELECT Name, Amount, StageName, CloseDate
FROM Opportunity
ORDER BY CloseDate DESC
LIMIT 50
```

For detailed information on SOQL refer to the following Salesforce documentation:

- [Salesforce Object Query Language (SOQL)](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql.htm)
- [SOQL SELECT Syntax](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql_select.htm)
- [SOQL SELECT Functions](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql_select_functions.htm)
- [SOQL SELECT Examples](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql_select_examples.htm)

## Query builder mode

The Salesforce query builder is a user-friendly interface for building SOQL queries. If you are less familiar with writing SOQL queries, you can use this mode to build the SOQL to query Salesforce objects.

> Note
>
> When switching from SOQL editor mode to Query builder mode, a warning appears, alerting you that any unsaved changes are lost.

The **Entity** field selects the Salesforce entity, or table, to query. It corresponds to the `FROM` clause in SOQL. Select the **Entity** before any other operation in the query builder. After you choose the entity, choose the **Show as** mode.

The following options are available in Query builder mode:

- **Entity** - The Salesforce entity, or table, to query. Corresponds to the `FROM` clause in SOQL syntax.
- **Show as** - The way you want to view the data.

  - **Table** - Displays query results in a table format.
  - **Aggregate** - Displays results as an aggregate, such as “Total count of opportunities last month grouped by region”.
  - **Timeseries** - Displays results over time, such as “Count the number of opportunities by CreatedDate” or “What is the total sum of `value` grouped by the opportunity’s closing dates”.
- **Fields** - The fields to display. Select individual fields, or choose **Standard Fields**, **All Fields**, or **Custom Fields** to include a group of fields. In Aggregate and Timeseries modes, this selects the metrics to show, along with an aggregation such as `COUNT`, `SUM`, `AVG`, `MIN`, or `MAX`.
- **Time field** - Available in Timeseries mode. The date or datetime field used to plot results over time.
- **Group by** - Available in Aggregate mode. Groups the results by one or more fields. Corresponds to the `GROUP BY` clause in SOQL syntax.
- **Filters** - Click **+ Add filter** to add filtering conditions. Select available options and corresponding operators from the drop-down menus. You can select multiple filters.
- **Order by** - Click **+ Add order by** to add fields to order or sort by. Select available options from the drop-down menu. You can order by `ASC` or `DESC` and `NULLS LAST` or `NULLS FIRST`. You can add multiple order by options.
- **Limit** - The number of rows or records returned. The default is `100`.
- **SOQL preview** - A preview of the SOQL query based on the configuration of the previous fields. You can safely switch to SOQL editor mode (without losing your work) to customize the generated query.

For example, to list recently closed opportunities, make the following selections:

- **Entity**: `Opportunity`
- **Show as**: Table
- **Fields**: `Name`, `StageName`, `Amount`
- **Filters**: `StageName` equals `Closed Won`
- **Limit**: `100`

The **SOQL preview** then shows a query similar to the following:

soql [Copy code to clipboard] Copy

```soql
SELECT Name, StageName, Amount FROM Opportunity WHERE StageName = 'Closed Won' LIMIT 100
```

## Reports mode

Reports mode lets you run an existing Salesforce report and use its results in Grafana without writing SOQL. Use this mode when a report is already defined in Salesforce and you want to visualize its output.

To run a report:

1. In Reports mode, click the **Report** drop-down. The list shows the reports available to your authenticated Salesforce user.
2. Select a report to run it and return its data.

The data source returns the report’s detail rows using the report’s detail columns, so the fields match the columns defined in the Salesforce report. Tabular reports and reports with groupings, such as summary and matrix reports, are supported.

Consider the following when you use Reports mode:

- The report definition, including its filters and columns, is managed in Salesforce. You can’t change the report’s filters or fields from Grafana.
- The dashboard time range and time macros don’t apply to Reports mode. To filter by time, configure the filters in the Salesforce report, or use SOQL editor mode with the [macros](#macros).
- You must have permission to view the report in Salesforce, and the report can’t be deleted. If a report doesn’t run, refer to [Report not found](/docs/plugins/grafana-salesforce-datasource/latest/troubleshooting/#report-not-found) and [Report timeout](/docs/plugins/grafana-salesforce-datasource/latest/troubleshooting/#report-timeout).

## Filter limitations

When using the query builder, queries fail if they include complex filter logic. Queries with only *AND* statements or only *OR* statements across multiple filters work correctly. However, if you use both *AND* and *OR* statements together, use SOQL editor mode instead. This recommendation also applies to nested filters.

## Shortcuts

You can use the following shortcuts in the Salesforce query editor:

- **Ctrl+Space** - Displays code suggestions, showing relevant contextual options.
- **Cmd+S** (macOS) or **Ctrl+S** (Windows and Linux) - Runs the query. You can also click the run (play) button in the SOQL editor.

## Query as time series

Create a time series query by aliasing the date field to `time` and a metric field to `metric`, then grouping by metric and date.

Example:

soql [Copy code to clipboard] Copy

```soql
SELECT SUM(Amount) amount, CloseDate time, Type metric
FROM Opportunity
GROUP BY Type, CloseDate
```

## Macros

You can use macros in your SOQL queries to filter by the dashboard’s time range. The following macros are available:

Expand table

| Macro             | Description                                                                                     |
|-------------------|-------------------------------------------------------------------------------------------------|
| `$__timeFrom`     | Replaced by the start time of the current active time range, converted to the `time` data type. |
| `$__timeTo`       | Replaced by the end time of the current active time range, converted to the `time` data type.   |
| `$__quarterStart` | The start of the fiscal quarter, derived from your Salesforce fiscal year settings.             |
| `$__quarterEnd`   | The end of the fiscal quarter, derived from your Salesforce fiscal year settings.               |

The `$__timeFrom` and `$__timeTo` macros expand to full datetime values, so use them with datetime fields such as `CreatedDate` or `LoginTime`. The `$__quarterStart` and `$__quarterEnd` macros expand to date-only values, so use them with date fields such as `CloseDate`.

The following example filters a datetime field by the dashboard’s time range:

soql [Copy code to clipboard] Copy

```soql
SELECT UserId, LoginTime FROM LoginHistory WHERE LoginTime > $__timeFrom
```

The following example filters a date field by the current fiscal quarter:

soql [Copy code to clipboard] Copy

```soql
SELECT SUM(Amount) amount FROM Opportunity WHERE CloseDate >= $__quarterStart AND CloseDate <= $__quarterEnd
```
