---
title: "Jira data source | Grafana Enterprise Plugins documentation"
description: "Learn about the Jira data source plugin for Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Jira data source

Jira is an issue tracking, project management, and workflow automation tool. Get the whole picture of your development process by combining issue data from Jira with application performance data from other sources.

> Note
>
> The Jira data source plugin is an Enterprise plugin that requires either a Grafana Cloud account or an activated Grafana Enterprise license.

## Supported Jira environments

You can use the Jira data source plugin to connect to the following Jira environments:

- Jira Cloud
- Jira Data Center
- Jira Server

The plugin also supports Jira Service Management fields, including SLA metrics, approvals, and customer feedback.

## Requirements

Before you configure the Jira data source, you need the following:

- Grafana version 11.0 or later.
- An Atlassian account with access to a Jira project.
- Any free or paid [Grafana Cloud](/pricing/) plan or an [activated on-prem Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/). Contracted Cloud customers should refer to their agreement.
- A Jira API token for authentication. To create a token, refer to [Manage API tokens for your Atlassian account](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/).
- For Jira Cloud, Data source can be configured with API Token with Scopes using Cloud Id. To use Jira API token with scopes refer to [Get the cloudid for your site](https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/#3-1-get-the-cloudid-for-your-site)
- Port 8080 enabled

## Known limitations

Custom field types from Jira add-ons may not be supported.

## Import a dashboard

The Jira data source plugin includes the following pre-built dashboards:

- **Jira Demo** - A demonstration dashboard showcasing velocity charts, sprint burndown, issue counts, and time-to-resolution metrics.
- **Jira JSON Fields demo** - Examples demonstrating how to work with complex Jira fields that return JSON data.

> Note
>
> These dashboards are starting points that demonstrate the data source’s capabilities. You’ll need to customize the JQL queries, project keys, and field names to match your Jira instance before the dashboards display your data.

To import a dashboard:

1. Go to **Connections** &gt; **Data sources**.
2. Select your Jira data source.
3. Click the **Dashboards** tab.
4. Click **Import** next to the dashboard you want to use.
5. Edit each panel to update the JQL queries with your project keys and field names.

For more information about importing dashboards, refer to [Import a dashboard](/docs/grafana/latest/dashboards/build-dashboards/import-dashboards/).

## Get started

The following documents will help you get started with the Jira data source:

- [Configure the Jira data source](/docs/plugins/grafana-jira-datasource/latest/configure/)
- [Jira query editor](/docs/plugins/grafana-jira-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-jira-datasource/latest/template-variables/)
- [Troubleshooting](/docs/plugins/grafana-jira-datasource/latest/troubleshooting/)

## Additional features

Once you have configured the data source, you can:

- Add [Annotations](/docs/plugins/grafana-jira-datasource/latest/annotations/) to overlay Jira events on your graphs.
- Configure and use [Template variables](/docs/plugins/grafana-jira-datasource/latest/template-variables/) for dynamic dashboards.
- Add [Transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/).
- Set up [Alerting](/docs/plugins/grafana-jira-datasource/latest/alerting/) to monitor your Jira data.

## Plugin updates

To update the plugin, refer to [Update a plugin](/docs/grafana/latest/administration/plugin-management/#update-a-plugin).

> Note
>
> If you’re using Grafana Cloud, plugins are updated automatically.
