---
title: "Troubleshoot DynamoDB data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshooting guide for the DynamoDB data source in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot DynamoDB data source issues

This document provides solutions to common issues you may encounter when configuring or using the DynamoDB data source. For configuration instructions, refer to [Configure the DynamoDB data source](/docs/plugins/grafana-dynamodb-datasource/latest/configure/).

## Licensing errors

These errors occur when the DynamoDB plugin license isn’t active or valid.

### Plugin health check failed

**Symptoms:**

- DynamoDB dashboards stop working after a Grafana plan change (for example, upgrading from a free trial to a Pro plan).
- Save &amp; test fails with a health check error.
- The plugin appears installed but queries return errors.

**Solutions:**

The DynamoDB data source is an Enterprise plugin. It’s included during Enterprise trials but isn’t part of the standard Grafana Cloud Pro plan by default.

1. Verify your Grafana subscription includes the Enterprise plugins add-on. Check your plan details in the [Grafana Cloud portal](/auth/sign-in/).
2. If the license has expired or is missing, contact Grafana Support or your account representative to add the correct entitlement.
3. After confirming the license, reinstall or re-enable the plugin from **Administration** &gt; **Plugins**.
4. Click **Save &amp; test** on the data source to verify the health check passes.

## Authentication errors

These errors occur when credentials are invalid, missing, or don’t have the required permissions.

### “missing access key”

**Symptoms:**

- Save &amp; test fails with a “missing access key” error.
- The data source can’t connect after saving.

**Solutions:**

