---
title: "Catchpoint data source for Grafana | Grafana Enterprise Plugins documentation"
description: "Catchpoint Grafana data source Note This plugin is in a public preview. Refer Grafana Labs release life cycle documentation for further details. If you notice any issues or having feature request, create a support ticket with your Grafana Enterprise support channel."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Catchpoint Grafana data source

> Note
>
> This plugin is in a public preview. Refer [Grafana Labs release life cycle documentation](/docs/release-life-cycle/) for further details. If you notice any issues or having feature request, create a support ticket with your Grafana Enterprise support channel.

The Catchpoint data source plugin allows you to query and visualize `Tests`, `RUM` and `SLO` data from within Grafana.

## Requirements

This plugin has the following requirements:

- A Catchpoint account
- Any free or paid [Grafana Cloud](/pricing/) plan or an [activated on-prem Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/). Contracted Cloud customers should refer to their agreement.

## Install the plugin

To install the data source, refer to [Installation](/grafana/plugins/grafana-catchpoint-datasource/?tab=installation).

## Configure the data source in Grafana

[Add a data source](/docs/grafana/latest/datasources/add-a-data-source/) by filling in the following fields:

### Basic fields

Expand table

| Field | Description                                        |
|-------|----------------------------------------------------|
| Name  | A name for this particular Catchpoint data source. |

### Authentication fields

This plugin supports Bear token based authentication. Log into Catchpoint portal, then go to Settings &gt; API and find Rest API V2 Key under the REST API section.

Expand table

| Field  | Description                           |
|--------|---------------------------------------|
| bearer | Enter your Catchpoint REST API v2 key |

### Configure the data source with provisioning

It is possible to configure data sources using configuration files with Grafana’s provisioning system. To read about how it works, including all the settings that you can set for this data source, refer to [Provisioning Grafana data sources](/docs/grafana/latest/administration/provisioning/#data-sources)

Here are some provisioning examples for this data source using access key authentication:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Catchpoint
    type: grafana-catchpoint-datasource
    jsonData:
      authMethod: bearer
    secureJsonData:
      catchpoint.token: <token>
```

## Query the data source

The query editor allows you to write queries - `Tests`, `RUM`, and `SLO`. Select the action type and enter required parameters and optional parameters where applicable.

## Known limitations

Due to limitations of the Catchpoint API at the moment it’s not possible to filter by specific dimension values when using Tests Query. When selecting dimension the data for all dimension values will be returned.

### Explore view

The Explore view allows you to run queries and visualize the results as logs or charts for metrics. For more information about Explore, refer to [Explore](/docs/grafana/latest/features/explore/).

### Templates and variables

To add a new Catchpoint query variable, refer to [Add a query variable](/docs/grafana/latest/variables/variable-types/add-query-variable/). Use your Catchpoint data source as your data source and fill out the `query` field with your query.

After creating a variable, you can use it in your Catchpoint queries using [Variable syntax](/docs/grafana/latest/variables/syntax/). For more information about variables, refer to [Templates and variables](/docs/grafana/latest/variables/).

## Learn more

- Add [Annotations](/docs/grafana/latest/dashboards/annotations/).
- Configure and use [Templates and variables](/docs/grafana/latest/variables/).
- Add [Transformations](/docs/grafana/latest/panels/transformations/).
- Set up alerting; refer to [Alerts overview](/docs/grafana/latest/alerting/).
