---
title: "New Relic data source | Grafana Enterprise Plugins documentation"
description: "Use the New Relic data source to query and visualize APM, Infrastructure, and Insights data in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# New Relic data source

The New Relic data source allows you to query and visualize data from New Relic in Grafana. You can query APM metrics, build visual queries with Data Explorer, write raw NRQL queries, search logs, and explore distributed traces.

> Note
>
> The New Relic data source is an Enterprise plugin. It’s available with a [Grafana Cloud Pro or Advanced](/pricing/) plan and [Grafana Enterprise](/docs/grafana/latest/enterprise/). For installation instructions, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).

## Supported features

The New Relic data source supports the following features:

Expand table

| Feature     | Supported |
|-------------|-----------|
| Metrics     | Yes       |
| Logs        | Yes       |
| Traces      | Yes       |
| Alerting    | Yes       |
| Annotations | Yes       |

## Requirements

To use the New Relic data source, you need:

- A New Relic account with a [User API key](https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/#user-key) and your [Account ID](https://docs.newrelic.com/docs/accounts/accounts-billing/account-structure/account-id/).
- A [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated on-prem Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/).

## Known limitations

- Ad-hoc filters aren’t supported.
- NRQL queries with multiple `FACET` fields aren’t supported.

## Get started

The following documents help you set up and use the New Relic data source:

- [Configure the New Relic data source](/docs/plugins/grafana-newrelic-datasource/latest/configure/)
- [New Relic query editor](/docs/plugins/grafana-newrelic-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-newrelic-datasource/latest/template-variables/)
- [Annotations](/docs/plugins/grafana-newrelic-datasource/latest/annotations/)
- [Alerting](/docs/plugins/grafana-newrelic-datasource/latest/alerting/)
- [Troubleshooting](/docs/plugins/grafana-newrelic-datasource/latest/troubleshooting/)

## Additional features

After configuring the data source, you can:

- Add [Annotations](/docs/plugins/grafana-newrelic-datasource/latest/annotations/) to overlay deployment and alert events on your graphs.
- Configure [Template variables](/docs/plugins/grafana-newrelic-datasource/latest/template-variables/) for dynamic dashboards.
- Use [Explore](/docs/grafana/latest/explore/) to run ad-hoc NRQL queries without building a dashboard.
- Add [Transformations](/docs/grafana/latest/panels/transformations/) to manipulate query results.
- Set up [Alerting](/docs/plugins/grafana-newrelic-datasource/latest/alerting/) to monitor your New Relic data.

## Pre-built dashboards

The New Relic plugin includes the following pre-built dashboard:

- **Host Metrics** — Displays key host-level metrics from New Relic Infrastructure.

To import the dashboard:

1. Go to **Connections** &gt; **Data sources**.
2. Select your New Relic data source.
3. Click the **Dashboards** tab.
4. Click **Import** next to the Host Metrics dashboard.

For more information about importing dashboards, refer to [Import a dashboard](/docs/grafana/latest/dashboards/build-dashboards/import-dashboards/).

## Related resources

- [New Relic documentation](https://docs.newrelic.com/)
- [Introduction to NRQL](https://docs.newrelic.com/docs/query-your-data/nrql-new-relic-query-language/get-started/introduction-nrql-new-relics-query-language/)
- [Grafana community forum](https://community.grafana.com/)

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.
