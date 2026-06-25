---
title: "Template variables | Grafana Enterprise Plugins documentation"
description: "Learn how to use template variables with the Jira data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Template variables

Template variables allow you to create dynamic, reusable dashboards. Instead of hard-coding values like project names, assignees, or sprint names in your queries, you can use variables that appear as drop-down selectors at the top of your dashboard.

For general information about template variables in Grafana, refer to [Variables](/docs/grafana/latest/dashboards/variables/).

## Add a query variable

Query variables are populated dynamically from your Jira data. To add a Jira query variable:

1. Open your dashboard and click **Dashboard settings** (gear icon).
2. Select **Variables** in the left menu.
3. Click **Add variable**.
4. Enter a name for the variable (for example, `project` or `assignee`).
5. Select **Query** as the variable type.
6. Select your Jira data source from the **Data source** drop-down.
7. Configure the query:

   - **Select Field**: Choose the field to populate the variable (for example, **Project**, **Assignee**, or **Sprint Name**)
   - **Filter (JQL)**: Optionally filter the results with a JQL query
8. Click **Apply**.

### Example: Create a project variable

To create a variable that lists all projects:

1. Name: `project`
2. Select Field: **Project**
3. Filter (JQL): *(leave empty to show all projects)*

Use the variable in your queries:

jql [Copy code to clipboard] Copy

```jql
project = '$project'
```

### Example: Create an assignee variable

To create a variable that lists assignees for a specific project:

1. Name: `assignee`
2. Select Field: **Assignee**
3. Filter (JQL): `project = '$project'`

Use the variable in your queries:

jql [Copy code to clipboard] Copy

```jql
project = '$project' AND assignee = '$assignee'
```

## Use multi-value variables

Multi-value variables allow users to select multiple options. When using multi-value variables in JQL, use the `IN` operator:

jql [Copy code to clipboard] Copy

```jql
assignee IN ($assignee)
```

The Jira data source automatically formats multi-value selections for JQL. For example, if a user selects “Alice” and “Bob”, the query becomes:

jql [Copy code to clipboard] Copy

```jql
assignee IN ('Alice','Bob')
```

To enable multi-value selection:

1. Open the variable settings.
2. Under **Selection options**, enable **Multi-value**.
3. Optionally enable **Include All option** to add an “All” selection.

## Time range macros

The Jira data source provides macros that reference the dashboard time range. Use these macros to filter issues based on the selected time window.

Expand table

| Macro         | Description                       |
|---------------|-----------------------------------|
| `$__timeFrom` | Start of the dashboard time range |
| `$__timeTo`   | End of the dashboard time range   |

### Example: Filter issues by creation date

To show issues created within the dashboard time range:

jql [Copy code to clipboard] Copy

```jql
project = '$project' AND created >= $__timeFrom AND created <= $__timeTo
```

### Example: Filter issues by resolution date

To show issues resolved within the dashboard time range:

jql [Copy code to clipboard] Copy

```jql
project = '$project' AND resolved >= $__timeFrom AND resolved <= $__timeTo
```

## Variable syntax

You can reference variables in your JQL queries using the following syntax:

Expand table

| Syntax           | Description                                      |
|------------------|--------------------------------------------------|
| `$varname`       | Simple variable reference                        |
| `${varname}`     | Variable reference with explicit boundaries      |
| `${varname:csv}` | Comma-separated values for multi-value variables |

For more information about variable syntax, refer to [Variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/).
