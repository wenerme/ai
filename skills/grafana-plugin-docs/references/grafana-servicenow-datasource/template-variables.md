---
title: "ServiceNow template variables | Grafana Enterprise Plugins documentation"
description: "Use template variables with the ServiceNow data source to create dynamic dashboards."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# ServiceNow template variables

Use template variables to create dynamic, reusable dashboards. Instead of hard-coding values like table names or filter criteria, you can use variables that appear as drop-down selectors at the top of your dashboard.

For general information about template variables, refer to [Variables](/docs/grafana/latest/dashboards/variables/).

## Create a query variable

The ServiceNow data source supports query variables that retrieve values directly from your ServiceNow instance. The variable query editor supports both **Table** and **Stats** query types, and includes the same filter, display value, time field, sort, and grouping options as the panel query editor.

> Note
>
> Variable queries are limited to a single field selection. To create variables for multiple fields, create a separate variable for each field.

To create a query variable:

1. Navigate to **Dashboard settings** &gt; **Variables**.
2. Click **Add variable**.
3. Select **Query** as the variable type.
4. Select the ServiceNow data source.
5. Set the **Query** type (**Table** or **Stats**).
6. Select a **Table** and a **Field** to retrieve values for.
7. Optionally add filters to narrow down the available values.
8. A preview of available values displays at the bottom of the editor.
9. Click **Apply**.

## Examples

The following examples demonstrate common variable use cases with the ServiceNow data source.

### Filter incidents by category

This example creates a variable that lists all incident categories, then uses it to filter a dashboard panel.

1. Create a query variable named `category`:

   1. Set **Query** type to **Table**.
   2. Set **Table** to `incident`.
   3. Set **Show Fields** to `category`.
2. Add a filter to a panel query:

   1. In the panel query editor, add a filter.
   2. Set the field to **Category**.
   3. Set the operator to **Equals**.
   4. Set the value to `${category}`.

The panel now displays only data for the category selected from the dashboard drop-down.

To see a working example, import the **Incidents By Category** pre-built dashboard from the data source configuration page.

### Filter incidents by priority

This example creates a variable for priority levels, which are choice fields with human-friendly labels.

1. Create a query variable named `priority`:

   1. Set **Query** type to **Table**.
   2. Set **Table** to `incident`.
   3. Set **Show Fields** to `priority`.
   4. Set **Display Value** to **All** so the variable shows labels like `1 - Critical` instead of raw numbers.
2. Use the variable in a panel filter:

   1. Set the field to **Priority**.
   2. Set the operator to **Equals**.
   3. Set the value to `${priority}`.

### Narrow variable options with filters

You can add filters to the variable query to limit which values appear in the drop-down. This is useful when a field has many values but you only want a subset.

1. Create a query variable named `active_category`:

   1. Set **Query** type to **Table**.
   2. Set **Table** to `incident`.
   3. Set **Show Fields** to `category`.
   4. Add a filter: **State** **Not Equals** `7` (Closed).

The variable drop-down now shows only categories that have at least one non-closed incident, rather than every category in the system.

### Use a Stats query variable

You can use Stats queries for variables when you need aggregated values. This example creates a variable that lists assignment groups with their incident counts.

1. Create a query variable named `assignment_group`:

   1. Set **Query** type to **Stats**.
   2. Set **Table** to `incident`.
   3. In **Show Field**, select `assignment_group` with the **count** aggregation.

The variable drop-down lists assignment groups based on incident data.

## Variable syntax

Use either of the following syntaxes to reference variables in your queries:

Expand table

| Syntax       | Example       |
|--------------|---------------|
| `$varname`   | `$category`   |
| `${varname}` | `${category}` |

The `${varname}` syntax is useful when the variable name is adjacent to other text (for example, `${table}_extended`).

For more information about variable syntax and advanced usage, refer to [Variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/).

## Use variables in queries

You can reference template variables in the following parts of the query editor:

- **Filter values:** Set a filter value to `$varname` to dynamically filter results based on the variable selection.
- **Filter field names:** Use a variable as the filter field to dynamically change which field is filtered.
- **Table selector:** Use a variable as the table name to switch between tables dynamically.
- **Group By:** Use variables to dynamically change how results are grouped.
- **Sort By:** Use variables in sort field names to dynamically control result ordering.
- **Time Field:** Use a variable to dynamically select which time field is applied.

When you type `$` in a filter value input, available variables are listed for selection.
