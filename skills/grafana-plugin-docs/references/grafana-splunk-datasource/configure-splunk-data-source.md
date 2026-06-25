---
title: "Configure the Splunk data source | Grafana Enterprise Plugins documentation"
description: "This document outlines configuration options for the Splunk data source."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Splunk data source

Grafana provides a number of configuration options for Splunk. Only users with the administrator role can add data sources to Grafana.

## Add the Splunk data source

To install a data source, refer to [Install Grafana plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-plugins). For general information on adding a data source see [Add a data source](/docs/grafana/latest/administration/data-source-management/#add-a-data-source).

To add the Splunk data source, complete the following steps:

1. Click **Connections** in the left-side menu.
2. Under **Connections**, click **Add new connection**.
3. Enter `Splunk` in the search bar.
4. Select **Splunk data source**.
5. Click **Create a Splunk data source** in the upper right.

You will be taken to the **Settings** tab where you will set up your Splunk configuration.

## Configuration options

Following is a list of configuration options for Splunk.

The first option to configure is the name of your connection:

- **Name** - The data source name. This is how you refer to the data source in panels and queries. Examples: Splunk-1, Splunk\_data.
- **Default** - Toggle to select as the default name in dashboard panels. When you go to a dashboard panel this will be the default selected data source.

### HTTP section

- **URL** - The URL of your Splunk server. If your Splunk server is local, use `<http://localhost:8089>`. If it is on a server within a network, this is the URL with port number where you are running Prometheus. Example: `<http://splunk-server.example.orgname:8089>`.
- **Allowed cookies** - Specify cookies by name that should be forwarded to the data source. Cookies will be included in the `Cookies` HTTP header as a comma-separated list of `key=value` pairs, where `key`s are the names you specify in this field and `value`s their respective values stored in your browser. If the field is not set, the Grafana proxy deletes all forwarded cookies by default.
- **Timeout** - The HTTP request timeout. This must be in seconds. There is no default, so this setting is up to you.

### Auth section

There are several authentication methods you can choose in the Authentication section.

> Note
>
> Use TLS (Transport Layer Security) for an additional layer of security when working with Splunk. For information on setting up TLS encryption with Splunk see [Securing Splunk Enterprise](https://docs.splunk.com/Documentation/Splunk/9.1.0/Security/AboutsecuringyourSplunkconfigurationwithSSL).

- **Basic authentication** - The most common authentication method. Use your Splunk user name and Splunk password to connect. Avoid using the default administration account. (Alternatively, you can use an authentication token in the Splunk details section).
- **Alternative authentication** - Authentication tokens are a method for authenticating Splunk platform users into the Splunk platform. Tokens let you provide access to environments without having to provide the standard types of credentials. Read more in [Splunk documentation.](https://docs.splunk.com/Documentation/Splunk/9.0.4/Security/CreateAuthTokens)
- **Add self-signed-certificate** - Authenticate with a CA certificate. Follow the instructions of the CA (Certificate Authority) to download the certificate file. Required for verifying self-signed TLS certificates.
- **TLS client authentication** - Toggle on to use client authentication. When enabled, add the `Server name`, `Client cert` and `Client key`. The client provides a certificate that is validated by the server to establish the client’s trusted identity. The client key encrypts the data between client and server.
- **Skip TLS certificate validation** - Toggle on to bypass TLS certificate validation.

### Custom HTTP headers

You can configure custom HTTP header data sources that are managed by Grafana’s provisioning. Doing so allows you to add HTTP headers to all requests that go to that data source.

- **Header** - Add a custom header.
- **Value** - Add a custom header value.

## Alternative authentication

- **Authentication token** - Use an authentication token generated in a Splunk dashboard instead of a username and password.

## Advanced options

- **Results limit** - Sets a limit for returned results from each data request.
- **Preview mode** - Toggle on to get search results as they become available. Under the hood, this option enables polling of the [`jobs/{search_id}/results_preview`](https://docs.splunk.com/Documentation/Splunk/latest/RESTREF/RESTsearch#search.2Fjobs.2F.7Bsearch_id.7D.2Fresults_preview) Splunk API endpoint.
- **Async queries** - Toggle on to periodically check for query results.
- **Auto cancel timeout** - Number of seconds that a job can be inactive before it is automatically canceled. Set to `0` to disable auto cancel. The default is `30 seconds`.
- **Timeout** - Grafana timeout in seconds which controls how long a query can run before it is cancelled. Minimum value is `1`.
- **Maximum status buckets** - Maximum number of timeline status buckets generated per query. Set to `0` to disable timelines. The default is `30 seconds`.
- **Filter internal fields** - Toggle on to hide fields with names that start with `_`.
- **Time stamp field** - Field used by Grafana to determine event timestamps. For more information see [Timestamp and time ranges](https://docs.splunk.com/Documentation/SCS/current/Search/Timestampsandtimeranges).
- **Search mode** - There are 2 search modes, `fields` search mode and `variables` search mode.

  - **Set fields search mode** - Sets the search mode for fields. Options are `quick` and `full`.
  - **Set variables search mode** - Sets the search mode for variables. Options include:

    - `fast` - Turn field discovery off for event searches. No event or field data for stats searches.
    - `smart` - Turn field discovery on for event searches. No event or field data for stats searches.
    - `verbose` - All event and field data.
- **Default earliest time** - Earliest time for searches without time range, such as template variable queries. The default is `-1hr`.

## Data links

Data links are typically used in Grafana’s `Explore` mode. The data displays a link that allows you to associate data internally with other Grafana data sources, or externally with data via a URL.

Set up a data link by clicking the **+ Add** button under the Data links header in data source settings.

- **Field** - Can be the exact field name or a regex pattern that will match on the field name.
- **Label** - Add to provide a meaningful label to the data matched in the regex.
- **Regex** - Use regex to parse and capture a part or key word of a log message. The regex is a matching regex, so you must provide one set of brackets for the matching expression. To match everything, use `/(.*)/`. You must wrap the regex in `//`.
- **URL** - Use the variable `${__value.raw}` to hold the value of the data parsed out with the regex. Use this to construct a URL.
- **Internal link** - Toggle on to use an external link and link one data source to another data source within Grafana. Toggle off internal link to link to a URL that is based on the value parsed out of the Splunk logs.

Click **+ Add** to add multiple data links. Click the red `X` to remove previously added links.

## Provision the Splunk data source

You can define and configure the Splunk data source in YAML files as part of Grafana’s provisioning system. For more information about provisioning a data source, and for available configuration options, see [Provision Grafana](/docs/grafana/latest/administration/provisioning/#data-sources).

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Splunk
    type: grafana-splunk-datasource
    access: proxy
    basicAuth: true
    basicAuthUser: user
    editable: true
    enabled: true
    jsonData:
      advancedOptions: true
      fieldSearchType: quick
      internalFieldsFiltration: true
      tlsSkipVerify: true
      variableSearchLevel: fast
      previewMode: false
      clusteringStrategy: 1
      maxResultCount: 999
    secureJsonData:
      basicAuthPassword: password
    url: splunk url
    version: 1
```

## Set query results limit

To increase overall application performance you can limit the number of returned results on a few levels. The `GF_PLUGIN_GRAFANA_SPLUNK_DATASOURCE_MAX_RESULT_LIMIT` environmental variable takes precedence over any value set in the data source config, which is above the limit set per query. The default value is `10000`.

Plugins running on grafana cloud do not support `GF_PLUGIN_GRAFANA_SPLUNK_DATASOURCE_MAX_RESULT_LIMIT` and will only use the value passed into “Results limit” via the configuration page.
