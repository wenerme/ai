---
title: "Google BigQuery data source | Grafana Plugins documentation"
description: "The Google BigQuery data source allows you to query and visualize Google BigQuery data in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Google BigQuery data source

The Google BigQuery data source allows you to query and visualize data from [Google BigQuery](https://cloud.google.com/bigquery), Google’s fully managed, serverless data warehouse.

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

The following documents help you get started with the Google BigQuery data source:

- [Configure the BigQuery data source](/docs/plugins/grafana-bigquery-datasource/latest/configure/) - Set up authentication and connect to BigQuery.
- [BigQuery query editor](/docs/plugins/grafana-bigquery-datasource/latest/query-editor/) - Create and edit SQL and visual queries.
- [Template variables](/docs/plugins/grafana-bigquery-datasource/latest/template-variables/) - Create dynamic dashboards with BigQuery variables.
- [Alerting](/docs/plugins/grafana-bigquery-datasource/latest/alerting/) - Create alert rules using BigQuery data.
- [Troubleshooting](/docs/plugins/grafana-bigquery-datasource/latest/troubleshooting/) - Solve common configuration and query errors.

## Additional features

After you configure the BigQuery data source, you can:

- Add [Annotations](/docs/plugins/grafana-bigquery-datasource/latest/annotations/) to overlay BigQuery events on your graphs.
- Configure and use [Template variables](/docs/plugins/grafana-bigquery-datasource/latest/template-variables/) for dynamic dashboards.
- Add [Transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- Set up [Alerting](/docs/plugins/grafana-bigquery-datasource/latest/alerting/) rules based on your BigQuery data.
- Use [Explore](/docs/grafana/latest/explore/) to investigate your BigQuery data without building a dashboard.
- Build queries with [Grafana Assistant](/docs/plugins/grafana-bigquery-datasource/latest/query-editor/#query-with-grafana-assistant) when it’s available in your Grafana instance.

## Pre-built dashboards

The BigQuery data source plugin includes the following pre-built dashboards:

- **Array queries examples** - Demonstrates how to work with BigQuery arrays and nested data structures.

To import a pre-built dashboard:

1. Go to **Connections** &gt; **Data sources**.
2. Select your BigQuery data source.
3. Click the **Dashboards** tab.
4. Click **Import** next to the dashboard you want to use.

## Plugin updates

Ensure your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates.

> Note
>
> Plugins are automatically updated in Grafana Cloud.

## Related resources

- [Google BigQuery documentation](https://cloud.google.com/bigquery/docs)
- [BigQuery SQL reference](https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax)
- [Grafana community forum](https://community.grafana.com/)
