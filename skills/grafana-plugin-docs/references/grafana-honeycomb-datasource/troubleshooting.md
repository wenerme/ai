---
title: "Troubleshoot Honeycomb data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshoot common issues with the Honeycomb data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot Honeycomb data source issues

This document provides solutions to common issues you may encounter when configuring or using the Honeycomb data source. For configuration instructions, refer to [Configure the Honeycomb data source](/docs/plugins/grafana-honeycomb-datasource/latest/configure/). For installation help, refer to [Install and upgrade the Honeycomb data source plugin](/docs/plugins/grafana-honeycomb-datasource/latest/install/).

Before you dig into a specific error, try these two steps, because they resolve many issues:

- **Confirm you’re on a current plugin version.** Honeycomb evolves its API over time, and older plugin versions can break as a result. Refer to [Version and upgrade guidance](#version-and-upgrade-guidance).
- **Reproduce the query in the Honeycomb Query UI.** If a query works in Honeycomb but not in Grafana, the problem is in the Grafana integration. If it fails in both, fix the query in Honeycomb first.

## License and setup errors

These issues occur when the Enterprise plugin isn’t licensed, activated, or installed correctly.

### Plugin missing or Install button unavailable

**Symptoms:**

- Honeycomb doesn’t appear under **Connections** &gt; **Add new connection**.
- The **Install** button is missing on the plugin page.

**Possible causes and solutions:**

Expand table

| Cause                                      | Solution                                                                                                                                                                 |
|--------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Enterprise plugin not activated (Cloud)    | Verify activation in [your Grafana Cloud organization settings](/orgs) under the **Plugins** tab. Confirm your plan is Pro or Advanced.                                  |
| Enterprise license inactive (self-managed) | Confirm `GF_ENTERPRISE_LICENSE_TEXT` or the license file is valid. Refer to [Activate an Enterprise license](/docs/grafana/latest/administration/enterprise-licensing/). |
| Insufficient role                          | You need the Organization administrator role to install plugins and configure data sources.                                                                              |

### License reported as invalid on self-managed Grafana Enterprise

> Note
>
> This section applies only to self-managed Grafana Enterprise. On Grafana Cloud, the license is managed for you, so use the activation guidance in the previous table instead.

**Symptoms:**

- The Honeycomb data source health check fails, or the plugin shows as unavailable, even though your Grafana Enterprise license appears valid.
- The Grafana server logs record a license validation error for the plugin at startup.

**Cause:** The Honeycomb plugin is an Enterprise plugin that validates the Grafana Enterprise license independently. If that validation fails, the plugin backend doesn’t start, which surfaces as a failed health check or an unavailable plugin rather than a core Grafana licensing error.

**Solutions:**

Expand table

| Cause                                  | Solution                                                                                                                                                                                                     |
|----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| License token expired or not refreshed | Re-download the license token from [your Grafana Cloud organization settings](/orgs), reapply it, and restart Grafana.                                                                                       |
| `root_url` doesn’t match the license   | Confirm the `root_url` in your Grafana server configuration exactly matches the URL registered with the license. A mismatch causes the license to be treated as invalid.                                     |
| No outbound access for token refresh   | Confirm the Grafana instance can reach the Grafana licensing endpoint. If token refresh fails, Enterprise plugins report the license as invalid. For air-gapped installations, use an offline license token. |
| Root cause unclear                     | Enable [debug logging](#enable-debug-logging), restart Grafana, and review the startup logs for license validation and plugin loading errors.                                                                |

For general Enterprise licensing help, refer to [Grafana Enterprise licensing](/docs/grafana/latest/administration/enterprise-licensing/).

## Version and upgrade guidance

Many Honeycomb issues are caused by running an outdated plugin version. Before deeper troubleshooting, confirm you’re on the latest version, because upgrading resolves a wide range of problems.

> Note
>
> On Grafana Cloud, the Honeycomb plugin is managed by Grafana and updates automatically. On self-managed Grafana, you must update Enterprise plugins manually. In other managed environments, such as Azure Managed Grafana, the plugin version is controlled by the platform provider and can lag behind the latest release.

### Check and update the plugin version

1. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for the plugin and open its page.
3. Review the installed version and the latest available version.
4. If an update is available and you’re on self-managed Grafana, click **Update**, or use `grafana cli plugins update grafana-honeycomb-datasource` and restart Grafana.

For full upgrade and rollback steps, refer to [Upgrade the plugin](/docs/plugins/grafana-honeycomb-datasource/latest/install/#upgrade-the-plugin).

### Symptoms of an outdated plugin version

- **Configuration tab is blank or incomplete.** Older versions may not render all settings fields, which can look like settings were lost.
- **Connection failures with unhelpful errors.** Severely outdated versions can fail to connect at all.
- **Missing query features** such as Raw Query, Usage Mode, or Grafana Assistant that exist in current releases.
- **Intermittent `Plugin unavailable` or HTTP 500 errors**, especially in managed environments with many panels.

## Connection errors

The following errors occur when testing the data source connection or configuring settings.

### “Enter a URL”

**Symptoms:**

- **Save &amp; test** fails immediately.
- Error message: `Enter a URL`

**Cause:** The URL field is empty.

**Solution:**

1. Navigate to your Honeycomb data source settings.
2. Enter the Honeycomb API URL in the **URL** field.
3. The default URL is `https://api.honeycomb.io`.

### `Invalid url: scheme must be https`

**Symptoms:**

- **Save &amp; test** fails with a scheme validation error.
- Error message: `Invalid url: scheme must be https`

**Cause:** The URL doesn’t use HTTPS.

**Solution:**

1. Update the URL to use `https://` instead of `http://`.
2. Save the data source configuration.

### “Enter an API key”

**Symptoms:**

- **Save &amp; test** fails.
- Error message: `Enter an API key`

**Cause:** The API key field is empty.

**Solution:**

1. Obtain an API key from your [Honeycomb account](https://ui.honeycomb.io/account).
2. Enter the API key in the **Honeycomb API Key** field.
3. Save the data source configuration.

### “Enter a Honeycomb team name”

**Symptoms:**

- **Save &amp; test** fails.
- Error message: `Enter a Honeycomb team name`

**Cause:** The **Team Name** field is empty.

**Solution:**

1. Enter your Honeycomb team name in the **Team Name** field.
2. Save the data source configuration.

### Bad request (400)

**Error message:** `Could not connect to Honeycomb. This usually happens when the URL is incorrect.`

**Cause:** The Honeycomb API returned a 400 error, typically due to an incorrect URL. The message may include additional `Details: …` text from the API response.

**Solution:**

1. Verify the URL is correct.
2. Reset the URL to the default: `https://api.honeycomb.io`.
3. Save and test the connection again.

### Unauthorized (401)

**Error message:** `The credentials are incorrect. Check that the URL and API key are correct.`

**Cause:** The API key is invalid, expired, or the URL is incorrect. The message may include additional `Details: …` text from the API response.

**Solution:**

1. Verify that your API key is correct and hasn’t expired.
2. Check that the URL matches your Honeycomb environment.
3. Generate a new API key from Honeycomb if the current one has been compromised or revoked.

### Authentication failed

**Error message:** `Something went wrong. Ensure you are using correct API key`

**Cause:** The authentication request to Honeycomb failed.

**Solution:**

1. Generate a new API key from your [Honeycomb account](https://ui.honeycomb.io/account).
2. Update the API key in your data source configuration.
3. Save and test the connection again.

## Permission errors

These errors indicate your API key is missing required permissions.

### Run Queries permission required

**Error message:** `Connected to honeycomb but API key missing permissions to run queries`

**Cause:** The API key doesn’t have the **Run Queries** permission enabled.

**Solution:**

1. Go to your [Honeycomb account](https://ui.honeycomb.io/account).
2. Edit the API key used for this data source.
3. Enable the **Run Queries** permission.
4. Save the API key and test the connection again.

### Manage Queries and Columns permission required

**Error message:** `Connected to honeycomb but API key missing permissions to manage queries`

**Cause:** The API key doesn’t have the **Manage Queries and Columns** permission enabled.

**Solution:**

1. Go to your [Honeycomb account](https://ui.honeycomb.io/account).
2. Edit the API key used for this data source.
3. Enable the **Manage Queries and Columns** permission.
4. Save the API key and test the connection again.

## Query warnings

These warnings appear in query results and indicate partial data was returned.

### Partial results

**Warning message:** `Partial results: Data clipped due to API time range restriction of <duration>`

The duration reflects the configured time window. Examples include `1h`, `7 days`, and `60 days`.

**Cause:** The requested time range extends beyond the configured data retention window. The Honeycomb API only returns data within the allowed time range, so results may be incomplete.

**Solution:**

1. Adjust the dashboard time range to fall within the configured retention limit.
2. If you need a wider time range, update the **Time Window (days)** in your data source [advanced settings](/docs/plugins/grafana-honeycomb-datasource/latest/configure/#advanced-settings), provided your Honeycomb plan supports a longer retention period.

## Query errors

These errors occur when running queries against Honeycomb.

### “No data” or empty results

**Symptoms:**

- A query runs without error but the panel shows **No data**.
- Results are empty even though data exists in Honeycomb.

**Possible causes and solutions:**

Expand table

| Cause                         | Solution                                                                                                         |
|-------------------------------|------------------------------------------------------------------------------------------------------------------|
| Time range contains no events | Expand the dashboard time range, or confirm the dataset has data for the selected window in the Honeycomb UI.    |
| Wrong dataset selected        | Confirm the **Select dataset** value matches the dataset that contains your events.                              |
| Filters exclude all events    | Relax or remove **Where** filters, and check that column names and values match your data.                       |
| Returned data type mismatch   | For table panels, set **Returned data** to **result**. For graphs, use **series (default)**.                     |
| Result type has no timestamp  | The **result** shape has no time field, so time series panels show no data. Use **series (default)** for graphs. |

### Time range too far in the past

**Error message:** `query has been rejected because the start_time/time_range is too far in the past`

**Cause:** The query requests data beyond the retention period allowed by your Honeycomb plan or the data source **Time Window (days)** setting.

**Solution:**

1. Narrow the dashboard time range so it falls within your Honeycomb retention period.
2. Confirm the **Time Window (days)** setting matches the retention your plan supports. Refer to [advanced settings](/docs/plugins/grafana-honeycomb-datasource/latest/configure/#advanced-settings).

### Time parameter conflict

**Error message:** `time_range cannot be used with both start_time and end_time, choose one or none`

**Cause:** A raw query includes conflicting time parameters. The query specifies `time_range` along with both `start_time` and `end_time`.

**Solution:**

1. Edit your raw query JSON.
2. Use either `time_range` or both `start_time` and `end_time`, but not all three.
3. Remove the conflicting parameter and run the query again.

### Invalid JSON in raw query

**Error message:** `Invalid JSON in raw query: …`

**Cause:** The Raw Query editor contains JSON that can’t be parsed.

**Solution:**

1. Validate the JSON syntax in the Raw Query editor.
2. Ensure property names and string values use double quotes.
3. Click **Run query** after fixing the JSON.

### Raw query rejected by Honeycomb

**Error message:** An error from the Honeycomb API, such as `The provided input is invalid.`

**Cause:** The raw query is valid JSON, so it parses successfully, but Honeycomb rejects it because the query doesn’t match the expected schema. Common causes include an unknown column name, an unsupported field, or a calculation in the wrong shape.

**Solution:**

1. Run the same query in the Honeycomb Query UI to confirm it’s valid there.
2. In the Honeycomb UI, use the query’s JSON output as a known-good starting point, then paste it into the Grafana **Raw Query** editor. This isolates whether the problem is the query itself or how you adapted it.
3. Confirm the JSON matches the Honeycomb schema. In particular, `calculations` is an array of objects where `op` is a string, with an optional `column`:

   JSON [Copy code to clipboard] Copy

   ```json
   {
     "calculations": [{ "op": "COUNT" }],
     "breakdowns": ["service.name"],
     "time_range": 3600
   }
   ```

   Don’t nest the operation as an object, such as `{ "COUNT": null }`.
4. Click **Run query** after correcting the query. For the supported query structure, refer to [Raw query](/docs/plugins/grafana-honeycomb-datasource/latest/query-editor/#raw-query).

### Limit out of range

**Error message:** `Limit must be between 1 and 1000`

**Cause:** The Metrics query **Limit** value is outside the allowed range.

**Solution:**

1. Set **Limit** to a value between `1` and `1000`.
2. Run the query again.

### Empty or invalid SLO ID

**Error message:** `invalid/empty SLO ID` or `missing SLO IDs`

**Cause:** A Single SLO query is missing a valid SLO identifier.

**Solution:**

1. Select an SLO from the **SLO ID** drop-down, or enter a valid SLO ID.
2. Confirm the selected dataset contains the SLO you expect.
3. Run the query again.

## Open in Honeycomb link opens an error page

**Symptoms:**

- Clicking **Open in Honeycomb** from the query editor or a panel data link opens a 404 or error page in Honeycomb.

**Cause:** The link is built with the dataset display name instead of the dataset slug. Honeycomb URLs require the lowercase slug, such as `searchapi`, not the display name, such as `searchApi`. This most often happens when the query’s dataset value is set to the display name, for example when a dashboard is created programmatically through Terraform or the API.

**Solutions:**

1. Update the plugin to version 2.15.1 or later. Current versions resolve the dataset name to its slug when building the link, as long as the dataset appears in the datasets list. Refer to [Version and upgrade guidance](#version-and-upgrade-guidance).
2. In the query editor, re-select the dataset from the **Select dataset** drop-down instead of using a typed or imported value. Selecting from the list stores the correct slug.

> Note
>
> Re-selecting the dataset resets the query’s calculations and filters to their defaults, so you need to reconfigure the query afterward.

## Classic environment limitations

Honeycomb Classic environments don’t support some features available in the newer Environments model. If you’re on a Classic environment, be aware of the following:

- **Environment-wide derived columns aren’t available.** Only dataset-scoped columns are returned. This is a Honeycomb Classic limitation, not a plugin error.
- **Querying all datasets isn’t supported.** The `__all__` option in template variables and cross-dataset queries requires an Environments-model team.

If you need these features, migrate from Honeycomb Classic to the Environments model. Refer to the [Honeycomb documentation](https://docs.honeycomb.io/) for migration guidance.

## Template variable errors

These errors occur when using template variables with the data source.

### Variables return no values

**Symptoms:**

- Variable drop-downs are empty.
- Cascading variables don’t populate after a parent selection.
- A variable that previously returned values stops working.
- A variable populates for some datasets but returns nothing for others, such as a Metrics dataset.

**Solutions:**

1. Verify the data source connection is working (test it in the data source settings).
2. Confirm the variable query type and dataset selection match what you expect.
3. When querying column values, remember the API returns at most 1000 unique values.
4. Check that parent variables have valid selections before dependent variables load.
5. Verify the API key has permissions to list datasets, columns, and values.
6. Compare behavior across datasets. If the variable works for one dataset but not another, the problem is dataset-specific rather than a broken connection.
7. Run the equivalent query in the Honeycomb Query UI. If it works there but not in Grafana, the plugin version may not support a Honeycomb API change.
8. Update the plugin. Honeycomb evolves its API over time, and plugin updates keep variable queries compatible. For example, older versions returned empty results for template variable queries on Honeycomb Metrics datasets, which a later release fixed. Refer to [Version and upgrade guidance](#version-and-upgrade-guidance) and the plugin [CHANGELOG](/grafana/plugins/grafana-honeycomb-datasource/?tab=changelog).

## Slow queries or rate limiting

**Symptoms:**

- Panels load slowly or intermittently time out.
- Errors reference HTTP 429 or too many requests.

**Cause:** The Honeycomb API enforces rate limits. The plugin automatically retries throttled (429) requests with backoff, but sustained load from many panels or short refresh intervals can still hit the limit.

**Solutions:**

1. Increase dashboard and panel refresh intervals to reduce request volume.
2. Reduce the number of Honeycomb panels or queries on a single dashboard.
3. Narrow query time ranges and use **Group by** and **Limit** to return less data.
4. Stagger scheduled queries and alert evaluation intervals.

## Enable debug logging

To capture detailed error information for troubleshooting:

1. Set the Grafana log level to `debug` in the configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Review logs in `/var/log/grafana/grafana.log` (or your configured log location).
3. Look for Honeycomb-specific entries that include request and response details.
4. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## Get additional help

If you’ve tried the solutions in this document and still encounter issues:

1. Check the [Honeycomb status page](https://status.honeycomb.io/) for service outages.
2. Review the [Honeycomb API documentation](https://docs.honeycomb.io/api/) for API-specific issues.
3. Review the [Grafana community forums](https://community.grafana.com/) for similar issues.
4. Contact [Grafana Support](/profile/org#support) if you’re an Enterprise, Cloud Pro, or Cloud Contracted user.

When reporting issues, include:

- Grafana version
- Honeycomb plugin version
- Honeycomb environment type (Classic or Environments)
- Query type (Metrics, SLO, or Raw Query)
- Error messages (redact sensitive information)
- Steps to reproduce
- Relevant configuration such as data source settings and API URL (redact API keys and other credentials)
