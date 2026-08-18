---
title: "Honeycomb annotations | Grafana Enterprise Plugins documentation"
description: "Use Honeycomb queries to add annotations that overlay event markers on Grafana dashboards."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Honeycomb annotations

Annotations overlay event markers on your time series graphs, which makes it easier to correlate metrics with specific moments such as error spikes, latency regressions, or deployments. The Honeycomb data source uses the standard Grafana annotation interface, so any Honeycomb query can serve as an annotation source with no additional configuration.

For an overview of annotations, refer to [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Before you begin

- Ensure you have [configured the Honeycomb data source](/docs/plugins/grafana-honeycomb-datasource/latest/configure/).
- Save your dashboard before you create annotations.
- Annotations display on time series, state timeline, and candlestick visualizations.

## How Honeycomb annotations work

The Honeycomb API is aggregation-based. A query returns one of two shapes, and only one of them works as an annotation source:

- **Time series (`series`):** A `time` field plus one aggregated value field for each calculation, such as `COUNT`. Grafana places a marker at each time bucket that contains data. Use this shape for annotations.
- **Results (`result`):** Aggregated rows with no `time` field. This shape can’t produce annotation markers because it has no timestamp.

Always set **Returned data** to **series (default)** for annotation queries. Because Honeycomb aggregates into time buckets, each populated bucket becomes a marker. Use a **Where** filter so that only the events you care about produce markers.

### Map result fields to the annotation

Because a Honeycomb time series doesn’t include free-form `title`, `text`, or `tags` columns, you map the returned fields to annotation properties in the annotation editor:

Expand table

| Annotation property   | What to map it to                                                                             |
|-----------------------|-----------------------------------------------------------------------------------------------|
| **Time**              | Auto-detected from the time series `time` field. No action needed.                            |
| **Title** or **Text** | A value field such as `COUNT`, or a breakdown value field such as `COUNT (checkout-service)`. |
| **Tags**              | A breakdown value field, so markers are tagged by dimension such as `service.name`.           |

> Note
>
> Region annotations that span a start and end time aren’t supported, because Honeycomb time series don’t return a `timeEnd` field. Each marker represents a single time bucket.

## Create an annotation query

To add a Honeycomb annotation query to a dashboard:

01. Open your dashboard and click **Edit**.
02. Click the **Dashboard options** icon in the toolbar.
03. In the sidebar, click **Settings**.
04. Select **Annotations**.
05. Click **Add annotation query**.
06. Enter a name for the annotation.
07. Select your Honeycomb data source.
08. Build a query, and set **Returned data** to **series (default)**.
09. Map the **Time**, **Text**, and **Tags** fields to the returned fields.
10. Click **Save dashboard**.

After you save the dashboard, matching events appear as markers on your panels.

## Annotation examples

The following examples use the **series (default)** returned data type so that each result includes a timestamp.

### Mark error events with the query builder

Use a Metrics query to mark the time buckets where errors occurred:

1. Set the query type to **Metrics**.
2. Select the dataset that contains your request events.
3. Set **Returned data** to **series (default)**.
4. Set **Visualization** to `COUNT`.
5. Add a **Where** filter of `error = true`.
6. Add a **Group by** of `service.name` so each marker is labeled by service.

Every time bucket that contains an error produces a marker. Map **Tags** to the `service.name` breakdown so you can filter markers by service.

### Mark error events with a raw query

Use a Raw query when you want to define the request directly. The following example counts error events for each service:

JSON [Copy code to clipboard] Copy

```json
{
  "calculations": [{ "op": "COUNT" }],
  "filters": [
    { "column": "error", "op": "=", "value": true }
  ],
  "breakdowns": ["service.name"]
}
```

### Mark latency regressions

Use a percentile calculation with a **Having** clause so that only buckets above a latency threshold produce markers:

1. Set the query type to **Metrics**.
2. Set **Returned data** to **series (default)**.
3. Set **Visualization** to `P95` on the `duration_ms` column.
4. Add a **Having** clause of `P95(duration_ms) > 500`.
5. Add a **Group by** of `service.name`.

The equivalent raw query is:

JSON [Copy code to clipboard] Copy

```json
{
  "calculations": [
    { "op": "P95", "column": "duration_ms" }
  ],
  "havings": [
    { "calculate_op": "P95", "column": "duration_ms", "op": ">", "value": 500 }
  ],
  "breakdowns": ["service.name"]
}
```

### Use a template variable in an annotation query

Combine annotations with template variables to scope markers to the current dashboard selection. The following raw query filters errors by a `service` dashboard variable:

JSON [Copy code to clipboard] Copy

```json
{
  "calculations": [{ "op": "COUNT" }],
  "filters": [
    { "column": "error", "op": "=", "value": true },
    { "column": "service.name", "op": "=", "value": "$service" }
  ]
}
```

For more information on variables, refer to [Honeycomb template variables](/docs/plugins/grafana-honeycomb-datasource/latest/template-variables/).

## Next steps

- Refer to the [Honeycomb query editor](/docs/plugins/grafana-honeycomb-datasource/latest/query-editor/) for full details on building queries.
- Refer to [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/) for more annotation options.
