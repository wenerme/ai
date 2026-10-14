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

## Query with the Grafana CLI

You can query this data source from the command line and from AI coding agents using the Grafana CLI, `gcx`. `gcx` gives you and your agent structured, terminal-based access to your Grafana data sources, which is useful for automation and agent-driven investigations.

`gcx` supports Grafana Cloud and Grafana OSS or Enterprise v12 and later. Before you query, install and authenticate `gcx`. Refer to the [`gcx` CLI documentation](/docs/grafana/latest/as-code/observability-as-code/grafana-cli/gcx/) for installation, configuration, and the full command reference.

For example, to query your OpenSearch data source, use `gcx datasources opensearch`:

sh [Copy code to clipboard] Copy

```sh
# Search documents with a Lucene query
gcx datasources opensearch query -d <DATASOURCE_UID> 'app:frontend AND level:error' --since 1h

# Aggregate document counts over time, split by a field
gcx datasources opensearch metrics -d <DATASOURCE_UID> 'level:error' --group-by app.keyword --since 6h

# List indices and mapped fields to explore the data
gcx datasources opensearch list-indices -d <DATASOURCE_UID>
gcx datasources opensearch list-fields -d <DATASOURCE_UID>
```

Replace *`<DATASOURCE_UID>`* with the UID of your OpenSearch data source. The `query` command takes a Lucene expression and a time range (`--since`); `metrics` buckets documents over time and can split series with `--group-by`; `list-indices` and `list-fields` let you explore available indices and their mapped fields.

## Related resources

- [OpenSearch documentation](https://opensearch.org/docs/latest/)
- [OpenSearch plugin GitHub repository](https://github.com/grafana/opensearch-datasource/)
- [Grafana community forum](https://community.grafana.com/)
