---
title: "Troubleshoot the Datadog data source | Grafana Enterprise Plugins documentation"
description: "Troubleshoot common issues with the Datadog data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot the Datadog data source

This guide helps you resolve common issues that you might encounter when configuring or using the Datadog data source.

## Configuration issues

These issues typically occur during initial setup or when modifying data source settings.

### The configuration setup is incomplete

This error appears when required fields are missing from your data source configuration.

**Possible causes:**

- Missing API key
- Missing App key
- Missing URL

**Solution:**

Verify that you have entered all required fields in the data source configuration:

1. Go to **Connections** &gt; **Data sources**.
2. Select your Datadog data source.
3. Confirm that the following fields are populated:

   - **API URL / Region** - Your Datadog site URL or region.
   - **API key** - Your Datadog API key.
   - **App key** - Your Datadog Application key.
4. Click **Save &amp; test** to verify the connection.

For instructions on generating API and App keys, refer to [Add an API key or client token](https://docs.datadoghq.com/account_management/api-app-keys/#add-an-api-key-or-client-token) and [Add application keys](https://docs.datadoghq.com/account_management/api-app-keys/?s=data%20dog%20data%20lnks#add-application-keys) in the Datadog documentation.

## Authentication errors

Authentication errors occur when the plugin cannot validate your credentials with the Datadog API.

### Forbidden (403)

This error indicates that the credentials provided are incorrect or have insufficient permissions.

**Possible causes:**

- Incorrect API key
- Incorrect App key
- API key or App key has been revoked
- Insufficient permissions for the requested operation

**Solution:**

1. Verify that both your API key and App key are correct.
2. Confirm that the keys have not been revoked in your Datadog account.
3. Ensure that the App key has the required scopes for the operations you want to perform:

   - For monitor queries, the App key requires the `monitors_read` scope.
   - For other queries, verify that appropriate permissions are granted.

### Unauthorized (401)

This error indicates that the API request was not authenticated.

**Possible causes:**

- Invalid API key format
- Expired or deactivated credentials

**Solution:**

1. Regenerate your API key and App key in Datadog.
2. Update the credentials in your Grafana data source configuration.
3. Click **Save &amp; test** to verify the new credentials work correctly.

### Unable to retrieve datasource

This error indicates that Grafana cannot load the data source configuration.

**Solution:**

1. Refresh the page and try again.
2. If the issue persists, delete the data source and create a new one.
3. Check Grafana server logs for additional error details.

## Connection issues

Connection issues prevent the plugin from communicating with the Datadog API.

### There was a problem with connecting to Datadog

This generic error appears when the plugin cannot establish a connection to Datadog.

**Possible causes:**

- Network connectivity issues
- Incorrect API URL
- Firewall blocking outbound connections
- Datadog API outage

**Solution:**

1. Verify that the API URL matches your Datadog region. Common URLs include:

   - US1: `https://api.datadoghq.com`
   - US3: `https://us3.datadoghq.com`
   - US5: `https://us5.datadoghq.com`
   - EU: `https://api.datadoghq.eu`
   - AP1: `https://ap1.datadoghq.com`
2. Confirm that your Grafana server can reach the Datadog API endpoints.
3. Check if a firewall or proxy is blocking outbound HTTPS connections.
4. Verify the [Datadog status page](https://status.datadoghq.com/) for any ongoing incidents.

### Unable to retrieve metrics

This error appears when the plugin connects to Datadog but cannot fetch the metrics list.

**Possible causes:**

- API key permissions are insufficient
- Network timeout during metrics retrieval

**Solution:**

1. Verify that your API key has permissions to access metrics.
2. Check if the metrics endpoint is accessible from your network.
3. Try reducing the **Size** setting in additional settings to limit the number of metrics returned.

## Rate limiting issues

Rate limiting protects the Datadog API from excessive requests. When you exceed the allowed request rate, queries may fail or be blocked.

### 429 Too Many Requests

This error indicates that you have exceeded the Datadog API rate limits.

**Solution:**

1. Reduce the frequency of queries by:

   - Increasing dashboard refresh intervals.
   - Reducing the number of panels querying Datadog simultaneously.
   - Using fewer variables that trigger multiple API calls.
2. Enable rate limit thresholds in the data source configuration:

   1. Go to **Connections** &gt; **Data sources**.
   2. Select your Datadog data source.
   3. Expand **Additional settings**.
   4. Check **Enable API rate limit threshold**.
   5. Set a threshold percentage (for example, 80%) to block requests before hitting the hard limit.
3. Monitor your API usage in the Query Inspector:

   1. Open a panel and click **Inspect** &gt; **Query**.
   2. Select **JSON** and set the source to **DataFrame structure** to view rate limit information.

For more information, refer to [Rate Limits](https://docs.datadoghq.com/api/latest/rate-limits/#rate-limits) in the Datadog documentation.

## Query issues

Query issues affect specific queries or query types.

### No data returned

When a query returns no data, the issue may be with the query configuration or the time range.

**Possible causes:**

- Incorrect metric name
- No data exists for the selected time range
- Tag filters are too restrictive

**Solution:**

1. Verify that the metric exists in Datadog.
2. Expand the time range to confirm that data exists.
3. Remove tag filters to test if data appears, then add filters back one at a time.
4. Use the **Raw query** type to test your query syntax.

### Arithmetic query errors

Arithmetic queries only work with other Datadog metric queries.

**Possible causes:**

- Referencing a non-metric query type (for example, Logs, RUM, or Monitors)
- Referencing a query that does not exist

**Solution:**

1. Confirm that all referenced queries (for example, `#A`, `#B`) are metric-type queries (Query, Raw query, or Arithmetic).
2. Verify that the referenced query letters match existing queries in your panel.

### Monitor queries return limited results

Due to API limitations, monitor queries return only the top *n* monitors specified by the **Items per page** setting.

**Solution:**

1. Use more specific filter queries to narrow down results.
2. Increase the **Items per page** setting if you need to see more monitors.

### RUM or Logs queries return maximum 1000 events

RUM and Logs queries have a built-in limit of 1000 events per query.

**Solution:**

This is a platform limitation. To work around it:

1. Use more specific query filters to reduce the result set.
2. Use aggregate queries instead of search queries when you need summary data.
3. Reduce the time range to return fewer events.

## Variable issues

Issues with template variables can affect multiple panels across a dashboard.

### Variable query returns no values

When a variable query returns an empty list, panels using that variable show no data.

**Possible causes:**

- Incorrect variable query syntax
- The tag or metric specified does not exist

**Solution:**

1. Verify the variable query syntax. Valid queries include:

   - `all-metrics` - Returns all available metrics
   - `all-tags` - Returns all tags (maximum 1000)
   - `all-hosts` - Returns all hosts
   - `[metric]:all-tags` - Returns all tags for a specific metric
2. Test the metric or tag name directly in a panel query to confirm it exists.

### Ad-hoc filters not working

Ad-hoc filters only work with metric query types.

**Solution:**

Confirm that panels using ad-hoc filters are using one of the following query types:

- Query
- Raw query
- Arithmetic

Ad-hoc filters do not apply to Logs, RUM, Monitor, Events, or SLO queries.

## Get additional help

If you continue to experience issues:

- Check the [Grafana community forums](https://community.grafana.com/) for similar issues and solutions.
- Review the [Datadog API documentation](https://docs.datadoghq.com/api/latest/) for API-specific issues.
- Contact [Grafana Support](/support/) if you’re an Enterprise, Cloud Pro, or Cloud contracted customer.

When reporting issues, include the following information:

- Grafana version
- Datadog site or region (US1, US3, US5, EU, AP1)
- Connection mode (Default or Hosted Datadog metrics)
- Error messages (redact sensitive information)
- Steps to reproduce the issue
- Relevant configuration such as data source settings, rate limit settings, and timeout values (redact API keys and App keys)
- Sample query (if applicable, with sensitive data redacted)
