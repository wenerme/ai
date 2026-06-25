---
title: "AppDynamics data source | Grafana Enterprise Plugins documentation"
description: "Get started with the AppDynamics data source for Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# AppDynamics data source

The AppDynamics data source allows you to query and visualize AppDynamics metrics and analytics in Grafana. You can monitor application performance, query business transactions, and analyze data using ADQL (AppDynamics Query Language).

> Note
>
> The AppDynamics data source is an Enterprise plugin. It is available with Grafana Cloud (Free, Pro, and Advanced tiers) and Grafana Enterprise. For installation instructions, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).

## Supported features

Expand table

| Feature     | Supported |
|-------------|-----------|
| Metrics     | Yes       |
| Alerting    | Yes       |
| Annotations | Yes       |
| Logs        | No        |
| Traces      | No        |

## Get started

The following documents will help you get started with the AppDynamics data source:

- [Configure the AppDynamics data source](/docs/plugins/dlopes7-appdynamics-datasource/latest/configure/)
- [AppDynamics query editor](/docs/plugins/dlopes7-appdynamics-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/dlopes7-appdynamics-datasource/latest/template-variables/)
- [Annotations](/docs/plugins/dlopes7-appdynamics-datasource/latest/annotations/)
- [Alerting](/docs/plugins/dlopes7-appdynamics-datasource/latest/alerting/)
- [Troubleshooting](/docs/plugins/dlopes7-appdynamics-datasource/latest/troubleshooting/)

## Additional features

Once you have configured the data source, you can:

- Set up [Alerting](/docs/plugins/dlopes7-appdynamics-datasource/latest/alerting/) to monitor your AppDynamics metrics.
- Add [Annotations](/docs/plugins/dlopes7-appdynamics-datasource/latest/annotations/) to overlay AppDynamics events on your visualizations.
- Configure and use [Template variables](/docs/plugins/dlopes7-appdynamics-datasource/latest/template-variables/) for dynamic dashboards.
- Add [Transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/).

## Import a dashboard

The AppDynamics plugin includes the following pre-built dashboard:

- **AppDynamics Overview** - Provides an at-a-glance view of application health with panels for App Response Time, Calls Per Minute, Num Slow Calls, Slow Calls, and Stall Count.

To import the dashboard:

1. Go to **Connections** &gt; **Data sources**.
2. Select your AppDynamics data source.
3. Click the **Dashboards** tab.
4. Click **Import** next to **AppDynamics Overview**.

For more information about importing dashboards, refer to [Import a dashboard](/docs/grafana/latest/dashboards/build-dashboards/import-dashboards/).

## Known limitations

- A metric path name can’t contain the delimiter that you select. For more information, refer to [AppDynamics query editor](/docs/plugins/dlopes7-appdynamics-datasource/latest/query-editor/).
- Multi-value variables aren’t supported in Metrics queries. If multi-value variables are found in a metric path, they’re replaced with `*`.

## Plugin updates

Ensure your plugin version is up to date so you have access to all current features and improvements. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins** to check for updates.

> Note
>
> Plugins are automatically updated in Grafana Cloud.
