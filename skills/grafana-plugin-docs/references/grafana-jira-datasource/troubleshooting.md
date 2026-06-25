---
title: "Troubleshoot Jira data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshoot common issues with the Jira data source plugin"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Jira data source issues

This guide provides troubleshooting guidance for common issues with the Jira data source plugin.

## Connection errors

These issues relate to establishing a connection between Grafana and your Jira instance.

### Unable to connect to Jira

**Error message:** “Connection refused. The Jira server is not responding”

**Cause:** Grafana cannot establish a connection to the Jira server.

**Solution:**

1. Verify the Jira URL is correct and accessible from the Grafana server.
2. Check that port 8080 is enabled and not blocked by a firewall.
3. Ensure the Jira instance is running and responsive.
4. If using Jira Data Center or Jira Server, verify the server is accessible on your network.
5. Test connectivity by accessing the Jira URL directly in a browser from the Grafana server.

### Invalid URL

**Error message:** “The URL cannot be verified. Double check the formatting and/or the URL.”

**Cause:** The Jira URL is malformed or incorrectly formatted.

**Solution:**

1. Verify the URL includes the protocol (`https://` or `http://`).
2. Check for trailing slashes or extra characters in the URL.
3. Ensure the URL points to the root of your Atlassian instance, not a specific page or endpoint.
4. For Jira Cloud, the URL format should be `https://your-domain.atlassian.net`.
5. For Jira Data Center or Server, use the base URL of your Jira installation.

### API endpoint not found

**Error message:** “The Jira API endpoint was not found. This usually indicates an incorrect Jira URL.”

**Cause:** The configured URL doesn’t point to a valid Jira API endpoint.

**Solution:**

1. Verify you’re using the correct **Provider** setting (Jira Cloud vs. Jira Data Center/Jira Server).
2. Check that the URL is the root URL of your Jira instance, not a project or issue URL.
3. For Jira Cloud, ensure the URL format is `https://your-domain.atlassian.net`.
4. For Jira Data Center or Server, verify the context path is correct if your instance uses one.

### Proxy connection error

**Error message:** “Proxy connection error”

**Cause:** Issues with proxy configuration between Grafana and Jira.

**Solution:**

1. Check your proxy settings in Grafana’s configuration.
2. Verify the proxy server is running and accessible.
3. Ensure the proxy allows connections to your Jira instance.
4. If using Private Data Source Connect (PDC), verify the PDC agent is running and properly configured.

### Private data source connect (PDC) issues

**Cause:** PDC connection is not properly configured or the agent is not running.

**Solution:**

1. Verify the PDC agent is installed and running in your network.
2. Check that the PDC connection is properly configured in the data source settings.
3. Ensure the PDC agent has network access to your Jira instance.
4. Review PDC agent logs for connection errors.
5. Refer to [Configure Grafana private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/configure-pdc/) for setup instructions.

## Authentication errors

These errors occur when credentials are invalid or permissions are insufficient.

### Authentication failed

**Error message:** “Authentication failed. This could be due to: 1) Invalid username/email or API token, or 2) Valid credentials with insufficient permissions. Please verify your credentials and permissions”

**Cause:** The provided credentials are invalid or the user lacks necessary permissions.

**Solution:**

1. Verify the email address matches the Atlassian account associated with the API token.
2. Generate a new API token and update the data source configuration:

   - Go to [Manage API tokens for your Atlassian account](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/).
   - Create a new token and copy it immediately (tokens are only shown once).
3. Ensure the user account has access to the Jira projects you want to query.
4. Check that the API token hasn’t expired or been revoked.
5. If leaving the **User email** field empty, verify that Bearer token authentication is supported by your Jira instance.

### Basic vs. Bearer authentication

**Cause:** Confusion about which authentication method is being used.

**Solution:**

1. If the **User email** field is populated, Basic authentication is used.
2. If the **User email** field is empty, Bearer token authentication is used.
3. For Jira Cloud, Basic authentication (email + API token) is the recommended method.
4. For Jira Data Center or Server, check which authentication methods your instance supports.

### Insufficient permissions

**Cause:** The authenticated user doesn’t have permissions to access certain projects or issues.

**Solution:**

1. Verify the user has at least **Browse Projects** permission for the projects you want to query.
2. Check project-level permissions in Jira’s project settings.
3. For Jira Service Management queries, ensure the user has appropriate service desk permissions.
4. Contact your Jira administrator to review and adjust permissions if needed.

## Query errors

These issues relate to JQL queries and data retrieval.

### JQL syntax errors

**Cause:** The JQL query contains syntax errors.

**Solution:**

