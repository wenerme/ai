---
title: "Troubleshoot Catchpoint data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshooting guide for the Catchpoint data source in Grafana, covering authentication, connection, and query errors."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Catchpoint data source issues

This document provides solutions to common issues you may encounter when configuring or using the Catchpoint data source. For configuration instructions, refer to [Configure the Catchpoint data source](/docs/plugins/grafana-catchpoint-datasource/latest/configure/).

## Installation errors

These errors occur when the plugin can’t install or load, most often because of a Grafana version mismatch. The Catchpoint data source requires Grafana 11.6.7 or later.

### “Plugin not found, no installed plugin with that id”

This error appears when Grafana can’t load the Catchpoint plugin after installation.

**Symptoms:**

- A `Plugin not found, no installed plugin with that id` error.
- The plugin shows as not installed after a page refresh.
- The plugin page inconsistently reports different Grafana version dependencies.

**Possible causes and solutions:**

Expand table

| Cause                         | Solution                                                                                                                              |
|-------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Grafana version too old       | Upgrade to Grafana 11.6.7 or later, which the plugin requires.                                                                        |
| Incomplete installation       | Reinstall the plugin and restart the Grafana server so it loads on startup.                                                           |
| Enterprise license not active | Confirm you have a Grafana Cloud Pro or Advanced plan or an activated Grafana Enterprise license, since this is an Enterprise plugin. |

For Grafana Cloud, plugins are managed for you. If the plugin still doesn’t load, contact Grafana Support.

## Authentication errors

These errors occur when the REST API v2 key is missing, invalid, or lacks the required permissions.

### “invalid/empty bearer token”

This error appears when you click **Save &amp; test** without a token.

**Symptoms:**

- **Save &amp; test** fails with an `invalid/empty bearer token` error.
- Queries return no data.

**Possible causes and solutions:**

Expand table

| Cause                | Solution                                                                                                       |
|----------------------|----------------------------------------------------------------------------------------------------------------|
| Token field is empty | Enter your Catchpoint REST API v2 key in the **Token** field and save again.                                   |
| Token wasn’t saved   | Re-enter the token and click **Save &amp; test**. The token is stored securely and isn’t shown after you save. |

### “status code: 401”

This error appears when Catchpoint rejects the provided token. The plugin uses Bearer token authentication with the Catchpoint REST API V2 Key, which you find in the Catchpoint portal under **Settings** &gt; **API**.

**Symptoms:**

- **Save &amp; test** fails with a `status code: 401` error.
- Queries fail with authorization errors.

**Possible causes and solutions:**

Expand table

| Cause                    | Solution                                                                                                                            |
|--------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| Wrong API key type       | Use the **REST API V2 Key** from **Settings** &gt; **API**. Other Catchpoint keys, such as keys for older API versions, don’t work. |
| Expired or revoked token | Regenerate the REST API v2 key in Catchpoint, then update the **Token** field and click **Save &amp; test**.                        |
| Incorrect permissions    | Verify the key’s account has permission to access the tests, sites, and SLOs you query.                                             |
| Token copied incorrectly | Re-copy the full key without extra spaces, paste it into the **Token** field, and save again.                                       |

## Connection errors

These errors occur when Grafana can’t reach the Catchpoint client API at `https://io.catchpoint.com/api/v2`.

### Connection refused or timeout errors

These errors indicate a network or firewall problem between Grafana and Catchpoint.

**Symptoms:**

- The data source test times out.
- Queries fail with network errors.
- Connection issues occur intermittently.

**Solutions:**

1. Verify network connectivity from the Grafana server to `io.catchpoint.com`.
2. Check that firewall rules allow outbound HTTPS on port 443.
3. Confirm that the Catchpoint API is reachable and not experiencing an outage.

## Query errors

These errors occur when running Tests, RUM, or SLO queries.

### “No data” or empty results

A query can succeed but return no data.

**Symptoms:**

- The query runs without error but returns no data.
- Panels show a **No data** message.

**Possible causes and solutions:**

