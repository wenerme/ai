---
title: "Azure DevOps data source | Grafana Enterprise Plugins documentation"
description: "Use the Azure DevOps data source to query and visualize Azure DevOps projects, repositories, builds, pipelines, and releases in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Azure DevOps data source

The Azure DevOps data source lets you query and visualize data from [Azure DevOps](https://learn.microsoft.com/en-us/azure/devops/) within Grafana. You can monitor projects, repositories, pull requests, builds, pipelines, releases, and deployments across your organization.

> Note
>
> The Azure DevOps data source is an Enterprise plugin. It’s available with a Grafana Cloud Pro or Advanced plan and Grafana Enterprise. For installation instructions, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).

## Supported features

Expand table

| Feature     | Supported |
|-------------|-----------|
| Metrics     | Yes       |
| Annotations | Yes       |
| Alerting    | No        |
| Logs        | No        |
| Traces      | No        |

## Supported Azure DevOps APIs

The plugin retrieves data from the following Azure DevOps REST APIs:

Expand table

| Service   | API                  |
|-----------|----------------------|
| Core      | Projects - List      |
| Git       | Repositories - List  |
| Git       | Pull Requests - List |
| Build     | Builds - List        |
| Build     | Definitions - List   |
| Pipelines | Pipelines - List     |
| Pipelines | Runs - List          |
| Release   | Definitions - List   |
| Release   | Deployments - List   |
| Release   | Releases - List      |

## Known limitations

- Template variables don’t support multi-select. Only single selection is supported.
- Alerting isn’t supported.

## Get started

The following pages help you set up and use the Azure DevOps data source:

- [Configure the Azure DevOps data source](/docs/plugins/grafana-azuredevops-datasource/latest/configure/)
- [Azure DevOps query editor](/docs/plugins/grafana-azuredevops-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-azuredevops-datasource/latest/template-variables/)
- [Annotations](/docs/plugins/grafana-azuredevops-datasource/latest/annotations/)
- [Troubleshoot Azure DevOps data source issues](/docs/plugins/grafana-azuredevops-datasource/latest/troubleshooting/)

## Additional features

After you configure the data source, you can:

- Use [Explore](/docs/grafana/latest/explore/) to run ad-hoc queries without building a dashboard.
- Add [Transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- Use [Annotations](/docs/plugins/grafana-azuredevops-datasource/latest/annotations/) to overlay Azure DevOps events on your dashboards.

## Pre-built dashboards

The Azure DevOps plugin includes two pre-built dashboards:

Expand table

| Dashboard           | Description                                                                                   |
|---------------------|-----------------------------------------------------------------------------------------------|
| Project overview    | Displays a summary of projects, repositories, builds, and pipelines across your organization. |
| Repository overview | Displays repository details including pull request activity.                                  |

To import the pre-built dashboards:

1. In Grafana, navigate to **Connections** &gt; **Data sources**.
2. Select your Azure DevOps data source.
3. Click the **Dashboards** tab.
4. Click **Import** next to the dashboard you want to add.

These dashboards are provided for demonstration purposes and may not cover all use cases.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.

## Related resources

- [Azure DevOps REST API documentation](https://learn.microsoft.com/en-us/rest/api/azure/devops/)
- [Grafana community forum](https://community.grafana.com/)
