---
title: "Datadog annotations | Grafana Enterprise Plugins documentation"
description: "This document describes how to use annotations with the Datadog data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Datadog annotations

Annotations overlay event markers on a dashboard’s graphs, so you can correlate Datadog events with your visualized data. The Datadog data source builds annotations from the Datadog event stream. The annotation editor always uses an **Events** query. You can’t use other query types, such as **Logs** or **Query**, as dashboard annotations.

For an introduction to annotations, refer to [Annotate visualizations](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

> Note
>
> The **Events** query type is in public preview.

## Add a Datadog annotation query

To add an annotation query that uses the Datadog data source, complete the following steps:

1. Open your dashboard and click **Dashboard settings**.
2. Click **Annotations**.
3. Click **Add annotation query**.
4. Enter a name for the annotation.
5. Select your Datadog data source from the **Data source** drop-down.
6. Configure the query fields.
7. Click **Save dashboard**.

Matching events appear as vertical markers on time-series panels. Hover over a marker to view the event title, text, and tags.

## Annotation query fields

The Datadog annotation editor returns recent events from the Datadog event stream, filtered to the dashboard’s time range. Configure the following fields:

- **Sources** - Enter a comma-separated list of sources to filter the events. You can include dashboard template variables.
- **Tags** - Enter a comma-separated list of tags to filter the events. You can include dashboard template variables.
- **Priority** - Select the priority of the events to return. Options are **None**, **Low**, or **Normal**. **None** returns events of any priority.

The annotation editor’s **Priority** options differ from the **Events** query type in the panel query editor, which uses **All** instead of **None**.

> Note
>
> Datadog annotation queries use the same event stream API as the **Events** query type and return a maximum of `1000` of the most recent events. The plugin doesn’t paginate additional results. For more information, refer to [Event Management](https://docs.datadoghq.com/service_management/events/) in the Datadog documentation.

## Example: mark deployment events

To mark production deployments on your dashboard graphs, configure an annotation query that filters the event stream to deployment events:

1. In **Dashboard settings** &gt; **Annotations**, click **Add annotation query** and select your Datadog data source.
2. In **Sources**, enter the source that emits your deployment events, such as `github` or `ci`.
3. In **Tags**, enter `env:production` to limit the events to your production environment.
4. Leave **Priority** set to **None** to return events of any priority.
5. Click **Save dashboard**.

Each matching deployment event appears as a vertical marker on the dashboard’s time-series panels.
