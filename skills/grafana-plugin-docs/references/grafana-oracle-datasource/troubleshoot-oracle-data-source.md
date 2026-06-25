---
title: "Troubleshoot issue with the Oracle data source | Grafana Enterprise Plugins documentation"
description: "Troubleshoot issues with the Oracle data source plugin."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot issue with the Oracle data source

This document provides troubleshooting guidance for common issues with the Oracle data source.

## Verify Oracle instance connectivity

Before troubleshooting within Grafana, ensure your Oracle instance is reachable from the Grafana server.

Install Oracle’s `sqlplus` client and use it to test connectivity:

sh [Copy code to clipboard] Copy

```sh
sqlplus <USER>/<PASSWORD>@<IP_ADDRESS>:<PORT>/<DB_NAME>
```

Example:

sh [Copy code to clipboard] Copy

```sh
sqlplus username/p4assW0rd@localhost:1521/db
```

Refer to the official Oracle documentation on how to install `sqlplus`:

- [SQL\*Plus Quick Start](https://docs.oracle.com/cd/B14117_01/server.101/b12170/qstart.htm#i1056581)
- [SQL\*Plus Quick Start Guide](https://docs.oracle.com/en/database/oracle/oracle-database/23/sqpug/SQL-Plus-quick-start.html)

You can also use one of the Oracle official Docker images, such as [container-registry.oracle.com/database/free:latest](https://container-registry.oracle.com/database/free:latest), which come bundled with `sqlplus`.

## Connection issues

This section covers common connection issues with the Oracle data source.

### Database connection error

**Symptom:** You receive a “DB connection error” message when saving the data source or running queries.

**Possible causes and solutions:**

1. **Incorrect hostname or port:** Verify the hostname and port in the data source configuration. The default Oracle port is `1521`.
2. **Invalid credentials:** Double-check the username and password. Ensure the database user has the necessary permissions.
3. **Network issues:** Ensure there is network connectivity between the Grafana server and the Oracle database. Check firewall rules and security groups.
4. **Database not running:** Confirm the Oracle database service is running and accepting connections.

### Connection timeout

**Symptom:** Queries fail with timeout errors.

**Possible causes and solutions:**

1. **Increase the dataproxy timeout:** Set the **Dataproxy Timeout** in the data source settings to a higher value. The default is 120 seconds.
2. **Set the environment variable:** For on-premise Grafana, you can set the `GF_DATAPROXY_TIMEOUT` environment variable:

   Bash [Copy code to clipboard] Copy

   ```bash
   export GF_DATAPROXY_TIMEOUT=300
   ```
3. **Optimize your query:** Large or complex queries may take longer to execute. Consider adding indexes or optimizing the query.

### TNSNames connection issues

**Symptom:** Connection fails when using TNSNames Entry connection method.

> Note
>
> TNSNames is not supported in Grafana Cloud.

**Possible causes and solutions:**

1. **Invalid TNSNames entry:** Ensure the TNSName matches an entry in your `tnsnames.ora` file.
2. **Configuration file not found:** Verify that `tnsnames.ora` is in the correct location. When `ORACLE_HOME` is set to `/opt/oracle`, the file should be at `/opt/oracle/network/admin/tnsnames.ora`.
3. **Set ORACLE\_HOME:** Ensure the `ORACLE_HOME` environment variable is set correctly:

   Bash [Copy code to clipboard] Copy

   ```bash
   export ORACLE_HOME=/opt/oracle
   ```
4. **Check file permissions:** Ensure Grafana has read access to the configuration files.

Refer to [Oracle Kerberos integration](/docs/plugins/grafana-oracle-datasource/latest/oracle-and-kerberos/) for detailed configuration instructions.

### Kerberos authentication issues

**Symptom:** Kerberos authentication fails or times out.

> Note
>
> Kerberos authentication is not supported in Grafana Cloud.

**Possible causes and solutions:**

1. **Invalid ticket cache:** Ensure the Kerberos ticket cache is valid and accessible. For Grafana running as UID 472, the cache should be at `/tmp/krb5cc_472`.
2. **Expired tickets:** Renew your Kerberos tickets using `kinit`.
3. **Incorrect krb5.conf:** Verify the `krb5.conf` file contains the correct realm and KDC information.
4. **sqlnet.ora misconfigured:** Check that `SQLNET.KERBEROS5_CC_NAME` points to the correct ticket cache location.

Refer to [Oracle Kerberos integration](/docs/plugins/grafana-oracle-datasource/latest/oracle-and-kerberos/) for detailed configuration instructions.

## Query issues

This section covers common query-related issues.

### Query result too large

**Symptom:** You receive an error message like “Query result too large (MAX 16Mb)”.

**Solution:**

1. **Limit your results:** Add a `ROWNUM` or `FETCH FIRST` clause to limit the number of rows returned:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT * FROM your_table WHERE ROWNUM <= 1000
   ```
2. **Increase the max response size:** For on-premise Grafana, set the `GF_PLUGINS_ORACLE_DATASOURCE_MAX_RESPONSE_SIZE` environment variable. The default is `16`, and the maximum is `512` (in MB):

   Bash [Copy code to clipboard] Copy

   ```bash
   export GF_PLUGINS_ORACLE_DATASOURCE_MAX_RESPONSE_SIZE=32
   ```
3. **Use aggregation:** Reduce the data volume by aggregating data in your query.

### Macro errors

**Symptom:** Queries containing macros fail with “macro\_error()” or similar messages.

**Possible causes and solutions:**

1. **Missing time column argument:** Ensure macros like `$__timeFilter()` include the required column argument:

   SQL [Copy code to clipboard] Copy

   ```sql
   -- Correct
   WHERE $__timeFilter(time_column)

   -- Incorrect - missing argument
   WHERE $__timeFilter()
   ```
2. **Missing interval argument:** The `$__timeGroup()` macro requires both a time column and an interval:

   SQL [Copy code to clipboard] Copy

   ```sql
   -- Correct
   $__timeGroup(time_column, '5m')

   -- Incorrect - missing interval
   $__timeGroup(time_column)
   ```
3. **Invalid interval format:** Use valid interval formats like `'5m'`, `'1h'`, or `'1d'`.
4. **Mixed parentheses and braces:** Use one notation type per query. If your query requires braces for complex expressions, use braces consistently:

   SQL [Copy code to clipboard] Copy

   ```sql
   -- Using braces for complex expressions
   $__timeGroup{FROM_TZ(CAST(SDATE as timestamp), 'UTC'), '5m'}
   ```

Refer to [Oracle query editor](/docs/plugins/grafana-oracle-datasource/latest/oracle-query-editor/) for complete macro documentation.

### Timezone issues

**Symptom:** Data appears shifted by several hours or timestamps are incorrect.

**Possible causes and solutions:**

1. **Incorrect timezone setting:** Ensure the **Timezone** setting in the data source configuration matches your Oracle server’s timezone.
2. **Use timezone-aware macros:** When working with data across different time zones, use the timezone-aware macros `$__timeFilterTZ` and `$__timeGroupTZ`:

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
3. **Explicit timezone conversion:** Convert timestamps explicitly in your query:

   SQL [Copy code to clipboard] Copy

   ```sql
   FROM_TZ(CAST(SDATE as timestamp), 'UTC')
   ```

### No data returned

**Symptom:** Your query returns no data.

**Possible causes and solutions:**

1. **Time range mismatch:** Check that the Grafana time range matches the data in your database. Adjust the time picker to include relevant data.
2. **Incorrect time column:** Ensure the column used in `$__timeFilter()` contains the actual timestamp data.
3. **Permission issues:** Verify the database user has `SELECT` permissions on the queried tables.
4. **Test without macros:** Run a simple query without macros to verify data exists:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT * FROM your_table WHERE ROWNUM <= 10
   ```

## Performance issues

This section covers performance-related issues.

### Slow queries

**Symptom:** Queries take a long time to execute.

**Possible causes and solutions:**

1. **Add database indexes:** Ensure columns used in `WHERE` clauses and `GROUP BY` have appropriate indexes.
2. **Increase prefetch rows:** Set the **Prefetch Row Size** in the data source settings to buffer more rows per fetch request.
3. **Adjust connection pool size:** For high-concurrency environments, increase the **Connection Pool Size** setting. The default is `50`.
4. **Limit data range:** Query smaller time ranges or use aggregation to reduce the amount of data processed.

### Connection pool exhaustion

**Symptom:** Queries fail intermittently with connection errors under high load.

**Possible causes and solutions:**

1. **Increase connection pool size:** Set the **Connection Pool Size** in the data source settings or use the environment variable:

   Bash [Copy code to clipboard] Copy

   ```bash
   export GF_PLUGINS_ORACLE_DATASOURCE_POOLSIZE=100
   ```
2. **Optimize query frequency:** Reduce the dashboard refresh rate or query frequency.
3. **Consolidate data sources:** If you have multiple Oracle data sources pointing to the same database, consider consolidating them.

## Platform limitations

This section covers known platform limitations.

### ARM64 architecture not supported

**Symptom:** The plugin fails to load on ARM64 systems (for example, Apple Silicon M1/M2 Macs).

**Solution:**

The Oracle plugin is not supported on ARM64 architecture. Use an x64/amd64 system instead.

### Features not available in Grafana Cloud

**Symptom:** TNSNames or Kerberos options are not working in Grafana Cloud.

**Solution:**

TNSNames and Kerberos authentication are not supported in Grafana Cloud. Use the **Host with TCP Port** connection method with **Basic authentication**.

For connecting to private databases, use [Private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/).

## Enable debug logging

For advanced troubleshooting, enable debug logging to get more detailed information about plugin behavior.

### Grafana configuration

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

### Review logs

Check the Grafana server logs for Oracle-related messages. On Linux systems, logs are typically located at `/var/log/grafana/grafana.log`.

## Get additional help

If you continue to experience issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues and solutions.
2. Review the [Oracle data source documentation](/docs/plugins/grafana-oracle-datasource/latest/) for additional configuration options.
3. Contact [Grafana Support](/support/) if you’re an Enterprise, Cloud Pro, or Cloud contracted customer.

When reporting issues, include the following information:

- Grafana version
- Oracle Database version and edition (Standard, Enterprise, Express, Cloud)
- Connection method (Host with TCP Port or TNSNames Entry)
- Authentication method (Basic or Kerberos)
- Error messages (redact sensitive information)
- Steps to reproduce the issue
- Relevant configuration such as data source settings, timezone, connection pool size, and timeout values (redact passwords and other credentials)
- Sample query (if applicable, with sensitive data redacted)
