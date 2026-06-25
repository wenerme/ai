---
title: "Troubleshoot CockroachDB data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshoot common CockroachDB data source issues in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot CockroachDB data source issues

This document provides solutions to common issues you might encounter when configuring or using the CockroachDB data source. For configuration instructions, refer to [Configure the CockroachDB data source](/docs/plugins/grafana-cockroachdb-datasource/latest/configure/).

## Connection errors

These errors occur when Grafana can’t establish or maintain a connection to your CockroachDB instance.

### “ping failed” or “connection refused”

**Symptoms:**

- **Save &amp; test** fails with `connection validation failed: ping failed: connection refused`.

**Possible causes and solutions:**

Expand table

| Cause                     | Solution                                                                                                         |
|---------------------------|------------------------------------------------------------------------------------------------------------------|
| CockroachDB isn’t running | Verify your CockroachDB cluster is running and accepting connections.                                            |
| Incorrect host URL        | Check that the **Host URL** matches your CockroachDB instance address and port (for example, `localhost:26257`). |
| Firewall or network issue | Ensure the Grafana server can reach the CockroachDB host on the configured port.                                 |
| DNS resolution failure    | Verify the hostname resolves correctly from the Grafana server.                                                  |

### “connection validation timed out after 30s”

**Symptoms:**

- **Save &amp; test** hangs and then fails with a timeout error.

**Solutions:**

1. Verify network connectivity between the Grafana server and CockroachDB.
2. Check for firewall rules that might be silently dropping connections.
3. If connecting across regions or through a VPN, check network latency.
4. For Grafana Cloud, configure [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) if accessing a private CockroachDB instance.

### “test query timed out after 30s”

**Symptoms:**

- **Save &amp; test** passes the ping but fails with a query timeout.

**Solutions:**

1. The plugin runs `SELECT 1` to verify the connection is fully functional. If this times out, CockroachDB might be under heavy load.
2. Check CockroachDB cluster health and node availability.
3. Verify the configured user has permission to execute queries on the target database.

### “test query returned unexpected result”

**Symptoms:**

- **Save &amp; test** fails after successfully connecting and running a test query.

**Solutions:**

1. This indicates the `SELECT 1` health check query returned an unexpected value. This is rare and typically indicates a CockroachDB proxy or load balancer is intercepting queries.
2. Verify you’re connecting directly to CockroachDB and not through a query-rewriting proxy.

### “connection string is invalid”

**Symptoms:**

- **Save &amp; test** fails immediately with a connection string error.

**Solutions:**

1. Verify the **Host URL** format includes the port (for example, `myhost:26257`).
2. Check that the **Database** name is correct and doesn’t contain invalid characters.
3. Ensure the username doesn’t contain unescaped special characters.

### “unable to parse connection string” or “unable to generate a connection string”

**Symptoms:**

- **Save &amp; test** fails with a connection string parsing error.

**Possible causes and solutions:**

Expand table

| Cause                             | Solution                                                                                                                               |
|-----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| Malformed host URL                | Verify the **Host URL** is in the format `host:port` (for example, `myhost:26257`).                                                    |
| Special characters in credentials | Ensure the username and password don’t contain characters that break connection string parsing (for example, unescaped single quotes). |
| Missing required fields           | Verify all required fields (**Host URL**, **Database**, **User**) are filled in.                                                       |

### “invalid port in host specifier”

**Symptoms:**

- **Save &amp; test** fails with a port parsing error.

**Solutions:**

1. Verify the port in your **Host URL** is a valid number (for example, `26257`).
2. Check there are no extra characters after the port number.
3. If using an IPv6 address, use the format `[::1]:26257`.

### “invalid URL format: missing port in …”

**Symptoms:**

- **Save &amp; test** fails when using Kerberos or TLS/SSL authentication.

**Solutions:**

1. The **Host URL** must include a port number. Add the port to your URL (for example, change `myhost` to `myhost:26257`).

