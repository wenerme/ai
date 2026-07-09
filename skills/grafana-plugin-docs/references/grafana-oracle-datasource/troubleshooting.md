---
title: "Troubleshoot Oracle data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshoot common issues with the Oracle data source plugin in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Oracle data source issues

This document provides solutions to common issues you may encounter when configuring or using the Oracle data source. For configuration instructions, refer to [Configure the Oracle data source](/docs/plugins/grafana-oracle-datasource/latest/configure/).

## Licensing issues

These errors occur when the Enterprise plugin license is missing, expired, or incorrectly configured.

### “Invalid license for the enterprise plugin”

**Symptoms:**

- Error message: “Invalid license for the enterprise plugin—license does not include a Grafana Enterprise subscription”.
- The plugin appears in the UI but can’t be configured or used.
- Plugin health check fails with a license error.

**Possible causes and solutions:**

Expand table

| Cause                                          | Solution                                                                                                                                                                                                                                     |
|------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Free-tier Grafana Cloud plan                   | The Oracle plugin requires a Pro or Advanced plan. Upgrade at [Grafana pricing](/pricing/).                                                                                                                                                  |
| Enterprise license not activated               | For self-managed Grafana, activate your license token. Refer to [Activate a Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/).                                                                          |
| License doesn’t include plugin entitlement     | Contact your Grafana account team to verify that `grafana-oracle-datasource` is included in your license.                                                                                                                                    |
| License token file permissions (self-managed)  | The license file must be readable by the Grafana process but not world-readable. Set permissions to `640` with the Grafana user as owner: `chmod 640 /var/lib/grafana/license.jwt` and `chown grafana:grafana /var/lib/grafana/license.jwt`. |
| Grafana Cloud subscription not provisioned yet | New Cloud subscriptions may take a few minutes to provision plugin access. Wait 5-10 minutes and refresh the page. If the issue persists, contact Grafana support.                                                                           |

### Plugin not visible in the Grafana UI

**Symptoms:**

- The Oracle plugin doesn’t appear when searching in **Plugins and data** &gt; **Plugins**.
- Other Enterprise plugins are visible but Oracle is missing.

**Solutions:**

1. **Grafana Cloud:** Verify your plan includes the Oracle plugin at [Grafana pricing](/pricing/). The plugin is not available on the free tier.
2. **Self-managed:** Install the plugin using the Grafana CLI:

   Bash [Copy code to clipboard] Copy

   ```bash
   grafana cli plugins install grafana-oracle-datasource
   ```

   Then restart Grafana. If the install command fails with a license error, ensure your `GF_ENTERPRISE_LICENSE_TEXT` environment variable or license file is correctly configured.
3. **Self-managed (airgapped):** Download the plugin ZIP from your Grafana account and extract it to the plugins directory (default `/var/lib/grafana/plugins/`).

## Upgrade from v2.x to v3.x

Plugin version 3.0 replaced the Oracle Instant Client driver with a pure Go driver (go-ora). This change simplifies deployment but introduces breaking changes for some connection methods.

> Warning
>
> If you use TNSNames, Oracle Wallet, or LDAP-based authentication, review this section before upgrading to v3.x.

### “no address passed in connection string”

**Symptoms:**

- Save &amp; test fails with “no address passed in connection string” after upgrading to v3.x.
- Previously working TNSNames connections stop functioning.

**Cause:**

The new go-ora driver handles TNS connection strings differently than Oracle Instant Client. In some cases, the TNSName field is silently cleared during the upgrade (fixed in v3.3.3).

**Solutions:**

1. Re-enter the TNSName value in the data source settings and click **Save &amp; test**.
2. If using a simple host/port/service connection, switch from **TNSNames Entry** to **Host with TCP Port** as the connection method. Enter the hostname, port, and service name directly.
3. Ensure you’re running plugin version 3.3.3 or later, which fixes the TNSName field regression.

### “ORA-12154: TNS could not resolve the connect identifier specified”

**Symptoms:**

- Connection fails with ORA-12154 after upgrading to v3.x.
- The `tnsnames.ora` file is correctly configured and was working with v2.x.

**Solutions:**

1. Verify the `ORACLE_HOME` environment variable is set and points to the directory containing `network/admin/tnsnames.ora`.
2. Pass the full TNS descriptor directly in the TNSName field instead of a short name:

   [Copy code to clipboard] Copy

   ```none
   (DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=oracle-db1)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=FREEPDB1)(SERVER=DEDICATED)))
   ```
