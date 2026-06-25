---
title: "SolarWinds data source plugin | Grafana Enterprise Plugins documentation"
description: "SolarWinds data source plugin for Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# SolarWinds data source plugin

SolarWinds Grafana Enterprise data source plugin

The **SolarWinds** data source plugin for **Grafana** allows you to query and visualize data from SolarWinds in Grafana.

> Note
>
> Grafana **SolarWinds** enterprise data source plugin is currently in [public preview](/docs/release-life-cycle/). Grafana Labs offers limited support, and breaking changes might occur prior to the feature being made generally available.

## Key features

SolarWinds is a network and infrastructure monitoring platform that provides tools to monitor, manage network performance, server health, and application availability.

The SolarWinds data source plugin enables you to query and visualize key infrastructure metrics such as CPU Load, Memory usage and Active Alerts directly within Grafana dashboards. This integration allows teams to correlate infrastructure health with application performance, enabling proactive monitoring and faster incident response across hybrid and multi-cloud environments.

## Requirements

This plugin has the following requirements:

- A SolarWinds instance with username and password.
- Access to Enterprise plugins. Note: these plugins are also available in the Free tier of [Grafana Cloud](/products/cloud/). For more information, see our [Pricing](/pricing/).

## Known Limitations

The plugin currently does not support:

- Visual query editor

## Install the plugin

To install the data source, refer to the [Installation guide](/grafana/plugins/grafana-logicmonitor-datasource/?tab=installation).

Verify that the plugin is installed

1. In Grafana Enterprise from the left-hand menu, navigate to Connections &gt; Data sources.
2. From the top-right corner, click the Add data source button.
3. Search for SolarWinds in the search field, and hover over the SolarWinds search result.
4. Click the Select button for SolarWinds.

   - If you can click the Select button, then it is installed.
   - If the button is missing or disabled, then the plugin is not installed. Check to see if your Grafana Enterprise license is valid, and reinstall the plugin. If you still need help, contact Grafana Labs.

Note: On Grafana Cloud, it can take up to 15 minutes to see the data source plugin within Grafana.

## Configure the data source in Grafana

Follow the [add a data source](/docs/grafana/latest/administration/data-source-management/) guide and fill out the following fields:

### Basic fields

Expand table

| Field | Description                                                        |
|-------|--------------------------------------------------------------------|
| Name  | A name for this particular SolarWinds data source.                 |
| URL   | Where your SolarWinds instance is hosted, e.g. https://\[hostname] |

### Authentication fields

Expand table

| Field    | Description                                              |
|----------|----------------------------------------------------------|
| Username | The username used to connect to your SolarWind instance. |
| Password | The password used to connect to the SolarWind Instance.  |

\** If you are using a self-signed certificate on your SolarWinds instance, you will need to check the `Add self-signed certificate` or `Skip TLS certificate validation` checkbox.

### Configure the data source with provisioning

It is possible to configure data sources using configuration files with Grafana’s provisioning system. To read about how it works, including all the settings that you can set for this data source, refer to [Provisioning Grafana data sources](/docs/grafana/latest/administration/provisioning/#data-sources).

Here are some provisioning examples for this data source:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: SolarWinds
    type: grafana-solarwinds-datasource
    jsonData:
      url: https://<hostname>
      username: <username>
    secureJsonData:
      password: <password>
```

Replace &lt;hostname&gt; with the hostname of your SolarWinds instance, &lt;username&gt; with your SolarWinds username, and &lt;password&gt; with your SolarWinds password.

## Query the data source

The SolarWinds data source supports SWQL queries through a text interface, allowing users to leverage the full power of the SolarWinds API directly within Grafana.

The SWQL Query option in the query builder’s `Action` dropdown will be automatically selected, and then you can enter your query into the `SWQL Query` textbox. Be sure to adhere to the same SWQL format accepted by the Solarwinds API.

### Explore view

The Explore view allows you to run queries and visualize the results as logs or charts for metrics. For more information about Explore, refer to [Explore](/docs/grafana/latest/features/explore/).

### Templates and variables

To add a new SolarWinds query variable, refer to [Add a query variable](/docs/grafana/latest/variables/variable-types/add-query-variable/). Use your SolarWinds data source and fill out the `Query` field with your desired SolarWinds query.

After creating a variable, you can use it in your SolarWinds queries using [Variable syntax](/docs/grafana/latest/variables/syntax/). For more information about variables, refer to [Templates and variables](/docs/grafana/latest/variables/).

## SWQL documentation:

- [Use SWQL](https://support.solarwinds.com/SuccessCenter/s/article/Use-SolarWinds-Query-Language-SWQL?language=en_US)
- [SWQL built-in function](https://github.com/solarwinds/OrionSDK/wiki/SWQL-Functions)
- [SWQL examples for new widget](https://documentation.solarwinds.com/en/success_center/orionplatform/content/core-fusion-swql-data-model-examples.htm)