### “failed to configure database connection”

**Symptoms:**

- **Save &amp; test** fails after the connection string is generated but before the connection is validated.

**Solutions:**

1. Review the connection pool settings (**Max open connections**, **Max idle connections**, **Max connection lifetime**) for invalid values.
2. Check Grafana server logs for the underlying error message.

### “cockroach proxy creation failed”

**Symptoms:**

- **Save &amp; test** fails when using a secure socks proxy.

**Solutions:**

1. Verify the secure socks proxy configuration in Grafana.
2. Ensure the proxy server is running and reachable from the Grafana server.
3. Check that the proxy supports the required protocol for CockroachDB connections.

## Authentication errors

These errors occur when credentials are invalid or missing.

### “invalid username”

**Symptoms:**

- **Save &amp; test** fails with a validation error before attempting to connect.

**Solutions:**

1. Ensure the **User** field isn’t empty.
2. Verify the username matches a valid CockroachDB user. Run `SHOW USERS` in a CockroachDB SQL shell to confirm.

### “invalid password”

**Symptoms:**

- **Save &amp; test** fails with a validation error before attempting to connect.

**Solutions:**

1. Ensure the **Password** field isn’t empty (required for SQL and TLS/SSL authentication).
2. Verify the password is correct for the configured user.
3. If using Kerberos authentication, this error shouldn’t occur because Kerberos doesn’t require a password field.

### “invalid Host URL”

**Symptoms:**

- **Save &amp; test** fails with a validation error.

**Solutions:**

1. Ensure the **Host URL** field isn’t empty.
2. Verify the URL includes the host and port (for example, `localhost:26257`).

### “invalid database”

**Symptoms:**

- **Save &amp; test** fails with a validation error.

**Solutions:**

1. Ensure the **Database** field isn’t empty.
2. Verify the database exists in CockroachDB by running `SHOW DATABASES` in a SQL shell.

## Kerberos errors

These errors are specific to Kerberos authentication. Kerberos requires an Enterprise CockroachDB license.

### “kerberos error (InitSecContext)”

**Symptoms:**

- **Save &amp; test** fails during the Kerberos security context initialization.

**Possible causes and solutions:**

Expand table

| Cause                        | Solution                                                                                                                    |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| Invalid or expired ticket    | Renew the Kerberos ticket by running `kinit`.                                                                               |
| Wrong service principal      | Verify the **Kerberos server name** setting (default: `postgres`) matches the service principal registered in your KDC.     |
| DNS canonicalization failure | Verify the CockroachDB hostname resolves correctly and matches the service principal name.                                  |
| Clock skew                   | Ensure the clocks on the Grafana server and KDC are synchronized (Kerberos typically allows a maximum 5-minute difference). |

### “kerberos error (Marshaling token)” or “kerberos error when attempting to unmarshal token”

**Symptoms:**

- **Save &amp; test** fails during Kerberos token exchange.

**Solutions:**

1. This typically indicates a protocol mismatch between the Kerberos client and server.
2. Verify the Kerberos library versions are compatible.
3. Check the KDC logs for related errors.

### “kerberos: expected state ‘Completed’”

**Symptoms:**

- Kerberos authentication starts but doesn’t complete the negotiation.

**Solutions:**

1. Verify the service principal is correctly configured in the KDC.
2. Check that mutual authentication is properly set up.
3. Review KDC logs for authentication failures or policy violations.

### Credential cache load failure

**Symptoms:**

- **Save &amp; test** fails when loading the Kerberos credential cache.
- Error references the credential cache file path.

**Possible causes and solutions:**

Expand table

| Cause                 | Solution                                                                                                                                      |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| File doesn’t exist    | Verify the credential cache file exists at the configured path. The default path is `/tmp/krb5cc_<UID>`.                                      |
| Permission denied     | Ensure the user running Grafana has read access to the credential cache file.                                                                 |
| Expired credentials   | Renew credentials by running `kinit`.                                                                                                         |
| `KRB5CCNAME` override | If the `KRB5CCNAME` environment variable is set with a `FILE:` prefix, it overrides the configured path. Verify the file it points to exists. |

