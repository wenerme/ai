---
title: "Jira query editor | Grafana Enterprise Plugins documentation"
description: "Learn how to use the Jira query editor to build queries and visualize issue data"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Jira query editor

The Jira query editor allows you to build queries to retrieve and visualize issue data from your Jira instance. For general documentation on querying data sources in Grafana, refer to [Query and transform data](/docs/grafana/latest/panels-visualizations/query-transform-data/).

## Query editor options

The following section describes the Jira-specific query editor options.

- **Select Fields** - Select one or more Jira issue fields to display, such as `Epic Name`, `Summary`, `Sprint Name`, and `Story point estimate`. Click the drop-down or anywhere in the field for a list of available options.
- **Limit** - Limits the number of issues returned by the query. The default is `50`. If this value exceeds the limit configured in your Jira instance, the Jira limit takes precedence.
- **Filter (JQL)** - Enter a valid JQL query to filter issues. Press **Cmd/Ctrl + Enter** to run the query.

## Filter and sort issues with JQL

The Jira data source uses Jira Query Language (JQL) to filter and sort issues. JQL is a powerful query language that allows you to search for issues based on any field, such as `Project Name`, `Issue Type`, `Assignee Name`, or `Sprint Name`.

The following example query finds all of Joe Smith’s issues in the TEST project:

jql [Copy code to clipboard] Copy

```jql
project = 'TEST' AND assignee = 'Joe Smith'
```

You can also sort results using the `ORDER BY` clause:

jql [Copy code to clipboard] Copy

```jql
project = 'TEST' AND status = 'In Progress' ORDER BY created DESC
```

For more information on JQL syntax, refer to:

