---
title: "Get started with Oracle on Grafana Cloud | Grafana Enterprise Plugins documentation"
description: "Connect your Oracle Database to Grafana Cloud and build your first dashboard in minutes."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Get started with Oracle on Grafana Cloud

This guide walks you through connecting your Oracle Database to Grafana Cloud and visualizing your first query. The entire process takes under 10 minutes.

## Prerequisites

Before you begin, ensure you have:

- A [Grafana Cloud Pro or Advanced](/pricing/) plan.
- An Oracle Database instance.
- A database user with `SELECT` permissions on the tables you want to query. Refer to [Create a least-privilege database user](/docs/plugins/grafana-oracle-datasource/latest/configure/#create-a-least-privilege-database-user) for setup instructions.
- *If your database is on a private network:* A Linux host in the same network to run the PDC agent.

## Step 1: Install the plugin

1. In your Grafana Cloud instance, navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for **Oracle**.
3. Click **Install**.

The plugin is ready to use immediately after installation.

## Step 2: Connect to a private database (optional)

> Note
>
> Skip this step if your Oracle Database has a public IP address that Grafana Cloud can reach directly.

If your Oracle Database is behind a firewall or on a private network, set up Private data source connect (PDC) to create a secure tunnel:

1. Navigate to **Connections** &gt; **Private data source connect**.
2. Click **Add new network** and follow the setup wizard.
3. Install the PDC agent on a host in the same network as your Oracle Database:

   Bash [Copy code to clipboard] Copy

   ```bash
   curl -sL https://raw.githubusercontent.com/grafana/pdc-agent/main/production/install.sh | bash
   ```
4. Start the agent and verify it shows a **Connected** status in the Grafana Cloud UI.
5. Confirm the agent host can reach your Oracle Database: `nc -zv <oracle-host> 1521`.

For detailed instructions, refer to [Configure Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/configure-pdc/).

## Step 3: Configure the data source

1. Navigate to **Connections** &gt; **Add new connection**.
2. Search for **Oracle Database** and select it.
3. Click **Add new data source**.
4. Fill in the connection settings:

   Expand table

   | Setting      | Value                                                                 |
   |--------------|-----------------------------------------------------------------------|
   | **Host**     | Your Oracle host and port (for example, `oracle-db.example.com:1521`) |
   | **Database** | The service name or SID                                               |
   | **User**     | The database username                                                 |
   | **Password** | The database password                                                 |
5. If you set up PDC in Step 2, select your PDC network from the **Private data source connect** dropdown.
6. Click **Save &amp; test**.

On success, you’ll see a message like: **Success: Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production**.

If the connection fails, refer to [Troubleshoot connection errors](/docs/plugins/grafana-oracle-datasource/latest/troubleshooting/#connection-errors).

## Step 4: Write your first query

1. Navigate to **Explore** in the left-side menu.
2. Select your new Oracle data source from the dropdown.
3. Paste the following query to verify connectivity and see active sessions:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT
     status,
     COUNT(*) AS session_count
   FROM V$SESSION
   WHERE username IS NOT NULL
   GROUP BY status
   ```
4. Click **Run query**. You should see a table with session statuses and counts.

Try a time-series query to see data on a graph:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  $__timeGroup(begin_time, '5m') AS time,
  metric_name AS metric,
  ROUND(average, 2) AS value
FROM V$SYSMETRIC_HISTORY
WHERE $__timeFilter(begin_time)
  AND metric_name = 'CPU Usage Per Sec'
GROUP BY $__timeGroup(begin_time, '5m'), metric_name, ROUND(average, 2)
ORDER BY time
```

Set the **Format as** dropdown to **Time series** to see the result as a graph.

## Step 5: Build a dashboard

1. Click **+** &gt; **New dashboard** &gt; **Add visualization**.
2. Select your Oracle data source.
3. Paste a time-series query (like the CPU example above).
4. Choose a visualization type (Time series, Stat, Gauge, or Table).
5. Click **Apply** to add the panel.
6. Repeat for additional panels, then click **Save dashboard**.

**Starter panels to consider:**

Expand table

| Panel               | Query idea                                              |
|---------------------|---------------------------------------------------------|
| CPU usage over time | `V$SYSMETRIC_HISTORY` with `CPU Usage Per Sec`          |
| Active sessions     | `V$SESSION` grouped by status                           |
| Tablespace usage    | `DBA_TABLESPACE_USAGE_METRICS` with `used_percent`      |
| Application metrics | Your own tables with `$__timeGroup` and `$__timeFilter` |

## Next steps

- [Oracle query editor](/docs/plugins/grafana-oracle-datasource/latest/query-editor/)—macros, data types, and advanced query patterns.
- [Template variables](/docs/plugins/grafana-oracle-datasource/latest/template-variables/)—create dynamic dashboards with drop-down filters.
- [Annotations](/docs/plugins/grafana-oracle-datasource/latest/annotations/)—overlay deployment or event markers on your graphs.
- [Alerting](/docs/plugins/grafana-oracle-datasource/latest/alerting/)—get notified when metrics cross thresholds.
- [Troubleshooting](/docs/plugins/grafana-oracle-datasource/latest/troubleshooting/)—solutions for common issues.
