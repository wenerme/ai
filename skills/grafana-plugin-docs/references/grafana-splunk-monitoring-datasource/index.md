---
title: "Splunk Infrastructure Monitoring data source | Grafana Enterprise Plugins documentation"
description: "Learn how to configure and use the Splunk Infrastructure Monitoring data source plugin for Grafana to query and visualize your Splunk metrics."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Splunk Infrastructure Monitoring data source

The Splunk Infrastructure Monitoring data source plugin lets you query and visualize Splunk Infrastructure Monitoring metrics using SignalFlow queries. You can also use template variables for dynamic dashboards and create annotations from alerts and events.

> Note
>
> The Splunk Infrastructure Monitoring data source is an Enterprise plugin. It’s available with a Grafana Cloud Pro or Advanced plan and Grafana Enterprise. Some Pro plans need the Enterprise Plugins add-on. For installation instructions, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).

## Supported features

The following table lists the features that the Splunk Infrastructure Monitoring data source supports:

Expand table

| Feature     | Supported |
|-------------|-----------|
| Metrics     | Yes       |
| Logs        | No        |
| Traces      | No        |
| Alerting    | Yes       |
| Annotations | Yes       |

## Supported Splunk environments

The Splunk Infrastructure Monitoring data source connects to Splunk Observability Cloud, the cloud-hosted observability platform formerly known as SignalFx.

Splunk Observability Cloud runs in self-contained regional deployments called realms. The data source supports all realms, including the following:

- US: `us0`, `us1`, `us2`
- Europe: `eu0`, `eu1`, `eu2`
- Asia Pacific: `au0`, `jp0`, `sg0`

