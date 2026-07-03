---
title: "Splunk data source | Grafana Enterprise Plugins documentation"
description: "Use the Splunk data source to query and visualize Splunk data in Grafana using SPL or a visual query builder."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Splunk data source

Splunk is a data and log analysis tool used for monitoring and troubleshooting a wide variety of systems. The Splunk data source allows you to query and visualize Splunk data with Search Processing Language (SPL) or a visual SPL editor.

> Note
>
> The Splunk data source is an Enterprise plugin. It’s available with a Grafana Cloud Pro or Advanced plan and Grafana Enterprise. For installation instructions, refer to [Install the Splunk data source](/docs/plugins/grafana-splunk-datasource/latest/install/).

## Supported features

Expand table

| Feature     | Supported |
|-------------|-----------|
| Metrics     | Yes       |
| Logs        | Yes       |
| Traces      | No        |
| Alerting    | Yes       |
| Annotations | Yes       |

## Requirements

The Splunk data source has the following requirements:

- A [Splunk account](https://www.splunk.com/en_us/sign-up.html).
- A [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated self-managed Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/).
- Grafana version 11.6.7 or later.
- [Port 8089 enabled](https://docs.splunk.com/Documentation/SplunkCloud/latest/Config/ConfigureOutboundPorts) on your Splunk instance.

## Get started

The following documents help you set up and use the Splunk data source:

- [Install the Splunk data source](/docs/plugins/grafana-splunk-datasource/latest/install/)
- [Get started with Splunk on Grafana Cloud](/docs/plugins/grafana-splunk-datasource/latest/cloud-quickstart/)
- [Configure the Splunk data source](/docs/plugins/grafana-splunk-datasource/latest/configure/)
- [Splunk query editor](/docs/plugins/grafana-splunk-datasource/latest/query-editor/)
- [Splunk template variables](/docs/plugins/grafana-splunk-datasource/latest/template-variables/)
- [Annotations](/docs/plugins/grafana-splunk-datasource/latest/annotations/)
- [Alerting](/docs/plugins/grafana-splunk-datasource/latest/alerting/)
- [Troubleshoot the Splunk data source](/docs/plugins/grafana-splunk-datasource/latest/troubleshooting/)

## Additional features

After configuring the data source, you can:

- Use [Explore](/docs/grafana/latest/explore/) to query Splunk data without building a dashboard.
- Add [Annotations](/docs/grafana/latest/dashboards/annotations/) to overlay Splunk alerts or events on graphs.
- Configure and use [template variables](/docs/plugins/grafana-splunk-datasource/latest/template-variables/) for dynamic dashboards.
- Add [Transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- Set up [Alerting](/docs/grafana/latest/alerting/) rules based on Splunk queries.

## Pre-built dashboards

The Splunk data source includes three pre-built dashboards for monitoring Kubernetes environments. These dashboards require Kubernetes data ingested into Splunk via the [Splunk OpenTelemetry Collector for Kubernetes](https://github.com/signalfx/splunk-otel-collector-chart).

- **Kubernetes overview:** Summary statistics on cluster capacity, resource utilization, and pod state. Filter by cluster name and namespace.
- **Node overview:** Summary statistics for nodes in the cluster. Filter by node and cluster name.
- **Pod overview:** Summary statistics for Pods in the cluster. Filter by Pod and cluster name.

To import a dashboard, navigate to **Connections** &gt; **Data sources** &gt; **Splunk**, click the **Dashboards** tab, and click **Import**.

> Note
>
> When opening a dashboard, ensure you select an appropriate metrics and events index. These default to `em_metrics` and `main` respectively.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.

## Related resources

- [Splunk documentation](https://docs.splunk.com/)
- [Splunk Infrastructure Monitoring data source for Grafana](/docs/plugins/grafana-splunk-monitoring-datasource/latest/)
- [Grafana community forum](https://community.grafana.com/)
