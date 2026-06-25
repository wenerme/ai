---
title: "Configuration | Grafana Plugins documentation"
description: "This document explains how to configure CSV datasource"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

[Documentation](/docs/)[breadcrumb arrow] [Plugins](/docs/plugins/)[breadcrumb arrow] [CSV data source](/docs/plugins/marcusolsson-csv-datasource/latest/)[breadcrumb arrow] Configuration

Open source Grafana Cloud

> Warning
>
> This plugin is now in maintenance mode, no new features will be added. We recommend using the [Infinity data source plugin](/grafana/plugins/yesoreyeram-infinity-datasource/) instead. If you want to get started quickly with CSV and Grafana, please read [How to Visualize CSV Data with Grafana](/blog/2025/02/05/how-to-visualize-csv-data-with-grafana/), which uses the recommended approach.

## Add a CSV data source

1. In the side menu, click the **Configuration** tab (cog icon)
2. Click **Add data source** in the top-right corner of the **Data Sources** tab
3. Enter `CSV` in the search box to find the CSV data source
4. Click the search result that says **CSV**
5. In **URL**, enter a URL that points to CSV content

## Allow local mode

This allows you to read files from local computer.

Reading files from the local file system is disabled by default. To allow local mode, add the following to your Grafana config file:

ini [Copy code to clipboard] Copy

```ini
[plugin.marcusolsson-csv-datasource]
allow_local_mode = true
```

> Note: Local mode option is **not available in Grafana Cloud** and other hosted grafana environments. In such cases, use a web server such as nginx to serve the CSV files over http and then use http url such as `http://localhost/my-csv-app/my-csv-file.csv`.
