---
title: "MongoDB data source | Grafana Enterprise Plugins documentation"
description: "This document introduces the MongoDB data source for Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# MongoDB data source

The MongoDB data source plugin lets you query, visualize, and alert on data stored in your MongoDB collections directly from Grafana dashboards. Use `find` and `aggregate` commands to build time series panels, tables, and stat visualizations from your document data.

> Note
>
> The MongoDB data source is an Enterprise plugin. It’s available with a Grafana Cloud Pro or Advanced plan and Grafana Enterprise. For installation instructions, refer to [Install and upgrade the MongoDB data source plugin](/docs/plugins/grafana-mongodb-datasource/latest/install/).

## Supported features

Expand table

| Feature     | Supported |
|-------------|-----------|
| Metrics     | Yes       |
| Alerting    | Yes       |
| Annotations | Yes       |
| Logs        | No        |
| Traces      | No        |

## Requirements

The MongoDB data source has the following requirements:

- Grafana version 11.6.7 or later.
- A [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated self-managed Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/).
- A MongoDB 5.0+ instance with at least one user. Supported deployments include:

  - MongoDB Atlas (shared and dedicated tiers)
  - Self-managed MongoDB (standalone, replica set, or sharded cluster)
  - AWS DocumentDB (with [TLS configuration](/docs/plugins/grafana-mongodb-datasource/latest/troubleshooting/#connect-to-aws-documentdb-with-tls) and `retryWrites=false`)
- Port 27017 (or your configured MongoDB port) accessible from the Grafana server.

## Known limitations

The following are current known limitations:

- Only `find` and `aggregate` read commands are supported.
- Refer to [Diagnostics](/docs/plugins/grafana-mongodb-datasource/latest/query-editor/#diagnostics) for a list of currently supported diagnostics commands.
- Regex flags `g` and `s` are not supported.

## Get started

The following documents help you get started:

- [Install and upgrade the MongoDB data source plugin](/docs/plugins/grafana-mongodb-datasource/latest/install/)
- [Configure the MongoDB data source](/docs/plugins/grafana-mongodb-datasource/latest/configure/)
- [MongoDB query editor](/docs/plugins/grafana-mongodb-datasource/latest/query-editor/)
- [MongoDB templates and variables](/docs/plugins/grafana-mongodb-datasource/latest/template-variables/)
- [MongoDB annotations](/docs/plugins/grafana-mongodb-datasource/latest/annotations/)
- [MongoDB alerting](/docs/plugins/grafana-mongodb-datasource/latest/alerting/)
- [Troubleshoot issues with the MongoDB data source](/docs/plugins/grafana-mongodb-datasource/latest/troubleshooting/)

## Additional features

After configuring the data source, you can:

- Use the **Grafana Assistant** button in the query editor to generate MongoDB queries from natural language prompts.
- Create [time series](/docs/grafana/latest/panels-visualizations/visualizations/time-series/), [table](/docs/grafana/latest/panels-visualizations/visualizations/table/), [stat](/docs/grafana/latest/panels-visualizations/visualizations/stat/), and other [visualizations](/docs/grafana/latest/panels-visualizations/visualizations/).
- Add [annotations](/docs/plugins/grafana-mongodb-datasource/latest/annotations/) to overlay deployment or error events on graphs.
- Configure [template variables](/docs/plugins/grafana-mongodb-datasource/latest/template-variables/) to build dynamic, reusable dashboards.
- Apply [transformations](/docs/grafana/latest/panels/transformations/) to reshape query results.
- Set up [alert rules](/docs/plugins/grafana-mongodb-datasource/latest/alerting/) to monitor collection metrics.
- Route traffic through a secure proxy. Refer to [Configure a data source connection proxy](/docs/grafana/latest/setup-grafana/configure-grafana/proxy/) for configuration instructions.

> Note
>
> Proxying requires the feature toggle `secureSocksDSProxyEnabled` set to `Enabled`.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. For upgrade and rollback steps, refer to [Upgrade the plugin](/docs/plugins/grafana-mongodb-datasource/latest/install/#upgrade-the-plugin).

> Note
>
> Plugins are automatically updated in Grafana Cloud.

## Related resources

- [MongoDB visualizations](/solutions/mongodb/visualize/)
- [Official MongoDB documentation](https://www.mongodb.com/docs/)
- [Grafana community forum](https://community.grafana.com/)
