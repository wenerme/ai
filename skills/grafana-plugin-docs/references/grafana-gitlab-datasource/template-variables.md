---
title: "GitLab template variables | Grafana Enterprise Plugins documentation"
description: "Use template variables with the GitLab data source in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# GitLab template variables

Use template variables to create dynamic, reusable dashboards. Instead of hard-coding project IDs or other values, you can create variables that let you switch between different projects, labels, or releases from a drop-down at the top of the dashboard.

For general information about template variables, refer to [Templates and variables](/docs/grafana/latest/dashboards/variables/).

## Supported variable types

The GitLab data source supports Query variables for the following resource types:

Expand table

| Resource type | Supported as variable |
|---------------|-----------------------|
| Projects      | Yes                   |
| Labels        | Yes (default)         |
| Releases      | Yes                   |

## Create a query variable

To create a query variable using the GitLab data source:

01. Navigate to **Dashboard settings** &gt; **Variables**.
02. Click **Add variable**.
03. Select **Query** as the variable type.
04. Enter a name for the variable (for example, `project`).
05. Select your GitLab data source.
06. Set **Refresh** to **On dashboard load**.
07. Select a **Resource Type** from the drop-down (for example, **Projects**).
08. Configure any filters for the selected resource type (for example, set **Owned** to `True` to list only your projects).
09. Select a **Display Field** to determine the text shown in the variable drop-down.
10. Select a **Value Field** to determine the value passed to queries.
11. Click **Update** to save the variable.

### Variable fields

Expand table

| Field             | Description                                                                                                                   |
|-------------------|-------------------------------------------------------------------------------------------------------------------------------|
| **Display Field** | The field used as the label in the variable drop-down. For example, use `name` to display project names.                      |
| **Value Field**   | The field used as the value when the variable is referenced in queries. For example, use `id` to pass the numeric project ID. |

## Example: Create a project variable

This example creates a variable that provides a drop-down of your GitLab projects, enabling you to switch between projects on a dashboard:

1. Add a variable of type **Query** named `project`.
2. Select your GitLab data source and set **Refresh** to **On dashboard load**.
3. Select resource type **Projects** and set **Owned** to `True`.
4. Set **Display Field** to `name` and **Value Field** to `id`.
5. Click **Update** to add the variable to the dashboard.

A drop-down appears at the top of your dashboard with a list of your projects.

To use this variable in a query, enter `$project` in the **Project Id** field of any resource type that requires a project ID. When you select a project from the drop-down, the dashboard updates to show data for that project.

## Use variables in queries

After creating a variable, reference it in query fields using the `$variable_name` syntax. For example, if you created a variable named `project`, enter `$project` in the **Project Id** field.

You can use variables in any text input field in the query editor. For more information about variable syntax, refer to [Variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/).
