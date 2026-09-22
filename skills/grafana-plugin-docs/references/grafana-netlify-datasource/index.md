---
title: "Netlify data source | Grafana Enterprise Plugins documentation"
description: "Query and visualize sites, builds, deploys, forms, and SSL certificate data from Netlify in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Netlify data source

> Note
>
> This plugin is in public preview. Refer to the [Grafana Labs release life cycle documentation](/docs/release-life-cycle/) for details. If you notice any issues or have a feature request, create a support ticket through your Grafana Enterprise support channel.

The Netlify data source plugin lets you query and visualize data from Netlify within Grafana, including your sites, builds, deploys, forms, form submissions, SSL certificates, and account build usage.

> Note
>
> The Netlify data source is an Enterprise plugin. It’s available with a Grafana Cloud Pro or Advanced plan and Grafana Enterprise. For installation instructions, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).

## Supported features

The following table lists the Grafana features supported by the Netlify data source:

Expand table

| Feature     | Supported |
|-------------|-----------|
| Metrics     | Yes       |
| Logs        | No        |
| Traces      | No        |
| Alerting    | No        |
| Annotations | Yes       |

## Requirements

This plugin has the following requirements:

- Grafana v10.4.0 or later.
- A Netlify personal access token.
- A [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated on-prem Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/). Contracted Cloud customers should refer to their agreement.

## Install the plugin

To install the data source, refer to [Installation](/grafana/plugins/grafana-netlify-datasource/?tab=installation).

## Configure the data source

To add the Netlify data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `Netlify` in the search bar.
4. Select **Netlify**.
5. Click **Add new data source**.

### Configure settings

Fill in the following field:

Expand table

| Field    | Description                                     |
|----------|-------------------------------------------------|
| **Name** | A name for this particular Netlify data source. |

### Authentication

