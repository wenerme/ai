---
title: "CSV data source for Grafana | Grafana Plugins documentation"
description: "This document introduces the CSV data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

[Documentation](/docs/)[breadcrumb arrow] [Plugins](/docs/plugins/)[breadcrumb arrow] CSV data source

Open source Grafana Cloud

> Warning
>
> This plugin is in maintenance mode. It won’t receive new features, and bug fixes aren’t guaranteed. We recommend using the [Infinity data source](/grafana/plugins/yesoreyeram-infinity-datasource/) instead. To get started quickly with CSV data in Grafana, refer to [How to visualize CSV data with Grafana](/blog/2025/02/05/how-to-visualize-csv-data-with-grafana/).

The CSV data source is an open source plugin for Grafana that lets you visualize data from any URL that returns CSV data, such as REST APIs or static file servers. You can even load data from a local file path.

Since the plugin doesn’t keep a record of previous queries, each query needs to contain the complete data set you want to visualize. If you’d like to visualize how the data changes over time, you’re probably better off storing the data in a database.
