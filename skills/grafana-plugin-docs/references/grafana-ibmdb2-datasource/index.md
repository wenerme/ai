---
title: "IBM Db2 data source | Grafana Enterprise Plugins documentation"
description: "Guide for using IBM Db2 in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# IBM Db2 data source

The IBM Db2 data source for Grafana lets you connect to [IBM Db2](https://www.ibm.com/products/db2) relational databases, run SQL queries, and visualize the results in Grafana dashboards.

> Note
>
> The IBM Db2 data source is an Enterprise plugin. It’s available with a Grafana Cloud Pro or Advanced plan and Grafana Enterprise. For configuration instructions, refer to [Configure the IBM Db2 data source](/docs/plugins/grafana-ibmdb2-datasource/latest/configure/).

## Supported features

The IBM Db2 data source supports the following features:

Expand table

| Feature             | Supported |
|---------------------|-----------|
| Time series queries | Yes       |
| Table queries       | Yes       |
| Alerting            | Yes       |
| Annotations         | Yes       |
| Template variables  | Yes       |
| Logs                | No        |
| Traces              | No        |

## Requirements

The IBM Db2 data source has the following requirements:

- Grafana version 11.6.11 or later. Later Grafana releases have their own minimum patch versions. For the exact compatibility list, refer to the [plugin catalog page](/grafana/plugins/grafana-ibmdb2-datasource/).
- A [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated self-managed Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/).
- An IBM Db2 for LUW (Linux, Unix, and Windows) database configured for external access.
- Network connectivity from Grafana to the Db2 server host and port.
- A supported Grafana host platform. The plugin backend runs only on Linux for AMD64 (x86\_64) and ARM64 (aarch64) architectures.

## Known limitations

The IBM Db2 data source has the following limitations:

- Only **IBM Db2 for LUW (Linux, Unix, and Windows)** is supported. IBM Db2 for z/OS (mainframe) and IBM Db2 for IBM i (AS/400) are not supported due to incompatible authentication models and wire protocol variants.
- For AMD64 architecture, the plugin requires `glibc` 2.35 or later. RHEL, Rocky Linux, and AlmaLinux 8 (`glibc` 2.28) and 9 (`glibc` 2.34) are not currently supported on AMD64. This constraint doesn’t apply to ARM64.
- When **SSL Connection** is enabled, the plugin validates the Db2 server certificate against the default trust store of the Java runtime. Certificates issued by a private or internal certificate authority (CA) aren’t currently supported through the data source configuration. For workarounds, refer to [Troubleshooting](/docs/plugins/grafana-ibmdb2-datasource/latest/troubleshooting/#ssl-certificate-validation-failed).

## Get started

The following documents help you get started:

- [Configure the IBM Db2 data source](/docs/plugins/grafana-ibmdb2-datasource/latest/configure/)
- [IBM Db2 query editor](/docs/plugins/grafana-ibmdb2-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-ibmdb2-datasource/latest/template-variables/)
- [Annotations](/docs/plugins/grafana-ibmdb2-datasource/latest/annotations/)
- [Alerting](/docs/plugins/grafana-ibmdb2-datasource/latest/alerting/)
- [Troubleshooting](/docs/plugins/grafana-ibmdb2-datasource/latest/troubleshooting/)

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> On Grafana Cloud, the IBM Db2 plugin is managed by Grafana and updates automatically. On self-managed Grafana, you update Enterprise plugins manually from **Administration** &gt; **Plugins and data** &gt; **Plugins**.

## Related resources

- [Official IBM Db2 documentation](https://www.ibm.com/docs/en/db2)
- [Grafana community forum](https://community.grafana.com/)
