---
title: "Custom code | Grafana Plugins documentation"
description: "Learn how to use custom code to access panel options, REST API responses, form elements, and Grafana services in Business Forms."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Custom code

You can use custom code to access the panel’s options, REST API responses, form elements, and various Grafana services.

Custom code is executed after the `Initial` and `Update` requests and when `Element Value Changed` occurs.

## Parameters

Expand table

| Parameter                                                                                                                                                               | Description                                                                                                                                   | Initial, Update | Change value | ShowIf, DisableIf, GET options |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|-----------------|--------------|--------------------------------|
| [`context.element`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#contextelement)                                                          | Current element                                                                                                                               |                 | YES          |                                |
| [`context.panel.data`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#paneldata)                                                            | Result set of panel queries.                                                                                                                  | YES             | YES          | YES (For `Get Options`)        |
| [`context.panel.elements`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#panelelements)                                                    | Form elements.                                                                                                                                | YES             | YES          | YES                            |
| [`context.panel.initial`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#panelinitial)                                                      | Parsed values from the initial request.                                                                                                       | YES             | YES          |                                |
| [`context.panel.initialRequest()`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#panelinitialrequest)                                      | Performs an initial request to reload the panel.                                                                                              | YES             | YES          |                                |
| [`context.panel.options`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#paneloptions)                                                      | Panel’s options.                                                                                                                              | YES             | YES          |                                |
| [`context.panel.onOptionsChange({})`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#panelonoptionschangeoptions)                           | Modifies a handler to refresh the panel.                                                                                                      | YES             | YES          |                                |
| [`context.panel.onChangeElements([])`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#panelonchangeelementsoptions)                         | Updates elements in the local state. Change elements. Accepts an array of new elements.                                                       | YES             | YES          |                                |
| [`context.panel.patchFormValue({})`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#panelpatchformvaluevalues)                              | Update the value of the elements. Accepts an object.                                                                                          | YES             | YES          |                                |
| [`context.panel.setFormValue({})`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#panelsetformvaluevalues)                                  | Update the value of the elements. Accepts an object. If value is not passed to the element, the value should be used from initial or cleared. | YES             | YES          |                                |
| [`context.panel.formValue()`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#panelformvalue)                                                | Contains a current form value as object.                                                                                                      | YES             | YES          |                                |
| [`context.panel.response`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#panelresponse)                                                    | Request’s response.                                                                                                                           | YES             |              |                                |
| [`context.panel.setInitial({})`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#panelsetinitialvalues)                                      | Specifies initial values for a custom initial request to highlight modified values and requests a user’s confirmation.                        | YES             |              |                                |
| [`context.panel.enableSubmit()`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#panelenablesubmit)                                          | Enable Submit button                                                                                                                          | YES             | YES          |                                |
| [`context.panel.disableSubmit()`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#paneldisablesubmit)                                        | Disable Submit button                                                                                                                         | YES             | YES          |                                |
| [`context.panel.enableReset()`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#panelenablereset)                                            | Enable Reset button                                                                                                                           |                 | YES          |                                |
| [`context.panel.disableReset()`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#paneldisablereset)                                          | Disable Reset button                                                                                                                          |                 | YES          |                                |
| [`context.panel.enableSaveDefault()`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#panelenablesavedefault)                                | Enable Save Default button                                                                                                                    |                 | YES          |                                |
| [`context.panel.disableSaveDefault()`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#paneldisablesavedefault)                              | Disable Save Default button                                                                                                                   |                 | YES          |                                |
| [`context.panel.setError('Message')`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#panelseterrormessage)                                  | Displays an error on panel.                                                                                                                   |                 | YES          |                                |
| [`context.panel.sectionsUtils.add(section)`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#sectionsutilsaddsection)                        | Add a new Section. Added in v4.9.0.                                                                                                           | YES             | YES          |                                |
| [`context.panel.sectionsUtils.update(sections)`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#sectionsutilsupdatesections)                | Change Sections. Added in v4.9.0.                                                                                                             | YES             | YES          |                                |
| [`context.panel.sectionsUtils.remove(id)`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#sectionsutilsremoveid)                            | Remove Section. Added in v4.9.0.                                                                                                              | YES             | YES          |                                |
| [`context.panel.sectionsUtils.assign(id, elements)`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#sectionsutilsassignidelements)          | Assign elements to Section. Added in v4.9.0.                                                                                                  | YES             | YES          |                                |
| [`context.panel.sectionsUtils.unassign(elements)`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#sectionsutilsunassignelements)            | Unassign elements from Section. Added in v4.9.0.                                                                                              | YES             | YES          |                                |
| [`context.panel.sectionsUtils.get(id)`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#sectionsutilsgetid)                                  | Get Section by id. Return Section with elements assign to section. Added in v4.9.0.                                                           | YES             | YES          |                                |
| [`context.panel.sectionsUtils.getAll()`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#sectionsutilsgetall)                                | Get All Sections. Return Sections with elements assign to each section. Added in v4.9.0.                                                      | YES             | YES          |                                |
| [`context.panel.sectionsUtils.collapse(id)`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#sectionsutilscollapseid)                        | Collapse Section. Updated in v4.9.0.                                                                                                          | YES             | YES          |                                |
| [`context.panel.sectionsUtils.expand(id)`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#sectionsutilsexpandid)                            | Expand Section. Updated in v4.9.0.                                                                                                            | YES             | YES          |                                |
| [`context.panel.sectionsUtils.toggle(id)`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#sectionsutilstoggleid)                            | Toggle (Collapse/Expand) Section. Updated in v4.9.0.                                                                                          | YES             | YES          |                                |
| [`context.panel.sectionsUtils.expandedState`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#sectionsutilsexpandedstate)                    | Return Expand/Collapse State for Sections. Updated in v4.9.0.                                                                                 | YES             | YES          |                                |
| [`context.grafana.locationService`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#grafanalocationservice)                                  | Grafana’s `locationService` function to work with the browser’s location and history.                                                         | YES             | YES          |                                |
| [`context.grafana.backendService`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#grafanabackendservice)                                    | Grafana’s `backendService` used to communicate to a remote backend such as the Grafana backend, a datasource etc.                             | YES             |              |                                |
| [`context.grafana.notifyError(['Header', 'Message'])`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#grafananotifyerrorheader-message)     | Displays an error.                                                                                                                            | YES             | YES          |                                |
| [`context.grafana.notifySuccess(['Header', 'Message'])`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#grafananotifysuccessheader-message) | Displays a success notification.                                                                                                              | YES             | YES          |                                |
| [`context.grafana.notifyWarning(['Header', 'Message'])`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#grafananotifywarningheader-message) | Displays a warning.                                                                                                                           | YES             | YES          |                                |
| [`context.grafana.eventBus`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#grafanaeventbus)                                                | Publish and subscribe to application events.                                                                                                  | YES             | YES          |                                |
| [`context.grafana.templateService`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#grafanatemplateservice)                                  | Grafana’s `templateService` function that provides access to variables and enables the update of a time range.                                | YES             | YES          |                                |
| [`context.grafana.refresh()`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#grafanarefresh)                                                | Function to refresh dashboard panels using application events.                                                                                | YES             | YES          |                                |
| [`context.utils.fileToBase64(file)`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#utilsfiletobase64file)                                  | Convert to base64 format                                                                                                                      | YES             |              |                                |
| [`context.utils.toDataQueryResponse(data)`](/docs/plugins/volkovlabs-form-panel/latest/custom-code/context-parameters/#utilstodataqueryresponseres)                     | Parse the results from /api/ds/query into a DataQueryResponse                                                                                 | YES             | YES          |                                |

## Inspect parameters

To find out the current parameters, you can log them in the browser’s console:

JavaScript [Copy code to clipboard] Copy

```javascript
console.log(
  context.panel.options,
  context.panel.data,
  context.panel.response,
  context.panel.elements,
  context.grafana.locationService,
  context.grafana.templateService
);
```

## Refresh the dashboard after an update request or show a warning

The following example shows how to refresh the dashboard after a successful update request or display an error notification if the request fails.

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

## Update a variable after an update request to interact with other panels

The following example demonstrates how to update a dashboard variable with data from the response, enabling interaction with other panels.

JavaScript [Copy code to clipboard] Copy

```javascript
if (context.panel.response && context.panel.response.ok) {
  context.panel.response.json().then((resp) => {
    context.grafana.locationService.partial({ "var-name": resp["name"] }, true);
  });
}
```

## Perform an initial request after an update request or show an error

The following example shows how to trigger an initial request to reload the panel after a successful update or display an error notification if the request fails.

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

## Perform an initial request only on dashboard load

The following example demonstrates how to fetch and populate form elements only when the dashboard first loads, avoiding unnecessary requests on subsequent interactions.

JavaScript [Copy code to clipboard] Copy

```javascript
const getValues = async () => {
  /**
   * Check if all values are empty
   */
  const isFirstLoad = context.panel.elements.every((element) => !element.value);

  if (isFirstLoad) {
    /**
     * Get Data
     */
    const response = await fetch();
    const json = await response.json();

    /**
     * Update initial element values
     */
    context.panel.onChangeElements(
      context.panel.elements.map((element) => ({
        ...element,
        value: json[element.id],
      }))
    );
  }
};

return getValues();
```

## Clear element values after clicking the Submit or Reset button

The following example shows how to reset or modify form element values programmatically.

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.onOptionsChange({
  ...context.panel.options,
  elements: context.panel.options.elements.map((element) => {
    return element.id === "name" ? { ...element, value: "test" } : element;
  }),
});
```

> Note
>
> The `context.panel.onOptionsChange()` handler calls refresh panel.

The `context.panel.onOptionsChange()` handler is required to update the panel.

## Update the local state in Business Forms (Data Manipulation) panel 3.1.0

The following example demonstrates how to update element values in the local state without refreshing the entire panel.

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.onChangeElements(
  elements.map((element) => {
    return element.id === "name" ? { ...element, value: "test" } : element;
  })
);
```

The `context.panel.onChangeElements()` function is required to update the element values in the local state.

## Simplified form elements `patchFormValue` helper

Before version 4.4.0, to update a form element value, you had to use `context.panel.elements.map()`. In version 4.4.0, a new function was added to simplify that approach. It accepts an object with element IDs as keys and their new values.

Before 4.4.0 version:

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.onChangeElements(
  context.panel.elements.map((element) =>
    element.id === "name" ? { ...element, value: "Alex" } : element
  )
);
```

The simplified version example:

JavaScript [Copy code to clipboard] Copy

```javascript
// only passed elements should be updated, the rest stay the same
context.panel.patchFormValue({ name: "Alex" });
// name and isAdmin
context.panel.patchFormValue({ name: "Alex", isAdmin: true });
```

## Simplified form elements `formValue` helper

Before version 4.4.0, to get form element values, you had to use `context.panel.elements.forEach()`. In version 4.4.0, a new function was added to simplify that approach. It returns an object with element IDs as keys.

Before 4.4.0 version:

[Copy code to clipboard] Copy

```none
const payload = {};

context.panel.elements.forEach((element) => {
  payload[element.id] = element.value;
});

// payload = { name: 'Alex', isAdmin: true }
```

The simplified version example:

[Copy code to clipboard] Copy

```none
context.panel.formValue // { name: 'Alex', isAdmin: true }
```
