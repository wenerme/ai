---
title: "Jira query editor | Grafana Enterprise Plugins documentation"
description: "Learn how to use the Jira query editor to build queries and visualize issue data"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Jira query editor

The Jira query editor allows you to build queries to retrieve and visualize issue data from your Jira instance. For general documentation on querying data sources in Grafana, refer to [Query and transform data](/docs/grafana/latest/panels-visualizations/query-transform-data/).

You must select at least one field before the query can run. In dashboards and panel edit, click **Run query**. In Explore, Grafana runs the query for you. In either place, press **Cmd/Ctrl + Enter** to run the query.

## Query editor options

The following section describes the Jira-specific query editor options.

- **Select Fields** - Select one or more Jira issue fields to display, such as `Summary`, `Sprint Name`, and `Story point estimate`. Click the drop-down or anywhere in the field for a list of available options. Field names come from your Jira instance and can differ from the names in these docs.
- **Limit** - The maximum number of issues the plugin returns. The default is `50`. The plugin paginates through Jira results until it reaches this count, the last page, or an empty page.
- **Filter (JQL)** - Enter a valid JQL query to filter issues. Press **Cmd/Ctrl + Enter** to run the query.

To filter by the dashboard time range, use the `$__timeFrom` and `$__timeTo` macros in JQL. For syntax and more examples, refer to [Time range macros](/docs/plugins/grafana-jira-datasource/latest/template-variables/#time-range-macros).

> Note
>
> Grafana [SQL Expressions](/docs/grafana/latest/panels-visualizations/query-transform-data/sql-expressions/) aren’t supported for Jira queries. Use JQL and the transformations in this document instead of SQL Expressions.

## Grafana results vs Jira search

The same JQL can return a different row count or shape in Grafana than in Jira issue search:

- **Limit** defaults to `50`. Raise it if you expect more issues. The plugin paginates until it reaches this count or the last page.
- Grafana returns only the fields you select. Jira issue search shows a default column set.
- **Sprint** isn’t a single column. The plugin lists **Sprint Name**, **Sprint Start Date**, **Sprint End Date**, and **Sprint Complete Date** (plugin 2.5.4 or later).
- Multi-value array fields expand one issue into multiple rows. Refer to [Multi-value fields and extra rows](#multi-value-fields-and-extra-rows).
- Time range macros insert a quoted `yyyy-MM-dd HH:mm` timestamp. Don’t add extra quotes around `$__timeFrom` or `$__timeTo`.

## Filter and sort issues with JQL

The Jira data source uses Jira Query Language (JQL) to filter and sort issues. JQL uses field identifiers such as `project`, `issuetype`, `assignee`, `status`, and `sprint`. Those identifiers aren’t the same as the labels in **Select Fields**, which are display names from your Jira instance (for example, **Sprint Name** or **Story point estimate**).

The following example query finds all of Joe Smith’s issues in the TEST project:

jql [Copy code to clipboard] Copy

```jql
project = TEST AND assignee = 'Joe Smith'
```

You can also sort results using the `ORDER BY` clause:

jql [Copy code to clipboard] Copy

```jql
project = TEST AND status = 'In Progress' ORDER BY created DESC
```

For more information on JQL syntax, refer to:

- [Use advanced search with Jira Query Language (JQL)](https://support.atlassian.com/jira-software-cloud/docs/use-advanced-search-with-jira-query-language-jql/)
- [Search Jira like a boss with JQL](https://confluence.atlassian.com/jirasoftware/blog/2015/06/search-jira-like-a-boss-with-jql)

## Multi-value fields and extra rows

When you select an array field, the plugin creates one row per value. An issue with three owners, three components, or three labels appears three times if you include that field. That changes counts and joins.

To keep one row per issue:

1. Leave multi-value fields out of **Select Fields** when you only need a count or a unique issue list.
2. Or keep the field and add a **Group by** transformation on **Key** (or another unique field) after the query.

## Use Ad hoc filters

The Jira data source supports **Ad hoc filters** dashboard variables, which let you add filters to a dashboard without editing each query. Grafana appends the selected filters to Jira queries on the dashboard using `AND` conditions.

To use Ad hoc filters:

1. Add an **Ad hoc filters** variable to your dashboard. For more information, refer to [Add ad hoc filters](/docs/grafana/latest/dashboards/variables/add-template-variables/#add-ad-hoc-filters).
2. Select the Jira data source for the variable.
3. Use the filter controls to select a field, operator, and value.

## Jira Service Management fields

The plugin supports Jira Service Management (JSM) fields, including SLA metrics, approvals, and customer feedback. Field names vary by Jira instance. Check the **Select Fields** drop-down for the names in your environment.

### SLA metrics

SLA fields (for example, **Time to Resolution**) are returned as JSON formatted as a string. Typical keys include `ongoingCycle.breached`, `ongoingCycle.remainingTime.friendly`, and `completedCycles`. Use the **Extract fields** transformation to parse the values you need. Refer to [Extract fields](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/#extract-fields) for more information.

To show remaining SLA time for open requests:

1. Select Fields: **Key**, **Time to Resolution** (or the SLA field name in your instance)
2. Add JQL Filter: `project = 'SERVICE' AND status != done`
3. Add the **Extract fields** transformation:

   - Source: Time to Resolution
   - Format: JSON
   - Path: `ongoingCycle.remainingTime.friendly`
   - Alias: Remaining SLA
4. Select the **Table** visualization

### Approvals

Approvals expand into the following sub-fields. Each appears in **Select Fields** as the approval field name plus the sub-field name:

- **Name**
- **Final Decision**
- **Created Date**
- **Approvers**

### Customer feedback

Customer feedback fields expose a numeric **rating**. Feedback date fields are date and time values you can use in time series visualizations.

### Organizations and request participants

Organization fields return a comma-separated list of organization names. Request participant fields return a comma-separated list of display names.

## Create time series visualizations

To create time series visualizations from Jira data, select a date field along with a numeric field, then choose a time series visualization such as Time series, Bar chart, or Stat.

Common date fields include:

- `Created` - When the issue was created
- `Updated` - When the issue was last updated
- `Resolution Date` - When the issue was resolved
- `Sprint Start Date` - When the sprint started
- `Sprint End Date` - When the sprint ended
- `Sprint Complete Date` - When the sprint was completed

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

Use this transformation to add calculated columns from other fields. You can chain calculations and use calculated fields as inputs. Refer to [Add field from calculation](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/#add-field-from-calculation) for more information.

### Extract fields

Some Jira fields are returned as JSON formatted as a string. Use this transformation to parse JSON fields and extract specific values using JSON path notation. Refer to [Extract fields](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/#extract-fields) for more information.

> Note
>
> You can find examples in the **Jira JSON fields demo** dashboard, which you can import from the data source page. Refer to [Import a dashboard](/docs/plugins/grafana-jira-datasource/latest/#import-a-dashboard).

### Group by

This transformation provides grouping capabilities not available in JQL. Use it to group by sprints or other fields and aggregate metrics like velocity or story point completion rates. Refer to [Group by](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/#group-by) for more information.

### Outer join

This transformation combines two or more queries on a shared field. Use it to correlate data across queries. Refer to [Outer join](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/#outer-join) for more information.

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
> In all examples, ensure the **Limit** value is high enough to include all relevant issues. If the limit is lower than the actual number of issues, the results are incomplete.

### List issues in a table

1. Select Fields: **Key**, **Summary**, **Status**, **Assignee**
2. Add JQL Filter: `project = 'Your Project' AND status != done ORDER BY priority DESC`
3. Select the **Table** visualization

### Filter issues by the dashboard time range

1. Select Fields: **Key**, **Summary**, **Created**
2. Add JQL Filter: `project = 'Your Project' AND created >= $__timeFrom AND created <= $__timeTo`
3. Select the **Table** visualization

The plugin replaces `$__timeFrom` and `$__timeTo` with the dashboard time range. For more macro examples, refer to [Time range macros](/docs/plugins/grafana-jira-datasource/latest/template-variables/#time-range-macros).

### Show issues in the current sprint

1. Select Fields: **Key**, **Summary**, **Status**, **Sprint Name**
2. Add JQL Filter: `project = 'Your Project' AND sprint in openSprints() AND type != epic`
3. Select the **Table** visualization

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
