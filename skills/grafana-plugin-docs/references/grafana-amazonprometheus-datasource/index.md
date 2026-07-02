---
title: "Amazon Managed Service for Prometheus data source | Grafana Plugins documentation"
description: "Use the Amazon Managed Service for Prometheus data source to query and visualize Prometheus-compatible metrics from AWS in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Amazon Managed Service for Prometheus data source

The Amazon Managed Service for Prometheus data source plugin lets you query and visualize metrics from [Amazon Managed Service for Prometheus](https://aws.amazon.com/prometheus/) in Grafana. Amazon Managed Service for Prometheus (AMP) is a Prometheus-compatible, fully managed service that monitors and provides alerts on containerized applications and infrastructure at scale.

This plugin includes all the features of the core Grafana Prometheus data source, with AWS-specific Signature Version 4 (SigV4) authentication built into the configuration page.

## Supported features

The following table lists the features that the Amazon Managed Service for Prometheus data source supports.

Expand table

| Feature     | Supported |
|-------------|-----------|
| Metrics     | Yes       |
| Logs        | No        |
| Traces      | No        |
| Alerting    | Yes       |
| Annotations | Yes       |
| Exemplars   | Yes       |

## Requirements

Before you use the Amazon Managed Service for Prometheus data source, ensure you have the following:

- A supported version of Grafana. This plugin requires Grafana `>=11.6.11 <12`, `>=12.0.10 <12.1`, `>=12.1.7 <12.2`, or `>=12.2.5`. If you run Grafana 11.4.x or earlier, use plugin version 1.0.5.
- An Amazon Managed Service for Prometheus workspace and its query endpoint URL.
- AWS credentials or an IAM role with permission to query the workspace.

## Get started

The following topics help you get started with the data source:

- [Install the Amazon Managed Service for Prometheus plugin](/docs/plugins/grafana-amazonprometheus-datasource/latest/install/)
- [Configure the Amazon Managed Service for Prometheus data source](/docs/plugins/grafana-amazonprometheus-datasource/latest/configure/)
- [Amazon Managed Service for Prometheus query editor](/docs/plugins/grafana-amazonprometheus-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-amazonprometheus-datasource/latest/template-variables/)
- [Annotations](/docs/plugins/grafana-amazonprometheus-datasource/latest/annotations/)
- [Alerting](/docs/plugins/grafana-amazonprometheus-datasource/latest/alerting/)
- [Troubleshooting](/docs/plugins/grafana-amazonprometheus-datasource/latest/troubleshooting/)

To install the plugin and add the data source:

1. [Install the plugin](/docs/plugins/grafana-amazonprometheus-datasource/latest/install/).
2. [Add a new data source in the UI](/docs/grafana/latest/datasources/#add-a-data-source) or [provision one](/docs/grafana/latest/administration/provisioning/#data-sources).
3. [Configure the data source](/docs/plugins/grafana-amazonprometheus-datasource/latest/configure/).
4. Start querying your metrics.

## Migrate from core Prometheus to Amazon Managed Service for Prometheus

SigV4 authentication is deprecated in the core Prometheus data source. If you use the core Prometheus data source with SigV4 authentication, migrate to the Amazon Managed Service for Prometheus data source.

In Grafana 13, this migration is automatic. Data sources that use SigV4 authentication are migrated to the Amazon Managed Service for Prometheus plugin on startup, and your dashboards, alerts, and queries continue to work without changes. For migration steps, how to check migration status, and rollback instructions, refer to [Migrate from Prometheus SigV4 to Amazon Managed Service for Prometheus](/docs/grafana-cloud/connect-externally-hosted/data-sources/prometheus/configure/aws-authentication/).

### Update dashboards and alerts

If you add a new Amazon Managed Service for Prometheus data source instead of relying on the automatic migration, update your existing dashboards and alert rules to use the new data source:

1. Get the `UID` of your existing Prometheus data source that uses SigV4.
2. Get the `UID` of your new Amazon Managed Service for Prometheus data source.
3. Update dashboards to use the new data source `UID`.
4. Update alert rules. Export the provisioning files and update the data source in the model, or create new alert rules.
5. Recreate any correlations.
6. Recreate any recorded queries.

## Pre-built dashboards

The plugin includes the following pre-built dashboards that you can import to monitor Prometheus and Grafana itself:

- **Prometheus Stats**
- **Prometheus 2.0 Stats**
- **Grafana Stats**

To import a pre-built dashboard:

1. Click **Connections** in the left-side menu.
2. Under **Connections**, click **Data sources**.
3. Select your Amazon Managed Service for Prometheus data source.
4. Click the **Dashboards** tab.
5. Click **Import** next to the dashboard you want to use.

## Additional features

After you configure the data source, you can:

- Use [Explore](/docs/grafana/latest/explore/) to query data without building a dashboard.
- Add [transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- Set up [alerting](/docs/grafana/latest/alerting/) rules.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.

## Related resources

- [Amazon Managed Service for Prometheus documentation](https://docs.aws.amazon.com/prometheus/)
- [Grafana community forum](https://community.grafana.com/)
- [Grafana Amazon Prometheus data source GitHub repository](https://github.com/grafana/grafana-amazonprometheus-datasource)
