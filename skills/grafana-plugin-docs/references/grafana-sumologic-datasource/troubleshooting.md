---
title: "Troubleshoot Sumo Logic data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshooting guide for the Sumo Logic data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Sumo Logic data source issues

This document provides solutions to common issues you may encounter when configuring or using the Sumo Logic data source. For configuration instructions, refer to [Configure the Sumo Logic data source](/docs/plugins/grafana-sumologic-datasource/latest/configure/).

## Authentication errors

These errors occur when credentials are invalid, missing, or rejected by the Sumo Logic API.

### “invalid access id” or “invalid access key”

**Symptoms:**

- **Save &amp; test** fails with a validation error.
- The error message includes “invalid access id”, “invalid access key”, or both.

**Possible causes and solutions:**

Expand table

| Cause                   | Solution                                                                                                                                                              |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Missing credentials     | Enter both your access ID and access key in the data source configuration.                                                                                            |
| Incorrect credentials   | Verify your credentials in the Sumo Logic console. Refer to the [Sumo Logic Access Keys documentation](https://help.sumologic.com/docs/manage/security/access-keys/). |
| Expired or revoked keys | Generate a new access ID and access key pair in Sumo Logic and update the data source configuration.                                                                  |

### “incorrect authentication method selected”

**Symptoms:**

- **Save &amp; test** fails immediately with this error message.

**Solutions:**

1. Verify the data source is configured to use access key authentication.
2. If provisioning, confirm the `authMethod` field in `jsonData` is set to `accessKey`.

### “invalid authentication method”

**Symptoms:**

- **Save &amp; test** fails with a validation error that includes “invalid authentication method”.

**Solutions:**

1. This error occurs when the `authMethod` field is empty or missing in the data source configuration.
2. If provisioning, add `authMethod: accessKey` to the `jsonData` section of your provisioning YAML or Terraform configuration.

### “401 Unauthorized”

**Symptoms:**

- **Save &amp; test** passes validation but fails when running a test query.
- Queries return authorization errors.

**Possible causes and solutions:**

Expand table

| Cause                    | Solution                                                                                                                                                                            |
|--------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Invalid credentials      | Verify the access ID and access key are correct and active in the Sumo Logic console.                                                                                               |
| Wrong API region         | Verify the **API region / URL** matches your Sumo Logic deployment. Refer to [Configure settings](/docs/plugins/grafana-sumologic-datasource/latest/configure/#configure-settings). |
| Insufficient permissions | Ensure the access key has permissions to query metrics and logs in your Sumo Logic account.                                                                                         |

## Connection errors

These errors occur when Grafana can’t reach the Sumo Logic API.

### “connection timed out” or timeout errors

**Symptoms:**

- **Save &amp; test** or queries fail after a long delay.
- Error messages mention timeout or connection issues.

**Solutions:**

1. Verify network connectivity from the Grafana server to the Sumo Logic API endpoint.
2. Check that firewall rules allow outbound HTTPS (port 443) to the Sumo Logic API.
3. Verify the **API region / URL** is correct for your Sumo Logic deployment.
4. Increase the **Timeout** value in the data source configuration if your queries require more time.
5. For Grafana Cloud accessing private resources, configure [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/).

### HTTP status errors (400, 403, 500)

**Symptoms:**

- Queries fail with HTTP status code errors.

**Possible causes and solutions:**

Expand table

| Cause                       | Solution                                                                                                                             |
|-----------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| `400 Bad Request`           | Review the query syntax. Refer to the [query editor documentation](/docs/plugins/grafana-sumologic-datasource/latest/query-editor/). |
| `403 Forbidden`             | Verify the access key has the required permissions in Sumo Logic.                                                                    |
| `500 Internal Server Error` | This is a Sumo Logic server error. Retry the query or check the [Sumo Logic status page](https://status.sumologic.com/).             |

### “invalid API URL”

**Symptoms:**

- **Save &amp; test** fails with a validation error that includes “invalid API URL”.

**Solutions:**

1. Verify the **API region / URL** is set in the data source configuration.
2. Select a preset region from the drop-down or enter a valid custom URL.
3. If provisioning, ensure the `apiUrl` field in `jsonData` contains a valid URL (for example, `https://api.sumologic.com/api/`).

## Configuration errors

These errors occur when the data source configuration is invalid or can’t be loaded.

### “error reading settings” or “could not unmarshal DataSourceInfo json”

**Symptoms:**

- The data source fails to load.
- Queries fail with a settings error.

**Solutions:**

1. If provisioning, verify the YAML or Terraform configuration has valid JSON structure in the `jsonData` section.
2. Check for syntax errors such as missing commas, unclosed brackets, or invalid field names.
3. Refer to the [provisioning examples](/docs/plugins/grafana-sumologic-datasource/latest/configure/#provision-the-data-source) for the correct configuration format.

## Query errors

These errors occur when executing queries against the Sumo Logic API.

### “No data in any of the time-series selected”

**Symptoms:**

- A metrics query returns no data.
- The error appears as a notice on the query result.

**Possible causes and solutions:**

Expand table

| Cause                           | Solution                                                                 |
|---------------------------------|--------------------------------------------------------------------------|
| Time range doesn’t contain data | Expand the dashboard time range or verify data exists in Sumo Logic.     |
| Incorrect metric name           | Verify the metric name exists in your Sumo Logic account.                |
| Filters too restrictive         | Remove or broaden filters to confirm data exists, then narrow them down. |

### “Aggregate by non-existent keys”

**Symptoms:**

- A metrics query fails with a message like “Key: sss is missing in one or more time series.”

**Solutions:**

1. Verify the dimension names used in `by` clauses exist for the selected metric.
2. Check for typos in dimension names.
3. Use the builder mode metric selector to see available dimensions for your metric.

### Metrics syntax errors

**Symptoms:**

- A metrics query fails with a compilation or syntax error.

**Solutions:**

1. Verify the query syntax follows Sumo Logic metrics query format.
2. Switch to **Builder** mode to construct the query visually, then review the generated query string.
3. Refer to the [Sumo Logic metrics queries documentation](https://help.sumologic.com/docs/metrics/metrics-queries/metrics-queries-classic/) for syntax reference.

### “No data” or empty results for logs

**Symptoms:**

- A logs query executes without error but returns no results.

**Possible causes and solutions:**

Expand table

| Cause                           | Solution                                                                        |
|---------------------------------|---------------------------------------------------------------------------------|
| Time range doesn’t contain data | Expand the dashboard time range.                                                |
| Index or source doesn’t exist   | Verify the `_index`, `_sourceCategory`, or `_sourceHost` values exist.          |
| Query syntax issue              | Test the query directly in the Sumo Logic console to verify it returns results. |

### “invalid/unknown query type”

**Symptoms:**

- A query fails with an “invalid/unknown query type” error.

**Solutions:**

1. This error indicates the query type is corrupted or missing.
2. Delete the query panel and re-create it, ensuring you select **Metrics** or **Logs** as the query type.
3. If provisioning dashboards, verify the `queryType` field in the panel JSON is set to `metrics` or `logs`.

## Log search job errors

These errors occur when the Sumo Logic search job encounters issues during execution.

### “FORCE PAUSED”

**Symptoms:**

- A logs query fails with a “FORCE PAUSED” message.

**Solutions:**

1. Sumo Logic paused the search job, typically due to resource constraints.
2. Narrow the time range to reduce the volume of data being searched.
3. Simplify the query to reduce processing overhead.
4. Retry the query after a short delay.

### “CANCELLED”

**Symptoms:**

- A logs query fails with a “CANCELLED” message.

**Solutions:**

1. The search job was cancelled by Sumo Logic.
2. Narrow the time range or simplify the query.
3. Verify your Sumo Logic account hasn’t exceeded its search job quota.

## Builder mode issues

These issues occur when using the visual query builder for metrics queries.

### Metrics or dimensions not loading

**Symptoms:**

- The **Metric** drop-down is empty or shows a loading spinner indefinitely.
- Dimension options don’t appear after selecting a metric.

**Possible causes and solutions:**

Expand table

| Cause                        | Solution                                                                             |
|------------------------------|--------------------------------------------------------------------------------------|
| API connectivity issue       | Verify the data source connection using **Save &amp; test**.                         |
| No metrics in the time range | Expand the dashboard time range. The metric list is based on the current time range. |
| Insufficient permissions     | Verify the access key has permissions to query metrics metadata.                     |
| Timeout                      | Increase the **Timeout** value in the data source configuration.                     |

## Alerting issues

These issues are specific to using Grafana alerting with the Sumo Logic data source.

### Alert rule fails to evaluate

**Symptoms:**

- Alert rule shows an error state.
- Alert evaluation fails with a query error.

**Possible causes and solutions:**

Expand table

| Cause                  | Solution                                                                                                                                             |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| Using a raw logs query | Alert rules require numeric data. Use a metrics query or an aggregated logs query that returns numeric results (for example, `count`, `avg`, `sum`). |
| Query returns no data  | Verify the query returns data in the current time range. Test the query in Explore first.                                                            |
| Query timeout          | Simplify the query or increase the **Timeout** value in the data source configuration.                                                               |
| Invalid query syntax   | Test the query in a dashboard panel or Explore before using it in an alert rule.                                                                     |

### Alert doesn’t fire

**Symptoms:**

- The alert rule evaluates successfully but never transitions to a firing state.

**Solutions:**

1. Verify the threshold condition matches the expected data values. Test the query in Explore to see the actual values.
2. Check the evaluation interval and pending period. The condition must be true for the entire pending period before the alert fires.
3. Verify the reducer (for example, **Last**, **Mean**, **Max**) is appropriate for your query results.

## Annotation issues

These issues are specific to using annotations with the Sumo Logic data source.

### Annotations don’t appear on panels

**Symptoms:**

- Annotation query is configured but no markers appear on time-series panels.

**Possible causes and solutions:**

Expand table

| Cause                       | Solution                                                                                      |
|-----------------------------|-----------------------------------------------------------------------------------------------|
| Annotation is disabled      | Verify the annotation is enabled in **Dashboard settings** &gt; **Annotations**.              |
| Query returns no data       | Test the annotation query in Explore to verify it returns results for the current time range. |
| Wrong panel type            | Annotations only display on time-series panels. Verify you’re using a supported panel type.   |
| Field mapping misconfigured | Check that the time, text, and tags fields are mapped correctly in the annotation settings.   |

### Too many annotations

**Symptoms:**

- Dashboard is slow due to a large number of annotation markers.

**Solutions:**

1. Add filters to the annotation query to reduce the number of results.
2. Narrow the dashboard time range.
3. Use aggregation in the query to group events instead of showing each one individually.

## Plugin errors

These errors indicate internal plugin issues.

### “recovered from panic”

**Symptoms:**

- A query fails with a “recovered from panic” error.

**Solutions:**

1. This is an internal plugin error. Retry the query.
2. If the error persists, simplify the query to identify what triggers the issue.
3. Check the Grafana server logs for the full stack trace, which provides more detail for bug reports.
4. Report the issue to [Grafana Support](/profile/org#support) with the stack trace and query details.

## Enable debug logging

To capture detailed error information for troubleshooting:

1. Set the Grafana log level to `debug` in the configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Review logs in `/var/log/grafana/grafana.log` (or your configured log location).
3. Look for entries containing `sumologic` for request and response details.
4. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## Get additional help

If you’ve tried these solutions and still encounter issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Review the [Sumo Logic documentation](https://help.sumologic.com/) for service-specific guidance.
3. Contact [Grafana Support](/profile/org#support) if you’re an Enterprise, Cloud Pro, or Cloud Advanced user.
4. When reporting issues, include:

   - Grafana version and plugin version
   - Error messages (redact sensitive information)
   - Steps to reproduce
   - Relevant configuration (redact credentials)
