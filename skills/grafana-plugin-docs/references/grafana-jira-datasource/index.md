---
title: "Jira data source | Grafana Enterprise Plugins documentation"
description: "Learn about the Jira data source plugin for Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Jira data source

Jira is an issue tracking, project management, and workflow automation tool. Get the whole picture of your development process by combining issue data from Jira with application performance data from other sources.

> Note
>
> The Jira data source is an Enterprise plugin. It’s available with a Grafana Cloud Pro or Advanced plan and Grafana Enterprise. Some Pro plans need the Enterprise Plugins add-on. Contracted Cloud customers should refer to their agreement.

## Supported features

Expand table

| Feature     | Supported |
|-------------|-----------|
| Metrics     | Yes       |
| Logs        | No        |
| Traces      | No        |
| Alerting    | Yes       |
| Annotations | Yes       |

## Supported Jira environments

You can use the Jira data source plugin to connect to the following Jira environments:

- Jira Cloud
- Jira Data Center
- Jira Server

The plugin also supports Jira Service Management fields, including SLA metrics, approvals, and customer feedback. For how to query these fields, refer to [Jira Service Management fields](/docs/plugins/grafana-jira-datasource/latest/query-editor/#jira-service-management-fields).

## Requirements

Before you configure the Jira data source, you need the following:

- Grafana version 11.6.7 or later.
- A [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/). Free and Starter plans don’t include Enterprise plugins. Some Pro plans need the Enterprise Plugins add-on. Contracted Cloud customers should refer to their agreement.
- An Atlassian account with access to a Jira project.
- Authentication: a Jira API token for **Basic Auth**, or **OAuth 2.0 (service account)** for Jira Cloud (plugin 2.6.0 or later). To create a token, refer to [Manage API tokens for your Atlassian account](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/). For OAuth setup, refer to [Configure the Jira data source](/docs/plugins/grafana-jira-datasource/latest/configure/#authentication).
- For Jira Cloud, you can authenticate with a scoped API token. Enable **Scoped Token** and enter the **Jira App Cloud Id**. To find your Cloud ID, refer to [Retrieve an Atlassian site Cloud ID](https://support.atlassian.com/jira/kb/retrieve-my-atlassian-sites-cloud-id/).

## Known limitations

- Custom field types from Jira add-ons may not be supported.
- Grafana [SQL Expressions](/docs/grafana/latest/panels-visualizations/query-transform-data/sql-expressions/) aren’t compatible with this data source. Calculate and reshape results with JQL and [transformations](/docs/plugins/grafana-jira-datasource/latest/query-editor/#work-with-transformations) instead.
- Selecting a multi-value array field (for example **Components**, **Labels**, **Sprint Name**, or a custom Owners field) expands each issue into one row per value. Omit those fields when you need one row per issue.
- Queries return at most the **Limit** value (default `50`). Jira issue search in the browser isn’t capped the same way.

## Import a dashboard

The Jira data source plugin includes the following pre-built dashboards:

- **Jira Demo** - A demonstration dashboard showcasing velocity charts, sprint burndown, issue counts, and time-to-resolution metrics.
- **Jira JSON fields demo** - Examples demonstrating how to work with complex Jira fields that return JSON data.

> Note
>
> These dashboards are starting points that demonstrate the data source’s capabilities. Customize the JQL queries, project keys, and field names to match your Jira instance before the dashboards display your data.

To import a dashboard:

1. Go to **Connections** &gt; **Data sources**.
2. Select your Jira data source.
3. Click the **Dashboards** tab.
4. Click **Import** next to the dashboard you want to use.
5. Edit each panel to update the JQL queries with your project keys and field names.

For more information about importing dashboards, refer to [Import a dashboard](/docs/grafana/latest/dashboards/build-dashboards/import-dashboards/).

## Get started

The following documents help you get started with the Jira data source:

- [Configure the Jira data source](/docs/plugins/grafana-jira-datasource/latest/configure/)
- [Jira query editor](/docs/plugins/grafana-jira-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-jira-datasource/latest/template-variables/)
- [Annotations](/docs/plugins/grafana-jira-datasource/latest/annotations/)
- [Alerting](/docs/plugins/grafana-jira-datasource/latest/alerting/)
- [Troubleshooting](/docs/plugins/grafana-jira-datasource/latest/troubleshooting/)

## Grafana Assistant

You can use [Grafana Assistant](/docs/grafana/latest/ai/assistant/) to explore and query your Jira data using natural language. The Assistant discovers the projects and field values available in your Jira data source, builds and runs JQL queries, and visualizes the results on a dashboard.

To query Jira, mention your Jira data source with the `@` symbol in your prompt. For example:

- `What projects are available in @jira-ds?`
- `Show open bugs in the PLATFORM project from @jira-ds, sorted by priority.`
- `Query @jira-ds for issues assigned to me that are in progress.`

For more information, refer to [Grafana Assistant](/docs/grafana/latest/ai/assistant/).

## Additional features

After you have configured the data source, you can:

- Add [Annotations](/docs/plugins/grafana-jira-datasource/latest/annotations/) to overlay Jira events on your graphs.
- Configure and use [Template variables](/docs/plugins/grafana-jira-datasource/latest/template-variables/) for dynamic dashboards.
- Add [Transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/).
- Set up [Alerting](/docs/plugins/grafana-jira-datasource/latest/alerting/) to monitor your Jira data.

## Plugin updates

To update the plugin, refer to [Update a plugin](/docs/grafana/latest/administration/plugin-management/#update-a-plugin).

> Note
>
> If you’re using Grafana Cloud, plugins are updated automatically.
