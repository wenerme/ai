---
title: "LogicMonitor Devices data source | Grafana Enterprise Plugins documentation"
description: "Query and visualize LogicMonitor device metrics in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# LogicMonitor Devices data source

The LogicMonitor Devices data source allows you to query and visualize LogicMonitor device metrics in Grafana.

> Note
>
> Grafana **LogicMonitor Devices** enterprise data source plugin is currently in [public preview](/docs/release-life-cycle/). Grafana Labs offers limited support, and breaking changes might occur prior to the feature being made generally available.

> Note
>
> The LogicMonitor Devices data source is an Enterprise plugin. It is available with Grafana Cloud (Free, Pro, and Advanced tiers) and Grafana Enterprise. For installation instructions, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).

## Supported features

Expand table

| Feature     | Supported |
|-------------|-----------|
| Metrics     | Yes       |
| Logs        | No        |
| Traces      | No        |
| Alerting    | Yes       |
| Annotations | Yes       |

## Before you begin

Before configuring the LogicMonitor Devices data source, ensure you have:

- **Grafana permissions:** Organization administrator role to add data sources
- **LogicMonitor account:** Access to a LogicMonitor portal with REST API v3 bearer token
- **Grafana version:** Grafana 11.6.7 or later, on any free or paid [Grafana Cloud](/pricing/) plan or on a self-managed instance with an [activated Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/)

## Install the plugin

To install the data source, refer to the [Installation guide](/grafana/plugins/grafana-logicmonitor-datasource/?tab=installation).

## Configure the data source

To add the LogicMonitor Devices data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `LogicMonitor` in the search bar.
4. Select **LogicMonitor Devices**.
5. Click **Add new data source**.

After the data source form opens, complete the fields in the following sections.

### Basic settings

Expand table

| Setting          | Description                                                              |
|------------------|--------------------------------------------------------------------------|
| **Name**         | A name for this LogicMonitor data source instance.                       |
| **Account Name** | Your LogicMonitor account name. For `foo.logicmonitor.com`, enter `foo`. |

### Authentication

This plugin supports bearer token-based authentication. To create a token:

1. Log in to your LogicMonitor portal.
2. Navigate to **Settings** &gt; **Users and Roles**.
3. (Optional) Add a new user with a `readonly` role if one doesn’t already exist.
4. Go to the **Bearer Tokens** tab.
5. Create a new token for the associated user.

Expand table

| Setting   | Description                                 |
|-----------|---------------------------------------------|
| **Token** | Your LogicMonitor REST API v3 bearer token. |

### Verify the connection

