---
title: "Sift investigations | Grafana Plugins documentation"
description: "Run a Sift investigation"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Sift investigations

Sift investigations can be started from various locations in Grafana. Depending on the specific Sift check, some additional inputs may be required some to look in the right places for issues. These inputs are noted in the [Sift analyses docs](/docs/grafana-cloud/alerting-and-irm/machine-learning/sift/analyses/) for each of the individual Sift checks.

> Note
>
> Sift Investigations are a free feature available to all in Grafana Cloud accounts.

Investigations can be started from:

- Grafana Explore: use the **+ Add** button in the toolbar and choose **Run investigation**. Sift will extract labels from the query and use the current Explore time range.
- Grafana dashboards: use the dropdown on a panel and choose **Run investigation**. Sift will extract labels from the query and use the current dashboard time range.
- Grafana Incident: see the [Sift in Grafana Incident](#sift-in-grafana-incident) section below.
- The command palette: you can initiate a Sift investigation directly from the [command palette](/docs/grafana/latest/search/#command-palette).

## Prerequisites

To create Sift investigations, you need the an [Editor or Admin basic role](/docs/grafana/latest/administration/roles-and-permissions/).

## Label Management

Sift uses the provided labels to identify the scope of investigation and discover issues.

> Note
>
> Currently Sift will only extract labels from PromQL queries in Explore/dashboard panels, but support for more data sources will be added in future. In the meantime you can manually add labels to the investigation using the form.

### Auto-discovering datasources

While the default datasource to be used can be configured for every Sift check, Sift can auto-discover datasources based on provided labels.

Sift queries all Prometheus, Loki and Tempo datasources configured in Grafana for the labelset provided and identifies the right datasources based on number of matching series/streams. If the provided labelset matches too many series/streams, Sift will not run the investigation because a large scope can lead to noisy results and less value.

### Label usage by Sift checks

Sift checks use different combinations of the provided labelset depending on their scope of operation. Checks like ‘Error Pattern Logs’ will use the complete labelset and analyze the resulting Loki streams, while checks like ‘Kube Crashes’ will use just ‘cluster’ and ’namespace’ (or ‘k8s.cluster.name’ and ‘k8s.namespace.name’) labels among the supplied labelset to query Prometheus for crashed pods.

### Label filtering

Since Sift uses the provided labels in Prometheus/Loki queries as described above, it is important to filter out labels that not helpful. Sift will automatically filter out the following labels: `grafana_folder`, `account_id`, `ref_id`, `alertname`, `severity`, `datasource_uid`, `filename` and `mountpoint`.

Any labels containing whitespace in the key or value field are also filtered out for the same reason.

## Viewing investigation results

Sift investigations can be viewed in the Grafana Machine Learning page. In the **Alerts &amp; IRM** category of the sidebar, click **Machine learning** then **View investigations**. Your investigations will be listed and can be filtered from the toolbar.

Click an investigation to view the results. The checks are shown in a column on the left, grouped by category:

- **Application** contains checks related to applications, including logs and http errors.
- **Infrastructure** contains checks related to infrastructure, including resource contentions and container stability.
- **Other** contains other checks, including status page outages, related alerts, and identified correlated series.

Click a check to view the detailed results. Each check has a custom-built UI designed to convey the information surfaced by the check.

## Sift in Grafana Incident

> Note
>
> `cluster` and `namespace` *are* currently required to initiate a Sift investigation from Grafana Incident.

You can use Sift investigations in Grafana Incident to get valuable suggestions while working to resolve an active incident. Currently, there are two ways you can leverage Sift within Grafana Incident:

- Run a Sift investigation within an incident: From the **Suggestions** section in the right sidebar of the incident timeline, click **Start Sift investigation**. Manually enter the `cluster` and `namespace` to start a Sift investigation specifically tailored to the incident.
- Add some context to the Incident timeline: link to a dashboard, Explore query, alert rule or OnCall alert rule, and Sift will automatically extract `cluster` and `namespace` labels and start investigations.

> Note
>
> When a Sift investigation is triggered from within an incident, the `Timerange` is automatically set to the incident start time through the time investigation is triggered.

### View and manage Sift suggestions within Incident

Within an incident, when a Sift check identifies interesting results, clickable links appear in the right sidebar under **Suggestions**. Click these links to review detailed information about the specific Sift check.

You can add important Sift suggestions directly to the main Incident timeline. Alternatively, if a Sift check result is deemed irrelevant, you can dismiss it from the suggestions.
