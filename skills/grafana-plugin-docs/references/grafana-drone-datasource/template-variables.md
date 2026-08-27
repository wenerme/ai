---
title: "Drone template variables | Grafana Enterprise Plugins documentation"
description: "Use template variables with the Drone data source to build dynamic, reusable Grafana dashboards."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Drone template variables

Use template variables to create dynamic, reusable dashboards that aren’t tied to a specific Drone repository.

## Before you begin

- [Configure the Drone data source](/docs/plugins/grafana-drone-datasource/latest/configure/).
- Understand [Grafana template variables](/docs/grafana/latest/dashboards/variables/).

## Supported variable types

The Drone data source supports the following variable types:

Expand table

| Variable type | Supported |
|---------------|-----------|
| Query         | Yes       |
| Custom        | Yes       |
| Data source   | Yes       |

## Create a query variable

The Drone variable editor uses the same **Action** selector as the [query editor](/docs/plugins/grafana-drone-datasource/latest/query-editor/). After you choose an action, you select which result field provides the variable values and, optionally, which field provides the display labels.

To create a query variable:

1. Navigate to **Dashboard settings** &gt; **Variables**.
2. Click **Add variable**.
3. Select **Query** as the variable type.
4. Select the Drone data source.
5. Select an action, such as `Repo List`, from the **Action** selector.
6. Set **Value Field** to the result field whose values you want the variable to use.
7. Optionally, set **Label Field** to a result field to show friendlier labels in the drop-down. If you leave it empty, the value is also used as the label.
8. Confirm the preview shows the expected values, then save the variable.

## Query examples

The `Repo List` action is the most useful source for a variable because it returns the active repositories registered to Drone. You can also build a variable of build numbers that depends on a repository variable.

### Populate a variable with repositories

This variable returns the active repositories in your Drone instance:

Expand table

| Field           | Value       |
|-----------------|-------------|
| **Action**      | `Repo List` |
| **Value Field** | `slug`      |
| **Label Field** | `name`      |

The drop-down lists your repositories by name, while queries that reference the variable receive the repository slug.

### Create a dependent build number variable

After you create a repository variable named `repo`, you can create a second variable that lists recent build numbers for the selected repository:

Expand table

| Field           | Value        |
|-----------------|--------------|
| **Action**      | `Build List` |
| **Repository**  | `$repo`      |
| **Value Field** | `number`     |

When you change the repository in the dashboard drop-down, the build number variable updates to match. Because `Build List` returns at most the 100 most recent builds, the variable lists at most 100 build numbers.

## Use variables in queries

After you create a variable, reference it in your Drone queries using [variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/). For example, create a repository variable named `repo` and reference it in the **Repository** field of a `Repo Info` or `Build List` query:

text [Copy code to clipboard] Copy

```text
$repo
```

You can chain variables together to drill from a repository down to a single build. Reference a `repo` variable in the **Repository** field and a `build` variable in the **Build number** field of a `Build Info` query:

Expand table

| Field            | Value        |
|------------------|--------------|
| **Action**       | `Build Info` |
| **Repository**   | `$repo`      |
| **Build number** | `$build`     |

This lets you switch the repository and build from dashboard drop-downs without editing the panel.

## Next steps

- [Drone query editor](/docs/plugins/grafana-drone-datasource/latest/query-editor/)
- [Troubleshooting](/docs/plugins/grafana-drone-datasource/latest/troubleshooting/)