3. As a workaround, switch to **Host with TCP Port** and enter the hostname, port, and database name directly.

### “unknown URL option: `wallet_location`”

**Symptoms:**

- Connection fails with “unknown URL option: `wallet_location`” after upgrading to v3.x.

**Cause:**

Oracle Wallet authentication (`wallet_location` parameter) is not supported by the go-ora driver used in v3.x.

**Solution:**

Switch to **Host with TCP Port** with **Basic authentication** (username and password). Oracle Wallet-based authentication is not compatible with plugin v3.x.

### LDAP-based TNS resolution not working

**Symptoms:**

- TNS connections that rely on `ldap.ora` and `$TNS_HOME` for LDAP directory-based name resolution fail in v3.x.
- The same configuration worked in v2.x with Oracle Instant Client.

**Cause:**

The go-ora driver does not support LDAP-based TNS name resolution (`sqlnet.ora`/`ldap.ora` with directory servers). This feature depended on Oracle Instant Client libraries which are no longer bundled.

**Solutions:**

1. Switch to **Host with TCP Port** and enter the hostname, port, and service name directly.
2. Pass the full TNS descriptor in the **TNSName** field instead of relying on LDAP resolution.
3. For Grafana Cloud, use [Private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) with the TCP connection method.

### Summary of v3.x breaking changes

Expand table

| Feature                           | v2.x (Oracle Instant Client) | v3.x (go-ora)       |
|-----------------------------------|------------------------------|---------------------|
| Host with TCP Port                | Supported                    | Supported           |
| TNSNames (file-based)             | Supported                    | Supported (v3.3.0+) |
| TNSNames (LDAP resolution)        | Supported                    | Not supported       |
| Oracle Wallet (`wallet_location`) | Supported                    | Not supported       |
| Kerberos                          | Supported                    | Supported           |
| ARM64 architecture                | Not supported                | Not supported       |

## Connection errors

These errors occur when Grafana can’t reach the Oracle database. Before investigating specific errors, verify basic connectivity from the Grafana server.

**Connectivity checklist:**

1. From the Grafana server, test TCP connectivity: `nc -zv <oracle-host> 1521` or `telnet <oracle-host> 1521`.
2. Verify DNS resolution: `nslookup <oracle-host>` or `dig <oracle-host>`.
3. Check that no network policies or security groups are blocking the connection.
4. For Grafana Cloud, confirm PDC is configured and the PDC agent is running.

You can also test with Oracle’s `sqlplus` client:

sh [Copy code to clipboard] Copy

```sh
sqlplus <USER>/<PASSWORD>@<IP_ADDRESS>:<PORT>/<DB_NAME>
```

Refer to the official Oracle documentation for `sqlplus` installation:

