---
title: "Amazon Aurora data source | Grafana Enterprise Plugins documentation"
description: "Introduction to the Amazon Aurora data source for Grafana, including requirements, supported features, and links to configuration and query documentation."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Amazon Aurora data source

The Amazon Aurora data source lets you query and visualize data from your Amazon Aurora clusters in Grafana. The plugin supports both PostgreSQL-compatible and MySQL-compatible Aurora engines, and connects to your cluster using AWS IAM database authentication.

> Note
>
> The Amazon Aurora data source is currently in [public preview](/docs/release-life-cycle/). Grafana Labs offers limited support, and breaking changes might occur prior to the feature being made generally available.

## Supported features

The Amazon Aurora data source supports the following features:

Expand table

| Feature                     | Supported                |
|-----------------------------|--------------------------|
| Metrics                     | Yes                      |
| Alerting                    | Yes                      |
| Template variables          | Yes                      |
| Private data source connect | Yes (Grafana Cloud only) |
| Logs                        | No                       |
| Traces                      | No                       |
| Annotations                 | No                       |

## Requirements

To use the Amazon Aurora data source, you need:

- A [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/) on self-managed Grafana.
- Grafana 9.4.0 or later. Private data source connect requires Grafana 10.0 or later.
- An Amazon Aurora cluster with [IAM database authentication](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.html) enabled.
- A database user configured for IAM authentication. Refer to the [AWS guide to connecting using IAM authentication and the AWS SDK for Go](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.Connecting.Go.html) for the prerequisites Grafana needs to query your cluster.
- AWS credentials with the `rds-db:connect` permission. Refer to the [example IAM permissions](/docs/plugins/grafana-aurora-datasource/latest/configure/#example-iam-permissions).

## Get started

The following documents help you get started with the Amazon Aurora data source:

- [Install the Amazon Aurora data source plugin](/docs/plugins/grafana-aurora-datasource/latest/install/)
- [Configure the Amazon Aurora data source](/docs/plugins/grafana-aurora-datasource/latest/configure/)
- [Amazon Aurora query editor](/docs/plugins/grafana-aurora-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-aurora-datasource/latest/template-variables/)
- [Alerting](/docs/plugins/grafana-aurora-datasource/latest/alerting/)
- [Troubleshooting](/docs/plugins/grafana-aurora-datasource/latest/troubleshooting/)

## Additional features

After you configure the data source, you can:

- Use [Explore](/docs/grafana/latest/explore/) to query data without building a dashboard.
- Add [transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- Set up [alert rules](/docs/grafana/latest/alerting/) based on your Aurora queries.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> On Grafana Cloud, the Amazon Aurora plugin is managed by Grafana and updates automatically. On self-managed Grafana, you must update Enterprise plugins manually. Refer to [Upgrade the plugin](/docs/plugins/grafana-aurora-datasource/latest/install/#upgrade-the-plugin).

## Related resources

- [Amazon Aurora documentation](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html)
- [Grafana community forum](https://community.grafana.com/)
