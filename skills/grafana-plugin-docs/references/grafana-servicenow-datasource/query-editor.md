---
title: "ServiceNow query editor | Grafana Enterprise Plugins documentation"
description: "Use the ServiceNow query editor to build Table and Stats queries in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# ServiceNow query editor

The ServiceNow query editor lets you build queries that retrieve records or aggregate statistics from your ServiceNow tables. Use Table queries to display individual records like incidents and change requests, or Stats queries to calculate metrics such as incident counts, average resolution times, and category breakdowns.

## Before you begin

- [Configure the ServiceNow data source](/docs/plugins/grafana-servicenow-datasource/latest/configure/).
- Verify your ServiceNow user has read access to the tables you want to query.

## Key concepts

The following terms are used throughout this document:

Expand table

| Term                | Description                                                                                                                                        |
|---------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| **Table API**       | ServiceNow REST API that returns individual records from a table. Used by Table queries.                                                           |
| **Aggregate API**   | ServiceNow REST API that returns aggregated statistics (count, sum, average, etc.) for table data. Used by Stats queries.                          |
| **Display value**   | A human-friendly label for a field value. For example, a severity of `1` displays as `1 - High` when display values are enabled.                   |
| **Field reference** | A field that points to a record in another ServiceNow table. You can expand references to access fields from the related table using dot notation. |

## Query types

The ServiceNow query editor supports two query types, selectable from the **Query** drop-down:

- **Table:** Returns individual records from a ServiceNow table. Use this for displaying data in table panels, stat panels, or any visualization that works with raw records.
- **Stats:** Returns aggregated statistics about table data using the Aggregate API. Use this for metric-based visualizations like graphs, bar charts, and gauges.

## Table query

A Table query retrieves records from a ServiceNow table with options to select fields, filter results, sort, and limit the number of rows returned.

### Table

Select a ServiceNow table from the **Table** drop-down. A predefined set of common tables is listed by default, but you can type a custom table name to query any table the user has access to.

### Show Fields

Select one or more fields to display using the **Show Fields** selector. Fields are returned in the order you specify. If **Use Sys Tables?** is enabled in the data source configuration, the drop-down is populated with available fields from the ServiceNow dictionary.

### Display value

The **Display Value** setting controls whether the query returns raw values or human-friendly labels. Select one of the following options:

Expand table

| Option    | Description                                                                                                                                                                                  |
|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **All**   | Displays human-friendly labels for choice fields and renders integer fields as numbers. This is the default and recommended option.                                                          |
| **True**  | Displays human-friendly labels for choice fields and renders integer fields as formatted strings.                                                                                            |
| **False** | Displays raw values for all fields. Choice fields like severity and state display as integer IDs (for example, `1` instead of `1 - High`). This option may provide better query performance. |

