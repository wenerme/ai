---
title: "SAP HANA data source for Grafana | Grafana Enterprise Plugins documentation"
description: "Introduction to the SAP HANA data source plugin for Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# SAP HANA data source

The SAP HANA data source plugin allows you to query and visualize data from your SAP HANA database in Grafana. You can create dashboards with time-series and table data, set up alerts, and use template variables for dynamic queries.

> Note
>
> The SAP HANA data source is an Enterprise plugin. It is available with [Grafana Cloud](/products/cloud/) (Free, Pro, and Advanced tiers) and [Grafana Enterprise](/products/enterprise/). For installation instructions, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins/).

## Supported SAP HANA environments

The SAP HANA data source supports the following deployment types:

- **SAP HANA Cloud** - SAP’s cloud-hosted database service where SAP manages all infrastructure.
- **SAP HANA on-premises** - Self-hosted SAP HANA deployment that you run on your own infrastructure.
- **Tenant databases** - Connect to a tenant either by host and port, or with host, database name, and instance number.

## Get started

The following documents help you get started with the SAP HANA data source:

- [Configure the SAP HANA data source](/docs/plugins/grafana-saphana-datasource/latest/configure/)
- [SAP HANA query editor](/docs/plugins/grafana-saphana-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-saphana-datasource/latest/template-variables/)
- [Troubleshooting](/docs/plugins/grafana-saphana-datasource/latest/troubleshooting/)

## Additional features

Once you have configured the SAP HANA data source, you can:

- Add [Annotations](/docs/plugins/grafana-saphana-datasource/latest/annotations/) to overlay SAP HANA events on your graphs.
- Configure and use [Template variables](/docs/plugins/grafana-saphana-datasource/latest/template-variables/) for dynamic dashboards.
- Add [Transformations](/docs/grafana/latest/panels/transformations/).
- Set up [Alerting](/docs/plugins/grafana-saphana-datasource/latest/alerting/) to monitor your SAP HANA data.

## Related resources

- [SAP HANA](https://www.sap.com/products/hana.html)
- [SAP HANA Documentation](https://help.sap.com/viewer/product/HANA_CLOUD/hanacloud/en-US)
- [SAP HANA SQL Reference](https://help.sap.com/viewer/4fe29514fd584807ac9f2a04f6754767/2.0.05/en-US/209f5020751910148fd8fe88aa4d79d9.html)
- [SAP HANA Series Data Reference](https://help.sap.com/viewer/b2f4bdf7b83f4444bfab5564e9ff6aee/2.0.00/en-US/7795e7d4bb3547c180bbd8c97e6d1497.html)

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.

* * *

SAP HANA® is the trademark or registered trademark of SAP SE or its affiliates in Germany and in several other countries.