This plugin supports bearer token based authentication using a Netlify personal access token. To find your token, [log in to the Netlify portal](https://app.netlify.com/user/applications#personal-access-tokens), then go to **User settings** &gt; **Applications** and locate your token under the **Personal access tokens** section.

Expand table

| Field     | Description                               |
|-----------|-------------------------------------------|
| **Token** | Enter your Netlify personal access token. |

### Verify the connection

Click **Save &amp; test** to verify the connection. If the token is missing or invalid, the test fails with an error such as `invalid/empty bearer token` or a `status code: 401` message.

### Provision the data source

You can define the data source in code and manage it with Grafana’s provisioning system or the Grafana Terraform provider. Both methods use the plugin type `grafana-netlify-datasource` and store the personal access token in the secure key `Netlify.token`.

#### YAML file provisioning

You can configure the data source using YAML configuration files. For more information, including all the settings you can set for this data source, refer to [Provisioning Grafana data sources](/docs/grafana/latest/administration/provisioning/#data-sources).

Here’s a provisioning example for this data source using personal access token authentication:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Netlify
    type: grafana-netlify-datasource
    secureJsonData:
      Netlify.token: <token>
```

#### Terraform provisioning

You can provision the data source with the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs) using the [`grafana_data_source`](https://registry.terraform.io/providers/grafana/grafana/latest/docs/resources/data_source) resource. Store the token in `secure_json_data_encoded` and pass it through a sensitive variable rather than hardcoding it.

hcl [Copy code to clipboard] Copy

```hcl
variable "netlify_token" {
  type      = string
  sensitive = true
}

resource "grafana_data_source" "netlify" {
  type = "grafana-netlify-datasource"
  name = "Netlify"

  secure_json_data_encoded = jsonencode({
    "Netlify.token" = var.netlify_token
  })
}
```

Provide the token value at apply time, for example with the `TF_VAR_netlify_token` environment variable, so the secret stays out of source control.

## Queries

The query editor lets you query Netlify resources through the **Action** field. Select an action, then enter the required and optional parameters where applicable. The editor supports the following actions:

- **Sites:** Retrieve the sites in your Netlify account.
- **Builds:** Retrieve the build processes for a site.
- **Deploys:** Retrieve the deployment history for a site.
- **SSL Certificates:** Retrieve SSL certificate details for a site.
- **List Site Forms:** Retrieve the forms created on a site.
- **Form Submissions:** Retrieve the submissions collected by a form.
- **Account Build Status:** Retrieve build usage for an account.

### Sites

The **Sites** action returns information about each site in your Netlify account, including its unique identifier, name, domain, build settings, and other configuration details.

Expand table

| Parameter  | Required | Description                                            |
|------------|----------|--------------------------------------------------------|
| **Name**   | No       | Filter sites by name.                                  |
| **Filter** | No       | Filter by ownership: **All**, **Owner**, or **Guest**. |

### Builds

The **Builds** action returns details about each build for a site, such as the build ID, state (for example, building, ready, or failed), commit information, and start and finish timestamps.

Expand table

| Parameter   | Required | Description                                                               |
|-------------|----------|---------------------------------------------------------------------------|
| **Site ID** | Yes      | The site to retrieve builds for. Select from the list of available sites. |

### Deploys

The **Deploys** action returns information about each deploy for a site, including the deploy ID, deploy context (for example, production or staging), the deploy state (for example, ready or error), and the URL of the deployed site.

Expand table

| Parameter            | Required | Description                                                                                                                                                                                                                                  |
|----------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Site ID**          | Yes      | The site to retrieve deploys for. Select from the list of available sites.                                                                                                                                                                   |
| **Production**       | No       | Return only production deploys.                                                                                                                                                                                                              |
| **Deploy Previews**  | No       | Return only deploy previews.                                                                                                                                                                                                                 |
| **Latest Published** | No       | Return only the latest published deploy.                                                                                                                                                                                                     |
| **Branch**           | No       | Filter deploys by branch name.                                                                                                                                                                                                               |
| **State**            | No       | Filter by deploy state: **New**, **Pending Review**, **Accepted**, **Rejected**, **Enqueued**, **Building**, **Uploading**, **Uploaded**, **Preparing**, **Prepared**, **Processing**, **Processed**, **Ready**, **Error**, or **Retrying**. |

### SSL Certificates

The **SSL Certificates** action returns details about each certificate for a site, including the certificate ID, domain names, expiration date, and status, helping ensure secure connections for your sites.

Expand table

| Parameter   | Required | Description                                                                                |
|-------------|----------|--------------------------------------------------------------------------------------------|
| **Site ID** | Yes      | The site to retrieve SSL certificate details for. Select from the list of available sites. |

### List Site Forms

The **List Site Forms** action returns information about each form on a site, such as the form ID, name, submission count, and settings.

Expand table

| Parameter   | Required | Description                                                              |
|-------------|----------|--------------------------------------------------------------------------|
| **Site ID** | Yes      | The site to retrieve forms for. Select from the list of available sites. |
| **Query**   | No       | Filter forms by a search query.                                          |

### Form Submissions

The **Form Submissions** action returns details about each submission collected by a form, including the submission ID, form ID, submission data, and timestamps.

Expand table

| Parameter   | Required | Description                                                                              |
|-------------|----------|------------------------------------------------------------------------------------------|
| **Site ID** | Yes      | The site that owns the form. Select from the list of available sites.                    |
| **Form ID** | Yes      | The form to retrieve submissions for. Select a site first to populate the list of forms. |

### Account Build Status

The **Account Build Status** action returns build usage across an account, including the number of builds used and the remaining builds for the current billing cycle, helping you monitor build usage.

Expand table

| Parameter      | Required | Description                                                                          |
|----------------|----------|--------------------------------------------------------------------------------------|
| **Account ID** | Yes      | The account to retrieve build usage for. Select from the list of available accounts. |

### Create a query

To create a query, follow these steps. This example retrieves failed deploys for a site:

1. Add a panel to a dashboard, or open [Explore](/docs/grafana/latest/explore/), and select the Netlify data source.
2. In the **Action** field, select **Deploys**.
3. Select a **Site ID** from the list of available sites.
4. Set **State** to **Error**.
5. Run the query to return the site’s failed deploys.

To narrow or expand the results, adjust the optional parameters for the selected action, such as **Branch** or **Production** for **Deploys**.

### Example use cases

The following use cases show common ways to visualize Netlify data:

- **Track build usage:** Use the **Account Build Status** action to visualize the build minutes used and remaining for the current billing cycle, so you can monitor usage against your plan.
- **Monitor deploy health:** Use the **Deploys** action filtered by **State** to build a table of failed or in-progress deploys across a site.
- **Review SSL certificate expiration:** Use the **SSL Certificates** action to track the `expires_at` field for your sites and identify certificates that need renewal.
- **Audit form submissions:** Use the **Form Submissions** action to build a table of recent submissions for a specific form.
- **Inventory your sites:** Use the **Sites** action to list every site with its domain and build settings for reporting or auditing.

## Known limitations

Due to current limitations of the Netlify API, you can’t filter by time. When you select a dimension, the data source returns data for all dimension values.

Alerting isn’t currently supported.

## Explore your data

Use Explore to run queries and visualize the results as logs or metrics without building a dashboard. For more information, refer to [Explore](/docs/grafana/latest/explore/).

## Templates and variables

Use template variables to build dynamic, reusable dashboards instead of hardcoding values such as site or account IDs. To add a new Netlify query variable, refer to [Add a query variable](/docs/grafana/latest/dashboards/variables/add-template-variables/#add-a-query-variable). Select your Netlify data source, then configure the query using the same **Action** and parameters as the query editor.

### Query variable example

To create a variable that lists your Netlify sites:

1. Navigate to **Dashboard settings** &gt; **Variables** and click **Add variable**.
2. Select **Query** as the variable type.
3. Select your Netlify data source.
4. Set the **Action** to **Sites**.
5. Save the variable. The drop-down is now populated with your sites.

You can create dependent (chained) variables the same way. For example, add a **forms** variable that uses the **List Site Forms** action and references your site variable in the **Site ID** parameter, so the available forms update when you change the selected site.

### Use variables in queries

After you create a variable, reference it in a query parameter using [variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/), such as `$site` or `${site}`. For example, set the **Site ID** parameter of a **Deploys** query to `$site` so the panel follows the site selected in the dashboard drop-down.

For more information about variables, refer to [Templates and variables](/docs/grafana/latest/dashboards/variables/).

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> On Grafana Cloud, the Netlify plugin is managed by Grafana and updates automatically. On self-managed Grafana, you must update Enterprise plugins manually. Refer to [Version and upgrade guidance](/docs/plugins/grafana-netlify-datasource/latest/troubleshooting/#version-and-upgrade-guidance).

## Learn more

- Add [Annotations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).
- Configure and use [Templates and variables](/docs/grafana/latest/dashboards/variables/).
- Add [Transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/).
- [Troubleshoot Netlify data source issues](/docs/plugins/grafana-netlify-datasource/latest/troubleshooting/).
