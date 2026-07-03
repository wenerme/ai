---
title: "Get started with Splunk on Grafana Cloud | Grafana Enterprise Plugins documentation"
description: "Connect your Splunk instance to Grafana Cloud and build your first dashboard in minutes."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Get started with Splunk on Grafana Cloud

This guide walks you through connecting your Splunk instance to Grafana Cloud and visualizing your first query. The entire process takes under 10 minutes.

## Prerequisites

Before you begin, ensure you have:

- A [Grafana Cloud Pro or Advanced](/pricing/) plan.
- A Splunk Enterprise or Splunk Cloud instance with [port 8089 enabled](https://docs.splunk.com/Documentation/SplunkCloud/latest/Config/ConfigureOutboundPorts).
- Splunk user credentials (username and password) or an [authentication token](https://docs.splunk.com/Documentation/Splunk/latest/Security/CreateAuthTokens) with permissions to run searches.
- *If your Splunk instance is on a private network:* A Linux host in the same network to run the PDC agent.

## Step 1: Install the plugin

1. Verify the Splunk plugin is activated for your organization at [grafana.com/orgs](/orgs). If it isn’t listed, confirm your Cloud plan includes Enterprise plugins.
2. In your Grafana Cloud instance, navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
3. Search for **Splunk**.
4. Click **Install**.

The plugin is ready to use immediately after installation. For detailed installation instructions or troubleshooting, refer to [Install the Splunk data source](/docs/plugins/grafana-splunk-datasource/latest/install/).

## Step 2: Connect to a private Splunk instance (optional)

> Note
>
> Skip this step if your Splunk instance has a public IP address that Grafana Cloud can reach directly on port 8089.

If your Splunk instance is behind a firewall or on a private network, set up Private data source connect (PDC) to create a secure tunnel:

1. Navigate to **Connections** &gt; **Private data source connect**.
2. Click **Add new network** and follow the setup wizard.
3. On the **Configuration Details** tab, generate a token and note the configuration values (token, cluster, hosted Grafana ID).
4. Install and run the PDC agent on a host in the same network as your Splunk instance. Choose binary, Docker, or Kubernetes depending on your environment.
5. Verify the agent shows a **Connected** status in the Grafana Cloud UI.
6. Confirm the agent host can reach your Splunk instance: `nc -zv <SPLUNK_HOST> 8089`.

For detailed instructions, refer to [Configure Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/configure-pdc/).

## Step 3: Configure the data source

1. Navigate to **Connections** &gt; **Add new connection**.
2. Search for **Splunk** and select **Splunk data source**.
3. Click **Add new data source**.
4. In the **URL** field, enter your Splunk management URL and port (for example, `https://splunk.example.com:8089`).
5. Under **Authentication**, select an authentication method:

   - **Basic authentication** (default): Enter your Splunk **User** and **Password**.
   - **Alternative authentication:** Enter a Splunk **Authentication token** instead of a username and password.
6. If you set up PDC in Step 2, select your PDC network from the **Private data source connect** section.
7. Click **Save &amp; test**.

On success, you see a message: **Connected to Splunk version: “9.1.3” build: “d95b3bc7f6d0”**.

If the connection fails, refer to [Troubleshoot connection errors](/docs/plugins/grafana-splunk-datasource/latest/troubleshooting/#connection-errors).

## Step 4: Write your first query

1. Navigate to **Explore** in the left-side menu.
2. Select your new Splunk data source from the data source picker.
3. The query editor opens in raw SPL mode by default. Paste the following query to verify connectivity and see event volume by sourcetype:

   spl [Copy code to clipboard] Copy

   ```spl
   index=_internal | timechart count by sourcetype
   ```
4. Click **Run query**. You should see a time-series graph showing event counts.

Try a log query to view raw events:

spl [Copy code to clipboard] Copy

```spl
index=_internal sourcetype=splunkd log_level=ERROR
```

Select **Logs** from the **View As** radio buttons to see the results in log format.

## Step 5: Build a dashboard

1. Navigate to **Dashboards** in the left-side menu.
2. Click **New** &gt; **New dashboard** &gt; **Add visualization**.
3. Select your Splunk data source.
4. Paste a time-series query (like the `index=_internal` example above).
5. Choose a visualization type (Time series, Stat, Gauge, or Table).
6. Click **Apply** to add the panel.
7. Repeat for additional panels, then click **Save dashboard**.

**Starter panels to consider:**

Expand table

| Panel                  | Query idea                                                                                   |
|------------------------|----------------------------------------------------------------------------------------------|
| Event volume over time | `index=_internal | timechart count by sourcetype`                                            |
| Error rate             | `index=_internal log_level=ERROR | timechart count`                                          |
| Top sourcetypes        | `index=* | stats count by sourcetype | sort -count | head 10`                                |
| System CPU usage       | `index=os sourcetype=cpu | timechart span=1m avg(pctSystem) as system, avg(pctUser) as user` |

## Next steps

- [Splunk query editor](/docs/plugins/grafana-splunk-datasource/latest/query-editor/): Query modes, visual builder, and advanced options.
- [Template variables](/docs/plugins/grafana-splunk-datasource/latest/template-variables/): Create dynamic dashboards with drop-down filters.
- [Configure the Splunk data source](/docs/plugins/grafana-splunk-datasource/latest/configure/): Advanced settings, authentication options, and provisioning.
- [Troubleshooting](/docs/plugins/grafana-splunk-datasource/latest/troubleshooting/): Solutions for common issues.
