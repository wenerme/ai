---
title: "Troubleshoot ServiceNow data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshoot common issues with the ServiceNow data source plugin for Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot ServiceNow data source issues

This document provides solutions to common issues you may encounter when configuring or using the ServiceNow data source. For configuration instructions, refer to [Configure the ServiceNow data source](/docs/plugins/grafana-servicenow-datasource/latest/configure/).

## Authentication errors

These errors occur when credentials are missing, invalid, or incorrectly configured. They appear during **Save &amp; test** before any API calls are made.

### “invalid server name”

**Symptoms:**

- **Save &amp; test** fails immediately.
- The error appears when saving the data source configuration.

**Solutions:**

1. Verify the **URL** field contains a valid ServiceNow instance URL (for example, `https://<INSTANCE_ID>.service-now.com`).
2. Ensure the URL includes the protocol (`https://`).
3. Check for trailing slashes or extra characters in the URL.

### “invalid username” or “invalid password”

**Symptoms:**

- **Save &amp; test** fails with a credential error.
- The error appears when saving the data source configuration.

**Solutions:**

1. Verify the **Username** and **Password** fields aren’t empty.
2. Re-enter the password, as it’s stored as a secure field and can’t be viewed after saving.

> Note
>
> When using custom HTTP headers for authentication, the username and password fields aren’t required. If you see this error with custom headers configured, verify the **Authentication Type** is set correctly.

### “invalid oauth configuration: client ID can’t be blank”

**Symptoms:**

- **Save &amp; test** fails when using OAuth authentication.

**Solutions:**

1. Ensure the **Client ID** field is populated.
2. Verify that **Authentication Type** is set to **ServiceNow OAuth** if you intend to use OAuth.
3. If you don’t need OAuth, switch the **Authentication Type** to **Basic auth**.

### “authentication not set” or “invalid authentication method”

**Symptoms:**

- **Save &amp; test** fails with an authentication method error.

**Solutions:**

1. Select an **Authentication Type** from the drop-down in the data source configuration. The default options are **Basic auth** and **ServiceNow OAuth**.
2. If the error mentions an invalid method, the saved configuration may be corrupted. Delete the data source and re-create it.

### “the user either does not have Table API / REST API access or does not have access to the table”

**Symptoms:**

- **Save &amp; test** fails with a 401 or 403 response.
- Queries return access denied messages.
- Table or field drop-downs don’t load.

**Possible causes and solutions:**

Expand table