1. Verify the **Access Key ID** field is populated in the data source configuration.
2. If using provisioning, confirm the `accessKey` field is set in `secureJsonData`.
3. If you recently upgraded from v1.x to v2.x, re-enter your access key and secret key. Refer to [V1 to V2 migration issues](#v1-to-v2-migration-issues) for details.

### “missing secret key”

**Symptoms:**

- Save &amp; test fails with a “missing secret key” error.

**Solutions:**

1. Verify the **Secret Access Key** field is populated in the data source configuration.
2. If using provisioning, confirm the `secretKey` field is set in `secureJsonData`.
3. If you recently upgraded from v1.x to v2.x, re-enter both your access key and secret key.

### “missing region”

**Symptoms:**

- Save &amp; test fails with a “missing region” error.

**Solutions:**

1. Verify the **Default Region** field is set in the data source configuration.
2. If using provisioning, confirm `defaultRegion` is set in `jsonData`.

### “unsupported auth type”

**Symptoms:**

- Save &amp; test fails with “unsupported auth type” followed by the auth type name (for example, “unsupported auth type default”).
- This commonly occurs when selecting **AWS SDK Default**, **Assume Role**, or **EC2 IAM Role** from the **Authentication Provider** drop-down.

**Possible causes and solutions:**

Expand table

| Cause                        | Solution                                                                                                                                     |
|------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| AWS SDK Default selected     | The DynamoDB data source doesn’t support AWS SDK Default authentication. Select **Access &amp; secret key** or **Credentials file** instead. |
| Assume Role selected         | The DynamoDB data source doesn’t support Assume Role. Select a supported authentication method.                                              |
| Grafana Assume Role selected | The DynamoDB data source doesn’t support Grafana Assume Role. Select a supported authentication method.                                      |
| EC2 IAM Role selected        | The DynamoDB data source doesn’t support EC2 IAM Role authentication. Select a supported authentication method.                              |

The DynamoDB data source only supports two authentication methods: **Access &amp; secret key** and **Credentials file**. All other authentication types shown in the drop-down are provided by the shared AWS connection component but aren’t implemented by this plugin.

### Cross-account access

**Symptoms:**

- Queries fail when trying to access DynamoDB tables in a different AWS account.
- Users expect Assume Role to work for cross-account access.

**Solutions:**

The DynamoDB data source doesn’t support Assume Role or IRSA (IAM Roles for Service Accounts), which are typically used for cross-account access. As a workaround:

1. Create an IAM user in the target account with `dynamodb:PartiQLSelect` permissions on the required tables.
2. Generate access keys for that IAM user.
3. Configure the data source using **Access &amp; secret key** authentication with those credentials.
4. If your organization requires role-based access, consider setting up a proxy service that assumes the role and forwards requests to DynamoDB.

### “Access denied” or “Authorization failed”

**Symptoms:**

- Save &amp; test passes but queries fail with access denied errors.
- Certain tables return errors while others work.

**Possible causes and solutions:**

Expand table

| Cause                        | Solution                                                                                         |
|------------------------------|--------------------------------------------------------------------------------------------------|
| Missing DynamoDB permissions | Add `dynamodb:PartiQLSelect` permission to the IAM identity for all target tables.               |
| Incorrect region             | Verify the **Default Region** setting matches the region where your DynamoDB tables are located. |
| Expired credentials          | Generate new access keys in the AWS IAM console and update the data source configuration.        |
| Expired session token        | If using temporary credentials, generate a new session token and update the configuration.       |

### Credentials file not found or invalid profile

**Symptoms:**

- Save &amp; test fails when using **Credentials file** authentication.
- Error messages mention the credentials file or profile.

**Solutions:**

1. Verify that `~/.aws/credentials` exists on the Grafana server.
2. Confirm the profile name in the data source configuration matches a profile in the credentials file.
3. Check file permissions to ensure the Grafana process can read the credentials file.

### Intermittent “Invalid Security Token” errors

**Symptoms:**

- Queries fail periodically with “Invalid Security Token” or similar authentication errors.
- The errors resolve themselves after refreshing the dashboard or waiting a short time.
- The issue recurs on a regular cycle (for example, every hour).

**Solutions:**

This typically occurs when using temporary credentials (session tokens) that expire while cached in the plugin’s connection pool. The plugin uses static credentials passed at configuration time and doesn’t automatically refresh expired tokens.

1. If using temporary credentials with a session token, rotate the token before it expires and update the `sessionToken` field in the data source configuration or provisioning.
2. For long-lived access, use permanent IAM access keys instead of temporary session tokens.
3. If using **Credentials file** authentication, verify that the credentials file is kept up to date by an external process (for example, `aws sso login` or an instance profile refresh agent).
4. Restart the Grafana server or data source pods to clear cached connections with stale tokens.
5. Upgrade the DynamoDB plugin to the latest version, as newer releases may include improvements to token handling.

The plugin automatically retries queries that return “Invalid SessionHandle” errors (up to 5 times with a 5-second pause), but this retry mechanism doesn’t cover all token expiration scenarios.

## Connection errors

These errors occur when Grafana can’t reach the DynamoDB endpoints.

### Connection timeout or refused

**Symptoms:**

- Save &amp; test times out or fails with a connection error.
- Queries fail intermittently with network errors.

**Solutions:**

1. Verify network connectivity from the Grafana server to AWS DynamoDB endpoints.
2. Check that firewall rules allow outbound HTTPS (port 443) to `dynamodb.<region>.amazonaws.com`.
3. If using a custom endpoint, verify the **Endpoint** field contains the correct URL.
4. For Grafana Cloud accessing private resources, configure [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/).

### Custom endpoint not working

**Symptoms:**

- Queries fail when using a custom endpoint (for example, DynamoDB Local).
- Save &amp; test returns unexpected errors.

**Solutions:**

1. Verify the endpoint URL is accessible from the Grafana server.
2. Confirm the endpoint URL format is correct (for example, `http://localhost:8000` for DynamoDB Local).
3. Check that the region setting is still valid, even when using a custom endpoint.

## Configuration errors

These errors occur when the data source configuration is invalid.

### “Invalid Settings”

**Symptoms:**

- Save &amp; test fails with an “Invalid Settings” error followed by a JSON parsing message.
- This typically occurs with provisioned data sources.

**Solutions:**

1. Verify the `jsonData` section in your provisioning YAML is valid JSON.
2. Check for syntax errors such as missing quotes, commas, or brackets.
3. Ensure `isV2` is set to `true` in `jsonData` for new data source configurations.

### V1 to V2 migration issues

**Symptoms:**

- After upgrading the plugin from v1.x to v2.x, a warning appears: “Your plugin has been upgraded from V1 to V2, introducing a breaking change.”
- The data source stops working after editing the configuration page.
- Access key or secret key appears to be missing.

**Solutions:**

The v2.0.0 release introduced a breaking change to the configuration format. If you edit the configuration page after upgrading, the secret key may be lost.

1. Before editing the configuration, make sure you have both your **Access Key ID** and **Secret Access Key** available.
2. Re-enter both credentials on the configuration page.
3. Click **Save &amp; test** to verify the connection.
4. If using provisioning, update your YAML to use the V2 format with `isV2: true`, `authType`, and `defaultRegion` in `jsonData`. Refer to [Provision the data source](/docs/plugins/grafana-dynamodb-datasource/latest/configure/#provision-the-data-source) for examples.

## Query errors

These errors occur when running PartiQL queries against DynamoDB.

### “No data” or empty results

**Symptoms:**

- The query runs without error but returns no data.
- Panels show a “No data” message.

**Possible causes and solutions:**

Expand table

| Cause                             | Solution                                                                                                                                            |
|-----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| Table name is incorrect           | Verify the table name in your query matches a table in the configured region. Table names are case-sensitive and must be enclosed in double quotes. |
| Time range doesn’t contain data   | Expand the dashboard time range or verify data exists in the DynamoDB table.                                                                        |
| Filter conditions too restrictive | Broaden your `WHERE` clause or remove filters to verify data exists.                                                                                |
| Permissions issue                 | Verify the IAM identity has `dynamodb:PartiQLSelect` access to the specific table.                                                                  |

### Dynamic time filtering doesn’t work

**Symptoms:**

- Queries with time-based filters return unexpected results or no data.
- Range comparisons such as `WHERE "timestamp" > 1711234567` fail or return incorrect results.
- Users expect Grafana variables like `$__from` or `$__timeFilter` to work.

**Solutions:**

The DynamoDB data source doesn’t support time-range macros (`$__from`, `$__to`, `$__timeFilter`, `$__range`). You must use explicit values or Grafana template variables for time filtering.

Additionally, DynamoDB doesn’t have a native `NOW()` function, so you can’t dynamically calculate relative time ranges in PartiQL.

A common cause of unexpected results is a mismatch between the timestamp data type in DynamoDB and the comparison value in the query:

Expand table

| Timestamp format             | Correct comparison                           | Common mistake                                                                            |
|------------------------------|----------------------------------------------|-------------------------------------------------------------------------------------------|
| Numeric (epoch seconds)      | `WHERE "timestamp" > 1711234567`             | Storing epoch as a string type, which causes lexicographic comparison instead of numeric. |
| Numeric (epoch milliseconds) | `WHERE "timestamp" > 1711234567000`          | Using seconds when the field stores milliseconds, or vice versa.                          |
| String (ISO 8601)            | `WHERE "timestamp" > '2025-03-23T12:00:00Z'` | Using a numeric comparison against a string field.                                        |

To work around the lack of dynamic time filtering:

1. Verify the timestamp column’s data type in DynamoDB matches your query’s comparison format.
2. For alerting, design your DynamoDB data to include only recent entries (for example, using TTL), or accept that alert queries scan a broader range.
3. Consider using a [template variable](/docs/plugins/grafana-dynamodb-datasource/latest/template-variables/) with a custom query to pass time boundaries, though these still require explicit values.

### Nested map data returns null

**Symptoms:**

- Queries that access nested map attributes return null values.
- Top-level attributes in the same query return data correctly.

**Solutions:**

This is a known limitation of the DynamoDB data source. Querying data from nested maps isn’t supported and returns null values. As a workaround, restructure your data to use top-level attributes, or use DynamoDB Streams to flatten nested data into a separate table.

### Query timeout

**Symptoms:**

- The query runs for a long time and then fails.
- Error messages mention timeout or exceed limits.

**Solutions:**

1. Narrow the time range to reduce the data volume.
2. Add a partition key filter to your `WHERE` clause to avoid full table scans.
3. Use `LIMIT` to restrict the number of returned items.
4. Break complex queries into smaller, more focused queries.
5. Increase the query timeout by setting the `timeout` field in `jsonData` through provisioning. The default is `60` seconds. Refer to [Advanced settings](/docs/plugins/grafana-dynamodb-datasource/latest/configure/#advanced-settings) for details.

## Template variable errors

These errors occur when using template variables with the DynamoDB data source.

### Variables return no values

**Symptoms:**

- The variable drop-down is empty.
- The variable preview in **Dashboard settings** &gt; **Variables** shows no results.

**Solutions:**

1. Verify the data source connection is working by running a test in the data source settings.
2. Check that the variable query returns at least one column.
3. Verify the IAM identity has permissions to query the table used in the variable query.
4. For cascading variables (variables that depend on other variables), verify that parent variables have valid selections.

### Variables are slow to load

**Symptoms:**

- Dashboards take a long time to load because of variable queries.
- The variable drop-down is unresponsive while values load.

**Solutions:**

1. Set variable refresh to **On dashboard load** instead of **On time range change**.
2. Add a partition key filter to variable queries to avoid full table scans.
3. Use `LIMIT` to restrict the number of values returned.

## Performance issues

These issues relate to slow queries or API throttling.

### DynamoDB throttling or rate limit errors

**Symptoms:**

- Errors mentioning “503” or throughput exceeded.
- Dashboard panels intermittently fail to load.
- Queries succeed on retry but fail on initial load.

The plugin automatically retries queries that return “503” or “Invalid SessionHandle” errors, up to 5 times with a 5-second pause between attempts. If queries still fail after retries, the underlying throttling needs to be addressed.

**Solutions:**

1. Reduce the frequency of dashboard auto-refresh.
2. Reduce the number of panels querying DynamoDB simultaneously.
3. Add partition key filters to all queries to avoid full table scans.
4. Increase the provisioned read capacity or switch to on-demand capacity mode in the AWS DynamoDB console.
5. Enable query caching in Grafana (available in Grafana Enterprise and Grafana Cloud).
6. Adjust retry settings through provisioning if needed. Refer to [Advanced settings](/docs/plugins/grafana-dynamodb-datasource/latest/configure/#advanced-settings) for the `retries` and `pause` configuration options.

## Enable debug logging

To capture detailed error information for troubleshooting:

1. Set the Grafana log level to `debug` in the configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Review logs in `/var/log/grafana/grafana.log` (or your configured log location).
3. Look for DynamoDB-specific entries that include request and response details.
4. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## Get additional help

If you’ve tried the solutions in this document and still encounter issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Review the [DynamoDB data source GitHub issues](https://github.com/grafana/dynamodb-datasource/issues) for known bugs.
3. Consult the [Amazon DynamoDB documentation](https://docs.aws.amazon.com/dynamodb/) for service-specific guidance.
4. Contact Grafana Support if you’re an Enterprise, Cloud Pro, or Cloud Advanced user.
5. When reporting issues, include:

   - Grafana version and DynamoDB plugin version
   - Error messages (redact sensitive information)
   - Steps to reproduce
   - Relevant configuration (redact credentials)
