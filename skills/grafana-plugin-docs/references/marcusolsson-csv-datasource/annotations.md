---
title: "Annotations | Grafana Plugins documentation"
description: "This document explains how to setup annotations with CSV datasource"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

[Documentation](https://grafana.com/docs/)![breadcrumb arrow](https://grafana.com/static/assets/img/icons/grafana-icon-breadcrumb-arrow-gray.svg) [Plugins](https://grafana.com/docs/plugins/)![breadcrumb arrow](https://grafana.com/static/assets/img/icons/grafana-icon-breadcrumb-arrow-gray.svg) [CSV data source](https://grafana.com/docs/plugins/marcusolsson-csv-datasource/latest/)![breadcrumb arrow](https://grafana.com/static/assets/img/icons/grafana-icon-breadcrumb-arrow-gray.svg) Annotations

Open source Grafana Cloud

> Warning
>
> This plugin is deprecated and will only receive critical security updates. Support will end on February 1, 2027. We recommend using the [Infinity data source](https://grafana.com/grafana/plugins/yesoreyeram-infinity-datasource/) instead. To get started quickly with CSV data in Grafana, refer to [How to visualize CSV data with Grafana](https://grafana.com/blog/2025/02/05/how-to-visualize-csv-data-with-grafana/).

[Annotations](https://grafana.com/docs/grafana/latest/dashboards/annotations/) let you extract data from a data source and use it to annotate a dashboard.

To use the CSV data source for annotations, follow the instructions on [Querying other data sources](https://grafana.com/docs/grafana/latest/dashboards/annotations/#querying-other-data-sources). Make sure to select the CSV from the list of data sources.

Configure a query with *at least* two fields:

- A **String** field for the annotation text
- A **Time** field for the annotation time

If you want to add titles or tags to the annotations, you can add additional **Fields** with the appropriate types.

For more information on how to configure a query, refer to [Query editor](https://grafana.com/docs/plugins/marcusolsson-csv-datasource/latest/annotations/query-editor.md).
