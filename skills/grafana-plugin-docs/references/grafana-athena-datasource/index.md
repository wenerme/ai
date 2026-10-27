---
title: "Amazon Athena data source | Grafana Plugins documentation"
description: "Use the Amazon Athena data source to query and visualize Amazon Athena data in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Amazon Athena data source

The Amazon Athena data source lets you query and visualize data stored in Amazon Athena directly in Grafana dashboards. Amazon Athena is an interactive query service that uses standard SQL to analyze data in Amazon S3.

## Supported features

The following table lists the features available with this data source.

Expand table

| Feature     | Supported |
|-------------|-----------|
| Metrics     | Yes       |
| Logs        | No        |
| Traces      | No        |
| Alerting    | Yes       |
| Annotations | Yes       |

## Get started

The following pages help you get started with the Amazon Athena data source.

- [Configure the Amazon Athena data source](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-athena-datasource/latest/configure/)
- [Amazon Athena query editor](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-athena-datasource/latest/query-editor/)
- [Template variables](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-athena-datasource/latest/template-variables/)
- [Alerting](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-athena-datasource/latest/alerting/)
- [Annotations](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-athena-datasource/latest/annotations/)
- [Troubleshooting](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-athena-datasource/latest/troubleshooting/)

## Additional features

After configuring the data source, you can use the following Grafana features.

- Use [Explore](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/grafana/latest/explore/) to query data without building a dashboard.
- Add [Transformations](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- Set up [Alerting](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/grafana/latest/alerting/) rules to get notified when data changes.
- Configure and use [Template variables](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/grafana/latest/dashboards/variables/) for dynamic dashboards.

## Pre-built dashboards

The Amazon Athena data source ships with the following pre-built dashboards. To import them, navigate to the data source configuration page and select the **Dashboards** tab.

- **Cost Usage Report Monitoring:** Monitor AWS cost and usage reports stored in Amazon S3 and queried through Athena.
- **Amazon VPC Flow Logs:** Analyze VPC flow log data for network traffic monitoring and security analysis.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.

## Query with the Grafana CLI

You can query this data source from the command line and from AI coding agents using the Grafana CLI, `gcx`. `gcx` gives you and your agent structured, terminal-based access to your Grafana data sources, which is useful for automation and agent-driven investigations.

`gcx` supports Grafana Cloud and Grafana OSS or Enterprise v12 and later. Before you query, install and authenticate `gcx`. Refer to the [`gcx` CLI documentation](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/grafana/latest/as-code/observability-as-code/grafana-cli/gcx/) for installation, configuration, and the full command reference.

For example, to run a SQL query against your Amazon Athena data source, use `gcx datasources athena query`:

sh ![Copy code to clipboard](http://grafana-com-website.grafana-com.svc.cluster.local.:80/media/images/icons/icon-copy-small-2.svg) Copy

```sh
gcx datasources athena query -d <DATASOURCE_UID> 'SELECT * FROM logs WHERE $__timeFilter(event_time)' --since 1h
```

Replace *`<DATASOURCE_UID>`* with the UID of your Amazon Athena data source. The query takes a SQL statement, optional server-side macros such as `$__timeFilter`, and a time range (`--since`).

To explore your data before you write a query, use the `list` and `describe-table` subcommands to navigate from catalogs down to table columns:

sh ![Copy code to clipboard](http://grafana-com-website.grafana-com.svc.cluster.local.:80/media/images/icons/icon-copy-small-2.svg) Copy

```sh
# List the available data catalogs, databases, and tables
gcx datasources athena list-catalogs -d <DATASOURCE_UID>
gcx datasources athena list-databases -d <DATASOURCE_UID> --catalog AwsDataCatalog
gcx datasources athena list-tables -d <DATASOURCE_UID> --database <DATABASE>

# List the column names for a table
gcx datasources athena describe-table <TABLE> -d <DATASOURCE_UID> --database <DATABASE>
```

Replace *`<DATABASE>`* and *`<TABLE>`* with your Athena database and table names. Use `--catalog` to target a data catalog other than the default `AwsDataCatalog`, and `--region` to override the AWS region.

## Related resources

- [Amazon Athena documentation](https://docs.aws.amazon.com/athena/latest/ug/what-is.html)
- [Athena data source plugin GitHub repository](https://github.com/grafana/athena-datasource/)
- [Grafana community forum](https://community.grafana.com/)
