---
title: "Configure the Datadog data source | Grafana Enterprise Plugins documentation"
description: "This document outlines configuration options for the Datadog data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Datadog data source

Grafana provides a number of configuration options for Datadog. To install a data source, see [Install Grafana plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-plugins). For general information on adding a data source see [Add a data source](/docs/grafana/latest/administration/data-source-management/#add-a-data-source).

Only users with the organization `administrator` role can add data sources. Administrators can also configure the data source via YAML with [Grafana’s provisioning system](/docs/grafana/latest/administration/provisioning/).

To install the Datadog plugin, see [Installation](/grafana/plugins/grafana-datadog-datasource/?tab=installation) on the Datadog plugin page.

## Configure the data source

To add the Datadog data source, complete the following steps:

1. Install the Datadog plugin.
2. Click **Connections** in the left-side menu.
3. Under **Connections**, click **Add new connection**.
4. Enter **Datadog** in the search bar.
5. Select **Datadog** under the **Data Source** section.
6. Click **Add new data source** in the upper right.

You will be taken to the **Settings** tab where you will set up your Datadog configuration.

Note that these instructions are for Grafana version 10.x.

## Configuration options

The following is a list configuration options for Datadog.

The first option to configure is the name of your connection:

- **Name** - The data source name. This is how you refer to the data source in panels and queries. Examples: Datadog\_Metrics, Datadog-1.
- **Default** - Toggle to set as the default data source when creating queries.

### Connection

You can connect to Datadog via 2 different connection modes, **Default** or **Hosted Datadog metrics**.

- **Mode** - Select your connection mode for Datadog.

  - **Default** - Click to connect to Datadog API endpoints.
  - **Hosted Datadog metrics** - This mode is now deprecated. Refer to [Datadog proxy documentation](/docs/grafana-cloud/send-data/metrics/metrics-datadog/#send-or-visualize-datadog-metrics) for more information.
- **API URL / Region** - *Use with Default mode*. Select your Grafana Cloud region or site URL, or your API URL. Examples: [https://us3.datadoghq.com](https://us3.datadoghq.com), https://api/datadohq.com.

### Authentication

The way you authenticate depends on your connection method.

If you connect using **Default mode**, you will need to configure the following to authenticate:

- **API key** - Enter the Datadog API key unique to your organization. To generate an API key see To generate a Datadog API key see [Add an API key or client token](https://docs.datadoghq.com/account_management/api-app-keys/#add-an-api-key-or-client-token). For more information regarding API keys see [API and Application Keys](https://docs.datadoghq.com/account_management/api-app-keys/) in Datadog’s documentation.
- **App key** - Enter the Datadog application key unique to your organization. The application key works in conjunction with the API key to grant user access. To generate an application key see [Add application keys](https://docs.datadoghq.com/account_management/api-app-keys/?s=data%20dog%20data%20lnks#add-application-keys). For more information regarding application keys see [Application keys](https://docs.datadoghq.com/account_management/api-app-keys/#application-keys) in Datadog’s documentation.

## Additional settings

Additional settings are optional settings that you can configure for more control over your Datadog data source.

- **API rate limits** - Limit access to the Datadog API.

  - **Show API rate limits** - Check the box to show Datadog API limits for each queried endpoint. To view API rate limits go to the Query Inspector in Explore, select the JSON option, and set select source to DataFrame structure.
  - **Enable API rate limit threshold** -Check the box to enable rate limiting. Datadog queries will stop once the threshold is reached.
  - **API rate limit threshold %** - Enter a threshold percentage in the box. When the API hits the rate limit percent specified, the plugin blocks subsequent requests until the next reset. The default is `100`.
- **Disable data links** - Check the box to disable data links. Data links create links between panels, and can take users directly to relevant locations (URLs) in Datadog when they interact with panels.
- **Size** - Size – Sets the maximum number of metrics to return when querying the metric list and host list

Once you have configured your Datadog data source options, click **Save &amp; test** at the bottom to test out your data source connection. You can also remove a connection by clicking **Delete**.

## Configure the data source with provisioning

Configure the Datadog data source using configuration files with Grafana’s provisioning system. To learn more about how the provisioning system works, including all of the data source settings, refer to [Provisioning Grafana](/docs/grafana/latest/administration/provisioning/#datasources).

You can define and configure the Datadog data source in YAML files as part of Grafana’s provisioning system. For more information about provisioning a data source, and for available configuration options, see [Provision Grafana](/docs/grafana/latest/administration/provisioning/#datasources).

The following example is for provisioning the Datadog data source:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: DATADOG
    type: grafana-datadog-datasource
    jsonData:
      url: https://api.datadoghq.com
      logApiRateLimits: false
      rateLimitEnabled: false
      rateLimitMetrics: 100
      disableDataLinks: false
    secureJsonData:
      apiKey: xxxxxxxxxxxx (enter your datadog api key here)
      appKey: xxxxxxxxxxxx (enter your datadog application key here)
```