- [Use advanced search with Jira Query Language (JQL)](https://support.atlassian.com/jira-software-cloud/docs/use-advanced-search-with-jira-query-language-jql/)
- [Search Jira like a boss with JQL](https://confluence.atlassian.com/jirasoftware/blog/2015/06/search-jira-like-a-boss-with-jql)

## Use ad-hoc filters

The Jira data source supports ad-hoc filters, which allow you to add dynamic filters to your dashboard without modifying individual queries. Ad-hoc filters are automatically appended to all Jira queries on the dashboard using `AND` conditions.

To use ad-hoc filters:

1. Add an **Ad hoc filters** variable to your dashboard. For more information, refer to [Add ad hoc filters](/docs/grafana/latest/dashboards/variables/add-template-variables/#add-ad-hoc-filters).
2. Select the Jira data source for the variable.
3. Use the filter controls to select a field, operator, and value.

The selected filters are automatically applied to all Jira queries on the dashboard.

## Create time series visualizations

To create time series visualizations from Jira data, select a date field along with a numeric field, then choose a time series visualization such as Time series, Bar chart, or Stat.

Common date fields include:

- `Created` - When the issue was created
- `Updated` - When the issue was last updated
- `Resolution Date` - When the issue was resolved
- `Sprint Start Date` - When the sprint started
- `Sprint End Date` - When the sprint ended

Common numeric fields include:

- `Story point estimate` - Estimated story points
- `Time Spent` - Time logged on the issue
- `Original Estimate` - Original time estimate

To aggregate data over time, use the **Group By** transformation. For example, to visualize story points completed per sprint:

1. Select Fields: **Sprint Start Date**, **Story point estimate**
2. Add JQL Filter: `project = 'Your Project' AND status = done`
3. Add the **Group By** transformation:

   - Sprint Start Date | Group By
   - Story point estimate | Calculate | Total
4. Select the **Time series** or **Bar chart** visualization

## Work with transformations

Grafana transformations extend JQL capabilities by allowing you to manipulate, calculate, and reshape your data. For more information on transformations, refer to [Transform data](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/).

The following transformations are particularly useful when working with Jira data:

### Add field from calculation

Similar to SQL expressions, this transformation allows you to add new fields based on calculations from other fields. You can chain calculations together and perform calculations from calculated fields. Refer to [Add field from calculation](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/#add-field-from-calculation) for more information.

### Extract fields

Some Jira fields are returned as “stringified JSON” (JSON formatted as a string). Use this transformation to parse JSON fields and extract specific values using JSON path notation. Refer to [Extract fields](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/#extract-fields) for more information.

> Note
>
> Stringified JSON fields are available in Grafana 9.4 and later. You can find examples in the **Jira JSON fields demo** dashboard, which you can import from the data source page. Refer to [Import a dashboard](/docs/plugins/grafana-jira-datasource/latest/#import-a-dashboard).

### Group by

This transformation provides grouping capabilities not available in JQL. Use it to group by sprints or other fields and aggregate metrics like velocity or story point completion rates. Refer to [Group by](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/#group-by) for more information.

### Outer join

Similar to SQL joins, this transformation combines two or more queries by common fields. Use it to correlate data across multiple queries. Refer to [Outer join](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/#outer-join) for more information.

## Work with linked issues

The `Linked Issues` field returns JSON as a string. Because Jira returns linked issues in different paths (for example, “blocks” or “is blocked by”), you need to use transformations to extract and display the data.

> Note
>
> You can find a complete example in the **Jira JSON fields demo** dashboard, which you can import from the data source page.

To display linked issues:

1. Add a query:

   - Select Fields: **Key**, **Linked Issues**
   - Add JQL Filter: `project = 'YOUR_PROJECT'`
2. Duplicate the query (you now have Query A and Query B).
3. Add the **Extract fields** transformation:

   - Source: Linked Issues
   - Format: JSON
   - Path: `inwardIssue.key`
   - Alias: Linked issue key
   - Apply transformation filter to Query A only
4. Add another **Extract fields** transformation:

   - Use the same settings but with path `outwardIssue.key`
   - Apply transformation filter to Query B only
5. Add the [**Filter data by value**](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/#filter-data-by-values) transformation:

   - Filter type: Include
   - Conditions: Match any
   - Condition 1: Field = Linked Issues, Match = Is equal, Value = *(empty)*
   - Condition 2: Field = Linked Issues, Match = Regex, Value = `inwardIssue`
   - Apply transformation filter to Query A only
6. Add another **Filter data by value** transformation:

   - Use the same settings but with Regex value `outwardIssue`
   - Apply transformation filter to Query B only
7. Add the [**Merge**](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/#merge-seriestables) transformation.
8. Add the [**Organize fields**](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/#organize-fields-by-name) transformation:

   - Hide the `Linked Issues` field containing raw JSON

## Examples

The following examples demonstrate common use cases for the Jira data source.

> Note
>
> Field names like **Sprint Name** and **Story point estimate** are custom fields that may have different names in your Jira instance. Check the **Select Fields** drop-down to find the correct field names for your environment.

> Note
>
> In all examples, ensure the **Limit** value is high enough to include all relevant issues. If the limit is lower than the actual number of issues, the results will be incomplete.

### Show velocity per sprint

1. Select Fields: **Sprint Name**, **Story point estimate**
2. Add JQL Filter: `project = 'Your Project' AND type != epic AND status = done ORDER BY created ASC`
3. Add the **Group By** transformation:

   - Sprint Name | Group By
   - Story point estimate | Calculate | Total
4. Select the **Bar gauge** visualization

### Compare completed vs. estimated story points

1. Add Query A:

   - Select Fields: **Sprint Name**, **Sprint Start Date**, **Story point estimate**
   - Add JQL Filter: `project = 'Your Project' AND type != epic`
2. Add Query B:

   - Select Fields: **Sprint Name**, **Sprint Start Date**, **Story point estimate**
   - Add JQL Filter: `project = 'Your Project' AND type != epic AND status = done`
3. Add the **Group By** transformation:

   - Sprint Name | Group By
   - Sprint Start Date | Group By
   - Story point estimate | Calculate | Total
4. Select the **Time series** visualization

### Calculate average time to complete issues

1. Add a query:

   - Select Fields: **Created**, **Status Category Changed**
   - Add JQL Filter: `project = 'Your Project' AND type != epic AND status = done`
2. Add the **Add field from calculation** transformation:

   - Mode: Reduce Row
   - Calculation: Difference
3. Add another **Add field from calculation** transformation:

   - Mode: Binary Operation
   - Operation: Difference / 86400000 *(milliseconds per day: 1000 × 3600 × 24)*
   - Alias: Days
4. Add the **Organize fields** transformation:

   - Hide the Difference field
5. Add the **Filter data by value** transformation:

   - Filter Type: Include
   - Conditions: Match any
   - Condition: Field = Days, Match = Is Greater, Value = 1
6. Add the **Reduce** transformation:

   - Mode: Series to Rows
   - Calculations: Mean
7. Select the **Stat** visualization

### Show issues by status

1. Select Fields: **Status**, **Key**
2. Add JQL Filter: `project = 'Your Project'`
3. Add the **Group By** transformation:

   - Status | Group By
   - Key | Calculate | Count
4. Select the **Pie chart** visualization

### Show issues per assignee

1. Select Fields: **Assignee**, **Key**
2. Add JQL Filter: `project = 'Your Project' AND status != done`
3. Add the **Group By** transformation:

   - Assignee | Group By
   - Key | Calculate | Count
4. Select the **Bar gauge** visualization
