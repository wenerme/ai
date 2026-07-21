---
title: "Vercel data source | Grafana Enterprise Plugins documentation"
description: "Query and visualize Vercel data in Grafana with the Vercel data source plugin."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Vercel data source

> Note
>
> This plugin is in public preview. Refer to the [Grafana Labs release life cycle documentation](/docs/release-life-cycle/) for more information. If you find any issues or have a feature request, create a support ticket through your Grafana Enterprise support channel.

The Vercel data source plugin lets you query and visualize data from the [Vercel REST API](https://vercel.com/docs/rest-api) in Grafana. Use it to build dashboards for deployments, projects, domains, log drains, security firewall activity, and other Vercel resources.

> Note
>
> The Vercel data source is a Grafana Enterprise plugin. It’s available on Grafana Cloud, including the Free plan, which allows up to three active users, and on self-managed Grafana Enterprise. You must enable Enterprise plugins for your account before you install the plugin. For installation instructions, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).

## Supported features

The Vercel data source supports the following Grafana features.

Expand table

| Feature     | Supported |
|-------------|-----------|
| Metrics     | Yes       |
| Logs        | No        |
| Traces      | No        |
| Alerting    | Yes       |
| Annotations | Yes       |

The plugin requires Grafana `11.6.7` or later.

## Available data

The Vercel data source queries the [Vercel REST API](https://vercel.com/docs/rest-api), so it surfaces deployment and configuration data, including:

- Deployments, their state, and build events and build logs.
- Projects, domains, and aliases.
- Checks, access groups, teams, and authentication tokens.
- Drain and log drain configurations, Edge Configs, webhooks, and remote caching status.
- Security firewall attack data.

> Note
>
> The Vercel data source doesn’t provide Vercel runtime or application logs. It surfaces deployment and build data from the REST API, not streamed request logs, and the log drain actions return log drain configurations rather than log content. To bring runtime logs into Grafana, configure a [Vercel log drain](https://vercel.com/docs/drains) to forward logs to [Loki](/docs/loki/latest/) and query them with a Loki data source. This is a separate setup from the Vercel data source.

## Requirements

Before you use the Vercel data source, ensure you have the following:

- A Vercel access token. For more information, refer to [Creating an access token](https://vercel.com/docs/rest-api#creating-an-access-token) in the Vercel documentation.
- Access to Grafana Enterprise plugins, through one of the following:

  - A Grafana Cloud plan. Enterprise plugins are available on the [Free plan](/pricing/), which allows up to three active users, as well as the Pro and Advanced plans.
  - A self-managed Grafana Enterprise instance with an [activated license](/docs/grafana/latest/enterprise/license/activate-license/).

You must enable Enterprise plugins for your account. To enable them on Grafana Cloud, sign in to [Grafana Cloud](/), then open **My Account** &gt; **Manage Plan**. Contracted Cloud customers might need the Enterprise plugin entitlement added to their account. If the plugin isn’t available after you enable it, refer to [License and setup errors](/docs/plugins/grafana-vercel-datasource/latest/troubleshooting/#license-and-setup-errors).

## Get started

The following pages help you get started with the Vercel data source:

- [Configure the Vercel data source](/docs/plugins/grafana-vercel-datasource/latest/configure/)
- [Vercel query editor](/docs/plugins/grafana-vercel-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-vercel-datasource/latest/template-variables/)
- [Annotations](/docs/plugins/grafana-vercel-datasource/latest/annotations/)
- [Alerting](/docs/plugins/grafana-vercel-datasource/latest/alerting/)
- [Troubleshooting](/docs/plugins/grafana-vercel-datasource/latest/troubleshooting/)

## Additional features

After you configure the data source, you can:

- Use [Explore](/docs/grafana/latest/explore/) to query Vercel data without building a dashboard.
- Add [Transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- Set up [Alerting](/docs/grafana/latest/alerting/) rules on Vercel queries.

## Pre-built dashboards

The Vercel data source includes the following pre-built dashboards, which you can import when you configure the data source or from the plugin’s page in Grafana:

Expand table

| Dashboard          | Description                                                     |
|--------------------|-----------------------------------------------------------------|
| Vercel Deployments | Overview of deployments, including status, aliases, and events. |
| Vercel Projects    | Overview of projects and related security firewall activity.    |
| Vercel Log Drains  | Overview of the log drains configured for your account or team. |

To import a pre-built dashboard:

1. Navigate to **Connections** &gt; **Data sources**.
2. Select your Vercel data source.
3. Go to the **Dashboards** tab.
4. Select **Import** next to the dashboard you want to use.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> On Grafana Cloud, Grafana manages the Vercel plugin, and it updates automatically. On self-managed Grafana, you must update Enterprise plugins manually. Refer to [Version and upgrade guidance](/docs/plugins/grafana-vercel-datasource/latest/troubleshooting/#version-and-upgrade-guidance).

## Related resources

- [Vercel REST API documentation](https://vercel.com/docs/rest-api)
- [Grafana community forum](https://community.grafana.com/)
