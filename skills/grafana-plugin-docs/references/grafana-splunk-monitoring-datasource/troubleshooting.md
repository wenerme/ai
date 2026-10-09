---
title: "Troubleshoot Splunk Infrastructure Monitoring data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshoot common issues with the Splunk Infrastructure Monitoring data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Splunk Infrastructure Monitoring data source issues

This page provides solutions to common issues you might encounter when you configure or use the Splunk Infrastructure Monitoring data source. The sections follow the order in which you typically set up and use the data source: connection, authentication, configuration, queries, template variables, and annotations.

## Connection issues

Connection issues prevent the plugin from communicating with the Splunk Observability Cloud API.

### Unable to connect to Splunk Observability Cloud

This error appears when the plugin can’t establish a connection to the Splunk Observability Cloud API.

**Possible causes:**

- Network connectivity issues
- Incorrect realm configuration
- Firewall blocking outbound connections
- Custom URL misconfiguration

**Solution:**

1. Verify that the realm name is correct.
2. If you use custom URLs, confirm that the URLs are formatted correctly:

   - Metrics Metadata URL: `https://api.{REALM}.signalfx.com`
   - SignalFlow URL: `https://stream.{REALM}.signalfx.com`
3. Confirm that your Grafana server can reach the Splunk Observability Cloud API endpoints.
4. Check whether a firewall or proxy is blocking outbound HTTPS connections.
5. If you use a secure socks proxy, verify the proxy configuration.

### Custom URL errors

Errors can occur when custom URLs are incorrectly configured.

**Possible causes:**

- Malformed URL
- Incorrect protocol, such as HTTP instead of HTTPS
- URL doesn’t match the expected Splunk Observability Cloud endpoints

**Solution:**

1. Verify that custom URLs use the HTTPS protocol.
2. Confirm the URL format matches the expected pattern for your realm, on either the `signalfx.com` or `observability.splunkcloud.com` domain.
3. If you don’t need custom URLs, clear the custom URL fields to use the default endpoints for your realm.

## Authentication errors

Authentication errors occur when the plugin can’t validate your credentials with the Splunk Observability Cloud API.

### `invalid/empty access token`

This error indicates that the access token field is empty or wasn’t saved.

**Possible causes:**

- The access token wasn’t entered during configuration.
- The access token wasn’t saved properly.

**Solution:**

1. Go to **Connections** &gt; **Data sources**.
2. Select your Splunk Infrastructure Monitoring data source.
3. Enter a valid access token in the **Access Token** field.
4. Click **Save &amp; test** to verify the connection.

