---
title: "Troubleshoot IBM Db2 data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshoot common issues with the IBM Db2 data source plugin"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot IBM Db2 data source issues

This document provides solutions to common issues you might encounter when configuring or using the IBM Db2 data source. For configuration instructions, refer to [Configure the IBM Db2 data source](/docs/plugins/grafana-ibmdb2-datasource/latest/configure/).

## Plugin startup issues

These issues occur when the plugin backend can’t load or start, so no connection is ever attempted.

### “Plugin unavailable” or the backend fails to start (GLIBC version mismatch)

**Symptoms:**

- The data source shows **Plugin unavailable**, or dashboards that use it fail to load.
- The Grafana server logs show the plugin backend failed to start, with an error such as `version 'GLIBC_2.xx' not found` referencing `gpx_ibmdb2_linux_amd64`.
- The host runs an older Linux distribution such as RHEL, Rocky Linux, or AlmaLinux 8 or 9.

**Cause:**

On AMD64 (x86\_64), the plugin backend is a natively compiled binary that requires `glibc` 2.35 or later. Distributions built on older `glibc`, including RHEL, Rocky Linux, and AlmaLinux 8 (`glibc` 2.28) and 9 (`glibc` 2.34), can’t run it. This constraint doesn’t apply to ARM64 (aarch64) hosts.

> Note
>
> RHEL 8 and other `glibc` 2.28 or 2.34 distributions on AMD64 are a known compatibility gap. A compatible build is under investigation, but there’s no committed timeline. Contact Grafana Support to register interest.

**Solutions:**

1. Check the host’s `glibc` version with `ldd --version`. The AMD64 binary requires 2.35 or later.
2. Run Grafana on a host with `glibc` 2.35 or later, for example Ubuntu 22.04 or later, or Debian 12 or later.
3. If you can’t upgrade the host OS on AMD64, run Grafana on an ARM64 (aarch64) host, where this constraint doesn’t apply.
4. On Grafana Cloud, the plugin runs on a compatible platform, so this issue doesn’t occur.

## Connection errors

These errors occur when Grafana cannot connect to the IBM Db2 database.

### “Database connection error”

**Symptoms:**

- Save &amp; test fails with a message that starts with `Database connection error.` followed by the driver detail.
- The appended detail often includes `SQL30081N`, `SQLSTATE=08001`, `Connection refused`, or `ERRORCODE=-4499`.

**Possible causes and solutions:**

Expand table

| Cause                                     | Solution                                                                                                                                     |
|-------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| Database server is not running            | Start the IBM Db2 database server and confirm the database manager is started.                                                               |
| Incorrect host or port                    | Verify the Host URL in the data source configuration matches your Db2 server. The default Db2 port is 50000.                                 |
| Firewall blocking connection              | Ensure your firewall allows outbound connections to the Db2 server port (typically 50000).                                                   |
| Network connectivity issue                | Test connectivity from the Grafana server to the Db2 host with `nc -zv <host> <port>`.                                                       |
| Instance not accepting remote connections | Confirm the Db2 instance is started and accepting remote TCP connections. If using Docker, verify the container is running with `docker ps`. |

### Connection settings not configured

**Symptoms:**

- Save &amp; test fails with `Please configure connection settings (host, port, username, etc.) before testing the connection.`

**Cause:**

The data source was saved without connection settings, so there’s nothing to test.

**Solution:**

Enter the Host URL, Database name, Username, and Password, then click **Save &amp; test** again. For details, refer to [Configure the IBM Db2 data source](/docs/plugins/grafana-ibmdb2-datasource/latest/configure/).

### “Missing resource bundle” (ERRORCODE=-4222)

**Symptoms:**

- The `Database connection error.` message includes `[jcc]Missing resource bundle: A resource bundle could not be found in the com.ibm.db2.jcc package ERRORCODE=-4222, SQLSTATE=08001`.

