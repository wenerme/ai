---
title: "Looker data source plugin for Grafana | Grafana Enterprise Plugins documentation"
description: "Looker data source plugin for Grafana The Looker data source plugin for Grafana allows you to visualize data from Looker in Grafana. Project status Note: This plugin is in public preview. Refer Grafana Labs release life cycle documentation for further details. If you notice any issues or having feature request, create a support ticket with your Grafana Enterprise support channel."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Looker data source plugin for Grafana

The **Looker** data source plugin for **Grafana** allows you to visualize data from Looker in Grafana.

## Project status

> **Note**: This plugin is in public preview. Refer [Grafana Labs release life cycle documentation](/docs/release-life-cycle/) for further details. If you notice any issues or having feature request, create a support ticket with your Grafana Enterprise support channel.

## Pre-Requisites

- Valid Grafana Enterprise License. Visit [Grafana pricing](/pricing) for more details
- Valid Looker account and API credentials. Visit [Looker docs](https://cloud.google.com/looker/docs/api-auth) for more details

### Getting Looker API credentials

In order to connect Grafana Looker data source instance with Looker, you need details about your Looker environment and credentials. You can generate the Looker API credentials (`client_id` and `client_secret`) by following the guidelines specified in the [Looker documentation](https://cloud.google.com/looker/docs/api-auth).

Typically the workflow wil be, **Looker -&gt; Admin -&gt; User -&gt; Select user -&gt; Edit keys (API keys) -&gt; New API key**

## Configure the data source in Grafana

Add a Looker data source by filling the following information.

Expand table

| Field                | Description              | Example value                                         |
|----------------------|--------------------------|-------------------------------------------------------|
| Looker URL           | Looker instance base URL | `https://00001234-1234-1ab2-1234-a1b2c3d4.looker.app` |
| Looker Client ID     | Looker client ID         | `1234abcdXyZ567`                                      |
| Looker Client Secret | Looker client secret     | `EAiHBw4ngGLQidMtWeH4U8cE1`                           |

More details about data source configuration can be found [here](/docs/grafana/latest/administration/data-source-management/).

### Configure the Looker data source with provisioning

It is possible to configure data sources using configuration files with Grafana’s provisioning system. To learn more, read about how it works and about all the settings for data sources at Provisioning Grafana.

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Looker Prod
    type: grafana-looker-datasource
    jsonData:
      base_url: https://00001234-1234-1ab2-1234-a1b2c3d4.looker.app
      client_id: 1234abcdXyZ567
    secureJsonData:
      client_secret: EAiHBw4ngGLQidMtWeH4U8cE1
```

More details about provisioning data sources can be found [here](/docs/grafana/latest/administration/provisioning/#data-sources)

## Querying Looker

With Looker data source for Grafana, you can query Looker in following ways. These are referred as **Query Type** in the looker data source query editor.

### LookML

You can execute a LookML Query via the **LookML** query type. You have a option to build a basic LookML query json via the builder, or you can enter the advanced raw LookML JSON. Under the hood, the data source uses the [Looker RunInlineQuery API](https://developers.looker.com/api/explorer/4.0/methods/Query/run_inline_query).

Expand table

| Field                     | Description                                     |
|---------------------------|-------------------------------------------------|
| Model                     | LookML model name                               |
| Explore Name              | LookML view name                                |
| Dimensions &amp; Measures | LookML fields. Supports dimensions and measures |
| Pivots                    | LookML pivot fields.                            |
| Custom measures           | Custom measures on fields                       |
| Filter Expression         | Custom filter expression                        |

### Run Look

Instead building a new LookML Query, you can choose **Run Look** to run the saved Look.

Expand table

| Field   | Description    |
|---------|----------------|
| Look ID | ID of the look |

### Macros in queries

You can use following macros in the query to filter the data. When used with `LookML JSON` mode, you can use the macro anywhere within the JSON. When used with `LookML Builder` mode, you can use the macro in filter expression only.

Expand table

| Macro Syntax                  | Description                                                                                               | Example                                      | Expands to                                                                                                                              |
|-------------------------------|-----------------------------------------------------------------------------------------------------------|----------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| `$__timeFilter(<Field Name>)` | This macro is useful when you want to restrict the results based on a time field and dashboard time range | `$__timeFilter(basic_users.created_at_time)` | `${basic_users.created_at_time} >= date_time(2022,12,31,13,59,59) AND ${basic_users.created_at_time} <= date_time(2023,12,31,13,59,59)` |
| `$__timeFrom()`               | Replace with dashboard **from time**                                                                      | `$__timeFrom()`                              | `date_time(2022,12,31,13,59,59)`                                                                                                        |
| `$__timeTo()`                 | Replace with dashboard **to time**                                                                        | `$__timeTo()`                                | `date_time(023,12,31,13,59,59)`                                                                                                         |

## Templates and variables

To add a new Looker query variable, refer to [Add a query variable](/docs/grafana/latest/dashboards/variables/add-template-variables/). Use your Looker data source as your data source for the following available queries.

### LookML models

This template variable query type will return the list of LookML models the datasource have access to.

### LookML models explores

This template variable query type will return the list of LookML explores for any given model.

## Known limitations

Using variables in the Looker query builder is currently not supported.

## More details

- [Looker](https://cloud.google.com/looker)
- [Looker API](https://developers.looker.com/api/explorer/4.0/methods/Query/run_inline_query?sdk=go)
- [Looker Authentication](https://cloud.google.com/looker/docs/api-auth)