For instructions on generating access tokens, refer to [Authentication tokens](https://help.splunk.com/en/splunk-observability-cloud/administer/authentication-and-security/authentication-tokens) in the Splunk documentation.

### `expected 200 status but got 401`

This error indicates that the access token is incorrect, has expired, or lacks the required permissions.

**Possible causes:**

- The access token is incorrect, expired, or revoked.
- The access token doesn’t have sufficient permissions for the requested operation.

**Solution:**

1. Verify that the access token is correct.
2. Check whether the token is expired or revoked in your Splunk Observability Cloud account.
3. Verify the token scope. Splunk Observability Cloud provides two token types:

   - **Organization (org) access tokens** are long-lived tokens. Create an org token with the API authentication scope and associate at least one role, such as `power`, `usage`, or `read_only`.
   - **User API access (session) tokens** are short-lived tokens tied to a user.
4. If necessary, generate a new access token with appropriate permissions.
5. Update the access token in your Grafana data source configuration.
6. Click **Save &amp; test** to verify that the new token works correctly.

For more information about token types and scopes, refer to [Authentication tokens](https://help.splunk.com/en/splunk-observability-cloud/administer/authentication-and-security/authentication-tokens) in the Splunk documentation.

## Configuration issues

These issues typically occur during initial setup or when you modify data source settings.

### Invalid realm configuration

This error occurs when the realm name doesn’t match your Splunk Observability Cloud deployment.

**Possible causes:**

- Incorrect realm name entered
- Realm name is missing

**Solution:**

1. Sign in to Splunk Observability Cloud.
2. Open the navigation menu, select **Settings**, and then select your username. The realm name appears in the **Organizations** section.
3. Update the **Realm Name** field in your data source configuration with the correct value, for example `us0`, `us1`, `us2`, `eu0`, `eu1`, `eu2`, `au0`, `jp0`, or `sg0`.
4. Click **Save &amp; test** to verify the connection.

## Query issues

Query issues affect specific SignalFlow queries.

### No data returned

When a query returns no data, the issue might be with the query configuration or the time range.

**Possible causes:**

- SignalFlow query syntax error
- Metric doesn’t exist
- No data exists for the selected time range
- Filters are too restrictive

**Solution:**

1. Verify that the SignalFlow query syntax is correct. Refer to [SignalFlow analytics](https://help.splunk.com/en/splunk-observability-cloud/signalflow-analytics/signalflow-analytics) for a syntax reference.
2. Confirm that the metric name exists in your Splunk Observability Cloud account.
3. Expand the time range to verify that data exists.
4. Remove filters from your query to test whether data appears, then add filters back one at a time.
5. Check the query inspector for detailed error messages.

### SignalFlow syntax errors

Syntax errors prevent the query from executing.

**Possible causes:**

- Missing parentheses or quotes
- Invalid function names
- Incorrect filter syntax

**Solution:**

1. Review the SignalFlow query for common syntax issues:

   - Ensure all parentheses are balanced.
   - Use single quotes for string values in filters.
   - Verify that function names are spelled correctly.
2. Test your query in Splunk Observability Cloud to validate the syntax.
3. Refer to the [SignalFlow reference documentation](https://dev.splunk.com/observability/docs/signalflow/) for correct syntax.

Example of correct filter syntax:

signalflow [Copy code to clipboard] Copy

```signalflow
data('cpu.utilization', filter=filter('host', 'server1')).publish()
```

### Ad hoc filters not applying

The **Ad hoc filters** variable might not appear to affect query results.

**Possible causes:**

- The dimension key doesn’t exist in the data.
- Filter values don’t match any data points.

**Solution:**

1. Verify that the dimension key used in the **Ad hoc filters** variable exists in your metrics.
2. Confirm that the filter value matches actual values in your data.
3. Check the query inspector to see the modified query with applied filters.

## Template variable issues

Issues with template variables can affect multiple panels across a dashboard.

### Metrics variable returns no values

When a metrics variable query returns an empty list, panels using that variable show no data.

**Possible causes:**

- No metrics are available in your account.
- The access token doesn’t have permission to list metrics.

**Solution:**

1. Verify that metrics exist in your Splunk Observability Cloud account.
2. Check that your access token has permission to query metrics.
3. Test the connection using **Save &amp; test** in the data source configuration.

### Dimensions variable returns no values

When a dimensions variable query returns an empty list, panels using that variable show no data.

**Possible causes:**

- No dimensions are available.
- The Dimensions Query filter is too restrictive.
- The selected Dimension Name doesn’t exist.

**Solution:**

1. Clear the **Dimensions Query** field to return all dimensions.
2. Clear the **Dimension Name** selection to return dimension keys instead of values.
3. Verify that the dimension exists in your Splunk Observability Cloud account.
4. If you use a Dimensions Query, verify the syntax. For example: `region:us1 AND hostname:france-*`.

### Tags variable returns no values

When a tags variable query returns an empty list, panels using that variable show no data.

**Possible causes:**

- No tags are defined in your account.
- The access token doesn’t have permission to list tags.

**Solution:**

1. Verify that tags exist in your Splunk Observability Cloud account.
2. Check that your access token has permission to query tags.

## Annotation issues

Issues with annotations can prevent alerts or events from displaying on your dashboards.

### Alerts annotation returns no data

When an alerts annotation query returns no results, no alerts appear on your dashboard.

**Possible causes:**

- No alerts exist for the specified detector.
- The detector name is incorrect.
- No alerts triggered during the selected time range.

**Solution:**

1. Verify that the detector name is correct and exists in your Splunk Observability Cloud account.
2. Expand the time range to include periods when alerts were triggered.
3. Verify the query syntax:

signalflow [Copy code to clipboard] Copy

```signalflow
alerts(detector_name='YourDetectorName').publish()
```

### Events annotation returns no data

When an events annotation query returns no results, no events appear on your dashboard.

**Possible causes:**

- No events exist for the specified event type.
- The event type name is incorrect.
- No events occurred during the selected time range.

**Solution:**

1. Verify that the event type name is correct.
2. Expand the time range to include periods when events occurred.
3. Verify the query syntax:

signalflow [Copy code to clipboard] Copy

```signalflow
events(eventType='YourEventType').publish()
```

## Get additional help

If you continue to experience issues:

- Check the [Grafana community forums](https://community.grafana.com/) for similar issues and solutions.
- Review the [Splunk Infrastructure Monitoring documentation](https://help.splunk.com/en/splunk-observability-cloud/monitor-infrastructure/key-concepts) for API-specific issues.
- Contact [Grafana Support](/support/) if you have a Grafana Enterprise license or a Grafana Cloud Pro or Advanced plan.

When you report issues, include the following information:

- Grafana version
- Plugin version
- Realm name
- Error messages, with sensitive information redacted
- Steps to reproduce the issue
- Sample SignalFlow query, if applicable
