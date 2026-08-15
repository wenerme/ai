---
title: "Configure additional data sources for SLOs | Grafana Plugins documentation"
description: "Configure additional data sources for Grafana SLO"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure additional data sources for SLOs

You can create Grafana SLOs against data sources other than the default Grafana Cloud Mimir data source.

An SLO uses a **source** data source, which the SLI query is executed against, and a **target** data source, to remote write the recorded series to. The two can be the same data source or different ones. Refer to [select the source and target data sources](/docs/grafana-cloud/alerting-and-irm/slo/create/#select-the-source-and-target-data-sources) for more information.

## Supported data sources

You can use the following as the **source** data source:

- Mimir (Grafana Cloud Prometheus Metrics)
- Prometheus-compatible data source

The **target** data source must be a Mimir or other Prometheus-compatible data source that accepts recording rules. Refer to [configure a target data source](#configure-a-target-data-source).

When creating SLOs on Splunk, AppDynamics or Graphite data sources, the target data source is not selectable and is always the default provisioned Grafana Cloud Mimir.

> Note
>
> The Grafana Mimir that comes with Grafana Cloud accounts is already configured appropriately and can be selected as both a source data source and a target data source.

## Before you begin

- Verify that you have Query permissions to the data source. You can verify permissions in the [data source configuration](/docs/grafana/latest/administration/data-source-management/#data-source-permissions).
- If the data source is backed by Grafana Cloud, make sure you have a [Grafana Cloud Access Policy](/docs/grafana-cloud/security-and-account-management/authentication-and-permissions/access-policies/) with the scopes it needs over the appropriate realms:

  - A **source** data source needs `metrics:read`.
  - A **target** data source needs both `metrics:read` and `metrics:write`.

## Add a data source for your SLO

To add a data source to use with your SLO, you first need to [add it as a data source in Grafana](/docs/grafana/latest/administration/data-source-management/#add-a-data-source).

1. In the Grafana Cloud sidebar, click **Connections** and then **Data sources**.
2. Click **Add data source**.
3. In the list of data sources, click the data source type you want to add. For a Grafana Mimir data source, click **Prometheus**. The data source configuration page opens.
4. Enter a name for the data source.
5. Enter the server URL for the data source you want to use.
6. Enter the authentication details for the data source. If you use a Cloud Access Policy, refer to [how to authorize a service using an access policy token](/docs/grafana-cloud/security-and-account-management/authentication-and-permissions/access-policies/using-an-access-policy-token/).
7. Click **Save &amp; test**. The message “Successfully queried the Prometheus API” displays.

You can now select the new data source as the source data source in the SLO wizard.

## Configure a target data source

The target data source stores the recording rules that Grafana generates for the SLO. Grafana evaluates those rules and writes the results to the target.

The target is also read from. Recording rules for the longer SLI time windows are calculated from the shorter recorded ones, and the SLO burn-rate alert rules and dashboards query the recorded SLO metrics.

To be used as a target, a data source must:

- Be a Mimir or other Prometheus-compatible data source.
- Have [**Allow as recording rules target**](/docs/grafana/latest/datasources/prometheus/configure/#alerting) enabled, in **Advanced settings** &gt; **Alerting**.
- Use a Grafana Cloud Access Policy with both the `metrics:read` and `metrics:write` scopes.

## Configure data source-managed recording rules

Grafana evaluates SLO recording rules for you. A small number of legacy Grafana Cloud stacks instead use data source-managed recording rules. On these stacks the SLI query and the recording rules use a single data source, and the Create SLO wizard shows one **Select data source** picker instead of two.

These stacks have extra requirements. The data source must:

- Be a Grafana Mimir data source. In **Advanced settings** &gt; **Performance**, set **Prometheus type** to **Mimir**.
- Have the [Ruler API](/docs/mimir/latest/references/configuration-parameters/#ruler) enabled, using the `-ruler.enable-api` CLI flag. Grafana expects the Query API and the Ruler API to be under the same URL. You can’t provide a separate URL for the Ruler API.
- Use a Grafana Cloud Access Policy with the `metrics:read`, `rules:read`, and `rules:write` scopes over the appropriate realms.

> Note
>
> The Grafana Mimir data source that comes with Grafana Cloud accounts is already configured to meet these requirements.

Grafana Cloud customers who want to switch to Grafana-managed recording rules for SLO should submit a support ticket through Grafana Cloud to request the change or coordinate with their Grafana account team as needed. Note that this is a stack-wide plugin configuration.
