---
title: "Context parameters | Grafana Plugins documentation"
description: "Learn how to use context parameters to access panel data, form elements, Grafana services, and other functionality in custom code."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Context parameters

## context.element

Returns the current element.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.element;
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
const currentElement = context.element;
```

## Panel

### panel.data

Returns the result set of panel queries.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.data;
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
const data = context.panel.data;
```

### panel.elements

Returns all form elements.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.elements;
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
const currentElements = context.panel.elements;
```

### panel.initial

Returns the parsed values from the initial request.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.initial;
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
const initialValues = context.panel.initial;
```

### panel.initialRequest()

Performs an initial request to reload the panel.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.initialRequest();
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
if (context.panel.response && context.panel.response.ok) {
  context.grafana.notifySuccess(["Update", "Values updated successfully."]);
  context.panel.initialRequest();
} else {
  context.grafana.notifyError([
    "Error",
    `An error occurred updating values: ${context.panel.response.status}`,
  ]);
}
```

### panel.options

Returns the panel’s options.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.options;
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
const options = context.panel.options;
```

### panel.onOptionsChange(options)

Modifies the panel options and triggers a refresh. The `context.panel.onOptionsChange()` handler is required to update the panel.

> Note
>
> The `context.panel.onOptionsChange(options)` handler calls the refresh panel.
>
> If you use it in the initial request, don’t forget to disable the Synchronize option. Enabling the Synchronize option and using it together with `context.panel.onOptionsChange(options)` in the Initial Request will cause the panel to reload constantly.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.onOptionsChange(options);
```

#### Example

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
const options = context.panel.options;
context.panel.onOptionsChange({
  ...options,
  sync: true,
});
```

#### Arguments

- `options` *Object*
  Panel options. Use `console.log('options:',context.panel.options)` to check all fields

### panel.onChangeElements(options)

Updates elements in the local state. Accepts an array of new elements.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.onChangeElements(elements);
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.onChangeElements(
  context.panel.elements.map((element) => ({
    ...element,
    value: json[element.id],
  }))
);
```

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.onChangeElements(
  elements.map((element) => {
    return element.id === "name" ? { ...element, value: "test" } : element;
  })
);
```

#### Arguments

- `elements` *Array*
  Array of elements.

### panel.patchFormValue(values)

Updates the values of the specified elements. Accepts an object.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.patchFormValue(elements);
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
// only passed elements should be updated, the rest stay the same
context.panel.patchFormValue({ name: "Alex" });
```

JavaScript [Copy code to clipboard] Copy

```javascript
// name and isAdmin
context.panel.patchFormValue({ name: "Alex", isAdmin: true });
```

#### Arguments

- `values` *Object*
  Object. Each key is the `id` of the element and the `value` of the key is the value of the element

### panel.setFormValue(values)

Updates the values of elements. Accepts an object. If a value is not passed for an element, the initial value is used or the value is cleared.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.setFormValue(elements);
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.setFormValue({ name: "Alex", isAdmin: true });
```

#### Arguments

- `values` *Object*
  Object. Each key is the `id` of the element and the `value` of the key is the value of the element

### panel.formValue()

Returns the current form values as an object.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.formValue(elements);
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
const payload = context.panel.formValue;
// return { name: 'Alex', isAdmin: true }
```

### panel.response

Returns the current request’s response.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.response;
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
if (context.panel.response && context.panel.response.ok) {
  context.grafana.notifySuccess(["Update", "Values updated successfully."]);
  context.grafana.refresh();
} else {
  context.grafana.notifyError([
    "Update",
    `An error occurred updating values: ${context.panel.response.status}`,
  ]);
}
```

### panel.setInitial(values)

Specifies initial values for a custom initial request to highlight modified values and requests a user’s confirmation.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.setInitial(values);
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
// Initial custom code example
const payload = {};

context.panel.elements.forEach((element) => {
  if (!element.value) {
    return;
  }

  payload[element.id] = element.value;
});

context.panel.setInitial(payload);

return;
```

#### Arguments

- `values` *Object*

  Object. Each key is the `id` of the element and the `value` of the key is the value of the element

  JavaScript [Copy code to clipboard] Copy

  ```javascript
  // example
  {
    "max": 100,
    "min": 10,
    "speed": 54,
    "option1": "option1",
    "option2": "option1",
    "code": "option1"
  }
  ```

## Errors

### panel.setError(message)

Displays an error on panel.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.setError(message);
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.setError("Message");
```

