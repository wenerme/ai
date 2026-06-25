---
title: "Troubleshoot Snowflake data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshooting guide for the Snowflake data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Snowflake data source issues

This document provides solutions to common issues you may encounter when configuring or using the Snowflake data source. For configuration instructions, refer to [Configure the Snowflake data source](/docs/plugins/grafana-snowflake-datasource/latest/configure/).

## Authentication errors

These errors occur when credentials are invalid, missing, or don’t have the required permissions.

### “Incorrect username or password”

**Symptoms:**

- Save &amp; test fails with authentication errors
- Error message mentions incorrect credentials

**Possible causes and solutions:**

Expand table

| Cause                    | Solution                                                                                |
|--------------------------|-----------------------------------------------------------------------------------------|
| Invalid password         | Verify the password is correct. Try logging into Snowflake directly to confirm.         |
| Incorrect username       | Verify the username matches your Snowflake account.                                     |
| Account locked           | Check if the Snowflake account is locked due to too many failed login attempts.         |
| Wrong account identifier | Verify the Account field includes the correct region and platform suffix if applicable. |

### “Invalid private key”

**Symptoms:**

- Save &amp; test fails when using Key Pair authentication
- Error message mentions private key issues

**Solutions:**

1. Verify the private key is **unencrypted**. The plugin does not support encrypted private keys.
2. Ensure the private key is in PEM format and includes the header and footer lines:

   [Copy code to clipboard] Copy

   ```none
   -----BEGIN RSA PRIVATE KEY-----
   ...
   -----END RSA PRIVATE KEY-----
   ```
3. Verify the corresponding public key is correctly configured in Snowflake for your user.
4. Regenerate the key pair if necessary. Refer to [Snowflake Key Pair authentication](https://docs.snowflake.com/en/user-guide/key-pair-auth.html).

### “Role not granted to user”

**Symptoms:**

- Save &amp; test fails with role-related errors
- Queries fail with permission errors

**Solutions:**

1. Verify the role is granted to the user:

   SQL [Copy code to clipboard] Copy

   ```sql
   SHOW GRANTS TO USER <username>;
   ```
2. Grant the role if missing:

   SQL [Copy code to clipboard] Copy

   ```sql
   GRANT ROLE <role_name> TO USER <username>;
   ```
3. If the role field is left empty, the user’s default role is used. Verify the default role has the necessary permissions.

## Connection errors

These errors occur when Grafana cannot reach Snowflake endpoints.

### “Connection refused” or timeout errors

**Symptoms:**

- Data source test times out
- Queries fail with network errors

**Solutions:**

1. Verify network connectivity from the Grafana server to Snowflake endpoints.
2. Check firewall rules allow outbound HTTPS (port 443) to `*.snowflakecomputing.com`.
3. Verify the Account field is correct, including region and platform if applicable.
4. For Grafana Cloud, ensure your Snowflake account allows connections from Grafana Cloud IP ranges.

### “Invalid account identifier”

**Symptoms:**

- Save &amp; test fails with account-related errors
- Error message mentions invalid account

**Solutions:**

1. Verify the account identifier format. The account name should be the entire string to the left of `snowflakecomputing.com` in your Snowflake URL.
2. Include the region if not in `us-west-2`. Example: `xyz123.us-east-1`
3. Include the platform if not on AWS. Example: `xyz123.us-east-1.gcp` or `xyz123.east-us-2.azure`

## Query errors

These errors occur when executing queries against the data source.

### “No data” or empty results

**Symptoms:**

- Query executes without error but returns no data
- Charts show “No data” message

**Possible causes and solutions:**

Expand table

| Cause                           | Solution                                                                                                                      |
|---------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Time range doesn’t contain data | Expand the dashboard time range or verify data exists in Snowflake for the selected period.                                   |
| Wrong database/schema/table     | Verify you’ve selected the correct database, schema, and table in your query.                                                 |
| Permissions issue               | Verify the user’s role has `SELECT` permission on the table.                                                                  |
| Time column format mismatch     | Ensure your time column is in a format that Snowflake recognizes and that the `$__timeFilter` macro matches your column type. |

### Query timeout

**Symptoms:**

- Query runs for a long time then fails
- Error mentions timeout or query limits

**Solutions:**

1. Narrow the time range to reduce data volume.
2. Add `LIMIT` clauses to reduce the result set.
3. Optimize your query with appropriate `WHERE` clauses.
4. Check if the Snowflake warehouse is suspended and needs to resume.
5. Consider using a larger warehouse size for complex queries.

### “Object does not exist”

**Symptoms:**

- Error message mentions table, schema, or database not found

**Solutions:**

1. Verify the object name is spelled correctly.
2. Check that the database and schema are specified in your query or in the data source configuration.
3. Verify the user’s role has access to the object.
4. Object names in Snowflake are case-sensitive when quoted. Ensure consistent casing.

## Template variable errors

These errors occur when using template variables with the data source.

### Variables return no values

**Solutions:**

1. Verify the data source connection is working (test it in the data source settings).
2. Check that the variable query returns results when run directly in Snowflake.
3. Verify the user’s role has permissions to query the tables referenced in the variable query.
4. For cascading variables, ensure parent variables have valid selections.

### Variables are slow to load

**Solutions:**

1. Set variable refresh to **On dashboard load** instead of **On time range change**.
2. Add `LIMIT` clauses to variable queries to reduce the number of returned values.
3. Use more specific `WHERE` clauses to filter variable results.

## Enable debug logging

To capture detailed error information for troubleshooting:

1. Set the Grafana log level to `debug` in the configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Review logs in `/var/log/grafana/grafana.log` (or your configured log location).
3. Look for Snowflake-specific entries that include request and response details.
4. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## Get additional help

If you’ve tried the solutions above and still encounter issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Review the [Snowflake plugin GitHub issues](https://github.com/grafana/grafana/issues) for known bugs.
3. Consult the [Snowflake documentation](https://docs.snowflake.com/) for service-specific guidance.
4. Contact Grafana Support if you’re a Grafana Cloud Pro, Cloud Contracted, or Enterprise customer.

When reporting issues, include:

- Grafana version
- Snowflake plugin version
- Error messages (redact sensitive information)
- Steps to reproduce
- Relevant configuration (redact credentials)
