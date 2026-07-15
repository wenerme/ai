---
title: "Troubleshoot Dynatrace data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshooting common issues with the Dynatrace data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Dynatrace data source issues

This document provides guidance for troubleshooting common issues when configuring and using the Dynatrace data source in Grafana.

## Before you begin

Before investigating specific errors, verify that the data source health check passes:

1. Go to **Connections** &gt; **Data sources** and select your Dynatrace data source.
2. Click **Save &amp; test**.
3. Confirm you see a “Success!” message.

If the health check fails, start with the [Configuration errors](#configuration-errors) or [Connection errors](#connection-errors) sections.

## Configuration errors

Configuration errors occur when required fields are missing or contain invalid values during data source setup.

### The configuration setup is incomplete

This error appears when required configuration fields are missing. Verify that you have provided all required fields based on your API type:

Expand table

| Error message                                                                                                     | Solution                                                                                                                                                                                                                                                                                                         |
|-------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Enter an environment ID. This can usually be taken from the account URL: \[environmentId].live.dynatrace.com.** | Provide your Dynatrace environment ID. For SaaS, extract it from your URL (e.g., `yfc55578` from `yfc55578.live.dynatrace.com`). For Managed, use the environment ID from the path (e.g., `abc99984-3af2-55tt-72kl-0672983gc45` from `yd8888.managed-sprint.dynalabs.io/e/abc99984-3af2-55tt-72kl-0672983gc45`). |
| **Enter an API token.**                                                                                           | Provide a valid Dynatrace API token. Refer to the [Get an API key from Dynatrace](/docs/plugins/grafana-dynatrace-datasource/latest/configure/#get-an-api-key-from-dynatrace) section for instructions.                                                                                                          |
| **Enter a domain URL.**                                                                                           | When using **Managed Cluster** API type, you must provide the domain of your Dynatrace server (e.g., `dynatrace.yourcompany.com`).                                                                                                                                                                               |
| **invalid API Token**                                                                                             | The API token field is empty or contains only whitespace. Enter a valid API token.                                                                                                                                                                                                                               |
| **invalid TLS certificate**                                                                                       | You enabled **Add self-signed certificate** but did not provide a CA certificate. Either provide the certificate or disable the option.                                                                                                                                                                          |
| **failed to parse TLS CA PEM certificate**                                                                        | The CA certificate you provided is not in valid PEM format. Ensure the certificate begins with `-----BEGIN CERTIFICATE-----` and ends with `-----END CERTIFICATE-----`.                                                                                                                                          |

## Connection errors

Connection errors occur when Grafana cannot successfully communicate with the Dynatrace API.

### Unauthorized (401)

**Error message:** “The credentials are incorrect. Check that the API token is correct.”

**Cause:** The API token is invalid, expired, or does not have the required permissions.

**Solution:**

1. Verify that your API token is correct and has not been revoked.
2. Check that the token has the required scopes for the services you want to query. Refer to [Get an API key from Dynatrace](/docs/plugins/grafana-dynatrace-datasource/latest/configure/#get-an-api-key-from-dynatrace) for the complete list of required scopes.
3. Generate a new API token if the current one has been compromised or revoked.

### Forbidden (403)

**Cause:** The API token is valid but lacks the required scopes for the requested operation, or the operation is not permitted in your Dynatrace environment.

**Solution:**

1. Check that your API token has all the required scopes for the query type you’re using. Refer to [Get an API key from Dynatrace](/docs/plugins/grafana-dynatrace-datasource/latest/configure/#get-an-api-key-from-dynatrace) for required scopes.
2. Verify your Dynatrace environment allows the requested API operation.
3. Contact your Dynatrace administrator if you need additional permissions.

### Not Found (404)

**Error message:** “Could not connect to Dynatrace. This usually happens when the environment ID is not correct.”

**Cause:** The environment ID or URL configuration is incorrect.

**Solution:**

1. For **SaaS Environment**: Verify your environment ID matches the subdomain of your Dynatrace URL.
2. For **Managed Cluster**: Verify both the domain and environment ID are correct.
3. For **Raw URL**: Ensure the complete URL is accessible and correctly formatted.

### Internal Server Error (500)

**Error message:** “There was a problem with connecting to Dynatrace.”

**Cause:** The Dynatrace server encountered an error processing the request.

**Solution:**

1. Check the Dynatrace service status.
2. Verify your network connectivity to the Dynatrace server.
3. Review the Grafana server logs for additional error details.
4. Try the request again after a few minutes.

### Too Many Requests (429)

**Cause:** Your requests have exceeded the Dynatrace API rate limits.

**Solution:**

1. Reduce the frequency of queries by increasing the refresh interval on your dashboards.
2. Simplify queries to reduce the number of API calls.
3. Stagger dashboard refresh times to avoid simultaneous requests.
4. Contact Dynatrace support if you need higher rate limits.

### There was a problem with connecting to Dynatrace

This is a generic fallback error that appears when the connection fails for an unspecified reason.

**Solution:**

1. Verify network connectivity between Grafana and Dynatrace.
2. Check firewall rules and proxy settings.
3. If using a self-hosted Dynatrace instance, verify the server is running and accessible.
4. Check the Grafana server logs for more detailed error information.

### Proxy configuration issues

If your Grafana instance connects to the internet through a proxy, you may experience connection failures.

**Solution:**

1. Configure the proxy settings in Grafana. Refer to [Configure Grafana](/docs/grafana/latest/setup-grafana/configure-grafana/) for proxy configuration options.
2. Ensure the proxy allows connections to your Dynatrace environment URL.
3. If using HTTPS inspection, add your Dynatrace domain to the proxy bypass list or configure the appropriate CA certificates.
4. Verify the proxy does not modify or block API responses.

## TLS and certificate errors

TLS errors occur when there are issues with SSL/TLS certificates during secure connections to Dynatrace.

### TLS verification failures

If you’re connecting to a Dynatrace instance with a self-signed certificate or a certificate signed by an internal CA:

1. Enable **Skip TLS certificate validation** to bypass certificate validation (not recommended for production).
2. Or, enable **Add self-signed certificate** and provide your CA certificate in PEM format:

[Copy code to clipboard] Copy

```none
-----BEGIN CERTIFICATE-----
MIIDdzCCAl+gAwIBAgIEbV...
-----END CERTIFICATE-----
```

### Certificate parsing errors

If you receive “failed to parse TLS CA PEM certificate”:

1. Ensure the certificate is in PEM format (not DER or other formats).
2. Include the full certificate chain if required.
3. Remove any extra whitespace or characters before/after the certificate block.

## Query errors

Query errors occur when there are issues with the structure, syntax, or parameters of your Dynatrace queries.

### No metric specified

**Cause:** The metric query was sent without a metric selector.

**Solution:**

1. In Builder mode, select a metric from the drop-down.
2. In Code mode, provide a valid metric selector.

### No metric found using the Metric Id

**Error message:** `No metric found using the Metric Id "[metric.name]".`

**Cause:** The specified metric does not exist or is not accessible with your current permissions.

**Solution:**

1. Verify the metric name is correct using the Dynatrace web UI.
2. Check that your API token has the `Read metrics` scope.
3. Ensure the metric is available in your Dynatrace environment.

### Unrecognized request type

**Cause:** The query type specified is not supported by the plugin.

**Solution:** Verify you are using a supported query type: `metric`, `problem`, `logs`, `auditlogs`, `usql`, `rawurl`, or `managementZones`.

### HTML response received from Dynatrace API

**Error message:** “HTML response received from Dynatrace API. Status: \[status code]”

**Cause:** The Dynatrace API returned an HTML page instead of JSON. This typically occurs when:

- The API token has expired or been revoked
- The environment has been deactivated
- There’s a redirect or authentication issue

**Solution:**

1. Verify your API token is still valid.
2. Check that your Dynatrace environment is active.
3. Verify the environment ID and URL are correct.
4. Check for any redirects or authentication requirements in your network path.

### Error loading cache

**Cause:** The plugin failed to load metric metadata from Dynatrace.

**Solution:**

1. Verify your connection settings are correct.
2. Check that your API token has the required permissions.
3. Try refreshing the page or reconnecting the data source.

### Request URI Too Long

**Cause:** The generated query URL exceeds the maximum allowed length.

**Solution:**

1. Simplify your query by reducing the number of filters or dimensions.
2. Use shorter time ranges.
3. Split complex queries into multiple smaller queries.

### USQL query syntax errors

**Cause:** The User Session Query Language (USQL) query contains syntax errors or references invalid fields.

**Solution:**

1. Verify your USQL query syntax in the Dynatrace web UI under **User sessions**.
2. Check that all field names are valid and correctly spelled.
3. Ensure your API token has the `User sessions` scope.
4. Refer to the [Dynatrace USQL documentation](https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language) for query syntax help.

## No data returned

If your query executes successfully but returns no data, check the following common causes.

### Time range mismatch

**Cause:** The selected time range in Grafana doesn’t contain any data in Dynatrace.

**Solution:**

1. Verify data exists for the selected time range in the Dynatrace web UI.
2. Expand the time range to confirm data is available.
3. Check if the metric or entity has been recently created and doesn’t have historical data.

### Filters too restrictive

**Cause:** The applied filters exclude all available data.

**Solution:**

1. Remove filters one at a time to identify which filter is excluding data.
2. Verify filter values match the actual data in Dynatrace.
3. Check that template variables resolve to valid values.

### Data not collected in Dynatrace

**Cause:** The requested metric or data type is not being collected by Dynatrace.

**Solution:**

1. Verify the metric exists in the Dynatrace web UI under **Metrics**.
2. Check that the relevant OneAgent or ActiveGate is running and reporting data.
3. Confirm the monitored entity is active and sending data.

## Timeout issues

Timeout issues occur when requests to the Dynatrace API take too long to complete.

### Request timeout

**Cause:** The request took longer than the configured timeout (default: 30 seconds).

**Solution:**

1. Increase the **Timeout** setting in the data source configuration.
2. Simplify your query to return less data.
3. Use a shorter time range.
4. Add filters to reduce the amount of data returned.

## Alerting issues

Issues can occur when using Dynatrace data for Grafana alerts.

### Alerts not firing

**Cause:** The alert query returns data in a format that Grafana alerting cannot evaluate.

**Solution:**

1. Ensure your query returns numeric data that can be evaluated against a threshold.
2. Use the **Reduce** expression in the alert rule to aggregate multiple series into a single value.
3. Verify the query returns data within the alert evaluation time range.
4. Check the alert rule state in **Alerting** &gt; **Alert rules** for evaluation errors.

### Alert evaluation errors

**Cause:** The alert query fails during evaluation, often due to timeouts or data format issues.

**Solution:**

1. Simplify the query to reduce evaluation time.
2. Increase the **Timeout** setting in the data source configuration.
3. Verify the query works correctly in the Explore view before using it in an alert.
4. Check Grafana server logs for detailed error messages.

## Known limitations

The following are known limitations when using the Dynatrace data source.

### Multi-value template variables

Support for multi-value template variables varies by query type. Test your specific use case to verify compatibility.

### Logs query type is in beta

The Logs query type is in beta because the underlying Dynatrace API is an early adopter release. You may experience changes in behavior or API responses.

### Logs aggregate mode

Aggregate mode for Logs queries is not yet supported.

### Management zones require additional scope

Querying management zones requires the `Read configuration` scope, which is not included in the minimum required scopes.

**Solution:** Add the `Read configuration` scope to your API token if you need to use management zone filters.

## Other common errors

The following errors may occur during normal usage.

### No matching dimension found for key

**Cause:** A filter key specified in your query does not match any available dimension for the selected metric.

**Solution:**

1. Verify the dimension name is correct.
2. Check available dimensions for your metric in the Dynatrace web UI.
3. Ensure template variables resolve to valid dimension names.

### No metric named \[name] found

**Cause:** The specified metric does not exist or cannot be found.

**Solution:**

1. Verify the metric name in the Dynatrace web UI.
2. Check for typos in the metric name.
3. Ensure the metric is available in your environment.

## Debugging tips

Use these techniques to gather more information when diagnosing issues with the Dynatrace data source.

### Enable debug logging

To get more detailed error information, enable debug logging in Grafana:

1. Update your Grafana configuration file (`grafana.ini` or environment variables):

ini [Copy code to clipboard] Copy

```ini
[log]
level = debug
```

1. Restart Grafana and reproduce the issue.
2. Check the Grafana server logs for detailed error messages.

### View executed queries

When a query fails, check the **Query Inspector** in Grafana:

1. Open your dashboard panel.
2. Click the panel title and select **Inspect** &gt; **Query**.
3. Review the executed query string to verify it’s formatted correctly.

### Test connectivity manually

You can test connectivity to your Dynatrace API using curl:

Bash [Copy code to clipboard] Copy

```bash
curl -X GET "https://[environment-id].live.dynatrace.com/api/v2/metrics" \
  -H "Authorization: Api-Token [your-api-token]"
```

Replace `[environment-id]` and `[your-api-token]` with your actual values. A successful response confirms your credentials and network connectivity are working.

## Get additional help

If you continue to experience issues after following this troubleshooting guide:

1. Check the [Dynatrace documentation](https://docs.dynatrace.com/) for API-specific guidance.
2. Review the [Grafana community forums](https://community.grafana.com/) for similar issues.
3. Contact Grafana Support if you’re an Enterprise, Cloud Pro or Cloud Contracted user.
4. When reporting issues, include:

- Grafana version
- Error messages (redact sensitive information)
- Steps to reproduce
- Relevant configuration (redact credentials)
