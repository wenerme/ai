---
title: "Troubleshoot the Splunk data source | Grafana Enterprise Plugins documentation"
description: "Troubleshoot issues with the Splunk data source."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot issues with the Splunk data source

This page provides troubleshooting information for common issues with the Splunk data source.

## Connection errors

This section covers connection-related issues when setting up or using the Splunk data source.

### Enter a URL

**Error message:** “Enter a URL.”

**Cause:** The URL field in the data source configuration is empty or contains only whitespace.

**Solution:**

1. Navigate to **Connections** &gt; **Data sources** &gt; **Splunk**.
2. Enter a valid Splunk server URL in the **URL** field.
3. The URL should include the protocol, hostname, and port (typically 8089). For example: `http://splunk-server.example.com:8089`.
4. Click **Save &amp; test** to verify the connection.

### The URL is not in the expected format

**Error message:** “The URL is not in the expected format.”

**Cause:** The URL provided does not match the expected format for a Splunk API endpoint.

**Solution:**

1. Verify the URL includes the correct protocol (`http://` or `https://`).
2. Ensure the port number is correct. Splunk’s management port is typically `8089`.
3. Remove any trailing slashes or extra path segments.
4. Example of a valid URL: `https://splunk.example.com:8089`.

### Could not connect to Splunk

**Error message:** “Could not connect to Splunk. This usually happens when the URL is incorrect.”

**Cause:** The data source cannot establish a connection to the Splunk server. This typically occurs when the URL is incorrect or the Splunk server is not reachable.

**Solution:**

