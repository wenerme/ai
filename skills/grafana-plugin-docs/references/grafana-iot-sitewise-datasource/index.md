---
title: "AWS IoT SiteWise data source | Grafana Plugins documentation"
description: "Use the AWS IoT SiteWise data source to query and visualize industrial equipment data from AWS IoT SiteWise in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# AWS IoT SiteWise data source

The AWS IoT SiteWise data source lets you query and visualize data from [AWS IoT SiteWise](https://aws.amazon.com/iot-sitewise/) in Grafana. AWS IoT SiteWise is a managed service that collects, stores, organizes, and monitors data from industrial equipment at scale, so you can build dashboards for asset properties, aggregates, and time series without moving your data.

> Warning
>
> Use Grafana version 10.4.0 or later with the AWS IoT SiteWise data source. Grafana instances earlier than 10.4.0 can’t use AWS IoT SiteWise data source versions later than 1.25.2.

## Supported features

The following table lists the features available with this data source.

Expand table

| Feature            | Supported |
|--------------------|-----------|
| Metrics            | Yes       |
| Logs               | No        |
| Traces             | No        |
| Alerting           | Yes       |
| Annotations        | Yes       |
| Template variables | Yes       |

## Requirements

To use the AWS IoT SiteWise data source, you need:

- A Grafana instance running version 10.4.0 or later.
- An AWS account with AWS IoT SiteWise enabled in at least one Region, or a configured SiteWise Edge gateway.
- AWS credentials or an IAM identity with read access to AWS IoT SiteWise.

## Get started

The following pages help you get started with the AWS IoT SiteWise data source.

- [Configure the AWS IoT SiteWise data source](/docs/plugins/grafana-iot-sitewise-datasource/latest/configure/)
- [AWS IoT SiteWise query editor](/docs/plugins/grafana-iot-sitewise-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-iot-sitewise-datasource/latest/template-variables/)
- [Annotations](/docs/plugins/grafana-iot-sitewise-datasource/latest/annotations/)
- [Alerting](/docs/plugins/grafana-iot-sitewise-datasource/latest/alerting/)
- [Troubleshooting](/docs/plugins/grafana-iot-sitewise-datasource/latest/troubleshooting/)

## Additional features

After you configure the data source, you can use the following Grafana features.

- Use [Explore](/docs/grafana/latest/explore/) to query data without building a dashboard.
- Add [Transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- Set up [Alerting](/docs/grafana/latest/alerting/) rules to get notified when data changes.
- Configure and use [Template variables](/docs/grafana/latest/dashboards/variables/) to build dynamic dashboards.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.

## Related resources

- [AWS IoT SiteWise documentation](https://docs.aws.amazon.com/iot-sitewise/latest/userguide/what-is-sitewise.html)
- [AWS IoT SiteWise data source plugin GitHub repository](https://github.com/grafana/iot-sitewise-datasource)
- [Grafana community forum](https://community.grafana.com/)
