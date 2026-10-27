---
title: "Configuration | Grafana Plugins documentation"
description: "This document explains how to configure CSV datasource"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

[Documentation](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/)![breadcrumb arrow](http://grafana-com-website.grafana-com.svc.cluster.local.:80/static/assets/img/icons/grafana-icon-breadcrumb-arrow-gray.svg) [Plugins](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/)![breadcrumb arrow](http://grafana-com-website.grafana-com.svc.cluster.local.:80/static/assets/img/icons/grafana-icon-breadcrumb-arrow-gray.svg) [CSV data source](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/marcusolsson-csv-datasource/latest/)![breadcrumb arrow](http://grafana-com-website.grafana-com.svc.cluster.local.:80/static/assets/img/icons/grafana-icon-breadcrumb-arrow-gray.svg) Configuration

Open source Grafana Cloud

> Warning
>
> This plugin is deprecated and will only receive critical security updates. Support will end on February 1, 2027. We recommend using the [Infinity data source](http://grafana-com-website.grafana-com.svc.cluster.local.:80/grafana/plugins/yesoreyeram-infinity-datasource/) instead. To get started quickly with CSV data in Grafana, refer to [How to visualize CSV data with Grafana](http://grafana-com-website.grafana-com.svc.cluster.local.:80/blog/2025/02/05/how-to-visualize-csv-data-with-grafana/).

## Add a CSV data source

1. In the side menu, click the **Configuration** tab (cog icon)
2. Click **Add data source** in the top-right corner of the **Data Sources** tab
3. Enter `CSV` in the search box to find the CSV data source
4. Click the search result that says **CSV**
5. In **URL**, enter a URL that points to CSV content

## Allow local mode

This allows you to read files from local computer.

Reading files from the local file system is disabled by default. To allow local mode, add the following to your Grafana config file:

ini ![Copy code to clipboard](http://grafana-com-website.grafana-com.svc.cluster.local.:80/media/images/icons/icon-copy-small-2.svg) Copy

```ini
[plugin.marcusolsson-csv-datasource]
allow_local_mode = true
```

> Note: Local mode option is **not available in Grafana Cloud** and other hosted grafana environments. In such cases, use a web server such as nginx to serve the CSV files over http and then use http url such as `http://localhost/my-csv-app/my-csv-file.csv`.