**Cause:**

This error typically indicates a connectivity issue, not a missing driver.

**Solutions:**

1. Verify the Db2 server is running.
2. Test network connectivity to the Db2 host and port.
3. Check that the database manager is initialized and accepting connections.
4. If using Docker, verify the container is running: `docker ps | grep db2`

### “Database connection timed out”

**Symptoms:**

- Save &amp; test fails with a message that starts with `Database connection timed out. The server did not respond within the configured timeout.`
- The appended driver detail often includes `connect timed out` and `ERRORCODE=-4499, SQLSTATE=08001`.

**Possible causes and solutions:**

Expand table

| Cause                              | Solution                                                                           |
|------------------------------------|------------------------------------------------------------------------------------|
| Database server is overloaded      | Check database server performance and resources.                                   |
| Network latency                    | Verify network connectivity between Grafana and the Db2 server.                    |
| Firewall silently dropping packets | Check firewall rules and ensure the Db2 port is open.                              |
| Incorrect host or port             | A wrong host or unreachable port often surfaces as a timeout. Verify the Host URL. |

### “Cannot resolve database hostname”

**Symptoms:**

- The `Database connection error.` message mentions `unknown host` or name resolution.

**Solutions:**

1. Verify the hostname is spelled correctly in the Host URL.
2. Check DNS resolution from the Grafana server: `nslookup <hostname>`
3. If using an IP address, ensure it’s correct and reachable.
4. For internal hostnames, verify the Grafana server can resolve them.

## Authentication errors

These errors occur when credentials are invalid or the user lacks required permissions.

### “Authentication failed” or “Access denied”

**Symptoms:**

- Save &amp; test fails with authentication errors
- Error messages mention “authentication”, “access denied”, or “login failed”

**Possible causes and solutions:**

Expand table

| Cause                    | Solution                                               |
|--------------------------|--------------------------------------------------------|
| Incorrect username       | Verify the username in the data source configuration.  |
| Incorrect password       | Re-enter the password; it may have been changed.       |
| Account locked           | Check if the database account is locked or expired.    |
| Insufficient permissions | Ensure the user has CONNECT privilege on the database. |

## Query errors

These errors occur when executing queries against the database.

### Empty results or “No data”

**Symptoms:**

- Query executes without error but returns no data
- Panels show “No data” message

**Possible causes and solutions:**

Expand table

| Cause                          | Solution                                                                                            |
|--------------------------------|-----------------------------------------------------------------------------------------------------|
| Query returns no matching rows | Verify your WHERE clause and expand the dashboard time range.                                       |
| Wrong database selected        | Check that you’re querying the correct database.                                                    |
| Table or column doesn’t exist  | Verify table and column names in your query.                                                        |
| Case sensitivity               | Db2 object names are case-sensitive when quoted. Use unquoted uppercase names or verify exact case. |

### Unsupported data type errors

The plugin automatically converts several Db2 types that Grafana doesn’t represent natively, so most columns work without manual casting:

Expand table

| Db2 type  | Returned to Grafana as | Notes                                                                  |
|-----------|------------------------|------------------------------------------------------------------------|
| `DATE`    | Timestamp              | Converted to a timestamp at midnight.                                  |
| `TIME`    | Text                   | Grafana has no time-of-day type, so the value is returned as a string. |
| `DECIMAL` | Double-precision float | Very large or high-scale values can lose precision.                    |

**Symptoms:**

- A query fails with an error similar to `unsupported conversion from arrow to sdk type`.
- The column uses a less common Db2 type that doesn’t map to a type Grafana supports.

**Solutions:**

Cast the column to a type Grafana supports:

1. Numeric types, cast to `DOUBLE`:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT CAST(value_column AS DOUBLE) AS value FROM table
   ```
2. Character or other unsupported types, cast to `VARCHAR`:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT CAST(some_column AS VARCHAR(255)) AS text_value FROM table
   ```
