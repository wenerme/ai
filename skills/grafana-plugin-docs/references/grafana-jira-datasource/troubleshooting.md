---
title: "Troubleshoot Jira data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshoot common issues with the Jira data source plugin"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Jira data source issues

This guide provides troubleshooting guidance for common issues with the Jira data source plugin.

## Understand error categories

The plugin classifies connection and configuration errors into categories and prefixes the error message with the category in square brackets. This prefix helps you quickly identify the class of problem:

Expand table

| Category    | Meaning                                                                                        |
|-------------|------------------------------------------------------------------------------------------------|
| `[auth]`    | Authentication or authorization failure (invalid credentials, rejected OAuth 2.0 credentials). |
| `[network]` | Grafana cannot reach Jira (DNS failure, connection refused, closed connection, HTTP 502/503).  |
| `[tls]`     | TLS/SSL handshake or certificate verification failure.                                         |
| `[timeout]` | Jira did not respond before the configured timeout elapsed.                                    |
| `[config]`  | A data source setting is missing or invalid (empty URL, wrong Provider, HTTP 404/422).         |
| `[server]`  | Jira returned a server-side error (HTTP 500).                                                  |
| `[unknown]` | The error does not match a known pattern.                                                      |

Expand **Show details** in the error alert to see the underlying error, including the HTTP status code. Use the category prefix to jump to the matching section in this guide.

## Connection errors

These issues relate to establishing a connection between Grafana and your Jira instance.

### Unable to connect to Jira

**Error message:** “\[network] Connection refused. The Jira server is not responding.”

**Cause:** Grafana cannot establish a connection to the Jira server.

**Solution:**

1. Verify the Jira URL is correct and accessible from the Grafana server.
2. Check that port 8080 is enabled and not blocked by a firewall.
3. Ensure the Jira instance is running and responsive.
4. If using Jira Data Center or Jira Server, verify the server is accessible on your network.
5. Test connectivity by accessing the Jira URL directly in a browser from the Grafana server.

### Host cannot be resolved

**Error message:** “\[network] The Jira host could not be resolved. Double check the URL formatting and that the host is reachable from Grafana.”

**Cause:** The Jira URL is malformed, or DNS resolution failed for the configured host.

**Solution:**

1. Verify the URL includes the protocol (`https://` or `http://`).
2. Check for trailing slashes, typos, or extra characters in the URL.
3. Ensure the URL points to the root of your Atlassian instance, not a specific page or endpoint.
4. For Jira Cloud, the URL format should be `https://your-domain.atlassian.net`.
5. For Jira Data Center or Server, use the base URL of your Jira installation.
6. Confirm the host resolves from the Grafana server, for example with `nslookup` or `dig`.

### Connection closed unexpectedly

**Error message:** “\[network] The connection to Jira closed unexpectedly. Check the TLS settings, any proxy or PDC agent, and intermediate load balancers.”

**Cause:** The connection was closed before Jira sent a complete response. This is common when an intermediate proxy or load balancer terminates the request, or when a plain HTTP request reaches a TLS-only port.

**Solution:**

1. Verify the protocol in the URL matches the port. Use `https://` for TLS-enabled endpoints.
2. Check any proxy, PDC agent, or load balancer between Grafana and Jira for connection limits or idle timeouts.
3. Review the Jira instance logs for terminated connections.
4. Test the same URL with `curl -v` from the Grafana server to confirm whether the connection is closed at the network level.

### Host unreachable

**Error message:** “\[network] The Jira host is unreachable. Check firewall rules, routing, and any proxy or PDC agent between Grafana and Jira.”

**Cause:** The host resolved, but no network route reached it. This differs from a refused connection, where the host answered and rejected the request.

**Solution:**

1. Check firewall rules and security groups between the Grafana server and Jira.
2. Verify routing, including VPN or peering links, if Jira is on a private network.
3. If using a proxy or PDC agent, confirm it can reach the Jira host.
4. Test reachability from the Grafana server, for example with `ping` or `traceroute`.

### Gateway unavailable

**Error message:** “\[network] Jira or an intermediate gateway is unavailable. Check the gateway or proxy and the Jira instance health.”

**Cause:** Jira or a gateway in front of it returned HTTP 502 or 503.

**Solution:**

