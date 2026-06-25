---
title: "Datadog data source | Grafana Enterprise Plugins documentation"
description: "This document introduces the Datadog data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Datadog data source

Datadog is a popular monitoring and analytics tool. The Datadog data source for Grafana allows you to query and visualize Datadog metrics. With Grafana’s hosted Datadog metrics service, you can also forward metrics directly from your Datadog agents.

To get started with the Datadog data source, refer to following topics:

- [Configure the Datadog data source](/docs/plugins/grafana-datadog-datasource/latest/configure/)
- [Query editor](/docs/plugins/grafana-datadog-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-datadog-datasource/latest/template-variables/)
- [Troubleshoot](/docs/plugins/grafana-datadog-datasource/latest/troubleshooting/)

## Requirements

The Datadog data source has the following requirements:

- A Datadog account.
- Any free or paid [Grafana Cloud](/pricing/) plan or an [activated on-prem Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/). Contracted Cloud customers should refer to their agreement.

## Compatibility requirements

There are no compatibility requirements for the Datadog plugin.

## Known limitations

There are no known limitations for the Datadog data source.

## Import a dashboard for Datadog

For instructions on how to import dashboards in Grafana, see [Import a dashboard](/docs/grafana/latest/dashboards/export-import/#importing-a-dashboard).

To view a list of pre-made Datadog dashboards do the following:

1. Go to **Connections** in the sidebar menu.
2. Under Connections, click **Data sources**.
3. Type `Datadog` in the search bar and select the Datadog data source.
4. Go to the **Dashboards** tab to view a list of pre-made dashboards.
5. Click **Import** to import the pre-made dashboard.

## Get the most out of the Datadog plugin

After installing and configuring Datadog you can:

- Add [Annotations](/docs/grafana/latest/dashboards/annotations/)
- Configure and use [Templates and variables](/docs/grafana/latest/variables/)
- Add [Transformations](/docs/grafana/latest/panels/transformations/)
- Set up [Alerting](/docs/grafana/latest/alerting/)
