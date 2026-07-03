---
title: "Configure the Splunk data source | Grafana Enterprise Plugins documentation"
description: "Configure the Splunk data source to connect Grafana to your Splunk instance."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Splunk data source

This document explains how to configure the Splunk data source in Grafana.

## Before you begin

Before configuring the data source, ensure you have:

- **Grafana permissions:** Organization administrator role.
- **Splunk account:** A [Splunk account](https://www.splunk.com/en_us/sign-up.html) with credentials (username and password or an authentication token).
- **Network access:** [Port 8089 enabled](https://docs.splunk.com/Documentation/SplunkCloud/latest/Config/ConfigureOutboundPorts) on your Splunk instance.

## Key concepts

If you’re new to Splunk, these terms are used throughout the configuration:

Expand table

| Term                     | Description                                                                                      |
|--------------------------|--------------------------------------------------------------------------------------------------|
| **SPL**                  | Search Processing Language, the query language used by Splunk to search and analyze data.        |
| **Index**                | A repository for Splunk data, similar to a database table.                                       |
| **Sourcetype**           | A classification for data ingested into Splunk that determines how data is formatted and parsed. |
| **Namespace**            | A Splunk app context that determines which knowledge objects are available to a query.           |
| **Authentication token** | A token-based alternative to username and password for authenticating to Splunk’s REST API.      |

## Add the data source

To install the plugin, refer to [Install the Splunk data source](/docs/plugins/grafana-splunk-datasource/latest/install/). For general information on adding a data source, refer to [Add a data source](/docs/grafana/latest/administration/data-source-management/#add-a-data-source).

To add the Splunk data source, complete the following steps:

1. Click **Connections** in the left-side menu.
2. Under **Connections**, click **Add new connection**.
3. Enter `Splunk` in the search bar.
4. Select **Splunk data source**.
5. Click **Add new data source** in the upper right.

You are taken to the **Settings** tab where you set up your Splunk configuration.

## Configuration options

The following sections describe the available configuration options.

### General settings

Expand table

| Setting     | Description                                                                                                                   |
|-------------|-------------------------------------------------------------------------------------------------------------------------------|
| **Name**    | The data source name. This is how you refer to the data source in panels and queries. For example: `Splunk-1`, `Splunk_data`. |
| **Default** | Toggle to make this the default data source for new panels.                                                                   |

### Connection settings

Expand table

| Setting | Description                                                                                                                                     |
|---------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| **URL** | The URL of your Splunk server, including the management port. For example: `http://localhost:8089` or `https://splunk-server.example.com:8089`. |

## Authentication

The data source supports multiple authentication methods. Choose the method that best fits your deployment.

Expand table

| Method                     | Best for                                     | Requires feature toggle |
|----------------------------|----------------------------------------------|-------------------------|
| **Basic authentication**   | Most deployments                             | No                      |
| **Authentication token**   | Token-based access without sharing passwords | No                      |
| **Forward OAuth Identity** | User-level auth via OAuth                    | Yes                     |

> Note
>
> Use TLS (Transport Layer Security) for an additional layer of security when working with Splunk. For information on setting up TLS encryption with Splunk, refer to [Securing Splunk Enterprise](https://docs.splunk.com/Documentation/Splunk/latest/Security/AboutsecuringyourSplunkconfigurationwithSSL).

### Basic authentication

The most common authentication method. Use your Splunk username and password to connect. Avoid using the default administration account; create a dedicated user for Grafana with appropriate permissions.

### Authentication token

Use an authentication token generated in Splunk instead of a username and password. Tokens let you provide access to environments without sharing standard credentials.

To configure token authentication:

1. Generate a token in Splunk. Refer to Splunk’s [Create authentication tokens](https://docs.splunk.com/Documentation/Splunk/latest/Security/CreateAuthTokens) documentation.
2. In the data source configuration, enter the token in the **Authentication token** field under **Alternative authentication**.

### Forward OAuth Identity

Forward the logged-in user’s OAuth token to Splunk for authentication. This enables user-level authentication without requiring separate Splunk credentials.

> Note
>
> Forward OAuth Identity is not enabled by default. For Grafana Cloud, contact Grafana Support to enable this feature. For self-managed Grafana Enterprise, enable the `splunkEnableOAuthForwarding` feature toggle in your Grafana configuration.

### TLS configuration

The following TLS options are available:

Expand table

| Setting                             | Description                                                                                                  |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------|
| **Add self-signed certificate**     | Upload a CA certificate for verifying self-signed TLS certificates.                                          |
| **TLS client authentication**       | Toggle on to use mutual TLS. When enabled, provide the **Server name**, **Client cert**, and **Client key**. |
| **Skip TLS certificate validation** | Toggle on to bypass TLS certificate validation. Not recommended for production environments.                 |

### Custom HTTP headers

Add custom HTTP headers to all requests sent to the data source. This is useful for custom authentication or routing requirements.

Expand table

| Setting    | Description            |
|------------|------------------------|
| **Header** | The HTTP header name.  |
| **Value**  | The HTTP header value. |

## Advanced options

The advanced options are available under the **Additional settings** section in the data source configuration.

### Advanced HTTP settings

Expand table

| Setting             | Description                                                                                                                     | Default                      |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------|------------------------------|
| **Allowed cookies** | Specify cookies by name that should be forwarded to the data source. The Grafana proxy strips all forwarded cookies by default. | None                         |
| **Timeout**         | The HTTP request timeout in seconds. This is the Grafana HTTP transport-level timeout, separate from the query timeout.         | Unset (uses Grafana default) |

### Query and performance options

Expand table

| Setting                    | Description                                                                                                                                                                                                                                                          | Default                                |
|----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------|
| **Results limit**          | Maximum number of results returned from each data request.                                                                                                                                                                                                           | No limit (backend safety cap: `10000`) |
| **Preview mode**           | Toggle on to get search results as they become available. Enables polling of the [`jobs/{search_id}/results_preview`](https://docs.splunk.com/Documentation/Splunk/latest/RESTREF/RESTsearch#search.2Fjobs.2F.7Bsearch_id.7D.2Fresults_preview) Splunk API endpoint. | Off                                    |
| **Async queries**          | Toggle on to periodically check for query results instead of waiting for the full result set.                                                                                                                                                                        | Off                                    |
| **Min poll interval**      | Minimum polling interval in milliseconds when preview mode or async queries are enabled.                                                                                                                                                                             | `500`                                  |
| **Max poll interval**      | Maximum polling interval in milliseconds when preview mode or async queries are enabled.                                                                                                                                                                             | `3000`                                 |
| **Auto cancel timeout**    | Number of seconds a job can be inactive before Splunk automatically cancels it. Set to `0` to disable.                                                                                                                                                               | `30`                                   |
| **Timeout in seconds**     | Plugin-level query timeout in seconds. Controls how long a query can run before it is cancelled. Minimum value is `1`.                                                                                                                                               | `30`                                   |
| **Maximum status buckets** | Maximum number of timeline status buckets generated per query. Set to `0` to disable timelines.                                                                                                                                                                      | `300`                                  |
| **Filter internal fields** | Toggle on to hide fields with names matching the internal field pattern.                                                                                                                                                                                             | Off                                    |
| **Internal field pattern** | Regex pattern for identifying internal fields to filter. Only visible when **Filter internal fields** is enabled.                                                                                                                                                    | `^_.+`                                 |
| **Timestamp field**        | Field used by Grafana to determine event timestamps. Refer to [Timestamp and time ranges](https://docs.splunk.com/Documentation/SCS/current/Search/Timestampsandtimeranges) for more information.                                                                    | `_time`                                |
| **Default earliest time**  | Earliest time for searches without a time range, such as template variable queries.                                                                                                                                                                                  | `-1hr`                                 |

### Search mode

There are two search mode settings:

- **Fields search mode:** Sets the search mode for field queries. Options are `quick` and `full`.
- **Variables search mode:** Sets the search mode for variable queries. Options:

  - `fast`: Turns field discovery off for event searches. No event or field data for stats searches.
  - `smart`: Turns field discovery on for event searches. No event or field data for stats searches.
  - `verbose`: Returns all event and field data.

### Secure Socks Proxy

> Note
>
> This setting is only visible when the `secureSocksDSProxyEnabled` feature toggle is enabled in your Grafana configuration and you are running Grafana 10 or later.

Toggle on to route data source traffic through a secure SOCKS proxy.

## Data links

Data links allow you to associate data with other Grafana data sources or external URLs. They are commonly used in Explore mode.

To set up a data link, click **+ Add** under the **Data links** header in data source settings.

Expand table

| Setting           | Description                                                                                                                                                                             |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Field**         | The exact field name or a regular expression pattern that matches the field name.                                                                                                       |
| **Label**         | A meaningful label for the data link.                                                                                                                                                   |
| **Regex**         | A regular expression to parse and capture part of a log message. Wrap the expression in `//` and include one set of brackets for the matching group. To match everything, use `/(.*)/`. |
| **URL**           | Use `${__value.raw}` to reference the captured value.                                                                                                                                   |
| **Internal link** | Toggle on to link to another Grafana data source. Toggle off to link to an external URL.                                                                                                |

Click **+ Add** to add multiple data links. Click the red **X** to remove a link.

## Verify the connection

Click **Save &amp; test** to verify the connection. On success, you see a message like:

**Connected to Splunk version: “9.1.3” build: “d95b3bc7f6d0”**

If the connection fails, refer to [Troubleshoot the Splunk data source](/docs/plugins/grafana-splunk-datasource/latest/troubleshooting/).

## Provision the data source

You can define and configure the Splunk data source in YAML files as part of Grafana’s provisioning system. For more information about provisioning, refer to [Provision Grafana](/docs/grafana/latest/administration/provisioning/#data-sources).

**Basic authentication example:**

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Splunk
    type: grafana-splunk-datasource
    access: proxy
    basicAuth: true
    basicAuthUser: <USERNAME>
    editable: true
    enabled: true
    jsonData:
      fieldSearchType: quick
      internalFieldsFiltration: true
      variableSearchLevel: fast
      previewMode: false
      maxResultCount: 999
    secureJsonData:
      basicAuthPassword: <PASSWORD>
    url: <SPLUNK_URL>
```

**Token authentication example:**

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Splunk
    type: grafana-splunk-datasource
    access: proxy
    editable: true
    enabled: true
    jsonData:
      authType: custom-splunk
      fieldSearchType: quick
      variableSearchLevel: fast
    secureJsonData:
      authToken: <SPLUNK_AUTH_TOKEN>
    url: <SPLUNK_URL>
```

> Note
>
> When using token authentication in provisioning, you must set `authType: custom-splunk` in `jsonData`. Without this, the backend treats the configuration as basic authentication and ignores the `authToken` value.

## Set query results limit

To improve performance, you can limit the number of returned results at multiple levels. The hierarchy from highest to lowest precedence is:

1. The `GF_PLUGIN_GRAFANA_SPLUNK_DATASOURCE_MAX_RESULT_LIMIT` environment variable (self-managed only).
2. The **Results limit** value in data source configuration.
3. The per-query limit set in the query editor.

The default safety cap is `10000` results.

> Note
>
> Grafana Cloud does not support the `GF_PLUGIN_GRAFANA_SPLUNK_DATASOURCE_MAX_RESULT_LIMIT` environment variable. Use the **Results limit** setting in the data source configuration instead.
