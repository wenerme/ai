---
title: "Form elements | Grafana Plugins documentation"
description: "Learn about the wide variety of form element types available in the Business Forms plugin to build web applications."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Form elements

The Business Forms plugin provides a wide variety of element types to meet almost any web application requirement.

> Note
>
> All form elements (starting from version 4.9.0, including [sections](#sections)) can be created dynamically. For more info, please refer to the [Dynamic Forms](/docs/plugins/volkovlabs-form-panel/latest/features/dynamic-forms/) page of the Business Forms panel documentation.

## Layout

You can choose from three layouts: **Basic**, **Buttons Only**, and **Sections**. To switch between them, open the **Layout** category.

[](/media/docs/grafana/panels-visualizations/business-forms/sections.png)

[](/media/docs/grafana/panels-visualizations/business-forms/layouts.png)

### Basic

In the **Basic** layout, all form elements are positioned vertically, one following another.

### Sections

With the **Sections** layout, you can create as many sections as needed and place sections either vertically or horizontally using the **Orientation** option.

When you select the **Sections** layout, controls for creating sections appear. For each section, you can specify an ID for later reference and a name that displays as the section label.

> Note
>
> The **Collapsable** parameter has been supported starting from version 4.0.0.

Sections can be collapsible. This functionality is available only for sections in the **Vertical** orientation. You can set any section to **Expanded** when the form opens or refreshes.

You can also control the **Expanded** and **Collapsed** states in **Custom code** by using the following commands:

js [Copy code to clipboard] Copy

```js
context.panel.expandSection(id);
context.panel.collapseSection(id);
```

> Note
>
> The full list of the Business Form panel parameters can be found in the [Custom Code](/docs/plugins/volkovlabs-form-panel/latest/custom-code/#parameters) section of the panel’s documentation.

### Buttons Only

The **Buttons Only** layout displays only standard buttons on your form. The standard buttons include **Submit**, **Reset**, and **Save default**. This layout hides all panel options related to other form elements, which provides a cleaner edit mode.

## Add a form element

To add a form element, go to the **Form Elements** category. Specify the element ID, label, and type. After you click **Add Element**, you can configure additional element options.

Element types have specific options. For example, the **Text area** type includes a **Rows** option that controls the element size on the dashboard.

[](/media/docs/grafana/panels-visualizations/business-forms/add-form-element.png)

## Move a form element

> Note
>
> Supported starting from the version 3.0.0.

You can drag-and-drop form elements in the edit mode to change their order on the form.

[](/media/docs/grafana/panels-visualizations/business-forms/drag.png)

## Form element types

The following image shows all available element types before version 4.4.0:

[](/media/docs/grafana/panels-visualizations/business-forms/elements-demo.png)

- [`Custom button`](/plugins/business-forms/elements/button/)
- [`Checkbox List with custom options`](/plugins/business-forms/elements/button/)
- [`Code Editor`](/plugins/business-forms/elements/code-editor/)
- [`Color Picker`](/plugins/business-forms/elements/button/)
- [`Date`](/plugins/business-forms/elements/date/)
- [`Date and Time`](/plugins/business-forms/elements/date-time/)
- [`File`](/plugins/business-forms/elements/file/)
- [`Link`](/plugins/business-forms/elements/link/)
- [`Multi-select with custom options`](/plugins/business-forms/elements/multi-select/)
- [`Number Input`](/plugins/business-forms/elements/number-input/)
- [`Number Slider`](/plugins/business-forms/elements/number-slider/)
- [`Password Input`](/plugins/business-forms/elements/password-input/)
- [`Radio Group with boolean options`](/plugins/business-forms/elements/radio-group-boolean-options/)
- [`Radio Group with custom options`](/plugins/business-forms/elements/radio-group-custom-options/)
- [`Read-only`](/plugins/business-forms/elements/read-only/)
- [`Read-only Text Area`](/plugins/business-forms/elements/read-only-text-area/)
- [`String Input`](/plugins/business-forms/elements/string-input/)
- [`Select with Custom options`](/plugins/business-forms/elements/select-with-options/)
- [`Text Area`](/plugins/business-forms/elements/text-area/)
- [`Time`](/plugins/business-forms/elements/time/)

## Common configuration

There are three form elements with select options.

- Multi Select with Custom Options
- Select with Custom Options
- Radio Group with Custom Options

All three have some options in common.

#### Icon

[](/media/docs/grafana/panels-visualizations/business-forms/icons.png)

### Custom color and background color for elements

> Note
>
> Element colors are supported starting from version 4.0.0.

You can customize the following **Form Elements** colors:

- Background color
- Label background
- Label color

[](/media/docs/grafana/panels-visualizations/business-forms/colors.png)

### Select options from a query

> Note
>
> This feature is supported starting from version 3.2.1.

You can reference a query from any configured data source to populate form elements dynamically. Specify the **Label** and **Value** fields.

[](/media/docs/grafana/panels-visualizations/business-forms/options-from-query.png)

### Select options from GET Options code

> Note
>
> This feature is supported starting from version 3.5.0.

**Get Options Code** lets you hard code options using the code editor. The code must:

- Return an array with `{label,value}` objects.
- Be synchronous.

[](/media/docs/grafana/panels-visualizations/business-forms/options-from-code.png)

### Set options received asynchronously

**Get Options Code** doesn’t support asynchronous code. However, you can still work with options received asynchronously.

Complete the following steps:

#### Step 1: Initial request

[](/media/docs/grafana/panels-visualizations/business-forms/initial-req-for-options.png)

In the following example, the code finds the required element and updates its options. After the data is received, the element is updated using `context.panel.onChangeElements()`.

js [Copy code to clipboard] Copy

```js
const url = "https://jsonplaceholder.typicode.com/users";
const element = context.panel.elements.find(
  (element) => element.id === "select"
);

async function fetchData() {
  try {
    const response = await fetch(url);
    const body = await response.json();

    const optionsNew = body.map((element) => ({
      label: element.name,
      value: element.username,
    }));

    const newElement = {
      ...element,
      options: optionsNew,
    };
    const newElements = context.panel.elements.map((element) => {
      if (element.id === "select") {
        return newElement;
      }
      return element;
    });
    context.panel.onChangeElements(newElements);
  } catch (error) {
    console.log("Error:", error);
  }
}

return fetchData();
```

#### Step 2. Create the GET Options code

Set options for your element from `context.panel.elements`.

[](/media/docs/grafana/panels-visualizations/business-forms/set-options-from-code.png)

js [Copy code to clipboard] Copy

```js
const element = context.panel.elements.find(
  (element) => element.id === "select"
);

if (element?.options) {
  return element?.options;
}
```

### Custom Values

> Note
>
> Available starting from version 4.9.0.

If enabled, users can enter custom values in the **Select** and **Multi select** form element types.

## Conditional visibility

Every form element has a **Show If returned value is true** parameter where you can enter JavaScript code.

- If this code returns `true`, the element is shown on the panel.
- If this code returns `false`, the element is hidden from the panel.

[](/media/docs/grafana/panels-visualizations/business-forms/select.png)

Example code to check the current value of the `select` element and show the `dateTime` element if the value equal to `max`:

js [Copy code to clipboard] Copy

```js
const select = context.panel.elements.find(
  (element) => element.id === "select"
);

if (select) {
  return select.value === "max";
}
```

> Note
>
> Below is supported starting from the version 3.2.1.

You can use dashboard and global variables in your JavaScript code.

[](/media/docs/grafana/panels-visualizations/business-forms/var.png)

Example code to check the value of the dashboard variable `var`:

js [Copy code to clipboard] Copy

```js
const test = context.grafana.replaceVariables("$var");
return test === "test";
```

## Field mapping

> Note
>
> This feature is supported starting from version 4.4.0.

To map initial form element values, use the **Initial Fields** options category.

### Data source 4.4.0

[](/media/docs/grafana/panels-visualizations/business-forms/field-name-ds-440.png)

### Query 4.4.0

[](/media/docs/grafana/panels-visualizations/business-forms/field-name-query-440.png)

> Note
>
> This feature is supported in versions 3.2.1 through 4.0.0.

You can specify field-to-form mapping using the **Field name** parameter for **Data Source** or the **Query Field** parameter for **Query**.

### Data Source

[](/media/docs/grafana/panels-visualizations/business-forms/field-name-ds.png)

The `Field Name` option for each Form Element is located under the code editor when the data source option is enabled. Specify a field name for appropriate form element from the data source response.

### Query

[](/media/docs/grafana/panels-visualizations/business-forms/field-name-query.png)

The `Query Field` option for each Form Element is located under the code editor when the Query option is enabled. Specify a field name for appropriate form element from the Query response.
