---
title: "Salesforce data source | Grafana Enterprise Plugins documentation"
description: "Get started with the Salesforce data source for Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Salesforce data source

The Salesforce data source allows you to query and visualize data from Salesforce in Grafana using SOQL (Salesforce Object Query Language). You can build dashboards to monitor sales pipelines, track customer cases, analyze lead conversion, and more.

## Supported Salesforce environments

The Salesforce data source supports the following Salesforce deployment types:

- **Production** - Your live Salesforce environment.
- **Sandbox** - Test and development environments for staging changes.

## Import a dashboard

The Salesforce plugin includes the following pre-built dashboards:

- **Salesforce Demo** - A demonstration dashboard showcasing common Salesforce visualizations.
- **Salesforce SLT Scorecard** - A scorecard for tracking sales leadership team metrics.

To import a dashboard:

1. Go to **Connections** &gt; **Data sources**.
2. Select your Salesforce data source.
3. Click the **Dashboards** tab.
4. Click **Import** next to the dashboard you want to use.

For more information about importing dashboards, refer to [Import a dashboard](/docs/grafana/latest/dashboards/build-dashboards/import-dashboards/).

## Get started

The following documents will help you get started with the Salesforce data source:

- [Configure the Salesforce data source](/docs/plugins/grafana-salesforce-datasource/latest/configure/)
- [Salesforce query editor](/docs/plugins/grafana-salesforce-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-salesforce-datasource/latest/template-variables/)
- [Troubleshooting](/docs/plugins/grafana-salesforce-datasource/latest/troubleshooting/)

## Additional features

Once you have configured the data source, you can:

- Add [Annotations](/docs/plugins/grafana-salesforce-datasource/latest/annotations/) to overlay Salesforce events on your graphs.
- Configure and use [Template variables](/docs/plugins/grafana-salesforce-datasource/latest/template-variables/) for dynamic dashboards.
- Add [Transformations](/docs/grafana/latest/panels/transformations/).
- Set up [Alerting](/docs/plugins/grafana-salesforce-datasource/latest/alerting/) to monitor your Salesforce data.

## Known limitations

The following are current known limitations:

- Ad-hoc filters are not supported.
- Only SOQL queries, and data that is accessible via SOQL, are supported. SOSL and SAQL query formats are not currently supported.
- Salesforce Commerce Cloud (SFCC) is not supported.

## Plugin updates

Ensure your plugin version is up to date so you have access to all current features and improvements. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins** to check for updates.

> Note
>
> Plugins are automatically updated in Grafana Cloud.
