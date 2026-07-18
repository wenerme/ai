---
title: "Troubleshoot Databricks data source issues | Grafana Enterprise Plugins documentation"
description: "This document describes troubleshooting guidance for the Databricks data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Databricks data source issues

This document outlines common errors you may encounter when using the Databricks data source. To help prevent some of these issues and ensure access to the latest features and fixes, Grafana recommends keeping your Databricks plugin up to date. Previous plugin versions may have had bugs or are missing features.

The sections follow the order you typically encounter issues: first licensing and setup, then plugin version, then connecting, then authenticating, then configuring, and finally running queries. Because an outdated plugin version causes many problems, confirm you’re on the latest version early in your troubleshooting.

## License and setup errors

The Databricks data source is a Grafana Enterprise plugin. It requires an active Grafana Enterprise or Grafana Cloud license that includes the plugin, and only account administrators can install it. Most setup failures are caused by a licensing or permissions issue rather than a connection problem. Refer to [Requirements](/docs/plugins/grafana-databricks-datasource/latest/) and [Before you begin](/docs/plugins/grafana-databricks-datasource/latest/configure/#before-you-begin) for prerequisites.

### Plugin health check failed

When you click **Save &amp; test**, the data source returns a generic `Plugin health check failed` message with no further detail. Before troubleshooting the connection, confirm your license and permissions, because a missing or expired Enterprise license produces the same generic error.

**Possible causes and solutions:**

Expand table

| Cause                                                                                            | Solution                                                                                                                                                                                          |
|--------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| The Databricks plugin isn’t included in your Grafana Enterprise license.                         | Confirm that Databricks is part of your plan. Contact your Grafana account team to add the Enterprise plugin to your license.                                                                     |
| Your Grafana Enterprise license has expired. The data source worked previously and then stopped. | Renew your Grafana Enterprise license. Refer to [Grafana Enterprise](/docs/grafana/latest/introduction/grafana-enterprise/) for license management.                                               |
| The host, HTTP path, or credentials are incorrect.                                               | Verify your connection and authentication settings, then review the [Connection and network errors](#connection-and-network-errors) and [Authentication errors](#authentication-errors) sections. |

### Databricks plugin isn’t available to install

The plugin is signed as part of your license, but no install or configure button appears, so you can’t add the data source.

**Cause:** Installing an Enterprise plugin requires administrator authorization. A user without the required role can see the plugin but can’t install it.

**Solution:** Ask an account or organization administrator to install the plugin. The user must have the `Organization administrator` role to install the plugin and configure the data source. Refer to [Plugin management](/docs/grafana/latest/administration/plugin-management/) for details.

## Version and upgrade guidance

Many Databricks data source issues are caused by running an outdated plugin version. Before deeper troubleshooting, confirm you’re on the latest version, because upgrading resolves a wide range of problems.

> Note
>
> On Grafana Cloud, the Databricks plugin is managed by Grafana and updates automatically. On self-managed Grafana, you must update plugins manually. In other managed environments, such as Azure Managed Grafana, the plugin version is controlled by the platform provider and can lag behind the latest release, so confirm which version your environment is running.

### Check and update the plugin version

To check your version and update the plugin:

1. Click **Connections** &gt; **Plugins and data** &gt; **Plugins** in the left-side menu.
2. Search for `Databricks` and open the plugin page.
3. Review the installed version and the latest available version.
4. If an update is available, click **Update** to install the latest version.

For more information, refer to [Plugin management](/docs/grafana/latest/administration/plugin-management/).

### Symptoms of an outdated plugin version

Outdated plugin versions can produce confusing symptoms that aren’t obvious license, connection, or query errors:

- **Configuration tab is blank or incomplete.** On older versions, the settings UI may not render all fields, which can look like your settings were lost. Your settings aren’t lost. Update the plugin to restore the full configuration UI.
- **Total connection failures with unhelpful errors.** Severely outdated versions, for example `v0.3.9`, can fail to connect at all and return errors that don’t point to the real cause.
- **Intermittent `Plugin unavailable` or HTTP 500 errors.** Dashboards with many Databricks panels, for example 15 or more, can fail intermittently on outdated versions, especially in Azure Managed Grafana.

**Solution:** Update to the latest plugin version. Many of these issues resolve after upgrading.

## Connection and network errors

These errors occur when Grafana can’t establish a connection to your Databricks workspace.

### Connection refused

The connection to the Databricks server was actively refused.

**Possible causes:**

- Incorrect hostname or port
- Firewall blocking the connection
- Network security group rules preventing access

**Solutions:**

- Verify the hostname matches your Databricks workspace URL
- Check that port 443 is open for outbound connections
- Review firewall and network security configurations

### No such host

DNS resolution failed for the specified hostname.

**Possible causes:**

- Incorrect hostname in data source configuration
- DNS server issues
- Typo in the workspace URL

**Solutions:**

- Verify the hostname is correct, for example, `<workspace>.cloud.databricks.com`
- Check DNS resolution from the Grafana server
- Ensure there are no typos in the configuration

### Request timeout

The connection or query took too long to complete.

**Possible causes:**

- SQL warehouse is starting up, which can take several minutes
- Query is too complex or processing large amounts of data
- Network latency issues

**Solutions:**

- Increase the timeout setting in the data source configuration
- Wait for the SQL warehouse to fully start
- Optimize your query to reduce execution time
- Check for network connectivity issues

### Network is unreachable

The Grafana server can’t reach the Databricks network.

**Solutions:**

- Check network connectivity from the Grafana server
- Verify VPN or private link connections if applicable
- Review network routing configurations

## Authentication errors

Authentication errors occur when there are issues with your credentials or access permissions.

### 401 Unauthorized

This error indicates that your authentication credentials are invalid or missing.

**Possible causes:**

- Invalid or expired Personal Access Token (PAT)
- Incorrect OAuth credentials (Client ID or Client Secret)
- Token has been revoked or regenerated

**Solutions:**

- Generate a new Personal Access Token in your Databricks workspace
- Verify your OAuth Client ID and Client Secret are correct
- Check that your token hasn’t expired

### 403 Forbidden

This error indicates that your credentials are valid but you lack permission to access the requested resource.

**Possible causes:**

- Insufficient permissions on the SQL warehouse
- User doesn’t have access to the specified catalog, schema, or table
- API tokens are disabled for your user account

**Solutions:**

- Contact your Databricks workspace administrator to grant appropriate permissions
- Verify you have `USE` privilege on the catalog and schema
- Ask your administrator to enable API tokens for your account

### API tokens are disabled for user

Your Databricks administrator has disabled API token authentication for your account.

**Solution:** Contact your site administrator to enable tokens for your user account.

### Authentication token has expired

Your OAuth or access token has expired and needs to be refreshed.

**Solutions:**

- For Personal Access Tokens: Generate a new token in Databricks
- For OAuth: Re-authenticate through the configured OAuth flow
- Check token expiration settings in your Databricks workspace

### Invalid OAuth access token / Invalid access token

The provided access token is malformed or not recognized by Databricks.

**Solutions:**

- Verify the token was copied correctly without extra whitespace
- Regenerate the token and update your data source configuration
- For OAuth Passthrough: Confirm the signed-in user authenticated through the configured OAuth provider, and that the authentication type is set to **OAuth Passthrough**, which forwards the user’s OAuth identity automatically

### 401 Unauthorized with Azure (On-Behalf-Of) despite correct credentials

You configured Azure On-Behalf-Of (OBO) authentication with a valid client ID and client secret, but queries still fail with a 401 error.

**Cause:** This is usually an Azure AD (Microsoft Entra ID) app registration misconfiguration that causes token validation to fail, not a plugin bug. Common misconfigurations include missing API permissions, ID tokens not enabled, or admin consent not granted.

**Solutions:**

- Verify the app registration has the required API permissions: Microsoft Graph `User.Read` and Azure Databricks `user_impersonation`.
- Enable **ID tokens** under **App registrations** &gt; **Authentication**.
- Grant **Admin consent** for the tenant so users aren’t prompted individually.
- Confirm the `[auth.azuread]` `scopes` include `.default openid email profile offline_access`. Setting the authentication type to **Azure (On-Behalf-Of)** forwards the user’s OAuth identity automatically.
- Follow the full setup in [Azure (On-Behalf-Of) authentication](/docs/plugins/grafana-databricks-datasource/latest/configure/#azure-on-behalf-of-authentication).

### `invalid_client` / Client authentication failed

You configured an Azure service principal but receive `invalid_client` or `Client authentication failed`.

**Cause:** **OAuth M2M** authenticates against a Databricks-managed service principal and doesn’t work with Azure Entra ID (Microsoft Entra ID) credentials. Selecting **OAuth M2M** with Azure AD credentials produces this error.

**Solutions:**

- For Azure Databricks with an Azure AD service principal, set **Authentication type** to **Azure Entra ID M2M** instead of **OAuth M2M**.
- For a Databricks-managed service principal on any cloud, use **OAuth M2M** with the client ID and secret generated in Databricks.
- In plugin versions earlier than 1.14.3, Azure Entra ID M2M was a preview feature gated behind the `databricksAzureM2MEntraIdAuth` feature toggle. Upgrade to the latest plugin version, where the method is available to all instances, or enable the feature toggle in your Grafana configuration if upgrading isn’t an option.

### Can’t configure OAuth authentication in Azure Managed Grafana

OAuth Passthrough and Azure (On-Behalf-Of) authentication require editing the `grafana.ini` configuration file, for example the `[azure]` and `[auth.azuread]` sections. In Azure Managed Grafana and other fully managed environments, you can’t edit `grafana.ini`, so these methods can’t be fully configured.

**Solutions:**

- Use **Personal Access Token**, **OAuth M2M**, or **Azure Entra ID M2M** authentication. None of these require editing `grafana.ini`.
- For Azure Databricks, **Azure Entra ID M2M** is the recommended alternative because it authenticates as a service principal without server-side configuration.

## Configuration errors

These errors occur when the data source is not configured correctly.

### Missing host

The Databricks workspace hostname is not configured.

**Solution:** Add the hostname in the data source configuration, for example, `<workspace>.cloud.databricks.com`.

### Missing HTTP path

The SQL warehouse HTTP path is not configured.

**Solution:** Add the HTTP path from your SQL warehouse connection details, for example, `/sql/1.0/warehouses/<warehouse-id>`.

### Missing token

No Personal Access Token is configured for PAT authentication.

**Solution:** Generate a Personal Access Token in Databricks and add it to the data source configuration.

### Missing `clientId` / Missing `clientSecret`

OAuth M2M authentication is missing required credentials.

**Solution:** Provide both the Client ID and Client Secret from your Databricks service principal.

### You must enable Forward OAuth Identity

Azure On-Behalf-Of (OBO) authentication requires OAuth identity forwarding (`oauthPassThru`). When you select **OAuth Passthrough** or **Azure (On-Behalf-Of)** in the UI, the plugin enables this setting automatically, so this error usually appears when the data source is provisioned with YAML and `oauthPassThru` isn’t set.

**Solutions:**

- In the UI, set **Authentication type** to **OAuth Passthrough** or **Azure (On-Behalf-Of)**. The plugin enables OAuth identity forwarding automatically.
- If you provision the data source with YAML, set `oauthPassThru: true` in `jsonData`.

### Databricks community edition doesn’t support token based authentication

Community edition workspaces don’t support Personal Access Token authentication.

**Solution:** Use OAuth M2M authentication with a service principal instead, or upgrade to a standard Databricks workspace.

### Invalid credentials type for Azure On-Behalf-Of authentication

The configured Azure credentials are not compatible with OBO authentication.

**Solution:** Ensure you’ve configured Azure Client Secret OBO credentials correctly with the required Tenant ID, Client ID, and Client Secret.

## Session errors

Session errors occur when the connection to the Databricks SQL warehouse is interrupted or the session expires.

### Invalid SessionHandle / Session handle is invalid or closed

The database session has become invalid, typically because it was closed due to inactivity or timeout.

**Possible causes:**

- Query took too long and the session expired
- SQL warehouse went idle and terminated the session
- Connection was interrupted

**Solutions:**

- Increase the timeout setting in the data source configuration
- Configure your SQL warehouse to have a longer idle timeout
- Restart your SQL warehouse
- Consider using a serverless SQL warehouse for better availability

## Query and SQL errors

These errors relate to issues with your SQL queries.

### UNRESOLVED\_ROUTINE

Can’t resolve a function or routine in your query.

**Example error:**

[Copy code to clipboard] Copy

```none
[UNRESOLVED_ROUTINE] Cannot resolve routine `my_custom_function` on search path. Verify the spelling of `my_custom_function`, check that the routine exists, and confirm you have `USE` privilege on the catalog and schema, and EXECUTE on the routine. SQLSTATE: 42883
```

**Solutions:**

- Verify the function name is spelled correctly
- Check that the function exists in the expected catalog and schema
- Ensure you have `USE` privilege on the catalog and schema
- Ensure you have `EXECUTE` privilege on the routine
- Use fully qualified function names, for example, `catalog.schema.function_name`

### CAST\_INVALID\_INPUT

A value can’t be converted to the requested data type.

**Example error:**

[Copy code to clipboard] Copy

```none
[CAST_INVALID_INPUT] The value '12.34.56' of the type "STRING" cannot be cast to "BIGINT" because it is malformed. SQLSTATE: 22018
```

**Solutions:**

- Check the data in your source column for invalid values
- Use `try_cast()` instead of `cast()` to return NULL for invalid values instead of failing
- Clean or filter your data before casting

### ERROR\_STATE

A general query execution failure occurred.

**Possible causes:**

- Syntax errors in your SQL query
- Referenced tables or columns don’t exist
- Permission issues on specific tables

**Solutions:**

- Validate your SQL syntax in the Databricks SQL editor first
- Verify table and column names exist
- Check permissions on all referenced objects

## Query timeouts and performance

Large or unfiltered queries against Databricks can exceed timeouts, consume excessive memory, or fail intermittently. The following errors and best practices help you avoid performance problems.

### context deadline exceeded: Could not process SQL results

A query took longer than the allowed time to return results, usually because it scans a large Databricks table without filters.

**Cause:** Querying large tables without `WHERE` clauses or time filters returns more data than the plugin can process within the timeout.

**Solutions:**

- Add `WHERE` clauses to narrow the result set.
- Use the `$__timeFilter(column)` macro to restrict results to the dashboard time range. Refer to [Macros](/docs/plugins/grafana-databricks-datasource/latest/query-editor/#macros).
- Add a `LIMIT` clause or lower the **Max rows** setting.
- Increase the **Timeout** setting if the query is necessarily large. Refer to [Additional configuration options](/docs/plugins/grafana-databricks-datasource/latest/configure/#additional-configuration-options).
- Use a larger or serverless SQL warehouse for heavy workloads.

### Grafana runs out of memory or crashes

The Databricks plugin consumes excessive memory, for example several GB, and can crash Grafana.

**Cause:** A common root cause is a faulty alert rule that generates a storm of failing queries that are retried repeatedly, which compounds memory use. Large unfiltered result sets also increase memory pressure.

**Solutions:**

- Review and fix or pause alert rules that fail repeatedly. Refer to [Alerting](/docs/plugins/grafana-databricks-datasource/latest/alerting/).
- Lower the **Retries** count and set a **Retry timeout** so failing queries don’t pile up. Refer to [Query retries](#query-retries).
- Filter queries and lower **Max rows** to limit result set size.
- For self-managed deployments, monitor the plugin’s memory use and size the host appropriately.

### Queries on very large datasets time out

Queries that process very large datasets, for example terabytes of data, time out, and there’s no single obvious timeout field for query duration in the data source settings.

**Cause:** Two timeouts apply to a Databricks query: the data source **Timeout** setting, which controls how long the plugin waits for Databricks, and the Grafana `dataproxy` timeout, which controls how long Grafana waits for the data source to respond. The default `dataproxy` timeout may be lower than a long-running query needs.

**Solutions:**

- Increase the data source **Timeout** setting. Refer to [Additional configuration options](/docs/plugins/grafana-databricks-datasource/latest/configure/#additional-configuration-options).
- Increase the Grafana `dataproxy` timeout for long-running queries. Refer to [Configure Grafana](/docs/grafana/latest/setup-grafana/configure-grafana/#dataproxy).
- Optimize queries by filtering, aggregating in Databricks, and avoiding `SELECT *`.
- Use a serverless or larger SQL warehouse.

### Performance best practices

Follow these practices to keep Databricks queries fast and reliable:

- **Filter large tables.** Always apply `WHERE` clauses and the `$__timeFilter(column)` macro so queries scan only the data you need.
- **Limit result size.** Use `LIMIT` and the **Max rows** setting to cap how many rows are returned to Grafana.
- **Aggregate in Databricks.** Push aggregation and grouping into your SQL so Databricks returns summarized data rather than raw rows.
- **Use alerting carefully.** A failing alert rule can generate repeated, retried queries. Monitor alert rules and avoid configuring alerts on user-context authentication methods. Refer to [Alerting](/docs/plugins/grafana-databricks-datasource/latest/alerting/).
- **Tune timeouts.** Set the data source **Timeout** and the Grafana `dataproxy` timeout to match your slowest expected query.
- **Plan for memory in self-managed deployments.** Large result sets and query storms increase plugin memory use, so monitor memory and size your host for peak load.
- **Right-size your SQL warehouse.** Use a larger or serverless SQL warehouse for heavy or concurrent workloads, and keep warehouses warm to avoid cold-start latency.

## Server errors

These errors originate from the Databricks service.

### 500 Internal Server Error

An unexpected error occurred on the Databricks server.

**Solutions:**

- Retry the query after a short delay
- Check the Databricks status page for ongoing incidents
- If the error is reproducible when querying a Unity Catalog table with float columns, try casting the affected columns to another numeric type, such as `DOUBLE` or `DECIMAL`. If the error persists, contact Grafana Support.

### 502 Bad Gateway / 503 Service Unavailable

The Databricks service is temporarily unavailable.

**Possible causes:**

- SQL warehouse is starting or scaling
- Service maintenance or temporary outage
- High load on the Databricks service

**Solutions:**

- Wait a few moments and retry
- Check if your SQL warehouse is running
- Check the Databricks status page for service issues

### 504 Gateway Timeout

The request took too long to process on the server side.

**Solutions:**

- Optimize your query to reduce execution time
- Increase the timeout settings
- Consider breaking large queries into smaller batches

## Unity Catalog errors

These errors are specific to Unity Catalog functionality.

### Token is required for token-based authentication

When using Unity Catalog with token authentication, a valid token must be provided.

**Solution:** Ensure your Personal Access Token or OAuth token is correctly configured.

### No authentication method configured

The data source doesn’t have a valid authentication method set up.

**Solution:** Configure one of the supported authentication methods: Personal Access Token, OAuth M2M, OAuth Passthrough, or Azure On-Behalf-Of.

### Failed to fetch Unity catalogs / Failed to fetch schemas

Unable to retrieve catalog or schema metadata from Unity Catalog.

**Possible causes:**

- Unity Catalog support is not enabled in data source settings
- Insufficient permissions to list catalogs or schemas
- Network connectivity issues

**Solutions:**

- Enable Unity Catalog support in the data source configuration
- Verify you have permissions to access the Unity Catalog catalogs and schemas
- Check network connectivity to the Databricks workspace

## Alerting errors

These errors occur when an alert rule that uses the Databricks data source fails to evaluate.

### Alert rule fails with no user context

Alert rules can’t run when the data source uses an authentication method that requires a signed-in user.

**Cause:** The data source is configured with **OAuth Passthrough** or **Azure (On-Behalf-Of)** authentication. Alert rules run in the background with no user present, so no credentials are available for the query.

**Solution:** Reconfigure the data source with **Personal Access Token**, **OAuth M2M**, or **Azure Entra ID M2M** authentication. Refer to [Alerting](/docs/plugins/grafana-databricks-datasource/latest/alerting/) for the list of supported methods.

### Alert evaluation times out while the SQL warehouse starts

An idle Databricks SQL warehouse can take several minutes to resume, which may exceed the query timeout during a scheduled evaluation.

**Solutions:**

- Increase the **Timeout** setting in the data source configuration.
- Use a serverless SQL warehouse for faster startup.
- Configure the SQL warehouse with a longer idle timeout so it stays available between evaluations.

## Template variable and macro errors

These issues occur when queries use template variables or macros, such as `$__timeFilter`.

### Macro appears not to substitute, or returns a 403 error

A query that uses a macro such as `$__timeFilter(time)` fails, and it can look like the macro isn’t being substituted.

**Cause:** In environments with strict firewall rules, the request generated when the macro expands can be blocked by network rules. The macro substitutes correctly, but the resulting query or API call is blocked, which surfaces as a 403 error or as data not loading. This is a firewall or permissions issue, not a macro problem.

**Solutions:**

- Review your firewall and network rules to confirm the Grafana server can reach your Databricks workspace on port 443.
- Verify the credentials used by the data source have permission to run the query against the target catalog, schema, and table.
- Test the same query without the macro, substituting a fixed time range, to confirm whether the failure is related to connectivity rather than the macro. Refer to [Connection and network errors](#connection-and-network-errors) and [403 Forbidden](#403-forbidden).
- For the list of supported macros, refer to [Macros](/docs/plugins/grafana-databricks-datasource/latest/query-editor/#macros).

### No data after upgrading the plugin

After upgrading across major plugin versions, for example from v1.6.2 to v1.12.6, queries that use template variables return `no data`.

**Cause:** How the plugin interpolates template variables changed between major versions. A query that relied on the older interpolation behavior can produce a data type mismatch, which returns no rows. The same change can also affect URL encoding in data links.

**Solutions:**

- Review queries that use variables and confirm the interpolated value matches the column’s data type. Quote string values, for example `'${var}'`, and leave numeric values unquoted.
- For multi-value variables, use the appropriate [variable format](/docs/grafana/latest/dashboards/variables/variable-syntax/), such as `${var:singlequote}` or `${var:csv}`, so the generated SQL is valid.
- Check data links that include variables for URL encoding issues, and re-create them if the encoding changed.
- Refer to [Template variables](/docs/plugins/grafana-databricks-datasource/latest/template-variables/) for how interpolation works in queries.

## Query retries

The Databricks data source automatically retries queries when encountering certain transient errors:

- 503 Service Unavailable
- Invalid SessionHandle
- Invalid OAuth access token
- Authentication token has expired
- The user must authenticate again

By default, queries are retried up to 5 times. You can configure the number of retries and retry timeout in the data source settings.

## Enable debug logging

To capture detailed information about connections and queries, enable debug logging:

1. Edit the Databricks data source configuration.
2. Under [Additional configuration options](/docs/plugins/grafana-databricks-datasource/latest/configure/#additional-configuration-options), check **Debug**.
3. Click **Save &amp; test**.
4. Reproduce the issue and check the Grafana server logs for detailed output.

> Note
>
> CloudFetch is enabled by default to speed up large result sets. If you need to disable it for troubleshooting, set the `disableCloudFetch` feature toggle in your Grafana configuration.

## Get additional help

If you continue to experience issues:

1. Check the Grafana server logs for detailed error messages.
2. Enable debug logging in the data source configuration for more verbose output.
3. Verify your configuration in the Databricks SQL editor first.
4. Check the [Databricks documentation](https://docs.databricks.com/) for platform-specific guidance.
5. Contact [Grafana Support](/contact/) if you’re an Enterprise, Cloud Pro, or Cloud Advanced user. When reporting issues, include:

- Grafana version
- Databricks version and deployment type (Databricks on AWS, Azure, or Google Cloud)
- Authentication method (PAT, OAuth M2M, OAuth Passthrough, Azure OBO, or Azure Entra ID M2M)
- Error messages (redact sensitive information)
- Steps to reproduce
- Relevant configuration such as data source settings, Unity Catalog settings, and TLS settings (redact tokens, passwords, and other credentials)
