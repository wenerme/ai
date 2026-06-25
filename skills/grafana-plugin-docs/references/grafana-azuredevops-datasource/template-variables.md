---
title: "Azure DevOps template variables | Grafana Enterprise Plugins documentation"
description: "Use template variables with the Azure DevOps data source to create dynamic, reusable dashboards."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Azure DevOps template variables

Use template variables to create dynamic, reusable dashboards that let you switch between projects, repositories, and other resources without editing individual queries.

## Before you begin

- [Configure the Azure DevOps data source](/docs/plugins/grafana-azuredevops-datasource/latest/configure/).
- Understand [Grafana template variables](/docs/grafana/latest/dashboards/variables/).

## Supported variable types

Expand table

| Variable type | Supported |
|---------------|-----------|
| Query         | Yes       |
| Custom        | Yes       |
| Data source   | Yes       |

## Create a query variable

To create a query variable:

1. Navigate to **Dashboard settings** &gt; **Variables**.
2. Click **Add variable**.
3. Select **Query** as the variable type.
4. Select the **Azure DevOps** data source.
5. Choose a **Query Type** from the drop-down.

### Query variable types

The Azure DevOps data source supports the following query variable types:

Expand table

| Query Type       | Description                                                                                                                                                                                                |
|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Projects**     | Returns the list of projects in your organization. The project name is used as the display value, and the project ID is the variable value.                                                                |
| **Repositories** | Returns the list of repositories. The repository name is used as the display value, and the repository ID is the variable value. Optionally, select a project to filter repositories to only that project. |

## Use variables in queries

Template variables work in two ways within the query editor.

### Drop-down pickers

The **Project** and **Repository** drop-downs automatically include dashboard template variables as selectable options. When you create a variable of type Projects or Repositories, it appears in the drop-down list alongside regular values.

### Text filter fields

You can also use the `$variableName` syntax in any text input field across all query types. For example, you can use a variable in the **Branch** field to dynamically filter builds, or in the **Creator Id** field to filter pull requests by a variable-controlled identity.

## Examples

The following examples show common patterns for using template variables with the Azure DevOps data source.

### Switch between projects

Create a variable that lets dashboard viewers select which project to display data for:

1. Create a **Projects** query variable named `project`.
2. In a query, select `$project` from the **Project** drop-down.
3. Use the dashboard variable selector to switch between projects, and all panels using that variable update automatically.

### Chain project and repository variables

Create cascading variables where the repository list updates based on the selected project:

1. Create a **Projects** query variable named `project`.
2. Create a **Repositories** query variable named `repo`.
3. In the `repo` variable settings, select `$project` from the **Project** drop-down to filter repositories to the selected project.
4. In your queries, select `$project` for the **Project** and `$repo` for the **Repository**.

When a user changes the project, the repository variable automatically refreshes to show only repositories in that project.

### Use a variable in a filter field

Use variables in text filter fields to create flexible, reusable queries:

1. Create a **Custom** variable named `branch` with values like `refs/heads/main` and `refs/heads/develop`.
2. In a **Builds** query, type `$branch` in the **Branch** field.
3. Dashboard viewers can switch between branches to see builds for each one.

This pattern works in any text input field, including **Creator Id**, **Source Ref**, **Requested For**, **Source branch**, and others.

## Known limitations

- Template variables don’t support multi-select. Only single selection is supported.
- Regex filtering by project or repository name isn’t supported in the variable editor.
