---
title: "Vercel template variables | Grafana Enterprise Plugins documentation"
description: "Use template variables with the Vercel data source to build dynamic, reusable dashboards."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Vercel template variables

Template variables let you build dynamic, reusable dashboards. Instead of hard-coding values such as a team or time range into queries, you use variables that update from a drop-down at the top of the dashboard. For general information, refer to [Templates and variables](/docs/grafana/latest/dashboards/variables/).

## Before you begin

Before you use template variables, ensure you have [configured the Vercel data source](/docs/plugins/grafana-vercel-datasource/latest/configure/).

## Supported variable types

The Vercel data source supports the following variable types:

Expand table

| Variable type | Supported | Description                                                                                      |
|---------------|-----------|--------------------------------------------------------------------------------------------------|
| Query         | Yes       | Populates options from the result of a Vercel action, such as a list of projects or deployments. |
| Custom        | Yes       | Uses a fixed, comma-separated list of values that you define.                                    |
| Text box      | Yes       | Accepts a free-form value that you enter on the dashboard.                                       |

Other standard Grafana variable types, such as **Constant** and **Data source**, also work with the data source. For more information, refer to [Add and manage variables](/docs/grafana/latest/dashboards/variables/add-template-variables/).

## Team ID variable

The Vercel data source exposes the configured Team ID through the `team_id` variable. Queries reference it through the `${team_id}` syntax, which the `teamId` query parameter uses by default. This lets a single dashboard target the team associated with the data source without repeating the team identifier in each query.

## Create a query variable

A query variable populates its drop-down options from the result of a Vercel action. You choose which result field supplies the option values and which supplies the display labels.

1. Navigate to your dashboard, then select **Edit** &gt; **Settings** &gt; **Variables**.
2. Select **Add variable**, then set **Select variable type** to **Query**.
3. Enter a name for the variable, such as `project`.
4. In the **Data source** field, select your Vercel data source.
5. Select an **Action**, such as **Retrieve a list of projects**, and set any required parameters.
6. Set **Value Field** to the result field used as the variable value, such as `id`.
7. Set **Label Field** to the result field shown in the drop-down, such as `name`.
8. Confirm the preview of values, then select **Apply**.

## Query variable examples

The following examples show common query variables. Set the variable type to **Query** and select your Vercel data source for each.

Expand table

| Purpose          | Action                      | Value Field | Label Field |
|------------------|-----------------------------|-------------|-------------|
| List projects    | Retrieve a list of projects | `id`        | `name`      |
| List deployments | List deployments            | `uid`       | `name`      |
| List teams       | List all teams              | `id`        | `name`      |

When the **Value Field** and **Label Field** differ, the drop-down shows the label while queries receive the value. For example, a `project` variable can display project names while passing the project `id` to the `projectId` parameter.

## Built-in time range variables

Time-bound Vercel actions use the Grafana built-in time range variables so that results follow the dashboard time range:

Expand table

| Variable        | Description                                                                   |
|-----------------|-------------------------------------------------------------------------------|
| `${__timeFrom}` | The start of the dashboard time range, used as the default `since` parameter. |
| `${__timeTo}`   | The end of the dashboard time range, used as the default `until` parameter.   |

For more information about built-in variables, refer to [Global variables](/docs/grafana/latest/visualizations/dashboards/variables/global-variables/).

## Use variables in queries

You can reference any dashboard variable in a Vercel query parameter with the `${variable_name}` syntax. For example, after you create the `project` query variable from the earlier example, reference it in the `projectId` parameter of the **List deployments** action as `${project}`. The panel then follows the project selected in the dashboard drop-down.

You can also chain variables. For example, create a `project` variable from **Retrieve a list of projects**, then create a `deployment` variable from **List deployments** that filters by `projectId = ${project}`, so the deployment drop-down updates whenever the selected project changes.

If a variable allows multiple values, the data source joins the selected values into a comma-separated list before sending them to the Vercel API.