1. Check the Jira instance status. For Jira Cloud, review the [Atlassian status page](https://status.atlassian.com/).
2. If Jira sits behind a reverse proxy or load balancer, verify the upstream is healthy.
3. Retry the health check after a short wait — these errors are often transient.

### API endpoint not found

**Error message:** “\[config] The Jira API endpoint was not found. This usually indicates an incorrect Jira URL.”

**Cause:** The configured URL doesn’t point to a valid Jira API endpoint.

**Solution:**

1. Verify you’re using the correct **Provider** setting (Jira Cloud vs. Jira Data Center/Jira Server).
2. Check that the URL is the root URL of your Jira instance, not a project or issue URL.
3. For Jira Cloud, ensure the URL format is `https://your-domain.atlassian.net`.
4. For Jira Data Center or Server, verify the context path is correct if your instance uses one.

### Response is not valid Jira API output

**Error message:** “\[config] The response was not valid Jira API output. Verify the URL points at a Jira instance and that no proxy or sign-in page is intercepting the request.”

**Cause:** The request returned HTTP 200, but the body could not be parsed as Jira API JSON. This usually means an HTML page answered instead of Jira — a proxy sign-in page, a captive portal, or a URL pointing at a different service.

**Solution:**

1. Open the URL with `/rest/api/3/myself` appended in a browser from the Grafana server and confirm JSON is returned.
2. Check whether a proxy, SSO gateway, or captive portal intercepts the request and returns a sign-in page.
3. Verify the URL points at the Jira instance root, not a reverse proxy serving a different application.
4. If using Private Data Source Connect (PDC), confirm the agent forwards to Jira rather than to an error page.

### Request could not be processed

**Error message:** “\[config] Jira could not process the request. Verify the Provider setting and, for OAuth 2.0 or scoped tokens, the Cloud ID.”

**Cause:** Jira returned HTTP 422. This usually means the request reached Atlassian but the identifiers in it don’t match a Jira site.

**Solution:**

1. Verify the **Provider** setting matches your deployment type.
2. If using OAuth 2.0 or a scoped token, confirm the **Cloud ID** belongs to the Jira site you intend to query.
3. Confirm the Atlassian app has been granted access to that Jira site.

### Proxy connection error

**Error message:** “\[network] Proxy connection error. Check the proxy or PDC agent configuration.”

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

## Timeout errors

### Timed out waiting for Jira

**Error message:** “\[timeout] Timed out waiting for a response from Jira. Check network reachability, any proxy or PDC agent, and Jira responsiveness.”

**Cause:** Jira did not respond before the request deadline. Jira also returns HTTP 408 or 504 in some deployments.

**Solution:**

1. Confirm the Jira instance is responsive by opening the URL in a browser from the Grafana server.
2. Check whether a proxy, PDC agent, or load balancer is delaying the request.
3. Check the Jira instance for high load or ongoing maintenance.
4. For Jira Data Center or Server, review the application logs for slow request handling.

## TLS/SSL certificate errors

### TLS verification failed

**Error message:** “\[tls] TLS verification failed. Check the certificate configuration and any custom CA certificate.”

**Cause:** The TLS handshake failed, or Jira’s certificate could not be verified.

**Solution:**

1. Verify the certificate presented by Jira is valid and not expired.
2. If Jira uses a self-signed or internal certificate, add the CA certificate to the data source **TLS/SSL Auth Details**.
3. Confirm the hostname in the URL matches the certificate’s subject or SAN entries.
4. If the URL uses `https://` but the port serves plain HTTP, correct the protocol or the port.

## Server errors

### Jira returned a server error

**Error message:** “\[server] Jira returned a server error. Retry, and then check the Jira instance health.”

**Cause:** Jira returned HTTP 500 or another 5xx status.

**Solution:**

1. Retry the health check — server errors are often transient.
2. For Jira Cloud, check the [Atlassian status page](https://status.atlassian.com/).
3. For Jira Data Center or Server, review the Jira application logs for the corresponding error.

## Authentication errors

These errors occur when credentials are invalid or permissions are insufficient.

### Authentication failed

**Error message:** “\[auth] Authentication failed. This could be due to: 1) Invalid username/email or API token, or 2) Valid credentials with insufficient permissions. Please verify your credentials and permissions”

**Cause:** The provided credentials are invalid or the user lacks necessary permissions.

**Solution:**

1. Verify the email address matches the Atlassian account associated with the API token.
2. Generate a new API token and update the data source configuration:

   - Go to [Manage API tokens for your Atlassian account](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/).
   - Create a new token and copy it immediately (tokens are only shown once).
3. Ensure the user account has access to the Jira projects you want to query.
4. Check that the API token hasn’t expired or been revoked.
5. If leaving the **User email** field empty, verify that Bearer token authentication is supported by your Jira instance.

### OAuth 2.0 client credentials rejected

**Error message:** “\[auth] Atlassian rejected the OAuth 2.0 client credentials. Verify the client ID and client secret.”

**Cause:** Atlassian could not issue a token for the configured OAuth 2.0 app.

**Solution:**

1. Verify the **Client ID** matches the Atlassian app exactly.
2. Re-enter the **Client secret** — it is write-only and cannot be verified by inspection.
3. Confirm the app still exists and has not been deleted or rotated in the Atlassian developer console.

### OAuth 2.0 access denied

**Error message:** “\[auth] Atlassian denied the OAuth 2.0 token request. Verify the app is authorized and has the required scopes.”

**Cause:** Atlassian recognized the app but refused to issue a token for it.

**Solution:**

1. Confirm the app is authorized for the target Jira site.
2. Verify the app grants the `read:jira-user` and `read:jira-work` scopes.
3. Check that the app is not restricted by an organization policy.

### Jira responded without user details

**Error message:** “\[auth] Jira responded without user details. Verify the credentials have the read:jira-user scope.”

**Cause:** Jira accepted the request but returned no email address or display name for the authenticated identity.

**Solution:**

1. Confirm the credentials have the `read:jira-user` scope.
2. Check the Atlassian account privacy settings — a hidden email address can produce an incomplete response.
3. Verify the token belongs to a user account rather than a restricted service identity.

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

**Error message:** “\[config] invalid / missing config field. URL is missing”

**Cause:** Required configuration fields are not populated.

**Solution:**

1. Ensure the **URL** field is populated with your Jira instance URL.
2. Provide the **API token** in the authentication section.
3. Select the correct **Provider** (Jira Cloud or Jira Data Center/Jira Server).
4. Click **Save &amp; test** to validate the configuration.

Configuration validation reports one missing field at a time, so you may need to fix several in sequence. Other messages in this family include:

- “\[config] invalid / missing config field. token is missing. This field is required for basic authentication”
- “\[config] invalid / missing config field. Cloud ID is missing. This field is required when using a scoped token”
- “\[config] invalid / missing config field. OAuth client ID is missing. This field is required for OAuth 2.0 authentication”
- “\[config] invalid / missing config field. OAuth client secret is missing. This field is required for OAuth 2.0 authentication”
- “\[config] invalid / missing config field. Cloud ID is missing. This field is required for OAuth 2.0 authentication”

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
