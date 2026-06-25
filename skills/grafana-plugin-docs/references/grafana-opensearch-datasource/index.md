---
title: "OpenSearch data source | Grafana Plugins documentation"
description: "Use the OpenSearch data source to query and visualize logs, metrics, and traces from OpenSearch in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# OpenSearch data source

The OpenSearch data source plugin lets you query and visualize data from OpenSearch and Amazon OpenSearch Service in Grafana. You can build queries using Lucene or [Piped Processing Language (PPL)](https://opensearch.org/docs/latest/search-plugins/sql/ppl/index/), visualize logs, metrics, and traces, and create annotations from OpenSearch data. The plugin also supports AWS Signature Version 4 (SigV4) authentication for Amazon OpenSearch Service and Amazon OpenSearch Serverless.

## Requirements

- Grafana version 10.4.0 or later

## Supported features

The following table lists the features available with the OpenSearch data source:

Expand table

| Feature        | Supported         |
|----------------|-------------------|
| Alerting       | Yes               |
| Annotations    | Yes               |
| Logs           | Yes               |
| Metrics        | Yes               |
| Traces         | Yes (Lucene only) |
| Ad hoc filters | Yes               |

## Get started

The following pages help you set up and use the OpenSearch data source:

- [Configure the OpenSearch data source](/docs/plugins/grafana-opensearch-datasource/latest/configure/)
- [OpenSearch query editor](/docs/plugins/grafana-opensearch-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-opensearch-datasource/latest/template-variables/)
- [Annotations](/docs/plugins/grafana-opensearch-datasource/latest/annotations/)
- [Alerting](/docs/plugins/grafana-opensearch-datasource/latest/alerting/)
- [Troubleshooting](/docs/plugins/grafana-opensearch-datasource/latest/troubleshooting/)

## Additional features

After configuring the data source, you can:

- Use [Explore](/docs/grafana/latest/explore/) to run ad hoc queries and investigate your OpenSearch data without building a dashboard.
- Import the sample dashboards included with the plugin to get started quickly with traces, ecommerce, and web traffic visualizations. Navigate to the data source settings page and select the **Dashboards** tab.
- Add [transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- Set up [alerting](/docs/grafana/latest/alerting/) to receive notifications when your data matches specific conditions.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.

## Related resources

- [OpenSearch documentation](https://opensearch.org/docs/latest/)
- [OpenSearch plugin GitHub repository](https://github.com/grafana/opensearch-datasource/)
- [Grafana community forum](https://community.grafana.com/)
