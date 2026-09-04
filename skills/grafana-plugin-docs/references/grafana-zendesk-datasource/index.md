---
title: "Zendesk data source | Grafana Enterprise Plugins documentation"
description: "The Zendesk data source lets you query and visualize Zendesk ticket and user data in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Zendesk data source

> Note
>
> Grafana **Zendesk** data source plugin is currently in [public preview](/docs/release-life-cycle/). Grafana Labs offers limited support, and breaking changes might occur prior to the feature being made generally available.

The Zendesk data source plugin lets you query and visualize data from your Zendesk account in Grafana. Use it to bring ticket, user, and organization data from the Zendesk API into dashboards, alerts, and Explore.

> Note
>
> The Zendesk data source is an Enterprise plugin. You can use it in Grafana Cloud with a Pro or Advanced plan, or in self-managed Grafana with an activated Grafana Enterprise license. For installation instructions, refer to [Install the Zendesk data source](/docs/plugins/grafana-zendesk-datasource/latest/install/).

## Requirements

The Zendesk data source has the following requirements:

- A Zendesk account with an API token.
- A [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated self-managed Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/). Contracted Cloud customers should refer to their agreement.
- Grafana version 11.6.7 or later.

## Supported features

The Zendesk data source supports the following Grafana features:

Expand table

| Feature     | Supported |
|-------------|-----------|
| Metrics     | Yes       |
| Logs        | No        |
| Traces      | No        |
| Alerting    | Yes       |
| Annotations | Yes       |

Alerting works with queries that return numeric values, such as `Count tickets`.

## Get started

The following documents help you get started with the Zendesk data source:

- [Install the Zendesk data source](/docs/plugins/grafana-zendesk-datasource/latest/install/)
- [Configure the Zendesk data source](/docs/plugins/grafana-zendesk-datasource/latest/configure/)
- [Zendesk query editor](/docs/plugins/grafana-zendesk-datasource/latest/query-editor/)
- [Zendesk template variables](/docs/plugins/grafana-zendesk-datasource/latest/template-variables/)
- [Zendesk annotations](/docs/plugins/grafana-zendesk-datasource/latest/annotations/)
- [Zendesk data source alerting](/docs/plugins/grafana-zendesk-datasource/latest/alerting/)
- [Troubleshoot the Zendesk data source](/docs/plugins/grafana-zendesk-datasource/latest/troubleshooting/)

## Additional features

After you configure the data source, you can:

- Use [Explore](/docs/grafana/latest/explore/) to query Zendesk data without building a dashboard.
- Add [Transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- Set up [Alerting](/docs/plugins/grafana-zendesk-datasource/latest/alerting/) rules on numeric queries, such as ticket counts.

## Pre-built dashboards

The Zendesk data source includes a pre-built **Zendesk Demo** dashboard that shows ticket counts, recent tickets, and users. To import it:

1. Navigate to **Connections** &gt; **Data sources** and select your Zendesk data source.
2. Select the **Dashboards** tab.
3. Find **Zendesk Demo** and click **Import**.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> On Grafana Cloud, the Zendesk plugin is managed by Grafana and updates automatically. On self-managed Grafana, you must update Enterprise plugins manually. Refer to [Version and upgrade guidance](/docs/plugins/grafana-zendesk-datasource/latest/troubleshooting/#version-and-upgrade-guidance).

## Related resources

- [Zendesk API documentation](https://developer.zendesk.com/api-reference/)
- [Grafana community forum](https://community.grafana.com/)
