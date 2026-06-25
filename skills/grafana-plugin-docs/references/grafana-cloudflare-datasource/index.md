---
title: "Cloudflare data source | Grafana Enterprise Plugins documentation"
description: "Use the Cloudflare data source to query and visualize Cloudflare data in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Cloudflare data source

The Cloudflare data source allows you to query and visualize data from Cloudflare in Grafana, including DNS analytics and Cloudflare Radar data.

> Note
>
> Cloudflare data source plugin is currently in [public preview](/docs/release-life-cycle/). Grafana Labs offers limited support, and breaking changes might occur prior to the feature being made generally available.

> Note
>
> The Cloudflare data source is an Enterprise plugin. It’s available with Grafana Cloud (Free, Pro, and Advanced tiers) and Grafana Enterprise. For installation instructions, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).

## Requirements

To use this data source, you need:

- A Cloudflare account with an API token (user tokens only; account-owned tokens aren’t supported)
- A [Grafana Cloud](/pricing/) account or an [activated Grafana Enterprise license](/docs/grafana/latest/administration/enterprise-licensing/)

## Version compatibility

Expand table

| Plugin version | Minimum Grafana version |
|----------------|-------------------------|
| 0.1.7+         | 11.6.7                  |

## Supported features

Expand table

| Feature          | Supported |
|------------------|-----------|
| DNS Analytics    | Yes       |
| Cloudflare Radar | Yes       |
| Alerting         | Yes       |
| Annotations      | Yes       |

## Get started

The following documents help you set up and use the Cloudflare data source:

- [Configure the Cloudflare data source](/docs/plugins/grafana-cloudflare-datasource/latest/configure/)
- [Cloudflare query editor](/docs/plugins/grafana-cloudflare-datasource/latest/query-editor/)
- [Troubleshooting](/docs/plugins/grafana-cloudflare-datasource/latest/troubleshooting/)

## Additional features

After configuring the data source, you can:

- Create [annotations](/docs/plugins/grafana-cloudflare-datasource/latest/annotations/) to mark events on your graphs
- Set up [alerting](/docs/plugins/grafana-cloudflare-datasource/latest/alerting/) to get notified about Cloudflare data
- Use [Explore](/docs/grafana/latest/explore/) to query data without building a dashboard
- Add [Transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results

## Additional resources

- [Cloudflare API documentation](https://developers.cloudflare.com/api/)
- [Cloudflare Radar](https://radar.cloudflare.com/)
- [Grafana community forum](https://community.grafana.com/)

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.
