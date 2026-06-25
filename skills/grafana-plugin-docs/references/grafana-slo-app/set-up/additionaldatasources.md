---
title: "Configure an additional Grafana Mimir Data Source | Grafana Plugins documentation"
description: "Configure an additional Grafana Mimir data source for Grafana SLO"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure an additional Grafana Mimir data source

> Note
>
> **Disambiguation**: Refer to [Create SLOs &gt; Supported SLO data sources](/docs/grafana-cloud/alerting-and-irm/slo/create/#supported-slo-data-sources) for details on using distinct data sources in your SLI queries.

You can create Grafana SLOs using additional Grafana Mimir data sources.

To use a Grafana Mimir data source, verify that the Cloud Access policy has the appropriate scopes and that the Ruler API on the Grafana Mimir data source is enabled.

## Before you begin

- Verify that you have Query permissions to the Grafana Mimir data source. You can verify for permissions in the [data source configuration](/docs/grafana/latest/administration/data-source-management/#data-source-permissions).
- Make sure you have a [Grafana Cloud Access Policy](/docs/grafana-cloud/account-management/authentication-and-permissions/access-policies/) with the following scopes: `metrics:read`, `rules:read` and `rules:write` over the appropriate realms.
- To verify that the [Ruler API](/docs/mimir/latest/references/configuration-parameters/#ruler) is enabled, ensure that the `-ruler.enable-api` CLI flag is enabled. Note that Grafana expects that both the Query API and Ruler API are under the same URL to ensure that data source-managed alerts can function properly. You cannot provide a separate URL for the Ruler API.

> Note
>
> The Grafana Mimir that comes with Grafana Cloud accounts are already configured appropriately to support the Ruler API configuration requirements.

## Add new Grafana Mimir Data Source for your SLO

To add a Grafana Mimir data source to use with your SLO, you first need to [add it as a data source in Grafana](/docs/grafana/latest/administration/data-source-management/#add-a-data-source).

1. In the Grafana Cloud sidebar, click **Connections** and then **Data sources**.
2. Click **Add data source**.
3. In the list of data sources, click **Prometheus**. The Prometheus data source configuration page opens.
4. Enter a name for the data source.
5. Enter the Prometheus server URL for the Grafana Mimir data source you want to use.
6. Enter the authentication details from the Grafana Mimir data source into your new data source. If using a Cloud Access Policy, please follow the instructions [here](/docs/grafana-cloud/security-and-account-management/authentication-and-permissions/access-policies/using-an-access-policy-token/) for how to authorize Mimir to use a particular access policy.
7. In the Performance section of your new data source, click on the Prometheus type dropdown and select **Mimir**.
8. Click **Save &amp; test**. The message “Successfully queried the Prometheus API” displays.

You can now select the new Grafana Mimir data source from the Select data source section of the Create SLO wizard.