[](/media/docs/grafana/panels-visualizations/business-forms/set-error.png)

#### Arguments

- `message` *String*

  Error Message

## Buttons

### panel.enableSubmit()

Enables the Submit button.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.enableSubmit();
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
if (condition) {
  context.panel.enableSubmit();
}

context.panel.enableSubmit();
```

### panel.disableSubmit()

Disables the Submit button.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.disableSubmit();
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
if (condition) {
  context.panel.disableSubmit();
}

//

context.panel.disableSubmit();
```

### panel.enableReset()

Enables the Reset button.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.enableReset();
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
if (condition) {
  context.panel.enableReset();
}

context.panel.disableSubmit();
```

### panel.disableReset()

Disables the Reset button.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.disableReset();
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
if (condition) {
  context.panel.disableReset();
}

context.panel.disableReset();
```

### panel.enableSaveDefault()

Enables the Save Default button.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.enableSaveDefault();
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
if (condition) {
  context.panel.enableSaveDefault();
}

context.panel.enableSaveDefault();
```

### panel.disableSaveDefault()

Disables the Save Default button.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.disableSaveDefault();
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
if (condition) {
  context.panel.disableSaveDefault();
}

context.panel.disableSaveDefault();
```

## Sections Utils

### sectionsUtils.add(section)

Adds a new section.

*Added in: v4.9.0*

> Note
>
> The `context.panel.sectionsUtils.add(section)` handler calls the refresh panel.
>
> If you use it in the initial request, don’t forget to disable the Synchronize option. Enabling the Synchronize option and using it together with `context.panel.sectionsUtils.add(section)` in the Initial Request will cause the panel to reload constantly.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.sectionsUtils.add(section);
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.sectionsUtils.add({
  name: "Section 1",
  id: "id-s-1",
  elements: [],
});

const newSection = {
  name: "Section 2",
  id: "id-s-2",
  elements: ["elem-1", "elem-2"],
};

context.panel.sectionsUtils.add(newSection);
```

#### Arguments

- `section` *Object*
  Section. Each section include `name`, `id`, `elements`

#### Common Section properties

- `name` *string*. Section name.
- `id` *string*. Section Id.
- `elements` *Array*. Elements ids assign to section. Could Be empty array.

### sectionsUtils.update(sections)

Updates existing sections.

*Added in: v4.9.0*

> Note
>
> The `context.panel.sectionsUtils.update(sections)` handler calls the refresh panel.
>
> If you use it in the initial request, don’t forget to disable the Synchronize option. Enabling the Synchronize option and using it together with `context.panel.sectionsUtils.update(sections)` in the Initial Request will cause the panel to reload constantly.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.sectionsUtils.update(sections);
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.sectionsUtils.update([{ name: "Section 1", id: "id-s-1" }]);
```

#### Arguments

- `sections` *Array*
  Sections. Each section include `name` and `id`

### sectionsUtils.remove(id)

Removes a section.

*Added in: v4.9.0*

> Note
>
> The `context.panel.sectionsUtils.remove(id)` handler calls the refresh panel.
>
> If you use it in the initial request, don’t forget to disable the Synchronize option. Enabling the Synchronize option and using it together with `context.panel.sectionsUtils.remove(id)` in the Initial Request will cause the panel to reload constantly.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.removeSection(id);
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.removeSection("id-s-1");
```

#### Arguments

- `id` *string*. Section id.

### sectionsUtils.assign(id,elements)

Assigns elements to a section.

*Added in: v4.9.0*

> Note
>
> The `context.panel.sectionsUtils.assign(id,elements)` handler calls the refresh panel.
>
> If you use it in the initial request, don’t forget to disable the Synchronize option. Enabling the Synchronize option and using it together with `context.panel.sectionsUtils.assign(id,elements)` in the Initial Request will cause the panel to reload constantly.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.sectionsUtils.assign(id, elements);
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.sectionsUtils.assign("id-s-1", ["elem-1", "elem-2"]);
```

#### Arguments

- `id` *string*. Section Id.
- `elements` *Array*. Array of elements ids

### sectionsUtils.unassign(elements)

Unassigns elements from a section.

*Added in: v4.9.0*