### krb5 configuration load failure

**Symptoms:**

- **Save &amp; test** fails before Kerberos authentication starts.
- Error references the krb5 config file.

**Solutions:**

1. Verify the krb5 configuration file exists at the configured path (default: `/etc/krb5.conf`).
2. If the `KRB5_CONFIG` environment variable is set, it overrides the default path. Verify the file it points to exists.
3. Check the file is a valid krb5 configuration format.

### Kerberos login failure

**Symptoms:**

- Kerberos credential loading succeeds but login fails.

**Solutions:**

1. Verify the Kerberos principal is valid and active in the KDC.
2. Check that the credential cache contains a valid, non-expired TGT (ticket-granting ticket).
3. Run `klist` to verify the cached tickets are current.
4. Renew credentials with `kinit` if tickets are expired.

## TLS/SSL errors

These errors occur when certificate configuration is incorrect.

### “missing or invalid root cert path” or “missing or invalid root cert content”

**Symptoms:**

- **Save &amp; test** fails with a root certificate error.

**Possible causes and solutions:**

Expand table

| Cause            | Solution                                                                                                       |
|------------------|----------------------------------------------------------------------------------------------------------------|
| Empty field      | Ensure the root certificate path or content is provided.                                                       |
| Wrong TLS method | If using `file-path`, provide a file path. If using `file-content`, paste the PEM-encoded certificate content. |
| File not found   | If using `file-path`, verify the file exists at the specified path on the Grafana server.                      |

### “missing or invalid client cert path” or “missing or invalid client cert content”

**Symptoms:**

- **Save &amp; test** fails with a client certificate error.

**Solutions:**

1. Ensure the client certificate path or content is provided.
2. Verify the **TLS/SSL method** matches how you’re providing the certificate (`file-path` or `file-content`).
3. If using `file-path`, verify the file exists and is readable by the Grafana process.

### “missing or invalid client key path” or “missing or invalid client key content”

**Symptoms:**

- **Save &amp; test** fails with a client key error.

**Solutions:**

1. Ensure the client key path or content is provided.
2. Verify the **TLS/SSL method** matches how you’re providing the key (`file-path` or `file-content`).
3. If using `file-path`, verify the file exists and is readable by the Grafana process.

### “failure to append root cert”

**Symptoms:**

- Connection fails after certificates are loaded.

**Solutions:**

1. Verify the root certificate is a valid PEM-encoded CA certificate.
2. Ensure the root certificate matches the CA that signed the CockroachDB server certificate.
3. Check that the certificate file isn’t corrupted or truncated.

### “unable to read root certificate”

**Symptoms:**

- TLS connection fails when loading the CA certificate file.

**Possible causes and solutions:**

Expand table

| Cause             | Solution                                                                    |
|-------------------|-----------------------------------------------------------------------------|
| File not found    | Verify the root certificate file exists at the path resolved by the plugin. |
| Permission denied | Ensure the Grafana process has read access to the certificate file.         |
| Corrupted file    | Verify the file contains valid PEM-encoded data.                            |

### “unable to load client certificate and key”

**Symptoms:**

- TLS connection fails when loading the client certificate and key pair.

**Possible causes and solutions:**

Expand table

| Cause                          | Solution                                                                                              |
|--------------------------------|-------------------------------------------------------------------------------------------------------|
| Mismatched certificate and key | Verify the client certificate and key are a matching pair.                                            |
| Encrypted private key          | Encrypted private keys aren’t supported. Use an unencrypted key.                                      |
| Invalid PEM format             | Verify both files contain valid PEM-encoded data.                                                     |
| Permission denied              | Ensure the Grafana process has read access to both files (files are written with `0600` permissions). |

### “error generating TLS config”

**Symptoms:**