1. Verify the Splunk server URL is correct and accessible from the Grafana server.
2. Check that [port 8089 is enabled](https://docs.splunk.com/Documentation/SplunkCloud/9.0.2209/Config/ConfigureOutboundPorts) on your Splunk instance.
3. If using Splunk Cloud, ensure you’ve configured the necessary network access.
4. Test connectivity by running `curl -k https://your-splunk-server:8089` from the Grafana server.
5. Check for any firewalls or network policies blocking the connection.

### There was a problem with connecting to Splunk

**Error message:** “There was a problem with connecting to Splunk.”

**Cause:** A general connection error occurred that doesn’t match a specific known issue.

**Solution:**

1. Check that the Splunk server is running and accessible.
2. Verify network connectivity between Grafana and the Splunk server.
3. Review Splunk server logs for any errors.
4. If using TLS/SSL, verify your certificate configuration is correct.
5. Try toggling **Skip TLS certificate validation** temporarily to determine if the issue is certificate-related.

## Authentication errors

This section covers authentication-related issues.

### The credentials are incorrect

**Error message:** “The credentials are incorrect. Check that the username and password are correct.”

**Cause:** The username or password provided for Splunk authentication is invalid.

**Solution:**

1. Verify the username and password are correct.
2. Avoid using the default Splunk admin account; create a dedicated user for Grafana.
3. Check that the user account is not locked or expired in Splunk.
4. If using an authentication token, ensure it’s valid and hasn’t expired.
5. Verify the user has the necessary permissions to access the Splunk REST API.

### Authentication token issues

**Cause:** The authentication token provided is invalid, expired, or doesn’t have the required permissions.

**Solution:**

1. Generate a new authentication token in Splunk. Refer to Splunk’s [Create authentication tokens](https://docs.splunk.com/Documentation/Splunk/9.0.4/Security/CreateAuthTokens) documentation.
2. Ensure the token has the necessary capabilities for the operations you want to perform.
3. Check that the token hasn’t expired.
4. In the data source configuration, enter the token in the **Authentication token** field under **Alternative authentication**.

## Query errors

This section covers issues that occur when running queries.

### Request timeout

**Error message:** “request timeout”

**Cause:** The query took longer than the configured timeout to complete.

**Solution:**

1. Increase the **Timeout** value in the data source configuration under **Advanced options**.
2. Optimize your SPL query to return results faster:

   - Add time range constraints.
   - Use more specific index and sourcetype filters.
   - Reduce the amount of data being processed.
3. Consider enabling **Preview mode** to get results as they become available.
4. If running complex queries, increase the **Auto cancel timeout** value.

### Request canceled

**Error message:** “request canceled”

**Cause:** The query was canceled before it could complete, typically due to navigating away from the dashboard or closing the panel.

**Solution:**

1. Wait for queries to complete before navigating away.
2. If queries are consistently being canceled, check for network instability.
3. Increase the **Timeout** value if queries need more time to complete.

### Instance is in Detention mode

**Error message:** “This instance is currently in Detention mode and does not allow running new search jobs.”

**Cause:** The Splunk instance is in Detention mode, which typically occurs during a rolling restart of a search head cluster.

**Solution:**

1. Wait for the Splunk cluster rolling restart to complete.
2. Try connecting to a different search head in the cluster.
3. Contact your Splunk administrator to check the cluster status.

### 5xx server errors

**Cause:** The Splunk server returned a 5xx error, indicating a server-side issue.

**Solution:**

1. Check the Splunk server status and logs for errors.
2. Verify the Splunk server has sufficient resources (CPU, memory, disk space).
3. The data source automatically retries 5xx errors, but if the issue persists, contact your Splunk administrator.
4. Check if there are any ongoing maintenance activities on the Splunk infrastructure.

## Configuration errors

This section covers issues related to data source configuration.

### The configuration setup is incomplete

**Error message:** “The configuration setup is incomplete.”

**Cause:** Required configuration fields are missing or invalid.

**Solution:**

1. Navigate to **Connections** &gt; **Data sources** &gt; **Splunk**.
2. Ensure the **URL** field is filled in with a valid Splunk server URL.
3. Configure authentication using either **Basic authentication** (username/password) or an **Authentication token**.
4. Click **Save &amp; test** to verify all settings are correct.

### An error occurred with getting the data source

**Error message:** “An error occurred with getting the data source.”

**Cause:** There was a problem loading the data source settings.

**Solution:**

1. Refresh the page and try again.
2. Check that the data source hasn’t been deleted or modified by another user.
3. Verify you have the necessary permissions to access the data source.
4. If using provisioning, check that the provisioning YAML file is valid.

## TLS and certificate errors

This section covers TLS/SSL certificate-related issues.

### Certificate validation failures

**Cause:** The Splunk server’s TLS certificate cannot be validated.

**Solution:**

1. If using a self-signed certificate, add the CA certificate in the data source configuration under **Add self-signed-certificate**.
2. Alternatively, toggle **Skip TLS certificate validation** on (not recommended for production).
3. Verify the certificate chain is complete and valid.
4. Check that the certificate hasn’t expired.
5. For more information on securing Splunk with TLS, see [Securing Splunk Enterprise](https://docs.splunk.com/Documentation/Splunk/9.1.0/Security/AboutsecuringyourSplunkconfigurationwithSSL).

### TLS client authentication issues

**Cause:** Client certificate authentication is failing.

**Solution:**

1. Verify the **Client cert** and **Client key** are correctly configured.
2. Ensure the **Server name** matches the certificate’s Common Name (CN) or Subject Alternative Name (SAN).
3. Check that the client certificate is trusted by the Splunk server.
4. Verify the certificate and key files are in the correct PEM format.

## Performance issues

This section covers performance-related issues.

### Slow query performance

**Cause:** Queries are taking too long to return results.

**Solution:**

1. Optimize your SPL queries:

   - Use specific indexes and sourcetypes.
   - Add time constraints to narrow the search window.
   - Use the `fields` command to limit returned fields.
2. Enable **Preview mode** to see results as they become available.
3. Reduce the **Results limit** value to return fewer results.
4. Consider using the `stats` or `timechart` commands for aggregated data instead of raw events.
5. Check Splunk server performance and resource utilization.

### High resource usage

**Cause:** Queries are consuming too many resources on the Splunk server.

**Solution:**

1. Set appropriate **Results limit** values in the data source configuration.
2. Use the `GF_PLUGIN_GRAFANA_SPLUNK_DATASOURCE_MAX_RESULT_LIMIT` environment variable to set a global limit.
3. Optimize queries to be more efficient.
4. Consider using sampling with the **Sample ratio** option for large datasets.

## Get additional help

If you’re still experiencing issues after trying the solutions above:

1. Check the [Splunk documentation](https://docs.splunk.com/) for Splunk-specific issues.
2. Review Grafana server logs for detailed error messages.
3. Use the **Query inspector** in the query editor to view detailed statistics and debug information.
4. Contact Grafana Support if you’re an Enterprise, Cloud Pro, or Cloud Contracted user. When reporting issues, include:

- Grafana version
- Splunk version and deployment type (Splunk Cloud, Splunk Enterprise)
- Query mode (Search or Events)
- Error messages (redact sensitive information)
- Steps to reproduce
- Relevant configuration such as data source settings, authentication method, and TLS settings (redact tokens, passwords, and other credentials)