- [SQL\*Plus Quick Start](https://docs.oracle.com/cd/B14117_01/server.101/b12170/qstart.htm#i1056581)
- [SQL\*Plus Quick Start Guide](https://docs.oracle.com/en/database/oracle/oracle-database/23/sqpug/SQL-Plus-quick-start.html)

### `dial tcp: connect: connection timed out`

**Symptoms:**

- Save &amp; test fails with `dial tcp <ip>:1521: connect: connection timed out`.
- Connection works from other machines but not from Grafana.

**Possible causes and solutions:**

Expand table

| Cause                               | Solution                                                                                                                                                                                                               |
|-------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Private database from Grafana Cloud | Grafana Cloud can’t reach databases on private networks directly. Set up [Private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) to establish a secure tunnel. |
| Firewall blocking port 1521         | Ensure firewall rules and security groups allow outbound TCP traffic from the Grafana server to the Oracle host on port `1521` (or your configured port).                                                              |
| Wrong IP or hostname                | Verify the IP address resolves correctly from the Grafana server. For Kubernetes deployments, ensure the Oracle service DNS is resolvable from the Grafana pod.                                                        |
| VPN or network segmentation         | Confirm the Grafana server is on a network segment with routing to the Oracle database.                                                                                                                                |

### “connection reset by peer”

**Symptoms:**

- Save &amp; test or queries fail with “connection reset by peer”.
- Intermittent connection failures.

**Possible causes and solutions:**

Expand table

| Cause                               | Solution                                                                                                                                                                   |
|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Oracle Cloud ATP/ADB firewall rules | Add your Grafana server’s IP address to the Oracle Cloud access control list (ACL). For Grafana Cloud, use PDC instead.                                                    |
| Idle connection terminated          | The database or a network appliance is closing idle connections. Reduce the **Connection Pool Size** or configure Oracle’s `SQLNET.EXPIRE_TIME` to send keep-alive probes. |
| TLS/mTLS required                   | Some Oracle Cloud databases require mTLS (wallet-based). This is not supported in plugin v3.x. Use a non-mTLS connection or downgrade the database’s TLS requirements.     |

### HTTP proxy not supported

**Symptoms:**

- The Oracle plugin ignores configured HTTP proxy settings (`HTTP_PROXY`, `HTTPS_PROXY`).
- Connections fail in environments that require proxy for external access.

**Cause:**

The Oracle plugin uses a raw TCP connection to communicate with the database (Oracle Net Protocol), not HTTP. Standard HTTP proxy settings have no effect on TCP database connections.

**Solutions:**

1. For Grafana Cloud connecting to private databases, use [Private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/).
2. For self-managed Grafana behind a firewall, configure network routing or firewall rules to allow direct TCP traffic on port `1521` from the Grafana server to the Oracle database.
3. If you use the **Secure Socks Proxy** feature (available when the `secureSocksDSProxyEnabled` feature toggle is enabled), you can route the connection through a SOCKS5 proxy.

### PDC connection issues

**Symptoms:**

- “Plugin health check failed” when using Private data source connect.
- Save &amp; test times out even though PDC is configured.

**Solutions:**

1. Verify the PDC agent is running and healthy. Check the agent logs for connection errors.
2. Confirm the PDC agent can reach the Oracle database from its network: `nc -zv <oracle-host> 1521`.
3. Ensure the PDC agent version is up to date.
4. In the Grafana Cloud data source settings, verify you’ve selected the correct PDC network from the drop-down.
5. Check that the hostname and port in the data source configuration are correct from the PDC agent’s network perspective (use internal/private hostnames, not public ones).

For PDC setup instructions, refer to [Configure Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/configure-pdc/).

### “DB connection error”

**Symptoms:**

- Save &amp; test fails with a “DB connection error” message.
- Queries return connection error messages.

**Possible causes and solutions:**

Expand table

| Cause                      | Solution                                                                                                                           |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| Incorrect hostname or port | Verify the hostname and port in the data source configuration. The default Oracle port is `1521`.                                  |
| Invalid credentials        | Double-check the username and password. Ensure the database user has the necessary permissions.                                    |
| Network issues             | Ensure there is network connectivity between the Grafana server and the Oracle database. Check firewall rules and security groups. |
| Database not running       | Confirm the Oracle database service is running and accepting connections.                                                          |

### Connection timeout

**Symptoms:**

- Queries fail with timeout errors.
- Save &amp; test takes a long time and then fails.

> Caution
>
> The Grafana timeout is client-side only. When Grafana times out, it does **not** send a cancellation to the Oracle database. Long-running queries continue executing on the database server even after Grafana reports a timeout. Use Oracle-side resource limits (profiles, `RESOURCE_LIMIT`) to prevent runaway queries from consuming database resources.

**Solutions:**

1. Increase the **Dataproxy Timeout** in the data source settings to a higher value. The default is 120 seconds.
2. For self-managed Grafana, set the `GF_DATAPROXY_TIMEOUT` environment variable:

   Bash [Copy code to clipboard] Copy

   ```bash
   export GF_DATAPROXY_TIMEOUT=300
   ```
3. Optimize your query. Large or complex queries may take longer to execute. Consider adding indexes.
4. Set Oracle-side query limits to prevent long-running queries from impacting the database:

   SQL [Copy code to clipboard] Copy

   ```sql
   ALTER PROFILE grafana_profile LIMIT CPU_PER_CALL 30000;
   ALTER USER grafana_user PROFILE grafana_profile;
   ```

### “ORA-01000: maximum open cursors exceeded”

**Symptoms:**

- Queries fail with “ORA-01000: maximum open cursors exceeded”.
- Errors occur under high dashboard concurrency or frequent refresh.

**Possible causes and solutions:**

Expand table

| Cause                       | Solution                                                                                                      |
|-----------------------------|---------------------------------------------------------------------------------------------------------------|
| Too many concurrent queries | Reduce the dashboard refresh rate or the number of panels querying simultaneously.                            |
| Connection pool too large   | Reduce the **Connection Pool Size** setting. Each pooled connection can hold open cursors.                    |
| Oracle cursor limit too low | Increase the `OPEN_CURSORS` parameter on the Oracle database: `ALTER SYSTEM SET OPEN_CURSORS=500 SCOPE=BOTH;` |

### “ORA-03137: malformed TTC packet”

**Symptoms:**

- Queries intermittently fail with “ORA-03137: malformed TTC packet received”.

**Cause:**

This error typically indicates a protocol incompatibility between the go-ora driver and the Oracle database version, or network corruption.

**Solutions:**

1. Ensure your Oracle database is patched to the latest patch set for your version.
2. Upgrade the Oracle plugin to the latest version (driver compatibility fixes are included in updates).
3. If using network appliances (load balancers, firewalls), verify they aren’t modifying TCP packets on port 1521.

### TNSNames connection issues

**Symptoms:**

- Connection fails when using the TNSNames Entry connection method.

> Note
>
> TNSNames is not supported in Grafana Cloud.

**Possible causes and solutions:**

Expand table

| Cause                        | Solution                                                                                                                                                           |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Invalid TNSNames entry       | Ensure the TNSName matches an entry in your `tnsnames.ora` file.                                                                                                   |
| Configuration file not found | Verify that `tnsnames.ora` is in the correct location. When `ORACLE_HOME` is set to `/opt/oracle`, the file should be at `/opt/oracle/network/admin/tnsnames.ora`. |
| `ORACLE_HOME` not set        | Set the `ORACLE_HOME` environment variable: `export ORACLE_HOME=/opt/oracle`                                                                                       |
| File permissions             | Ensure Grafana has read access to the configuration files.                                                                                                         |

Refer to [Kerberos integration](/docs/plugins/grafana-oracle-datasource/latest/kerberos/) for detailed file location information.

## Authentication errors

These errors occur when credentials are invalid, missing, or lack the required permissions.

### Kerberos authentication issues

**Symptoms:**

- Kerberos authentication fails or times out.
- Save &amp; test returns authentication errors when using Kerberos.

> Note
>
> Kerberos authentication is not supported in Grafana Cloud.

**Possible causes and solutions:**

Expand table

| Cause                      | Solution                                                                                                                            |
|----------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| Invalid ticket cache       | Ensure the Kerberos ticket cache is valid and accessible. For Grafana running as UID 472, the cache should be at `/tmp/krb5cc_472`. |
| Expired tickets            | Renew your Kerberos tickets using `kinit`.                                                                                          |
| Incorrect `krb5.conf`      | Verify the `krb5.conf` file contains the correct realm and KDC information.                                                         |
| Misconfigured `sqlnet.ora` | Check that `SQLNET.KERBEROS5_CC_NAME` points to the correct ticket cache location.                                                  |

Refer to [Kerberos integration](/docs/plugins/grafana-oracle-datasource/latest/kerberos/) for detailed configuration instructions.

## Query errors

These errors occur when executing queries against the Oracle database.

### “Query result too large”

**Symptoms:**

- Error message: “Query result too large (MAX 16Mb)”.
- Large queries fail even though they execute successfully in SQL tools.

**Cause:**

The Oracle plugin enforces a maximum response size for gRPC messages. The default is 16 MB, with a maximum configurable limit of 512 MB.

> Warning
>
> Increasing the response size limit can significantly impact Grafana server memory usage. Large result sets can consume 60%+ of available memory on the Grafana node. Use aggregation and filtering to reduce data volume where possible.

**Solutions:**

1. Add aggregation to reduce data volume:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT
     $__timeGroup(sample_time, '5m') AS time,
     AVG(value) as value
   FROM large_table
   WHERE $__timeFilter(sample_time)
   GROUP BY $__timeGroup(sample_time, '5m')
   ORDER BY time
   ```
2. Limit results using a `ROWNUM` or `FETCH FIRST` clause:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT * FROM your_table WHERE ROWNUM <= 1000
   ```
3. For self-managed Grafana, increase the max response size (default `16`, maximum `512`, in MB):

   Bash [Copy code to clipboard] Copy

   ```bash
   export GF_PLUGINS_ORACLE_DATASOURCE_MAX_RESPONSE_SIZE=32
   ```

### Row limit exceeded

**Symptoms:**

- Query returns fewer rows than expected.
- Results appear silently truncated without an error message.
- No explicit `ROWNUM` clause is in the query.

**Cause:**

The **Row Limit** setting (default 1,000,000 rows) limits the maximum number of rows returned per query. Results are truncated without a warning when this limit is reached. This setting was introduced in plugin version 3.4.0.

**Solutions:**

1. Increase the **Row Limit** value in the data source configuration settings.
2. Add aggregation or filtering to reduce the row count below the limit.
3. For provisioned data sources, set `rowLimit` in `jsonData`:

   YAML [Copy code to clipboard] Copy

   ```yaml
   jsonData:
     rowLimit: 2000000
   ```

> Caution
>
> Very large result sets consume significant memory on the Grafana server. If you increase the row limit substantially, monitor Grafana server memory usage and consider increasing available resources.

### “type is not supported” (unsupported Oracle data types)

**Symptoms:**

- Error: `error converting sql rows to dataframe: type "LongVarChar" is not supported`.
- Similar errors for other unsupported column types.

**Cause:**

The Oracle plugin supports standard SQL types and a limited set of Oracle-specific types. The following Oracle types require explicit conversion in your query:

Expand table

| Unsupported type       | Workaround                                                                |
|------------------------|---------------------------------------------------------------------------|
| `LONG` / `LongVarChar` | `CAST(column AS VARCHAR2(4000))` or `DBMS_LOB.SUBSTR(column, 4000, 1)`    |
| `CLOB`                 | `DBMS_LOB.SUBSTR(column, 4000, 1)`                                        |
| `BLOB`                 | Not displayable. Extract metadata or length: `DBMS_LOB.GETLENGTH(column)` |
| `XMLType`              | `column.getClobVal()` or `XMLSERIALIZE(CONTENT column AS VARCHAR2(4000))` |
| `RAW`                  | `RAWTOHEX(column)`                                                        |

**Supported Oracle-specific types** (handled automatically):

- `IBFloat` (BINARY\_FLOAT)—converted to float32
- `IBDouble` (BINARY\_DOUBLE)—converted to float64
- `IntervalYM_DTY` (INTERVAL YEAR TO MONTH)—converted to int64
- `IntervalDS_DTY` (INTERVAL DAY TO SECOND)—converted to int64
- Standard types: `NUMBER`, `VARCHAR2`, `DATE`, `TIMESTAMP`, `TIMESTAMP WITH TIME ZONE`

**Example—casting LONG to VARCHAR2:**

SQL [Copy code to clipboard] Copy

```sql
SELECT
  id,
  CAST(long_column AS VARCHAR2(4000)) as description
FROM your_table
WHERE ROWNUM <= 100
```

### Macro errors

**Symptoms:**

- Queries containing macros fail with “macro\_error()” or similar messages.

**Possible causes and solutions:**

Expand table

| Cause                        | Solution                                                                                                   |
|------------------------------|------------------------------------------------------------------------------------------------------------|
| Missing time column argument | Ensure macros like `$__timeFilter()` include the required column argument: `$__timeFilter(time_column)`    |
| Missing interval argument    | `$__timeGroup()` requires both a time column and an interval: `$__timeGroup(time_column, '5m')`            |
| Invalid interval format      | Use valid interval formats: `'5m'`, `'1h'`, `'1d'`                                                         |
| Mixed parentheses and braces | Use one notation style per query. If braces are needed for complex expressions, use braces for all macros. |

Refer to [Oracle query editor](/docs/plugins/grafana-oracle-datasource/latest/query-editor/) for the complete macro reference.

### Timezone issues

**Symptoms:**

- Data appears shifted by several hours.
- Timestamps are incorrect or misaligned.
- `$__timeFrom()` and `$__timeTo()` don’t match the dashboard timezone.

**Cause:**

All time macros (`$__timeFrom()`, `$__timeTo()`, `$__timeFilter()`) output values in the timezone configured on the data source settings (default UTC). They do not use the dashboard or browser timezone. This is by design because the database connection operates in a fixed timezone.

**Solutions:**

1. Ensure the **Timezone** setting in the data source configuration matches your Oracle server’s timezone.
2. Use the timezone-aware macros `$__timeFilterTZ` and `$__timeGroupTZ`:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT
     $__timeGroupTZ(timestamp_column, '5m') as time,
     value
   FROM your_table
   WHERE $__timeFilterTZ(timestamp_column)
   GROUP BY $__timeGroupTZ(timestamp_column, '5m')
   ORDER BY time
   ```
3. If your data is stored in a local timezone, convert the macro output to match:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT *
   FROM events
   WHERE event_time BETWEEN
     FROM_TZ(CAST($__timeFrom() AS TIMESTAMP), 'UTC') AT TIME ZONE 'America/New_York'
     AND
     FROM_TZ(CAST($__timeTo() AS TIMESTAMP), 'UTC') AT TIME ZONE 'America/New_York'
   ```
4. Alternatively, convert your stored column to UTC for comparison:

   SQL [Copy code to clipboard] Copy

   ```sql
   WHERE FROM_TZ(CAST(event_time AS TIMESTAMP), 'America/New_York') AT TIME ZONE 'UTC'
     BETWEEN $__timeFrom() AND $__timeTo()
   ```

Refer to [Oracle query editor: timezone conversion](/docs/plugins/grafana-oracle-datasource/latest/query-editor/#convert-time-macros-to-a-local-timezone) for more examples.

### No data returned

**Symptoms:**

- Query executes without error but returns no data.
- Charts display “No data” message.

**Possible causes and solutions:**

Expand table

| Cause                 | Solution                                                                                 |
|-----------------------|------------------------------------------------------------------------------------------|
| Time range mismatch   | Expand the dashboard time range or verify data exists for the selected period.           |
| Incorrect time column | Ensure the column in `$__timeFilter()` contains the actual timestamp data.               |
| Permission issues     | Verify the database user has `SELECT` permissions on the queried tables.                 |
| Macro masking results | Test without macros to verify data exists: `SELECT * FROM your_table WHERE ROWNUM <= 10` |

## Performance issues

These issues relate to slow queries or resource exhaustion.

### Slow queries

**Symptoms:**

- Queries take a long time to execute.
- Dashboard panels load slowly.

**Solutions:**

1. Add database indexes on columns used in `WHERE` and `GROUP BY` clauses.
2. Increase the **Prefetch Row Size** setting to buffer more rows per fetch request.
3. Adjust the **Connection Pool Size** for high-concurrency environments. The default is `50`.
4. Narrow the time range or use aggregation to reduce the data volume.

### Connection pool exhaustion

**Symptoms:**

- Queries fail intermittently with connection errors under high load.

**Solutions:**

1. Increase the **Connection Pool Size** in the data source settings or use the environment variable:

   Bash [Copy code to clipboard] Copy

   ```bash
   export GF_PLUGINS_ORACLE_DATASOURCE_POOLSIZE=100
   ```
2. Reduce the dashboard refresh rate or query frequency.
3. Consolidate multiple Oracle data sources pointing to the same database.

## Platform limitations

These are known limitations of the Oracle data source plugin.

### ARM64 architecture not supported

**Symptoms:**

- The plugin fails to load on ARM64 systems (for example, Apple Silicon M1/M2 Macs).

**Solution:**

The Oracle plugin doesn’t support ARM64 architecture. Use an x64/amd64 system instead.

### Features not available in Grafana Cloud

**Symptoms:**

- TNSNames or Kerberos options aren’t working in Grafana Cloud.

**Solution:**

TNSNames and Kerberos authentication are not supported in Grafana Cloud. Use the **Host with TCP Port** connection method with **Basic authentication**.

For connecting to private databases, use [Private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/).

## Debug logging

For advanced troubleshooting, enable debug logging to get detailed information about plugin behavior.

Add the following to your Grafana configuration file (`grafana.ini`) or set as environment variables:

ini [Copy code to clipboard] Copy

```ini
[log]
level = debug
filters = oracle-datasource:debug

[plugins]
enable_alpha = true
```

Or using environment variables:

Bash [Copy code to clipboard] Copy

```bash
export GF_LOG_LEVEL=debug
export GF_LOG_FILTERS=oracle-datasource:debug
export GF_DATAPROXY_LOGGING=true
```

Review the Grafana server logs for Oracle-related messages. On Linux systems, logs are typically at `/var/log/grafana/grafana.log`.

Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## Get additional help

If you’ve tried the solutions above and still encounter issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues and solutions.
2. Review the [Oracle data source documentation](/docs/plugins/grafana-oracle-datasource/latest/) for additional configuration options.
3. Consult the [Oracle Database documentation](https://docs.oracle.com/en/database/) for service-specific guidance.
4. Contact [Grafana Support](/support/) if you’re an Enterprise, Cloud Pro, or Cloud contracted customer.

When reporting issues, include:

- Grafana version and Oracle plugin version
- Oracle Database version and edition
- Connection method (Host with TCP Port or TNSNames Entry)
- Authentication method (Basic or Kerberos)
- Error messages (redact sensitive information)
- Steps to reproduce the issue
- Relevant configuration (redact credentials)
- Sample query (if applicable)
