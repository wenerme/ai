---
title: "Troubleshoot PagerDuty data source issues | Grafana Enterprise Plugins documentation"
description: "Troubleshoot common issues with the PagerDuty data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshoot PagerDuty data source issues

This document provides solutions to common issues you may encounter when configuring or using the PagerDuty data source. For configuration instructions, refer to [Configure the PagerDuty data source](/docs/plugins/grafana-pagerduty-datasource/latest/#configure-the-data-source).

## Authentication errors

These errors occur when your API key is invalid, missing, or doesn’t have the required permissions.

### “invalid status received from the server. status code received 401”

**Symptoms:**

- **Save &amp; test** fails with `invalid status received from the server. status code received 401`
- Queries return authorization errors

**Possible causes and solutions:**

Expand table

| Cause              | Solution                                                                                                                                                   |
|--------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Missing API key    | Enter a valid PagerDuty REST API key in the data source configuration.                                                                                     |
| Invalid API key    | Verify the API key in the [PagerDuty API Access Keys](https://support.pagerduty.com/docs/api-access-keys) settings. Regenerate the key if necessary.       |
| Revoked API key    | Generate a new API key in PagerDuty and update the data source configuration.                                                                              |
| Incorrect key type | Ensure you’re using a **REST API key**, not a Events API key. REST API keys can be generated under **Integrations** &gt; **API Access Keys** in PagerDuty. |

### “invalid status received from the server. status code received 403”

**Symptoms:**

- **Save &amp; test** succeeds but certain queries return `403` errors
- Some filters return no results while others work

**Solutions:**

1. Verify the API key has sufficient permissions. A read-only REST API key has access to all read endpoints.
2. If using a personal API key (user token), confirm the user has access to the services, teams, or incidents you’re querying.
3. Check whether your PagerDuty account tier supports the API endpoints you’re accessing.

## Connection errors

These errors occur when Grafana can’t reach PagerDuty’s API endpoints.

### “Connection refused” or timeout errors

**Symptoms:**

- Data source test times out
- Queries fail with network errors
- Intermittent connection issues

**Solutions:**

1. Verify network connectivity from the Grafana server to `api.pagerduty.com` (HTTPS, port 443).
2. Check that firewall rules allow outbound HTTPS traffic.
3. If you’re behind a corporate proxy, configure Grafana’s proxy settings in `grafana.ini`.
4. For Grafana Cloud accessing private resources, configure [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/).

## Configuration errors

These errors occur when setting up or provisioning the PagerDuty data source.

### Provisioned data source fails to connect

**Symptoms:**

- A provisioned PagerDuty data source shows errors on startup
- **Save &amp; test** fails after provisioning

**Possible causes and solutions:**

Expand table

| Cause                          | Solution                                                                                                                                  |
|--------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| Wrong `type` value             | Use `grafana-pagerduty-datasource` as the `type` in your provisioning YAML.                                                               |
| Incorrect `jsonData` structure | The `auth` field must be nested: `jsonData.auth.id: api_key`. Don’t use a flat key like `jsonData.apiKey`.                                |
| Wrong `secureJsonData` key     | The API key must be at `secureJsonData.auth.api_key.apiKey`. Common mistakes include `secureJsonData.apiKey` or `secureJsonData.api_key`. |
| YAML syntax error              | Validate your YAML file. Ensure proper indentation and no tab characters.                                                                 |

The correct provisioning structure is:

YAML [Copy code to clipboard] Copy

```yaml
datasources:
  - name: PagerDuty
    type: grafana-pagerduty-datasource
    jsonData:
      auth:
        id: api_key
    secureJsonData:
      auth.api_key.apiKey: <API_KEY>
```

## Query errors

These errors occur when running queries against PagerDuty.

### “No data” or empty results

**Symptoms:**

- Query runs without error but returns no data
- Panels show “No data” message

**Possible causes and solutions:**

Expand table

| Cause                                | Solution                                                                                                                                                                     |
|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Time range doesn’t contain incidents | Expand the dashboard time range. The **Since** and **Until** parameters default to the dashboard time range and PagerDuty only returns incidents created within that window. |
| Since/Until range exceeds 6 months   | PagerDuty’s API limits the date range to 6 months. Narrow your time range.                                                                                                   |
| Filters are too restrictive          | Remove or broaden filters such as **Service IDs**, **Statuses**, or **Urgencies** to verify data exists.                                                                     |
| Incorrect incident ID                | When using **Get an incident**, verify the incident ID or incident number is correct.                                                                                        |

### “invalid status code: NNN”

**Symptoms:**

- Queries fail with `invalid status code:` followed by a number (for example, `400`, `404`, `429`, or `500`)

**Possible causes and solutions:**

Expand table

| Status code | Cause                      | Solution                                                                                                                                                                                                                       |
|-------------|----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `400`       | Malformed query parameters | Check that filter values are valid. For example, **Service IDs** and **Team IDs** must be valid PagerDuty identifiers.                                                                                                         |
| `404`       | Incident not found         | When using **Get an incident**, verify the incident ID or number exists in PagerDuty.                                                                                                                                          |
| `429`       | API rate limit exceeded    | Reduce dashboard refresh frequency, narrow time ranges, add filters, or enable [query caching](/docs/grafana/latest/administration/data-source-management/#query-caching) (available in Grafana Enterprise and Grafana Cloud). |
| `500`       | PagerDuty server error     | Retry the query. If the error persists, check the [PagerDuty status page](https://status.pagerduty.com/) for ongoing incidents.                                                                                                |

### Query timeout

**Symptoms:**

- Query runs for a long time then fails
- Error mentions timeout

**Solutions:**

1. Narrow the time range to reduce the number of incidents returned.
2. Add filters such as **Service IDs** or **Statuses** to limit results.
3. Use the **Select fields** drop-down to return only the fields you need, reducing response size.

### Can’t find query parameters or filters

**Symptoms:**

- The query editor shows only the **Action** drop-down with no filter options
- Parameters like **Service IDs**, **Statuses**, or **Since** aren’t visible

**Solutions:**

1. After selecting **List incidents** from the **Action** drop-down, look for the **Additional parameters (optional)** collapsible section and click it to expand.
2. All filter parameters for **List incidents** are optional and appear in this collapsed section by default.
3. For **Get an incident**, the required **Id** field appears under the **Parameters** section, which is always expanded.

## Annotation errors

These errors occur when using PagerDuty annotations on dashboards.

### Annotations don’t appear on the panel

**Symptoms:**

- Annotation query runs without error but no markers appear on the time series
- Annotation shows “0 events” after running

**Possible causes and solutions:**

Expand table

| Cause                                     | Solution                                                                                                                                                                |
|-------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Time range doesn’t contain incidents      | Expand the dashboard time range. Annotations use the same **Since** and **Until** defaults as panel queries, so only incidents created within the visible range appear. |
| Wrong data source selected                | Verify the annotation query is using the PagerDuty data source, not a different one.                                                                                    |
| Filters exclude all incidents             | Remove or broaden **Statuses**, **Service IDs**, or other filters to verify incidents exist for the selected range.                                                     |
| Visualization doesn’t support annotations | Annotations are displayed on time series, bar chart, and state timeline panels. They don’t appear on table or stat panels.                                              |

### Annotations show at the wrong time

**Symptoms:**

- Annotation markers appear but are positioned at unexpected points on the timeline

**Solutions:**

1. Check which timestamp field is being used. By default, the `created_at` field determines annotation placement. If you want annotations at resolution time, select `resolved_at` under **Select fields**.
2. Verify that the Grafana dashboard timezone matches your expectations. Navigate to **Dashboard settings** &gt; **General** to check the timezone.

## Alerting errors

These errors occur when using Grafana alerting with the PagerDuty data source.

### Alert rule returns “no data”

**Symptoms:**

- Alert rule evaluates but shows “No Data” state
- Alert never fires despite active incidents in PagerDuty

**Possible causes and solutions:**

Expand table

| Cause                               | Solution                                                                                                                                                                   |
|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Evaluation time range is too narrow | Alert rules evaluate over a fixed time window. Ensure the **Since** and **Until** parameters cover a range that contains incidents, or clear them to return all incidents. |
| Missing Reduce expression           | The alert engine requires a numeric value. Add a **Reduce** expression (for example, **Count**) to convert the incident list into a number.                                |
| Threshold not configured            | After the Reduce expression, add a **Threshold** expression that defines when the alert should fire (for example, “Is above 0”).                                           |
| Filters exclude all incidents       | Broaden your **Statuses**, **Urgencies**, or other filters to verify incidents exist.                                                                                      |

## Template variable errors

These errors occur when using template variables with the PagerDuty data source.

### Variables return no values

**Solutions:**

1. Verify the data source connection is working by running **Save &amp; test** in the data source settings.
2. Check that the variable query uses the correct **Action** (for example, **List incidents**).
3. Ensure at least one field is selected under **Select fields**. The first two selected fields are used as the variable label and value.
4. Expand the dashboard time range if the variable query depends on the **Since** and **Until** parameters.

### Variables are slow to load

**Solutions:**

1. Set variable refresh to **On dashboard load** instead of **On time range change** to reduce the number of API calls.
2. Add filters to the variable query to limit the number of incidents returned.
3. Select only the fields you need under **Select fields**.

## Enable debug logging

To capture detailed error information for troubleshooting:

1. Set the Grafana log level to `debug` in the configuration file:

   ini [Copy code to clipboard] Copy

   ```ini
   [log]
   level = debug
   ```
2. Restart Grafana for the change to take effect.
3. Reproduce the issue and review logs in `/var/log/grafana/grafana.log` (or your configured log location).
4. Look for entries related to `grafana-pagerduty-datasource` that include request and response details.
5. Reset the log level to `info` after troubleshooting to avoid excessive log volume.

## Get additional help

If you’ve tried the solutions in this document and still encounter issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Review the [PagerDuty REST API documentation](https://developer.pagerduty.com/api-reference/) for API-specific guidance.
3. Contact [Grafana Support](/profile/org#support) if you’re a Grafana Cloud Pro, Cloud Advanced, or Enterprise customer.
4. When reporting issues, include:

   - Grafana version and PagerDuty plugin version
   - Exact error messages (redact your API key)
   - Steps to reproduce the issue
   - Relevant data source configuration (redact credentials)
