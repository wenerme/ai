---
title: "Troubleshoot Databricks data source issues | Grafana Enterprise Plugins documentation"
description: "This document describes troubleshooting guidance for the Databricks data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Databricks data source issues

This document outlines common errors you may encounter when using the Databricks data source. To help prevent some of these issues and ensure access to the latest features and fixes, Grafana recommends keeping your Databricks plugin up to date. Previous plugin versions may have had bugs or are missing features.

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
- For OAuth Passthrough: Ensure “Forward OAuth Identity” is enabled in the data source settings

## Connection and network errors

These errors occur when Grafana cannot establish a connection to your Databricks workspace.

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

- Verify the hostname is correct (e.g., `<workspace>.cloud.databricks.com`)
- Check DNS resolution from the Grafana server
- Ensure there are no typos in the configuration

### Request timeout

The connection or query took too long to complete.

**Possible causes:**

- SQL warehouse is starting up (can take several minutes)
- Query is too complex or processing large amounts of data
- Network latency issues

**Solutions:**

- Increase the timeout setting in the data source configuration
- Wait for the SQL warehouse to fully start
- Optimize your query to reduce execution time
- Check for network connectivity issues

### Network is unreachable

The Grafana server cannot reach the Databricks network.

**Solutions:**

- Check network connectivity from the Grafana server
- Verify VPN or private link connections if applicable
- Review network routing configurations

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

Cannot resolve a function or routine in your query.

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
- Use fully qualified function names (e.g., `catalog.schema.function_name`)

### CAST\_INVALID\_INPUT

A value cannot be converted to the requested data type.

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

## Configuration errors

These errors occur when the data source is not configured correctly.

### Missing host

The Databricks workspace hostname is not configured.

**Solution:** Add the hostname in the data source configuration (e.g., `<workspace>.cloud.databricks.com`).

### Missing HTTP path

The SQL warehouse HTTP path is not configured.

**Solution:** Add the HTTP path from your SQL warehouse connection details (e.g., `/sql/1.0/warehouses/<warehouse-id>`).

### Missing token

No Personal Access Token is configured for PAT authentication.

**Solution:** Generate a Personal Access Token in Databricks and add it to the data source configuration.

### Missing clientId / Missing clientSecret

OAuth M2M authentication is missing required credentials.

**Solution:** Provide both the Client ID and Client Secret from your Databricks service principal.

### You must enable Forward OAuth Identity

For Azure On-Behalf-Of (OBO) authentication, OAuth identity forwarding must be enabled.

**Solution:** Enable “Forward OAuth Identity” in the data source configuration settings.

### Databricks community edition doesn’t support token based authentication

Community edition workspaces don’t support Personal Access Token authentication.

**Solution:** Use OAuth M2M authentication with a service principal instead, or upgrade to a standard Databricks workspace.

### Invalid credentials type for Azure On-Behalf-Of authentication

The configured Azure credentials are not compatible with OBO authentication.

**Solution:** Ensure you’ve configured Azure Client Secret OBO credentials correctly with the required Tenant ID, Client ID, and Client Secret.

## Server errors

These errors originate from the Databricks service.

### 500 Internal Server Error

An unexpected error occurred on the Databricks server.

**Solutions:**

- Retry the query after a short delay
- Check the Databricks status page for ongoing incidents
- If querying a Unity Catalog table with float columns, this may be a known issue

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
- Verify you have permissions to access the Unity Catalog metastore
- Check network connectivity to the Databricks workspace

## Query retries

The Databricks data source automatically retries queries when encountering certain transient errors:

- 503 Service Unavailable
- Invalid SessionHandle
- Invalid OAuth access token
- Authentication token has expired
- The user must authenticate again

By default, queries are retried up to 5 times. You can configure the number of retries and retry timeout in the data source settings.

## Get additional help

If you continue to experience issues:

1. Check the Grafana server logs for detailed error messages.
2. Enable debug logging in the data source configuration for more verbose output.
3. Verify your configuration in the Databricks SQL editor first.
4. Check the [Databricks documentation](https://docs.databricks.com/) for platform-specific guidance.
5. Contact [Grafana Support](/contact/) if you’re an Enterprise, Cloud Pro, or Cloud Advanced user. When reporting issues, include:

- Grafana version
- Databricks version and deployment type (Databricks on AWS, Azure, or Google Cloud)
- Authentication method (PAT, OAuth M2M, OAuth Passthrough, or Azure OBO)
- Error messages (redact sensitive information)
- Steps to reproduce
- Relevant configuration such as data source settings, Unity Catalog settings, and TLS settings (redact tokens, passwords, and other credentials)
