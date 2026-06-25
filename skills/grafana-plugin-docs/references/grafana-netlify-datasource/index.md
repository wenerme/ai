---
title: "Netlify data source for Grafana | Grafana Enterprise Plugins documentation"
description: "Netlify Grafana data source Note This plugin is in a public preview. Refer Grafana Labs release life cycle documentation for further details. If you notice any issues or having feature request, create a support ticket with your Grafana Enterprise support channel."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Netlify Grafana data source

> Note
>
> This plugin is in a public preview. Refer [Grafana Labs release life cycle documentation](/docs/release-life-cycle/) for further details. If you notice any issues or having feature request, create a support ticket with your Grafana Enterprise support channel.

The Netlify data source plugin allows you to query and visualize data from Netlify within Grafana.

## Requirements

This plugin has the following requirements:

- A Netlify Personal access tokens
- Any free or paid [Grafana Cloud](/pricing/) plan or an [activated on-prem Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/). Contracted Cloud customers should refer to their agreement.

## Install the plugin

To install the data source, refer to [Installation](/grafana/plugins/grafana-netlify-datasource/?tab=installation).

## Configure the data source in Grafana

[Add a data source](/docs/grafana/latest/datasources/add-a-data-source/) by filling in the following fields:

### Basic fields

Expand table

| Field | Description                                     |
|-------|-------------------------------------------------|
| Name  | A name for this particular Netlify data source. |

### Authentication fields

This plugin supports Bear token based authentication. [Log into Netlify portal](https://app.netlify.com/user/applications#personal-access-tokens), then go to User Settings &gt; OAuth and find your Token under the Personal Access Tokens section.

Expand table

| Field | Description                              |
|-------|------------------------------------------|
| Token | Enter your Netlify Personal access token |

### Configure the data source with provisioning

It is possible to configure data sources using configuration files with Grafana’s provisioning system. To read about how it works, including all the settings that you can set for this data source, refer to [Provisioning Grafana data sources](/docs/grafana/latest/administration/provisioning/#data-sources)

Here are some provisioning examples for this data source using access key authentication:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Netlify
    type: grafana-netlify-datasource
    secureJsonData:
      Netlify.token: <token>
```

## Queries

The query editor allows you query - `Sites`, `Builds`, `Deploys`, `SSL Certificates`, `Forms`, `Form Submissions` and `Account Build Status`. Select the action type and enter required parameters and optional parameters where applicable.

### Sites

The Sites action allows you to manage all the sites within your Netlify account. It returns information about each site, including its unique identifier, name, domain, build settings, and other configuration details.

### Builds

The Builds action provides access to the build processes for your sites. It returns details about each build, such as the build ID, state (e.g., building, ready, failed), commit information, and timestamps for when the build started and finished.

### Deploys

The Deploys action lets you interact with the deployment history of your sites. It returns information on each deploy, including deploy ID, deploy context (e.g., production, staging), the state of the deploy (e.g., ready, error), and the URL of the deployed site.

### SLL Certificates

The SSL Certificates action allows you to manage SSL certificates for your sites. It returns details about each certificate, including the certificate’s ID, domain names, expiration date, and status, helping ensure secure connections for your sites.

### List Site Forms

The Forms action enables you to manage the forms created on your Netlify sites. It returns information about each form, such as the form ID, name, submission count, and settings, facilitating easy access and management of form configurations.

### Form Submissions

The Form Submissions action provides access to the submissions collected via your Netlify forms. It returns details about each submission, including submission ID, form ID, submission data, and timestamps, allowing you to review and process form entries.

### Account Build Status

The Account Build Status action gives an overview of the build status across your entire Netlify account. It returns information on the build quotas, including the number of builds used and the remaining builds for the current billing cycle, helping you monitor your account’s build usage.

## Known limitations

Due to limitations of the Netlify API at the moment it’s not possible to filter by time. When selecting dimension the data for all dimension values will be returned.

Alerting is not currently supported at this time.

## Explore view

The Explore view allows you to run queries and visualize the results as logs or charts for metrics. For more information about Explore, refer to [Explore](/docs/grafana/latest/features/explore/).

## Templates and variables

To add a new Netlify query variable, refer to [Add a query variable](/docs/grafana/latest/variables/variable-types/add-query-variable/). Use your Netlify data source as your data source and fill out the `query` field with your query.

After creating a variable, you can use it in your Netlify queries using [Variable syntax](/docs/grafana/latest/variables/syntax/). For more information about variables, refer to [Templates and variables](/docs/grafana/latest/variables/).

## Learn more

- Add [Annotations](/docs/grafana/latest/dashboards/annotations/).
- Configure and use [Templates and variables](/docs/grafana/latest/variables/).
- Add [Transformations](/docs/grafana/latest/panels/transformations/).
