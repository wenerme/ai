---
title: "DynamoDB data source | Grafana Enterprise Plugins documentation"
description: "Guide for using the DynamoDB data source in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# DynamoDB data source

The DynamoDB data source plugin lets you connect directly to Amazon DynamoDB to query and visualize your DynamoDB data in Grafana. The plugin uses [PartiQL](https://partiql.org/) as its query language and provides a built-in code editor with syntax highlighting.

> Note
>
> The DynamoDB data source is an Enterprise plugin. It’s available with a Grafana Cloud Pro or Advanced plan and Grafana Enterprise. For installation instructions, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).

## Supported features

The following table lists supported features for the DynamoDB data source:

Expand table

| Feature            | Supported |
|--------------------|-----------|
| Metrics            | Yes       |
| Logs               | No        |
| Annotations        | Yes       |
| Alerting           | Yes       |
| Template variables | Yes       |

## Get started

The following documents help you set up and use the DynamoDB data source:

- [Configure the DynamoDB data source](/docs/plugins/grafana-dynamodb-datasource/latest/configure/)
- [DynamoDB query editor](/docs/plugins/grafana-dynamodb-datasource/latest/query-editor/)
- [DynamoDB template variables](/docs/plugins/grafana-dynamodb-datasource/latest/template-variables/)
- [DynamoDB annotations](/docs/plugins/grafana-dynamodb-datasource/latest/annotations/)
- [DynamoDB alerting](/docs/plugins/grafana-dynamodb-datasource/latest/alerting/)
- [Troubleshoot DynamoDB data source issues](/docs/plugins/grafana-dynamodb-datasource/latest/troubleshooting/)

## Additional features

After configuring the data source, you can:

- Use [Explore](/docs/grafana/latest/explore/) to run PartiQL queries without building a dashboard.
- Add [Transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- Set up [Alerting](/docs/grafana/latest/alerting/) rules based on DynamoDB data.
- Add [Annotations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/) to mark events on your dashboards.

## Known limitations

Querying data from nested maps isn’t supported and returns null values.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.

## Related resources

- [Amazon DynamoDB documentation](https://docs.aws.amazon.com/dynamodb/)
- [PartiQL documentation](https://partiql.org/docs.html)
- [Grafana community forum](https://community.grafana.com/)
