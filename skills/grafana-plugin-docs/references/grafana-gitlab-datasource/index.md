---
title: "GitLab data source | Grafana Enterprise Plugins documentation"
description: "Guide for using the GitLab data source plugin in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# GitLab data source

The GitLab data source allows you to visualize and monitor GitLab activity in Grafana. You can track statistics such as top contributors, commits per day, deployments, merge requests, and pipeline status. Combine data from the GitLab API with other sources and use template variables to build dynamic, filterable dashboards.

> Note
>
> The GitLab data source is an Enterprise plugin. It’s available with a [Grafana Cloud Pro or Advanced plan](/pricing/) or with [Grafana Enterprise](/products/enterprise/). For installation instructions, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).

## Supported GitLab environments

The GitLab data source works with:

- **GitLab.com** (SaaS)
- **Self-hosted GitLab** (Community Edition and Enterprise Edition)

> Note
>
> Some features require specific GitLab tiers. For example, audit events require a GitLab Premium or Ultimate subscription, or a self-hosted instance with admin privileges.

## Requirements

- Grafana version 11.6.7 or later
- A GitLab personal access token with the `read_api` scope

## Install the plugin

To install the GitLab data source plugin, refer to [Installation](/grafana/plugins/grafana-gitlab-datasource/?tab=installation).

> Note
>
> The plugin is pre-installed on Grafana Cloud Pro and Advanced instances.

## Supported features

Expand table

| Feature     | Supported |
|-------------|-----------|
| Metrics     | Yes       |
| Alerting    | Yes       |
| Annotations | Yes       |
| Logs        | No        |
| Traces      | No        |

## Supported resource types

The GitLab data source can query the following resource types. For detailed field documentation, refer to the [query editor](/docs/plugins/grafana-gitlab-datasource/latest/query-editor/).

Expand table

| Resource type           | Description                                                         |
|-------------------------|---------------------------------------------------------------------|
| Audit events            | Instance, project, or group audit events (requires GitLab Premium)  |
| Commits                 | Commits from a project, with optional branch/tag filtering          |
| Deployments             | Deployments from a project, filterable by environment and status    |
| Environments            | Environments configured for a project                               |
| Issues                  | Project issues, searchable by title and description                 |
| Labels                  | Labels defined in a project                                         |
| Merge request approvals | Approval details for a specific merge request                       |
| Merge requests          | Merge requests by project, group, or account with extensive filters |
| Pipelines               | CI/CD pipelines with filters for scope, status, source, and more    |
| Projects                | Projects accessible to the configured account                       |
| Releases                | Releases from a project                                             |
| Tags                    | Git tags from a project                                             |
| Users                   | GitLab users (most filters require admin privileges)                |

## Get started

The following documents help you set up and use the GitLab data source:

- [Configure the GitLab data source](/docs/plugins/grafana-gitlab-datasource/latest/configure/)
- [GitLab query editor](/docs/plugins/grafana-gitlab-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-gitlab-datasource/latest/template-variables/)
- [Annotations](/docs/plugins/grafana-gitlab-datasource/latest/annotations/)
- [Alerting](/docs/plugins/grafana-gitlab-datasource/latest/alerting/)
- [Troubleshoot issues](/docs/plugins/grafana-gitlab-datasource/latest/troubleshooting/)

## Additional resources

After configuring the GitLab data source, you can also:

- Create a wide variety of [visualizations](/docs/grafana/latest/panels-visualizations/).
- Configure and use [templates and variables](/docs/grafana/latest/dashboards/variables/).
- Add [transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/).
- Optimize performance with [query caching](/docs/grafana/latest/administration/data-source-management/#query-caching).

## Pre-built dashboards

The GitLab data source includes a pre-built **GitLab Overview** dashboard. To import it:

1. Navigate to the GitLab data source configuration page.
2. Select the **Dashboards** tab.
3. Click **Import** next to the **GitLab Overview** dashboard.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.

## Related resources

- [Official GitLab documentation](https://docs.gitlab.com/)
- [GitLab personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)
- [Grafana community forum](https://community.grafana.com/)
