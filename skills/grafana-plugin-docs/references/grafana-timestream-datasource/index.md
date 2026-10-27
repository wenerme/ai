---
title: "Amazon Timestream data source | Grafana Plugins documentation"
description: "Use the Amazon Timestream data source to query and visualize time-series data from Amazon Timestream in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Amazon Timestream data source

The Amazon Timestream data source lets you query and visualize time-series data stored in [Amazon Timestream](https://aws.amazon.com/timestream/) directly within Grafana dashboards. Amazon Timestream is a fully managed, serverless time-series database designed for IoT and operational workloads that automatically scales to handle trillions of events per day.

## Requirements

The Amazon Timestream data source requires Grafana 10.4 or later.

## Supported features

The following table lists the features available with the Amazon Timestream data source.

Expand table

| Feature     | Supported |
|-------------|-----------|
| Metrics     | Yes       |
| Logs        | No        |
| Traces      | No        |
| Annotations | Yes       |
| Alerting    | Yes       |

## Get started

The following documents help you set up and use the Amazon Timestream data source:

- [Configure the Amazon Timestream data source](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-timestream-datasource/latest/configure/)
- [Amazon Timestream query editor](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-timestream-datasource/latest/query-editor/)
- [Template variables](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-timestream-datasource/latest/template-variables/)
- [Annotations](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-timestream-datasource/latest/annotations/)
- [Alerting](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-timestream-datasource/latest/alerting/)
- [Troubleshooting](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-timestream-datasource/latest/troubleshooting/)

## Additional features

After you configure the data source, you can:

- Use [Explore](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/grafana/latest/explore/) to run ad-hoc queries without building a dashboard.
- Add [transformations](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- Set up [alerting](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/grafana/latest/alerting/) rules to get notified when data meets specific conditions.

## Pre-built dashboards

The Amazon Timestream data source includes a **Sample (DevOps)** dashboard. To import it:

1. Navigate to the Amazon Timestream data source configuration page.
2. Click the **Dashboards** tab.
3. Click **Import** next to **Sample (DevOps)**.

Refer to the [Sample Application section](https://docs.aws.amazon.com/timestream/latest/developerguide/Grafana.html#Grafana.sample-app) in the official Timestream documentation to set up the sample data this dashboard uses.

## Plugin updates

Always ensure that your plugin version is up to date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.

## Related resources

- [Amazon Timestream documentation](https://docs.aws.amazon.com/timestream/)
- [Amazon Timestream query language reference](https://docs.aws.amazon.com/timestream/latest/developerguide/reference.html)
- [Timestream plugin GitHub repository](https://github.com/grafana/timestream-datasource/)
- [Grafana community forum](https://community.grafana.com/)
