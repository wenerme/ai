---
title: "Datadog data source | Grafana Enterprise Plugins documentation"
description: "Introduction to the Datadog data source plugin for Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Datadog data source

Datadog is a popular monitoring and analytics tool. The Datadog data source plugin lets you query and visualize Datadog metrics, logs, traces, and events in Grafana.

> Note
>
> The Datadog data source is an Enterprise plugin. It is available with [Grafana Cloud](/products/cloud/) (Pro and Advanced plans) and [Grafana Enterprise](/products/enterprise/). For installation instructions, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).

## Supported features

The Datadog data source supports the following features:

Expand table

| Feature                           | Supported | Details                                                          |
|-----------------------------------|-----------|------------------------------------------------------------------|
| Metric queries                    | Yes       | Query, Raw query, and Arithmetic query types.                    |
| Logs queries                      | Yes       | Search and Aggregate modes.                                      |
| APM trace spans                   | Yes       | APM Spans query type.                                            |
| RUM events                        | Yes       | Real User Monitoring query type.                                 |
| Events                            | Yes       | Event stream query type.                                         |
| Monitor status                    | Yes       | Monitor query type.                                              |
| Service-level objectives          | Yes       | SLO query type.                                                  |
| Annotations                       | Yes       | Built on the Events query type.                                  |
| Alerting                          | Yes       | Grafana-managed alert rules. All query types run on the backend. |
| Template variables                | Yes       | Metric, tag, and host variables, and custom tag groups.          |
| Ad hoc filters                    | Partial   | Metric query types only (Query, Raw query, and Arithmetic).      |
| Data links                        | Yes       | Added to Monitor query results.                                  |
| Private data source connect (PDC) | Yes       | Through the Secure Socks Proxy.                                  |

## Requirements

The Datadog data source has the following requirements:

- A Datadog account.
- A [Grafana Cloud](/pricing/) Pro or Advanced plan, or an [activated self-managed Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/). Contracted Cloud customers should refer to their agreement.

## Get started

The following documents help you get started with the Datadog data source:

- [Install the Datadog data source](/docs/plugins/grafana-datadog-datasource/latest/install/)
- [Get started with Datadog on Grafana Cloud](/docs/plugins/grafana-datadog-datasource/latest/cloud-quickstart/)
- [Configure the Datadog data source](/docs/plugins/grafana-datadog-datasource/latest/configure/)
- [Datadog query editor](/docs/plugins/grafana-datadog-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-datadog-datasource/latest/template-variables/)
- [Troubleshooting](/docs/plugins/grafana-datadog-datasource/latest/troubleshooting/)

## Additional features

After you configure the Datadog data source, you can:

- Add [Annotations](/docs/plugins/grafana-datadog-datasource/latest/annotations/) to overlay Datadog events on your graphs.
- Configure and use [Template variables](/docs/plugins/grafana-datadog-datasource/latest/template-variables/) for dynamic dashboards.
- Add [Transformations](/docs/grafana/latest/panels/transformations/).
- Set up [Alerting](/docs/plugins/grafana-datadog-datasource/latest/alerting/) to monitor your Datadog data.
- Use [Grafana Assistant](#grafana-assistant) to query your Datadog data with natural language prompts.

## Get an API key and application key from Datadog

The Datadog data source authenticates with an API key and an application key. Both are unique to your Datadog organization.

To create the keys, complete the following steps:

1. Sign in to your Datadog account.
2. To create an API key, refer to [Add an API key or client token](https://docs.datadoghq.com/account_management/api-app-keys/#add-an-api-key-or-client-token) in the Datadog documentation.
3. To create an application key, refer to [Add application keys](https://docs.datadoghq.com/account_management/api-app-keys/#application-keys) in the Datadog documentation.

The application key works with the API key to grant access to the Datadog API. By default, an application key has the permissions of the user who created it. Some query types require specific Datadog permissions on the application key. For example, monitor queries require the `monitors_read` permission. For the full list of permissions by query type, refer to [API key and application key permissions](/docs/plugins/grafana-datadog-datasource/latest/configure/#api-key-and-application-key-permissions).

After you generate both keys, add them to the data source. For more information, refer to [Configure the Datadog data source](/docs/plugins/grafana-datadog-datasource/latest/configure/).

## Grafana Assistant

If you have [Grafana Assistant](/docs/grafana-cloud/machine-learning/assistant/) enabled, you can query your Datadog data source with natural language instead of building queries by hand. Assistant discovers the metrics, tags, and hosts available in your Datadog data source and runs queries on your behalf.

To query Datadog with Assistant, open Assistant and mention your Datadog data source with the `@` prefix in your prompt. For example:

- `Query @datadog-ds for average CPU usage grouped by host over the last hour.`
- `Search logs in @datadog-ds for errors in the web service over the last 30 minutes.`

For the full list of supported prompts and data sources, refer to [Query data](/docs/grafana-cloud/machine-learning/assistant/guides/querying/) in the Grafana Assistant documentation.

## Import a dashboard for Datadog

The Datadog data source includes the following pre-built dashboards:

- **Disk IO**
- **Docker**
- **System metrics**
- **Monitors explorer**

For instructions on how to import dashboards in Grafana, refer to [Import a dashboard](/docs/grafana/latest/dashboards/export-import/#importing-a-dashboard).

To view the list of pre-built Datadog dashboards, complete the following steps:

1. Go to **Connections** in the sidebar menu.
2. Under **Connections**, click **Data sources**.
3. Type `Datadog` in the search bar and select the Datadog data source.
4. Go to the **Dashboards** tab to view the list of pre-built dashboards.
5. Click **Import** to import the pre-built dashboard.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

To review the changes in each release, refer to the [Datadog data source CHANGELOG](/grafana/plugins/grafana-datadog-datasource/?tab=changelog).

> Note
>
> Plugins are automatically updated in Grafana Cloud.