> Note
>
> According to the [ServiceNow API documentation](https://developer.servicenow.com/dev.do#!/reference/api/washingtondc/rest/c_TableAPI), **All** and **True** modes may be slower than **False** mode.

### Time field

The **Time Field** setting determines how the query interacts with your dashboard’s time range.

By default, the time field toggle is disabled and the query uses **Ignore Time** mode. In this mode, results aren’t filtered by the dashboard time range, and filters control which data is displayed.

When you enable the toggle, select a date or time field (for example, `opened_at`). Only records with values in that field that fall within the dashboard’s time range are returned.

### Sort by

Use the **Sort By** setting to order results by one or more fields. For each sort entry, select a field and choose **asc** (ascending) or **desc** (descending) order.

### Limit

Set a maximum number of rows to return. The default limit is `25`. Increase this value to retrieve more records, but be aware that large result sets may affect performance.

## Stats query

A Stats query retrieves aggregated statistics from a ServiceNow table using the Aggregate API.

### Show Field

Select one or more fields and the aggregation(s) to apply to each field. The following aggregations are available:

Expand table

| Aggregation | Description                           |
|-------------|---------------------------------------|
| **avg**     | Average value of the field.           |
| **min**     | Minimum value of the field.           |
| **max**     | Maximum value of the field.           |
| **sum**     | Sum of all values in the field.       |
| **count**   | Number of records matching the query. |

You can apply multiple aggregations to a single field and add multiple fields to a single query.

### Group by

Use the **Group By** setting to split aggregated results by one or more fields. For example, grouping by `priority` returns separate aggregated values for each priority level.

Group by results include a tag with the group field name and its values, which you can use with the **Labels to Fields** transformation to create separate columns.

### Filters

Stats queries support the same filter options as Table queries. Refer to the [Filters](#filters) section.

## Filters

Both Table and Stats queries support filters to narrow down results. Add filters using the **Filters** section of the query editor.

### Filter structure

Each filter consists of:

- **Field:** The ServiceNow table field to filter on.
- **Operator:** The comparison operator.
- **Value:** The value to compare against (some operators don’t require a value).
- **Conjunction:** How this filter combines with the next filter (**AND**, **OR**, or **NQ**).

### Conjunctions

Expand table

| Conjunction | Description                                                                                                     |
|-------------|-----------------------------------------------------------------------------------------------------------------|
| **AND**     | Both the current filter and the next filter must be true.                                                       |
| **OR**      | Either the current filter or the next filter must be true.                                                      |
| **NQ**      | Starts a new query group. Use NQ (New Query) to create independent filter groups that are evaluated separately. |

### String operators

Expand table

| Operator            | Description                                            |
|---------------------|--------------------------------------------------------|
| **Starts With**     | Field value starts with the specified text.            |
| **Ends With**       | Field value ends with the specified text.              |
| **Like**            | Field value contains the specified text.               |
| **Not Like**        | Field value doesn’t contain the specified text.        |
| **Equals**          | Field value exactly matches the specified text.        |
| **Not Equals**      | Field value doesn’t match the specified text.          |
| **Is Empty**        | Field has no value (null).                             |
| **Is Not Empty**    | Field has a value (not null).                          |
| **Is one of**       | Field value matches one of the specified values.       |
| **Is not one of**   | Field value doesn’t match any of the specified values. |
| **Is anything**     | Matches any value (no filtering).                      |
| **Is empty string** | Field value is an empty string.                        |

### Date operators

Expand table

| Operator                    | Description                                         |
|-----------------------------|-----------------------------------------------------|
| **Today**                   | Field value falls within today.                     |
| **Not Today**               | Field value doesn’t fall within today.              |
| **Before**                  | Field value is before the specified date.           |
| **At or Before**            | Field value is on or before the specified date.     |
| **After**                   | Field value is after the specified date.            |
| **At or After**             | Field value is on or after the specified date.      |
| **Relative (on or after)**  | Field value is on or after a relative time period.  |
| **Relative (on or before)** | Field value is on or before a relative time period. |
| **Relative (after)**        | Field value is after a relative time period.        |
| **Relative (before)**       | Field value is before a relative time period.       |
| **Relative (on)**           | Field value falls on a relative time period.        |

### Number operators

Expand table

| Operator          | Description                                                   |
|-------------------|---------------------------------------------------------------|
| **=**             | Field value equals the specified number.                      |
| **!=**            | Field value doesn’t equal the specified number.               |
| **Empty**         | Field has no value.                                           |
| **Not Empty**     | Field has a value.                                            |
| **&gt;**          | Field value is greater than the specified number.             |
| **&lt;**          | Field value is less than the specified number.                |
| **&lt;=**         | Field value is less than or equal to the specified number.    |
| **&gt;=**         | Field value is greater than or equal to the specified number. |
| **Is one of**     | Field value matches one of the specified numbers.             |
| **Is not one of** | Field value doesn’t match any of the specified numbers.       |

### Boolean operators

Expand table

| Operator         | Description                                      |
|------------------|--------------------------------------------------|
| **Equals**       | Field value equals True or False.                |
| **Not Equals**   | Field value doesn’t equal the specified boolean. |
| **Is empty**     | Field has no value.                              |
| **Is not empty** | Field has a value.                               |
| **Is anything**  | Matches any value.                               |

### Filter value types

The input for filter values depends on the field type:

- **Boolean fields:** Display a True/False selector.
- **Text fields:** Display a free-text input.
- **Date fields:** Display a date picker when a date value is required.
- **Choice fields:** Display a drop-down with available choices (when **Use Sys Tables?** is enabled).
- **No-value operators:** Operators like **Is anything**, **Today**, **Not Today**, **Is Empty**, **Is Not Empty**, and **Is empty string** don’t display an additional input.

## Field references

Fields that reference other ServiceNow tables can be expanded to access fields from the related table. In the field selector, reference fields display a collapse indicator. Click to expand and view the available sub-fields.

To use a field from a referenced table, select it using dot notation (for example, `caller_id.name` to get the caller’s name from the `sys_user` table).

> Note
>
> Field references expand to one level deep only. If a referenced table contains its own reference fields, those second-level references can’t be expanded further.

## Annotations

The ServiceNow data source supports annotations using the standard query editor. For examples and a step-by-step guide, refer to [Annotate dashboards with ServiceNow events](/docs/plugins/grafana-servicenow-datasource/latest/annotations/).

## Transformations

You can apply [transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to ServiceNow query results to reshape data for your visualizations.

The [Labels to fields](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/#labels-to-fields) transformation is particularly useful with Stats queries that use **Group By**. It converts group-by label values into separate table columns.

## Next steps

- [Set up alerting with ServiceNow queries](/docs/plugins/grafana-servicenow-datasource/latest/alerting/)
- [Annotate dashboards with ServiceNow events](/docs/plugins/grafana-servicenow-datasource/latest/annotations/)
- [Use template variables](/docs/plugins/grafana-servicenow-datasource/latest/template-variables/)
