---
title: "Honeycomb data source for Grafana | Grafana Enterprise Plugins documentation"
description: "The Honeycomb data source for Grafana allows you to query and visualize Honeycomb metrics and link to Honeycomb traces"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Honeycomb data source for Grafana

The Honeycomb data source for Grafana allows you to query and visualize Honeycomb metrics and link to Honeycomb traces from within Grafana.

## Before you begin

To use this data source, you need the following:

- An active Honeycomb Enterprise team
- A [Grafana Cloud](/products/cloud/) Free, Advanced, or Trial account, or an [activated Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/)
- To query SLO report data, a [Honeycomb Enterprise plan](https://docs.honeycomb.io/api/slos/#get-an-slo)

## Known limitations

The Honeycomb data source has the following limitations:

- Changes to the Honeycomb API may occasionally affect data source behavior.
- This data source does not yet support ad-hoc queries.
- Due to API limitations, the variable editor can only return the first 1000 unique values for a selected column.
- By default, the data source queries the last 7 days of data due to Honeycomb API limitations. You can adjust this with the **Time Window (days)** [advanced setting](/docs/plugins/grafana-honeycomb-datasource/latest/configure/#advanced-settings).
- The use of `__all__` as the dataset slug to list all columns is not supported for classic environments, per Honeycomb documentation.

## Install the data source plugin

To install the data source, refer to [Installation](/grafana/plugins/grafana-honeycomb-datasource/?tab=installation).

> Note
>
> On Grafana Cloud, it can take up to 15 minutes to see the data source plugin within Grafana.

### Verify that the plugin is installed

To verify the plugin is installed:

1. In Grafana from the left-hand menu, navigate to **Configuration** &gt; **Data sources**.
2. From the top-right corner, click the **Add data source** button.
3. Search for `Honeycomb` in the search field, and hover over the Honeycomb search result.
4. Click the **Select** button for Honeycomb.

   - If you can click the **Select** button, then it is installed.
   - If the button is missing or disabled, then the plugin is not installed. Check to see if your Grafana Enterprise license is valid, and reinstall the plugin. If you still need help, [contact Grafana Labs](/contact).

## Get started

Once you have installed the plugin, refer to the following documentation to get started:

- [Configure the Honeycomb data source](/docs/plugins/grafana-honeycomb-datasource/latest/configure/) - Set up your API key, connection settings, and provisioning options.
- [Query editor](/docs/plugins/grafana-honeycomb-datasource/latest/query-editor/) - Learn how to build Metrics, SLO, and Raw queries.
- [Template variables](/docs/plugins/grafana-honeycomb-datasource/latest/template-variables/) - Create dynamic dashboards with variables.
- [Troubleshooting](/docs/plugins/grafana-honeycomb-datasource/latest/troubleshooting/) - Resolve common issues and errors.

## Grafana Assistant

The query editor includes a **Grafana Assistant** button that provides AI-powered help for building and refining Honeycomb queries. Click the assistant button above the query type selector to get started.

For more information, refer to [Grafana Assistant](/docs/grafana/latest/ai/assistant/).

## Import a dashboard

The Honeycomb data source includes pre-built dashboards to help you get started.

To find and import the available dashboards:

1. Go to **Connections** &gt; **Data sources**.
2. Select the **Honeycomb** data source.
3. Select the **Dashboards** tab to see the available pre-built dashboards.
4. Click **Import** next to the dashboard you want to add.

After importing, your dashboards appear in the **Dashboards** menu.

For more information, refer to [Import a dashboard](/docs/grafana/latest/dashboards/export-import/#importing-a-dashboard).

## Alerting

The Honeycomb data source supports [Grafana Alerting](/docs/grafana/latest/alerting/). You can use any Honeycomb query (Metrics, SLO, or Raw) as the condition for an alert rule. The plugin uses the standard Grafana Alerting interface with no additional configuration required.

For more information about creating alert rules, refer to [Create alert rules](/docs/grafana/latest/alerting/alerting-rules/).

## Annotations

You can use the Honeycomb data source to create [annotations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/) that overlay event markers on your dashboard panels. Any Honeycomb query can serve as an annotation source. The plugin uses the standard Grafana annotation interface with no additional configuration required.

For more information about querying annotations, refer to [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Learn more

- Configure and use [Templates and variables](/docs/grafana/latest/variables/)
- Add [Transformations](/docs/grafana/latest/panels/transformations/)
- Explore the [Honeycomb API documentation](https://docs.honeycomb.io/api/)
