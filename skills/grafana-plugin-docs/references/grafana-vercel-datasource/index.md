---
title: "Vercel data source plugin | Grafana Enterprise Plugins documentation"
description: "Vercel data source plugin for Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Vercel Grafana data source

> Note
>
> This plugin is in a public preview. Refer [Grafana Labs release life cycle documentation](/docs/release-life-cycle/) for further details. If you notice any issues or having feature request, create a support ticket with your Grafana Enterprise support channel.

The **Vercel** data source plugin for **Grafana** allows you to query and visualize data from Vercel in Grafana.

## Requirements

- A Vercel access token. [Learn more](https://vercel.com/docs/rest-api#creating-an-access-token)
- Any free or paid [Grafana Cloud](/pricing/) plan or an [activated on-prem Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/). Contracted Cloud customers should refer to their agreement.

## Install the plugin

To install the data source, refer to [Installation](/grafana/plugins/grafana-netlify-datasource/?tab=installation).

## Configure the data source in Grafana

[Add a data source](/docs/grafana/latest/datasources/add-a-data-source/) by filling in the following fields:

### Basic fields

Expand table

| Field | Description                                    |
|-------|------------------------------------------------|
| Name  | A name for this particular Vercel data source. |

### Authentication fields

This plugin supports Bear token based authentication. [Log into Vercel portal](https://vercel.com/account/tokens), then click Create Token and set an expiration date. Copy the token and use it as the value for the Token field.

Expand table

| Field | Description                    |
|-------|--------------------------------|
| Token | Enter your Vercel access token |

### Configure the data source with provisioning

It is possible to configure data sources using configuration files with Grafana’s provisioning system. To read about how it works, including all the settings that you can set for this data source, refer to [Provisioning Grafana data sources](/docs/grafana/latest/administration/provisioning/#data-sources)

Here are some provisioning examples for this data source using access key authentication:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Vercel
    type: grafana-vercel-datasource
    secureJsonData:
      vercel.token: your-token-here
```

## Queries

The query editor allows you query - `Access Groups`, `Aliases`, `Artifacts`, `Authentication`, `Checks`, `Deployments`, `Domains`, `Edge Config`, `Log Drains`, `Projects`, `Security`, `Teams` and `Webhooks`. Select the action type and enter required parameters and optional parameters where applicable.