- **Save &amp; test** fails with a TLS configuration error that wraps one of the errors in this section.

**Solutions:**

1. Check the full error message for the underlying cause (for example, missing certs, invalid paths, or permission issues).
2. Review the TLS/SSL configuration settings and verify all required fields are populated.

### TLS certificate file write errors

**Symptoms:**

- When using `file-content` mode, the plugin fails to write temporary certificate files.

**Solutions:**

1. Verify the Grafana data directory is writable by the Grafana process.
2. Check available disk space on the Grafana server.
3. Ensure no file system permissions prevent writing to the `tls/` subdirectory of the Grafana data path.

## Query errors

These errors occur when running queries against CockroachDB.

### Query timeout

**Symptoms:**

- Queries run for a long time and then fail with a timeout error.

**Solutions:**

1. Narrow the dashboard time range to reduce the amount of data queried.
2. Add filters to your query to reduce the result set.
3. Increase the **Query timeout** in the data source settings (range: 5-600 seconds, default: 30 seconds).
4. Optimize your CockroachDB query by adding indexes or simplifying joins.

### “test query failed”

**Symptoms:**

- **Save &amp; test** passes the ping but fails on the test query.

**Solutions:**

1. Verify the configured user has `SELECT` permission on the target database.
2. Verify the configured database exists and is accessible.
3. Check CockroachDB logs for query-level errors.

### Intermittent “connection reset”, “broken pipe”, or “EOF” errors

**Symptoms:**

- Queries fail intermittently with connection errors.
- Errors resolve on retry.

**Solutions:**

1. These errors are automatically retried by the plugin (up to 3 retries with 1-second pauses).
2. If they persist, check the CockroachDB cluster health and node availability.
3. Consider reducing **Max connection lifetime** to prevent stale connections.
4. If CockroachDB is performing cluster operations (node restarts, rebalancing), transient errors are expected and retries should handle them.

### Macro errors: “expected 1 argument for timeFilter”

**Symptoms:**

- Query fails with an error about incorrect macro arguments.

**Solutions:**

1. Verify the macro syntax. Each macro requires exactly one argument (the column name):

   - Correct: `$__timeFilter(created_at)`
   - Incorrect: `$__timeFilter(created_at, other_col)`
   - Incorrect: `$__timeFilter()`
2. Check for extra commas or spaces inside the macro parentheses.

### “No data” or empty results

**Symptoms:**

- Query executes without error but panels show “No data”.
- Query works in **Explore** but not in a dashboard panel.

**Possible causes and solutions:**

Expand table

| Cause                           | Solution                                                                                                             |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------|
| Time range doesn’t contain data | Expand the dashboard time range or verify data exists in CockroachDB for the selected period.                        |
| Wrong format selected           | Ensure the **Format** drop-down matches your visualization. Use **Time series** for graphs and **Table** for tables. |
| Missing `time` column alias     | Time series format requires a column named `time`. Add `AS time` to your timestamp column.                           |
| Query returns NULL values       | Aggregation functions like `AVG` return NULL for empty groups. Use `COALESCE` to provide a default value.            |
| Incorrect macro column          | Verify the column passed to `$__timeFilter` is the correct timestamp column for your table.                          |

### Query returns wrong data type

**Symptoms:**

- Panel shows unexpected values or formatting.
- Numbers appear as strings or timestamps don’t parse correctly.

**Solutions:**

1. Use explicit type casts in your SQL query (for example, `CAST(value AS FLOAT)` or `value::float`).
2. Ensure timestamp columns use a CockroachDB timestamp type (`TIMESTAMP`, `TIMESTAMPTZ`), not a string.
3. For numeric panels, verify the query returns numeric types, not strings.

## Template variable errors

These issues occur when using template variables with the CockroachDB data source.

### Variables return no values

**Symptoms:**

- Variable drop-down is empty.
- Dashboard shows “No data” for variable-dependent panels.

**Solutions:**

