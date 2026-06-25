---
title: "Exploring annotations | Grafana Plugins documentation"
description: "Learn how native annotations, alerts, and annotation queries work in Grafana and how they appear on your dashboards."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Exploring annotations

Annotations in Grafana highlight key events on your dashboards. They encompass three core elements:

- Native annotations
- Alerts
- Annotation queries

The following diagram compares them:

[](/media/docs/grafana/panels-visualizations/crash-courses/annotations.png)

> Note
>
> Native annotations and alerts are stored as records in the Grafana configuration database, while annotation queries are custom requests to fetch and display them on your dashboard.

## Annotation queries

Annotation queries come in two flavors:

- **Built-in**: Basic functionality out of the box.
- **User-defined**: Flexible queries that can tap into any database—or even Grafana storage with the [Business Satellite](/grafana/plugins/volkovlabs-grapi-datasource/) data source.

Refer to the dataflow schema below for detail:

[](/media/docs/grafana/panels-visualizations/crash-courses/alerts-schema.png)

Despite their names, native annotations and alerts share many underlying similarities. With the [Business Satellite data source](/grafana/plugins/volkovlabs-grapi-datasource/), you can manage both seamlessly.

## Business Satellite

The [Business Satellite data source](/grafana/plugins/volkovlabs-grapi-datasource/) helps tackle a real-world production challenge. It lets you pull native annotations and alerts from local or remote Grafana instances, with flexible filtering options.

[](/media/docs/grafana/panels-visualizations/crash-courses/alerts.png)
