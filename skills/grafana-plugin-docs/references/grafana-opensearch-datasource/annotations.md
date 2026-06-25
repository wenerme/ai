---
title: "OpenSearch annotations | Grafana Plugins documentation"
description: "Create annotations from OpenSearch data to overlay event markers on Grafana dashboard graphs."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# OpenSearch annotations

Annotations let you overlay event information on top of graphs. You can query any OpenSearch index for annotation events to mark deployments, incidents, or other significant occurrences on your time-series visualizations.

> Note
>
> Annotations only support Lucene queries. PPL queries are not available in the annotation editor.

For more information about annotations in Grafana, refer to [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Create an annotation

To create an annotation using OpenSearch data:

1. Open your dashboard and click **Dashboard settings** (gear icon).
2. Select **Annotations** from the left menu.
3. Click **Add annotation query**.
4. Select your OpenSearch data source from the **Data source** drop-down.
5. Enter a Lucene query in the query field, or leave it blank to match all events.
6. Configure the field mappings described in the following section.
7. Click **Save dashboard**.

## Field mappings

The annotation editor includes a **Field mappings** section where you map OpenSearch document fields to annotation properties.

Expand table

| Field        | Description                                                                                                 | Default      |
|--------------|-------------------------------------------------------------------------------------------------------------|--------------|
| **Time**     | The name of the time field. Must be a date field.                                                           | `@timestamp` |
| **Time End** | Optional name of the time end field. Must be a date field. When set, annotations are displayed as a region. |              |
| **Text**     | The field to use for the annotation description text.                                                       |              |
| **Tags**     | The field to use for event tags. If the field value is a string, it’s split by commas into individual tags. | `tags`       |

Field names support dot notation for nested fields, for example `event.description` or `metadata.tags`.

## Region annotations

To display annotations as a highlighted region instead of a single point in time, configure both the **Time** and **Time End** fields. This is useful for marking events that have a duration, such as deployments or maintenance windows.

## Annotation query examples

The following examples show common annotation query patterns.

### Mark error and security events

Use a Lucene query to filter for documents that match multiple tags:

[Copy code to clipboard] Copy

```none
tags:error AND tags:security
```

This creates annotation markers for any events tagged with both `error` and `security`.

### Mark high-value transactions

Filter for documents where a numeric field exceeds a threshold:

[Copy code to clipboard] Copy

```none
taxful_total_price:>250
```

### Filter by environment

Use a template variable to show annotations only for the selected environment:

[Copy code to clipboard] Copy

```none
environment:$environment AND event_type:deployment
```

### Mark events from a specific host

[Copy code to clipboard] Copy

```none
hostname:$hostname AND level:error
```

## Use template variables in annotations

You can use [template variables](/docs/plugins/grafana-opensearch-datasource/latest/template-variables/) in your annotation queries to create dynamic annotations that respond to dashboard variable selections. When the **Multi-value** or **Include all value** options are enabled, variable values are converted into a Lucene-compatible condition.
