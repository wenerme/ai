---
title: "IBM Db2 data source plugin | Grafana Enterprise Plugins documentation"
description: "Guide for using IBM Db2 in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# IBM Db2 data source plugin

[IBM Db2](https://www.ibm.com/products/db2) is a relational database management system (RDBMS). The IBM Db2 data source plugin from Grafana allows you to connect to IBM Db2 databases and visualize your data in Grafana.

## Supported features

Expand table

| Feature             | Supported |
|---------------------|-----------|
| Time series queries | Yes       |
| Table queries       | Yes       |
| Alerting            | Yes       |
| Annotations         | Yes       |
| Template variables  | Yes       |

## Supported environments

This data source plugin is currently available only for Linux on AMD64 (x86\_64) and ARM64 (aarch64) architectures.

## Known limitations

Following are current known limitations:

- Only **IBM Db2 for LUW (Linux, Unix, and Windows)** is supported. IBM Db2 for z/OS (mainframe) and IBM Db2 for IBM i (AS/400) are not supported due to incompatible authentication models and wire protocol variants.
- For AMD64 architecture, the plugin requires **glibc 2.35 or later**. RHEL, Rocky Linux, and AlmaLinux 8 (glibc 2.28) and 9 (glibc 2.34) are not currently supported on AMD64. (This constraint does not apply to ARM64.)

## Before you begin

Before configuring the data source, ensure you have:

- **An IBM Db2 database** running on Linux/Windows and configured for external access
- **Grafana version** 11.6.11 or higher

## Get started

The following documents help you get started:

- [Configure the IBM Db2 data source](/docs/plugins/grafana-ibmdb2-datasource/latest/configure/)
- [IBM Db2 query editor](/docs/plugins/grafana-ibmdb2-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-ibmdb2-datasource/latest/template-variables/)
- [Troubleshooting](/docs/plugins/grafana-ibmdb2-datasource/latest/troubleshooting/)

## Related resources

- [Official IBM Db2 documentation](https://www.ibm.com/docs/en/db2)
- [Grafana community forum](https://community.grafana.com/)

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.