Click **Save &amp; test** to verify the connection. A successful test displays the message “health check succeeded for ‘metrics usage details’ query”. If the connection fails, refer to [Troubleshoot LogicMonitor data source issues](#troubleshoot-logicmonitor-data-source-issues).

### Provision the data source

You can configure this data source using configuration files with the Grafana provisioning system. For more information, refer to [Provisioning Grafana data sources](/docs/grafana/latest/administration/provisioning/#data-sources).

Example provisioning configuration:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: LogicMonitor
    type: grafana-logicmonitor-datasource
    jsonData:
      variables:
        account_name: <ACCOUNT_NAME>
      authMethod: bearer
    secureJsonData:
      logicmonitor.token: <TOKEN>
```

Replace `<ACCOUNT_NAME>` with your LogicMonitor account name and `<TOKEN>` with your LogicMonitor REST API v3 bearer token.

### Provision the data source with Terraform

You can configure this data source using the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs).

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "logicmonitor" {
  type = "grafana-logicmonitor-datasource"
  name = "LogicMonitor"

  json_data_encoded = jsonencode({
    variables = {
      account_name = "<ACCOUNT_NAME>"
    }
    authMethod = "bearer"
  })

  secure_json_data_encoded = jsonencode({
    "logicmonitor.token" = "<TOKEN>"
  })
}
```

Replace `<ACCOUNT_NAME>` with your LogicMonitor account name and `<TOKEN>` with your LogicMonitor REST API v3 bearer token.

## Query the data source

The query editor allows you to run queries by selecting an **Action Type** and providing the required parameters.

The **Device** drop-down filters server-side as you type. The plugin sends the typed value to LogicMonitor as a `displayName~"<value>"` glob filter, so matching happens against the full inventory rather than only the results already loaded in the browser.

The **Datasource** drop-down filters client-side against the data sources already loaded for the selected device, so filtering only starts narrowing results after you pick a **Device**.

Keep two points in mind when using the server-side filter on the **Device** drop-down:

- Filtering matches the LogicMonitor `displayName` field. Devices with the same display name appear together in the results.
- Special characters such as `"` and `\` must be escaped in LogicMonitor glob filters. If typed values contain these characters, the filter returns no matches. Avoid those characters or scope the query with a [template variable](#template-variables) instead.

### Device Instance Data

Retrieve time series data for individual device instances.

Expand table

| Field          | Required | Description                                                                              |
|----------------|----------|------------------------------------------------------------------------------------------|
| **Device**     | Yes      | Select a device from your LogicMonitor account.                                          |
| **Datasource** | Yes      | Select a data source associated with the device.                                         |
| **Instance**   | Yes      | Select an instance within the data source.                                               |
| **DataPoints** | No       | Select specific data points to retrieve. If not specified, all data points are returned. |

### Device Instance Data By Device Group

Retrieve time series data for devices within a specific device group.

Expand table

| Field            | Required | Description                                           |
|------------------|----------|-------------------------------------------------------|
| **Device Group** | Yes      | Select a device group from your LogicMonitor account. |
| **Device**       | Yes      | Select a device within the group.                     |
| **Datasource**   | Yes      | Select a data source associated with the device.      |
| **Instance**     | Yes      | Select an instance within the data source.            |
| **DataPoints**   | No       | Select specific data points to retrieve.              |

### Table queries

Use these query types to retrieve and display data in table format:

- **Devices:** Lists all available devices in your LogicMonitor account.
- **Datasources:** Lists all data sources within a selected device.
- **Instances:** Lists all instances within a selected device and data source.

> Note
>
> Starting in `v0.5.0-preview`, table queries and drop-down selectors paginate automatically. The plugin follows offset-based pages of 1000 results and returns up to approximately 10,000 items per query by default. Accounts larger than the effective cap still see truncated lists; scope those queries with the type-to-filter drop-downs or template variables. For more information, refer to [Large result sets and pagination](#large-result-sets-and-pagination).

### Large result sets and pagination

The data source paginates every list query against the LogicMonitor REST API using offset-based paging. Each request asks for 1000 results, and the plugin follows successive pages until the API reports no more items or an internal safety cap is reached.

- **Default page size:** 1000 items per request.
- **Default safety cap:** 10 pages per query, so a single selector or table query fetches up to approximately 10,000 items before stopping.
- **Selector “load more” path:** The **Device**, **Device Group**, **Datasource**, and **Instance** drop-downs use an on-demand pagination path in the query editor. Each additional page loads only when you request it, so this path isn’t bounded by the same cap as the eager fetch.
- **Rate-limit impact:** Because a single list query can issue up to `maxPages` API requests, pagination increases the number of requests per query. Refer to [Default rate limits](#default-rate-limits) when tuning dashboard refresh intervals.

Accounts larger than the effective cap still see truncated lists. To narrow results:

- Use the server-side type-to-filter behavior on the **Device** drop-down to narrow results before picking downstream selectors.
- Scope dashboards with [template variables](#template-variables) instead of listing every device or group.
- Split large dashboards into smaller ones by device group to keep each query within the effective cap.

### Query examples

The following examples show common use cases for querying LogicMonitor data.

#### Monitor CPU utilization

To monitor CPU performance for a specific device:

1. Select **Device Instance Data** as the action type.
2. Select your target device from the **Device** drop-down.
3. Select **CPU** from the **Datasource** drop-down.
4. Select the CPU instance from the **Instance** drop-down.
5. (Optional) Select specific data points such as `cpu_utilization` from **DataPoints**.

#### Compare devices across a group

To compare metrics across all devices in a group:

1. Select **Device Instance Data By Device Group** as the action type.
2. Select your device group from the **Device Group** drop-down.
3. Select a device, data source, and instance.
4. Duplicate the query for each device you want to compare.

### Use Explore

Use Explore to run queries and visualize results without building a dashboard. For more information, refer to [Explore](/docs/grafana/latest/explore/).

## Template variables

Use template variables to create dynamic, reusable dashboards.

To add a LogicMonitor query variable:

1. Navigate to **Dashboard settings** &gt; **Variables**.
2. Click **Add variable**.
3. Select **Query** as the variable type.
4. Select the LogicMonitor Devices data source.
5. Enter your query.

For more information about adding query variables, refer to [Add a query variable](/docs/grafana/latest/dashboards/variables/add-template-variables/#add-a-query-variable).

After creating a variable, use it in your LogicMonitor queries with [variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/). For more information, refer to [Templates and variables](/docs/grafana/latest/dashboards/variables/).

## Set up alerting

The LogicMonitor Devices data source supports Grafana alerting on Device Instance Data metrics.

To create an alert rule:

1. Create a panel with a LogicMonitor Device Instance Data query.
2. Click **Alert** in the panel edit view.
3. Click **Create alert rule from this panel**.
4. Configure the alert conditions based on your LogicMonitor metrics.
5. Set notification policies and contact points.

For more information about Grafana alerting, refer to [Grafana Alerting](/docs/grafana/latest/alerting/).

## Add annotations

Annotations allow you to mark points on a graph with rich events. You can use LogicMonitor data to create annotations on your dashboards.

To add an annotation query:

1. Navigate to **Dashboard settings** &gt; **Annotations**.
2. Click **Add annotation query**.
3. Select the LogicMonitor Devices data source.
4. Configure a query that returns the events you want to annotate.

For more information about annotations, refer to [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## API rate limits and performance

The LogicMonitor REST API enforces rate limits on every request. Limits apply per endpoint and HTTP method, and are shared across your entire LogicMonitor account, not per user or per bearer token. Understanding these limits helps you design dashboards that perform well and avoid query errors during heavy use.

When a request exceeds a rate limit, LogicMonitor returns an HTTP 429 response and the data source surfaces the error in the affected panel.

### Default rate limits

The data source issues only `GET` requests. The default limit and the per-endpoint exceptions that apply to this plugin are:

Expand table

| Endpoint                                                      | Limit                |
|---------------------------------------------------------------|----------------------|
| Default for all `GET` requests                                | 500 requests/minute  |
| `GET /device/devices`                                         | 700 requests/minute  |
| `GET /device/groups`                                          | 400 requests/minute  |
| `GET /device/groups/{id}`                                     | 1000 requests/minute |
| `GET /device/devices/{id}/devicedatasources/{dsId}/instances` | 500 requests/minute  |

For the complete list of LogicMonitor API rate limits and response headers (`X-Rate-Limit-Limit`, `X-Rate-Limit-Remaining`, `X-Rate-Limit-Window`), refer to [REST API Rate Limit](https://www.logicmonitor.com/support/rest-api-developers-guide/overview/rest-api-rate-limit) in the LogicMonitor documentation.

### Reduce API usage

A single Device Instance Data panel can issue several API requests as you build the query (one each for devices, data sources, instances, and time series data). When the dashboard refreshes, only the time series request runs per panel. To stay within rate limits:

- **Increase dashboard refresh intervals.** Short intervals (for example, 5s or 10s) on dashboards with many panels can quickly approach account-wide limits.
- **Limit the number of panels per dashboard.** Each panel issues at least one request per refresh.
- **Use template variables** to scope dashboards instead of duplicating panels for each device.
- **Stagger heavy dashboards.** Avoid loading multiple LogicMonitor dashboards simultaneously across many users.

> Note
>
> LogicMonitor reserves the right to reduce API limits if continuous use affects portal performance, alerting, or data collection. If your needs exceed the default limits, contact your LogicMonitor customer success manager.

## Troubleshoot LogicMonitor data source issues

This section provides solutions to common issues when configuring or using the LogicMonitor Devices data source. Entries are grouped by the layer where the problem surfaces, from the network up through alerting.

### Connection errors

Connection errors indicate that Grafana can’t reach `<account>.logicmonitor.com` at all, so the request never reaches LogicMonitor authentication.

Expand table

| Error message                                 | Cause                                                                                                                    | Solution                                                                                                                                                                  |
|-----------------------------------------------|--------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| “no such host” or `dial tcp: lookup` failures | Incorrect account name or DNS resolution failure                                                                         | Verify the account name matches your LogicMonitor portal URL. For `foo.logicmonitor.com`, enter `foo`. Confirm the Grafana host can resolve `<account>.logicmonitor.com`. |
| `x509` or `tls: handshake failure`            | The Grafana host can’t complete the TLS handshake, often because of a corporate proxy or a missing certificate authority | Confirm that outbound HTTPS to `<account>.logicmonitor.com` is allowed and that the system trust store includes the CA that signs the LogicMonitor certificate.           |

### Authentication errors

Authentication errors indicate that Grafana reached the LogicMonitor API but the request was rejected before it could return data.

Expand table

| Error message                                                                        | Cause                                                                                                                            | Solution                                                                                                                                                                                                              |
|--------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| “Account Name missing”                                                               | Account name not provided                                                                                                        | Enter your LogicMonitor account name in the configuration.                                                                                                                                                            |
| `health check failed` with `authentication failure` and `invalid/empty bearer token` | Token field is empty                                                                                                             | Enter your LogicMonitor REST API v3 bearer token.                                                                                                                                                                     |
| `health check failed` with `status code: 401` or `status code: 403`                  | Bearer token is invalid, expired, revoked, disabled, or belongs to a user whose role lacks read access to the requested resource | Verify the token in the LogicMonitor portal, confirm the associated user is still active, and confirm the user’s role grants read access to devices, device groups, and data sources. Generate a new token if needed. |

### Query errors

Query errors surface when the API request succeeds but the data source can’t build a complete result.

Expand table

| Error message                                               | Cause                                                                                                                                                                                                                                           | Solution                                                                                                                                                                                                                                                                                              |
|-------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Missing parameter error                                     | Required fields not selected                                                                                                                                                                                                                    | Select values for all required fields (**Device**, **Datasource**, **Instance**) before running the query.                                                                                                                                                                                            |
| No data returned                                            | Time range or permissions issue                                                                                                                                                                                                                 | Verify data exists for the selected time range and that your token has read access to the target device.                                                                                                                                                                                              |
| Drop-down missing entries in **Device** or **Device Group** | Account contains more devices or device groups than the plugin’s paginated fetch cap (approximately 10,000 by default)                                                                                                                          | For **Device**, use the server-side type-to-filter to narrow results. For **Device Group**, or if the account exceeds the cap in either selector, scope the dashboard with a template variable. For more information, refer to [Large result sets and pagination](#large-result-sets-and-pagination). |
| Drop-down missing entries in **Datasource** or **Instance** | Because both selectors filter client-side against the results returned for the parent selection, missing entries indicate the item isn’t associated with the selected **Device** (or **Device** and **Datasource** combination) in LogicMonitor | Try selecting a different **Device** or **Datasource**, or verify the association in the LogicMonitor portal.                                                                                                                                                                                         |
| Type-to-filter in **Device** drop-down returns no matches   | Typed value contains characters that must be escaped in the LogicMonitor `displayName~"..."` glob, such as `"` or `\`                                                                                                                           | Retype the value without those characters, or scope the query with a [template variable](#template-variables) instead.                                                                                                                                                                                |

### Rate-limit errors

The plugin issues one API request per selector page and one per time series panel refresh. Pagination can multiply the request count per query up to the effective page cap.

**Symptoms**

- Panels show `status code: 429` or `Too Many Requests`.
- Dashboards intermittently fail to load some panels while others succeed.

**Cause**

The LogicMonitor REST API rate limit for the affected endpoint has been reached across the entire account. Limits are per endpoint and shared across all bearer tokens.

**Solutions**

1. Increase dashboard refresh intervals so fewer requests hit each endpoint per minute.
2. Reduce the number of LogicMonitor panels on a single dashboard, or stagger loads across dashboards.
3. Use template variables to reduce the number of duplicate queries.
4. Review the specific endpoint’s default limit in [Default rate limits](#default-rate-limits) and contact your LogicMonitor customer success manager if your usage consistently exceeds the limit.

### Alert rule errors

Alert rules evaluate queries outside a dashboard panel context, so time and variable substitutions behave differently from the panel preview.

Expand table

| Error message                                | Cause                                                                                                                                                                 | Solution                                                                                                                                                                                     |
|----------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| “failed to evaluate queries and expressions” | Alert rule references a dashboard template variable that Alerting can’t resolve, or relies on `$__timeFrom` and `$__timeTo` bounds that aren’t set in the alert query | Replace template variables with concrete device, data source, and instance IDs in the alert rule. Verify the query returns data in the dashboard panel preview before saving the alert rule. |

### Template variable errors

Template variable queries evaluate before any panel query, so referenced parameters must resolve at variable-eval time.

Expand table

| Symptom                                                | Cause                                                                                                                                       | Solution                                                                                                                                        |
|--------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Variable drop-down is empty after saving the dashboard | The variable query depends on another variable that hasn’t resolved yet, or on a parameter the plugin can’t resolve outside a panel context | Chain variables so that each depends only on variables defined above it in the dashboard, or replace the upstream reference with a concrete ID. |
| Variable expansion returns an unexpected value         | Variable syntax doesn’t match the plugin’s expected format                                                                                  | Verify the variable syntax against [variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/).                               |

### Debug logging

To capture additional diagnostic information for a support case, enable debug logging in Grafana.

1. Open your Grafana configuration file (typically `grafana.ini` on self-managed installations) and set `[log]` `level = debug`. On Grafana Cloud, contact support to enable debug logging temporarily.
2. Alternatively, set the environment variable `GF_LOG_LEVEL=debug` on the Grafana process.
3. Restart Grafana for the setting to take effect.

The LogicMonitor data source writes its debug output to the standard Grafana server log. No plugin-specific environment variables are required.

> Caution
>
> Debug logging is verbose and can significantly increase log volume. Disable it after you’ve captured the information you need.

### Get additional help

If you’ve tried the solutions in this document and still encounter issues:

- Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
- Consult the [LogicMonitor API documentation](https://www.logicmonitor.com/support/rest-api-developers-guide/overview) for service-specific guidance.
- Contact Grafana Support if you’re a Grafana Enterprise, Cloud Pro, or Cloud Contracted user.

When reporting issues, include:

- Grafana version
- LogicMonitor plugin version
- Error messages (redact sensitive information)
- Steps to reproduce
- Data source configuration (redact credentials)

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.

## Learn more

- [Grafana Alerting](/docs/grafana/latest/alerting/)
- [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/)
- [Templates and variables](/docs/grafana/latest/dashboards/variables/)
- [Transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/)
- [LogicMonitor REST API documentation](https://www.logicmonitor.com/support/rest-api-developers-guide/overview)
