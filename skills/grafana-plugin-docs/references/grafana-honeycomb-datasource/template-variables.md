---
title: "Template variables | Grafana Enterprise Plugins documentation"
description: "Learn how to use template variables with the Honeycomb data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Template variables

You can use Grafana template variables with the Honeycomb data source to create dynamic, reusable dashboards.

To add a new Honeycomb query variable, refer to [Add a query variable](/docs/grafana/latest/variables/variable-types/add-query-variable/). Use your Honeycomb data source as your data source.

## Query types

The variable editor provides four query types, selectable via the **Query Type** radio buttons:

### Default

The Default query type creates variables containing datasets, columns, or column values, depending on which fields you fill in:

- **No dataset selected**: Returns datasets (slug and name). This is equivalent to selecting the **Datasets** query type.
- **Dataset selected, no column selected**: Returns column names for the selected dataset, including derived columns and environment-derived columns.
- **Dataset and column selected**: Returns values for the specified column. The query runs against the Honeycomb API and returns up to 1000 unique values.

When querying column values, the following additional options are available:

- **Returned data**: Controls how values are extracted from query results.

  - **Time series** (default): Returns the breakdown group labels from time-series results.
  - **Results**: Returns distinct values directly from the specified column in the result data.
  - **Both**: Combines time series and results data.
- **Where**: Filter the data before extracting column values, using the same filter operators available in the [metrics query editor](/docs/plugins/grafana-honeycomb-datasource/latest/query-editor/#where-filters).
- **Constraint**: Set the filter combination to **AND** or **OR** when using multiple filters.

### Datasets

Returns dataset slugs. Slugs are a transformed, lowercase version of the dataset name and are the traditional format used by the Honeycomb API.

### Dataset Names

Returns the actual display names of datasets. Use this option when you need human-readable names for display purposes or when the slug and display name don’t match.

### SLO List

Returns SLO definitions for a selected dataset. Each entry returns the SLO name as the display text and the SLO ID as the value, which can be used in SLO detail queries.

## Use variables in queries

After you create a variable, you can use it in your Honeycomb queries. For more information, refer to [Variable syntax](/docs/grafana/latest/variables/syntax/).

For more information about variables, refer to [Templates and variables](/docs/grafana/latest/variables/).
