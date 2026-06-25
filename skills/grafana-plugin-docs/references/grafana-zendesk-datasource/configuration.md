---
title: "Configuration | Grafana Enterprise Plugins documentation"
description: "This document outlines configuration options for the Zendesk data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configuring the Zendesk data source plugin

This document outlines configuration options for the Zendesk data source.

Configuring the Zendesk plugin is a two step process:

1. Installing the zendesk plugin
2. Configuring the zendesk data source

## Installing the Zendesk plugin

To install a plugin, see [Install Grafana plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-plugins).

To install the Zendesk plugin, see [Installation](/grafana/plugins/grafana-zendesk-datasource/?tab=installation) on the Zendesk plugin page.

## Configuring the Zendesk data source

For general information on adding a data source see [Add a data source](/docs/grafana/latest/administration/data-source-management/#add-a-data-source). Only users with the organization `administrator` role can add data sources.

Set the Zendesk data source’s basic configuration options:

Expand table

| Name          | Description                                                                                                                                 |
|---------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**      | The data source name. This is how you refer to the data source in panels and queries.                                                       |
| **Subdomain** | The subdomain of your Zendesk instance. For example, if your Zendesk URL is `https://company.zendesk.com`, then the subdomain is `company`. |
| **Email**     | The email of your Zendesk account.                                                                                                          |
| **Token**     | The API token for your zendesk instance                                                                                                     |

### Configure the data source with provisioning

It is possible to configure data sources using configuration files with Grafana’s provisioning system. To read about how it works, including and all the settings that you can set for this data source, refer to [Provisioning Grafana data sources](/docs/grafana/latest/administration/provisioning/#data-sources).

Here is a provisioning example for this data source:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Zendesk Data Source
    type: grafana-zendesk-datasource
    basicAuth: true
    jsonData:
      services:
        zendesk:
          auth:
            username: '<email_address>'
      variables:
        subdomain: '<zendesk_subdomain>'
    secureJsonData:
      zendesk.password: '<zendesk_api_token>'
```