To find your realm, open the navigation menu in Splunk Observability Cloud, select **Settings**, and then select your username. The realm name appears in the **Organizations** section. For more information, refer to [View your realm, API endpoints, and organization](https://help.splunk.com/en/splunk-observability-cloud/administer/org-reference-info/view-your-realm-api-endpoints-and-organization) in the Splunk documentation.

## Get started

The following sections help you get started with the Splunk Infrastructure Monitoring data source:

- [Configure the data source](#configure-the-data-source)
- [Query the data source](#query-the-data-source)
- [Use template variables](#use-template-variables)
- [Troubleshoot](/docs/plugins/grafana-splunk-monitoring-datasource/latest/troubleshooting/)

## Additional features

After you configure the data source, you can:

- Use [Explore](/docs/grafana/latest/explore/) to run SignalFlow queries without building a dashboard.
- Add [annotations](#create-annotations) to overlay Splunk alerts and events on your graphs.
- Configure and use [template variables](/docs/grafana/latest/dashboards/variables/) for dynamic dashboards.
- Add [transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- Set up [alerting](#configure-grafana-alerting) to monitor your Splunk metrics.

## Before you begin

To configure the Splunk Infrastructure Monitoring data source, you need the following:

- Grafana version 11.6.7 or later.
- The Grafana organization administrator role to add a data source.
- A [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated self-managed Grafana Enterprise license](/docs/grafana/latest/administration/enterprise-licensing/).
- A Splunk Observability Cloud account, formerly SignalFx.
- An access token generated from your Splunk Observability Cloud account. To learn more about access token types, refer to [Authentication tokens](https://help.splunk.com/en/splunk-observability-cloud/administer/authentication-and-security/authentication-tokens) in the Splunk documentation.
- Your realm name. Refer to [Supported Splunk environments](#supported-splunk-environments) for how to find it.

## Add the Splunk Infrastructure Monitoring data source

For general information on adding a data source, refer to [Add a data source](/docs/grafana/latest/administration/data-source-management/#add-a-data-source).

Complete the following steps to add a new Splunk Infrastructure Monitoring data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `Splunk Infrastructure Monitoring` in the search bar.
4. Select the Splunk Infrastructure Monitoring data source.
5. Click **Add new data source** in the upper right.

Grafana takes you to the **Settings** tab, where you set up your Splunk Infrastructure Monitoring configuration.

## Configure the data source

The following table describes the configuration options available in the **Settings** tab:

Expand table

| Field            | Description                                                                                                                                                                                                                               |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Access Token** | (Required) The access token generated by your Splunk Observability Cloud account.                                                                                                                                                         |
| **Realm Name**   | The realm is a self-contained deployment that hosts your organization. Example values include `us0`, `us1`, `us2`, `eu0`, `eu1`, `eu2`, `au0`, `jp0`, and `sg0`. Enter your realm so the data source can build the correct API endpoints. |

### Custom URLs

Use this section only if you connect through custom domains, such as the `observability.splunkcloud.com` endpoints. Leave these fields blank to use the default endpoints for your realm.

Expand table

| Field                    | Description                                                                                                  |
|--------------------------|--------------------------------------------------------------------------------------------------------------|
| **Metrics MetaData URL** | Optional custom URL for the Metrics Metadata API. Default format: `https://api.{REALM}.signalfx.com`.        |
| **SignalFlow URL**       | Optional custom URL for the SignalFlow streaming API. Default format: `https://stream.{REALM}.signalfx.com`. |

> Note
>
> Splunk Observability Cloud also provides endpoints on the `observability.splunkcloud.com` domain, for example `https://api.{REALM}.observability.splunkcloud.com` and `https://stream.{REALM}.observability.splunkcloud.com`. The legacy `signalfx.com` endpoints remain supported. To use the newer domain, enter the full URLs in the **Custom URLs** fields. For more information, refer to [Splunk Observability Cloud domain change](https://help.splunk.com/en/splunk-observability-cloud/reference/splunk-observability-cloud-domain-transition-guide) in the Splunk documentation.

### Secure Socks Proxy

If you have a secure socks proxy configured, you can enable proxying the data source connection through the secure socks proxy to a different network.

For more details, refer to [Configure a data source connection proxy](/docs/grafana/latest/setup-grafana/configure-grafana/proxy/).

### Provision the data source

You can configure data sources using configuration files with the Grafana provisioning system. For more information, refer to [Provision the data source](/docs/grafana/latest/administration/provisioning/#data-sources).

The following example provisions a Splunk Infrastructure Monitoring data source:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Splunk Infrastructure Monitoring
    type: grafana-splunk-monitoring-datasource
    access: proxy
    basicAuth: false
    editable: true
    enabled: true
    jsonData:
      realmName: us1
      # Optional. Set these only when you use custom domains.
      # url_metrics_metadata: https://api.us1.observability.splunkcloud.com
      # url_signalflow: https://stream.us1.observability.splunkcloud.com
      # enableSecureSocksProxy: false
    secureJsonData:
      accessToken: <your-access-token>
```

## Import a dashboard

The Splunk Infrastructure Monitoring data source includes a pre-built dashboard that you can import to get started quickly.

Expand table

| Dashboard            | Description                                                                                                                                           |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| SignalFX Sample Data | A sample dashboard demonstrating various visualization types including stat panels, time series, bar gauges, tables, and heatmaps using demo metrics. |

To import the pre-built dashboard:

1. Go to the data source’s configuration page.
2. Select the **Dashboards** tab.
3. Click **Import** next to the dashboard you want to import.

## Query the data source

The query editor is a code editor with Python syntax highlighting that accepts a SignalFlow program or query. To learn more about SignalFlow, refer to [SignalFlow analytics](https://help.splunk.com/en/splunk-observability-cloud/signalflow-analytics/signalflow-analytics) in the Splunk documentation.

### SignalFlow query examples

The following examples demonstrate common SignalFlow query patterns:

**Basic metric query:**

signalflow [Copy code to clipboard] Copy

```signalflow
data('cpu.utilization').publish()
```

**Query with rollup and aggregation:**

signalflow [Copy code to clipboard] Copy

```signalflow
data('demo.trans.count', rollup='rate').sum().publish(label='Total Transactions')
```

**Query with filter:**

signalflow [Copy code to clipboard] Copy

```signalflow
data('cpu.utilization', filter=filter('host', 'server1')).publish()
```

**Query with time window aggregation:**

signalflow [Copy code to clipboard] Copy

```signalflow
data('demo.trans.latency').mean(over='5m').publish()
```

### Use multiple queries

You can write multiple queries in a single panel and perform calculations between them. Assign each query to a variable and reference it in subsequent calculations:

signalflow [Copy code to clipboard] Copy

```signalflow
A = data('demo.trans.latency').sum(by=['demo_customer']).publish(label='A', enable=False)
B = data('demo.trans.count', rollup='rate').sum(by=['demo_customer']).publish(label='B', enable=False)
C = (A / B).publish(label='Latency per Transaction')
```

In this example, queries A and B are calculated but hidden (`enable=False`), and only the result C is displayed.

### Use SignalFlow labels

SignalFlow labels are applied as metadata to the results. For example, `publish(label = 'foo')` adds a `label="foo"` to the metadata.

### Use the Ad hoc filters variable

The Splunk Infrastructure Monitoring data source supports the **Ad hoc filters** variable, which lets you add filters to your SignalFlow queries dynamically without modifying the query itself.

When you add the **Ad hoc filters** variable to a dashboard, the plugin automatically appends `filter()` clauses to your SignalFlow queries. For example, a filter for `region = us-west-1` adds `filter('region','us-west-1')` to your query.

To use the **Ad hoc filters** variable:

1. Add an **Ad hoc filters** variable to your dashboard.
2. Select your Splunk Infrastructure Monitoring data source.
3. Use the filter controls to add key-value pairs.

The plugin applies the filters to all panels that use the Splunk Infrastructure Monitoring data source on that dashboard.

## Use template variables

To add a new Splunk Infrastructure Monitoring query variable, refer to [Add a query variable](/docs/grafana/latest/dashboards/variables/add-template-variables/#add-a-query-variable). Use your Splunk Infrastructure Monitoring data source and select one of the following query types:

### Metrics

Returns a list of available metrics. To learn more about metrics, refer to [metric](https://docs.splunk.com/Splexicon:Metric).

### Tags

Returns a list of available tags. To learn more about tags, refer to [tag](https://docs.splunk.com/Splexicon:Tag).

### Dimensions

Returns dimension keys or values. To learn more about dimensions, refer to [dimension](https://docs.splunk.com/Splexicon:Dimension).

When you select **Dimensions**, you can optionally configure the following fields:

Expand table

| Field                | Description                                                                                            |
|----------------------|--------------------------------------------------------------------------------------------------------|
| **Dimensions Query** | Optional search criteria for filtering dimensions. Use syntax like `region:us1 AND hostname:france-*`. |
| **Dimension Name**   | Optional. Select a dimension key from the drop-down to return only values for that specific dimension. |

After you create a variable, you can use it in your Splunk Infrastructure Monitoring queries with [variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/). For more information about variables, refer to [Template variables](/docs/grafana/latest/dashboards/variables/).

## Create annotations

Annotations let you overlay event data on your graphs. The Splunk Infrastructure Monitoring data source supports annotations using SignalFlow alerts or events queries.

To add an annotation:

1. Open a dashboard and click **Settings** (gear icon).
2. Select **Annotations** from the settings menu.
3. Click **Add annotation query**.
4. Select your Splunk Infrastructure Monitoring data source.
5. Enter a SignalFlow query for alerts or events.
6. Click **Save dashboard**.

### Query alerts

Use the `alerts()` function to display detector alerts as annotations. Alerts are triggered when conditions defined in your Splunk detectors are met.

Example query for alerts from a specific detector:

signalflow [Copy code to clipboard] Copy

```signalflow
alerts(detector_name='Deployment').publish()
```

The following fields are returned for alert annotations:

Expand table

| Field      | Description                                   |
|------------|-----------------------------------------------|
| Time       | Timestamp of the alert                        |
| Detector   | Name of the detector that triggered the alert |
| Label      | Detection label                               |
| State      | Anomaly state of the alert                    |
| Severity   | Alert severity level                          |
| Name       | Display name of the alert                     |
| Metric     | The originating metric                        |
| Priority   | Alert priority                                |
| Muted      | Whether the alert is muted                    |
| Created    | When the alert was created                    |
| Message    | Notification message                          |
| Sent       | Whether the notification was sent             |
| Recipients | Notification recipients                       |

### Query events

Use the `events()` function to display custom events as annotations. Custom events are user-defined events sent to Splunk Infrastructure Monitoring.

Example query for events by type:

signalflow [Copy code to clipboard] Copy

```signalflow
events(eventType='simulated').publish()
```

The following fields are returned for event annotations:

Expand table

| Field    | Description            |
|----------|------------------------|
| Time     | Timestamp of the event |
| Category | Event category         |
| Type     | Event type             |

## Configure Grafana Alerting

This data source supports Grafana Alerting. You can create alert rules based on SignalFlow queries to monitor your Splunk metrics and receive notifications when conditions are met.

To create an alert rule:

1. Navigate to **Alerting** &gt; **Alert rules** in Grafana.
2. Click **New alert rule**.
3. Select your Splunk Infrastructure Monitoring data source.
4. Enter a SignalFlow query to define the data you want to monitor.
5. Configure the alert condition, evaluation interval, and notification settings.

For more information, refer to [Grafana Alerting](/docs/grafana/latest/alerting/).

## Troubleshoot

For solutions to common issues, refer to [Troubleshoot Splunk Infrastructure Monitoring data source issues](/docs/plugins/grafana-splunk-monitoring-datasource/latest/troubleshooting/).

## Plugin updates

Always keep your plugin version up to date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> On Grafana Cloud, the Splunk Infrastructure Monitoring plugin is managed by Grafana and updates automatically. On self-managed Grafana, you update Enterprise plugins manually from **Plugins and data** &gt; **Plugins**.
