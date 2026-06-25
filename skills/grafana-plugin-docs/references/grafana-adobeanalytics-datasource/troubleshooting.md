---
title: "Troubleshoot Adobe Analytics data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshooting guide for the Adobe Analytics data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Adobe Analytics data source issues

This document lists common issues you may encounter when configuring or using the Adobe Analytics data source in Grafana, along with suggested solutions. For configuration instructions, refer to [Configure the Adobe Analytics data source](/docs/plugins/grafana-adobeanalytics-datasource/latest/#configure-the-data-source).

## Authentication errors

These errors occur when Grafana can’t obtain an access token from Adobe IMS, or when the token doesn’t have the required permissions.

### “invalid/empty client id”

**Symptoms:**

- **Save &amp; test** fails with `invalid/empty client id`.
- The data source configuration test returns a health check error.

**Solutions:**

1. Open the data source configuration page and confirm that the **Client ID** field is filled in.
2. In the [Adobe Developer Console](https://developer.adobe.com/console/projects), open your project’s **OAuth Server-to-Server** credential and copy the Client ID again.
3. Paste the Client ID into the data source configuration and click **Save &amp; test**.

### “invalid/empty client secret”

**Symptoms:**

- **Save &amp; test** fails with `invalid/empty client secret`.
- The Client ID is set but the health check still fails before reaching Adobe.

**Solutions:**

1. Open the data source configuration page and click **Reset** next to **Client Secret** if a value is already saved but may be empty.
2. Copy the Client Secret from your OAuth Server-to-Server credential in the [Adobe Developer Console](https://developer.adobe.com/console/projects).
3. Paste it into the **Client Secret** field and click **Save &amp; test**.

### “invalid\_client” or “invalid client\_secret parameter”

**Symptoms:**

- **Save &amp; test** fails with a message containing `oauth2: "invalid_client" "invalid client_secret parameter"`.
- The request reaches Adobe IMS (`https://ims-na1.adobelogin.com`) but the token exchange fails.

**Possible causes and solutions:**

Expand table

| Cause                                   | Solution                                                                                                          |
|-----------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| Mismatched Client ID and Client Secret  | Confirm both values are from the **same** OAuth Server-to-Server credential in the Adobe Developer Console.       |
| Rotated or deleted credential           | Create a new Client Secret in the Adobe Developer Console and update the data source.                             |
| Credential disabled or project archived | In the Adobe Developer Console, confirm the project and credential are active.                                    |
| Credential missing required scopes      | Confirm the OAuth Server-to-Server credential is attached to a project that includes the **Adobe Analytics API**. |

### Access denied on valid credentials

**Symptoms:**

- The health check succeeds but queries return permissions errors.
- The **Report Suites** list is empty for a user who has access in Adobe Analytics.

**Solutions:**

1. In the [Adobe Developer Console](https://developer.adobe.com/console/projects), confirm the project includes the **Adobe Analytics API**.
2. Confirm the technical account associated with the OAuth Server-to-Server credential is a member of an Adobe Analytics product profile that grants access to the report suites you need. Refer to [Product profiles](https://experienceleague.adobe.com/en/docs/analytics/admin/admin-console/permissions/product-profile) in the Adobe documentation.
3. Ask an Adobe Analytics admin to grant the required report suite permissions to the product profile.

## Connection errors

These errors occur when Grafana can’t reach Adobe IMS or the Adobe Analytics API.

### Connection refused or timeout errors

**Symptoms:**

- **Save &amp; test** times out.
- Queries fail intermittently with network errors.

**Solutions:**

1. Verify outbound HTTPS connectivity from the Grafana server to both Adobe endpoints:

   - `https://ims-na1.adobelogin.com` for token requests
   - `https://analytics.adobe.io` for API requests
2. Confirm firewall and proxy rules allow outbound HTTPS on port `443` to these hosts.
3. If you’re running on Grafana Cloud and Adobe Analytics is only reachable from a private network, configure [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/).

### 404 or “resource not found” from the Adobe Analytics API

**Symptoms:**

- Queries fail with a 404 response.
- The API URL path contains an unexpected Global Company ID segment.

**Solutions:**

1. Confirm the **Global Company ID** on the data source configuration page matches the value shown in Adobe Analytics under **Admin** &gt; **All Admin** &gt; **Company Settings home** &gt; **API Access**.
2. Confirm the OAuth Server-to-Server credential belongs to a project in the same Adobe organization as that Company.

## Query errors

These errors occur when running Report or list queries.

### “No data” or empty results

**Symptoms:**

- A query runs without error but returns no data.
- A time series panel shows “No data”.

**Possible causes and solutions:**

Expand table

| Cause                                         | Solution                                                                                        |
|-----------------------------------------------|-------------------------------------------------------------------------------------------------|
| Time range contains no data                   | Expand the dashboard time range, or verify the report suite has data for the selected interval. |
| Wrong report suite selected                   | Confirm the **Report suite** field matches the report suite where the data lives.               |
| Metric or dimension isn’t valid for the suite | Re-fetch the list with the **Metrics List** or **Dimensions List** query and pick a valid item. |
| Segment excludes all rows                     | Remove or change the **Global Segment ID** or **Segments** field.                               |
| Search clause filters out all values          | Remove the **Search clause**, then reapply a less restrictive filter.                           |

### Results are cut off at the Limit

**Symptoms:**

- The number of rows returned equals the **Limit** value.
- High-cardinality dimensions truncate before showing all values.

**Solutions:**

1. Increase the **Limit** field on the Report query. The default is `1000`.
2. Narrow the query with a **Search clause** to keep the result set manageable.
3. Narrow the dashboard time range.

### Segment behaves differently than expected

**Symptoms:**

- Setting the **Global Segment ID** and the **Segments** field produces different totals than expected.
- Only one metric appears to be affected by the segment.

**Solutions:**

1. Decide which segment field fits your use case. **Global Segment ID** filters the entire report, while **Segments** applies per metric as a metric-level filter.
2. Clear one of the two fields and rerun the query.
3. For mixed use cases, set **Global Segment ID** to define the overall report population and use **Segments** to constrain individual metric values.

### Search clause syntax errors

**Symptoms:**

- A query with a non-empty **Search clause** fails.
- The API returns a column-level error referencing the search clause.

**Solutions:**

1. Confirm the clause uses the syntax from [Search filters](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/search-filters/#using-clause-parameters) in the Adobe Analytics API documentation.
2. Wrap string values in single quotes, for example `( NOT CONTAINS 'Product-1' )`.
3. Test the clause in the Adobe Analytics Workspace UI, then copy it into the query.

## Template variable errors

These issues occur when using Adobe Analytics queries as template variable sources.

### Variables return no values

**Solutions:**

1. Confirm the data source **Save &amp; test** still succeeds.
2. For list queries that require an `rsid`, confirm the dependent variable, usually the **Report Suites** variable, has a valid selection.
3. Confirm the OAuth Server-to-Server credential’s technical account has access to the report suite.
4. Re-open the variable definition and click **Run query** to inspect what the query returns.

### Variables are slow to load

**Solutions:**

1. Set the variable’s **Refresh** option to **On dashboard load** instead of **On time range change** so it doesn’t requery every time the range updates.
2. Reduce the list query’s result size, for example by setting **Report suite ID contains** on the **Report Suites** query.
3. Enable query caching in Grafana. Query caching is available in Grafana Enterprise and Grafana Cloud.

## Performance and rate-limit issues

These issues occur when Adobe’s API throttles requests or when dashboards make more calls than the API can serve.

### Rate-limit or throttling errors

**Symptoms:**

- Dashboard panels intermittently fail to load with error messages that reference rate limits or quotas.
- Errors appear only under heavy refresh activity.

**Solutions:**

1. Reduce the dashboard’s auto-refresh frequency.
2. Combine queries where possible so one Report query returns multiple metrics together.
3. Increase the dashboard time range step, or use a coarser date-range dimension such as **Hour** instead of **Minute**.
4. Enable query caching in Grafana, available in Grafana Enterprise and Grafana Cloud.
5. Review your Adobe Analytics contract limits and request a higher quota if you exceed them regularly.

## Enable debug logging

To capture detailed error information for troubleshooting:

1. Set the Grafana log level to `debug` in the configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Restart Grafana.
3. Reproduce the issue and review the Grafana server log, typically at `/var/log/grafana/grafana.log`. Look for entries from the `grafana-adobeanalytics-datasource` plugin, including the `Report request` debug log emitted when a Report query runs.
4. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## Get additional help

If the solutions in this document don’t resolve your issue:

1. Check the [Grafana community forum](https://community.grafana.com/) for similar issues.
2. Consult the [Adobe Analytics 2.0 API documentation](https://developer.adobe.com/analytics-apis/docs/2.0/) for service-specific guidance.
3. Open a support ticket through your [Grafana Enterprise support channel](/profile/org#support) or Grafana Cloud support portal. Because this plugin is an Enterprise plugin, the support channel is the preferred way to report bugs and request features.
4. When reporting issues, include:

   - Grafana version and Adobe Analytics data source plugin version.
   - The exact error message, with any credentials or IDs redacted.
   - Steps to reproduce the issue.
   - Relevant data source and query configuration, with secrets redacted.
