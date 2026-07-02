---
title: "Troubleshoot Wavefront data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshoot common issues with the Wavefront data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Wavefront data source issues

This document provides solutions to common issues you might encounter when configuring or using the Wavefront data source. For configuration instructions, refer to [Configure the Wavefront data source](/docs/plugins/grafana-wavefront-datasource/latest/configure/).

## Authentication errors

These errors occur when credentials are missing, invalid, or don’t have the required permissions.

### “Enter an API URL.” or “Enter a token.”

**Symptoms:**

- **Save &amp; test** fails with a message like `The configuration setup is incomplete.`
- The detailed message is `Enter an API URL.` or `Enter a token.`

**Solutions:**

1. Open the data source configuration page.
2. Fill in the **API URL** field with your Wavefront tenant URL, for example `https://myenvironment.wavefront.com`.
3. Fill in the **Token** field with a valid Wavefront API token.
4. Click **Save &amp; test** again.

### “The credentials are incorrect. Check that the token is correct.”

**Symptoms:**

- **Save &amp; test** fails with the status `Unauthorized (401)`.
- Queries return 401 errors in the browser network tab or panel error messages.

**Possible causes and solutions:**

Expand table

| Cause                               | Solution                                                                                                                                                                                                                                                                   |
|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Expired or revoked token            | Generate a new token, click **Reset** next to the **Token** field on the data source configuration page, then enter the new token. Refer to [Generate a Wavefront API token](/docs/plugins/grafana-wavefront-datasource/latest/configure/#generate-a-wavefront-api-token). |
| Token copied with extra whitespace  | Click **Reset**, re-paste the token without surrounding whitespace, and click **Save &amp; test** again.                                                                                                                                                                   |
| Service account missing permissions | The health check calls `/api/v2/accesspolicy`, which requires that the account belongs to a role with read access to access policies, metrics, and events. In Wavefront, open the service account and confirm the account has the necessary permissions assigned.          |

## Connection errors

These errors occur when Grafana can’t reach the Wavefront API.

### “Could not connect to Wavefront. This usually happens when the URL is incorrect.”

**Symptoms:**

- **Save &amp; test** fails with the status `Bad Request (400)`.
- The detailed message is `Could not connect to Wavefront. This usually happens when the URL is incorrect.`

**Solutions:**

1. Verify the **API URL** is the full tenant URL, including the `https://` scheme and no trailing path. Common URL mistakes include:

   - Adding a trailing slash, for example `https://myenvironment.wavefront.com/`. Remove the slash.
   - Including an API path, for example `https://myenvironment.wavefront.com/api/v2/`. The data source appends API paths automatically.
   - Using `http://` instead of `https://`.
2. Confirm the tenant is reachable from your Grafana instance. Try the URL in a browser or with `curl`.
3. If you’re using Grafana Cloud with a private Wavefront tenant, configure [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) and enable **Enable Secure Socks Proxy** on the data source.
4. Check firewall rules allow outbound HTTPS (port 443) from the Grafana server to your Wavefront tenant.

### Data source test times out

**Symptoms:**

- **Save &amp; test** hangs or reports a timeout.
- Queries work intermittently.

**Solutions:**

1. Verify network connectivity from the Grafana server to the Wavefront tenant.
2. Increase the **Request timeout in seconds** setting in the data source configuration.
3. For private networks, ensure your VPN, peering, or [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) path to Wavefront is healthy.

## Query errors

These errors occur when running queries against the data source.

### “No data” or empty results

**Symptoms:**

- The query runs without an error, but the panel shows `No data`.

**Possible causes and solutions:**

Expand table

| Cause                                         | Solution                                                                                                                                                                                                    |
|-----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| The dashboard time range doesn’t contain data | Expand the time range or confirm the metric has recent data in the Wavefront UI.                                                                                                                            |
| Wrong metric selected                         | In **Query Builder**, pick the exact metric path. Use the [Metrics](/docs/plugins/grafana-wavefront-datasource/latest/template-variables/#query-variable-types) variable type to explore available metrics. |
| Filters exclude all data                      | Remove filters one at a time to find the narrowing filter.                                                                                                                                                  |
| Token lacks read access to the metric         | Verify the token belongs to a user or service account with read permission for the metric namespace.                                                                                                        |

### Query timeout

**Symptoms:**

- The query runs for a long time then fails with a timeout error.
- Error mentions `context deadline exceeded` or `request timeout`.

**Solutions:**

1. Narrow the time range to reduce the number of points returned.
2. Add filters to reduce the result set.
3. Add an aggregation function, for example `avg` or `sum`, to collapse high-cardinality series.
4. Increase **Request timeout in seconds** on the data source for heavier queries.

### “Error: It seems the query have URL escaped characters.”

**Symptoms:**

- The **Raw Query** editor shows a red error about URL-escaped characters.
- The query includes sequences like `%20`, `%3D`, or `%22`.

**Solutions:**

1. Replace escaped sequences with literal characters. For example, replace `%20` with a space and `%3D` with `=`.
2. Re-run the query. If the error persists, clear the **Query Type** selector and re-select the appropriate type.

### PromQL query returns unexpected results

**Symptoms:**

- PromQL queries work on a Prometheus tenant but not on Wavefront, or return different shapes.

**Solutions:**

1. Confirm **Query Type** is set to **PromQL** or **Hybrid** in the **Raw Query** editor.
2. Review the [Wavefront PromQL compatibility guidance](https://docs.vmware.com/en/VMware-Aria-Operations-for-Applications/index.html) for functions and selectors that Wavefront translates differently.
3. Try rewriting the query in WQL with **Query Type** set to **WQL** to compare output.

## Template variable errors

These errors affect template variables backed by the Wavefront data source.

### Variables return no values

**Solutions:**

1. Verify the data source connection with **Save &amp; test**.
2. Confirm the **Query Type** matches the data you want. Use **Metrics** for metric names, **Hosts / Sources** for source names, and so on.
3. For **Tag Values**, make sure the **Tag** field contains a valid tag key.
4. Verify the token has permission to list the requested resources.

### “Tag Values” returns all values or is empty

**Symptoms:**

- **Tag Values** returns every value in the tenant, or returns nothing.

**Solutions:**

1. Set a specific **Query** expression, for example `~sample.cpu.*`, to scope the search.
2. Double-check the **Tag** field for typos. The field is case-sensitive.

### Ad hoc filters show no keys or values

**Symptoms:**

- The ad hoc filter drop-down is empty.
- The filter shows keys, but no values for the selected key.

**Solutions:**

1. Confirm a helper variable named exactly `metriclink` exists on the dashboard. The data source uses this helper to decide which metric’s keys and values to list.
2. Make sure `metriclink` has a non-empty value. You can use a **Custom** variable with a list of metrics or a **Query** variable of type **Metrics**.
3. Refer to [Ad hoc filters](/docs/plugins/grafana-wavefront-datasource/latest/query-editor/#ad-hoc-filters) on the query editor page for full setup steps.

### Legacy variable queries don’t return results

**Symptoms:**

- A dashboard imported from an older plugin version has variables with string queries like `metrics: ts(...)` or `tagValues(env): ts(...)`.
- The variable returns no results or an `invalid query` error.

**Solutions:**

1. Open the variable for editing. The plugin migrates legacy queries automatically when the variable loads, so the editor shows the modern **Query Type** and **Query** fields.
2. Confirm the migrated **Query Type** matches what you expect. For example, `sources:` migrates to **Hosts / Sources**, and `tagValues(env):` migrates to **Tag Values** with **Tag** set to `env`.
3. If the migration didn’t pick the correct type, set the **Query Type** and **Query** manually.
4. Refer to [Legacy query formats](/docs/plugins/grafana-wavefront-datasource/latest/template-variables/#legacy-query-formats) on the template variables page.

## Annotation issues

These issues affect Wavefront events used as annotations on dashboards.

### No annotations appear on the panel

**Symptoms:**

- An annotation query is configured, but no markers or regions appear on the panel.

**Solutions:**

1. Confirm Wavefront has events in the dashboard time range. Open the Wavefront UI’s **Events** browser to verify.
2. Check the annotation toggle on the dashboard’s annotation switch bar to confirm the annotation isn’t hidden.
3. Increase the **Limit** on the annotation query if the tenant has many events and yours might be after the cutoff.
4. Confirm the token has permission to read events.
5. Refer to [Add an annotation](/docs/plugins/grafana-wavefront-datasource/latest/annotations/#add-an-annotation) for the full setup procedure.

### Annotation tooltip shows the wrong text

**Symptoms:**

- Annotation markers appear, but the tooltip shows an unhelpful field, such as the event ID instead of the event name.

**Solutions:**

1. Open the annotation in dashboard settings.
2. In the **Fields** section, map response fields to the annotation **Title**, **Text**, and **Tags**.
3. For recommended mappings, refer to [Map response fields to annotation properties](/docs/plugins/grafana-wavefront-datasource/latest/annotations/#map-response-fields-to-annotation-properties).

## Performance issues

These issues relate to slow queries, throttling, or API limits.

### API throttling or rate-limit errors

**Symptoms:**

- Errors mentioning rate limits or HTTP `429` responses.
- Dashboard panels intermittently fail during peak refresh times.

**Solutions:**

1. Reduce the dashboard refresh frequency.
2. Increase the aggregation interval to reduce the number of points returned.
3. Enable [query caching](/docs/grafana/latest/administration/data-source-management/#query-and-resource-caching) (available in Grafana Enterprise and Grafana Cloud).
4. Request a rate-limit increase from your Wavefront administrator or VMware support.

### Alert rules time out or return No Data

**Symptoms:**

- Grafana-managed alert rules based on Wavefront queries fail with timeouts.
- Alert rules transition to **No Data**.

**Solutions:**

1. Simplify the alert query or add filters to limit the number of series.
2. Use moving-window functions, such as `mavg` or `mmedian`, to smooth high-cardinality results.
3. Add `align()` in WQL or a `[duration]` selector in PromQL so the query produces a regular time series for the **Reduce** expression.
4. Increase **Request timeout in seconds** on the data source so alert evaluations have more time to complete.
5. Avoid very long time ranges in alert queries; use the shortest range that still captures the signal.
6. For more guidance, refer to [Alerting with the Wavefront data source](/docs/plugins/grafana-wavefront-datasource/latest/alerting/).

## Enable debug logging

To capture detailed error information for troubleshooting:

1. Set the Grafana log level to `debug` in the Grafana configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Restart Grafana.
3. Reproduce the issue and review logs in `/var/log/grafana/grafana.log` (or your configured log location). Look for log entries with `logger=plugin.grafana-wavefront-datasource`, which include backend errors from the data source as well as the URLs of HTTP requests sent to your Wavefront tenant.
4. To inspect the queries the plugin sends, also check the panel’s query inspector under **Inspect** &gt; **Query** for the `executedQueryString` field.
5. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## Get additional help

If you’ve tried the solutions in this guide and still encounter issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Consult the [VMware Aria Operations for Applications documentation](https://docs.vmware.com/en/VMware-Aria-Operations-for-Applications/index.html) for tenant-specific guidance.
3. [Raise a support ticket](/profile/org#support) if you’re a Grafana Cloud Pro, Cloud Advanced, or Grafana Enterprise customer.
4. When reporting an issue, include:

   - Grafana version and plugin version (from **Plugins and data** &gt; **Plugins**).
   - The exact error message (redact sensitive information).
   - Steps to reproduce.
   - Relevant configuration, with credentials redacted.
