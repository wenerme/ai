---
title: "Troubleshoot New Relic data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshoot common issues with the New Relic data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot New Relic data source issues

This document provides solutions to common issues you may encounter when configuring or using the New Relic data source. For configuration instructions, refer to [Configure the New Relic data source](/docs/plugins/grafana-newrelic-datasource/latest/configure/).

## Before you begin

Before investigating specific errors, verify that the data source health check passes:

1. Go to **Connections** &gt; **Data sources** and select your New Relic data source.
2. Click **Save &amp; test**.
3. Confirm you see the message **Plugin health check OK**.

If the health check fails, first confirm that your Enterprise plugin license is valid. Refer to [Licensing issues](#licensing-issues). Otherwise, start with the [Configuration errors](#configuration-errors) or [Connection errors](#connection-errors) sections.

## Licensing issues

The New Relic data source is an Enterprise plugin. It requires a Grafana Enterprise license, or a Grafana Cloud account with Enterprise plugins enabled. A missing, expired, or incorrectly provisioned license is the most common cause of a failed health check, and it prevents the plugin from starting before it sends any request to New Relic. These problems usually require a change to your license or plan rather than a change to your New Relic credentials.

### “Plugin health check failed”

This error appears when the plugin backend fails to start. For an Enterprise plugin, the most common cause is a missing or invalid license rather than a problem with your New Relic API key or Account ID.

**Symptoms:**

- **Save &amp; test**, or the plugin catalog, reports `Plugin health check failed` with no further detail.
- The data source fails immediately, before it sends any request to New Relic.
- The Grafana server log contains an error similar to `invalid license for the enterprise plugin`.

**Possible causes and solutions:**

Expand table

| Cause                                                      | Solution                                                                                                                                                                                                                                               |
|------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Grafana Cloud Free plan                                    | The New Relic plugin isn’t available on the Free tier. Upgrade to a Pro plan with the Enterprise plugins add-on, or to an Advanced plan.                                                                                                               |
| Pro plan without the Enterprise plugins add-on             | Upgrading from Free to Pro doesn’t automatically include Enterprise plugins. Purchase the Enterprise plugins add-on, then enable the plugin from the account management page. Contact your Grafana account team for details.                           |
| Self-managed Grafana without an Enterprise license         | Activate a valid [Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/). Review your current license in [Administration &gt; General &gt; Stats and license](/docs/grafana/latest/administration/stats-and-license/). |
| License not provisioned after a contract change or renewal | Contact [Grafana Support](/support/) to verify that your license entitlements include the New Relic plugin.                                                                                                                                            |

### Plugin stops working after a contract change or renewal

If the plugin was working but stops after a contract renewal or a change to your entitlements, the updated license may not have been provisioned correctly.

**Solutions:**

1. Verify your current entitlements in the Grafana Cloud portal under your organization settings.
2. For self-managed Grafana, re-download and apply the updated Enterprise license, then restart Grafana.
3. Contact [Grafana Support](/support/) to confirm that the license includes the New Relic data source plugin.

### Enterprise plugins aren’t available on a second stack or new instance

Enterprise plugin entitlements apply per Grafana Cloud stack. If you can install the plugin on one stack but not on another, the entitlement may not be applied to the new stack.

**Solutions:**

1. Confirm that Enterprise plugins are enabled for the specific stack where you’re installing the plugin.
2. Contact [Grafana Support](/support/) to have your entitlement applied to the additional stack.

For billing or plan questions, such as whether a plugin is tracked correctly on your account, contact your Grafana account team.

## Configuration errors

These errors occur when required fields are missing or contain invalid values.

### “The configuration setup is incomplete.”

This error appears when required configuration fields are missing.

Expand table

| Detail message                                                  | Solution                                                                                                                                                                                     |
|-----------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Enter a personal API key.**                                   | Generate a User API key in New Relic. Refer to [New Relic API keys](https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/#user-key) for instructions.                           |
| **Enter an account ID. This must be a valid, positive number.** | Enter your New Relic Account ID as a positive number. Refer to [Account ID](https://docs.newrelic.com/docs/accounts/accounts-billing/account-structure/account-id/) to find your account ID. |

## Connection errors

These errors occur when Grafana can’t connect to the New Relic API.

### “An error occurred with connecting to NewRelic.”

This error appears when the health check can connect to Grafana but fails to reach the New Relic API.

Expand table

| Detail message                                                                            | Possible cause     | Solution                                                                                                                                                                                  |
|-------------------------------------------------------------------------------------------|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Could not connect to NewRelic. This usually happens when the API key is incorrect.**    | Invalid API key    | Verify your User API key is correct. Regenerate it in New Relic if necessary. Refer to [New Relic API keys](https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/#user-key). |
| **Could not connect to NewRelic. This usually happens when the account ID is incorrect.** | Invalid Account ID | Verify your Account ID is correct. Ensure you’ve selected the correct **Region** (`US` or `EU`) to match your New Relic account location.                                                 |

### “There was a problem with connecting to NewRelic.”

This fallback error appears when the connection fails for a reason other than an invalid API key or Account ID.

**Solutions:**

1. Check network connectivity from the Grafana server to New Relic API endpoints.
2. Verify the **Region** setting (`US` or `EU`) matches your account.
3. Try increasing the **Timeout in Seconds** value.
4. Check the Grafana server logs for detailed error information.

### Connection timeout

**Symptoms:**

- Data source test takes a long time then fails.
- Queries fail with timeout errors.

**Solutions:**

1. Verify network connectivity from the Grafana server to New Relic API endpoints (`api.newrelic.com` for US, `api.eu.newrelic.com` for EU).
2. Check firewall rules allow outbound HTTPS (port 443).
3. Increase the **Timeout in Seconds** setting in the data source configuration (default: 300).
4. For Grafana Cloud, configure [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) if accessing resources through a private network.

## Query errors

These errors occur when executing queries against the New Relic API.

### “invalid / empty NRQL query”

**Cause:** The NRQL query field is empty when using the NRQL Editor or Data Explorer.

**Solution:** Enter a valid NRQL query. Refer to [NRQL syntax](https://docs.newrelic.com/docs/query-your-data/nrql-new-relic-query-language/get-started/nrql-syntax-clauses-functions/) for help writing queries.

### “error retrieving log data”

**Cause:** The log search query failed. This can happen when the NRQL filter syntax is invalid, or the log table doesn’t exist.

**Solutions:**

1. Check the NRQL filter syntax in the **Query** field.
2. Verify the log table name in the **Table** field. The default is `Log`.
3. Ensure your API key has permissions to query log data.

### “error retrieving trace search”

**Cause:** The distributed trace search query failed. This typically happens when the NRQL filter syntax in the **Query** field is invalid.

**Solutions:**

1. Verify the NRQL filter syntax in the **Query** field.
2. Check that the field names used in the filter exist in the `Span` event type.
3. Ensure your API key has permissions to query distributed tracing data.

### “invalid / empty trace id received”

**Cause:** The **Trace ID** field is empty when using the Trace ID query type.

**Solution:** Enter a valid trace ID in the **Trace ID** field.

### “invalid start time received, should be epoch milliseconds”

**Cause:** The **Start time** field contains a value that isn’t a valid epoch timestamp in milliseconds.

**Solution:** Enter the start time as an epoch timestamp in milliseconds (for example, `1711800000000`), or leave the field empty to search without a start time constraint.

### “error retrieving data” (trace by ID)

**Cause:** The NerdGraph API call to retrieve a specific trace failed.

**Solutions:**

1. Verify the trace ID is correct.
2. For traces older than one hour, provide a valid **Start time** as epoch milliseconds.
3. Check the Grafana server logs for the underlying NerdGraph error.

### “invalid timeSeries macro”

**Cause:** The `$__timeSeries` macro contains invalid duration arguments.

**Solution:** Verify the macro syntax. Valid formats include:

- `$__timeSeries`: no arguments, expands to `TIMESERIES`
- `$__timeSeries(1 minute)`: fixed interval
- `$__timeSeries(1h, 1 minute, 6h, 5 minutes)`: conditional intervals as comma-separated duration/aggregation pairs

Duration arguments must be valid time duration strings (for example, `1h`, `30m`, `1 minute`).

### “error while querying nerd graph”

**Cause:** The NerdGraph API call failed. This can occur with Logs, Traces, or NRQL queries.

**Solutions:**

1. Verify your API key is valid and has the required permissions.
2. Check the NRQL query syntax for errors.
3. Verify the **Region** setting matches your New Relic account.
4. Check the Grafana server logs for the detailed NerdGraph error message.

### “error while computing data frame from newrelic response”

**Cause:** The plugin couldn’t parse the New Relic API response into a Grafana data frame.

**Solutions:**

1. Verify the NRQL query returns data in a supported format.
2. Simplify the query to identify which part of the response is causing the issue.
3. Check the Grafana server logs with debug logging enabled for details.

### “No data” or empty results

**Symptoms:**

- Query executes without error but returns no data.
- Charts show “No data” message.

**Possible causes and solutions:**

Expand table

| Cause                           | Solution                                                                                                        |
|---------------------------------|-----------------------------------------------------------------------------------------------------------------|
| Time range doesn’t contain data | Expand the dashboard time range or verify data exists in the New Relic UI.                                      |
| Missing `$__timeFilter` macro   | Add `$__timeFilter` to your NRQL query. Without it, the query may return data outside the dashboard time range. |
| Wrong application selected      | Verify you’ve selected the correct application in the Metrics query editor.                                     |
| Permissions issue               | Verify the API key has read access to the data you’re querying.                                                 |
| Incorrect region                | Ensure the **Region** setting (`US` or `EU`) matches your New Relic account location.                           |

### Query timeout

**Symptoms:**

- Query runs for a long time then fails.
- Error mentions timeout or query limits.

**Solutions:**

1. Narrow the time range to reduce data volume.
2. Add filters to reduce the result set.
3. Increase the **Timeout in Seconds** setting in the data source configuration.
4. Simplify complex NRQL queries or break them into smaller parts.

## Annotation errors

These errors occur when using annotation queries. For annotation setup, refer to [New Relic annotations](/docs/plugins/grafana-newrelic-datasource/latest/annotations/).

### “invalid application ID received while fetching deployments”

**Cause:** The **Application ID** field in a Deployments annotation query is missing or not a valid number.

**Solution:** Enter a valid numeric Application ID, or verify that the template variable resolves to a valid numeric ID.

### “error fetching deployments”

**Cause:** The New Relic API call to retrieve deployments failed.

**Solutions:**

1. Verify the Application ID is correct and the application exists in New Relic.
2. Ensure your API key has permissions to view deployments for the specified application.
3. Check the Grafana server logs for the underlying API error.

### “error fetching alert events”

**Cause:** The New Relic API call to retrieve alert events failed.

**Solutions:**

1. Verify your API key has permissions to view alert events.
2. If using the **Entity ID** filter, ensure it contains a valid numeric ID.
3. Check the Grafana server logs for the underlying API error.

### “invalid entity ID”

**Cause:** The **Entity ID** field in an Alerts annotation query contains a non-numeric value.

**Solution:** Enter a valid numeric entity ID, or use a template variable that resolves to a numeric ID.

### Annotations not appearing on graphs

**Symptoms:**

- Annotation query runs without error but no markers appear on graphs.

**Possible causes and solutions:**

Expand table

| Cause                          | Solution                                                                                                                   |
|--------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| Annotation is disabled         | Ensure the annotation is toggled on in the dashboard’s annotation settings.                                                |
| Time range mismatch            | Verify the annotation data falls within the current dashboard time range.                                                  |
| No deployments exist           | Confirm deployments exist for the application in the New Relic UI.                                                         |
| Insights query returns no data | Test the NRQL query in the query editor or **Explore** to verify it returns results. Include `$__timeFilter` in the query. |

## Template variable errors

These errors occur when using template variables with the New Relic data source.

### Variables return no values

**Solutions:**

1. Verify the data source connection is working (test it in the data source settings).
2. For NRQL variable queries, check the query syntax and ensure data exists for the query.
3. For application or metric variable queries, verify the API key has permissions to list applications and metrics.
4. Check the Grafana server logs for detailed error messages.

### Variables are slow to load

**Solutions:**

1. Set variable refresh to **On dashboard load** instead of **On time range change**.
2. For NRQL variable queries, add filters to reduce the result set.
3. Reduce the scope of variable queries by adding `LIMIT` clauses.

## Alerting issues

These issues relate to using the New Relic data source with Grafana Alerting. For setup instructions, refer to [New Relic alerting](/docs/plugins/grafana-newrelic-datasource/latest/alerting/).

### Alerts not firing

**Cause:** The alert query returns data in a format that Grafana Alerting can’t evaluate.

**Solutions:**

1. Ensure your query uses a supported query type (**Metrics**, **Data Explorer**, or **NRQL Editor**). The **Logs** and **Traces** query types return non-numeric data and don’t work with threshold-based alerting.
2. Set the **Format** to `Table` and omit the `TIMESERIES` keyword. The time-series format may produce frames that Grafana Alerting can’t evaluate.
3. Include `$__timeFilter` in NRQL alert queries so the query evaluates data within the alert evaluation window.
4. Verify the query returns data within the alert evaluation time range by testing in **Explore**.
5. Check the alert rule state in **Alerting** &gt; **Alert rules** for evaluation errors.

### “input data must be a wide series”

**Cause:** The NRQL query uses the `TimeSeries` format with the `TIMESERIES` keyword, producing frames without the type metadata that Grafana Alerting requires.

**Solution:** Switch the **Format** to `Table` and remove the `TIMESERIES` keyword from the query. The table format produces properly typed numeric frames that Grafana Alerting can evaluate.

### Alert evaluation errors

**Cause:** The alert query fails during evaluation, often due to timeouts or data format issues.

**Solutions:**

1. Simplify the query to reduce evaluation time.
2. Increase the **Timeout in Seconds** setting in the data source configuration.
3. Verify the query works correctly in the Explore view before using it in an alert.
4. Check Grafana server logs for detailed error messages.

### Alerts in “No Data” state

**Cause:** The alert query returns no results during the evaluation window.

**Solutions:**

1. Verify the application has traffic during the evaluation period. Low-traffic applications may have gaps in data.
2. Include `$__timeFilter` in the query to match the evaluation window.
3. Configure the alert rule’s no data handling under **Configure no data and error handling**. Choose **OK** for low-traffic applications to avoid false alerts.
4. Widen the evaluation interval to capture more data.

## Data discrepancies with recording rules

Grafana recording rules run a query on a schedule and store each result as a new metric. Because a recording rule writes a single value at each evaluation interval, the recorded metric is a sampled approximation of the underlying New Relic data, not an exact copy.

### Recorded metric values drift from raw New Relic data

**Symptoms:**

- A panel backed by a recording rule shows different values than the same query run directly against New Relic.
- The difference grows over time, especially for counts, sums, or rates.

**Cause:** A recording rule evaluates its query on a fixed interval and writes one data point per evaluation. Grafana doesn’t guarantee that recorded metrics exactly match the raw data. Aggregations in the query and the lag between evaluations produce a divergence that can compound over long time ranges. This is expected behavior for recording rules across all data sources, not a New Relic-specific problem.

**Solutions:**

1. For exact data fidelity, query New Relic directly with a raw NRQL query instead of reading from the recorded metric.
2. If you use recording rules to store the results of expensive queries, shorten the evaluation interval to improve resolution. A shorter interval reduces the divergence but doesn’t eliminate it.
3. Align the evaluation interval of any alert rule that reads a recorded metric with the recording rule’s interval, so the alert acts on fresh data.
4. For more information, refer to [Configure recording rules](/docs/grafana/latest/alerting/alerting-rules/create-recording-rules/).

## Blank or incomplete scheduled reports

Scheduled PDF reports can render blank or partial panels when a data source is slow to return data. Grafana reporting applies a fixed rendering timeout, and any panel that doesn’t finish loading before that timeout renders empty. Because New Relic queries can take longer than queries to other data sources, reports that include New Relic panels are more likely to reach this limit.

This rendering timeout is a Grafana reporting setting. It’s separate from the data source’s **Timeout in Seconds** setting, which controls only the New Relic API request. Changing **Timeout in Seconds** doesn’t affect report rendering.

**Symptoms:**

- Scheduled PDF reports intermittently show blank or partially loaded New Relic panels.
- The same panels render correctly when you view them interactively in a dashboard.

**Solutions:**

1. Reduce the time New Relic queries take to run. Narrow the dashboard time range, add filters to reduce the result set, and avoid unnecessarily large queries. Refer to [Query timeout](#query-timeout).
2. On self-managed Grafana, increase the reporting rendering timeout. Set `rendering_timeout` in the `[reporting]` section of the Grafana configuration file. The default is `10s`. For details, refer to [Configure Grafana Enterprise](/docs/grafana/latest/setup-grafana/configure-grafana/enterprise-configuration/#rendering_timeout).
3. On Grafana Cloud, you can’t change the rendering timeout directly. Contact [Grafana Support](/support/) to request an increase.
4. Keep Grafana up to date. Some blank-panel issues in reports are caused by rendering bugs that are fixed in later Grafana releases.

## Enable debug logging

To capture detailed error information for troubleshooting:

1. Set the Grafana log level to `debug` in the configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Restart Grafana and reproduce the issue.
3. Review logs in `/var/log/grafana/grafana.log` (or your configured log location).
4. Look for `newrelic` entries that include request and response details.
5. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## View executed queries

When a query fails, use the **Query Inspector** in Grafana to view the executed query:

1. Open your dashboard panel.
2. Click the panel title and select **Inspect** &gt; **Query**.
3. Review the executed query string to verify it’s formatted correctly.

## Get additional help

If you’ve tried the solutions in this document and still encounter issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Consult the [New Relic documentation](https://docs.newrelic.com/) for API-specific guidance.
3. Contact Grafana Support if you’re an Enterprise, Cloud Pro, or Cloud Contracted user.
4. When reporting issues, include:

   - Grafana version and plugin version
   - Error messages (redact sensitive information)
   - Steps to reproduce
   - Relevant configuration (redact credentials)
