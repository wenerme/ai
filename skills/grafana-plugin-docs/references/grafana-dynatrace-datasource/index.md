---
title: "Dynatrace data source for Grafana | Grafana Enterprise Plugins documentation"
description: "Introduction to the Dynatrace data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Dynatrace data source for Grafana

The Dynatrace data source plugin allows you to query and visualize Dynatrace metrics, problems, audit logs, management zones, and logs. You can also use USQL to query user session data and Grail to query data from Dynatrace’s unified data lakehouse. The Logs query type is in beta because the underlying Dynatrace API is an early adopter release.

> Note
>
> The Dynatrace data source is an Enterprise plugin. It is available with [Grafana Cloud](/products/cloud/) (Free, Pro, and Advanced tiers) and [Grafana Enterprise](/products/enterprise/). For installation instructions, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).

## Supported Dynatrace environments

The Dynatrace data source supports the following Dynatrace deployment types:

- **SaaS** - Dynatrace’s cloud-hosted service where Dynatrace manages all infrastructure.
- **Managed** - Self-hosted Dynatrace deployment that you run on your own infrastructure (on-premises or in your own cloud environment).
- **Environment ActiveGate** - Connect through an ActiveGate for environments that require it.

## Get started

The following documents will help you get started with the Dynatrace data source:

- [Configure the Dynatrace data source](/docs/plugins/grafana-dynatrace-datasource/latest/configure/)
- [Dynatrace query editor](/docs/plugins/grafana-dynatrace-datasource/latest/query-editor/) to create and edit queries
- [Template variables](/docs/plugins/grafana-dynatrace-datasource/latest/template-variables/)
- [Troubleshoot](/docs/plugins/grafana-dynatrace-datasource/latest/troubleshoot/)

## Additional features

Once you have configured the Dynatrace data source, you can:

- Use [Grafana Assistant](/docs/grafana/latest/ai/assistant/) to query your Dynatrace data with natural language.
- Add [Annotations](/docs/plugins/grafana-dynatrace-datasource/latest/annotations/) to overlay Dynatrace events on your graphs.
- Configure and use [Templates and variables](/docs/plugins/grafana-dynatrace-datasource/latest/template-variables/) for dynamic dashboards.
- Add [Transformations](/docs/grafana/latest/panels/transformations/).
- Set up [Alerting](/docs/plugins/grafana-dynatrace-datasource/latest/alerting/) to monitor your Dynatrace data.

## Grafana Assistant

You can use [Grafana Assistant](/docs/grafana/latest/ai/assistant/) to explore and query your Dynatrace data using natural language. The Assistant discovers the metrics available in your Dynatrace environment, builds and runs queries—including Metrics, DQL (Grail), USQL, Logs, and Problems queries—and visualizes the results on a dashboard.

To query Dynatrace, mention your Dynatrace data source with the `@` symbol in your prompt. For example:

- `Show built in metrics for cpu and memory in @dynatrace-ds.`
- `Query @dynatrace-ds for cpu and memory utilization over the last 12 hours.`
- `Show average CPU usage for all hosts in @dynatrace-ds over the last hour.`

For more information, refer to [Grafana Assistant](/docs/grafana/latest/ai/assistant/).

## Dynatrace pre-built dashboard

The Dynatrace plugin includes the following pre-built dashboard:

- **System Overview** - Displays key system metrics including CPU usage, memory consumption, and disk utilization across your monitored hosts.

To import the dashboard:

1. Go to **Connections** &gt; **Data sources**.
2. Select your Dynatrace data source.
3. Click the **Dashboards** tab.
4. Click **Import** next to the System Overview dashboard.

For more information about importing dashboards, refer to [Import a dashboard](/docs/grafana/latest/dashboards/build-dashboards/import-dashboards/).

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.
