---
title: "Template variables | Grafana Enterprise Plugins documentation"
description: "Learn how to use template variables with the Jira data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Template variables

Template variables allow you to create dynamic, reusable dashboards. Instead of hard-coding values like project keys, assignees, or sprint names in your queries, you can use variables that appear as drop-down selectors at the top of your dashboard.

For general information about template variables in Grafana, refer to [Variables](/docs/grafana/latest/dashboards/variables/).

## Add a query variable

Query variables are populated from Jira **issue search** results, not from a separate projects or users API. Grafana runs a JQL query, reads the field you selected, and uses the unique values as variable options.

To add a Jira query variable:

1. Open your dashboard and click **Dashboard settings** (gear icon).
2. Select **Variables** in the left menu.
3. Click **Add variable**.
4. Enter a name for the variable (for example, `project` or `assignee`).
5. Select **Query** as the variable type.
6. Select your Jira data source from the **Data source** drop-down.
7. Configure the query:

   - **Select Field**: Choose the field whose values populate the drop-down. Use **Project Key** for project variables (JQL `project =` expects a key, not a display name). Use **Assignee Name** for assignee variables.
   - **Filter (JQL)**: Optionally filter which issues are searched. An empty filter searches all issues the token can see.
   - **Limit**: Maximum number of issues searched. The default is `50`. If the drop-down is missing values, increase **Limit**.
8. Click **Apply**.

Place chained variables in dependency order. For example, define `project` above `assignee` if the assignee query uses `$project`.

### Example: Create a project variable

To create a variable of project keys:

1. Name: `project`
2. Select Field: **Project Key**
3. Filter (JQL): *(leave empty, or scope with* `updated >= -90d` *to search recent issues)*
4. Limit: increase above `50` if you have many projects

Use the variable in panel JQL:

jql [Copy code to clipboard] Copy

```jql
project = '$project'
```

### Example: Create an assignee variable

To list assignees in the selected project:

1. Name: `assignee`
2. Select Field: **Assignee Name**
3. Filter (JQL): `project = '$project'`

Use the variable in panel JQL:

jql [Copy code to clipboard] Copy

```jql
project = '$project' AND assignee = '$assignee'
```

### Example: Create a sprint variable

To list sprint names:

1. Name: `sprint`
2. Select Field: **Sprint Name**
3. Filter (JQL): `project = '$project' AND sprint in openSprints()`

Use the variable in panel JQL:

jql [Copy code to clipboard] Copy

```jql
project = '$project' AND sprint = '$sprint'
```

### Example: Create a status variable

To list statuses:

1. Name: `status`
2. Select Field: **Status** (or **Status Name**, if your instance exposes the sub-field)
3. Filter (JQL): `project = '$project'`

Use the variable in panel JQL:

jql [Copy code to clipboard] Copy

```jql
project = '$project' AND status = '$status'
```

## Use multi-value variables

Multi-value variables allow users to select more than one option. In JQL, use the `IN` operator and do **not** wrap the variable in extra quotes. The plugin formats each selected value in single quotes:

jql [Copy code to clipboard] Copy

```jql
assignee IN ($assignee)
```

If a user selects Alice and Bob, that query becomes:

jql [Copy code to clipboard] Copy

```jql
assignee IN ('Alice','Bob')
```

The same pattern works for project keys:

jql [Copy code to clipboard] Copy

```jql
project IN ($project)
```

To enable multi-value selection:

1. Open the variable settings.
2. Under **Selection options**, enable **Multi-value**.
3. Optionally enable **Include All option** to add an All selection. For a hidden variable that should expand to every option in JQL, enable **Include All option** and set the variable default to All.

Don’t use Grafana’s `${varname:csv}` format in JQL. That format emits unquoted comma-separated values, which JQL rejects inside `IN`.

## Time range macros

The Jira data source provides macros that reference the dashboard time range. The plugin replaces each macro with a quoted timestamp in `yyyy-MM-dd HH:mm` format (24-hour). Don’t add extra quotes around the macros.

Expand table

| Macro         | Description                       |
|---------------|-----------------------------------|
| `$__timeFrom` | Start of the dashboard time range |
| `$__timeTo`   | End of the dashboard time range   |

These are the only Jira-specific macros. There is no `$__timeFilter` helper.

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

### Example: Combine a variable with the time range

jql [Copy code to clipboard] Copy

```jql
project = '$project' AND sprint = '$sprint' AND updated >= $__timeFrom AND updated <= $__timeTo
```

## Variable syntax

You can reference variables in your JQL queries using the following syntax:

Expand table

| Syntax       | Description                                                                 |
|--------------|-----------------------------------------------------------------------------|
| `$varname`   | Simple variable reference. Prefer this with `IN` for multi-value variables. |
| `${varname}` | Variable reference with explicit boundaries                                 |

For more information about variable syntax, refer to [Variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/).

## Ad hoc filters

You can also add an **Ad hoc filters** variable and select the Jira data source. Dashboard users then pick field, operator, and value at the top of the dashboard. Grafana appends those filters to Jira queries with `AND`. For setup steps, refer to [Use Ad hoc filters](/docs/plugins/grafana-jira-datasource/latest/query-editor/#use-ad-hoc-filters).
