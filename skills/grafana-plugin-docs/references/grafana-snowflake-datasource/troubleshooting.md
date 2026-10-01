---
title: "Troubleshoot Snowflake data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshooting guide for the Snowflake data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Snowflake data source issues

This document provides solutions to common issues you may encounter when configuring or using the Snowflake data source. For configuration instructions, refer to [Configure the Snowflake data source](/docs/plugins/grafana-snowflake-datasource/latest/configure/).

## Quick troubleshooting checklist

Start here for the most common issues.

Expand table

| Symptom                                                                     | First check                                                                                                                                                                                                           |
|-----------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Plugin health check failed` or `invalid license for the enterprise plugin` | Verify the Enterprise license or Grafana Cloud entitlement is active. Refer to [License errors](#license-errors).                                                                                                     |
| Query times out at 30 or 60 seconds                                         | Check the Grafana `[dataproxy] timeout` and confirm the persisted `requestTimeout` value. Refer to [Queries time out before the configured Request Timeout](#queries-time-out-before-the-configured-request-timeout). |
| Query times out at 5 minutes                                                | This is the Grafana Cloud global limit. Optimize the query to run faster. Refer to [Queries time out before the configured Request Timeout](#queries-time-out-before-the-configured-request-timeout).                 |
| Alerts fail on an OAuth data source                                         | Use a non-OAuth data source for alerts. Refer to [OAuth authentication doesn’t work for alerts](#oauth-authentication-doesnt-work-for-alerts).                                                                        |

## License errors

The Snowflake data source is a Grafana Enterprise plugin. It requires a Grafana Enterprise license, or a Grafana Cloud plan that includes Enterprise plugins. A missing or invalid license, or a license that doesn’t cover the plugin, causes most installation and startup failures, rather than a problem with your Snowflake credentials. Check your license before you troubleshoot your configuration.

On self-managed Grafana, review your license in [Administration &gt; General &gt; Stats and license](/docs/grafana/latest/administration/stats-and-license/). On Grafana Cloud, Enterprise plugins are included on some plans and available as a paid add-on on others. For details, refer to [Grafana Cloud features](/docs/grafana-cloud/introduction/understand-grafana-cloud-features/).

### “Plugin health check failed” or “Invalid license for the enterprise plugin”

The plugin backend fails to start when it can’t validate an Enterprise license, which surfaces as a generic health check error. This is a licensing problem, not a credential problem.

**Symptoms:**

- **Save &amp; test** reports `Plugin health check failed` with no further detail.
- The plugin catalog or server log shows an error similar to `invalid license for the enterprise plugin`.
- The data source fails immediately, before it sends any request to Snowflake.

**Solutions:**

1. Confirm your Grafana instance has a valid Enterprise license, or that your Grafana Cloud plan includes Enterprise plugins.
2. If you provide the license through the `GF_ENTERPRISE_LICENSE_TEXT` environment variable or a license file, verify that you copied the full token without truncation or extra whitespace. The token is a JSON Web Token (JWT) with three parts separated by periods.
3. After you update the license, restart Grafana and try again.
4. If your license is valid and the error persists, contact [Grafana Support](/support/).

### Enterprise plugin isn’t available on your plan

Free plans and some paid plans don’t include Enterprise plugins, so the plugin is blocked before you can use it.

**Symptoms:**

- No **Install** or **Enable** button appears on the plugin’s catalog page.
- The plugin appears installed but won’t enable.

**Solutions:**

1. On Grafana Cloud, verify that Enterprise plugins are enabled for your account. On some plans, Enterprise plugins are a paid add-on that you must enable. For details, refer to [Grafana Cloud features](/docs/grafana-cloud/introduction/understand-grafana-cloud-features/).
2. Depending on your plan, you might be limited in how many Enterprise plugins you can run at once. If another Enterprise plugin, such as ServiceNow or Splunk, is already active, deactivate it or upgrade your plan.
3. On self-managed Grafana, verify that your Grafana Enterprise license is valid and covers Enterprise plugins.
4. If you can’t enable Enterprise plugins, contact [Grafana Support](/support/).

### License stops working after a plan or contract change

After a contract renewal or plan change, license entitlements don’t always propagate automatically, and a previously working plugin can stop loading.

**Solutions:**

1. On self-managed Grafana, restart Grafana so it picks up the updated license.
2. Confirm the new plan or contract still includes Enterprise plugins.
3. If the plugin doesn’t recover, contact [Grafana Support](/support/) to re-provision your license entitlements.

### Provisioned data source shows errors or broken icons

A Snowflake data source created through provisioning or Terraform shows broken icons or errors when the Enterprise license isn’t active. This is a licensing issue, not a provisioning or Terraform bug.

**Solutions:**

1. Verify the Enterprise license or Grafana Cloud entitlement is active. Refer to [“Plugin health check failed” or “Invalid license for the enterprise plugin”](#plugin-health-check-failed-or-invalid-license-for-the-enterprise-plugin).
2. After the license is active, reload the page or restart Grafana, then re-test the provisioned data source.

## Authentication errors

These errors occur when credentials are invalid, missing, or don’t have the required permissions.

### “Incorrect username or password”

**Symptoms:**

- **Save &amp; test** fails with authentication errors.
- The error message mentions incorrect credentials.

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

- **Save &amp; test** fails when using Key Pair authentication.
- The error message mentions private key issues.

**Solutions:**

1. Ensure the private key is in PKCS#8 PEM format. The plugin supports keys both with and without a passphrase. Keys without a passphrase use the following header and footer:

   [Copy code to clipboard] Copy

   ```none
   -----BEGIN PRIVATE KEY-----
   ...
   -----END PRIVATE KEY-----
   ```

   Passphrase-protected keys use:

   [Copy code to clipboard] Copy

   ```none
   -----BEGIN ENCRYPTED PRIVATE KEY-----
   ...
   -----END ENCRYPTED PRIVATE KEY-----
   ```
2. Paste the full contents of the private key file, including the header and footer lines.
3. If the key is protected by a passphrase, enter the matching passphrase in the **Private key passphrase** field. Leave this field empty for keys without a passphrase. A missing or incorrect passphrase produces an invalid private key error.
4. Verify the corresponding public key is correctly configured in Snowflake for your user.
5. Regenerate the key pair if necessary. Refer to [Snowflake Key Pair authentication](https://docs.snowflake.com/en/user-guide/key-pair-auth.html).

> Note
>
> Keys in the legacy PKCS#1 format (`-----BEGIN RSA PRIVATE KEY-----`) are not supported. Convert the key to PKCS#8 format before using it.

### “Role not granted to user”

**Symptoms:**

- **Save &amp; test** fails with role-related errors.
- Queries fail with permission errors.

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

### OAuth authentication doesn’t work for alerts

OAuth pass-through relies on the identity of the user signed in to Grafana. Alert rules, recording rules, and other backend evaluations run without a signed-in user, so the plugin can’t obtain an OAuth token for them.

**Symptoms:**

- Interactive dashboard queries work, but alert rules on the same data source fail.
- Alert evaluation errors mention authentication or a missing token.

**Solutions:**

1. Configure a separate Snowflake data source that uses password, key pair, or programmatic access token (PAT) authentication, and use it for alert and recording rules.
2. Keep the OAuth data source for interactive dashboards, where a user identity is available.

For more information, refer to [Configure alerting](/docs/plugins/grafana-snowflake-datasource/latest/alerting/).

### OAuth configuration on Grafana Cloud

Some OAuth setup steps edit the `grafana.ini` configuration file, which isn’t available on Grafana Cloud.

**Solutions:**

1. On Grafana Cloud, you can’t edit `grafana.ini`. Configure your identity provider and authentication settings through the Grafana Cloud UI instead. Refer to [Configure authentication](/docs/grafana/latest/setup-grafana/configure-security/configure-authentication/).
2. On self-managed Grafana, set the OAuth scopes in `grafana.ini` as described in [OAuth authentication](/docs/plugins/grafana-snowflake-datasource/latest/configure/#oauth-authentication).

### Authentication type change fails with a license error

An Enterprise license problem can block configuration changes and surface as an authentication or health check error, which makes it look like a credentials problem.

**Solutions:**

1. Before you switch authentication types, for example from password to key pair, confirm the Enterprise license is active. Refer to [License errors](#license-errors).
2. After the license is active, change the authentication type and click **Save &amp; test**.

### Unexpected authentication attempts from Grafana

If you see unexpected Snowflake login attempts from Grafana Cloud IP addresses, another data source is likely still configured to connect to your Snowflake account.

**Solutions:**

1. Audit all Snowflake data sources across your Grafana organizations and stacks. A data source in another organization under the same account can connect to the same Snowflake account.
2. Remove or disable data sources that should no longer connect.
3. Review the Snowflake [`LOGIN_HISTORY`](https://docs.snowflake.com/en/sql-reference/functions/login_history) view to identify the user and client that generate the attempts.

## Connection errors

These errors occur when Grafana cannot reach Snowflake endpoints.

### “Connection refused” or timeout errors

**Symptoms:**

- The data source test times out.
- Queries fail with network errors.

**Solutions:**

1. Verify network connectivity from the Grafana server to Snowflake endpoints.
2. Check firewall rules allow outbound HTTPS (port 443) to `*.snowflakecomputing.com`.
3. Verify the Account field is correct, including region and platform if applicable.
4. For Grafana Cloud, ensure your Snowflake account allows connections from Grafana Cloud IP ranges.
5. If your Snowflake instance is only reachable from within a private network, set up [Private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) to establish a secure tunnel from Grafana Cloud.

### “Invalid account identifier”

**Symptoms:**

- **Save &amp; test** fails with account-related errors.
- The error message mentions an invalid account.

**Solutions:**

1. Verify the account identifier format. The account name should be the entire string to the left of `snowflakecomputing.com` in your Snowflake URL.
2. Include the region if not in `us-west-2`. Example: `xyz123.us-east-1`
3. Include the platform if not on AWS. Example: `xyz123.us-east-1.gcp` or `xyz123.east-us-2.azure`

### Private data source connect (PDC) issues

Private data source connect (PDC) failures are usually caused by local network configuration, such as firewall rules, a VPN, or a proxy, rather than the Snowflake plugin.

**Solutions:**

1. Verify the PDC agent is running and healthy.
2. Verify your network allows traffic from the PDC agent to your Snowflake endpoint over HTTPS (port 443).
3. Confirm the data source is assigned to the correct PDC network. Refer to [Private data source connect](/docs/plugins/grafana-snowflake-datasource/latest/configure/#private-data-source-connect).
4. For setup and agent troubleshooting, refer to [Private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/).

### Corporate proxy or security software interferes with queries

Corporate proxies and security tools, such as Zscaler, can interfere with Snowflake connections, especially under concurrent load.

**Symptoms:**

- Individual queries succeed, but dashboards that run many queries at once fail.
- Intermittent connection or TLS errors that don’t correlate with a specific query.

**Solutions:**

1. Review your proxy or security layer configuration for rules that limit concurrent connections to `*.snowflakecomputing.com`.
2. Allow traffic to your Snowflake endpoints through the proxy or security software.
3. If your Snowflake instance is on a private network, use [Private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) to establish a dedicated secure tunnel.

## Query errors

These errors occur when executing queries against the data source.

### “No data” or empty results

**Symptoms:**

- The query executes without error but returns no data.
- Charts show a “No data” message.

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

- The query runs for a long time, then fails.
- The error mentions a timeout or query limits.

**Solutions:**

1. Narrow the time range to reduce data volume.
2. Select only the columns you need instead of `SELECT *`.
3. Add `WHERE` filters to narrow the dataset before Grafana processes it, and add `LIMIT` clauses to reduce the result set.
4. Avoid `LIKE` on large tables. Use exact matches where possible, or filter after the query with [panel transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/).
5. Check whether the Snowflake warehouse is suspended and needs to resume, and use a warehouse sized appropriately for your query complexity.
6. Increase the **Request Timeout (sec)** in the data source configuration if your queries legitimately need more time. Refer to [Queries time out before the configured Request Timeout](#queries-time-out-before-the-configured-request-timeout).

### Queries time out before the configured Request Timeout

The effective query timeout is the smallest of several limits, so a query can fail before it reaches the plugin’s **Request Timeout** value.

**Possible causes and solutions:**

Expand table

| Cause                                      | Solution                                                                                                                                                                                                                           |
|--------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Grafana Cloud global timeout               | Grafana Cloud enforces a global request timeout of 5 minutes that overrides any data source timeout. Queries that run longer than 5 minutes fail regardless of the plugin’s **Request Timeout**. Reduce the query runtime instead. |
| Grafana `dataproxy` timeout (self-managed) | The Grafana server setting `[dataproxy] timeout` (default `30` seconds) can cap queries. Increase it in `grafana.ini`, then restart Grafana.                                                                                       |
| Configured value not applied               | If queries still time out sooner than expected, confirm the persisted `requestTimeout` value. You can set it directly with the Grafana HTTP API by sending `PUT /api/datasources/{id}` with `requestTimeout` in `jsonData`.        |

### Alert queries time out with the Time series format

The **Time series** format converts query results into wide time series, which is an expensive operation for large result sets and can push a backend-evaluated alert query past its timeout.

**Solutions:**

1. In the alert rule query, set the format to **Table** instead of **Time series**.
2. Remove time-related columns and time grouping from the SQL, and return only the columns the alert condition needs.
3. Narrow the query with `WHERE` filters and aggregation so it returns a small result set.

### Dashboards time out or cancel queries on refresh

Aggressive dashboard auto-refresh intervals on dashboards with many Snowflake panels can overload the warehouse and cause queries to cancel each other.

**Solutions:**

1. Set the dashboard auto-refresh to a reasonable interval, such as 30 seconds or more, for Snowflake-backed dashboards.
2. Reduce the number of Snowflake panels per dashboard, or stagger heavy panels across multiple dashboards.
3. Use a warehouse sized to handle the concurrent queries the dashboard generates.

### “Object does not exist”

**Symptoms:**

- The error message mentions a table, schema, or database that isn’t found.

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

## Known issues and workarounds

### “Session no longer exists” or “session expired” errors

When a Snowflake session expires, the plugin reconnects and retries the query. Older plugin versions only retried on error `390114` (“Authentication token has expired”) and surfaced error `390111` (“Session no longer exists. New login required to access the service.”) to the user, most often on alert rules that evaluate after long idle periods.

**Symptoms:**

- Queries or alert rules intermittently fail with `390111` or a session-expired message.
- Failures are more common after periods of inactivity.

**Solutions:**

1. Update to the latest version of the Snowflake plugin. Current versions reconnect and retry on both `390111` and `390114`.
2. If you can’t update immediately, re-run the query or re-save the alert rule to force a new session.

### Annotation queries are slow

Annotation queries can run slower than panel queries, especially against high-latency views such as `SNOWFLAKE.ACCOUNT_USAGE`.

**Solutions:**

1. Filter annotation queries with the `$__timeFilter(<time_column>)` macro and add a `LIMIT` clause to reduce the result set. Refer to [Annotations](/docs/plugins/grafana-snowflake-datasource/latest/annotations/).
2. Query low-latency tables instead of `SNOWFLAKE.ACCOUNT_USAGE` views where possible. `ACCOUNT_USAGE` views can have significant data latency.
3. Keep the plugin updated to the latest version.

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
2. Review the [Snowflake plugin catalog page](/grafana/plugins/grafana-snowflake-datasource/) for recent changes and known issues.
3. Consult the [Snowflake documentation](https://docs.snowflake.com/) for service-specific guidance.
4. Contact Grafana Support if you’re a Grafana Cloud Pro, Cloud Contracted, or Enterprise customer.

When reporting issues, include:

- Grafana version
- Snowflake plugin version
- Error messages (redact sensitive information)
- Steps to reproduce
- Relevant configuration (redact credentials)