Expand table

| Cause                             | Solution                                                                             |
|-----------------------------------|--------------------------------------------------------------------------------------|
| Time range doesn’t contain data   | Expand the dashboard time range or verify data exists in Catchpoint for that period. |
| Wrong test, site, or SLO selected | Verify you selected the correct test, site IDs, or SLO.                              |
| Permissions issue                 | Verify the REST API v2 key has access to the requested resource.                     |

### Can’t filter a Tests query to specific dimension values

This is a known limitation of the Catchpoint API, not the Grafana plugin.

**Symptoms:**

- A Tests query returns data for every value of a selected dimension.
- You can’t restrict results to one node, country, or other dimension value in the query editor.

**Solutions:**

1. Add a [transformation](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/), such as **Filter data by values**, to keep only the dimension values you want.
2. Use panel or legend filters to focus on specific series.
3. Reduce the number of selected dimensions to limit how the data is broken down.

### Query timeout

A query can run for a long time and then fail.

**Symptoms:**

- The query runs for a long time and then fails.
- The error mentions a timeout.

**Solutions:**

1. Narrow the dashboard time range to reduce the data volume.
2. Increase the **Time Interval** to return fewer aggregated points.
3. Reduce the number of selected dimensions, metrics, or tests.

## Template variable errors

These errors occur when using template variables with the data source.

### Variables return no values

A query variable can return an empty list.

**Solutions:**

1. Verify the data source connection by running **Save &amp; test** in the data source settings.
2. Confirm the variable query type returns data, such as an **SLO list** query.
3. Verify the REST API v2 key has permission to list the requested resources.

### Variables are slow to load

A query variable can take a long time to refresh.

**Solutions:**

1. Set the variable refresh to **On dashboard load** instead of **On time range change**.
2. Reduce the scope of the variable query.

## Performance issues

These issues relate to slow queries or Catchpoint API rate limits.

### “Too Many Requests” or HTTP 429 errors

These errors come from the Catchpoint API, not from Grafana. The Catchpoint REST API enforces rate limits on the number of requests an account can make in a given period, and Grafana returns the error when those limits are exceeded. This most often happens when many tests, panels, or dashboards query Catchpoint at the same time.

**Symptoms:**

- A `Too Many Requests` error or an HTTP `429` status code.
- Dashboard panels intermittently fail to load, especially on dashboards with many panels.
- Errors appear when several users open Catchpoint dashboards at once.

**Possible causes and solutions:**

Expand table

| Cause                                 | Solution                                                                                            |
|---------------------------------------|-----------------------------------------------------------------------------------------------------|
| Frequent dashboard refresh            | Increase the dashboard refresh interval or turn off auto-refresh.                                   |
| Many panels or tests querying at once | Consolidate panels, reduce the number of tests per query, or split heavy dashboards.                |
| Short aggregation windows             | Increase the **Time Interval** so each query returns fewer points and makes fewer calls.            |
| Repeated identical queries            | Enable query caching, available in Grafana Enterprise and Grafana Cloud, to reduce duplicate calls. |

Rate limits are enforced and managed by Catchpoint, so the exact request thresholds and whether they’re hard or soft depend on your Catchpoint account and plan. To confirm your limits or request an increase, contact Catchpoint support. Grafana can’t raise the Catchpoint API limits.

## Enable debug logging

To capture detailed error information for troubleshooting:

1. Set the Grafana log level to `debug` in the configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Review logs in `/var/log/grafana/grafana.log` or your configured log location.
3. Look for Catchpoint data source entries that include request and response details.
4. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## Get additional help

If you’ve tried the previous solutions and still encounter issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Consult the [Catchpoint documentation](https://docs.catchpoint.com/) for service-specific guidance.
3. Contact Grafana Support through your Grafana Enterprise or Grafana Cloud support channel.
4. When reporting issues, include:

   - Grafana version
   - Error messages, with sensitive information redacted
   - Steps to reproduce
   - Relevant configuration, with credentials redacted
