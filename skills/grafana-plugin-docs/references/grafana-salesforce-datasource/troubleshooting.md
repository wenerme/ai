---
title: "Troubleshoot Salesforce data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshoot common issues with the Salesforce data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Salesforce data source issues

This document provides guidance for troubleshooting common issues when configuring and using the Salesforce data source in Grafana.

## Before you begin

Before investigating specific errors, verify that the data source health check passes:

1. Click **Connections** in the left-side menu.
2. Click **Data sources** and select your Salesforce data source.
3. Click **Save &amp; test**.
4. Confirm you see a success message.

If the health check fails, start with the [License errors](#license-errors), [Connection errors](#connection-errors), [Configuration errors](#configuration-errors), or [Authentication errors](#authentication-errors) sections.

## License errors

The Salesforce data source is an enterprise plugin. It requires a valid Grafana Enterprise license that includes this plugin. If the license is missing, expired, or doesn’t cover the plugin, the plugin fails to load or the health check fails.

### Invalid license or plugin health check failed

**Symptoms:**

- You see an `Invalid license` error when you add or save the data source.
- You see a `Plugin health check failed` error.
- The plugin doesn’t load or doesn’t appear in the list of available data sources.

**Possible causes:**

- Your Grafana instance has no Grafana Enterprise license.
- The license wasn’t updated after a renewal, so Grafana still uses the expired license.
- The license doesn’t include the Salesforce plugin, or your plan allows only one enterprise plugin and another one is already active.
- The license is misconfigured.

**Solutions:**

Work through the following checks in order:

1. Confirm your Grafana instance has an active Grafana Enterprise license. For more information, refer to [Grafana Enterprise licensing](/docs/grafana/latest/administration/enterprise-licensing/).
2. If you recently renewed, verify that the new license is applied. If Grafana still shows the previous term, update the license token so the current license takes effect.
3. Check your plan tier and confirm it includes the Salesforce plugin. Some plans allow only one enterprise plugin at a time. If another enterprise plugin is already active, you can’t add a second one until the plan is updated.
4. If the license is correct but the error persists, the license might be misconfigured. Contact [Grafana Support](/contact/) to review your license configuration.
5. To add the plugin to your plan, or to increase the number of enterprise plugins your plan allows, contact your Grafana account team.

## Connection errors

Connection errors occur when Grafana cannot establish a connection to Salesforce.

### Connection timeout

The connection to Salesforce took too long to establish.

**Possible causes:**

- Network connectivity issues
- Firewall blocking the connection
- Salesforce service is experiencing issues

**Solutions:**

1. Verify network connectivity from the Grafana server to Salesforce.
2. Ensure your firewall allows outbound connections to `*.salesforce.com` and `*.force.com` on port 443.
3. Check the [Salesforce Trust Status](https://status.salesforce.com/) page for any ongoing incidents.
4. If using Private data source connect (PDC), verify the PDC agent is running and connected.

### Request blocked by organization’s IP restrictions

Salesforce can restrict API access to specific IP ranges.

**Possible causes:**

- Your Grafana server’s IP address is not in the trusted IP ranges
- Login IP ranges are configured for the user’s profile

**Solutions:**

1. Add your Grafana server’s IP address to the trusted IP ranges in Salesforce Setup under **Security** &gt; **Network Access**.
2. Alternatively, configure the user’s profile to allow login from any IP address.
3. If using Grafana Cloud, add the [Grafana Cloud IP addresses](/docs/grafana-cloud/account-management/allow-list/) to your trusted ranges.

## Configuration errors

Configuration errors occur when the data source or Connected App is not set up correctly.

### Incorrect or incomplete connection fields

The data source can’t connect to Salesforce because one or more connection fields are empty or contain an incorrect value. This is a common cause of failed connections between Grafana and Salesforce.

**Possible causes:**

- The **Consumer key** is invalid or was copied incorrectly from the External Client App or Connected App.
- The **User name** field is empty.
- The **Environment** is set to the wrong value, so the data source uses the wrong login URL.

**Solutions:**

Verify each connection field in the data source configuration. For the full field reference, refer to [Connection settings](/docs/plugins/grafana-salesforce-datasource/latest/configure/#connection-settings).

1. Confirm the **User name** field is populated with the Salesforce account user name, for example `salesforce_admin@abccompany.com`.
2. Confirm the **Consumer key** matches the consumer key from your External Client App or Connected App exactly, with no leading or trailing spaces.
3. For Credentials-based authentication, confirm the **Password**, **Security token**, and **Consumer secret** fields are populated.
4. For JWT-based authentication, confirm the **Certificate** and **Private key** are configured.
5. Confirm the **Environment** matches the Salesforce instance you’re connecting to. Select **Production** for `login.salesforce.com` or **Sandbox** for `test.salesforce.com`. Refer to [Sandbox vs Production environment mismatch](#sandbox-vs-production-environment-mismatch).
6. Click **Save &amp; test** to confirm the connection succeeds.

If the fields are correct but the connection still fails, the credentials might be rejected by Salesforce. Refer to [Authentication errors](#authentication-errors).

### OAuth settings not enabled

The Connected App doesn’t have OAuth enabled.

**Solution:**

1. Edit your Connected App in Salesforce Setup.
2. Under **API (Enable OAuth Settings)**, check **Enable OAuth Settings**.
3. Configure the required OAuth scopes:

   - For Credentials authentication: `Access and manage your data (api)`
   - For JWT authentication: `Access and manage your data (api)` and `Perform requests on your behalf at any time`

### Missing OAuth scopes

The Connected App doesn’t have the required OAuth scopes configured.

**Error messages:**

- `insufficient_access` - User lacks required permissions
- `API_DISABLED_FOR_ORG` - API access is not enabled

**Solutions:**

1. Edit your Connected App and verify the following scopes are selected:

   - **Access and manage your data (api)** - Required for all authentication methods
   - **Perform requests on your behalf at any time (refresh\_token, offline\_access)** - Required for JWT authentication
2. If you receive `API_DISABLED_FOR_ORG`, contact your Salesforce administrator to enable API access for your organization.

### Sandbox vs Production environment mismatch

You’re trying to connect to a Sandbox environment but have the wrong environment selected, or vice versa.

**Solutions:**

1. In the Grafana data source configuration, click the **Environment** drop-down.
2. Select the correct environment:

   - **Production** for production Salesforce instances
   - **Sandbox** for sandbox or test instances
3. Sandbox environments use `test.salesforce.com` for authentication, while production uses `login.salesforce.com`.

## Authentication errors

Authentication errors occur when there are issues with your credentials, Connected App configuration, or access permissions.

### Authentication fails after the Salesforce Connected Apps change

Starting with the Salesforce Spring ‘26 release, Salesforce disabled the creation of new Connected Apps by default and recommends [External Client Apps](/docs/plugins/grafana-salesforce-datasource/latest/configure/#external-client-app-settings) (ECAs) instead. If you configured the data source before this change, or your Salesforce org has new Connected App creation disabled, authentication can fail when you set up a new data source or re-authenticate an existing one.

**Symptoms:**

- Authentication fails when you configure or re-authenticate the Salesforce data source.
- You can’t create the Connected App that the existing configuration steps expect.

**Possible causes:**

- Your Salesforce org has the creation of new Connected Apps disabled by default (Spring ‘26 change).
- The data source was configured before the change with a Connected App that’s no longer valid or can’t be recreated.

**Solutions:**

1. For new setups, create an External Client App with JWT authentication and configure the data source to use it. Refer to [External Client App settings](/docs/plugins/grafana-salesforce-datasource/latest/configure/#external-client-app-settings).
2. Re-authenticate the data source using the External Client App’s consumer key and JWT credentials.
3. Existing Connected Apps continue to work. If you must create a new Connected App, request the ability from Salesforce Support, or migrate to an External Client App using Salesforce’s [Connected App to External Client App Migration](https://help.salesforce.com/s/articleView?id=sf.connected_app_to_eca_migration.htm&type=5) guide.

> Caution
>
> If you configured the Salesforce data source before the Spring ‘26 release, re-authentication might fail. Migrate to an External Client App with JWT authentication to restore access.

### Invalid username, password, security token; or user locked out

This error indicates that your authentication credentials are incorrect or the user account is locked.

**Possible causes:**

- Incorrect username or password
- Invalid or expired security token
- User account is locked due to too many failed login attempts
- Password has been reset without updating the security token

**Solutions:**

1. Verify that the username is the full email address used to log in to Salesforce (for example, `user@company.com`).
2. Confirm the password is correct and hasn’t expired.
3. [Reset your security token](https://help.salesforce.com/s/articleView?id=xcloud.user_security_token.htm&type=5) in Salesforce and update it in Grafana. Security tokens are regenerated when passwords are reset.
4. Check if the user account is locked in Salesforce Setup under **Users** &gt; **Users**.

### Invalid client credentials

This error indicates that the Consumer Key or Consumer Secret from your Connected App are incorrect.

**Possible causes:**

- Consumer Key or Consumer Secret was copied incorrectly
- Connected App was deleted or recreated
- Connected App credentials were regenerated

**Solutions:**

1. Navigate to your Connected App in Salesforce Setup under **Apps** &gt; **App Manager**.
2. Click **View** next to your Connected App, then **Manage Consumer Details**.
3. Copy the Consumer Key and Consumer Secret carefully, ensuring no extra whitespace.
4. Update the credentials in your Grafana data source configuration.

### JWT authentication failures

JWT authentication errors occur when there are issues with the certificate, private key, or Connected App JWT settings.

**Error messages:**

- `invalid_grant` - The JWT assertion is invalid
- `invalid_client` - Client authentication failed
- `user hasn't approved this consumer` - User pre-authorization is missing

**Possible causes:**

- Certificate not uploaded to the Connected App
- Private key doesn’t match the uploaded certificate
- User hasn’t pre-authorized the Connected App
- Certificate has expired
- Incorrect Callback URL for JWT flow

**Solutions:**

1. Verify the certificate is uploaded to your Connected App under **Enable Use digital signatures**.
2. Ensure the private key in Grafana matches the certificate uploaded to Salesforce.
3. Pre-authorize the Connected App for your user:

   - Navigate to **Setup** &gt; **Manage Connected Apps** &gt; **Edit Policies** for your app.
   - Set **Permitted Users** to “Admin approved users are pre-authorized”.
   - Add the appropriate profiles or permission sets.
4. Verify the Callback URL is set to `sfdc://oauth/jwt/success`.
5. Check that your certificate hasn’t expired and regenerate if necessary.

### Refresh token has been revoked

This error indicates that the OAuth refresh token has been invalidated.

**Possible causes:**

- User revoked access to the Connected App
- Administrator revoked all OAuth tokens
- Connected App settings were changed

**Solutions:**

1. Re-enter your credentials in the Grafana data source configuration.
2. Click **Save &amp; test** to generate a new authentication session.
3. Check if the Connected App’s refresh token policy has changed.

## Query errors

Query errors occur when there are issues with your SOQL queries.

### MALFORMED\_QUERY

Your SOQL query contains syntax errors.

**Example error:**

[Copy code to clipboard] Copy

```none
MALFORMED_QUERY: unexpected token: 'FROM'
```

**Possible causes:**

- Missing or extra commas in the SELECT clause
- Typo in field or object names
- Invalid operators in the WHERE clause

**Solutions:**

1. Validate your SOQL query syntax. Refer to [SOQL SELECT Syntax](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql_select.htm).
2. Use the Query Builder mode to construct valid queries before switching to SOQL Editor mode.
3. Check for common issues:

   - Fields should be comma-separated: `SELECT Name, Amount, CloseDate`
   - String values should use single quotes: `WHERE Status = 'Open'`
   - Dates should use the format: `WHERE CreatedDate > 2024-01-01T00:00:00Z`

### INVALID\_FIELD

The specified field doesn’t exist on the queried object.

**Example error:**

[Copy code to clipboard] Copy

```none
INVALID_FIELD: No such column 'InvalidFieldName' on entity 'Opportunity'
```

**Solutions:**

1. Verify the field name exists on the Salesforce object. Use the SOQL Editor’s autocomplete feature (`Ctrl+Space`) to see available fields.
2. Check if the field is a custom field and uses the correct suffix (for example, `Custom_Field__c`).
3. Ensure the user has field-level security access to the field.

### INVALID\_TYPE

The specified object doesn’t exist or is not accessible.

**Example error:**

[Copy code to clipboard] Copy

```none
INVALID_TYPE: sObject type 'CustomObject__c' is not supported
```

**Solutions:**

1. Verify the object name is correct and includes `__c` for custom objects.
2. Check if the user has access to the object in their profile or permission sets.
3. Ensure the object is not in a managed package that hasn’t been installed.
4. Confirm the object or field is available in the Salesforce API version the plugin targets. Objects and fields introduced in newer API versions aren’t accessible. Refer to [Salesforce API version](#salesforce-api-version).

### Object or field isn’t available in the plugin API version

You can query some Salesforce objects, but a specific object or field returns an error or doesn’t appear, even though it exists in your Salesforce org.

**Possible causes:**

- The object or field was introduced in a Salesforce API version newer than the one the plugin targets, so it isn’t available through the plugin.

**Solutions:**

1. Confirm the object or field is available in the Salesforce API version the plugin targets. If it was introduced in a more recent version, the plugin can’t query it yet.
2. If your workflow depends on an object or field that isn’t available, contact [Grafana Support](/contact/) to request an API version update and register your use case. Refer to [Salesforce API version](#salesforce-api-version).

### No rows returned / No data

Your query executes successfully but returns no results.

**Possible causes:**

- The time range filter excludes all data
- Filters are too restrictive
- Data doesn’t exist for the queried criteria

**Solutions:**

1. Expand the Grafana time range to verify data exists.
2. Remove or broaden your WHERE clause filters.
3. Test the query directly in Salesforce using Developer Console or Workbench.
4. Verify you’re using the correct macros for time filtering (`$__timeFrom`, `$__timeTo`).

### Large result sets are slow or time out

The data source retrieves all matching records by automatically paging through the Salesforce API, so it doesn’t truncate results. A query that matches many records can be slow to return or can exceed the request time limit.

**Solutions:**

1. Add a `LIMIT` clause to your query to cap the number of records returned (for example, `LIMIT 2000`).
2. Use more specific filters in the WHERE clause to reduce the result set.
3. Use aggregate queries with `GROUP BY` instead of returning individual records.
4. The default limit in Query Builder mode is 100 rows. Adjust this value as needed.

## Filter and Query Builder errors

Errors specific to the Query Builder mode.

### Complex filter logic not supported

The Query Builder doesn’t support complex filter combinations.

**Cause:** Queries with both AND and OR statements, or nested filters, will fail in Query Builder mode.

**Solution:**

Switch to SOQL Editor mode to write complex queries manually:

soql [Copy code to clipboard] Copy

```soql
SELECT Name, Amount FROM Opportunity
WHERE (Status = 'Open' AND Amount > 1000) OR (Status = 'Closed' AND CloseDate > LAST_MONTH)
```

## Reports mode errors

Errors specific to the Reports query mode.

### Report not found

The specified report doesn’t exist or isn’t accessible.

**Solutions:**

1. Verify the report exists in Salesforce and hasn’t been deleted.
2. Check that the user has permission to view the report.
3. Ensure the report folder is shared with the user.

### Report timeout

Large reports may take too long to execute.

**Solutions:**

1. Simplify the report by reducing filters or groupings.
2. Consider creating a summary report instead of a detailed report.
3. Use SOQL mode with specific filters instead of running large reports.

## Alert rule errors

Errors that occur when you use Salesforce data in alert rules.

### Alert rule returns no numeric data

Grafana can’t evaluate the alert because the query doesn’t return a numeric value.

**Cause:** Alert conditions require numeric data. A query that returns only text or date fields can’t be compared against a threshold.

**Solutions:**

1. Use a SOQL aggregate function, such as `COUNT()`, `SUM()`, `AVG()`, `MIN()`, or `MAX()`, so the query returns a number.
2. Add a **Reduce** expression to convert the query result to a single value before the **Threshold** expression.
3. Test the query in **Explore** to confirm it returns a numeric value.

### Alert evaluation errors

The alert rule fails to evaluate.

**Solutions:**

1. Confirm the SOQL syntax is valid and the query runs successfully in **Explore**.
2. If the query returns a large result set, reduce the data it returns. The data source doesn’t expose a query timeout setting. Refer to [Large result sets are slow or time out](#large-result-sets-are-slow-or-time-out).

For more information, refer to [Salesforce alerting](/docs/plugins/grafana-salesforce-datasource/latest/alerting/).

## Template variable errors

Errors that occur when you use template variables with the Salesforce data source.

### Variable drop-down is empty

The variable query runs but returns no options.

**Possible causes:**

- The SOQL query returns no rows.
- The variable uses Reports mode, which doesn’t support variables.

**Solutions:**

1. Run the query in **Explore** to confirm it returns rows.
2. Use SOQL Editor or Query Builder mode for the variable query. Reports mode isn’t supported for variables.

### Variable filters by the wrong value

The dashboard filters by the displayed text instead of the intended value, or the other way around.

**Cause:** For a query that returns two fields, the first field is the value used in queries and the second field is the display text.

**Solution:**

Order the fields so the value comes first and the display text comes second, for example `SELECT Id, Name FROM User`, where `Id` is the value and `Name` is displayed.

### Multi-value variable breaks the query

A query that uses a multi-value variable fails with a SOQL syntax error.

**Solution:**

Use the `IN` operator and the `singlequote` format so each value is quoted, for example `WHERE AccountId IN (${account:singlequote})`. Refer to [Salesforce template variables](/docs/plugins/grafana-salesforce-datasource/latest/template-variables/).

## Known limitations

The following are known limitations when using the Salesforce data source.

### Salesforce API version

The plugin targets a fixed Salesforce API version for queries, reports, and metadata requests. Objects and fields that Salesforce introduced in more recent API versions aren’t available through the plugin, even if they exist in your Salesforce org.

If a required object or field isn’t available, contact [Grafana Support](/contact/) to request an API version update and describe your use case.

### Unsupported query formats

Only SOQL queries are supported. The following are not supported:

- SOSL (Salesforce Object Search Language)
- SAQL (Salesforce Analytics Query Language)
- Einstein Analytics queries

### Unsupported Salesforce products

- Salesforce Commerce Cloud (SFCC) is not supported.

### Custom Salesforce login domains

The data source connects only through the standard Salesforce endpoints: `login.salesforce.com` for production and `test.salesforce.com` for sandbox. It doesn’t support custom My Domain login URLs, such as `login.mycorp.salesforce.com`. If your Salesforce org requires login through a custom My Domain and blocks the standard endpoints, the connection fails.

This is a known limitation with no workaround. For the current status of custom domain support, contact [Grafana Support](/contact/).

### Ad-hoc filters

Ad-hoc filters are not supported by the Salesforce data source.

### Complex filter logic in Query Builder

When using the Query Builder, queries with mixed AND/OR logic or nested filters require switching to SOQL mode.

## Debugging tips

Use these techniques to gather more information when diagnosing issues.

### Enable query inspector

To view the executed query and response:

1. Open your dashboard panel.
2. Click the panel title and select **Inspect** &gt; **Query**.
3. Review the request and response for error details.

### Check Grafana server logs

For detailed error information:

1. Access your Grafana server logs.
2. Search for `salesforce` to find relevant log entries.
3. Look for error messages and stack traces that provide more context.

### Enable debug logging

For more detailed backend logs, raise the Grafana log level to `debug`:

1. In your Grafana configuration file, set the log level under the `[log]` section:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Restart Grafana to apply the change.
3. Reproduce the issue and search the server logs for `salesforce` to review the detailed entries.

> Note
>
> Debug logging is verbose. Enable it only while diagnosing an issue, then return the log level to its previous setting.

### Test queries in Salesforce

Validate your SOQL queries directly in Salesforce:

1. Log in to Salesforce.
2. Open **Developer Console** from the gear icon.
3. Click **Debug** &gt; **Open Execute Anonymous Window**.
4. Or use the **Query Editor** tab to run SOQL queries.
5. Confirm the query works before using it in Grafana.

### Verify API access

Test that API access is working with your credentials:

1. Ensure your Connected App has the correct OAuth scopes.
2. Verify the user profile has **API Enabled** permission.
3. Check that your organization hasn’t exceeded API request limits in Salesforce Setup under **System Overview**.

## Get additional help

If you continue to experience issues after following this troubleshooting guide:

1. Check the [Salesforce documentation](https://help.salesforce.com/) for platform-specific guidance.
2. Review the [Grafana community forums](https://community.grafana.com/) for similar issues.
3. Contact [Grafana Support](/contact/) if you’re a Grafana Enterprise, Cloud Pro, or Cloud Advanced user.
4. When reporting issues, include:

   - Grafana version
   - Salesforce edition (for example, Enterprise, Professional)
   - Authentication method (Credentials or JWT)
   - Error messages (redact sensitive information like tokens and passwords)
   - Steps to reproduce
   - Relevant configuration (redact credentials)
