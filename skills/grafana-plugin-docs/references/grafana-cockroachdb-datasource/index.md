---
title: "CockroachDB data source | Grafana Enterprise Plugins documentation"
description: "The CockroachDB data source plugin lets you query and visualize CockroachDB data in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# CockroachDB data source

The CockroachDB data source plugin lets you query and visualize data from [CockroachDB](https://www.cockroachlabs.com/), a distributed SQL database designed for high availability and horizontal scalability. Use this data source to monitor cluster health, track query performance, analyze application metrics stored in CockroachDB, and build dashboards that combine CockroachDB data with other sources. The data source supports both the visual query builder and a raw SQL editor with autocomplete, along with macros for time-range filtering.

> Note
>
> The CockroachDB data source is an Enterprise plugin. It’s available with a Grafana Cloud Pro or Advanced plan and Grafana Enterprise. For installation instructions, refer to [Install Grafana Enterprise plugins](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).

## Supported features

Expand table

| Feature         | Supported |
|-----------------|-----------|
| **Metrics**     | Yes       |
| **Logs**        | Yes       |
| **Alerting**    | Yes       |
| **Annotations** | Yes       |

## Requirements

The CockroachDB data source has the following requirements:

- A CockroachDB instance.
- A [Grafana Cloud Pro or Advanced](http://grafana-com-website.grafana-com.svc.cluster.local.:80/pricing/) plan or an [activated on-prem Grafana Enterprise license](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/grafana/latest/enterprise/license/activate-license/). Contracted Cloud customers should refer to their agreement.

An Enterprise CockroachDB license is required for Kerberos authentication.

## Get started

The following documents help you set up and use the CockroachDB data source:

- [Configure the CockroachDB data source](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-cockroachdb-datasource/latest/configure/)
- [CockroachDB query editor](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-cockroachdb-datasource/latest/query-editor/)
- [Template variables](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-cockroachdb-datasource/latest/template-variables/)
- [Annotations](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-cockroachdb-datasource/latest/annotations/)
- [Alerting](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-cockroachdb-datasource/latest/alerting/)
- [Troubleshooting](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-cockroachdb-datasource/latest/troubleshooting/)

## Additional features

After configuring the data source, you can:

- Use [Explore](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/grafana/latest/explore/) to query data without building a dashboard.
- Add [Transformations](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- Set up [Alerting](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/grafana/latest/alerting/) rules.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.
