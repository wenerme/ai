---
title: "Cloudflare template variables | Grafana Enterprise Plugins documentation"
description: "Use template variables with the Cloudflare data source to build dynamic, reusable Grafana dashboards."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Cloudflare template variables

Template variables let you build dynamic, reusable dashboards. Instead of hard-coding values such as a zone or account into queries, you use variables that update from a drop-down at the top of the dashboard. For general information, refer to [Templates and variables](/docs/grafana/latest/dashboards/variables/).

## Before you begin

Before you use template variables, ensure you have [configured the Cloudflare data source](/docs/plugins/grafana-cloudflare-datasource/latest/configure/).

## Supported variable types

The Cloudflare data source supports the following variable types:

Expand table

| Variable type | Supported | Description                                                                                    |
|---------------|-----------|------------------------------------------------------------------------------------------------|
| Query         | Yes       | Populates options from the result of a Cloudflare action, such as a list of zones or accounts. |
| Custom        | Yes       | Uses a fixed, comma-separated list of values that you define.                                  |
| Text box      | Yes       | Accepts a free-form value that you enter on the dashboard.                                     |

Other standard Grafana variable types, such as **Constant** and **Data source**, also work with the data source. For more information, refer to [Add and manage variables](/docs/grafana/latest/dashboards/variables/add-template-variables/).

## Account ID variable

When you configure the data source with an account-owned token, the configured account ID is available to queries through the `${account_id}` syntax. This lets a dashboard target the account associated with the data source without repeating the account identifier in each query.

## Create a query variable

A query variable populates its drop-down options from the result of a Cloudflare action. You choose which result field supplies the option values and which supplies the display labels.

1. Navigate to your dashboard, then select **Edit** &gt; **Settings** &gt; **Variables**.
2. Select **Add variable**, then set **Select variable type** to **Query**.
3. Enter a name for the variable, such as `zone`.
4. In the **Data source** field, select your Cloudflare data source.
5. Select an **Action**, such as **List zones**, and set any required parameters.
6. Set **Value Field** to the result field used as the variable value, such as `id`.
7. Set **Label Field** to the result field shown in the drop-down, such as `name`.
8. Confirm the preview of values, then select **Apply**.

## Query variable examples

The following examples show common query variables. Set the variable type to **Query** and select your Cloudflare data source for each.

Expand table

| Purpose             | Action              | Value Field | Label Field |
|---------------------|---------------------|-------------|-------------|
| List zones          | List zones          | `id`        | `name`      |
| List accounts       | List accounts       | `id`        | `name`      |
| List load balancers | List load balancers | `id`        | `name`      |
| List API tokens     | List tokens         | `id`        | `name`      |

When the **Value Field** and **Label Field** differ, the drop-down shows the label while queries receive the value. For example, a `zone` variable can display domain names while passing the zone `id` to the **Zone ID** parameter.

The **List load balancers** and **List tokens** actions require a parent parameter, a **Zone ID** and an **Account ID** respectively. You can set these to another variable to chain the drop-downs together, as described in [Chain query variables](#chain-query-variables).

## Custom variable example

A **Custom** variable uses a fixed list of values that you define, which is useful when the options don’t come from a Cloudflare action. For example, create a zone-status selector that matches the values accepted by the **Status** field of the **List zones** action:

1. Navigate to your dashboard, then select **Edit** &gt; **Settings** &gt; **Variables**.
2. Select **Add variable**, then set **Select variable type** to **Custom**.
3. Enter a name for the variable, such as `status`.
4. In **Custom options**, enter `initializing,pending,active,moved`.
5. Select **Apply**.

Reference the variable in the **Status** field of a **List zones** query as `${status}` to filter zones by the status selected in the dashboard drop-down.

## Text box variable example

A **Text box** variable accepts a free-form value that you enter on the dashboard, which suits parameters that don’t have a fixed set of options. For example, create a location filter for the **Internet outages and anomalies** Radar query:

1. Navigate to your dashboard, then select **Edit** &gt; **Settings** &gt; **Variables**.
2. Select **Add variable**, then set **Select variable type** to **Text box**.
3. Enter a name for the variable, such as `location`.
4. Optionally, set a default value, such as `US`.
5. Select **Apply**.

Reference the variable in the **Location** field of an **Internet outages and anomalies** query as `${location}` to filter outages by a location Alpha2 code. You can create a second text box variable named `asn` and reference it in the **ASN** field the same way.

## Built-in time range variables

Time-bound Cloudflare actions use the Grafana built-in time range variables so that results follow the dashboard time range:

Expand table

| Variable        | Description                                                                                  |
|-----------------|----------------------------------------------------------------------------------------------|
| `${__timeFrom}` | The start of the dashboard time range, used as the default `since` or `dateStart` parameter. |
| `${__timeTo}`   | The end of the dashboard time range, used as the default `until` or `dateEnd` parameter.     |

For more information about built-in variables, refer to [Global variables](/docs/grafana/latest/dashboards/variables/add-template-variables/#global-variables).

## Use variables in queries

You can reference any dashboard variable in a Cloudflare query parameter with the `${variable_name}` syntax. For example, after you create a `zone` query variable from the earlier example, reference it in the **Zone ID** parameter of a **DNS analytics by time** query as `${zone}`. The panel then follows the zone selected in the dashboard drop-down.

If a variable allows multiple values, the data source joins the selected values into a comma-separated list before sending them to the Cloudflare API.

### Chain query variables

You can make one variable depend on another so that selecting a value in the first drop-down updates the options in the second. For example, chain a `zone` variable to a `load_balancer` variable so the dashboard lists only the load balancers in the selected zone:

1. Create a `zone` query variable from the **List zones** action, with **Value Field** set to `id` and **Label Field** set to `name`.
2. Add a second query variable named `load_balancer`.
3. Set its **Action** to **List load balancers**.
4. Set its **Zone ID** parameter to `${zone}`.
5. Set **Value Field** to `id` and **Label Field** to `name`, then select **Apply**.

The `load_balancer` drop-down now refreshes whenever you select a different zone. Reference both variables in a panel query, such as `${zone}` for the **Zone ID** and `${load_balancer}` for the **Load Balancer ID** of a **Load balancer details** query.

## Next steps

- [Cloudflare query editor](/docs/plugins/grafana-cloudflare-datasource/latest/query-editor/)
- [Troubleshooting](/docs/plugins/grafana-cloudflare-datasource/latest/troubleshooting/)
