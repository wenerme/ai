---
title: "Troubleshoot Jira data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshoot common issues with the Jira data source plugin"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Jira data source issues

This guide follows the path from installing the plugin to running a query. If **Save &amp; test** fails, start at the top: license, Grafana access, URL, TLS, then credentials.

## License and entitlement

The Jira data source is an Enterprise plugin. License and entitlement problems are the most common reason **Save &amp; test** fails before Grafana ever reaches Jira. These failures usually appear as a generic plugin health check error, not as a `[network]` or `[auth]` message from this guide.

If **Save &amp; test** fails immediately after you install the plugin, or the plugin worked and then stopped with no Jira URL or credential change, check entitlement first.

> Warning
>
> Do not uninstall Enterprise plugins as a troubleshooting step. Reinstalling them requires contacting Grafana Support.

### Plugin health check fails after install or license renewal

**Possible causes and solutions:**

Expand table

| Cause                                                   | Solution                                                                                                                                                                                                                                                         |
|---------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Grafana Cloud Free or Starter plan                      | Enterprise plugins aren’t included. Upgrade to a plan that includes them, or contact your Grafana account team. Refer to [Grafana pricing](/pricing/).                                                                                                           |
| Grafana Cloud Pro without the Enterprise Plugins add-on | Upgrading from Free to Pro doesn’t always include Enterprise plugins. Purchase the add-on or confirm Jira is listed under **Plugins** in the [Grafana account portal](/orgs).                                                                                    |
| Self-managed Grafana without an Enterprise license      | Activate a valid [Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/) that includes `grafana-jira-datasource`.                                                                                                                |
| Expired or missing license                              | Renew the license, then restart Grafana. On Grafana Cloud, contact [Grafana Support](/support/) if the plugin stays unavailable after renewal.                                                                                                                   |
| License token in a stale environment variable           | If Grafana starts with `GF_ENTERPRISE_LICENSE_TEXT`, that value can override a license you uploaded in the UI. Update the variable to the current token (no extra whitespace or line breaks), or remove the variable so the UI license applies. Restart Grafana. |
| Trial ended                                             | Trial access to Enterprise plugins doesn’t always continue on the paid plan. Confirm Jira is entitled on the paid contract.                                                                                                                                      |
| Contract covers only one Enterprise plugin              | Activate Jira as the entitled plugin, or ask your Grafana account team to add it to the contract.                                                                                                                                                                |

To verify Cloud entitlement:

1. Go to the [Grafana account portal](/orgs) and select your organization.
2. Open the **Plugins** tab and confirm **Jira** is listed and activated.
3. In Grafana, go to **Administration** &gt; **Plugins and data** &gt; **Plugins**, search for **Jira**, and confirm it is installed.

For self-managed license activation, refer to [Activate a Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/).

### Plugin stops working after a trial or contract change

If Jira queries worked and then failed after a trial ended or a contract change (for example, from all Enterprise plugins to a single plugin):

1. Confirm the current contract includes `grafana-jira-datasource`.
2. On Grafana Cloud, check **Plugins** in the [Grafana account portal](/orgs).
3. On self-managed Grafana, apply the new license file or `GF_ENTERPRISE_LICENSE_TEXT` value and restart Grafana.
4. Contact [Grafana Support](/support/) if the portal shows Jira as entitled but the plugin still fails its health check.

## Cannot add or edit the data source

You can query Jira after someone else configures the data source, but you can’t create or change it. That is a Grafana permission, not a Jira permission.

**Cause:** Grafana used to require Organization administrator to add data sources. Custom RBAC roles can include data source permissions instead.

**Solution:**

1. Ask a Grafana administrator to grant `datasources:create` (and `datasources:write` to edit) on a custom role, or to assign Organization administrator.
2. Refer to [Role-based access control](/docs/grafana/latest/administration/roles-and-permissions/access-control/).
3. You don’t need Grafana server administrator access to use this Enterprise plugin.

## Understand error categories

