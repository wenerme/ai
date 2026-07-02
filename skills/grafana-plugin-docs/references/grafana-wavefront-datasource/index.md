---
title: "Wavefront data source | Grafana Enterprise Plugins documentation"
description: "Query and visualize VMware Aria Operations for Applications (Wavefront) metrics in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Wavefront data source

The Wavefront data source lets you query and visualize metrics from VMware Aria Operations for Applications (formerly Wavefront) alongside any other data source in Grafana. Use it to track system health, correlate metrics with events, and build mixed data source dashboards.

> Note
>
> The Wavefront data source is an Enterprise plugin. It’s available with a Grafana Cloud Pro or Advanced plan and Grafana Enterprise. For installation instructions, refer to [Plugin management](/docs/grafana/latest/administration/plugin-management/).

## Supported features

Expand table

| Feature            | Supported                                                                                                                               |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| Metrics            | Yes                                                                                                                                     |
| Logs               | No                                                                                                                                      |
| Traces             | No                                                                                                                                      |
| Alerting           | Yes (Grafana-managed). Refer to [Alerting with the Wavefront data source](/docs/plugins/grafana-wavefront-datasource/latest/alerting/). |
| Annotations        | Yes (via Wavefront events)                                                                                                              |
| Template variables | Yes                                                                                                                                     |
| Ad hoc filters     | Yes                                                                                                                                     |

## Requirements

Before using the Wavefront data source, make sure you have:

- A [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated on-prem Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/).
- Grafana v11.6.7 or later.
- A Wavefront tenant URL, for example `https://myenvironment.wavefront.com`.
- A Wavefront API token from a user account or a service account with permission to read metrics and events.

## Get started

The following documents help you get started with the Wavefront data source:

- [Configure the Wavefront data source](/docs/plugins/grafana-wavefront-datasource/latest/configure/)
- [Wavefront query editor](/docs/plugins/grafana-wavefront-datasource/latest/query-editor/)
- [Wavefront template variables](/docs/plugins/grafana-wavefront-datasource/latest/template-variables/)
- [Alerting with the Wavefront data source](/docs/plugins/grafana-wavefront-datasource/latest/alerting/)
- [Wavefront annotations](/docs/plugins/grafana-wavefront-datasource/latest/annotations/)
- [Troubleshoot the Wavefront data source](/docs/plugins/grafana-wavefront-datasource/latest/troubleshooting/)

## Additional features

After you configure the data source, you can:

- Use [Explore](/docs/grafana/latest/explore/) to query Wavefront data without building a dashboard.
- Add [transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to reshape query results.
- Create [Grafana-managed alert rules](/docs/plugins/grafana-wavefront-datasource/latest/alerting/) from any Wavefront query.
- Use Wavefront events as [annotations](/docs/plugins/grafana-wavefront-datasource/latest/annotations/) on dashboard panels.

## Pre-built dashboards

The plugin ships with pre-built dashboards you can import from the Wavefront data source’s **Dashboards** tab:

- **Kubernetes Containers** - Container-level CPU, memory, and throughput metrics.
- **Kubernetes Nodes** - Node capacity and utilization overview.
- **Kubernetes Pods** - Pod health, restarts, and resource usage.
- **Kubernetes Summary** - Cluster-wide summary of Kubernetes workloads.
- **Wavefront Usage: Health** - Tenant health and ingestion health signals.
- **Wavefront Usage: Ingestion** - Points-per-second ingestion and rate-limit telemetry.

To import a dashboard, go to **Connections** &gt; **Data sources**, select your Wavefront data source, open the **Dashboards** tab, and click **Import** next to the dashboard you want.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.

## Related resources

- [VMware Aria Operations for Applications documentation](https://docs.vmware.com/en/VMware-Aria-Operations-for-Applications/index.html)
- [Grafana community forum](https://community.grafana.com/)
- [Grafana plugin catalog entry](/grafana/plugins/grafana-wavefront-datasource/)
