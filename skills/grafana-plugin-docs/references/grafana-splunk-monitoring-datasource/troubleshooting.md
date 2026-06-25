---
title: "Troubleshoot the Splunk Infrastructure Monitoring data source | Grafana Enterprise Plugins documentation"
description: "Troubleshoot common issues with the Splunk Infrastructure Monitoring data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot the Splunk Infrastructure Monitoring data source

This page provides solutions to common issues you might encounter when configuring or using this data source.

## Configuration issues

These issues typically occur during initial setup or when modifying data source settings.

### Missing access token

This error appears when the access token field is empty or not configured.

**Possible causes:**

- Access token was not entered during configuration
- Access token was not saved properly

**Solution:**

1. Go to **Connections** &gt; **Data sources**.
2. Select your Splunk Infrastructure Monitoring data source.
3. Enter a valid access token in the **Access Token** field.
4. Click **Save &amp; test** to verify the connection.

For instructions on generating access tokens, refer to [Authentication tokens](https://docs.signalfx.com/en/latest/admin-guide/tokens.html) in the Splunk documentation.

### Invalid realm configuration

This error occurs when the realm name does not match your Splunk Infrastructure Monitoring deployment.

**Possible causes:**

- Incorrect realm name entered
- Realm name is missing

**Solution:**

1. Sign in to the SignalFx user interface.
2. Navigate to your profile page to find your realm name.
3. Update the **Realm Name** field in your data source configuration with the correct value (for example, `us0`, `us1`, `us2`, `eu0`, or `ap0`).
4. Click **Save &amp; test** to verify the connection.

## Authentication errors

Authentication errors occur when the plugin cannot validate your credentials with the Splunk Infrastructure Monitoring API.

### Invalid or expired access token

This error indicates that the access token provided is incorrect or has expired.

**Possible causes:**

- Access token is incorrect
- Access token has expired
- Access token has been revoked

**Solution:**

1. Verify that the access token is correct.
2. Check if the token has expired or been revoked in your Splunk Infrastructure Monitoring account.
3. If necessary, generate a new access token.
4. Update the access token in your Grafana data source configuration.
5. Click **Save &amp; test** to verify the new token works correctly.

### Insufficient permissions

This error occurs when the access token does not have the required permissions for the requested operation.

**Possible causes:**

- The access token type does not have sufficient permissions
- API access is restricted for your account

**Solution:**

1. Verify the access token type. Different token types have different permissions:

   - **Org tokens** have full API access.
   - **Team tokens** have limited access based on team permissions.
   - **User API access tokens** have permissions based on the user’s role.
2. Generate a new token with appropriate permissions if needed.
3. Update your data source configuration with the new token.

## Connection issues

Connection issues prevent the plugin from communicating with the Splunk Infrastructure Monitoring API.

### Unable to connect to Splunk Infrastructure Monitoring

This error appears when the plugin cannot establish a connection to the Splunk Infrastructure Monitoring API.

**Possible causes:**

- Network connectivity issues
- Incorrect realm configuration
- Firewall blocking outbound connections
- Custom URL misconfiguration

**Solution:**

1. Verify that the realm name is correct.
2. If using custom URLs, confirm that the URLs are formatted correctly:

   - Metrics Metadata URL: `https://api.{REALM}.signalfx.com`
   - SignalFlow URL: `https://stream.{REALM}.signalfx.com`
3. Confirm that your Grafana server can reach the Splunk Infrastructure Monitoring API endpoints.
4. Check if a firewall or proxy is blocking outbound HTTPS connections.
5. If using a secure socks proxy, verify the proxy configuration.

### Custom URL errors

Errors may occur when custom URLs are incorrectly configured.

**Possible causes:**

- Malformed URL
- Incorrect protocol (HTTP instead of HTTPS)
- URL does not match the expected Splunk Infrastructure Monitoring endpoints

**Solution:**

1. Verify that custom URLs use the HTTPS protocol.
2. Confirm the URL format matches the expected pattern for your realm.
3. If you do not need custom URLs, clear the custom URL fields to use the default behavior.

## Query issues

Query issues affect specific SignalFlow queries.

### No data returned

When a query returns no data, the issue may be with the query configuration or the time range.

**Possible causes:**

- SignalFlow query syntax error
- Metric does not exist
- No data exists for the selected time range
- Filters are too restrictive

**Solution:**

1. Verify that the SignalFlow query syntax is correct. Refer to [SignalFlow Analytics Language](https://docs.signalfx.com/en/latest/getting-started/concepts/analytics-signalflow.html) for syntax reference.
2. Confirm that the metric name exists in your Splunk Infrastructure Monitoring account.
3. Expand the time range to verify that data exists.
4. Remove filters from your query to test if data appears, then add filters back one at a time.
5. Check the Query Inspector for detailed error messages.

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
   - Verify function names are spelled correctly.
2. Test your query in the SignalFx user interface to validate the syntax.
3. Refer to the [SignalFlow reference documentation](https://dev.splunk.com/observability/docs/signalflow/) for correct syntax.

Example of correct filter syntax:

signalflow [Copy code to clipboard] Copy

```signalflow
data('cpu.utilization', filter=filter('host', 'server1')).publish()
```

### Ad-hoc filters not applying

Ad-hoc filters may not appear to affect query results.

**Possible causes:**

- The dimension key does not exist in the data
- Filter values do not match any data points

**Solution:**

1. Verify that the dimension key used in the ad-hoc filter exists in your metrics.
2. Confirm that the filter value matches actual values in your data.
3. Check the Query Inspector to see the modified query with applied filters.

## Variable issues

Issues with template variables can affect multiple panels across a dashboard.

### Metrics variable returns no values

When a metrics variable query returns an empty list, panels using that variable show no data.

**Possible causes:**

- No metrics are available in your account
- Access token does not have permission to list metrics

**Solution:**

1. Verify that metrics exist in your Splunk Infrastructure Monitoring account.
2. Check that your access token has permission to query metrics.
3. Test the connection using **Save &amp; test** in the data source configuration.

### Dimensions variable returns no values

When a dimensions variable query returns an empty list.

**Possible causes:**

- No dimensions are available
- The Dimensions Query filter is too restrictive
- The selected Dimension Name does not exist

**Solution:**

1. Clear the **Dimensions Query** field to return all dimensions.
2. Clear the **Dimension Name** selection to return dimension keys instead of values.
3. Verify that the dimension exists in your Splunk Infrastructure Monitoring account.
4. If using a Dimensions Query, verify the syntax. Example: `region:us1 AND hostname:france-*`.

### Tags variable returns no values

When a tags variable query returns an empty list.

**Possible causes:**

- No tags are defined in your account
- Access token does not have permission to list tags

**Solution:**

1. Verify that tags exist in your Splunk Infrastructure Monitoring account.
2. Check that your access token has permission to query tags.

## Annotation issues

Issues with annotations can prevent alerts or events from displaying on your dashboards.

### Alerts annotation returns no data

When an alerts annotation query returns no results.

**Possible causes:**

- No alerts exist for the specified detector
- Detector name is incorrect
- No alerts triggered during the selected time range

**Solution:**

1. Verify the detector name is correct and exists in your Splunk Infrastructure Monitoring account.
2. Expand the time range to include periods when alerts were triggered.
3. Verify the query syntax:

signalflow [Copy code to clipboard] Copy

```signalflow
alerts(detector_name='YourDetectorName').publish()
```

### Events annotation returns no data

When an events annotation query returns no results.

**Possible causes:**

- No events exist for the specified event type
- Event type name is incorrect
- No events occurred during the selected time range

**Solution:**

1. Verify the event type name is correct.
2. Expand the time range to include periods when events occurred.
3. Verify the query syntax:

signalflow [Copy code to clipboard] Copy

```signalflow
events(eventType='YourEventType').publish()
```

## Get additional help

If you continue to experience issues:

- Check the [Grafana community forums](https://community.grafana.com/) for similar issues and solutions.
- Review the [Splunk Infrastructure Monitoring documentation](https://docs.splunk.com/Observability/infrastructure/intro-to-infrastructure.html) for API-specific issues.
- Contact [Grafana Support](/support/) if you have a Grafana Enterprise license or a Grafana Cloud Pro or Advanced plan.

When reporting issues, include the following information:

- Grafana version
- Plugin version
- Realm name
- Error messages (redact sensitive information)
- Steps to reproduce the issue
- Sample SignalFlow query (if applicable)
