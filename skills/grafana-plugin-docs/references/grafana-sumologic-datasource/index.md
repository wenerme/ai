---
title: "Sumo Logic data source | Grafana Enterprise Plugins documentation"
description: "Use the Sumo Logic data source to query and visualize metrics and logs data in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Sumo Logic data source

The Sumo Logic data source lets you query and visualize metrics and log data from [Sumo Logic](https://www.sumologic.com/) in Grafana. You can use the visual metrics query builder or write raw queries for both metrics and logs, then display results in dashboards and set up alerts.

> Note
>
> The Sumo Logic data source is an Enterprise plugin. It’s available with a [Grafana Cloud Pro or Advanced](http://grafana-com-website.grafana-com.svc.cluster.local.:80/pricing/) plan and [Grafana Enterprise](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/grafana/latest/introduction/grafana-enterprise/). For installation instructions, refer to [Install Grafana Enterprise plugins](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).

## Supported features

The following table lists the features available with the Sumo Logic data source.

Expand table

| Feature     | Supported |
|-------------|-----------|
| Metrics     | Yes       |
| Logs        | Yes       |
| Alerting    | Yes       |
| Annotations | Yes       |
| Traces      | No        |

## Get started

The following guides help you set up and use the Sumo Logic data source:

- [Configure the Sumo Logic data source](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-sumologic-datasource/latest/configure/)
- [Sumo Logic query editor](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-sumologic-datasource/latest/query-editor/)
- [Template variables](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-sumologic-datasource/latest/template-variables/)
- [Annotations](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-sumologic-datasource/latest/annotations/)
- [Set up alerting](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-sumologic-datasource/latest/alerting/)
- [Troubleshooting](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-sumologic-datasource/latest/troubleshooting/)

## Additional features

After configuring the data source, you can:

- Use [Explore](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/grafana/latest/explore/) to query Sumo Logic data without building a dashboard.
- Add [transformations](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- Set up [alerting](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-sumologic-datasource/latest/alerting/) rules to monitor your Sumo Logic metrics.
- Add [annotations](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-sumologic-datasource/latest/annotations/) to mark events on dashboard panels.
- Create [template variables](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-sumologic-datasource/latest/template-variables/) for dynamic, reusable dashboards.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.

## Related resources

- [Sumo Logic documentation](https://help.sumologic.com/)
- [Sumo Logic API documentation](https://help.sumologic.com/docs/api/)
- [Grafana community forum](https://community.grafana.com/)
