---
title: "ServiceNow data source | Grafana Enterprise Plugins documentation"
description: "Use the ServiceNow data source to query and visualize ServiceNow data in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# ServiceNow data source

The ServiceNow data source allows you to query and visualize data from [ServiceNow](https://www.servicenow.com/) tables within Grafana. Use it to build dashboards for incident management, change tracking, and operational visibility using your ServiceNow instance data.

> Note
>
> The ServiceNow data source is an Enterprise plugin. It’s available with Grafana Cloud (Pro and Advanced tiers) and Grafana Enterprise. For installation instructions, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).

## Supported features

The following table lists the features available with the ServiceNow data source:

Expand table

| Feature     | Supported |
|-------------|-----------|
| Metrics     | Yes       |
| Alerting    | Yes       |
| Annotations | Yes       |

## Get started

The following documents help you set up and use the ServiceNow data source:

- [Configure the ServiceNow data source](/docs/plugins/grafana-servicenow-datasource/latest/configure/)
- [ServiceNow query editor](/docs/plugins/grafana-servicenow-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-servicenow-datasource/latest/template-variables/)
- [Annotate dashboards](/docs/plugins/grafana-servicenow-datasource/latest/annotations/)
- [Set up alerting](/docs/plugins/grafana-servicenow-datasource/latest/alerting/)
- [Troubleshoot ServiceNow](/docs/plugins/grafana-servicenow-datasource/latest/troubleshooting/)

## Additional features

After configuring the data source, you can also:

- Use [Explore](/docs/grafana/latest/explore/) to query data without building a dashboard.
- Add [transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- [Annotate dashboards](/docs/plugins/grafana-servicenow-datasource/latest/annotations/) with ServiceNow events like incidents and change requests.
- Set up [alerting](/docs/plugins/grafana-servicenow-datasource/latest/alerting/) rules with ServiceNow queries.
- Create [template variables](/docs/plugins/grafana-servicenow-datasource/latest/template-variables/) for dynamic, reusable dashboards.

## Pre-built dashboards

The ServiceNow data source includes the following pre-built dashboards:

- **Incident Overview** – Displays open incidents grouped by priority and category.
- **Change Overview** – Displays recent change requests and their status.

To import a pre-built dashboard:

1. Navigate to the ServiceNow data source configuration page.
2. Click the **Dashboards** tab.
3. Click **Import** next to the dashboard you want to use.

## Version compatibility

The following version requirements apply to this plugin:

Expand table

| Dependency | Requirement                       |
|------------|-----------------------------------|
| Grafana    | 11.6.7 or later                   |
| ServiceNow | Washington DC and Xanadu (tested) |

The current version of the plugin has been tested against the [Washington DC](https://docs.servicenow.com/bundle/washingtondc-release-notes/page/release-notes/family-release-notes.html) and [Xanadu](https://docs.servicenow.com/bundle/xanadu-release-notes/page/release-notes/family-release-notes.html) releases of ServiceNow. Older ServiceNow releases may work but aren’t validated.

## Known limitations

The following limitations apply to the ServiceNow data source:

- Filters in the query editor don’t support fields of reference type. You can still query reference fields in the **Show Fields** selector and use dot notation to access sub-fields, but you can’t filter on them directly.
- Field references expand to one level deep only. Nested references beyond the first level can’t be expanded in the field selector.
- When the **Use Sys Tables?** option is enabled and the ServiceNow user has access to a large number of tables, you may experience slower load times in the query editor. Grant the user access only to the tables it needs.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.

## Related resources

- [ServiceNow REST API reference](https://developer.servicenow.com/dev.do#!/reference/api/washingtondc/rest/c_TableAPI)
- [ServiceNow releases](https://www.servicenow.com/now-platform/latest-release.html)
- [Grafana community forum](https://community.grafana.com/)