3. For exact decimal values, return the number as text to avoid floating-point rounding:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT CAST(precise_decimal AS VARCHAR(40)) AS value FROM table
   ```

### Query timeout

**Symptoms:**

- The query fails with `Query timed out after <N> seconds. Consider increasing Query Timeout in Additional settings or optimizing the query.`
- Long-running or heavy queries are canceled before completion.

**Solutions:**

1. Increase the **Query Timeout** in the data source configuration: open your data source **Settings**, expand **Additional settings**, then set **Query Timeout**. Default is 30 seconds; maximum is 600 seconds.
2. Optimize your query (add filters, limit result set, add indexes) so it completes within the timeout.
3. Narrow the dashboard time range or use `FETCH FIRST n ROWS ONLY` to reduce data scanned.

### Query syntax errors

**Symptoms:**

- Error message indicates SQL syntax error
- Query fails immediately after execution

**Solutions:**

1. Verify your SQL syntax is valid for IBM Db2.
2. Check that all table and column names exist.
3. Ensure string values are enclosed in single quotes.
4. For time series queries, verify the `time` column contains valid timestamp values.

## SSL/TLS errors

These errors occur when SSL/TLS encryption is enabled but the connection can’t be secured.

### SSL certificate validation failed

**Symptoms:**

- Save &amp; test fails with a generic connection error whose detail mentions SSL certificate validation, a certificate that isn’t trusted, or `PKIX path building failed`.
- The Db2 server presents a certificate issued by a private or internal certificate authority (CA).

**Cause:**

When **SSL Connection** is enabled, the plugin validates the Db2 server’s certificate against the default trust store of the Java runtime. A certificate signed by a private or internal CA that isn’t in that trust store fails validation.

> Caution
>
> Private or internal CA certificates aren’t currently supported through the data source configuration. This is a known limitation. Contact Grafana Support to track the open feature request.

**Solutions:**

1. Confirm the certificate is the cause. Temporarily disable **SSL Connection** and run Save &amp; test again. If it succeeds, the problem is certificate trust. Re-enable **SSL Connection** for production use, because disabling it sends traffic without application-layer encryption.
2. Use a Db2 server certificate issued by a publicly trusted CA.
3. On self-managed Grafana, an administrator can add the private CA certificate to the trust store of the Java runtime the plugin uses, then restart Grafana.
4. On Grafana Cloud, you can’t modify the trust store. Contact Grafana Support if you require private CA support.

### SSL connection failures

**Symptoms:**

- Connection fails when SSL is enabled
- Error messages mention SSL, TLS, or certificate issues

**Solutions:**

1. Verify your Db2 server is configured for SSL connections.
2. Try disabling SSL in the data source configuration to test basic connectivity.
3. Check that the Db2 server’s SSL certificate is valid and not expired.
4. If the server uses a certificate from a private or internal CA, refer to [SSL certificate validation failed](#ssl-certificate-validation-failed).

## IBM Db2 z/OS specific issues

The following issues apply only to IBM Db2 running on **z/OS** (IBM mainframe). They do not affect IBM Db2 for LUW (Linux, Unix, Windows), which is the version most commonly deployed on-premises or in containers.

IBM Db2 z/OS uses a different security model from Db2 LUW:

- Authentication is configured at the Db2 subsystem level (for example, `Authentication=SERVER_ENCRYPT`), not at the operating system level.
- Encrypted passwords use DES (not AES), which requires an explicit JCC driver setting.
- TLS is typically handled by **AT-TLS** (Application Transparent TLS), a z/OS network-layer feature that is invisible to both the Db2 server and the JCC client.

If you are not using IBM Db2 z/OS, you can skip this section.

### AT-TLS conflict (ERRORCODE=-4499, SQLSTATE=08001)

**Symptoms:**

- Connection fails with `ERRORCODE=-4499, SQLSTATE=08001 "Unsupported or unrecognized SSL message"` when **SSL Connection** is enabled.
- The Db2 instance is on IBM z/OS and uses AT-TLS (Application Transparent TLS) for network-layer encryption.

**Cause:**

AT-TLS operates at the z/OS TCP/IP stack level and handles TLS transparently before Db2 ever sees the bytes. The database itself is unaware of TLS. When **SSL Connection** is enabled, the plugin driver initiates a second TLS handshake on top of the already-encrypted AT-TLS connection, producing an unrecognized SSL message error.

**Solution:**

Disable **SSL Connection** in the data source configuration. AT-TLS provides the wire encryption; the plugin must connect as plain text at the application layer.

### Security mechanism mismatch (ERRORCODE=-4214, SQLSTATE=28000) on IBM Db2 z/OS

**Symptoms:**

- Connection fails with `ERRORCODE=-4214, SQLSTATE=28000 "Local security service non-retryable error"` when **SSL Connection** is disabled.
- The Db2 z/OS instance is configured with `Authentication=SERVER_ENCRYPT`.
- Working clients (for example, a C# connector or an `ibm-db2-prometheus-exporter` instance) can connect successfully.

**Cause:**

The IBM Db2 driver defaults to an AES-based key-exchange security mechanism. IBM Db2 z/OS with `Authentication=SERVER_ENCRYPT` requires the older DES-based encrypted password mechanism (DRDA `USRENCPWD`, security mechanism 7). The server closes the connection immediately after the DRDA `ACCSECRD` reply when the negotiated mechanism is unsupported.

**Solution:**

Force the driver to use DES-encrypted password authentication by setting the `securityMechanism` property to `7`:

> Note
>
> The **Custom parameters** field is gated behind the OpenFeature flag `grafana-ibmdb2-datasource.custom-connection-parameters`. If you don’t see the field after expanding **Additional settings**, the flag is not enabled for your Grafana instance. Contact Grafana Support to request it for your Cloud stack.

1. Open the data source configuration page in Grafana.
2. Expand **Additional settings**.
3. In the **Custom parameters** field, enter:

   [Copy code to clipboard] Copy

   ```none
   securityMechanism=7
   ```
4. Ensure **SSL Connection** is disabled (see AT-TLS section above).
5. Click **Save &amp; test**.

For AT-TLS environments the correct combined configuration is:

- **SSL Connection**: off
- **Custom parameters**: `securityMechanism=7`

This matches the DRDA `USRENCPWD` mechanism required by `Authentication=SERVER_ENCRYPT` and avoids double-TLS with AT-TLS.

## Private data source connect (PDC) issues

These issues occur when the data source connects through Private data source connect (PDC) but the tunnel isn’t established.

> Note
>
> The plugin secures the connection to the PDC distributor with mTLS certificates that Grafana provisions and injects automatically. You don’t configure these certificates yourself. This is separate from the **SSL Connection** setting, which secures the connection between the PDC agent and the Db2 server.

### PDC connection failures

**Symptoms:**

- Save &amp; test fails when a PDC network is selected.
- The error message includes `PDC bridge error:` and a reason such as `host unreachable`, `private DNS resolution may have failed or the DB is not reachable from the PDC agent`, or `connection refused by the DB host`.
- Queries through a PDC-connected data source fail with connection errors.

**Cause:**

PDC is not properly configured, or the PDC agent can’t reach the IBM Db2 host.

**Solutions:**

1. Verify the PDC agent is installed and running in your private network.
2. Check that the PDC network is correctly selected in the data source configuration.
3. Ensure the PDC agent has network access to your IBM Db2 instance (host and port reachable from the agent host).
4. Review PDC agent logs for connection or certificate errors.
5. Refer to [Configure Grafana private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/configure-pdc/) for setup instructions.

### Second Db2 data source on the same PDC network fails with “port already in use”

**Symptoms:**

- Adding a second IBM Db2 data source on the same PDC network fails.
- The error mentions a port already in use or an address already in use.

**Cause:**

In older plugin versions, all PDC connections shared a single fixed loopback port, so a second Db2 data source on the same PDC network couldn’t start its own tunnel. This limitation is fixed in current versions: the plugin now allocates a separate port for each unique database target and shares a tunnel only when the PDC configuration and target match.

**Solutions:**

1. Update to the latest version of the plugin. On Grafana Cloud, the plugin updates automatically. On self-managed Grafana, update the plugin, then restart Grafana.
2. If you still see a port error after updating and you run many distinct PDC-connected Db2 targets from one Grafana instance, you may have exhausted the plugin’s loopback port range. Reduce the number of distinct PDC targets per instance or contact Grafana Support.

## Performance issues

These issues occur when queries run slowly or place excessive load on the database server.

### Slow queries

**Symptoms:**

- Queries take a long time to execute
- Dashboard panels load slowly

**Solutions:**

1. Add appropriate indexes to your Db2 tables.
2. Limit the result set using `FETCH FIRST n ROWS ONLY`.
3. Narrow the time range in your dashboard.
4. Optimize your SQL query (avoid SELECT \*).
5. Check Db2 server resources and performance.
6. If queries often hit the limit, increase **Query Timeout** in **Additional settings** (1 to 600 seconds).

### High query latency under concurrent load

**Symptoms:**

- First query per panel is slow, subsequent queries are fast.
- Latency spikes when many users run dashboards simultaneously.

**Context:**

The plugin maintains a separate connection pool for each data source (default 50 connections). Each query borrows a connection from the pool and returns it when done, avoiding the overhead of creating a new TCP connection and Db2 authentication for every query.

**Solutions:**

1. Increase **Connection pool size** in **Additional settings** if you observe connection-wait latency under high concurrency (for example, 50 or more simultaneous queries).

### Heavy load on the Db2 server

**Symptoms:**

- The Db2 server shows high CPU or memory usage.
- Other applications connecting to the same Db2 server experience degraded performance.

**Solutions:**

1. Decrease **Connection pool size** in **Additional settings** to limit the number of concurrent connections the plugin holds against the Db2 server.
2. On self-managed Grafana, you can also set the default pool size globally for all data sources with the `GF_PLUGINS_IBMDB2_DATASOURCE_POOLSIZE` environment variable.

### Connections are dropped or become stale

**Symptoms:**

- Sporadic “connection closed” errors, especially after idle periods.
- Errors mentioning “broken pipe” or “connection reset”.
- Intermittent failures that previously required a manual restart or administrator intervention to recover.

**Context:**

The pool validates each connection before handing it to a query, so most connections that a firewall or the Db2 server closes while idle are detected and replaced transparently. Persistent drops usually mean connections are going stale faster than validation catches them, typically because a firewall or Db2 idle timeout is shorter than the pool’s maximum connection lifetime.

**Solutions:**

1. Reduce **Max connection lifetime** in **Additional settings** to a value shorter than the Db2 server’s (or an intervening firewall’s) idle connection timeout. For example, if Db2 closes idle connections after 5 minutes, set this to `240` (4 minutes) to force pool refresh before that happens. The default is 300 seconds; set to `0` for no limit.
2. If drops correlate with a network device between Grafana and Db2, check for an idle-session or TCP timeout on that device and align **Max connection lifetime** below it.

## Get additional help

If you’ve tried the solutions above and still encounter issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Consult the [IBM Db2 documentation](https://www.ibm.com/docs/en/db2) for database-specific guidance.
3. [Contact Grafana Support](/profile/org#support) if you have a Grafana Cloud or Enterprise subscription.

When reporting issues, include:

- Grafana version
- Plugin version
- Error messages (redact sensitive information)
- Steps to reproduce the issue
- Relevant query examples (redact sensitive data)
