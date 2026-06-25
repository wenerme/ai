---
title: "Troubleshoot IBM Db2 data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshoot common issues with the IBM Db2 data source plugin"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot IBM Db2 data source issues

This document provides solutions to common issues you might encounter when configuring or using the IBM Db2 data source. For configuration instructions, refer to [Configure the IBM Db2 data source](/docs/plugins/grafana-ibmdb2-datasource/latest/configure/).

## Connection errors

These errors occur when Grafana cannot connect to the IBM Db2 database.

### “Database instance not reachable”

**Symptoms:**

- Save &amp; test fails with “Database instance not reachable”
- Queries fail with connection errors

**Possible causes and solutions:**

Expand table

| Cause                          | Solution                                                                                   |
|--------------------------------|--------------------------------------------------------------------------------------------|
| Database server is not running | Start the IBM Db2 database server.                                                         |
| Incorrect host or port         | Verify the Host URL in the data source configuration matches your Db2 server.              |
| Firewall blocking connection   | Ensure your firewall allows outbound connections to the Db2 server port (typically 50000). |
| Network connectivity issue     | Test connectivity from the Grafana server to the Db2 host using `nc -zv <host> <port>`.    |

### “DB2 instance not reachable”

**Symptoms:**

- Save &amp; test fails with “DB2 instance not reachable”
- Error messages containing SQL30081N or SQLSTATE=08001

**Solutions:**

1. Verify the Db2 server is running and accepting connections.
2. Check that the database manager is started on the Db2 server.
3. Confirm the port number is correct (default is 50000).
4. Test connectivity: `nc -zv <host> 50000`

### “Missing resource bundle” (ERRORCODE=-4222)

**Symptoms:**

- Error message: `[jcc]Missing resource bundle: A resource bundle could not be found in the com.ibm.db2.jcc package ERRORCODE=-4222, SQLSTATE=08001`

**Solutions:**

This error typically indicates a connectivity issue, not a missing driver.

1. Verify the Db2 server is running.
2. Test network connectivity to the Db2 host and port.
3. Check that the database manager is initialized and accepting connections.
4. If using Docker, verify the container is running: `docker ps | grep db2`

### “Connection timeout”

**Symptoms:**

- Save &amp; test times out
- Error message mentions “timeout” or “timed out”

**Possible causes and solutions:**

Expand table

| Cause                              | Solution                                                        |
|------------------------------------|-----------------------------------------------------------------|
| Database server is overloaded      | Check database server performance and resources.                |
| Network latency                    | Verify network connectivity between Grafana and the Db2 server. |
| Firewall silently dropping packets | Check firewall rules; ensure the Db2 port is open.              |

### “Cannot resolve database hostname”

**Symptoms:**

- Error message mentions “unknown host” or “name resolution”

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

**Symptoms:**

- Error message: “unsupported conversion from arrow to sdk type”
- Specific types mentioned: DECIMAL128, TIME32, DATE32

**Solutions:**

Some Db2 data types may not be fully supported. Workarounds:

1. **DECIMAL columns:** Cast to a supported numeric type:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT CAST(decimal_column AS DOUBLE) AS value FROM table
   ```
2. **TIME columns:** Cast to VARCHAR or extract components:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT VARCHAR(time_column) AS time_string FROM table
   ```
3. **DATE columns:** Cast to TIMESTAMP:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT TIMESTAMP(date_column) AS time FROM table
   ```

### Query timeout

**Symptoms:**

- Query fails with a timeout error
- Long-running or heavy queries are cancelled before completion

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

### SSL connection failures

**Symptoms:**

- Connection fails when SSL is enabled
- Error messages mention SSL, TLS, or certificate issues

**Solutions:**

1. Verify your Db2 server is configured for SSL connections.
2. Try disabling SSL in the data source configuration to test basic connectivity.
3. Check that the Db2 server’s SSL certificate is valid and not expired.

## Private data source connect (PDC) issues

**Cause:** PDC connection is not properly configured or the agent is not running.

**Solutions:**

1. Verify the PDC agent is installed and running in your private network.
2. Check that the PDC network is correctly selected in the data source configuration.
3. Ensure the PDC agent has network access to your IBM Db2 instance (host and port reachable from the agent host).
4. Review PDC agent logs for connection or certificate errors.
5. Refer to [Configure Grafana private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/configure-pdc/) for setup instructions.

## Performance issues

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
6. If queries often hit the limit, increase **Query Timeout** in **Additional settings** (1–600 seconds).

### High query latency under concurrent load

**Symptoms:**

- First query per panel is slow, subsequent queries are fast.
- Latency spikes when many users run dashboards simultaneously.

**Context:**

The plugin maintains a per-datasource connection pool (default 50 connections). Each query borrows a connection from the pool and returns it when done, avoiding the overhead of creating a new TCP connection and Db2 authentication for every query.

**Solutions:**

1. Increase **Connection pool size** in **Additional settings** if you observe connection-wait latency under high concurrency (for example, 50 or more simultaneous queries).

### Heavy load on the Db2 server

**Symptoms:**

- The Db2 server shows high CPU or memory usage.
- Other applications connecting to the same Db2 server experience degraded performance.

**Solutions:**

1. Decrease **Connection pool size** in **Additional settings** to limit the number of concurrent connections the plugin holds against the Db2 server.
2. On self-hosted Grafana, you can also set the default pool size globally for all datasources via the `GF_PLUGINS_IBMDB2_DATASOURCE_POOLSIZE` environment variable.

### Connections are dropped or become stale

**Symptoms:**

- Sporadic “connection closed” errors, especially after idle periods.
- Errors mentioning “broken pipe” or “connection reset”.

**Solutions:**

1. Reduce **Max connection lifetime** in **Additional settings** to a value shorter than the Db2 server’s idle connection timeout. For example, if Db2 closes idle connections after 5 minutes, set this to `240` (4 minutes) to force pool refresh before that happens. The default is 300 seconds; set to `0` for no limit.

## Get additional help

If you’ve tried the solutions above and still encounter issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Review the plugin’s [GitHub issues](https://github.com/grafana/grafana/issues) for known bugs.
3. Consult the [IBM Db2 documentation](https://www.ibm.com/docs/en/db2) for database-specific guidance.
4. Contact Grafana Support if you have a Grafana Cloud or Enterprise subscription.

When reporting issues, include:

- Grafana version
- Plugin version
- Error messages (redact sensitive information)
- Steps to reproduce the issue
- Relevant query examples (redact sensitive data)
