---
title: "Installation | Grafana Plugins documentation"
description: "This document explains the installation process of JSON API data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

[Documentation](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/)![breadcrumb arrow](http://grafana-com-website.grafana-com.svc.cluster.local.:80/static/assets/img/icons/grafana-icon-breadcrumb-arrow-gray.svg) [Plugins](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/)![breadcrumb arrow](http://grafana-com-website.grafana-com.svc.cluster.local.:80/static/assets/img/icons/grafana-icon-breadcrumb-arrow-gray.svg) [JSON API data source](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/marcusolsson-json-datasource/latest/)![breadcrumb arrow](http://grafana-com-website.grafana-com.svc.cluster.local.:80/static/assets/img/icons/grafana-icon-breadcrumb-arrow-gray.svg) Installation

Open source Grafana Cloud

You can install the plugin using [grafana-cli](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/grafana/latest/administration/cli/), or by downloading the plugin manually.

## Install using grafana-cli

To install the latest version of the plugin, run the following command on the Grafana server:

In linux/macos, you can install the plugin using the following command

Bash ![Copy code to clipboard](http://grafana-com-website.grafana-com.svc.cluster.local.:80/media/images/icons/icon-copy-small-2.svg) Copy

```bash
grafana-cli plugins install marcusolsson-json-datasource
```

whereas in windows machine, use the following command

Bash ![Copy code to clipboard](http://grafana-com-website.grafana-com.svc.cluster.local.:80/media/images/icons/icon-copy-small-2.svg) Copy

```bash
grafana-cli.exe plugins install marcusolsson-json-datasource
```

## Install manually

1. Go to [Releases](https://github.com/grafana/grafana-json-datasource/releases) on the GitHub project page
2. Find the release you want to install
3. Download the release by clicking the release asset called `marcusolsson-json-datasource-<version>.zip`. You may need to un-collapse the **Assets** section to see it.
4. Unarchive the plugin into the Grafana plugins directory.

   In linux/macos, you can use the following command to extract the plugin

   Bash ![Copy code to clipboard](http://grafana-com-website.grafana-com.svc.cluster.local.:80/media/images/icons/icon-copy-small-2.svg) Copy

   ```bash
   unzip marcusolsson-json-datasource-<version>.zip
   mv marcusolsson-json-datasource /var/lib/grafana/plugins
   ```

   In windows, you can use the following command to extract the plugin

   powershell ![Copy code to clipboard](http://grafana-com-website.grafana-com.svc.cluster.local.:80/media/images/icons/icon-copy-small-2.svg) Copy

   ```powershell
   Expand-Archive -Path marcusolsson-json-datasource-<version>.zip -DestinationPath C:\grafana\data\plugins
   ```
5. Restart the Grafana server to load the plugin
