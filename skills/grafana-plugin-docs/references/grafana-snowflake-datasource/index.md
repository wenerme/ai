---
title: "Snowflake data source | Grafana Enterprise Plugins documentation"
description: "Learn how to configure and use the Grafana Snowflake data source plugin."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Snowflake data source

The Snowflake data source plugin allows you to query and visualize Snowflake data metrics from within Grafana.

> Note
>
> This plugin is available on Grafana Cloud and requires a Grafana Enterprise license for self-managed instances.

## Supported Snowflake environments

You can use the Snowflake data source plugin with the following Snowflake deployment types:

- Snowflake on Amazon Web Services (AWS)
- Snowflake on Microsoft Azure
- Snowflake on Google Cloud Platform (GCP)

## Supported features

Expand table

| Feature     | Supported |
|-------------|-----------|
| Metrics     | Yes       |
| Logs        | Yes       |
| Traces      | No        |
| Alerting    | Yes       |
| Annotations | Yes       |

## Get started

To get started with the Snowflake data source plugin, refer to the following topics:

- [Configure the Snowflake data source](/docs/plugins/grafana-snowflake-datasource/latest/configure/)
- [Snowflake query editor](/docs/plugins/grafana-snowflake-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-snowflake-datasource/latest/template-variables/)
- [Alerting](/docs/plugins/grafana-snowflake-datasource/latest/alerting/)
- [Annotations](/docs/plugins/grafana-snowflake-datasource/latest/annotations/)
- [Troubleshooting](/docs/plugins/grafana-snowflake-datasource/latest/troubleshooting/)

## Additional features

After configuring the data source, you can:

- Add [Annotations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/) to overlay event data on your graphs.
- Use [Templates and variables](/docs/grafana/latest/dashboards/variables/) to create dynamic, reusable dashboards.
- Apply [Transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to process and combine data.
- Use [Explore](/docs/grafana/latest/explore/) to query data without building a dashboard.
- Set up [Alerting](/docs/grafana/latest/alerting/) to get notified when metrics exceed thresholds.

## Pre-built dashboards

The Snowflake data source plugin includes the following pre-built dashboards:

Expand table

| Dashboard        | Description                                                               |
|------------------|---------------------------------------------------------------------------|
| Billing          | Monitor Snowflake billing and credit usage. Requires `ACCOUNTADMIN` role. |
| Logs             | View and analyze Snowflake query logs.                                    |
| Snowpark Metrics | Track Snowpark container services metrics.                                |

To import a pre-built dashboard:

1. Navigate to **Connections** in the left-side menu.
2. Under **Your connections**, select **Data sources**.
3. Select the Snowflake data source.
4. Select the **Dashboards** tab.
5. Select **Import** next to the dashboard you want to use.

For more information, refer to [Import a dashboard](/docs/grafana/latest/dashboards/export-import/#importing-a-dashboard).

## Plugin updates

To update the plugin on a self-hosted Grafana instance, refer to [Update a plugin](/docs/grafana/latest/administration/plugin-management/#update-a-plugin).

> Note
>
> If you are using Grafana Cloud, plugins are automatically updated to the latest version.

## Related resources

- [Snowflake documentation](https://docs.snowflake.com/)
- [Grafana community forum](https://community.grafana.com/)
