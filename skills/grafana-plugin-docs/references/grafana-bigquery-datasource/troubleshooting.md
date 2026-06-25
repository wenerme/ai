---
title: "Troubleshoot Google BigQuery data source issues | Grafana Plugins documentation"
description: "Troubleshoot common issues with the Google BigQuery data source in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Google BigQuery data source issues

This document provides solutions to common issues you may encounter when configuring or using the Google BigQuery data source. For configuration instructions, refer to [Configure the BigQuery data source](/docs/plugins/grafana-bigquery-datasource/latest/configure/).

## Authentication errors

These errors occur when credentials are invalid, missing, or don’t have the required permissions.

### “Access denied” or “Permission denied”

**Symptoms:**

- Save &amp; test fails with access denied errors
- Queries return permission denied messages
- Projects, datasets, or tables don’t load in drop-downs

**Possible causes and solutions:**

Expand table

| Cause                                  | Solution                                                                                                          |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| Missing BigQuery roles                 | Assign the **BigQuery Data Viewer** and **BigQuery Job User** roles to the service account.                       |
| Service account key expired or revoked | Create a new key in the Google Cloud Console and update the data source configuration.                            |
| Wrong project selected                 | Verify the default project matches where your data is located.                                                    |
| API not enabled                        | Enable the [BigQuery API](https://console.cloud.google.com/apis/library/bigquery.googleapis.com) in your project. |

### “Invalid JWT signature” or “Invalid token”

**Symptoms:**

- Data source test fails immediately
- Error mentions JWT or token validation

**Solutions:**

1. Verify the service account key file is valid JSON.
2. Check that the private key in the configuration matches the key file.
3. Ensure the `tokenUri` is set to `https://oauth2.googleapis.com/token`.
4. Create a new service account key if the current one is corrupted.

### “Service account impersonation failed”

**Symptoms:**

- Queries fail when using service account impersonation
- Error mentions impersonation or token creation

**Solutions:**

1. Verify the source service account has the **Service Account Token Creator** role (`roles/iam.serviceAccountTokenCreator`).
2. Ensure the target service account (being impersonated) has the required BigQuery roles.
3. Check that the target service account email is correctly configured.

### Forward OAuth Identity not working

**Symptoms:**

- Queries fail when using Forward OAuth Identity
- User sees authentication errors after logging in

**Solutions:**

1. Verify the OAuth scopes are configured in Grafana’s OAuth settings: `https://www.googleapis.com/auth/bigquery` and `https://www.googleapis.com/auth/drive` (if querying data linked to Google Drive).
2. Ensure users have authenticated with Google OAuth before accessing BigQuery dashboards.
3. Check that the **Default project** is configured in the data source settings.

> Note
>
> Forward OAuth Identity doesn’t support alerting or other background features that require credentials when users aren’t logged in.

## Connection errors

These errors occur when Grafana cannot reach Google BigQuery endpoints.

### “Connection refused” or timeout errors

**Symptoms:**

- Data source test times out
- Queries fail with network errors
- Intermittent connection failures

**Solutions:**

1. Verify network connectivity from the Grafana server to Google Cloud endpoints.
2. Check firewall rules allow outbound HTTPS (port 443) to `*.googleapis.com`.
3. If using a proxy, ensure it’s configured correctly in Grafana’s settings.
4. For Grafana Cloud accessing private resources, configure [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/).

### “Could not resolve host”

**Symptoms:**

- DNS resolution errors in logs
- Unable to reach Google API endpoints

**Solutions:**

1. Verify DNS settings on the Grafana server.
2. Test DNS resolution: `nslookup bigquery.googleapis.com`.
3. Check for network policy restrictions blocking external DNS.

## Query errors

These errors occur when executing queries against BigQuery.

### “No data” or empty results

**Symptoms:**

- Query executes without error but returns no data
- Charts show “No data” message
- Tables are empty

**Possible causes and solutions:**

Expand table

| Cause                             | Solution                                                                                   |
|-----------------------------------|--------------------------------------------------------------------------------------------|
| Time range doesn’t contain data   | Expand the dashboard time range or verify data exists in BigQuery for the selected period. |
| Wrong project, dataset, or table  | Verify you’ve selected the correct resources in the query.                                 |
| Filter conditions too restrictive | Review `WHERE` clauses and ensure they match existing data.                                |
| Macro not expanding correctly     | Check the generated SQL in Query Inspector to verify macro expansion.                      |

### “Syntax error” or “Query parse error”

**Symptoms:**

- Query fails with syntax error
- Error points to a specific position in the query

**Solutions:**

1. Use the query validator in the SQL editor to identify syntax issues.
2. Verify table and column names are correctly quoted with backticks.
3. Check that macros are used correctly (for example, `$__timeFilter(column)` not `$__timeFilter`).
4. Ensure BigQuery Standard SQL syntax is used, not Legacy SQL.

### Query timeout

**Symptoms:**

- Query runs for a long time then fails
- Error mentions timeout or exceeded limits

**Solutions:**

1. Narrow the time range to reduce data volume.
2. Add filters to reduce the result set.
3. Use partitioned tables and filter on the partition column.
4. Add `LIMIT` clause for exploratory queries.
5. Consider pre-aggregating data for frequently-used queries.

### “Query exceeded resource limits”

**Symptoms:**

- Error mentions resource limits or quota exceeded
- Query fails after processing some data

**Solutions:**

1. Simplify the query by reducing JOINs or subqueries.
2. Break complex queries into smaller parts.
3. Use approximate aggregation functions where precision isn’t critical.
4. Request a quota increase in Google Cloud Console if needed.

### Incorrect data types

**Symptoms:**

- Numbers appear as strings
- Timestamps aren’t recognized
- Visualization doesn’t work as expected

**Solutions:**

1. Use explicit type casting in your query: `CAST(column AS INT64)`.
2. Alias timestamp columns as `time`: `SELECT timestamp_col AS time`.
3. Verify the column types in BigQuery match what Grafana expects.

## Template variable errors

These errors occur when using template variables with the data source.

### Variables return no values

**Symptoms:**

- Variable drop-down is empty
- “No options found” message appears

**Solutions:**

1. Test the data source connection using **Save &amp; test**.
2. Run the variable query manually in the query editor to verify it returns results.
3. Check that the service account has permission to query the tables referenced in the variable query.
4. For chained variables, ensure parent variables have valid selections.

### Variables are slow to load

**Symptoms:**

- Dashboard takes a long time to load
- Variable drop-downs are unresponsive

**Solutions:**

1. Set variable refresh to **On dashboard load** instead of **On time range change**.
2. Add `LIMIT` to variable queries to reduce result count.
3. Simplify variable queries to scan less data.
4. Use caching if available in your Grafana edition.

### Variable value not interpolated

**Symptoms:**

- Query shows `$variable` literally instead of the value
- Error about unknown identifier

**Solutions:**

1. Verify the variable name matches exactly (case-sensitive).
2. Use `${variable}` syntax when the variable is adjacent to other text.
3. Check the Query Inspector to see how variables are interpolated.

## Performance issues

These issues relate to slow queries or high costs.

### Queries are slow

**Symptoms:**

- Dashboards take a long time to load
- Queries timeout frequently

**Solutions:**

1. Use partitioned tables and filter on partition columns with `$__timeFilter`.
2. Select only the columns you need instead of `SELECT *`.
3. Use appropriate aggregation intervals to reduce data points.
4. Consider using BigQuery BI Engine for frequently accessed data.

### High query costs

**Symptoms:**

- Unexpected BigQuery charges
- Quota warnings from Google Cloud

**Solutions:**

1. Review query costs in BigQuery Console under **Query history**.
2. Use `$__timeFilter` to limit data scanned to the dashboard time range.
3. Avoid `SELECT *` and select only required columns.
4. Set appropriate dashboard refresh intervals (don’t refresh more often than needed).
5. Consider enabling query caching in Grafana Enterprise or Grafana Cloud.

### Storage API errors

**Symptoms:**

- Errors when using the Storage API option
- “Storage API not enabled” message

**Solutions:**

1. Enable the [BigQuery Storage API](https://console.cloud.google.com/apis/library/bigquerystorage.googleapis.com) in your project.
2. Ensure the service account has the **BigQuery Read Session User** role.
3. Disable Storage API if not needed for your use case.

> Note
>
> The Storage API doesn’t work with Forward OAuth Identity authentication.

## Configuration errors

These errors occur during data source setup or provisioning.

### “Failed to save datasource”

**Symptoms:**

- Unable to save data source configuration
- Error when clicking **Save &amp; test**

**Solutions:**

1. Verify all required fields are filled in.
2. Check that the JSON key file is valid and complete.
3. Ensure Grafana has write permissions to its data directory.

### Provisioning errors

**Symptoms:**

- Provisioned data source doesn’t appear
- Errors in Grafana logs about provisioning

**Solutions:**

1. Verify YAML syntax is correct (use a YAML validator).
2. Check that `type` is set to `grafana-bigquery-datasource`.
3. Ensure `authenticationType` matches the credentials provided.
4. For `privateKey` in `secureJsonData`, ensure newlines are preserved (use `|` for multiline strings in YAML).

**Example with multiline private key:**

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: BigQuery
    type: grafana-bigquery-datasource
    jsonData:
      authenticationType: jwt
      clientEmail: <SERVICE_ACCOUNT_EMAIL>
      defaultProject: <PROJECT_ID>
      tokenUri: https://oauth2.googleapis.com/token
    secureJsonData:
      privateKey: |
        -----BEGIN PRIVATE KEY-----
        <KEY_CONTENT>
        -----END PRIVATE KEY-----
```

## Enable debug logging

To capture detailed error information for troubleshooting:

1. Set the Grafana log level to `debug` in the configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Restart Grafana.
3. Review logs in `/var/log/grafana/grafana.log` (or your configured log location).
4. Look for `bigquery` or `grafana-bigquery-datasource` entries.
5. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## Use Query Inspector

The Query Inspector helps debug query issues:

1. Open a panel in edit mode.
2. Click the **Query Inspector** button.
3. Review the **Query** tab to see the exact SQL sent to BigQuery.
4. Check the **Stats** tab for query timing information.
5. Look at the **JSON** tab for the raw response data.

## Get additional help

If you’ve tried the solutions above and still encounter issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Review the [BigQuery plugin GitHub issues](https://github.com/grafana/google-bigquery-datasource/issues) for known bugs.
3. Consult the [Google BigQuery documentation](https://cloud.google.com/bigquery/docs) for BigQuery-specific guidance.
4. Contact [Grafana Support](/support/) if you’re a Grafana Cloud or Enterprise customer.

When reporting issues, include:

- Grafana version
- BigQuery plugin version
- Error messages (redact sensitive information)
- Steps to reproduce
- Relevant configuration (redact credentials)
- Query Inspector output if applicable
