---
title: "Salesforce query editor | Grafana Enterprise Plugins documentation"
description: "Learn how to use the Salesforce query editor Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Salesforce query editor

The Salesforce query editor is located on the [Explore page](/docs/grafana/latest/explore/). Grafana provides three query modes for Salesforce:

- [SOQL (Salesforce Object Query Language](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql.htm)) editor
- Query builder
- Reports

For general information on Grafana query editors, refer to [Query editors](/docs/grafana/latest/panels-visualizations/query-transform-data/#query-editors).

Refer to [Query management in Explore](/docs/grafana/latest/explore/query-management/) to learn more about options for managing your queries in Grafana.

## SOQL editor mode

SOQL is Salesforce’s query language. The SOQL editor allows you to query Salesforce objects using a SOQL query. The SOQL editor also provides autocomplete suggestions, such as available entities per tables and corresponding fields. Use `Ctrl+Space` after `SELECT` or `WHERE` to see the available entities per table. You can view the available fields by entering a dot after the entity name.

For detailed information on SOQL refer to the following Salesforce documentation:

- [Salesforce Object Query Language (SOQL)](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql.htm)
- [SOQL SELECT Syntax](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql_select.htm)
- [SOQL SELECT Functions](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql_select_functions.htm)
- [SOQL SELECT Examples](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql_select_examples.htm)

## Query builder mode

The Salesforce query builder is a user-friendly interface for building SOQL queries. If you are less familiar with writing SOQL queries, you can use this mode to build the SOQL to query Salesforce objects.

> Note
>
> When switching from SOQL Editor mode to Query Builder mode, a warning will appear, alerting you that any unsaved changes will be lost.

The `FROM` field in the query builder refers to the entity or entities in Salesforce. You need to select the `FROM` field before any other operation in the query builder. After you choose the `FROM` field, you need to choose the builder mode. SOQL Builder currently supports the following modes.

The following options are available in Query builder mode:

- **Entity** - The Salesforce entity or table. Corresponds to SELECT in SOQL syntax.
- **Show as** - The way you wish to view the data.

  - **Table** - Displays query results in a table format.
  - **Aggregate** - Displays results as an aggregate, such as “Total count of opportunities last month grouped by region”.
  - **Timeseries** - Displays results over time, such as “Count the number of opportunities by CreatedDate” or “What is the total sum of `value` grouped by the opportunity’s closing dates”.
- **Fields** - List of fields to display. Use Standard/All/Custom to show all fields.
- **Filters** - Click **+ Add filter** to add filtering conditions. Select available options and corresponding operators from the drop-down menus. You can select multiple filters.
- **Order by** - Click **+ Add order by** to add fields to order or sort by. Select available options from the drop-down menu. You can order by `ASC` or `DESC` and `NULLS LAST` or `NULLS FIRST`. You can add multiple order by options.
- **Limit** - The number or rows or records returned. The default is `100`.
- **SOQL preview** - A preview of the SOQL query based on the configuration of the previous fields. You can safely switch to SOQL editor mode (without losing your work) to customize the generated query.

## Reports mode

The Reports provides a quick way to access Salesforce reports. Click the drop-down for a list of available reports to view.

## Filter limitations

When using the Query Builder, queries will fail if they include complex filter logic. Queries with only *AND* statements or only *OR* statements across multiple filters will work correctly. However, if both *AND* and *OR* statements are used together, it is recommended to use SOQL mode. This recommendation also applies when using nested filters.

## Shortcuts

You can use the following shortcuts in the Salesforce query editor:

- **Ctrl+Space** - Displays code suggestions, showing relevant contextual options.
- **Cmd**+**S** - Runs a query.

## Query as time series

Create a time series query by aliasing the date field to `time` and a metric field to `metric`, then grouping by metric and date.

Example:

SOQL [Copy code to clipboard] Copy

```soql
SELECT sum(Amount) amount, CloseDate time, Type metric
FROM Opportunity
GROUP BY Type, CloseDate
```

## Macros

You can use macros in your SOQL queries to filter by the dashboard’s time range. The following macros are

- `$__timeFrom` - Replaced by the start time of the current active time range, converted to the `time` data type.
- `$__timeTo` - Replaced by the end time of the current active time range, converted to the `time` data type.
- `$__quarterStart`- The start of the fiscal quarter ( derived from SalesForce Fiscal Year Settings )
- `$__quarterEnd` - The end of the fiscal quarter ( derived from SalesForce Fiscal Year Settings )

Example:

SOQL [Copy code to clipboard] Copy

```soql
SELECT UserId, LoginTime from LoginHistory where LoginTime > $__timeFrom
```
