---
title: "Looker query editor | Grafana Enterprise Plugins documentation"
description: "Use the Looker query editor in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Looker query editor

This document explains how to use the Looker query editor to build queries against your Looker instance.

Looker data is modeled in LookML, the Looker modeling language, which defines models, explores, dimensions, and measures on top of your database. A LookML query selects dimensions and measures from an explore and lets Looker generate and run the underlying SQL, so you work with your governed business metrics instead of writing raw SQL. The query editor runs these LookML queries, either built visually or as raw JSON, and can also run saved Looks.

## Before you begin

Before you build a query, ensure you have:

- [Configured the Looker data source](/docs/plugins/grafana-looker-datasource/latest/configure/).
- Credentials with permission to read the models, explores, and Looks you want to query.

## Key concepts

If you’re new to Looker, these terms are used in the query editor:

Expand table

| Term          | Description                                                                                |
|---------------|--------------------------------------------------------------------------------------------|
| **Model**     | A LookML model that groups related explores.                                               |
| **Explore**   | A starting point for queries within a model that exposes a set of dimensions and measures. |
| **Dimension** | A queryable attribute, such as a date or category, used to group data.                     |
| **Measure**   | An aggregation, such as a count or sum, computed over your data.                           |
| **Pivot**     | A dimension whose values become columns in the result.                                     |
| **Look**      | A saved query in Looker that you can run by ID.                                            |

## Query types

The query editor supports the following query types, selected with the **Query Type** control:

- **LookML:** Build a query against a model and explore, either with the visual builder or as raw LookML JSON. Under the hood, the data source uses the [Looker `run_inline_query` API](https://developers.looker.com/api/explorer/4.0/methods/Query/run_inline_query).
- **Run Look:** Run a saved Look by its ID.

## Create a LookML query

For the **LookML** query type, choose a mode with the mode selector:

- **Builder:** Compose the query using drop-down menus for the model, explore, fields, pivots, and filters.
- **JSON:** Enter a raw LookML query body as JSON for full control.

### Builder mode

To build a query in **Builder** mode:

1. Select the **LookML** query type and the **Builder** mode.
2. Select a **Model** from the drop-down.
3. Select an **Explore Name** for the chosen model.
4. Add the fields and filters you need using the following options.

Expand table

| Field                         | Description                                                                                                                                                                                                   |
|-------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Model**                     | The LookML model to query.                                                                                                                                                                                    |
| **Explore Name**              | The explore (view) within the model.                                                                                                                                                                          |
| **Dimensions &amp; Measures** | The dimensions and measures to return. Dimensions are marked with a `d` icon and measures with an `m` icon.                                                                                                   |
| **Pivots**                    | Dimensions to pivot into columns.                                                                                                                                                                             |
| **Custom measures**           | Ad hoc measures computed from a dimension, such as **Count Distinct**, **Min**, **Max**, **Sum**, **Average**, **Median**, or **List Unique Value**. The available aggregations depend on the dimension type. |
| **Filter Expression**         | A custom Looker filter expression applied to the query.                                                                                                                                                       |

### JSON mode

Use **JSON** mode to provide the raw LookML query body when the builder doesn’t cover your use case. Enter a JSON object that matches the Looker `run_inline_query` request body, for example:

JSON [Copy code to clipboard] Copy

```json
{
  "model": "ecommerce",
  "view": "orders",
  "fields": ["orders.created_date", "orders.count"],
  "filters": {
    "orders.created_date": "30 days"
  },
  "sorts": ["orders.created_date desc"]
}
```

## Query options

The LookML query type provides an **Options** section. The available options depend on the mode:

Expand table

| Option           | Where it appears          | Description                                                                                                                                                                                           |
|------------------|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Row Limit**    | Builder and JSON modes    | The maximum number of rows to return. The default is `500`. In JSON mode, this option is labeled **Limit** and can override the limit defined in the query body.                                      |
| **Column Limit** | Builder mode, with pivots | The maximum number of columns to return. Appears only when the query has one or more pivots. The default is `50`. In JSON mode, set the column limit in the query body with the `column_limit` field. |
| **Cache**        | Builder and JSON modes    | When enabled, return results from the Looker cache if available. The default is off.                                                                                                                  |

## Run a saved Look

To run a saved Look:

1. Select the **Run Look** query type.
2. Select or enter the **Look ID** of the saved Look.

Expand table

| Field       | Description                      |
|-------------|----------------------------------|
| **Look ID** | The ID of the saved Look to run. |

## Query examples

The following LookML query bodies show common starting points. Each uses JSON mode so you can copy and adapt it, and you can build the same queries in the builder. Replace the model, explore, and field names with those from your own LookML.

To plot a measure over time, select a date dimension and a measure, and bound the result to the dashboard time range:

JSON [Copy code to clipboard] Copy

```json
{
  "model": "ecommerce",
  "view": "orders",
  "fields": ["orders.created_date", "orders.count"],
  "filter_expression": "$__timeFilter(orders.created_date)",
  "sorts": ["orders.created_date"]
}
```

To break a measure down by category, pivot a dimension into columns. Include the pivot field in both `fields` and `pivots`:

JSON [Copy code to clipboard] Copy

```json
{
  "model": "ecommerce",
  "view": "orders",
  "fields": ["orders.created_date", "orders.status", "orders.total_revenue"],
  "pivots": ["orders.status"],
  "filter_expression": "$__timeFilter(orders.created_date)",
  "sorts": ["orders.created_date"]
}
```

To show a top-N list, sort by a measure in descending order and set a low row limit:

JSON [Copy code to clipboard] Copy

```json
{
  "model": "ecommerce",
  "view": "products",
  "fields": ["products.name", "products.total_sales"],
  "sorts": ["products.total_sales desc"],
  "limit": "10"
}
```

## Macros

Use the following macros to filter results by the dashboard time range. In **JSON** mode, you can use a macro anywhere in the JSON body. In **Builder** mode, you can use macros in the **Filter Expression** field only.

Expand table

| Macro                    | Description                                                                                                                                      | Example                            |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------|
| `$__timeFilter(<field>)` | Restricts results to the dashboard time range using the given field. Expands to `${<field>} >= date_time(...) AND ${<field>} <= date_time(...)`. | `$__timeFilter(orders.created_at)` |
| `$__timeFrom()`          | Replaces with the dashboard **from** time as a `date_time(...)` value.                                                                           | `$__timeFrom()`                    |
| `$__timeTo()`            | Replaces with the dashboard **to** time as a `date_time(...)` value.                                                                             | `$__timeTo()`                      |

Macros apply only to **LookML** queries. The **Run Look** query type runs a saved Look as-is and doesn’t interpolate macros, so scope the Look’s time range in Looker instead.

In builder mode, add the time filter in the **Filter Expression** field, for example `$__timeFilter(orders.created_date)`. In JSON mode, set it as the `filter_expression` value, as shown in [Query examples](/docs/plugins/grafana-looker-datasource/latest/query-editor/#query-examples).

## Use cases

The following are common ways to use Looker queries in Grafana:

- **Reuse existing reports:** Run a saved Look by ID to bring an established Looker report into a Grafana dashboard.
- **Trend analysis over time:** Build a LookML query with a date dimension and a measure, then apply `$__timeFilter()` so the panel follows the dashboard time range.
- **Category breakdowns:** Pivot a dimension into columns to compare a measure across categories in a single panel.

## Next steps

- [Configure template variables](/docs/plugins/grafana-looker-datasource/latest/template-variables/)
- [Troubleshoot Looker data source issues](/docs/plugins/grafana-looker-datasource/latest/troubleshooting/)
