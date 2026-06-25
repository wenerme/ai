---
title: "Troubleshoot AppDynamics data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshoot common issues with the AppDynamics data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot AppDynamics data source issues

This document provides guidance for troubleshooting common issues when configuring and using the AppDynamics data source in Grafana.

## Before you begin

Before investigating specific errors, verify that the data source health check passes:

1. Click **Connections** in the left-side menu.
2. Click **Data sources** and select your AppDynamics data source.
3. Click **Save &amp; test**.
4. Confirm you see the success message: **Data source is working, found N apps.**

If the health check fails, start with the [Configuration errors](#configuration-errors) or [Authentication errors](#authentication-errors) sections.

## Configuration errors

Configuration errors occur when required fields are missing or incomplete.

### “The configuration setup is incomplete”

This error indicates that one or more required configuration fields are missing.

**Possible causes:**

- No URL configured
- No credentials configured (neither basic authentication nor API client)
- Partial API client credentials (missing client name, domain, or secret)
- Partial basic authentication (missing username or password)

**Solutions:**

1. Verify the **URL** field contains your AppDynamics controller URL, for example `https://mycompany.saas.appdynamics.com`.
2. Ensure all required credential fields are filled:

   - For basic authentication: **User** and **Password**
   - For API client authentication: **Client Name**, **Client Domain**, and **Client Secret**
3. Click **Save &amp; test** to verify the configuration.

## Authentication errors

Authentication errors occur when there are issues with your credentials, permissions, or token handling.

### “The credentials are incorrect” or “Unauthorized (401)”

The full error from the plugin is: `The credentials are incorrect. Check that the API key, or username and password, are correct.`

**Possible causes:**

- Incorrect username or password
- Invalid API client secret
- Wrong client name or domain
- Insufficient permissions

**Solutions:**

1. Verify the credentials match what is configured in the AppDynamics Administration settings.
2. For API client authentication, verify the **Client Name** matches the API client name in AppDynamics, and the **Client Domain** matches your company name from the controller URL.
3. Regenerate the client secret in the AppDynamics Controller UI if needed and update the data source configuration.
4. Ensure the user or API client role has `view` access to **Account**, **Applications**, **Databases**, and **Analytics**.

### “Token has expired”

This error indicates that the OAuth token used for API client authentication has expired.

**Possible causes:**

- API client secret has been rotated
- API client has been deleted or deactivated
- Token refresh failed

**Solutions:**

1. Regenerate the client secret in the AppDynamics Controller UI.
2. Update the **Client Secret** in the Grafana data source configuration.
3. Click **Save &amp; test** to verify the new credentials work.
4. If the issue persists, verify the API client is still active in AppDynamics and has the correct role assigned.

### “Empty auth token received” or “No authentication response received”

The AppDynamics controller returned an empty or missing authentication token.

**Possible causes:**

- API client credentials are incorrect
- The AppDynamics controller rejected the token request
- Network issues interrupted the authentication handshake

**Solutions:**

1. Verify the **Client Name**, **Client Domain**, and **Client Secret** are correct.
2. Check that the API client is active and has the correct role assigned in AppDynamics.
3. Verify network connectivity from the Grafana server to the AppDynamics controller.
4. Click **Save &amp; test** to retry authentication.

## Connection errors

Connection errors occur when Grafana can’t reach the AppDynamics controller or Analytics endpoint.

### “Could not connect to AppDynamics”

The full error from the plugin is: `Could not connect to AppDynamics. This usually happens when the URL is incorrect.`

**Possible causes:**

- Incorrect URL format
- Extra path in the URL (such as `/controller`)
- Network connectivity issues

**Solutions:**

1. Verify the URL format is correct: `https://<COMPANY>.saas.appdynamics.com`.
2. Ensure the URL doesn’t include a trailing path like `/controller`.
3. Test network connectivity from the Grafana server to the AppDynamics controller.
4. Check that firewall rules allow outbound HTTPS (port 443).

### Connection timeout or “no response received from AppDynamics”

The connection to AppDynamics took too long to establish.

**Possible causes:**

- Network connectivity issues
- Firewall blocking the connection
- AppDynamics service is experiencing issues

**Solutions:**

1. Verify network connectivity from the Grafana server to AppDynamics.
2. Ensure your firewall allows outbound connections to your AppDynamics controller on port 443.
3. If using Private data source connect (PDC), verify the PDC agent is running and connected. For more information, refer to [Private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/).
4. If timeouts occur only for certain queries, try narrowing the time range to reduce data volume.

## Query errors

Query errors occur when executing queries against the Metrics or Analytics APIs.

### “empty metric query”

No metric has been selected in the query editor.

**Solutions:**

1. Ensure you’ve selected an **Application** in the query editor.
2. Select a **Metric** path from the available metrics.

### “HTML response received from data source API”

The AppDynamics controller returned an error page instead of JSON data.

**Possible causes:**

- Incorrect URL
- AppDynamics controller is down or experiencing issues
- The selected application or metric no longer exists

**Solutions:**

1. Verify the **URL** in the data source configuration is correct.
2. Check that the AppDynamics controller is running and accessible.
3. Ensure the selected application and metric path still exist in AppDynamics.

### “(500) error parsing query, or error with no additional context received” (Analytics)

An Analytics (ADQL) query has a syntax error or references invalid data. AppDynamics returns HTTP 500 errors for query parsing failures without detailed error context.

**Possible causes:**

- ADQL syntax error (missing keyword, unmatched quotes, invalid function)
- Invalid table or field name in the query
- Analytics API is unavailable

**Solutions:**

1. Verify your ADQL syntax. Refer to the [ADQL documentation](https://docs.appdynamics.com/appd/24.x/latest/en/analytics/adql-reference/adql-queries).
2. Check that table and field names in the query are correct and exist in your Analytics schema. Use the autocomplete feature in the query editor to verify available tables and fields.
3. Simplify the query to isolate the syntax issue (for example, start with `SELECT count(*) FROM transactions`).
4. Verify the Analytics API connection by clicking **Save &amp; test** in the data source settings.

### “Number of intervals in aggregation is too large”

The query time range is too wide for the selected aggregation interval.

**Solutions:**

1. Narrow the dashboard time range to reduce the number of data points.
2. Increase the aggregation interval in your query.
3. Break the query into smaller time windows.

### “Event type does not exist for account \[X] and event type \[Y]”

An Analytics query references a table or event type that doesn’t exist or isn’t accessible for the configured account.

**Possible causes:**

- AppDynamics Analytics license doesn’t cover the requested data
- The table hasn’t been created yet
- Incorrect **Global Account Name** in the data source configuration
- The event type name is misspelled in the ADQL query

**Solutions:**

1. Verify that the table name in your ADQL query (for example, `transactions`, `browser_records`) is correct.
2. Check that the **Global Account Name** in the data source configuration matches your account. You can find it in the AppDynamics Controller UI under **Settings** &gt; **License** &gt; **Account**.
3. Verify that your AppDynamics Analytics license covers the data you’re trying to query.
4. Ensure data has been pushed to the table or event type you’re querying.

### “invalid/empty analytics query received”

The Analytics query field is empty.

**Solutions:**

1. Enter a valid ADQL query in the query editor. For example: `SELECT count(*) FROM transactions`.

### No data returned

Your query executes without error but returns no results.

**Possible causes:**

- The time range filter excludes all data
- Wrong application or metric selected
- The user or API client lacks `view` access to the specific application

**Solutions:**

1. Expand the Grafana time range to verify data exists.
2. Verify you’ve selected the correct application and metric path.
3. Check that the user or API client has `view` access to the application in AppDynamics.

## Template variable errors

These errors occur when using template variables with the data source.

### Variables return no values

**Possible causes:**

- Data source connection is not working
- Variable query doesn’t match a supported pattern
- Parent variables (for cascading variables) don’t have valid selections

**Solutions:**

1. Verify the data source connection is working by clicking **Save &amp; test** in the data source settings.
2. Check that the variable query matches a supported pattern (for example, `Applications`, `AppName.Tiers`). Refer to the [template variables documentation](/docs/plugins/dlopes7-appdynamics-datasource/latest/template-variables/) for supported patterns.
3. For cascading variables, ensure parent variables have valid selections.
4. Verify the identity has permissions to list the requested resources.

### “Templating must be one of Applications, AppName.BusinessTransactions, AppName.Tiers, AppName.Nodes, AppName.Path”

The variable query uses an unsupported pattern.

**Possible causes:**

- Misspelled query keyword (for example, `Tier` instead of `Tiers`)
- Missing application name before the `.` separator
- Invalid query format

**Solutions:**

1. Verify the query matches one of the supported patterns exactly. Supported patterns are case-sensitive.
2. For application-specific queries, ensure the application name or variable precedes the `.` (for example, `MyApp.Tiers`, not just `Tiers`).
3. Refer to the [template variables documentation](/docs/plugins/dlopes7-appdynamics-datasource/latest/template-variables/) for the complete list of supported patterns and examples.

### Multi-value variables replace values with `*` in Metrics

This is expected behavior. Multi-value variables aren’t supported in Metrics queries. If multi-value variables are found in a metric path, they’re replaced with `*`, which matches all values.

To use multi-value variables, use an Analytics (ADQL) query instead:

SQL [Copy code to clipboard] Copy

```sql
SELECT distinct(transactionName), count(*) FROM transactions WHERE transactionName IN (${transactionName:doublequote})
```

## Debug tips

Use these techniques to gather more information when diagnosing issues.

### Enable query inspector

To view the executed query and response:

1. Open your dashboard panel.
2. Click the panel title and select **Inspect** &gt; **Query**.
3. Review the request and response for error details.

### Check Grafana server logs

For detailed error information:

1. Access your Grafana server logs.
2. Search for `appdynamics` to find relevant log entries.
3. Look for error messages and stack traces that provide more context.

To enable debug-level logging:

1. Set the Grafana log level to `debug` in the configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Review logs in `/var/log/grafana/grafana.log` (or your configured log location).
3. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## Get additional help

If you continue to experience issues after following this troubleshooting guide:

1. Check the [AppDynamics documentation](https://docs.appdynamics.com/) for platform-specific guidance.
2. Review the [Grafana community forums](https://community.grafana.com/) for similar issues.
3. Contact [Grafana Support](/contact/) if you’re a Grafana Enterprise, Cloud Pro, or Cloud Advanced user.
4. When reporting issues, include:

   - Grafana version and plugin version
   - Authentication method (basic authentication or API client)
   - Error messages (redact sensitive information like tokens and passwords)
   - Steps to reproduce
   - Relevant configuration (redact credentials)