License failures and Grafana permission errors usually don’t include a category prefix. For those, refer to [License and entitlement](#license-and-entitlement) or [Cannot add or edit the data source](#cannot-add-or-edit-the-data-source).

After **Save &amp; test**, the plugin classifies connection and configuration errors and prefixes the message with a category in square brackets. Sections below follow the same order as the handshake: URL and network, TLS, timeout, server, then authentication.

Expand table

| Category    | Meaning                                                                                        |
|-------------|------------------------------------------------------------------------------------------------|
| `[config]`  | A data source setting is missing or invalid (empty URL, wrong Provider, HTTP 404/422).         |
| `[network]` | Grafana cannot reach Jira (DNS failure, connection refused, closed connection, HTTP 502/503).  |
| `[tls]`     | TLS/SSL handshake or certificate verification failure.                                         |
| `[timeout]` | Jira did not respond before the configured timeout elapsed.                                    |
| `[server]`  | Jira returned a server-side error (HTTP 500).                                                  |
| `[auth]`    | Authentication or authorization failure (invalid credentials, rejected OAuth 2.0 credentials). |
| `[unknown]` | The error does not match a known pattern.                                                      |

Expand **Show details** in the error alert to see the underlying error, including the HTTP status code. Use the category prefix to jump to the matching section in this guide.

## Connection errors

These issues relate to reaching your Jira instance. Most failures come from the **URL** or a sign-in page answering instead of the Jira REST API. For certificate errors, refer to [TLS/SSL certificate errors](#tlsssl-certificate-errors).

### Verify the Jira URL

Enter the **instance root**, not a project page, issue page, or REST path. The plugin appends `/rest/api/3/` (Jira Cloud) or `/rest/api/2/` (Jira Data Center / Jira Server) itself.

Expand table

| Deployment                | Correct **URL**                                                                                                                                   | Do not use                                                                                                                             |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| Jira Cloud                | `https://your-domain.atlassian.net`                                                                                                               | `https://your-domain.atlassian.net/browse/...`, `https://your-domain.atlassian.net/rest/api/3/...`, or `https://api.atlassian.com/...` |
| Jira Data Center / Server | The base URL of the installation, including a context path if you have one (for example `https://jira.example.com` or `https://example.com/jira`) | A project URL, a Jira dashboard URL, or a load-balancer health URL                                                                     |

If you omit `https://` or `http://`, the plugin adds `https://` at the start. For **OAuth 2.0** and **Scoped Token**, Grafana still stores the **URL** you enter, but API requests go to `https://api.atlassian.com/ex/jira/{cloudId}`.

To confirm Grafana can reach the REST API, call `/myself` from the Grafana server (not only from your laptop):

- Jira Cloud: `https://your-domain.atlassian.net/rest/api/3/myself`
- Jira Data Center / Server: `https://jira.example.com/rest/api/2/myself` (include a context path if the instance uses one)

A successful check returns JSON. An HTML sign-in page, SSO redirect, or 404 HTML page means the URL is wrong or a gateway is intercepting the request.

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

### Unable to connect to Jira

**Error message:** “\[network] Connection refused. The Jira server is not responding.”

**Cause:** Grafana cannot establish a connection to the Jira server.

**Solution:**

1. Verify the Jira URL is correct and accessible from the Grafana server. Refer to [Verify the Jira URL](#verify-the-jira-url).
2. Confirm any firewall, security group, or proxy between Grafana and Jira allows the connection.
3. For Jira Data Center or Jira Server, confirm the port in the URL is reachable. Many installations use 443; some still use 8080.
4. Ensure the Jira instance is running and responsive.
5. Test connectivity by opening the `/myself` URL from the Grafana server.

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

**Cause:** The health check calls `/myself` and Jira (or a gateway in front of it) returned HTTP 404. The configured URL usually isn’t the instance root, or **Provider** doesn’t match the deployment.

**Solution:**

1. Set **URL** to the instance root. Refer to [Verify the Jira URL](#verify-the-jira-url).
2. Verify **Provider** matches the deployment (Jira Cloud vs. Jira Data Center / Jira Server). Cloud uses API v3; Data Center and Server use API v2.
3. For Jira Data Center or Server, include the context path if the instance is served under a path such as `/jira`.
4. If Save &amp; test fails with 404 immediately after a Grafana Cloud trial or plugin install, confirm the plugin is entitled and upgraded to the latest version. Refer to [License and entitlement](#license-and-entitlement).

### Response is not valid Jira API output

**Error message:** “\[config] The response was not valid Jira API output. Verify the URL points at a Jira instance and that no proxy or sign-in page is intercepting the request.”

**Cause:** The request returned HTTP 200, but the body could not be parsed as Jira API JSON. This usually means an HTML page answered instead of Jira — an SSO or login redirect, a reverse-proxy sign-in page, a captive portal, or a URL pointing at a different service.

**Solution:**

1. Open the `/myself` URL from the Grafana server and confirm the response is JSON, not HTML. Refer to [Verify the Jira URL](#verify-the-jira-url).
2. If the browser shows a login or SSO page, Grafana is following the same redirect. Point **URL** at the Jira instance, not at the SSO portal, and allow the Grafana server to reach Jira without an interactive login.
3. Check whether a proxy, SSO gateway, or captive portal intercepts the request.
4. Verify the URL points at the Jira instance root, not a reverse proxy serving a different application.
5. If using Private Data Source Connect (PDC), confirm the agent forwards to Jira rather than to an error page.

### Request could not be processed

**Error message:** “\[config] Jira could not process the request. Verify the Provider setting and, for OAuth 2.0 or scoped tokens, the Cloud ID.”

**Cause:** Jira returned HTTP 422. This usually means the request reached Atlassian but the identifiers in it don’t match a Jira site.

**Solution:**

1. Verify the **Provider** setting matches your deployment type.
2. If using OAuth 2.0 or a scoped token, confirm the **Jira App Cloud Id** belongs to the Jira site you intend to query.
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

## TLS/SSL certificate errors

### TLS verification failed

**Error message:** “\[tls] TLS verification failed. Check the certificate configuration and any custom CA certificate.”

**Cause:** The TLS handshake failed, or Grafana could not verify the certificate presented by Jira. This is common when Jira uses a private CA or a self-signed certificate that is not in the trust store Grafana uses.

**Solution:**

1. Verify the certificate presented by Jira is valid and not expired.
2. If Jira uses a self-signed or internal CA certificate, enable **Add self-signed certificate** on the data source and paste the CA certificate in PEM format. This is the supported path on Grafana Cloud, where you can’t change the Grafana trust store.
3. On self-managed Grafana, you can instead add the CA to the Grafana host trust store and restart Grafana. Prefer the data source CA field when only this data source needs the extra CA.
4. Confirm the hostname in the **URL** matches a subject or SAN entry on the certificate.
5. If the URL uses `https://` but the port serves plain HTTP, correct the protocol or the port.

Do not enable **Skip TLS certificate validation** in production. Recreating the Jira API token does not fix a TLS trust failure.

## Timeout errors

### Timed out waiting for Jira

**Error message:** “\[timeout] Timed out waiting for a response from Jira. Check network reachability, any proxy or PDC agent, and Jira responsiveness.”

**Cause:** Jira did not respond before the request deadline. Jira also returns HTTP 408 or 504 in some deployments.

**Solution:**

1. Confirm the Jira instance is responsive by opening the URL in a browser from the Grafana server.
2. Check whether a proxy, PDC agent, or load balancer is delaying the request.
3. Check the Jira instance for high load or ongoing maintenance.
4. For Jira Data Center or Server, review the application logs for slow request handling.

## Server errors

### Jira returned a server error

**Error message:** “\[server] Jira returned a server error. Retry, and then check the Jira instance health.”

**Cause:** Jira returned HTTP 500 or another 5xx status.

**Solution:**

1. Retry the health check — server errors are often transient.
2. For Jira Cloud, check the [Atlassian status page](https://status.atlassian.com/).
3. For Jira Data Center or Server, review the Jira application logs for the corresponding error.

## Authentication errors

These issues relate to authentication settings and Jira credentials.

### OAuth 2.0 missing from the configuration UI

**Cause:** The plugin is older than 2.6.0, or **Provider** is set to Jira Data Center / Jira Server.

**Solution:**

1. Update the Jira data source plugin to version 2.6.0 or later. To update the plugin, refer to [Update a plugin](/docs/grafana/latest/administration/plugin-management/#update-a-plugin).
2. Set **Provider** to **Jira Cloud**, then select **OAuth 2.0 (service account)**.
3. If you need a user-login OAuth flow or OAuth for Jira Data Center / Server, those methods aren’t available. Use **Basic Auth** with an API token or PAT instead.

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

### Rotate an API token

Grafana doesn’t rotate Jira API tokens. If Save &amp; test starts failing after a token change, or Atlassian returns a permission error during rotation, replace the token in this order:

1. Create a **new** API token in Atlassian. Don’t revoke the token Grafana is using yet. To create a token, refer to [Manage API tokens for your Atlassian account](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/).
2. If the token is scoped, grant the same scopes as before (`read:jira-user` and `read:jira-work`, or the equivalent granular scopes) and keep **Scoped Token** and **Jira App Cloud Id** set.
3. In Grafana, paste the new token into **API Token** and click **Save &amp; test**. Confirm **Plugin health check successful**.
4. After the health check succeeds, revoke the old token in Atlassian.

If Atlassian blocks token creation, the Atlassian account needs permission to manage API tokens (an organization policy can deny this). That is an Atlassian permission, not a Grafana setting.

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

**Cause:** The authenticated user doesn’t have permissions to access certain projects or issues. This data source only reads Jira data. Jira site administrator access is not required.

**Solution:**

1. Verify the user has at least **Browse Projects** permission for the projects you want to query.
2. Check project-level permissions in Jira project settings.
3. For Jira Service Management queries, ensure the user has appropriate service desk permissions.
4. For scoped API tokens or OAuth 2.0, confirm the `read:jira-user` and `read:jira-work` scopes.
5. Contact your Jira administrator to review and adjust permissions if needed.

Grafana IRM (incident management) Jira integrations are a different product. They can require a Jira administrator to install apps or webhooks. Those requirements don’t apply to this data source.

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

### Results differ from Jira issue search

**Cause:** Grafana doesn’t run the Jira issue-search UI. It runs JQL through the REST API, applies **Limit**, returns only **Select Fields**, and expands array fields into extra rows.

**Solution:**

1. Raise **Limit** above the default `50` if Jira search shows more issues.
2. Select every column you expect. Grafana doesn’t add the default columns from Jira issue search.
3. If a count is too high, check whether a multi-value field is selected. Refer to [Multi-value fields and extra rows](/docs/plugins/grafana-jira-datasource/latest/query-editor/#multi-value-fields-and-extra-rows).
4. Compare JQL identifiers (`project`, `assignee`) with **Select Fields** labels (**Sprint Name**, **Story point estimate**).
5. For a full list of differences, refer to [Grafana results vs Jira search](/docs/plugins/grafana-jira-datasource/latest/query-editor/#grafana-results-vs-jira-search).

### Time range macros don’t filter correctly

**Cause:** Time range macros are used incorrectly in JQL, or the plugin is older than 2.5.1.

**Solution:**

1. Use the correct macro syntax: `$__timeFrom` and `$__timeTo`. Don’t wrap the macros in extra quotes. The plugin inserts a quoted `yyyy-MM-dd HH:mm` timestamp (24-hour).
2. Apply macros to JQL date fields like `created`, `updated`, or `resolved`.
3. Example: `created >= $__timeFrom AND created <= $__timeTo`.
4. Verify the dashboard time range includes the dates of your issues.
5. If Jira still rejects the date format, update the plugin to version 2.5.1 or later. To update the plugin, refer to [Update a plugin](/docs/grafana/latest/administration/plugin-management/#update-a-plugin).

### Sprint dates are empty

**Cause:** Sprint Start Date, Sprint End Date, or Sprint Complete Date values are null even though Jira has dates for those sprints.

Older plugin versions accepted only a few date layouts and dropped several formats that Jira emits, including ISO 8601 without milliseconds, RFC 3339 with a colon-separated timezone offset, and the Java `Date.toString()` form used by some Jira Data Center instances.

**Solution:**

1. Update the Jira data source plugin to version 2.7.4 or later. To update the plugin, refer to [Update a plugin](/docs/grafana/latest/administration/plugin-management/#update-a-plugin).
2. Re-run the query. **Sprint Name** isn’t affected by this parser; only the date sub-fields were empty.
3. If dates remain empty after the update, confirm the sprint field is selected in **Select Fields** and that the issues belong to a sprint that has those dates set in Jira.

### Sprint field missing from Select Fields

**Cause:** Plugin versions before 2.5.4 didn’t expand the Jira Sprint custom field into selectable sub-fields.

**Solution:**

1. Update the Jira data source plugin to version 2.5.4 or later.
2. In **Select Fields**, choose **Sprint Name**, **Sprint Start Date**, **Sprint End Date**, or **Sprint Complete Date**. There is no single **Sprint** column.

### Description missing from Select Fields

**Cause:** Plugin versions before 2.3.5 omitted the issue **Description** field from the drop-down.

**Solution:**

1. Update the Jira data source plugin to version 2.3.5 or later.
2. Select **Description** in **Select Fields**. If the field still doesn’t appear, confirm the authenticated user can view descriptions on the issues you query.

### Custom fields not appearing

**Cause:** Custom field types from Jira add-ons may not be supported.

**Solution:**

1. Check if the custom field type is supported by the plugin.
2. Try selecting the field by its custom field ID (for example, `customfield_10001`).
3. Use the **Extract fields** transformation for fields returned as stringified JSON.
4. Note that some custom field types from third-party Jira add-ons are not supported (this is a known limitation).

### SQL Expressions return only Key

**Cause:** Grafana SQL Expressions aren’t compatible with Jira query results. The plugin returns table-shaped issue frames, not a source for SQL Expressions.

**Solution:**

1. Don’t use SQL Expressions with this data source.
2. Filter and calculate in JQL, then use Grafana transformations such as **Add field from calculation** and **Group by**. Refer to [Work with transformations](/docs/plugins/grafana-jira-datasource/latest/query-editor/#work-with-transformations).

### Template variable issues

**Cause:** Template variables don’t work as expected in queries.

**Solution:**

1. Ensure the variable is correctly defined in the dashboard settings.
2. Use the correct variable syntax: `$variableName` or `${variableName}`.
3. For multi-value variables, use the **IN** clause: `assignee IN ($assignee)`.
4. Verify the variable query returns the expected values.
5. Check that the Jira data source is selected as the variable’s data source.
6. If a hidden variable should pass every option into JQL, enable **Include All option**, set the variable’s default to All, and raise **Limit** so the option list is complete.

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
3. For example, if a Sprint has 100 issues but the limit is 50, metrics only reflect 50 issues.

## Get additional help

If you continue to experience issues after following this troubleshooting guide:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Enable debug logging in Grafana to capture detailed error information.
3. [Raise a support ticket](/profile/org#support) if you’re a Grafana Cloud or Grafana Enterprise customer.

When reporting issues, include:

- Grafana version
- Jira data source plugin version
- Jira deployment type (Cloud, Data Center, or Server) and version
- Error messages (redact sensitive information)
- Steps to reproduce
- Relevant JQL queries (redact sensitive data)
