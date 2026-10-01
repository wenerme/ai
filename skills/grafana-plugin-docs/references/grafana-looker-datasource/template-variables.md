---
title: "Looker template variables | Grafana Enterprise Plugins documentation"
description: "Use template variables with the Looker data source in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Looker template variables

Use template variables to create dynamic, reusable dashboards with the Looker data source.

## Before you begin

Before you create a variable, ensure you have:

- [Configured the Looker data source](/docs/plugins/grafana-looker-datasource/latest/configure/).
- A basic understanding of [Grafana template variables](/docs/grafana/latest/dashboards/variables/).

## Supported variable types

The Looker data source supports the following Grafana variable types:

Expand table

| Variable type | Supported |
|---------------|-----------|
| Query         | Yes       |
| Custom        | Yes       |
| Data source   | Yes       |

## Query variable types

When you create a query variable with the Looker data source, select one of the following **Query Type** options:

Expand table

| Query type                  | Returns                                                                                                 | Variable value                                              |
|-----------------------------|---------------------------------------------------------------------------------------------------------|-------------------------------------------------------------|
| **LookML models**           | The list of LookML models the data source can access.                                                   | The model name.                                             |
| **LookML models explores**  | The list of explores for a selected model.                                                              | The explore name.                                           |
| **LookML dimension values** | The values of a selected dimension for a model and explore, optionally filtered by a filter expression. | The dimension value.                                        |
| **Looks**                   | The list of saved Looks the data source can access.                                                     | The Look ID, with the Look title shown as the display text. |

## Create a query variable

To create a query variable:

1. On the dashboard, click **Edit** to enter edit mode, then go to **Options** &gt; **Variables**.
2. Click **Add variable**.
3. Enter a **Name** for the variable.
4. Select **Query** as the variable type.
5. Click **Open variable editor**.
6. Select the Looker data source.
7. Select a **Query Type** and complete the fields it requires.

### LookML models

The **LookML models** query type takes no additional fields. It returns the models available to the data source, so you can drive other variables or queries by model.

### LookML models explores

The **LookML models explores** query type requires a **LookML Model**. It returns the explores available within the selected model.

### LookML dimension values

The **LookML dimension values** query type returns the distinct values of a dimension. Complete the following fields:

Expand table

| Field                 | Description                                                           |
|-----------------------|-----------------------------------------------------------------------|
| **LookML Model**      | The model that contains the explore.                                  |
| **LookML View**       | The explore that contains the dimension.                              |
| **LookML Dimension**  | The dimension whose values populate the variable.                     |
| **Filter Expression** | An optional Looker filter expression to restrict the returned values. |

### Looks

The **Looks** query type takes no additional fields. It returns the saved Looks available to the data source. The variable value is the Look ID and the display text is the Look title, so you can build a variable that selects a Look by name.

## Create dependent variables

You can chain variables so that one updates based on another. When you build a **LookML models explores** variable, set its **LookML Model** to a model variable, such as `${model}`. The explore list then updates whenever the selected model changes.

## Use variables in queries

> Caution
>
> Referencing template variables inside a Looker panel query isn’t supported. Although the query builder drop-downs may list your dashboard variables, the data source doesn’t substitute them when the query runs, so Looker receives the variable reference unresolved. This applies to the builder, the LookML JSON body, and the filter expression.

You can still use Looker variables in the standard Grafana ways:

- Repeat a panel or row for each selected value.
- Reference the values in panel titles, text panels, or queries to other data sources.

For more information, refer to [Grafana template variables](/docs/grafana/latest/dashboards/variables/).

## Next steps

- [Use the Looker query editor](/docs/plugins/grafana-looker-datasource/latest/query-editor/)
- [Troubleshoot Looker data source issues](/docs/plugins/grafana-looker-datasource/latest/troubleshooting/)
