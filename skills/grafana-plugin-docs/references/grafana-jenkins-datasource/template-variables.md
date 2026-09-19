---
title: "Jenkins template variables | Grafana Enterprise Plugins documentation"
description: "Using template variables with the Jenkins data source in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Jenkins template variables

Instead of hard-coding details such as project names in your panels, you can use variables. Grafana displays these variables in drop-down lists at the top of the dashboard so you can change the data displayed without editing panels. Grafana refers to such variables as template variables.

For an introduction to templating, refer to [Templates and variables](/docs/grafana/latest/dashboards/variables/) and [Add and manage variables](/docs/grafana/latest/dashboards/variables/add-template-variables/).

## Before you begin

- Ensure you have [configured the Jenkins data source](/docs/plugins/grafana-jenkins-datasource/latest/configure/).
- Verify your credentials have permission to list the projects you want to reference.

## Supported variable types

The Jenkins data source supports the following variable types:

Expand table

| Variable type | Supported |
|---------------|-----------|
| Query         | Yes       |
| Custom        | Yes       |
| Data source   | Yes       |

Grafana’s other built-in variable types, such as **Constant**, **Interval**, and **Text box**, work with the Jenkins data source as they do for any data source. For query variables, the data source supports the **Projects** query type.

## Query variable

A query variable dynamically retrieves its values from the data source. The Jenkins data source supports one query variable type, **Projects**, which returns the list of Jenkins projects.

The variable uses each project’s display name as the label shown in the drop-down and the project’s full name as the value used in queries.

To create a **Projects** query variable:

1. Navigate to **Dashboard settings** &gt; **Variables**.
2. Click **Add variable**.
3. Select **Query** as the variable type.
4. Enter a name for the variable, for example, `project`.
5. Select the Jenkins data source.
6. Select **Projects** as the query type.
7. Click **Back to dashboard** to apply the variable.

The variable’s drop-down is populated with the list of Jenkins projects.

## Use variables in queries

Reference a variable in a query with the `$<variable_name>` syntax. The Jenkins data source resolves variables in the project field of a **Project Builds** query, so you can drive the query from a **Projects** variable.

For example, with a variable named `project`, set the project field of a **Project Builds** query to `$project`. When you select a different project in the dashboard drop-down, the query returns the builds for that project.

You can also use the alternative `[[variable_name]]` syntax, for example, `[[project]]`.

## Examples

The following examples show common ways to use template variables with the Jenkins data source.

### Filter a build panel by project

Use a single-value **Projects** variable to switch a panel between projects without editing the query:

1. Create a **Projects** query variable named `project`.
2. Add a panel with a **Project Builds** query.
3. Set the panel’s project field to `$project`.

Selecting a different project in the dashboard drop-down updates the panel to show that project’s builds.

### Repeat a panel for each selected project

Use a multi-value **Projects** variable to show one panel per project side by side:

1. Create a **Projects** query variable named `project` and enable **Multi-value** in the variable settings.
2. Add a **Project Builds** panel and set its project field to `$project`.
3. In the panel’s **Repeat options**, set **Repeat by variable** to `project`.

Grafana renders a separate panel for each selected project, and each repeated panel resolves `$project` to a single project. Repeat panels this way rather than passing multiple values to a single query, because a **Project Builds** query targets one project at a time.

### Add project context to a panel title

Reference the variable in text such as a panel title to make dashboards self-describing. For example, set a panel title to `Builds for $project` so it reflects the current selection.

## Next steps

- [Use the Jenkins query editor](/docs/plugins/grafana-jenkins-datasource/latest/query-editor/)
- [Troubleshoot the Jenkins data source](/docs/plugins/grafana-jenkins-datasource/latest/troubleshooting/)