| Cause                              | Solution                                                                                                                                                                              |
|------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| User lacks Table API access        | Verify the ServiceNow user has the `rest_api_explorer` or equivalent role that grants REST API access.                                                                                |
| User lacks table-level permissions | Grant read access to the specific table. Refer to [Configure ServiceNow permissions](/docs/plugins/grafana-servicenow-datasource/latest/configure/#configure-servicenow-permissions). |
| Incorrect credentials              | Verify the username and password are correct by logging into the ServiceNow instance directly.                                                                                        |
| OAuth token expired                | Re-enter the Client Secret and click **Save &amp; test** to obtain a new token.                                                                                                       |

## Connection errors

These errors occur when Grafana can’t reach the ServiceNow instance.

### “couldn’t connect to your instance. Seems the instance is hibernating”

**Symptoms:**

- **Save &amp; test** fails with a hibernation message.
- All queries fail with the same error.

**Solutions:**

1. Open the ServiceNow instance URL in a browser to wake it from hibernation.
2. Wait a few minutes for the instance to fully start.
3. Click **Save &amp; test** again.

> Note
>
> ServiceNow developer instances hibernate after periods of inactivity. This error doesn’t occur with production instances.

### “timeout exceeded when querying ServiceNow”

**Symptoms:**

- Queries fail after running for the configured timeout period.
- The error message includes the actual duration and configured timeout limit, along with troubleshooting suggestions.

**Solutions:**

1. Add filters to your query to reduce the amount of data returned.
2. Increase the **Query Timeout** value in the data source configuration (default is 30 seconds).
3. Reduce the **Limit** value in your query.
4. Narrow the dashboard time range.
5. If **Use Sys Tables?** is disabled, consider enabling it. The alternative schema/meta API can be slower for large instances.

### “unable to send request to table API”

**Symptoms:**

- **Save &amp; test** fails with a network error.
- All queries fail with connection errors.

**Solutions:**

1. Verify network connectivity from the Grafana server to your ServiceNow instance.
2. Check that firewall rules allow outbound HTTPS (port 443) traffic to the ServiceNow URL.
3. If using an HTTP proxy, verify the `HTTP_PROXY` or `HTTPS_PROXY` environment variable is set correctly.
4. For Grafana Cloud users, configure [Private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) if your ServiceNow instance isn’t publicly accessible. PDC is a Grafana Cloud feature that enables secure connectivity to private networks.

## Health check errors

When you click **Save &amp; test**, the plugin runs a series of health checks to verify that the configured user can access the required APIs and tables. The checks performed depend on the **Use Sys Tables?** setting.

### Health checks with Use Sys Tables enabled

When **Use Sys Tables?** is enabled, the health check validates access to the following system tables and APIs in order:

1. `sys_db_object` — table metadata (table listing)
2. `sys_dictionary` — field metadata (field types and definitions)
3. `sys_choice` — choice field values
4. `sys_glide_object` — type metadata
5. `incident` — Table API access (verifies the user can query a standard table)
6. Aggregate API — Stats API access (verifies aggregation queries work)

If multiple checks fail, the errors are combined into a single message separated by `|`.

#### “no data returned for sys\_db\_object table”

**Solutions:**

1. Verify the user has read access to the `sys_db_object` table.
2. Create a table-level read ACL for `sys_db_object` with the user’s role. Refer to [Set up a ServiceNow user with ACL rules](/docs/plugins/grafana-servicenow-datasource/latest/configure/#set-up-a-servicenow-user-with-acl-rules).

#### “unable to retrieve name field in sys\_db\_object table” or “unable to retrieve label field” or “unable to retrieve super class field”

**Solutions:**

1. Create field-level read ACLs for the missing fields on the `sys_db_object` table:

   - `sys_db_object.name` (Name)
   - `sys_db_object.label` (Label)
   - `sys_db_object.super_class` (Extends Table)
2. Refer to [Set up a ServiceNow user with ACL rules](/docs/plugins/grafana-servicenow-datasource/latest/configure/#set-up-a-servicenow-user-with-acl-rules) for detailed steps.

#### “no data returned for sys\_dictionary table” or “unable to retrieve type field in sys\_dictionary table”

**Solutions:**

1. Verify the user has read access to the `sys_dictionary` table and its fields.
2. Create a table-level read ACL for `sys_dictionary` with the user’s role.
3. For the type field error, create a field-level read ACL for `sys_dictionary.internal_type`.

#### “no data returned for sys\_choice table” or “unable to retrieve value/label field in sys\_choice table”

**Solutions:**

1. Verify the user has read access to the `sys_choice` table and its fields.
2. Create a table-level read ACL for `sys_choice` with the user’s role.

#### “no data returned for sys\_glide\_object table”

**Solutions:**

1. Verify the user has read access to the `sys_glide_object` table.
2. Create a table-level read ACL for `sys_glide_object` with the user’s role.

#### “no data returned for incident table”

**Solutions:**

1. Verify the user has read access to the `incident` table.
2. The `incident` table is used during health checks to validate both the Table API and Aggregate API.

#### “the user either does not have access or the user does not have access to the aggregate API”

**Symptoms:**

- **Save &amp; test** passes the Table API checks but fails on the Stats/Aggregate API check.

**Solutions:**

1. Verify the ServiceNow Stats / Aggregate API plugin is installed and active on your instance.
2. Grant the user access to the Aggregate API. Some ServiceNow instances require an additional role or plugin activation for aggregate queries.

#### “ensure the user is able to access the incidents table and the Stats / Aggregate API plugin is installed”

**Solutions:**

1. Install and activate the **Aggregate API** plugin on your ServiceNow instance if it isn’t already enabled.
2. Verify the user has access to both the `incident` table and the Stats API.

### Health checks with Use Sys Tables disabled

When **Use Sys Tables?** is disabled, the health check uses the ServiceNow schema and meta APIs instead:

1. Schema API (`/api/now/doc/table/schema`) — validates table listing
2. Meta API (`/api/now/ui/meta`) — validates field metadata

#### “unable to fetch schema”

**Solutions:**

1. Verify the user has access to the ServiceNow schema API endpoint (`/api/now/doc/table/schema`).
2. Some ServiceNow instances restrict access to the schema API. Try enabling **Use Sys Tables?** instead and granting the user the required ACLs.

#### “unable to fetch metadata”

**Solutions:**

1. Verify the user has access to the ServiceNow meta API endpoint (`/api/now/ui/meta`).
2. Try enabling **Use Sys Tables?** and configuring the required ACLs as an alternative approach.

## Query errors

These errors occur when executing queries against the data source.

### “table/view not found” or “found N tables matching, expected exactly 1”

**Symptoms:**

- Queries fail with table-related errors.
- The table name doesn’t match any table in the ServiceNow instance.

**Solutions:**

1. Verify the table name is correct and the table exists in your ServiceNow instance.
2. If using a custom table name, check for typos.
3. If the error mentions multiple matching tables, use the full table name to avoid ambiguity.

### “table can not be empty” or “queries must contain at least 1 field”

**Symptoms:**

- Queries fail immediately without reaching the ServiceNow API.

**Solutions:**

1. Select a table in the **Table** drop-down.
2. Add at least one field in the **Show Fields** selector (for Table queries) or **Show Field** selector (for Stats queries).

### “aggregation queries must contain at least 1 aggregation”

**Symptoms:**

- Stats queries fail without reaching the ServiceNow API.

**Solutions:**

1. Select at least one aggregation (for example, **count**, **sum**, **avg**) in the **Aggregation** selector next to each field in the Stats query.
2. Each field in a Stats query must have at least one aggregation selected.

### “specified field is not in the results”

**Symptoms:**

- Queries execute but return a warning notice about a missing field.
- The field appears in **Show Fields** but isn’t present in the query results.

**Solutions:**

1. Verify the selected fields exist on the table you’re querying.
2. Check that the user has read access to the specified fields.
3. If the table schema has changed, refresh the query editor by reselecting the table.

### “warning: Filter N missing conjunction”

**Symptoms:**

- Queries execute but return a warning about a missing filter conjunction.
- Results may not match expectations.

**Solutions:**

1. Ensure each filter after the first has a conjunction selected (**AND**, **OR**, or **NQ**).
2. The plugin automatically applies **AND** when a conjunction is missing, but this may not produce the expected results.
3. Edit the query and explicitly set the conjunction for each filter.

### “non-200 response from ServiceNow API”

**Symptoms:**

- Queries fail with a generic API error.
- The error includes the HTTP status code and the response body from ServiceNow.

**Solutions:**

1. Check the error message for the specific HTTP status code and response details.
2. A `401` or `403` status indicates an authentication or permissions issue. Verify credentials and table access.
3. A `404` status indicates the table or API endpoint wasn’t found. Verify the table name and that the required ServiceNow API plugins are active.
4. A `500` status indicates a server-side error on the ServiceNow instance. Check ServiceNow system logs.
5. Check the Grafana server logs for additional context.

## Enable debug logging

To capture detailed error information for troubleshooting, adjust the Grafana log level. For more information about Grafana logging configuration, refer to [Configure Grafana logging](/docs/grafana/latest/setup-grafana/configure-grafana/#log).

1. Set the Grafana log level to `debug` in the configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Review logs in `/var/log/grafana/grafana.log` (or your configured log location).
3. Filter for entries containing `servicenow` to find plugin-specific request and response details.
4. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## Get additional help

If you’ve tried the solutions in this document and still encounter issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Consult the [ServiceNow REST API documentation](https://developer.servicenow.com/dev.do#!/reference/api/washingtondc/rest/c_TableAPI) for service-specific guidance.
3. Contact [Grafana Support](/profile/org#support) if you’re a Cloud Pro, Cloud Advanced, or Enterprise customer.
4. When reporting issues, include:

   - Grafana version and plugin version
   - Error messages (redact sensitive information)
   - Steps to reproduce
   - Relevant data source configuration (redact credentials)
   - Whether **Use Sys Tables?** is enabled or disabled
