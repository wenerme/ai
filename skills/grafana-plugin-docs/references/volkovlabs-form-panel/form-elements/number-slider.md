---
title: "Number slider | Grafana Plugins documentation"
description: "Learn how to use the number slider form element with configurable minimum, maximum, and step values."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Number slider

The **Number Slider** is a horizontal line with a toggle that users can drag left and right with a mouse. Alternatively, users can enter the number manually.

This element has the following specific options:

- **Min**: Sets the minimum allowed input number.
- **Max**: Sets the maximum allowed input number.
- **Step**: Sets the value of each movement the toggle makes.

## Change elements model

> Note
>
> Use this model to set elements if you use the [`context.panel.onChangeElements([])`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#panelonchangeelementsoptions) method.
>
> Dynamic element creation and manipulation through the panel fetches the complete element model and sets it through a method. The elements aren’t saved in the panel options.

js [Copy code to clipboard] Copy

```js
{
  uid:'',
  id: '',
  title: '',
  type: 'slider',
  min: 0,
  max: 10,
  step: 1,
  labelWidth: 10,
  width: null,
  tooltip: '',
  section: '',
  unit: '',
  value: 5,
  disabled: false,
  background: '',
  labelBackground:'',
  labelColor: '',
  helpers: {
    showIf: () => true,
    disableIf: () => false,
    getOptions: () => [],
  }
}
```

### Code example

JavaScript [Copy code to clipboard] Copy

```javascript
/**
 * Hardcoded element
 */
const element = {
  uid: "uid-123",
  id: "element-123",
  title: "Element",
  type: "slider",
  min: 0,
  max: 10,
  step: 1,
  labelWidth: 15,
  width: null,
  tooltip: "",
  section: "",
  unit: "",
  value: 5,
  background: "",
  labelBackground: "",
  labelColor: "",
  helpers: {
    showIf: () => true,
    disableIf: () => false,
    getOptions: () => [],
  },
};

const elementsForUI = [];
elementsForUI.push(element);

context.panel.onChangeElements(elementsForUI);
```

### Code example with query action for initial request

[](/media/docs/grafana/panels-visualizations/business-forms/query-action.png)

js [Copy code to clipboard] Copy

```js
/**
 * Convert JSON to form elements array
 */
const formElements = JSON.parse(
  context.panel.data.series[0].fields[0].values[0]
);
/**
 * Set elements with helpers
 */
context.panel.onChangeElements(
  formElements.map((element) => {
    const elementInForm = context.panel.elements.find(
      (item) => item.uid === element.uid
    );
    let value = element.value;

    if (element.uid === "comment" && elementInForm) {
      value = elementInForm.value;
    }

    return {
      ...element,
      value,
      helpers: {
        showIf: () => true,
        disableIf: () => false,
        getOptions: () => element.options,
      },
    };
  })
);
```

## Element parameters

- ### `value`

  *number*. Required.
  Current element value. Format: ‘2025-01-28T08:07:37.359Z’
- ### `type`

  *string*. Required.
  Element type: ‘slider’.
- ### `min`

  *number*. Required.
  Sets the minimum allowed number
- ### `max`

  *number*. Required.
  Sets the maximum allowed number
- ### `step`

  *number*. Required.
  Sets the value of every move the toggle makes.

- ### `uid`

  *string*. Required.
  A unique identifier used for correct mapping on the UI.
- ### `id`

  *string*. Required.
  The unique identifier of the element.
- ### `title`

  *string*. Required.
  The title or label of the element. Equivalent to the ‘Label’ in the UI editor.

[](/media/docs/grafana/panels-visualizations/business-forms/label-field.png)

- ### `labelWidth`

  *Number* | *null* . Required.
  The element label width.
- ### `width`

  *Number* | *null*. Required.
  The element width.
- ### `tooltip`

  *string*. Required.
  The element tooltip. Leave as an empty string (’’) if not displayed.
- ### `section`

  *string*. Required.
  The unique section identifier (section ID). Specify this if the element is in a section. Leave as an empty string (’’) if the element has no section.
- ### `unit`

  *string*. Required.
  The units of measurement. Located to the right of the element. Leave as an empty string (’’) if the element has no unit.

[](/media/docs/grafana/panels-visualizations/business-forms/unit.png)

- ### `background`

  *string*. Optional.
  The background color as a hex color code.
- ### `labelBackground`

  *string*. Optional. The label background color as a hex color code.
- ### `labelColor`

  *string*. Optional.
  The label color as a hex color code.
- ### `helpers`

  Helpers provide information about the item display or its disabled state and return options.

js [Copy code to clipboard] Copy

```js
 {
  showIf: () => true,
  disableIf: () => false,
  getOptions: () => options || [],
 }
```

- ### `helpers.showIf`

  *Function*. Required. Returns *true* or *false*. Controls whether the element displays on the UI.
- ### `helpers.disableIf`

  *Function*. Required. Returns *true* or *false*. Controls whether the element is disabled on the UI.
- ### `helpers.getOptions`

  *Function*. Required. Returns an array of options.

  Each option contains the following properties:

  - `value`.
    *string*. Required. The option value.
  - `label`.
    *string*. Required. The option label.

### Note

**width** , set to null for correct slider position.

The `Number Slider` element does not support options for selection. However, they must be specified in the element object

## Change options model

> Note
>
> Use this model to set elements if you use the [`context.panel.onOptionsChange({})`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#panelonoptionschangeoptions) method.
>
> Elements added through this method are added to the panel options. The element’s operation might not match the expected behavior.
>
> If you use this method in the initial request, disable the Synchronize option. Enabling the Synchronize option with `context.panel.onOptionsChange()` in the Initial Request causes the panel to reload constantly.

[](/media/docs/grafana/panels-visualizations/business-forms/infinity-reload.png)

js [Copy code to clipboard] Copy

```js
{
  uid:'',
  id: '',
  title: '',
  type: 'slider',
  min: 0,
  max: 10,
  step: 1,
  labelWidth: 10,
  width: null,
  tooltip: '',
  section: '',
  unit: '',
  value: 5,
  showIf: '',
  disableIf: '',
  fieldName: '',
  queryField: {},
  background: '',
  labelBackground:'',
  labelColor: '',
}
```

### Code example

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.onOptionsChange({
  ...context.panel.options,
  elements: context.panel.options.elements.map((element) => {
    return element.id === "name" ? { ...element, value: "test" } : element;
  }),
});
```

JavaScript [Copy code to clipboard] Copy

```javascript
const formElements = JSON.parse(
  context.panel.data.series[0].fields[0].values[0]
);

context.panel.onOptionsChange({
  ...context.panel.options,
  elements: formElements,
});
```

- ### `value`

  *number*. Required.
  Current element value. Format: ‘2025-01-28T08:07:37.359Z’
- ### `type`

  *string*. Required.
  Element type: ‘slider’.
- ### `min`

  *number*. Required.
  Sets the minimum allowed number
- ### `max`

  *number*. Required.
  Sets the maximum allowed number
- ### `step`

  *number*. Required.
  Sets the value of every move the toggle makes.

- ### `uid`

  *string*. Required.
  A unique identifier used for correct mapping on the UI.
- ### `id`

  *string*. Required.
  The unique identifier of the element.
- ### `title`

  *string*. Required.
  The title or label of the element. Equivalent to the ‘Label’ in the UI editor.

  [](/media/docs/grafana/panels-visualizations/business-forms/label-field.png)
- ### `labelWidth`

  *Number* | *null* . Required.
  The element label width.
- ### `width`

  *Number* | *null*. Required.
  The element width.
- ### `tooltip`

  *string*. Required.
  The element tooltip. Leave as an empty string (’’) if not displayed.
- ### `section`

  *string*. Required.
  The unique section identifier (section ID). Specify this if the element is in a section. Leave as an empty string (’’) if the element has no section.
- ### `unit`

  *string*. Required.
  The units of measurement. Located to the right of the element. Leave as an empty string (’’) if the element has no unit.

  [](/media/docs/grafana/panels-visualizations/business-forms/unit.png)
- ### `background`

  *string*. Optional.
  The background color as a hex color code.
- ### `labelBackground`

  *string*. Optional.
  The label background color as a hex color code.
- ### `labelColor`

  *string*. Optional.
  The label color as a hex color code.
- ### `showIf`

  *string*. Optional.
  The “Show if” function of the element returns true or false. Controls whether the element displays on the UI.

  js [Copy code to clipboard] Copy

  ```js
  {
    showIf: "if (condition) {\n  return true\n}\n return false";
  }
  ```
- ### `disableIf`

  *string*. Optional.
  The “Disable if” function of the element returns true or false. Controls whether the element is disabled on the UI.

  js [Copy code to clipboard] Copy

  ```js
  {
    disableIf: "if (condition) {\n  return true\n}\n return false";
  }
  ```
- ### `fieldName`

  *string*. Optional.
  The name field from the DataSource initial request. Use for the initial value. We recommend using `value` instead.
- ### `queryField`

  *object*. Optional.
  The name query from the Query initial request. Use for the initial value. We recommend using `value` instead.

  Parameters:

  - `refId`
    *string*. The frame refId.
  - `value`
    *string*. The field name.
  - `label`
    *string*. The format: `refId:value` (for example, `A:time`).

### Note

**width** , set to null for correct slider position.
