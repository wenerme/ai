---
title: "Editor types | Grafana Plugins documentation"
description: "Learn how to configure different UI editor types for columns when users add or edit data rows in the Business Table panel."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Editor types

**Editor types** are the UI elements for columns when you add or edit a data row.

[](/media/docs/grafana/panels-visualizations/business-table/editor-types.png)

## Date Time

The **Date Time** type lets you enter a value in the DateTime format using a standard Grafana component.

Optionally, you can specify a range of permitted date-times using the **Set Min Date** and **Set Max Date** parameters.

[](/media/docs/grafana/panels-visualizations/business-table/datetime-editor-type.png)

## Switch

> Note
>
> The **Switch** editor type is available starting from version 1.9.0.

The **Switch** editor type makes working with the Business Table panel more intuitive by transforming boolean data into a switch that you can turn on and off.

[](/media/docs/grafana/panels-visualizations/business-table/switch-editor-type.png)

## Number

The **Number** type lets you enter a numerical value. Optionally, you can specify the **Min** and **Max** for allowed values.

[](/media/docs/grafana/panels-visualizations/business-table/number-editor-type.png)

## Select

The **Select** type provides a drop-down list populated from the **Value Field** parameter. Optionally, you can specify a **Label Field**. Both parameters, **Value field** and **Label Field**, come from the `dataframe:column` of your data source.

[](/media/docs/grafana/panels-visualizations/business-table/select-editor-type.png)

> Note
>
> The **Allow custom value** feature is available starting from version 1.9.0.

When enabled, you can enter a custom value in the prepopulated drop-down list when adding or editing a row.

To enable this feature, set **Allow custom value** to ON.

[](/media/docs/grafana/panels-visualizations/business-table/allow-custom-values.png)

## String

The **String** type lets you enter any value.

[](/media/docs/grafana/panels-visualizations/business-table/string-editor-type.png)

## Text Area

> Note
>
> The **Text Area** editor type is available starting from version 1.9.0.

Use the **Text Area** editor type to add and edit multi-row text values.

[](/media/docs/grafana/panels-visualizations/business-table/textarea-editor-type.png)
