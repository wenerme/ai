---
title: "Custom button | Grafana Plugins documentation"
description: "Learn how to add custom buttons with configurable styles, icons, and custom code execution to your forms."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Custom button

The **Custom button** lets you add a custom button to the panel.

- Custom code for execution
- Different variants
- Customization options
- Placement in the form or in the main buttons after the form

[](/media/docs/grafana/panels-visualizations/business-forms/button-element.png)

> Note
>
> Custom buttons are supported starting from the version 4.4.0.

In addition to all other types, in release 4.4.0, a custom button type was added.

With the **Button** Form Elements type, you can add more functionality to your form, such as calculating a value, performing validation checks, or any other custom action.

You can style a custom button with various options. You can configure colors, size, and position.

[](/media/docs/grafana/panels-visualizations/business-forms/buttons-dash.png)

With the **Button place** option, you can place the custom button element among other form elements or in the form footer, next to the standard buttons.

[](/media/docs/grafana/panels-visualizations/business-forms/buttons-options.png)

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
  type: "button",
  customCode: "",
  buttonLabel: "",
  icon: "google",
  size: "md",
  variant: "primary",
  foregroundColor: "",
  backgroundColor: "",
  show:'form',
  labelWidth: 10,
  width: 30,
  tooltip: '',
  section: '',
  unit: '',
  value: '',
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
  type: "button",
  customCode: "",
  buttonLabel: "",
  icon: "google",
  size: "md",
  variant: "primary",
  foregroundColor: "",
  backgroundColor: "",
  show: "form",
  labelWidth: 15,
  width: 150,
  tooltip: "",
  section: "",
  unit: "",
  value: "",
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

  *string*. Optional.
  Current element value. Not supported for custom button.
- ### `type`

  *string*. Required.
  Element type: ‘button’.
- ### `customCode`

  *string*. Required.
  Code to execute on button click.

js [Copy code to clipboard] Copy

```js
{
  customCode: 'console.log('click')'
}
```

- ### `buttonLabel`

  *string*. Required.
  Button label. Keep empty string do not show label.
- ### `icon`

  *string*. Required.
  Button icon name. Keep empty string do not show icon. All available icons: [`Grafana Icons`](https://developers.grafana.com/ui/latest/index.html?path=%2Fstory%2Fdocs-overview-icon--icons-overview)
- ### `size`

  *string*. Required.
  Button size: ‘sm’ | ‘md’ | ’lg’
- ### `variant`

  *string*. Required.
  Button display variant: ‘destructive’ | ‘hidden’ | ‘primary’ | ‘secondary’ | ‘custom’.

  If `custom` is selected, set custom colors for the button.
- ### `foregroundColor`

  *string*. Required.
  Label button color in hex format.
- ### `backgroundColor`

  *string*. Required.
  Button main color in hex format.
- ### `show`

  *string*. Required.
  Show button in form or show button in buttons after form. ‘bottom’ | ‘form’.

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

The code-editor element does not support options for selection. However, they must be specified in the element object

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
  type: "button",
  customCode: "",
  buttonLabel: "",
  icon: "google",
  size: "md",
  variant: "primary",
  foregroundColor: "",
  backgroundColor: "",
  show: "form",
  labelWidth: 10,
  width: 35,
  tooltip: '',
  section: '',
  unit: '',
  value: '',
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

  *string*. Optional.
  Current element value. Not supported for custom button.
- ### `type`

  *string*. Required.
  Element type: ‘button’.
- ### `customCode`

  *string*. Required.
  Code to execute on button click.

js [Copy code to clipboard] Copy

```js
{
  customCode: 'console.log('click')'
}
```

- ### `buttonLabel`

  *string*. Required.
  Button label. Keep empty string do not show label.
- ### `icon`

  *string*. Required.
  Button icon name. Keep empty string do not show icon. All available icons: [`Grafana Icon`](https://developers.grafana.com/ui/latest/index.html?path=%2Fstory%2Fdocs-overview-icon--icons-overview)
- ### `size`

  *string*. Required.
  Button size. ‘sm’ | ‘md’ | ’lg’
- ### `variant`

  *string*. Required.
  Button display variant. ‘destructive’ | ‘hidden’ | ‘primary’ | ‘secondary’ | ‘custom’. If `custom` is selected, set custom colors for the button.
- ### `foregroundColor`

  *string*. Required.
  Label button color in hex format.
- ### `backgroundColor`

  *string*. Required.
  Button main color in hex format.
- ### `show`

  *string*. Required.
  Show button in form or show button in buttons after form. ‘bottom’ | ‘form’

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

**fieldName** , **queryField**, **value** not supported with custom button - use custom code instead.
