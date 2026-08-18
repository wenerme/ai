---
title: "Honeycomb template variables | Grafana Enterprise Plugins documentation"
description: "Create dynamic dashboards with Honeycomb template variables in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Honeycomb template variables

You can use Grafana template variables with the Honeycomb data source to create dynamic, reusable dashboards.

## Before you begin

- [Configure the Honeycomb data source](/docs/plugins/grafana-honeycomb-datasource/latest/configure/).
- Understand [Grafana template variables](/docs/grafana/latest/dashboards/variables/).

To add a new Honeycomb query variable, refer to [Add a query variable](/docs/grafana/latest/dashboards/variables/add-template-variables/#add-a-query-variable). Use your Honeycomb data source as your data source.

## Query types

The variable editor provides four query types, selectable via the **Query Type** radio buttons.

### Default

The Default query type creates variables containing datasets, columns, or column values, depending on which fields you fill in:

- **No dataset selected:** Returns datasets (slug and name). This is equivalent to selecting the **Datasets** query type.
- **Dataset selected, no column selected:** Returns column names for the selected dataset, including derived columns and environment-derived columns.
- **Dataset and column selected:** Returns values for the specified column. The query runs against the Honeycomb API and returns up to 1000 unique values.

When querying column values, the following additional options are available:

- **Returned data:** Controls how values are extracted from query results.

  - **series (default):** Returns the breakdown group labels from time-series results.
  - **result:** Returns distinct values directly from the specified column in the result data.
  - **both:** Combines series and result data.
- **Where:** Filter the data before extracting column values, using the same filter operators available in the [metrics query editor](/docs/plugins/grafana-honeycomb-datasource/latest/query-editor/#where-filters).
- **Constraint:** Set the filter combination to **AND** or **OR** when using multiple filters.

### Datasets

Returns dataset slugs. Slugs are a transformed, lowercase version of the dataset name and are the traditional format used by the Honeycomb API.

When your environment contains more than one dataset, the list includes `__all__` so you can select the cross-dataset option in queries.

### Dataset Names

Returns the actual display names of datasets. Use this option when you need human-readable names for display purposes or when the slug and display name don’t match.

When your environment contains more than one dataset, the list includes `__all__`.

### SLO List

Returns SLO definitions for a selected dataset. Each entry returns the SLO name as the display text and the SLO ID as the value, which you can use in SLO detail queries.

## Use variables in queries

After you create a variable, you can use it in your Honeycomb queries. For more information, refer to [Variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/).

Raw queries also support template variable substitution, including multi-value variables with `in` and `not-in` operators. Refer to [Use variables in raw queries](/docs/plugins/grafana-honeycomb-datasource/latest/query-editor/#use-variables-in-raw-queries).

For more information about variables, refer to [Templates and variables](/docs/grafana/latest/dashboards/variables/).

## Examples

The following examples show common ways to build and use Honeycomb template variables.

### Chain dataset and column variables

Use one variable to select a dataset and a second variable to list values from a column in that dataset. Because the dataset field accepts variable interpolation, the second variable updates automatically when the first one changes.

1. Create a variable named `dataset`:

   - **Query Type**: **Datasets**
   - This variable returns dataset slugs, such as `frontend` and `api`.
2. Create a variable named `service`:

   - **Query Type**: **Default**
   - **Dataset**: `$dataset`
   - **Column**: `service.name`
   - This variable returns up to 1000 unique values of `service.name` from the selected dataset.
3. In a Metrics query, select `$dataset` as the dataset, then add a **Where** filter of `service.name = $service`.

When you change the `dataset` variable on the dashboard, the `service` variable and the panels refresh to match.

### Filter a column variable with Where

Use the **Where** and **Constraint** fields on a **Default** column-value variable to narrow the returned values. For example, to list only the `http.route` values for requests that returned server errors:

- **Query Type**: **Default**
- **Dataset**: `$dataset`
- **Column**: `http.route`
- **Where**: `http.status_code >= 500`

### Multi-value variable in a raw query

Create a multi-value variable, then reference it with an `in` filter in a raw query. For example, with a `status_codes` variable that has `500`, `502`, and `503` selected:

JSON [Copy code to clipboard] Copy

```json
{
  "calculations": [{ "op": "COUNT" }],
  "breakdowns": ["http.route"],
  "filters": [
    { "column": "http.status_code", "op": "in", "value": "$status_codes" }
  ]
}
```

The data source expands the selected values into an array for the Honeycomb API. For more detail, refer to [Use variables in raw queries](/docs/plugins/grafana-honeycomb-datasource/latest/query-editor/#use-variables-in-raw-queries).

### SLO variable

Use an **SLO List** variable to build a drop-down of SLOs, then reference the selected SLO ID in a Single SLO query.

1. Create a variable named `slo`:

   - **Query Type**: **SLO List**
   - **Dataset**: the dataset that contains your SLOs
   - The variable shows each SLO name and uses its ID as the value.
2. In an SLO query, set the mode to **Single SLO** and enter `$slo` as the **SLO ID**.
