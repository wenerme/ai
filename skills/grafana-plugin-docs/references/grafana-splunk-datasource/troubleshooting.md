---
title: "Troubleshoot the Splunk data source | Grafana Enterprise Plugins documentation"
description: "Troubleshoot common issues with the Splunk data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot the Splunk data source

This document provides solutions to common issues you may encounter when configuring or using the Splunk data source. For configuration instructions, refer to [Configure the Splunk data source](/docs/plugins/grafana-splunk-datasource/latest/configure/).

> Tip
>
> The most common setup issue is using the wrong Splunk URL. The data source requires the Splunk **REST API** endpoint (port 8089), not the web UI. If you see `invalid character '<'` errors, your URL likely points to the Splunk web interface instead. Refer to [“invalid character ‘&lt;’” or HTML in response](#invalid-character--or-html-in-response) for details.

## Connection errors

These errors occur when Grafana cannot reach the Splunk server.

### “invalid character ‘&lt;’” or HTML in response

**Cause:** The data source URL points to the Splunk **web UI** (typically port 8000 or 443) instead of the Splunk **REST API** (port 8089). Grafana receives an HTML page instead of JSON.

**Solution:**

1. Change the URL to use the Splunk REST API port. The correct format is `https://<splunk-host>:8089`.
2. Do **not** use the same URL you use to log in to the Splunk web interface.
3. Click **Save &amp; test** to verify the connection.

Expand table

| Incorrect (web UI)                         | Correct (REST API)                |
|--------------------------------------------|-----------------------------------|
| `https://splunk.example.com:8000`          | `https://splunk.example.com:8089` |
| `https://splunk.example.com/en-US/app/...` | `https://splunk.example.com:8089` |
| `https://splunk.example.com` (no port)     | `https://splunk.example.com:8089` |

### 404 errors on connection test

**Cause:** A load balancer or reverse proxy is forwarding requests to the wrong Splunk endpoint, or the target group is misconfigured. This commonly occurs when a load balancer routes traffic to the Splunk web UI backend instead of the REST API.

**Solution:**

1. Verify the load balancer target group points to port **8089** on the Splunk search heads.
2. Check that health check paths on the load balancer are configured for the REST API, not the web UI.
3. If connecting directly (no load balancer), confirm the URL uses port 8089.
4. Test connectivity from the Grafana server: `curl -k https://<splunk-host>:8089/services/server/info`.

### 400 errors after a previously working connection

**Cause:** On Grafana Cloud, outbound IP addresses can change. If your Splunk instance uses firewall allowlisting, a previously working connection may break when Grafana Cloud routes traffic from a new IP.

**Solution:**

1. Update your firewall rules to allow the current Grafana Cloud outbound IP addresses. Refer to [Grafana Cloud outbound IP addresses](/docs/grafana-cloud/account-management/allow-list/) for the full list.
2. If your organization’s security policy doesn’t permit allowlisting dynamic IPs, set up [Private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) to create a stable, secure tunnel between Grafana Cloud and your private network.

### Connection timeouts

**Cause:** Grafana cannot reach the Splunk REST API within the timeout window. Common causes include blocked ports, missing firewall rules, VPN requirements, or incorrect network configuration.

**Solution:**

1. Confirm port 8089 is open and reachable from the Grafana server: `nc -zv <splunk-host> 8089`.
2. If your Splunk instance is on a private network, set up [Private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/).
3. Check for VPN requirements that might prevent Grafana from reaching your Splunk instance.
4. Increase the **Timeout** value in the data source configuration under **Additional settings** &gt; **Advanced options**.
5. If using Splunk Cloud, verify that [port 8089 is enabled](https://docs.splunk.com/Documentation/SplunkCloud/latest/Config/ConfigureOutboundPorts) in your Splunk Cloud configuration.

### “Enter a URL”

**Cause:** The URL field in the data source configuration is empty or contains only whitespace.

**Solution:**

1. Navigate to **Connections** &gt; **Data sources** &gt; **Splunk**.
2. Enter a valid Splunk server URL in the **URL** field.
3. The URL should include the protocol, hostname, and port (typically 8089). For example: `http://splunk-server.example.com:8089`.
4. Click **Save &amp; test** to verify the connection.

### “The URL is not in the expected format”

**Cause:** The URL provided doesn’t match the expected format for a Splunk API endpoint.

**Solution:**

1. Verify the URL includes the correct protocol (`http://` or `https://`).
2. Ensure the port number is correct. Splunk’s management port is typically `8089`.
3. Remove any trailing slashes or extra path segments.
4. Example of a valid URL: `https://splunk.example.com:8089`.

### “Could not connect to Splunk. This usually happens when the URL is incorrect.”

**Cause:** The data source can’t establish a connection to the Splunk server. This typically occurs when the URL is incorrect or the Splunk server isn’t reachable.

**Solution:**

1. Verify the Splunk server URL is correct and accessible from the Grafana server.
2. Check that [port 8089 is enabled](https://docs.splunk.com/Documentation/SplunkCloud/latest/Config/ConfigureOutboundPorts) on your Splunk instance.
3. If using Splunk Cloud, ensure you’ve configured the necessary network access.
4. Test connectivity by running `curl -k https://your-splunk-server:8089` from the Grafana server.
5. Check for any firewall rules or network policies blocking the connection.

### “There was a problem with connecting to Splunk”

**Cause:** A general connection error that doesn’t match a specific known issue.

**Solution:**

1. Check that the Splunk server is running and accessible.
2. Verify network connectivity between Grafana and the Splunk server.
3. Review Splunk server logs for errors.
4. If using TLS/SSL, verify your certificate configuration is correct.
5. Try toggling **Skip TLS certificate validation** temporarily to determine if the issue is certificate-related.

## TLS and certificate errors

These errors occur when TLS/SSL certificate validation fails during connection setup.

### Certificate validation failures

**Cause:** The Splunk server’s TLS certificate can’t be validated.

**Solution:**

1. If using a self-signed certificate, add the CA certificate in the data source configuration under **Add self-signed certificate**.
2. Alternatively, toggle **Skip TLS certificate validation** on (not recommended for production).
3. Verify the certificate chain is complete and valid.
4. Check that the certificate hasn’t expired.
5. For more information on securing Splunk with TLS, refer to [Securing Splunk Enterprise](https://docs.splunk.com/Documentation/Splunk/latest/Security/AboutsecuringyourSplunkconfigurationwithSSL).

### TLS client authentication issues

**Cause:** Client certificate authentication is failing.

**Solution:**

1. Verify the **Client cert** and **Client key** are correctly configured.
2. Ensure the **Server name** matches the certificate’s Common Name (CN) or Subject Alternative Name (SAN).
3. Check that the client certificate is trusted by the Splunk server.
4. Verify the certificate and key files are in the correct PEM format.

## Authentication errors

These errors occur when credentials are invalid, missing, or don’t have the required permissions.

### “The credentials are incorrect. Check that the username and password are correct.”

**Cause:** The username or password provided for Splunk authentication is invalid.

**Solution:**

1. Verify the username and password are correct.
2. Avoid using the default Splunk administrator account; create a dedicated user for Grafana.
3. Check that the user account isn’t locked or expired in Splunk.
4. If using an authentication token, ensure it’s valid and hasn’t expired.
5. Verify the user has the necessary permissions to access the Splunk REST API.

### Authentication token issues

**Cause:** The authentication token is invalid, expired, or doesn’t have the required permissions.

**Solution:**

1. Generate a new authentication token in Splunk. Refer to Splunk’s [Create authentication tokens](https://docs.splunk.com/Documentation/Splunk/latest/Security/CreateAuthTokens) documentation.
2. Ensure the token has the necessary capabilities for the operations you want to perform.
3. Check that the token hasn’t expired.
4. In the data source configuration, enter the token in the **Authentication token** field under **Alternative authentication**.

## Configuration errors

These errors occur when data source settings are missing or invalid.

### “The configuration setup is incomplete”

**Cause:** Required configuration fields are missing or invalid.

**Solution:**

1. Navigate to **Connections** &gt; **Data sources** &gt; **Splunk**.
2. Ensure the **URL** field contains a valid Splunk server URL.
3. Configure authentication using either **Basic authentication** (username/password) or an **Authentication token**.
4. Click **Save &amp; test** to verify all settings are correct.

### “An error occurred with getting the data source”

**Cause:** There was a problem loading the data source settings.

**Solution:**

1. Refresh the page and try again.
2. Check that the data source hasn’t been deleted or modified by another user.
3. Verify you have the necessary permissions to access the data source.
4. If using provisioning, check that the provisioning YAML file is valid.

## Query errors

These errors occur when running queries against Splunk.

### “request timeout”

**Cause:** The query took longer than the configured timeout to complete.

**Solution:**

1. Increase the **Timeout** value in the data source configuration under **Advanced options**.
2. Optimize your SPL query to return results faster:

   - Add time range constraints.
   - Use more specific index and sourcetype filters.
   - Reduce the amount of data being processed.
3. Consider enabling **Preview mode** to get results as they become available.
4. If running complex queries, increase the **Auto cancel timeout** value.

### “request canceled” or “context canceled”

**Cause:** The Splunk search job was canceled before it could return results. This can happen when:

- You navigate away from the dashboard or close the panel before the query completes.
- The query exceeds a network-level timeout (load balancer, proxy, or cloud gateway).
- Grafana’s internal request context expires before Splunk finishes processing.

This error is especially common on **larger time ranges** (3+ hours) where the same query works fine on short windows (5–15 minutes). Larger time ranges require Splunk to scan more data, increasing the chance of hitting a timeout boundary.

**Solution:**

1. Increase the **Timeout** value in the data source configuration under **Additional settings** &gt; **Advanced options**. The default is 30 seconds, which may be too low for large time ranges.
2. Increase the **Auto cancel timeout** to prevent Splunk from canceling idle search jobs.
3. If using a load balancer or reverse proxy between Grafana and Splunk, increase its idle/read timeout to match or exceed the data source timeout.
4. Narrow the query time range or optimize the SPL to reduce processing time.
5. Enable **Async queries** for long-running searches so Grafana polls for results instead of holding a single connection open.

### “No data” on queries that work for short time ranges

**Cause:** Queries return data for short time windows (5–15 minutes) but show “No data” on longer ranges (3+ hours). This is typically caused by the Splunk search job timing out or being canceled before it can return results, rather than an absence of matching events.

**Solution:**

1. Check the Grafana server logs or browser developer console for underlying errors such as `context canceled` or `request timeout`.
2. Follow the steps in [“request canceled” or “context canceled”](#request-canceled-or-context-canceled) to increase timeout values.
3. Use `timechart` with a wider `span` value for larger time ranges to reduce the number of data points Splunk must calculate. For example, use `span=1h` instead of `span=1m` for multi-day queries.
4. Add `| fields` to your query to return only the fields you need, reducing data transfer time.

### Only partial data returned

**Cause:** Queries return data for a shorter time range than requested. For example, a query for 12 months of data returns only 4 months. This is typically caused by Splunk-side restrictions on the service account, not a Grafana limitation.

**Solution:**

1. Check the Splunk user or role assigned to the Grafana data source. Splunk roles can restrict:

   - Which indexes the user can search (`srchIndexesAllowed`).
   - The maximum search time window (`srchTimeWin`).
   - The maximum number of concurrent searches (`srchJobsQuota`).
2. Ask your Splunk administrator to verify the service account’s role doesn’t limit the searchable time range.
3. Check the **Results limit** setting in the data source configuration. If set too low, results may be truncated. Set to `0` for no limit.
4. Test the same query directly in the Splunk web UI using the same credentials to confirm whether the data restriction is Splunk-side.

### “This instance is currently in Detention mode and does not allow running new search jobs”

**Cause:** The Splunk instance is in Detention mode, which typically occurs during a rolling restart of a search head cluster.

**Solution:**

1. Wait for the Splunk cluster rolling restart to complete.
2. Try connecting to a different search head in the cluster.
3. Contact your Splunk administrator to check the cluster status.

### 5xx server errors

**Cause:** The Splunk server returned a 5xx error, indicating a server-side issue. The data source automatically retries 5xx errors up to three times with exponential backoff.

**Solution:**

1. Check the Splunk server status and logs for errors.
2. Verify the Splunk server has sufficient resources (CPU, memory, disk space).
3. If the issue persists after automatic retries, contact your Splunk administrator.
4. Check if there are any ongoing maintenance activities on the Splunk infrastructure.

## Query results differ from Splunk web UI

These issues occur when Grafana displays different results than the same query run in the Splunk web interface.

### Duplicate rows in Grafana results

**Cause:** Splunk stores data across multiple index slices (buckets). The Splunk web UI automatically deduplicates results across slices, but the Splunk REST API returns all slices, which can result in duplicate rows in Grafana.

**Solution:**

Use `dedup` or `mvjoin` in your SPL query to deduplicate results before they reach Grafana:

spl [Copy code to clipboard] Copy

```spl
index=main sourcetype=access_combined | dedup _raw | stats count by status
```

For multi-value fields that produce duplicates, use `mvjoin` to collapse them into a single value:

spl [Copy code to clipboard] Copy

```spl
index=main | stats values(host) as hosts by sourcetype | eval hosts=mvjoin(hosts, ", ")
```

### Alerts return “No Data” while dashboard panels show “0”

**Cause:** When a Splunk search returns zero rows, Grafana dashboard panels can still display `0` because visualization defaults handle empty frames. However, Grafana Alerting treats a query that returns no rows as “No Data” rather than zero, because there is no data point to evaluate.

SPL functions like `eval`, `if`, and `coalesce` don’t execute on empty result sets—they operate on existing rows, so they can’t generate a fallback value when Splunk returns nothing.

**Solution:**

Rewrite the SPL query to always return at least one row, even when no events match. Use `appendpipe` to add a default row when the result set is empty:

spl [Copy code to clipboard] Copy

```spl
index=main log_level=ERROR | timechart span=5m count as error_count
| appendpipe [stats count | where count=0 | eval _time=now(), error_count=0]
```

Alternatively, use `fillnull` after `timechart` to ensure all time buckets have a value:

spl [Copy code to clipboard] Copy

```spl
index=main log_level=ERROR | timechart span=5m count as error_count | fillnull value=0
```

> Note
>
> The `appendpipe` approach is preferred for alerting because it guarantees at least one row even when no events match the base search. `fillnull` only fills gaps between existing time buckets—if there are zero events in the entire time range, there are no buckets to fill.

## Template variable errors

These errors occur when using template variables with the Splunk data source.

### Variables return no values

**Possible causes and solutions:**

Expand table

| Cause                          | Solution                                                                                       |
|--------------------------------|------------------------------------------------------------------------------------------------|
| Data source connection is down | Verify the connection by clicking **Save &amp; test** in the data source settings.             |
| Incorrect SPL query            | Test the variable query directly in Explore to verify it returns results.                      |
| Missing permissions            | Ensure the Splunk user has permissions to access the indexes referenced in the variable query. |
| Wrong namespace                | Verify the namespace selected in the variable query editor matches where your data resides.    |

### Variables are slow to load

**Solution:**

1. Set variable refresh to **On dashboard load** instead of **On time range change** to reduce the number of queries.
2. Use the `| head` command to limit the number of results returned by the variable query.
3. Ensure the variable query targets a specific index and sourcetype.
4. Check that the **Default earliest time** setting in the data source configuration isn’t set to an excessively large time window (default is `-1hr`).

## Performance issues

These issues relate to slow queries, streaming behavior, or resource consumption.

### Panels show “Stop streaming” indicator and load slowly

**Cause:** When **Async queries** or **Preview mode** is enabled, Grafana polls Splunk for results and displays a green streaming indicator on panels. If the Splunk search job takes a long time, panels remain in this streaming state and appear stuck.

**Solution:**

1. Adjust the **Min** and **Max** poll interval values under **Additional settings** &gt; **Advanced options**. A longer max interval reduces polling overhead but increases perceived delay.
2. If you don’t need incremental results, disable **Preview mode** and **Async queries** so queries run synchronously and return all results at once.
3. Optimize the SPL query to complete faster (refer to [Optimize long-running queries](#optimize-long-running-queries)).
4. If individual panels are slow but others are fine, check whether those panels use broader time ranges or more complex queries.

### Slow query performance

**Cause:** Queries are taking too long to return results.

**Solution:**

1. Optimize your SPL queries (refer to [Optimize long-running queries](#optimize-long-running-queries)).
2. Enable **Preview mode** to see partial results as they become available.
3. Reduce the **Results limit** value to return fewer rows.
4. Check Splunk server performance and resource utilization.

### Optimize long-running queries

Use the following techniques to reduce query execution time:

Expand table

| Technique                                 | Example                                                     |
|-------------------------------------------|-------------------------------------------------------------|
| Target specific indexes and sourcetypes   | `index=web sourcetype=access_combined` instead of `index=*` |
| Use `fields` to limit returned data       | `| fields _time, status, bytes`                             |
| Match `timechart span` to the time range  | Use `span=1h` for multi-day ranges, not `span=1m`           |
| Aggregate instead of returning raw events | Use `stats` or `timechart` instead of browsing raw logs     |
| Use `tstats` for indexed fields           | `| tstats count where index=web by _time span=5m`           |
| Apply `head` or `tail` to limit rows      | `| head 1000`                                               |

### Settings that affect query performance

Expand table

| Setting                 | Location                                  | Effect                                                                                                                                         |
|-------------------------|-------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| **Timeout**             | Additional settings &gt; Advanced options | Maximum time for a single Splunk HTTP request (default: 30s). Increase for complex queries.                                                    |
| **Auto cancel timeout** | Additional settings &gt; Advanced options | Splunk cancels idle search jobs after this period (default: 30s). Increase if queries are being canceled.                                      |
| **Results limit**       | Additional settings &gt; Advanced options | Caps the number of rows returned. Set to `0` for no limit.                                                                                     |
| **Async queries**       | Additional settings &gt; Advanced options | Runs queries asynchronously with polling. Useful for long-running searches but can cause streaming behavior on panels.                         |
| **Preview mode**        | Additional settings &gt; Advanced options | Returns partial results while the search job is running. Provides faster initial feedback but may show incomplete data until the job finishes. |
| **Sample ratio**        | Query editor                              | Reduces the volume of data Splunk processes by sampling. Useful for exploratory queries on large datasets.                                     |

### High resource usage

**Cause:** Queries are consuming too many resources on the Splunk server.

**Solution:**

1. Set appropriate **Results limit** values in the data source configuration.
2. For self-managed Grafana, use the `GF_PLUGIN_GRAFANA_SPLUNK_DATASOURCE_MAX_RESULT_LIMIT` environment variable to set a global limit.
3. Reduce the number of dashboard panels that query Splunk simultaneously.
4. Use sampling with the **Sample ratio** option for exploratory queries on large datasets.
5. Stagger panel refresh intervals to avoid concurrent query spikes.

## Concurrency and scaling

These issues occur when multiple users or dashboards send a high volume of queries to Splunk simultaneously.

### 503 “Service Unavailable” with multiple panels

**Cause:** When a dashboard has many panels querying Splunk, all queries run concurrently. This can exceed connection limits at any layer between Grafana and Splunk, including:

- Reverse proxy or load balancer connection limits.
- Splunk’s per-user concurrent search quota (`srchJobsQuota`).
- Splunk instance-wide search concurrency limits.

**Solution:**

1. Reduce the number of Splunk panels on a single dashboard. Consolidate related queries into fewer panels using multi-series SPL (for example, `timechart ... by host` instead of one panel per host).
2. If using a reverse proxy or load balancer, increase its maximum concurrent connection limit.
3. Ask your Splunk administrator to check the service account’s `srchJobsQuota` and the instance-wide `max_searches_per_cpu` setting.
4. Stagger panel refresh intervals so panels don’t all query at the same time.
5. Use `stats` or `timechart` instead of raw event searches, which consume fewer Splunk resources per query.

### Query caching and deduplication

Grafana does **not** deduplicate identical Splunk queries across users or browser sessions. Each panel load, page refresh, and user session sends an independent query to Splunk. On dashboards viewed by many users simultaneously, this multiplies the query load.

**Mitigations:**

1. **Enable query caching (Grafana Enterprise and Cloud Pro/Advanced).** Query caching stores results for a configurable duration so that identical queries from different users are served from cache instead of hitting Splunk again. Refer to [Query caching](/docs/grafana/latest/administration/data-source-management/#query-caching) for setup instructions.
2. **Design dashboards for efficiency.** Reduce the total number of distinct queries:

   - Combine related metrics into a single `timechart ... by <field>` query instead of separate panels.
   - Use template variables to filter data within a shared query rather than duplicating queries with different filters.
   - Set dashboard auto-refresh intervals to the longest acceptable period.
3. **Set appropriate Splunk concurrency limits.** Work with your Splunk administrator to size `srchJobsQuota` for the Grafana service account based on expected concurrent users and panels.

## Enable debug logging

To capture detailed error information for troubleshooting:

1. Set the Grafana log level to `debug` in the configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Restart Grafana for the change to take effect.
3. Reproduce the issue.
4. Review logs in `/var/log/grafana/grafana.log` (or your configured log location).
5. Look for `splunk`-related entries that include request and response details.
6. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## Get additional help

If you’ve tried the solutions in this document and still encounter issues:

1. Check the [Splunk documentation](https://docs.splunk.com/) for Splunk-specific issues.
2. Review Grafana server logs for detailed error messages.
3. Use the **Query inspector** in the query editor to view detailed statistics and debug information.
4. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
5. Contact Grafana Support if you’re an Enterprise, Cloud Pro, or Cloud Contracted user. When reporting issues, include:

   - Grafana version
   - Splunk version and deployment type (Splunk Cloud, Splunk Enterprise)
   - Query mode (Search or Events)
   - Error messages (redact sensitive information)
   - Steps to reproduce
   - Relevant configuration such as data source settings, authentication method, and TLS settings (redact tokens, passwords, and other credentials)
