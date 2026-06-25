---
title: "Annotations | Grafana Plugins documentation"
description: "This document explains how to setup annotations with CSV datasource"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

[Documentation](/docs/)[breadcrumb arrow] [Plugins](/docs/plugins/)[breadcrumb arrow] [CSV data source](/docs/plugins/marcusolsson-csv-datasource/latest/)[breadcrumb arrow] Annotations

Open source Grafana Cloud

> Warning
>
> This plugin is now in maintenance mode, no new features will be added. We recommend using the [Infinity data source plugin](/grafana/plugins/yesoreyeram-infinity-datasource/) instead. If you want to get started quickly with CSV and Grafana, please read [How to Visualize CSV Data with Grafana](/blog/2025/02/05/how-to-visualize-csv-data-with-grafana/), which uses the recommended approach.

[Annotations](/docs/grafana/latest/dashboards/annotations/) let you extract data from a data source and use it to annotate a dashboard.

To use the CSV data source for annotations, follow the instructions on [Querying other data sources](/docs/grafana/latest/dashboards/annotations/#querying-other-data-sources). Make sure to select the CSV from the list of data sources.

Configure a query with *at least* two fields:

- A **String** field for the annotation text
- A **Time** field for the annotation time

If you want to add titles or tags to the annotations, you can add additional **Fields** with the appropriate types.

For more information on how to configure a query, refer to [Query editor](query-editor.md).
