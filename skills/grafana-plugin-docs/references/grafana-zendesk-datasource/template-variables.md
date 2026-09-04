---
title: "Zendesk template variables | Grafana Enterprise Plugins documentation"
description: "Use template variables with the Zendesk data source to build dynamic, reusable dashboards."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Zendesk template variables

Template variables let you build dynamic, reusable dashboards. Instead of hard-coding values such as a user or role into queries, you use variables that update from a drop-down at the top of the dashboard. For general information, refer to [Templates and variables](/docs/grafana/latest/dashboards/variables/).

## Before you begin

Before you use template variables, ensure you have [configured the Zendesk data source](/docs/plugins/grafana-zendesk-datasource/latest/configure/).

## Supported variable types

The Zendesk data source supports the following variable types:

Expand table

| Variable type | Supported | Description                                                                         |
|---------------|-----------|-------------------------------------------------------------------------------------|
| Query         | Yes       | Populates options from the result of a Zendesk query type, such as a list of users. |
| Custom        | Yes       | Uses a fixed, comma-separated list of values that you define.                       |
| Text box      | Yes       | Accepts a free-form value that you enter on the dashboard.                          |

Other standard Grafana variable types, such as **Constant** and **Data source**, also work with the data source. For more information, refer to [Add and manage variables](/docs/grafana/latest/dashboards/variables/add-template-variables/).

## Create a query variable

A query variable populates its drop-down options from the result of a Zendesk query type. You choose which result field supplies the option values and which supplies the display labels.

1. Navigate to your dashboard, then select **Edit** &gt; **Options** &gt; **Variables**.
2. Select **Add variable**, then set **Select variable type** to **Query**.
3. Enter a name for the variable, such as `user`.
4. In the **Data source** field, select your Zendesk data source.
5. Under **Query options**, select **Open variable editor**.
6. Select an **Action**, such as **Show all users**, and set any required parameters.
7. Set **Value Field** to the result field used as the variable value, such as `id`.
8. Set **Label Field** to the result field shown in the drop-down, such as `name`.
9. Confirm the preview of values, then select **Apply**.

## Query variable examples

The following examples show common query variables. Set the variable type to **Query** and select your Zendesk data source for each.

Expand table

| Purpose            | Action                                                   | Value Field | Label Field |
|--------------------|----------------------------------------------------------|-------------|-------------|
| List users         | Show all users                                           | `id`        | `name`      |
| List agents        | Show all users, with **Role** set to `agent`             | `id`        | `name`      |
| List organizations | Search, with **Search query** set to `type:organization` | `id`        | `name`      |

When the **Value Field** and **Label Field** differ, the drop-down shows the label while queries receive the value. For example, a `user` variable can display user names while passing the user `id` to a query parameter. The **Value Field** and **Label Field** drop-downs list the fields returned by the query, so run the query once to populate them.

## Use variables in queries

You can reference any dashboard variable in a Zendesk query parameter with the `${variable_name}` syntax. For example, after you create the `user` query variable from the earlier example, reference it in the **Users** parameter of the **Show selected users** action as `${user}`. The panel then follows the user selected in the dashboard drop-down.

You can also use variables in the **Search** query. For example, create a `status` variable of type **Custom** with the values `open,pending,solved`, then reference it in a search query as `type:ticket status:${status}` so the panel updates when you change the selected status.

To let viewers enter their own text, create a **Text box** variable, such as `search_term`, and reference it in a **Search** query as `${search_term}`.

If a variable allows multiple values, the data source joins the selected values into a comma-separated list before sending them to the Zendesk API. For example, a multi-value `user` variable passes all the selected user IDs to the **Users** parameter of the **Show selected users** action.

## Use cases

The following examples show common ways to use template variables with the Zendesk data source. Each row pairs a scenario with the variable type and configuration that supports it.

Expand table

| Use case                         | Variable type | How to configure it                                                                                                                                                     |
|----------------------------------|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Filter panels by user            | Query         | Create the variable from **Show all users** with **Value Field** `id` and **Label Field** `name`, then reference it as `${user}` in the **Show selected users** action. |
| Switch the ticket status in view | Custom        | Enter the values `open,pending,solved`, then reference the variable in a **Search** query as `type:ticket status:${status}`.                                            |
| Filter by organization           | Query         | Create the variable from a **Search** query with **Search query** set to `type:organization`, using **Value Field** `id` and **Label Field** `name`.                    |
| Run a free-form ticket search    | Text box      | Reference the variable in a **Search** query as `${search_term}` so viewers can type their own search text.                                                             |
