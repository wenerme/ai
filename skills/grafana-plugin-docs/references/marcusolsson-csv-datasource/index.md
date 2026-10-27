---
title: "CSV data source for Grafana | Grafana Plugins documentation"
description: "This document introduces the CSV data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

[Documentation](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/)![breadcrumb arrow](http://grafana-com-website.grafana-com.svc.cluster.local.:80/static/assets/img/icons/grafana-icon-breadcrumb-arrow-gray.svg) [Plugins](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/)![breadcrumb arrow](http://grafana-com-website.grafana-com.svc.cluster.local.:80/static/assets/img/icons/grafana-icon-breadcrumb-arrow-gray.svg) CSV data source

Open source Grafana Cloud

> Warning
>
> This plugin is deprecated and will only receive critical security updates. Support will end on February 1, 2027. We recommend using the [Infinity data source](http://grafana-com-website.grafana-com.svc.cluster.local.:80/grafana/plugins/yesoreyeram-infinity-datasource/) instead. To get started quickly with CSV data in Grafana, refer to [How to visualize CSV data with Grafana](http://grafana-com-website.grafana-com.svc.cluster.local.:80/blog/2025/02/05/how-to-visualize-csv-data-with-grafana/).

The CSV data source is an open source plugin for Grafana that lets you visualize data from any URL that returns CSV data, such as REST APIs or static file servers. You can even load data from a local file path.

Since the plugin doesn’t keep a record of previous queries, each query needs to contain the complete data set you want to visualize. If you’d like to visualize how the data changes over time, you’re probably better off storing the data in a database.
