---
title: "Get started with Datadog on Grafana Cloud | Grafana Enterprise Plugins documentation"
description: "Connect Datadog to Grafana Cloud and build your first dashboard in minutes."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Get started with Datadog on Grafana Cloud

This guide walks you through connecting Datadog to Grafana Cloud and visualizing your first query. The entire process takes under 10 minutes. The same steps apply to a self-managed Grafana Enterprise instance after you install the plugin.

## Prerequisites

Before you begin, ensure you have:

- A [Grafana Cloud Pro or Advanced](/pricing/) plan, or a self-managed Grafana Enterprise instance with an activated license.
- The **Admin** role in Grafana, which is required to add a data source.
- A Datadog API key and application key with permission to run the queries you need. To create them, refer to [Get an API key and application key from Datadog](/docs/plugins/grafana-datadog-datasource/latest/#get-an-api-key-and-application-key-from-datadog).
- Your Datadog region, such as **US1 / Default** or **EU**. The region determines the API endpoint that the data source connects to.

## Step 1: Install the plugin

1. Verify the Datadog plugin is enabled for your organization at the [Grafana account portal](/orgs). If it isn’t listed, confirm your Cloud plan includes Enterprise plugins.
2. In your Grafana Cloud instance, navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
3. Search for **Datadog**.
4. Click **Install**.

The plugin is ready to use immediately after installation. For detailed installation instructions or troubleshooting, refer to [Install the Datadog data source](/docs/plugins/grafana-datadog-datasource/latest/install/).

## Step 2: Configure the data source

1. Navigate to **Connections** &gt; **Add new connection**.
2. Search for **Datadog** and select it.
3. Click **Add new data source**.
4. Enter a **Name** for the data source.
5. From the **API URL / Region** drop-down menu, select your Datadog region, such as **US1 / Default** or **EU**.
6. Enter your Datadog **API key** and **Application key**.
7. Click **Save &amp; test**.

On success, you see a green message confirming that Grafana connected to Datadog. If the connection fails, refer to [Troubleshoot the Datadog data source](/docs/plugins/grafana-datadog-datasource/latest/troubleshooting/).

> Note
>
> **Save &amp; test** verifies the API key and basic metric access. It doesn’t verify the application key permissions for every query type. For the permissions each query type requires, refer to [API key and application key permissions](/docs/plugins/grafana-datadog-datasource/latest/configure/#api-key-and-application-key-permissions).

## Step 3: Write your first query

1. Navigate to **Explore** in the left-side menu.
2. Select your new Datadog data source from the data source picker.
3. Keep the default **Query** type.
4. In the **Metric** field, select a metric, such as `system.cpu.user`.
5. Select an **Aggregate** function, such as `avg`.
6. Click **Run query**. You should see a time-series graph showing your Datadog metric.

To write the query as a Datadog expression instead, change the query type to **Raw query** and enter an expression, such as `avg:system.cpu.user{*}`. For all query types and options, refer to [Datadog query editor](/docs/plugins/grafana-datadog-datasource/latest/query-editor/).

## Step 4: Build a dashboard

1. Navigate to **Dashboards** in the left-side menu.
2. Click **New** &gt; **New dashboard** &gt; **Add visualization**.
3. Select your Datadog data source.
4. Build a query, or change the query type to **Raw query** and paste one of the starter queries below.
5. Choose a visualization type, such as Time series, Stat, Gauge, or Table.
6. Click **Apply** to add the panel.
7. Repeat for additional panels, then click **Save dashboard**.

**Starter panels to consider:**

Expand table

| Panel                  | Query idea (Raw query)                   |
|------------------------|------------------------------------------|
| CPU usage by host      | `avg:system.cpu.user{*} by {host}`       |
| Memory used            | `avg:system.mem.used{*}`                 |
| Disk in use            | `avg:system.disk.in_use{*} by {host}`    |
| Network bytes received | `sum:system.net.bytes_rcvd{*} by {host}` |

Alternatively, import one of the pre-built dashboards that ship with the plugin, such as **System metrics** or **Docker**. For instructions, refer to [Import a dashboard for Datadog](/docs/plugins/grafana-datadog-datasource/latest/#import-a-dashboard-for-datadog).

## Next steps

- [Datadog query editor](/docs/plugins/grafana-datadog-datasource/latest/query-editor/): Query types, aggregation, and advanced options.
- [Template variables](/docs/plugins/grafana-datadog-datasource/latest/template-variables/): Create dynamic dashboards with drop-down filters.
- [Annotations](/docs/plugins/grafana-datadog-datasource/latest/annotations/): Overlay Datadog events on your panels.
- [Alerting](/docs/plugins/grafana-datadog-datasource/latest/alerting/): Monitor your Datadog data with Grafana-managed alert rules.
- [Configure the Datadog data source](/docs/plugins/grafana-datadog-datasource/latest/configure/): Advanced settings, authentication, and provisioning.