1. Verify the data source connection is working by running **Save &amp; test** in the data source settings.
2. Test the variable query directly in **Explore** to confirm it returns results.
3. For cascading variables, verify parent variables have valid selections. If a parent variable is empty, dependent variables can’t populate.
4. Check that the CockroachDB user has `SELECT` permission on the tables referenced in the variable query.

### Variables are slow to load

**Symptoms:**

- Dashboard takes a long time to load.
- Variable drop-down menus are slow to populate.

**Solutions:**

1. Set the variable **Refresh** option to **On dashboard load** instead of **On time range change** if the variable values don’t depend on the time range.
2. Add a `LIMIT` to your variable query if it returns many rows.
3. Avoid using `SELECT DISTINCT` on large tables without an index on the column.
4. Consider caching variable results by using a custom variable with pre-defined values for stable data.

## Performance issues

These issues relate to slow dashboards or high resource consumption.

### Dashboard panels load slowly

**Symptoms:**

- Panels take a long time to render.
- Multiple panels time out simultaneously.

**Solutions:**

1. Reduce the dashboard time range to limit the data scanned.
2. Add `WHERE` clauses and filters to narrow result sets.
3. Use `date_trunc` with larger intervals (for example, `'hour'` instead of `'minute'`) for long time ranges.
4. Add indexes in CockroachDB for frequently queried columns, especially timestamp columns used with `$__timeFilter`.
5. Review the **Query timeout** and **Max open connections** settings. Too many concurrent queries with a low connection limit can cause queuing.

### CockroachDB cluster impact

**Symptoms:**

- Grafana queries cause noticeable load on the CockroachDB cluster.
- Other applications experience slowdowns when dashboards are open.

**Solutions:**

1. Avoid `SELECT *` – select only the columns you need.
2. Reduce dashboard auto-refresh frequency. A 30-second refresh on a dashboard with 10 panels generates significant query load.
3. Use a read replica or follower read if your CockroachDB deployment supports it.
4. Enable [query caching](/docs/grafana/latest/administration/data-source-management/#query-caching) in Grafana (available in Grafana Enterprise and Grafana Cloud).

## Plugin errors

These errors relate to the plugin itself rather than the CockroachDB connection.

### Plugin not found or failed to load

**Symptoms:**

- CockroachDB doesn’t appear in the data source list.
- Error message about a missing or unsigned plugin.

**Solutions:**

1. Verify the plugin is installed. Navigate to **Plugins and data** &gt; **Plugins** and search for “CockroachDB”.
2. The CockroachDB data source is an Enterprise plugin. Verify you have a [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/).
3. If self-hosting, verify the plugin binary is in the Grafana plugins directory and the Grafana process has execute permissions.
4. Restart Grafana after installing or updating the plugin.

## Enable debug logging

To capture detailed error information, enable debug-level logging in Grafana. The process differs between self-hosted and Grafana Cloud environments.

### Self-hosted Grafana

1. Set the Grafana log level to `debug` in the configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Restart Grafana for the change to take effect.
3. Review logs in `/var/log/grafana/grafana.log` (or your configured log location).
4. Look for entries containing `CockroachDB` for plugin-specific messages.
5. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

### Grafana Cloud

1. Navigate to **Administration** &gt; **General**.
2. Under **Log level**, select **Debug**.
3. Reproduce the issue and review logs in the **Explore** section using the built-in Grafana logs data source.
4. Reset the log level to **Info** after troubleshooting.

## Get additional help

If the solutions in this document don’t resolve your issue:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Consult the [CockroachDB documentation](https://www.cockroachlabs.com/docs/) for service-specific guidance.
3. Contact [Grafana Support](/profile/org#support) if you’re an Enterprise, Cloud Pro, or Cloud Contracted user.

When reporting issues, include:

- Grafana version and CockroachDB plugin version.
- Error messages (redact sensitive information).
- Steps to reproduce the issue.
- Relevant configuration (redact credentials).
