---
title: "Troubleshoot Yugabyte data source issues | Grafana Plugins documentation"
description: "Troubleshooting guide for the Yugabyte data source in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Yugabyte data source issues

This document provides solutions to common issues you might encounter when you configure or use the Yugabyte data source. For configuration instructions, refer to [Configure the Yugabyte data source](/docs/plugins/grafana-yugabyte-datasource/latest/configure/).

## Connection errors

These errors occur when Grafana can’t reach your YugabyteDB instance.

### “Connection refused” or timeout errors

**Symptoms:**

- **Save &amp; test** times out or fails with a network error.
- Queries fail with connection errors.

**Possible causes and solutions:**

Expand table

| Cause                                   | Solution                                                                                                                                                                                                                                                                                                              |
|-----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| YugabyteDB isn’t reachable from Grafana | Verify network connectivity from the Grafana server to the YugabyteDB host and port. The default YSQL port is `5433`.                                                                                                                                                                                                 |
| Firewall blocks the connection          | Allow outbound access from Grafana to the YugabyteDB host and port.                                                                                                                                                                                                                                                   |
| Private network                         | For Grafana Cloud, configure [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) and select a PDC network in the data source’s [Private data source connect](/docs/plugins/grafana-yugabyte-datasource/latest/configure/#private-data-source-connect) settings. |

### “Missing port in address”

**Symptoms:**

- **Save &amp; test** fails immediately with an error that mentions a missing port.

**Solutions:**

1. Confirm the **Host URL** includes both the host and the port, for example `localhost:5433`.
2. Don’t include a scheme such as `http://` or `https://` in the **Host URL**.

## Authentication errors

These errors occur when the database credentials are invalid or lack the required permissions.

### “Password authentication failed”

**Symptoms:**

- **Save &amp; test** fails with an authentication error.
- Queries fail with permission errors.

**Possible causes and solutions:**

Expand table

| Cause                          | Solution                                                                                                         |
|--------------------------------|------------------------------------------------------------------------------------------------------------------|
| Incorrect username or password | Verify the **Username** and re-enter the **Password** on the configuration page, then click **Save &amp; test**. |
| User lacks database access     | Grant the database user permission to connect to the target database and read the required tables.               |
| Wrong database                 | Confirm the **Database** setting matches a database the user can access.                                         |

## Query errors

These errors occur when you run a query against the data source.

### “No data” or empty results

**Symptoms:**

- A query runs without error but returns no data.
- Panels show a **No data** message.

**Possible causes and solutions:**

Expand table

| Cause                           | Solution                                                                                     |
|---------------------------------|----------------------------------------------------------------------------------------------|
| Time range doesn’t contain data | Expand the dashboard time range, or verify that data exists for that range.                  |
| Time filter excludes rows       | Confirm the column passed to `$__timeFilter()` is the correct timestamp column.              |
| Wrong table or column           | Verify the table and column names against your schema. Names are case-sensitive when quoted. |

### Query timeout or slow queries

**Symptoms:**

- A query runs for a long time and then fails.
- Panels are slow to load.

**Solutions:**

1. Narrow the dashboard time range to reduce the amount of data scanned.
2. Add `WHERE` filters to reduce the result set.
3. Add indexes in YugabyteDB for the columns used in filters and time ranges.
4. Use `date_trunc()` to aggregate rows into time buckets instead of returning raw rows. The `$__timeGroup()` macro isn’t compatible with YugabyteDB.

### Results don’t render as a time series

**Symptoms:**

- A time-series panel shows the data as a table or fails to plot values.

**Solutions:**

1. Set the query **Format** to **Time series**.
2. Return a time-ordered column of `time` or `timestamp` type, aliased `AS time`.
3. Return at least one numeric column, and sort the results by the time column in ascending order.

### Timestamps appear shifted

**Symptoms:**

- Time-series values appear offset from the expected time by a fixed number of hours.
- Annotations or events display at different times than they occurred.

The data source reads `timestamp` columns, which don’t carry time zone information, as UTC. If your application stores local wall-clock times in `timestamp` columns, Grafana treats those values as UTC and displays them shifted by your time zone offset.

**Solutions:**

1. Store timestamps in UTC, or use the `timestamptz` type so values include time zone information.
2. Convert local timestamps in the query, for example `created_at AT TIME ZONE 'America/New_York' AS time`.
3. Confirm the dashboard time zone in the time range options is set to the zone you expect.

## Template variable errors

These errors occur when you use template variables with the data source.

### Variables return no values

**Solutions:**

1. Verify the data source connection by running **Save &amp; test** on the configuration page.
2. Confirm the variable query returns at least one column. Refer to [Query return format](/docs/plugins/grafana-yugabyte-datasource/latest/template-variables/#query-return-format).
3. For chained variables, confirm that parent variables have valid selections.

### Multi-value variables don’t match rows

**Symptoms:**

- A query that uses a multi-value variable with `IN` returns no rows.

**Solutions:**

1. Confirm you use the variable with the `IN` operator and without extra quotes, for example `status IN ($status)`.
2. Remember that multi-value variables expand to a single-quoted list, so they’re intended for string columns. For numeric columns, cast the column or use string comparisons.

## Private data source connect issues

These issues occur when you query a YugabyteDB instance through Private data source connect (PDC) on Grafana Cloud.

### The Secure Socks Proxy toggle isn’t visible

**Symptoms:**

- The **Additional Settings** section on the configuration page is empty.
- You can’t find a PDC or **Secure Socks Proxy Enabled** option.

**Solutions:**

1. Confirm the secure socks proxy is enabled for your Grafana instance. The toggle only appears when it’s enabled.
2. On Grafana Cloud, confirm that [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) is set up for your stack.
3. On self-managed Grafana, enable the secure socks proxy in the Grafana configuration file, then restart Grafana. Refer to [Configure the Yugabyte data source](/docs/plugins/grafana-yugabyte-datasource/latest/configure/#private-data-source-connect).

### Connection fails only when a PDC network is selected

**Solutions:**

1. Confirm that [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) is set up and the PDC agent is running.
2. Verify the PDC agent can reach the YugabyteDB host and port on the private network.
3. Because host name resolution happens on the PDC side, confirm the host name resolves from the network where the PDC agent runs.

## Enable debug logging

To capture detailed error information for troubleshooting:

1. Set the Grafana log level to `debug` in the configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Review the Grafana server logs and look for entries from the `grafana-yugabyte-datasource` plugin that include request and response details.
3. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## Get additional help

If you’ve tried the solutions in this document and still encounter issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Review the [Yugabyte data source plugin issues on GitHub](https://github.com/grafana/yugabyte-datasource/issues) for known bugs, and open an issue if needed.
3. Consult the [YugabyteDB documentation](https://docs.yugabyte.com/) for database-specific guidance.
4. When you report an issue, include:

   - Your Grafana version and plugin version.
   - The error message, with sensitive information redacted.
   - Steps to reproduce.
   - Relevant configuration, with credentials redacted.
