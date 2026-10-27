---
title: "Installation | Grafana Plugins documentation"
description: "This document explains how to install CSV datasource"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

[Documentation](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/)![breadcrumb arrow](http://grafana-com-website.grafana-com.svc.cluster.local.:80/static/assets/img/icons/grafana-icon-breadcrumb-arrow-gray.svg) [Plugins](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/)![breadcrumb arrow](http://grafana-com-website.grafana-com.svc.cluster.local.:80/static/assets/img/icons/grafana-icon-breadcrumb-arrow-gray.svg) [CSV data source](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/marcusolsson-csv-datasource/latest/)![breadcrumb arrow](http://grafana-com-website.grafana-com.svc.cluster.local.:80/static/assets/img/icons/grafana-icon-breadcrumb-arrow-gray.svg) Installation

Open source Grafana Cloud

> Warning
>
> This plugin is deprecated and will only receive critical security updates. Support will end on February 1, 2027. We recommend using the [Infinity data source](http://grafana-com-website.grafana-com.svc.cluster.local.:80/grafana/plugins/yesoreyeram-infinity-datasource/) instead. To get started quickly with CSV data in Grafana, refer to [How to visualize CSV data with Grafana](http://grafana-com-website.grafana-com.svc.cluster.local.:80/blog/2025/02/05/how-to-visualize-csv-data-with-grafana/).

You can install the CSV plugin using [grafana-cli](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/grafana/latest/administration/cli/), or by downloading the plugin manually.

## Install using grafana-cli

To install the latest version of the plugin, run the following command on the Grafana server:

In linux/macos, you will be installing using the following command

Bash ![Copy code to clipboard](http://grafana-com-website.grafana-com.svc.cluster.local.:80/media/images/icons/icon-copy-small-2.svg) Copy

```bash
grafana-cli plugins install marcusolsson-csv-datasource
```

whereas in windows machine, use the following command

Bash ![Copy code to clipboard](http://grafana-com-website.grafana-com.svc.cluster.local.:80/media/images/icons/icon-copy-small-2.svg) Copy

```bash
grafana-cli.exe plugins install marcusolsson-csv-datasource
```

## Install manually

1. Go to [Releases](https://github.com/grafana/grafana-csv-datasource/releases) on the GitHub project page
2. Find the release you want to install
3. Download the release by clicking the release asset called `marcusolsson-csv-datasource-<version>.zip`. You may need to uncollapse the **Assets** section to see it.
4. Install the plugin into the Grafana plugins directory. In the linux/macos, use the following command

   Bash ![Copy code to clipboard](http://grafana-com-website.grafana-com.svc.cluster.local.:80/media/images/icons/icon-copy-small-2.svg) Copy

   ```bash
   grafana-cli --pluginUrl ./marcusolsson-csv-datasource-<version>.zip plugins install marcusolsson-csv-datasource
   ```

   whereas in windows, use the following command

   Bash ![Copy code to clipboard](http://grafana-com-website.grafana-com.svc.cluster.local.:80/media/images/icons/icon-copy-small-2.svg) Copy

   ```bash
   grafana-cli.exe --pluginUrl marcusolsson-csv-datasource-<version>.zip plugins install marcusolsson-csv-datasource
   ```
5. Restart the Grafana server to load the plugin
