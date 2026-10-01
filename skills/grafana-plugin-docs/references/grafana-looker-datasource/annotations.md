---
title: "Looker annotations | Grafana Enterprise Plugins documentation"
description: "Use annotations with the Looker data source in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Looker annotations

Annotations overlay event data on your time series graphs, which makes it easier to correlate metrics with specific events such as deployments, releases, or incidents. The Looker data source supports annotations through the standard Looker query editor, so you can turn any LookML query or saved Look that returns a time field into annotation markers. For an overview of annotations, refer to [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Before you begin

Before you create an annotation query, ensure you have:

- [Configured the Looker data source](/docs/plugins/grafana-looker-datasource/latest/configure/).
- A saved dashboard. You must save the dashboard before you can add an annotation query.
- A LookML query or saved Look that returns a time field, plus optional fields for the annotation title, description, and tags.

## Annotation query format

An annotation query runs like any other Looker query and returns rows. Grafana maps the returned columns to annotation fields. Provide at least a time field so Grafana can place each annotation on the graph.

Expand table

| Annotation field | Description                                                                                                                                                  |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Time**         | Required. The timestamp that positions the annotation on the graph. Return a date or timestamp field, such as a LookML dimension like `orders.created_date`. |
| **Time end**     | Optional. An end timestamp that creates a region annotation highlighting the range between the start and end times.                                          |
| **Title**        | Optional. Short text shown on the annotation marker.                                                                                                         |
| **Text**         | Optional. Detailed description shown in the annotation tooltip.                                                                                              |
| **Tags**         | Optional. Tags used to filter annotations.                                                                                                                   |

Because Looker field names are fully qualified, such as `orders.created_date`, use the field mapping controls in the annotation editor to map each returned column to the correct annotation field. The data source returns date and time dimensions as time-typed columns, so they map cleanly to the **Time** and **Time end** fields.

Use the `$__timeFilter(<field>)` macro in your annotation query so it returns only events within the visible dashboard time range. Without it, the query can return events outside the selected window.

> Note
>
> The `$__timeFilter()`, `$__timeFrom()`, and `$__timeTo()` macros are applied differently depending on the query mode. In **LookML JSON** mode, you can use a macro anywhere in the query body. In **LookML Builder** mode, you can use macros only in the **Filter Expression** field. The **Run Look** query type doesn’t support macros, so scope the saved Look in Looker instead. For macro details, refer to the [Looker query editor](/docs/plugins/grafana-looker-datasource/latest/query-editor/#macros).

## Create an annotation query

To add a Looker annotation query to a dashboard:

1. Open your dashboard and click **Edit**, then open **Options**.
2. Select **Annotations**.
3. Click **Add annotation query**.
4. Enter a name for the annotation.
5. Click **Open query editor**.
6. Select your Looker data source in the **Data source** field.
7. Build the query using the Looker query editor. Choose the **LookML** query type to build a query against a model and explore, or the **Run Look** query type to use a saved Look.
8. Map the returned columns to the annotation **Time**, **Title**, **Text**, and **Tags** fields.
9. Click **Save dashboard**.

## Annotation examples

The following examples show common annotation patterns for Looker.

### Track events over time

Build a LookML query that returns an event timestamp with a label, and bound it to the dashboard time range with `$__timeFilter()`. In **LookML JSON** mode, the query body resembles the following:

JSON [Copy code to clipboard] Copy

```json
{
  "model": "ecommerce",
  "view": "orders",
  "fields": ["orders.created_time", "orders.status"],
  "filter_expression": "$__timeFilter(orders.created_time)",
  "sorts": ["orders.created_time"]
}
```

Map `orders.created_time` to the **Time** field and `orders.status` to the **Text** field in the annotation editor.

### Build the query with the builder

You can build the same query with the visual builder instead of raw JSON, which is the default query mode:

1. Choose the **LookML** query type in **Builder** mode.
2. Select the **Model** and **Explore Name**, such as `ecommerce` and `orders`.
3. In **Dimensions &amp; Measures**, add a timestamp dimension and a label field, such as `orders.created_time` and `orders.status`.
4. In the **Filter Expression** field, enter `$__timeFilter(orders.created_time)`.
5. Map `orders.created_time` to the **Time** field and `orders.status` to the **Text** field.

### Reuse a saved Look

If you already have a Look that returns events with a timestamp, select the **Run Look** query type and enter the **Look ID**. Then map the Look’s timestamp column to the **Time** field and a descriptive column to the **Text** field.

## Next steps

- Refer to the [Looker query editor](/docs/plugins/grafana-looker-datasource/latest/query-editor/) for more on building LookML and Run Look queries.
- Refer to [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/) for more annotation options.
