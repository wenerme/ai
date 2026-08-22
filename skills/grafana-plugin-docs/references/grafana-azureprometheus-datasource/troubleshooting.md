---
title: "Troubleshoot Azure Monitor Managed Service for Prometheus issues | Grafana Plugins documentation"
description: "Troubleshooting guide for the Azure Monitor Managed Service for Prometheus data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Azure Monitor Managed Service for Prometheus issues

This document provides solutions to common issues you may encounter when configuring or using the Azure Monitor Managed Service for Prometheus data source. For configuration instructions, refer to [Configure the Azure Monitor Managed Service for Prometheus data source](/docs/plugins/grafana-azureprometheus-datasource/latest/configure/).

## Plugin and interface errors

These errors occur when the plugin is outdated or fails to load in the Grafana interface.

### “Plugin not found”, “Datasource not found”, or blank settings tabs

An outdated plugin version is a common cause of interface errors and missing settings.

**Symptoms:**

- The data source settings tabs are blank or fail to render.
- Errors such as **Plugin not found** or `Datasource not found` appear.
- The browser console shows JavaScript errors such as `TypeError: Cannot read properties of undefined`.

**Solutions:**

1. Check the installed plugin version. Navigate to **Plugins and data** &gt; **Plugins** and select **Azure Monitor Managed Service for Prometheus**.
2. If an update is available, click **Update** to install the latest version. In Grafana Cloud, plugins update automatically.
3. After updating, reload the data source configuration page.
4. Confirm your Grafana version meets the plugin’s minimum requirement. For the supported versions, refer to [Requirements](/docs/plugins/grafana-azureprometheus-datasource/latest/#requirements).
5. If the errors persist, restart Grafana and clear your browser cache.

For install, upgrade, and catalog issues, refer to [Troubleshoot installation issues](/docs/plugins/grafana-azureprometheus-datasource/latest/install/#troubleshoot-installation-issues).

## Authentication errors

These errors occur when Azure credentials are invalid, missing, or don’t have the required permissions, or when Azure authentication isn’t enabled on the Grafana server.

### Azure authentication isn’t applied

The plugin backend attaches Azure tokens only when Azure authentication is enabled on the Grafana server. This is the most common cause of `401 Unauthorized` errors, because the workspace rejects the request before it checks your credentials.

**Symptoms:**

- **Save &amp; test** returns `401 Unauthorized`.
- Queries fail even though the App Registration fields look correct, and the same credentials work in the Azure portal or a local Grafana instance.
- The error is a generic `401 Unauthorized` that doesn’t identify the missing server setting as the cause.

> Note
>
> On Grafana Cloud, Azure authentication isn’t enabled by default, and you can’t enable it yourself. If your credentials are valid but **Save &amp; test** returns `401 Unauthorized`, contact [Grafana Support](/help/) to enable Azure authentication for your instance.

**Solutions:**

1. On self-managed Grafana, set `azure_auth_enabled = true` under `[auth]` in the Grafana configuration file and restart Grafana.
2. If you’ve customized `forward_settings_to_plugins` under `[azure]`, include `grafana-azureprometheus-datasource`.
3. On Grafana Cloud, contact [Grafana Support](/help/) to enable Azure authentication for your instance. This isn’t a self-service setting.

### “401 Unauthorized” after migration

Migrating a data source doesn’t enable or carry over the server-side Azure authentication setting. If the setting wasn’t already enabled for the original data source, the migrated data source returns `401 Unauthorized` even though its credentials are unchanged.

**Symptoms:**

- The data source was migrated from core Prometheus Azure AD authentication.
- The credentials are unchanged from the working core Prometheus data source, but **Save &amp; test** or queries return `401 Unauthorized`.

**Solutions:**

1. On self-managed Grafana, verify that `grafana-azureprometheus-datasource` is included in `forward_settings_to_plugins` under `[azure]`. Grafana includes this plugin ID by default.
2. Verify `[auth] azure_auth_enabled = true`.
3. On Grafana Cloud, contact [Grafana Support](/help/) to enable Azure authentication, because it isn’t a self-service setting.

If these steps don’t resolve the error, refer to [Azure authentication isn’t applied](#azure-authentication-isnt-applied), which covers the same setting in more detail.

For migration status and rollback, refer to [Migrate from Prometheus Azure AD to Azure Monitor Managed Service for Prometheus](/docs/grafana/latest/datasources/prometheus/configure/azure-authentication/).

### “Access denied” or “Authorization failed”

These errors indicate that the identity Grafana uses can’t query the workspace.

**Symptoms:**

- Save &amp; test fails with an authorization error.
- Queries return access denied messages.
- Metrics and labels don’t load in the query editor.

**Possible causes and solutions:**

Expand table

| Cause                         | Solution                                                                                                                                                                                                                           |
|-------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Missing permissions           | Assign **Monitoring Data Reader** on the Azure Monitor workspace to the identity. Refer to the [Azure Monitor Prometheus Grafana documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/metrics/prometheus-grafana). |
| Invalid credentials           | Verify the tenant ID, client ID, and client secret in the Azure portal. Regenerate the secret if necessary.                                                                                                                        |
| Expired client secret         | Create a new client secret and update the data source configuration. For a data source that previously worked, refer to [Data source stops working after previously working](#data-source-stops-working-after-previously-working). |
| Wrong Azure Cloud             | Verify **Azure Cloud** matches the cloud that hosts the workspace, such as public, US Government, or China.                                                                                                                        |
| Managed Identity not enabled  | Set `managed_identity_enabled = true` under `[azure]` and restart Grafana.                                                                                                                                                         |
| Workload Identity not enabled | Set `workload_identity_enabled = true` under `[azure]` and restart Grafana.                                                                                                                                                        |

### Data source stops working after previously working

A data source that worked and then suddenly fails usually points to an expired or rotated Azure client secret. Microsoft Entra ID client secrets have an expiration date, and rotating or regenerating the secret in Azure without updating Grafana breaks authentication.

**Symptoms:**

- The data source worked previously and now fails without any configuration change in Grafana.
- **Save &amp; test** or queries return authentication errors, and panels may show **No data**.
- The Grafana server logs show a Microsoft Entra ID error that indicates an invalid client secret.

**Solutions:**

1. In the Azure portal, check the app registration’s client secret expiration under **Certificates &amp; secrets**.
2. Create a new client secret if the current one is expired or was rotated.
3. On the data source configuration page, select **App Registration**. If a secret is already saved, click **reset** next to **Client Secret**, enter the new secret, and click **Save &amp; test**.
4. For provisioned data sources, update `secureJsonData.azureClientSecret` and provision the data source again.
5. To avoid secret rotation entirely, use **Managed Identity** or **Workload Identity** when Grafana runs in Azure, because neither method stores a client secret.

### OAuth token overwrites Azure credentials

Azure authentication and **Forward OAuth identity** both set the HTTP `Authorization` header.

**Symptoms:**

- Queries fail after you enable **Forward OAuth identity**.
- Azure credentials appear configured but aren’t used.

**Solution:**

Disable **Forward OAuth identity** on the data source. Azure authentication already attaches a bearer token.

### Current User authentication fails or alerting doesn’t work

Current User authentication depends on Microsoft Entra ID login and optional fallback credentials.

**Symptoms:**

- Interactive queries fail with authentication errors.
- Alerting, reporting, or recorded queries fail while Explore queries succeed.
- The UI shows that fallback credentials are disabled.

**Solutions:**

1. Confirm Grafana uses Microsoft Entra ID authentication for user login.
2. Set `user_identity_enabled = true` under `[azure]`.
3. Enable **Fallback Service Credentials** on the data source so alerting and other backend features have an identity.
4. Don’t set `user_identity_fallback_credentials_enabled = false` unless you intend to disable those features.

## Connection errors

These errors occur when Grafana can’t reach the workspace endpoint.

### “Connection refused” or timeout errors

These errors indicate a network or endpoint problem rather than an authentication problem.

**Symptoms:**

- The data source test times out.
- Queries fail with network errors.
- Connection issues are intermittent.

**Solutions:**

1. Verify the **Prometheus server URL** is the query endpoint from the Azure Monitor workspace **Overview** page.
2. Verify network connectivity from the Grafana server to the workspace endpoint.
3. Check that firewall rules allow outbound HTTPS on port 443.
4. For Grafana Cloud accessing a private endpoint, configure [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/).

### Browser access mode error

The configuration page shows an error if the data source uses browser (direct) access.

**Symptoms:**

- An error states that browser access mode is no longer available.
- **Save &amp; test** doesn’t succeed until you change the access mode.

**Solution:**

Switch the data source to server (proxy) access mode. Browser access isn’t supported.

## Query errors

These errors occur when running queries against the workspace.

### “No data” or empty results

A query can succeed yet return no data.

**Symptoms:**

- The query runs without error but returns no data.
- Panels show a **No data** message.

**Possible causes and solutions:**

Expand table

| Cause                     | Solution                                                                                          |
|---------------------------|---------------------------------------------------------------------------------------------------|
| Time range has no data    | Expand the dashboard time range or verify the metric exists for that period.                      |
| Metric name typo          | Verify the metric name with the metrics browser.                                                  |
| Label selector too narrow | Remove or broaden label filters in the query.                                                     |
| Data not yet ingested     | Verify your Azure Monitor collection rule or Prometheus scraper is sending data to the workspace. |

### Query timeout

Large or unbounded queries can exceed the query timeout.

**Symptoms:**

- The query runs for a long time and then fails.
- The error mentions a timeout or query limit.

**Solutions:**

1. Narrow the time range to reduce the data volume.
2. Add label filters to reduce the number of series.
3. Increase the **Query timeout** on the data source configuration page.
4. Use recording rules to pre-compute expensive expressions.

### Metric values don’t match the Azure portal

PromQL results in Grafana can differ from the values in Azure Monitor metrics explorer because the two tools sample and aggregate data differently. This is expected behavior rather than a data error.

**Common causes:**

Expand table

| Cause                     | Explanation                                                                                                                                          |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| Step and interval         | Grafana samples at a calculated step through `$__interval`, while the portal uses its own time grain. A larger step smooths the values.              |
| Rate window               | `rate()` and `increase()` depend on the range window, such as `$__rate_interval`. A different window changes the result.                             |
| Aggregation and alignment | Grafana aligns the query range to the step, and your PromQL aggregation, such as `sum`, `avg`, or `max`, might differ from the portal’s aggregation. |
| Filtering                 | Label filters in your query might select a different set of series than the portal view.                                                             |

**Solutions:**

1. Match the dashboard time range to the portal, and set a fixed **Min step** that matches the portal’s time grain.
2. Use the same aggregation and rate window in both tools.
3. Use the [query inspector](/docs/plugins/grafana-azureprometheus-datasource/latest/query-editor/#use-the-query-inspector) to confirm the evaluated query, step, and time range.
4. Compare a single series with explicit label filters instead of an aggregate.

## Template variable errors

These errors occur when using template variables with the data source.

### Variables return no values

Empty variables usually point to a connection or permissions problem.

**Solutions:**

1. Verify the data source connection works by running Save &amp; test.
2. Verify the variable query uses a valid function such as `label_values()`.
3. Check that parent variables in a chain have valid selections.
4. Verify the identity has permission to list labels and series.

### Variables are slow to load

Large workspaces can make variable queries slow.

**Solutions:**

1. Set the variable refresh to **On dashboard load** instead of **On time range change**.
2. Narrow the scope of the variable query with label filters.
3. Enable **Disable metric lookup** if you don’t need metric autocomplete.

## Performance issues

These issues relate to slow queries or Azure service limits.

### Rate limit errors

Azure Monitor managed service for Prometheus enforces query quotas.

**Symptoms:**

- Errors mention throttling, rate limits, or too many requests.
- Dashboard panels intermittently fail to load.

**Solutions:**

1. Reduce the dashboard refresh frequency.
2. Increase the query step or **Min step** to reduce the number of data points.
3. Enable query caching in Grafana, available in Grafana Enterprise and Grafana Cloud.
4. Review workspace quotas in the Azure portal and request an increase if needed.

## Alert errors

These errors occur when Grafana can’t load or manage rules stored in your workspace.

### “Unable to fetch alert rules”

This error appears when Grafana can’t retrieve the alerting and recording rules from the workspace ruler.

**Symptoms:**

- The Grafana Alerting UI shows **Unable to fetch alert rules**.
- Workspace-managed rules don’t load even though queries work.

**Possible causes and solutions:**

Expand table

| Cause                         | Solution                                                                                                                                                    |
|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Rule management not enabled   | Enable **Manage alerts via Alerting UI** on the data source [configuration page](/docs/plugins/grafana-azureprometheus-datasource/latest/configure/).       |
| Missing rule permissions      | Grant the identity permission to read Prometheus rule groups on the Azure Monitor workspace.                                                                |
| Incorrect workspace URL       | Verify the **Prometheus server URL** is the query endpoint. The data source serves the ruler from the `/rules` and `/config/v1/rules` paths under this URL. |
| Current User without fallback | Configure [fallback service credentials](/docs/plugins/grafana-azureprometheus-datasource/latest/configure/#current-user).                                  |

## Enable debug logging

To capture detailed error information for troubleshooting:

1. Set the Grafana log level to `debug` in the configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Review logs in `/var/log/grafana/grafana.log`, or your configured log location.
3. Look for entries from the `tsdb.azure-prometheus` logger that include request and response details.
4. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## Get additional help

If you’ve tried these solutions and still encounter issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Review the [plugin GitHub issues](https://github.com/grafana/azure-prometheus-datasource/issues) for known bugs.
3. Consult the [Azure Monitor managed service for Prometheus documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/metrics/prometheus-metrics-overview) for service-specific guidance.
4. Contact Grafana Support if you’re an Enterprise, Cloud Pro, or Cloud Contracted user.
5. When reporting issues, include:

   - Grafana version and plugin version.
   - Error messages, with sensitive information redacted.
   - Steps to reproduce.
   - Relevant configuration, with credentials redacted.
