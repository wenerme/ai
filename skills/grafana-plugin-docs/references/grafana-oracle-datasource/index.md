---
title: "Grafana Oracle data source | Grafana Enterprise Plugins documentation"
description: "Introduction to the Oracle data source for Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Oracle data source

Oracle is a multi-model database management system. The Oracle data source plugin allows you to visualize data from Oracle in Grafana.

To get started with the Oracle data source, refer to the following topics:

- [Configure the Oracle data source](/docs/plugins/grafana-oracle-datasource/latest/configure-oracle-data-source/)
- [Oracle query editor for Grafana](/docs/plugins/grafana-oracle-datasource/latest/oracle-query-editor/)
- [Oracle templates and variables](/docs/plugins/grafana-oracle-datasource/latest/oracle-templates-and-variables/)
- [Troubleshoot the Oracle data source](/docs/plugins/grafana-oracle-datasource/latest/troubleshoot-oracle-data-source/)

## Requirements

The Oracle data source plugin has the following requirements:

- An Oracle instance with at least one user.
- Any free or paid [Grafana Cloud](/pricing/) plan or an [activated on-prem Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/). Contracted Cloud customers should refer to their agreement.

## Known limitations

The following are known limitations:

- The Oracle plugin is not supported in ARM64 architecture (for example, M1/M2 Macbook)
- TNSNames and Kerberos are not currently supported in **Grafana Cloud**

## Get the most out of the data source

After installing and configuring the Oracle data source you can:

- Add [annotations](/docs/grafana/latest/dashboards/annotations/)
- Configure and use [templates and variables](/docs/grafana/latest/variables/)
- Add [transformations](/docs/grafana/latest/panels/transformations/)
- Set up [alerting](/docs/grafana/latest/alerting/)
