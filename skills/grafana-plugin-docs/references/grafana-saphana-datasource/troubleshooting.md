---
title: "Troubleshoot SAP HANA data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshooting common issues with the SAP HANA data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot SAP HANA data source issues

This document provides guidance for troubleshooting common issues when configuring and using the SAP HANA data source in Grafana.

## Before you begin

Before investigating specific errors, verify that the data source health check passes:

1. Go to **Connections** &gt; **Data sources** and select your SAP HANA data source.
2. Click **Save &amp; test**.
3. Confirm you see a success message.

If the health check fails, start with the [Configuration errors](#configuration-errors) or [Connection errors](#connection-errors) sections.

> Note
>
> The Save &amp; test validation doesn’t check access permissions to schemas. You may need to explicitly grant schema read permissions to the user.

## Configuration errors

Configuration errors occur when required fields are missing or contain invalid values during data source setup.

### Missing required fields

Expand table

| Error                      | Solution                                                                                                                                                            |
|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Server address is required | Provide the base address of the SAP HANA instance (excluding http/https prefixes). Example: `xxxxxxx-xxxx-xxxx-xxxx-xxxxxxx.hana.trial-us10.hanacloud.ondemand.com` |
| Username is required       | Provide a username with permissions to query the database.                                                                                                          |
| Password is required       | Provide the password for the SAP HANA user.                                                                                                                         |

### Port configuration issues

If you’re having trouble connecting, verify you’re using the correct port:

- **SAP HANA Cloud:** Typically uses port `443`.
- **On-premises/tenant databases:** Use the port determined by querying `M_SERVICES`.

To find the correct port, run one of these queries:

From the tenant database:

SQL [Copy code to clipboard] Copy

```sql
SELECT SERVICE_NAME, PORT, SQL_PORT, (PORT + 2) HTTP_PORT
FROM SYS.M_SERVICES
WHERE ((SERVICE_NAME='indexserver' and COORDINATOR_TYPE='MASTER') or (SERVICE_NAME='xsengine'))
```

From the system database:

SQL [Copy code to clipboard] Copy

```sql
SELECT DATABASE_NAME, SERVICE_NAME, PORT, SQL_PORT, (PORT + 2) HTTP_PORT
FROM SYS_DATABASES.M_SERVICES
WHERE DATABASE_NAME='<DBNAME>'
  AND ((SERVICE_NAME='indexserver' and COORDINATOR_TYPE='MASTER') or (SERVICE_NAME='xsengine'))
```

For detailed guidance, refer to the [SAP HANA documentation](https://help.sap.com/viewer/6b94445c94ae495c83a19646e7c3fd56/2.0.02/en-US/440f6efe693d4b82ade2d8b182eb1efb.html).

## Connection errors

Connection errors occur when Grafana cannot successfully communicate with the SAP HANA database.

### Authentication failed

**Symptoms:**

- Save &amp; test fails with authentication errors
- Error message indicates invalid credentials

**Possible causes and solutions:**

Expand table

| Cause                               | Solution                                                                 |
|-------------------------------------|--------------------------------------------------------------------------|
| Invalid username or password        | Verify the credentials are correct. Test them using a SAP HANA client.   |
| User account locked                 | Check if the user account is locked in SAP HANA and unlock if necessary. |
| Password expired                    | Reset the password in SAP HANA.                                          |
| User not enabled for client connect | Run `ALTER USER <USER> ENABLE CLIENT CONNECT;`                           |

### Connection refused or timeout

**Symptoms:**

- Data source test times out
- Error message indicates connection refused
- Intermittent connection issues

**Solutions:**

1. Verify network connectivity from the Grafana server to the SAP HANA server.
2. Check firewall rules allow outbound connections to the SAP HANA port.
3. Verify the server address is correct and doesn’t include http/https prefixes.
4. For private networks, ensure VPN or private connectivity is configured.
5. For Grafana Cloud, configure [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) if accessing private resources.

### TLS verification failures

If you’re connecting to a SAP HANA instance with a self-signed certificate or a certificate signed by an internal CA:

1. Enable **Skip TLS Verify** to bypass certificate validation (not recommended for production).
2. Or, enable **With CA Cert** and provide your CA certificate in PEM format.

## Query errors

Query errors occur when there are issues with the structure, syntax, or parameters of your SQL queries.

### “No data” or empty results

**Symptoms:**

- Query executes without error but returns no data
- Charts show “No data” message

**Possible causes and solutions:**

Expand table

| Cause                           | Solution                                                                                                             |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------|
| Time range doesn’t contain data | Expand the dashboard time range or verify data exists in SAP HANA.                                                   |
| Wrong schema specified          | Verify the schema name is correct, or set a default schema in the data source configuration.                         |
| Permissions issue               | Verify the user has SELECT permissions on the tables being queried. Run `GRANT SELECT ON SCHEMA <SCHEMA> TO <USER>;` |
| Macro not expanding correctly   | Check the query in **Query Inspector** to see the expanded query.                                                    |

### Query timeout

**Symptoms:**

- Query runs for a long time then fails
- Error mentions timeout or query limits

**Solutions:**

1. Narrow the time range to reduce data volume.
2. Add WHERE clauses to filter the result set.
3. Optimize the query with proper indexes.
4. Use `$__timeGroup` to aggregate data into larger intervals.
5. Break complex queries into smaller parts.

### SQL syntax errors

**Symptoms:**

- Query fails with syntax error
- SAP HANA returns parser errors

**Solutions:**

1. Verify table and column names are correctly quoted (SAP HANA is case-sensitive for quoted identifiers).
2. Check that macros are being used correctly.
3. Test the query directly in SAP HANA Studio or another SQL client.
4. Ensure column names in SELECT match the case used in the database.

### Macro expansion errors

**Symptoms:**

- Macros are not being replaced with values
- Unexpected SQL in the executed query

**Solutions:**

1. Verify macro syntax is correct (e.g., `$__timeFilter(column)` not `$_timeFilter(column)`).
2. Check the **Query Inspector** to see how macros are being expanded.
3. Ensure time columns are of the correct data type for the macro being used.

## Template variable errors

These errors occur when using template variables with the data source.

### Variables return no values

**Solutions:**

1. Verify the data source connection is working (test it in the data source settings).
2. Check that the variable query returns data.
3. Verify the user has permissions to query the tables referenced in the variable query.
4. Ensure the query returns the expected columns. For key/value pairs, use columns named `__text` and `__value`, or return exactly 2 columns.

### Variables are slow to load

**Solutions:**

1. Set variable refresh to **On dashboard load** instead of **On time range change**.
2. Add LIMIT clauses to variable queries.
3. Optimize variable queries with indexes.
4. Consider using static **Custom** variables instead of query variables.

## Performance issues

These issues relate to slow queries or database load.

### Slow query execution

**Symptoms:**

- Queries take a long time to return
- Dashboard panels load slowly

**Solutions:**

1. Reduce the time range to limit the amount of data returned.
2. Use `$__timeGroup` to aggregate data into larger intervals.
3. Add indexes to frequently queried columns.
4. Use LIMIT clauses to cap the number of returned rows.
5. Avoid SELECT * and only request needed columns.

### High database load from Grafana

**Solutions:**

1. Increase the dashboard auto-refresh interval.
2. Use query caching in Grafana Enterprise.
3. Optimize queries to reduce database work.
4. Limit the number of panels per dashboard.

## Enable debug logging

To capture detailed error information for troubleshooting:

1. Update your Grafana configuration file (`grafana.ini`):

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Restart Grafana and reproduce the issue.
3. Review logs in `/var/log/grafana/grafana.log` (or your configured log location).
4. Look for SAP HANA-specific entries that include request and response details.
5. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## View executed queries

When a query fails, check the **Query Inspector** in Grafana:

1. Open your dashboard panel.
2. Click the panel title and select **Inspect** &gt; **Query**.
3. Review the executed query to verify macros expanded correctly.

## Get additional help

If you continue to experience issues after following this troubleshooting guide:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Review the [SAP HANA documentation](https://help.sap.com/viewer/product/HANA_CLOUD/hanacloud/en-US) for database-specific guidance.
3. Contact Grafana Support if you’re an Enterprise, Cloud Pro, or Cloud Contracted user.
4. When reporting issues, include:

   - Grafana version
   - SAP HANA version
   - Error messages (redact sensitive information)
   - Steps to reproduce
   - Relevant configuration (redact credentials)