> Note
>
> The `context.panel.sectionsUtils.unassign(elements)` handler calls the refresh panel.
>
> If you use it in the initial request, don’t forget to disable the Synchronize option. Enabling the Synchronize option and using it together with `context.panel.sectionsUtils.unassign(elements)` in the Initial Request will cause the panel to reload constantly.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.sectionsUtils.unassign(elements);
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.sectionsUtils.unassign(["elem-1", "elem-2"]);
```

#### Arguments

- `elements` *Array*. Array of elements ids

### sectionsUtils.get(id)

Returns the section with the specified ID, including all elements assigned to it.

*Added in: v4.9.0*

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.sectionsUtils.get(id);
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.sectionsUtils.get("section-id");
```

#### Arguments

- `id` *string*. Section Id

### sectionsUtils.getAll()

Returns all sections with their assigned elements.

*Added in: v4.9.0*

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.sectionsUtils.getAll();
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.sectionsUtils.getAll();
```

### sectionsUtils.collapse(id)

Collapses the specified section.

*Updated in: v4.9.0*

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.sectionsUtils.collapse(id);
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.sectionsUtils.collapse("section-id");
```

#### Arguments

- `id` *string*. Section Id

### sectionsUtils.expand(id)

Expands the specified section.

*Added in: v4.9.0*

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.sectionsUtils.expand(id);
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.sectionsUtils.expand("section-id");
```

#### Arguments

- `id` *string*. Section Id

### sectionsUtils.toggle(id)

Toggles the specified section between collapsed and expanded states.

*Added in: v4.9.0*

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.sectionsUtils.toggle(id);
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.sectionsUtils.toggle("section-id");
```

#### Arguments

- `id` *string*. Section Id

### sectionsUtils.expandedState

Returns Expand/Collapse State for Sections.

*Added in: v4.9.0*

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.sectionsUtils.expandedState;
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
const sectionsExpandedState = context.panel.sectionsUtils.expandedState;
```

## Grafana

### grafana.locationService

Provides access to Grafana’s `locationService` for working with the browser’s location and history.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.grafana.locationService;
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
context.grafana.locationService.reload();

const history = context.grafana.locationService.history;
```

### grafana.backendService

Provides access to Grafana’s `backendService` for communicating with remote backends such as the Grafana backend or a data source.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.grafana.backendService;
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
const deviceID = context.grafana.backendService.deviceID;
```

### grafana.notifyError(\[header, message])

Displays an error.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.grafana.notifyError([header, message]);
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
context.grafana.notifyError([
  "Error",
  `An error occurred updating values: ${context.panel.response.status}`,
]);

context.grafana.notifyError(["Error Title", `Show error message`]);
```

[](/media/docs/grafana/panels-visualizations/business-forms/notify-error.png)

#### Arguments

- `header` *string*. Error title
- `message` *string*. Error message

### grafana.notifySuccess(\[header, message])

Displays a success notification.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.grafana.notifySuccess([header, message]);
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
context.grafana.notifySuccess(["Success Title", `Success message`]);
```

#### Arguments

- `header` *string*. Success title
- `message` *string*. Success message

### grafana.notifyWarning(\[header, message])

Displays a warning.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.grafana.notifyWarning([header, message]);
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
context.grafana.notifyWarning(["warning Title", `warning message`]);
```

#### Arguments

- `header` *string*. Warning title
- `message` *string*. Warning message

### grafana.eventBus

Publish and subscribe to application events.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.grafana.eventBus;
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
const subscriber = eventBus.getStream(RefreshEvent).subscribe(() => {
  // to do
});
```

### grafana.templateService

Provides access to Grafana’s `templateService` for working with variables and updating the time range.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.grafana.templateService;
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
const regEx = context.grafana.templateService.regex;
```

### grafana.refresh()

Refreshes dashboard panels using application events.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.grafana.refresh();
```

## Utils

### utils.fileToBase64(file)

Converts a file to base64 format.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.utils.fileToBase64(file);
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
const payload = {};

context.panel.elements.forEach((element) => {
  if (!element.value) {
    return;
  }

  payload[element.id] = element.value;
});

/**
 * Data Source payload
 */
const getPayload = async () => {
  const file = payload.file[0];
  const base64 = await context.utils.fileToBase64(file);

  return {
    file,
    base64,
  };
};

return getPayload();
```

#### Arguments

- `file` *File*. A File provides information about files.

### utils.toDataQueryResponse(res)

Parses the results from `/api/ds/query` into a `DataQueryResponse` object.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.utils.toDataQueryResponse(res);
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
const dataQuery = context.utils.toDataQueryResponse(context.panel.response);
```

#### Arguments

- `res` *response*. The HTTP response data
