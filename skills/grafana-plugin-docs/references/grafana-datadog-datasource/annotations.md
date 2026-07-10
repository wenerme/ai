---
title: "Datadog annotations | Grafana Enterprise Plugins documentation"
description: "This document describes how to use annotations with the Datadog data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Datadog annotations

Annotations overlay event markers on a dashboard’s graphs, so you can correlate Datadog events with your visualized data. The Datadog data source builds annotations from the Datadog event stream using an **Events** query.

For an introduction to annotations, refer to [Annotations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Add a Datadog annotation query

To add an annotation query that uses the Datadog data source, complete the following steps:

1. Open your dashboard and go to **Dashboard settings**.
2. Click **Annotations** in the sidebar menu.
3. Click **Add annotation query**.
4. Enter a name for the annotation.
5. Select your Datadog data source from the **Data source** drop-down.
6. Configure the query fields.
7. Click **Save dashboard**.

## Annotation query fields

The Datadog annotation editor returns recent events from the Datadog event stream, filtered to the dashboard’s time range. Configure the following fields:

- **Sources** - Enter a comma-separated list of sources to filter the events in the query.
- **Tags** - Enter a comma-separated list of tags to filter the events in the query.
- **Priority** - Select the priority of the events to return. Options are **None**, **Low**, or **Normal**.

> Note
>
> Datadog annotation queries use the same underlying API as the **Events** query type and return a maximum of `1000` of the most recent events. For more information, refer to [Event Management](https://docs.datadoghq.com/service_management/events/) in the Datadog documentation.

## Example: overlay deployment events

To mark production deployments on your dashboard graphs, configure an annotation query that filters the event stream to deployment events:

1. In **Dashboard settings** &gt; **Annotations**, click **Add annotation query** and select your Datadog data source.
2. In **Sources**, enter the source that emits your deployment events, such as `github` or `ci`.
3. In **Tags**, enter `env:production` to limit the events to your production environment.
4. Leave **Priority** set to **None** to return events of any priority.
5. Click **Save dashboard**.

Each matching deployment event appears as a vertical marker on the dashboard’s time-series panels. Hover over a marker to view the event title and description.
