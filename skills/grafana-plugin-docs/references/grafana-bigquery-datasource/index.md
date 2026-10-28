---
title: "Google BigQuery data source | Grafana Plugins documentation"
description: "The Google BigQuery data source allows you to query and visualize Google BigQuery data in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Google BigQuery data source

The Google BigQuery data source allows you to query and visualize data from [Google BigQuery](https://cloud.google.com/bigquery), Google’s fully managed, serverless data warehouse.

Give it a try using Grafana Play

With Grafana Play, you can explore and see how it works, learning from practical examples to accelerate your development. This feature can be seen on [Google BigQuery data source](https://play.grafana.org/d/play-bigquery-1/).

[Try it](https://play.grafana.org/d/play-bigquery-1/)

## Supported features

Expand table

| Feature                | Supported | Description                                                |
|------------------------|-----------|------------------------------------------------------------|
| **Metrics**            | Yes       | Query numeric data and visualize as time series or tables. |
| **Alerting**           | Yes       | Create alert rules based on BigQuery queries.              |
| **Annotations**        | Yes       | Overlay events from BigQuery on your graphs.               |
| **Template variables** | Yes       | Create dynamic dashboards with query-based variables.      |

## Requirements

The following Google APIs must be enabled in your GCP project:

- [BigQuery API](https://console.cloud.google.com/apis/library/bigquery.googleapis.com)
- [Cloud Resource Manager API](https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com)

## Get started

Install the plugin from **Administration** &gt; **Plugins and data** &gt; **Plugins**, or from the [Grafana plugin catalog](https://grafana.com/grafana/plugins/grafana-bigquery-datasource/). After the plugin is installed, the following documents help you get started:

- [Configure the BigQuery data source](https://grafana.com/docs/plugins/grafana-bigquery-datasource/latest/configure/) - Set up authentication and connect to BigQuery.
- [BigQuery query editor](https://grafana.com/docs/plugins/grafana-bigquery-datasource/latest/query-editor/) - Create and edit SQL and visual queries.
- [Template variables](https://grafana.com/docs/plugins/grafana-bigquery-datasource/latest/template-variables/) - Create dynamic dashboards with BigQuery variables.
- [Alerting](https://grafana.com/docs/plugins/grafana-bigquery-datasource/latest/alerting/) - Create alert rules using BigQuery data.
- [Troubleshooting](https://grafana.com/docs/plugins/grafana-bigquery-datasource/latest/troubleshooting/) - Solve common configuration and query errors.

## Additional features

After you configure the BigQuery data source, you can:

- Add [Annotations](https://grafana.com/docs/plugins/grafana-bigquery-datasource/latest/annotations/) to overlay BigQuery events on your graphs.
- Configure and use [Template variables](https://grafana.com/docs/plugins/grafana-bigquery-datasource/latest/template-variables/) for dynamic dashboards.
- Add [Transformations](https://grafana.com/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- Set up [Alerting](https://grafana.com/docs/plugins/grafana-bigquery-datasource/latest/alerting/) rules based on your BigQuery data.
- Use [Explore](https://grafana.com/docs/grafana/latest/explore/) to investigate your BigQuery data without building a dashboard.
- Build queries with [Grafana Assistant](https://grafana.com/docs/plugins/grafana-bigquery-datasource/latest/query-editor/#query-with-grafana-assistant) when it’s available in your Grafana instance.

## Pre-built dashboards

The BigQuery data source plugin includes the following pre-built dashboards:

- **Array queries examples** - Demonstrates how to work with BigQuery arrays and nested data structures.

To import a pre-built dashboard:

1. Go to **Connections** &gt; **Data sources**.
2. Select your BigQuery data source.
3. Click the **Dashboards** tab.
4. Click **Import** next to the dashboard you want to use.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins** to check for updates.

> Note
>
> On Grafana Cloud, the Google BigQuery plugin is managed by Grafana and updates automatically. On self-managed Grafana, you must update the plugin manually. Refer to [Version and upgrade guidance](https://grafana.com/docs/plugins/grafana-bigquery-datasource/latest/troubleshooting/#version-and-upgrade-guidance).

## Query with the Grafana CLI

You can query this data source from the command line and from AI coding agents using the Grafana CLI, `gcx`. `gcx` gives you and your agent structured, terminal-based access to your Grafana data sources, which is useful for automation and agent-driven investigations.

`gcx` supports Grafana Cloud and Grafana OSS or Enterprise v12 and later. Before you query, install and authenticate `gcx`. Refer to the [`gcx` CLI documentation](https://grafana.com/docs/grafana/latest/as-code/observability-as-code/grafana-cli/gcx/) for installation, configuration, and the full command reference.

For example, to query your BigQuery data source, use `gcx datasources bigquery`:

sh ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

```sh
# Run a SQL query
gcx datasources bigquery query -d <DATASOURCE_UID> 'SELECT count(*) FROM `my_dataset.events`'

# List datasets in the default project
gcx datasources bigquery list-datasets -d <DATASOURCE_UID>

# List tables in a dataset
gcx datasources bigquery list-tables -d <DATASOURCE_UID> --dataset my_dataset

# Show a table's column schema
gcx datasources bigquery describe-table my_dataset.events -d <DATASOURCE_UID>
```

Replace *`<DATASOURCE_UID>`* with the UID of your BigQuery data source. The `query` command accepts GoogleSQL with server-side macros such as `$__timeFilter`; `list-datasets`, `list-tables`, and `describe-table` let you explore schema, and `--dataset` targets a specific dataset.

## Related resources

- [Google BigQuery documentation](https://cloud.google.com/bigquery/docs)
- [BigQuery SQL reference](https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax)
- [Grafana community forum](https://community.grafana.com/)