1. Validate your JQL syntax in Jira’s advanced search before using it in Grafana.
2. Ensure field names are spelled correctly and match Jira’s field names.
3. Use single quotes for string values: `project = 'My Project'`.
4. Check for unbalanced parentheses or quotes.
5. Refer to [Use advanced search with Jira Query Language (JQL)](https://support.atlassian.com/jira-software-cloud/docs/use-advanced-search-with-jira-query-language-jql/) for syntax guidance.

Example of correct JQL syntax:

jql [Copy code to clipboard] Copy

```jql
project = 'TEST' AND assignee = 'Joe Smith' AND status != 'Done'
```

### No data returned

**Cause:** The query returns no matching issues.

**Solution:**

1. Verify the JQL query returns results when run directly in Jira’s advanced search.
2. Check that the selected fields exist on the issues being queried.
3. Increase the **Limit** value if you expect more results.
4. Verify the time range macros (`$__timeFrom` and `$__timeTo`) align with your issue dates.
5. Ensure the authenticated user has permission to view the issues.

### Time range macros don’t filter correctly

**Cause:** Time range macros are used incorrectly in JQL.

**Solution:**

1. Use the correct macro syntax: `$__timeFrom` and `$__timeTo`.
2. Apply macros to date fields like `createdDate`, `updatedDate`, or `resolutionDate`.
3. Example: `createdDate >= $__timeFrom AND createdDate <= $__timeTo`.
4. Verify the dashboard time range includes the dates of your issues.

### Custom fields not appearing

**Cause:** Custom field types from Jira add-ons may not be supported.

**Solution:**

1. Check if the custom field type is supported by the plugin.
2. Try selecting the field by its custom field ID (for example, `customfield_10001`).
3. Use the **Extract fields** transformation for fields returned as stringified JSON.
4. Note that some custom field types from third-party Jira add-ons are not supported (this is a known limitation).

### Template variable issues

**Cause:** Template variables don’t work as expected in queries.

**Solution:**

1. Ensure the variable is correctly defined in the dashboard settings.
2. Use the correct variable syntax: `$variableName` or `${variableName}`.
3. For multi-value variables, use the **IN** clause: `assignee IN ($assignee)`.
4. Verify the variable query returns the expected values.
5. Check that the Jira data source is selected as the variable’s data source.

## Performance issues

These issues relate to slow queries or timeouts.

### Slow query execution

**Cause:** Queries return large amounts of data or Jira is slow to respond.

**Solution:**

1. Reduce the **Limit** value to return fewer issues.
2. Add more specific JQL filters to narrow down results.
3. Use indexed fields in JQL filters for better performance.
4. Use the dashboard time range to filter issues with `$__timeFrom` and `$__timeTo` macros.
5. Consider splitting complex queries into multiple smaller queries.

### Query timeout

**Cause:** The query takes too long to complete.

**Solution:**

1. Reduce the number of fields selected in the query.
2. Lower the **Limit** value.
3. Simplify your JQL filter.
4. Check if Jira itself is experiencing performance issues.
5. Consider using Grafana’s caching features to reduce load on Jira.

## Transformation issues

These issues relate to using Grafana transformations with Jira data.

### Linked issues not displaying correctly

**Cause:** Linked issues are returned as stringified JSON and need transformation.

**Solution:**

1. Apply the **Extract fields** transformation with:

   - Source: Linked issues
   - Format: JSON
   - Path: `inwardIssue.key` or `outwardIssue.key`
2. Create separate queries for inward and outward linked issues.
3. Use the **Merge** transformation to combine results.
4. Refer to the **Jira JSON fields demo** dashboard for a complete example.

### Group by transformation not working

**Cause:** Fields are not compatible with grouping or aggregation.

**Solution:**

1. Ensure the field you’re grouping by contains consistent values.
2. Verify numeric fields are selected for aggregation functions like Total or Mean.
3. Check that the field names match exactly (field names are case-sensitive).
4. Use **Organize fields** transformation to rename fields if needed.

## Other common issues

The following issues don’t produce specific error messages but are commonly encountered.

### Missing data source configuration

**Error message:** “Your data source configuration is incomplete and missing certain fields. Please view inline errors above.”

**Cause:** Required configuration fields are not populated.

**Solution:**

1. Ensure the **URL** field is populated with your Jira instance URL.
2. Provide the **API token** in the authentication section.
3. Select the correct **Provider** (Jira Cloud or Jira Data Center/Jira Server).
4. Click **Save &amp; test** to validate the configuration.

### Dashboard import issues

**Cause:** Pre-made dashboards don’t work after import.

**Solution:**

1. Verify the Jira data source is correctly configured and tested.
2. Check that the data source name matches the one expected by the dashboard.
3. Update dashboard variables to match your Jira projects and fields.
4. Some fields may need adjustment based on your Jira configuration.

### Results appear distorted or incomplete

**Cause:** The query limit is lower than the actual number of issues.

**Solution:**

1. Increase the **Limit** value to include all relevant issues.
2. If calculating metrics (like velocity or average time), ensure the limit includes all issues in the scope.
3. For example, if a Sprint has 100 issues but the limit is 50, metrics will only reflect 50 issues.

## Get additional help

If you continue to experience issues after following this troubleshooting guide:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Review the [Grafana GitHub issues](https://github.com/grafana/grafana/issues) for known bugs.
3. Enable debug logging in Grafana to capture detailed error information.
4. Contact [Grafana Support](/support/) if you’re an Enterprise or Cloud customer.

When reporting issues, include:

- Grafana version
- Jira data source plugin version
- Jira deployment type (Cloud, Data Center, or Server) and version
- Error messages (redact sensitive information)
- Steps to reproduce
- Relevant JQL queries (redact sensitive data)
