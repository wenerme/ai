---
title: "AWS Application Signals data source | Grafana Plugins documentation"
description: "The AWS Application Signals data source plugin for Grafana lets you query and visualize AWS X-Ray traces, service maps, and Application Signals services, service operations, dependencies, and SLOs."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# AWS Application Signals data source

The AWS Application Signals data source plugin lets you query and visualize [AWS Application Signals](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Application-Monitoring-Sections.html) services and [AWS X-Ray](https://aws.amazon.com/xray/) traces in Grafana. Use it to explore distributed traces, inspect service maps, monitor service-level objectives (SLOs), and correlate application signals with the rest of your observability data.

This plugin was formerly named the AWS X-Ray data source.

## Supported features

Expand table

| Feature                           | Supported |
|-----------------------------------|-----------|
| Metrics                           | Yes       |
| Logs                              | No        |
| Traces                            | Yes       |
| Alerting                          | Yes       |
| Annotations                       | No        |
| Template variables                | Yes       |
| Cross-account observability       | Yes       |
| Private Data source Connect (PDC) | Yes       |

> Note
>
> **Annotations** in the table refers to [Grafana dashboard annotations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/), which are event markers overlaid on panels. This data source doesn’t support them.
>
> It’s different from **X-Ray trace annotations**, which are key-value pairs attached to trace segments by the AWS X-Ray SDK and used in filter expressions (for example, `annotation.account = "12345"`). X-Ray trace annotations are fully supported in Trace queries.

## Get started

The following documents help you get started:

- [Configure the AWS Application Signals data source](/docs/plugins/grafana-x-ray-datasource/latest/configure/)
- [AWS Application Signals query editor](/docs/plugins/grafana-x-ray-datasource/latest/query-editor/)
- [Alerting with the AWS Application Signals data source](/docs/plugins/grafana-x-ray-datasource/latest/alerting/)
- [Template variables](/docs/plugins/grafana-x-ray-datasource/latest/template-variables/)
- [Troubleshoot AWS Application Signals data source issues](/docs/plugins/grafana-x-ray-datasource/latest/troubleshooting/)

## Additional features

After you configure the data source, you can:

- Use [Explore](/docs/grafana/latest/explore/) to query data without building a dashboard.
- Apply [Transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- [Build alert rules](/docs/plugins/grafana-x-ray-datasource/latest/alerting/) on numeric Trace Statistics queries.
- Visualize service maps in the [Node graph](/docs/grafana/latest/panels-visualizations/visualizations/node-graph/) panel.

## Pre-built dashboards

The plugin ships with an **X-Ray App Signals** dashboard that fetches services and their associated CloudWatch metrics for user-selected Application Signals and CloudWatch data sources. The dashboard lets you pick a service, service operation, or service dependency and inspect the related CloudWatch metrics.

To use the dashboard, you must have Application Signals enabled in your CloudWatch account and select the appropriate Application Signals and CloudWatch data sources and region in the dashboard variables.

To import the dashboard:

1. Click **Connections** in the left-side menu.
2. Click **Data sources** and select your **AWS Application Signals** data source.
3. Select the **Dashboards** tab.
4. Find **X-Ray App Signals** and click **Import**.

For more information about Application Signals and how to enable it in AWS, refer to the [AWS Application Signals documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Application-Monitoring-Sections.html).

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.

## Related resources

- [AWS Application Signals documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Application-Monitoring-Sections.html)
- [AWS X-Ray documentation](https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html)
- [AWS X-Ray console filter expressions](https://docs.aws.amazon.com/xray/latest/devguide/xray-console-filters.html)
- [AWS X-Ray and CloudWatch pricing](https://aws.amazon.com/cloudwatch/pricing/)
- [Plugin GitHub repository](https://github.com/grafana/x-ray-datasource/)
- [Grafana community forum](https://community.grafana.com/)
