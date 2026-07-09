---
title: "Oracle data source | Grafana Enterprise Plugins documentation"
description: "Use the Oracle data source plugin to query and visualize Oracle Database data in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Oracle data source

Connect Grafana to your Oracle Database to monitor application performance, track business metrics, and build operational dashboards using live SQL queries.

> Note
>
> The Oracle data source is an Enterprise plugin. It’s available with a Grafana Cloud Pro or Advanced plan and Grafana Enterprise. For installation instructions, refer to [Install and upgrade the Oracle data source plugin](/docs/plugins/grafana-oracle-datasource/latest/install/).

## Supported features

Expand table

| Feature     | Supported |
|-------------|-----------|
| Metrics     | Yes       |
| Alerting    | Yes       |
| Annotations | Yes       |
| Logs        | No        |
| Traces      | No        |

## Requirements

To use the Oracle data source, you need:

- An Oracle Database instance with at least one user that has `SELECT` permissions on the tables you want to query.
- **One of the following licenses:**

  - A [Grafana Cloud Pro or Advanced](/pricing/) plan (not available on the free tier).
  - An [activated self-managed Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/) with the plugin entitlement included.
- Grafana version 11.6.7 or later.

### Supported Oracle Database versions

The plugin uses the [go-ora](https://github.com/sijms/go-ora) driver. Oracle 19c is tested internally.

### Verify your license entitlement

Expand table

| Deployment                  | How to verify                                                                                                                                                                                                    |
|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Grafana Cloud**           | The plugin is automatically available if your plan includes it. Navigate to **Plugins and data** &gt; **Plugins** and search for Oracle. If it doesn’t appear, verify your plan at [Grafana pricing](/pricing/). |
| **Self-managed Enterprise** | Navigate to **Administration** &gt; **General** &gt; **Stats and license**. Confirm your license is active and includes the `grafana-oracle-datasource` plugin. If not, contact your Grafana account team.       |

If you encounter license errors, refer to [Troubleshoot licensing issues](/docs/plugins/grafana-oracle-datasource/latest/troubleshooting/#licensing-issues).

## Known limitations

- The Oracle plugin doesn’t support ARM64 architecture (for example, Apple Silicon M1/M2 Macs).
- TNSNames and Kerberos authentication are not supported in Grafana Cloud.
- Oracle Wallet authentication and LDAP-based TNS resolution are not supported in plugin v3.x. Refer to [Upgrade from v2.x to v3.x](/docs/plugins/grafana-oracle-datasource/latest/troubleshooting/#upgrade-from-v2x-to-v3x) for migration details.

## Get started

The following documents help you set up and use the Oracle data source:

- [Get started on Grafana Cloud](/docs/plugins/grafana-oracle-datasource/latest/cloud-quickstart/)—install, connect, and query in under 10 minutes.
- [Install and upgrade](/docs/plugins/grafana-oracle-datasource/latest/install/)
- [Configure the Oracle data source](/docs/plugins/grafana-oracle-datasource/latest/configure/)
- [Kerberos integration](/docs/plugins/grafana-oracle-datasource/latest/kerberos/)
- [Oracle query editor](/docs/plugins/grafana-oracle-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-oracle-datasource/latest/template-variables/)
- [Annotations](/docs/plugins/grafana-oracle-datasource/latest/annotations/)
- [Alerting](/docs/plugins/grafana-oracle-datasource/latest/alerting/)
- [Troubleshooting](/docs/plugins/grafana-oracle-datasource/latest/troubleshooting/)

## Additional features

After configuring the data source, you can:

- Use [Explore](/docs/grafana/latest/explore/) to run ad-hoc queries without building a dashboard.
- Add [transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- Set up [alerting](/docs/grafana/latest/alerting/) rules based on Oracle queries.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well. For detailed upgrade steps and version compatibility, refer to [Install and upgrade](/docs/plugins/grafana-oracle-datasource/latest/install/#upgrade-the-plugin).

> Note
>
> Plugins are automatically updated in Grafana Cloud.

## Related resources

- [Official Oracle Database documentation](https://docs.oracle.com/en/database/)
- [Grafana community forum](https://community.grafana.com/)
