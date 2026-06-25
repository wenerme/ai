---
title: "JavaScript Code | Grafana Plugins documentation"
description: "Learn how to integrate JavaScript code snippets to add custom Handlebars helpers, event handlers, and dynamic functionality."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# JavaScript Code

The Business Text panel supports the integration of JavaScript code snippets that can add Handlebars helpers and event handlers.

## Parameters

> Note
>
> The Business Text panel supports `context` starting from version 4.3.0.

Starting from version 4.3.0, you can access the panel data (`panelData`) and selected data frame (`data`) through a new `context` object.

Start typing `context` in the **Before Content Rendering** or **After Content Ready** boxes to see the latest list of all available features.

[](/media/docs/grafana/panels-visualizations/business-text/context.png)

Expand table

| Parameter                                                                                                                                                                            | Description                                                                                                                                                                                                                                          | Before Render | After Render |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|--------------|
| [`context.data`](/docs/plugins/marcusolsson-dynamictext-panel/latest/javascript-code/context-parameters/#contextdata)                                                                | Data from data sources. The display of one or multiple data rows from the selected data frame or from all data frames is determined by the **Render template** option. It can be one of three values: **Every Row**, **All Rows**, and **All data**. | Yes           | Yes          |
| [`context.dataFrame`](/docs/plugins/marcusolsson-dynamictext-panel/latest/javascript-code/context-parameters/#contextdataframe)                                                      | Selected Data Frame for **Every Row**, **All Rows** templates.                                                                                                                                                                                       | Yes           | Yes          |
| [`context.element`](/docs/plugins/marcusolsson-dynamictext-panel/latest/javascript-code/context-parameters/#contextelement)                                                          | Current html element.                                                                                                                                                                                                                                |               | Yes          |
| [`context.grafana.eventBus`](/docs/plugins/marcusolsson-dynamictext-panel/latest/javascript-code/context-parameters/#grafanaeventbus)                                                | Publish and subscribe to application events.                                                                                                                                                                                                         | Yes           | Yes          |
| [`context.grafana.getLocale()`](/docs/plugins/marcusolsson-dynamictext-panel/latest/javascript-code/context-parameters/#grafanagetlocale)                                            | Returns the user’s locale: ’en’, ‘fr’, ’es’, and so on.                                                                                                                                                                                              | Yes           | Yes          |
| [`context.grafana.locationService`](/docs/plugins/marcusolsson-dynamictext-panel/latest/javascript-code/context-parameters/#grafanalocationservice)                                  | The `locationService` works with the browser location and history.                                                                                                                                                                                   | Yes           | Yes          |
| [`context.grafana.notifyError(['Header', 'Message'])`](/docs/plugins/marcusolsson-dynamictext-panel/latest/javascript-code/context-parameters/#grafananotifyerrorheader-message)     | Displays an error.                                                                                                                                                                                                                                   | Yes           | Yes          |
| [`context.grafana.notifySuccess(['Header', 'Message'])`](/docs/plugins/marcusolsson-dynamictext-panel/latest/javascript-code/context-parameters/#grafananotifysuccessheader-message) | Displays a success notification.                                                                                                                                                                                                                     | Yes           | Yes          |
| [`context.grafana.refresh()`](/docs/plugins/marcusolsson-dynamictext-panel/latest/javascript-code/context-parameters/#grafanarefresh)                                                | Function to refresh dashboard panels using application events.                                                                                                                                                                                       | Yes           | Yes          |
| [`context.grafana.replaceVariables()`](/docs/plugins/marcusolsson-dynamictext-panel/latest/javascript-code/context-parameters/#grafanareplacevariables)                              | The `replaceVariables()` function to interpolate variables.                                                                                                                                                                                          | Yes           | Yes          |
| [`context.grafana.theme`](/docs/plugins/marcusolsson-dynamictext-panel/latest/javascript-code/context-parameters/#grafanatheme)                                                      | Contains grafana theme object.                                                                                                                                                                                                                       | Yes           | Yes          |
| [`context.grafana.timeRange`](/docs/plugins/marcusolsson-dynamictext-panel/latest/javascript-code/context-parameters/#grafanatimerange)                                              | Time range of the current dashboard.                                                                                                                                                                                                                 | Yes           | Yes          |
| [`context.grafana.timeZone`](/docs/plugins/marcusolsson-dynamictext-panel/latest/javascript-code/context-parameters/#grafanatimezone)                                                | Time zone of the current dashboard.                                                                                                                                                                                                                  | Yes           | Yes          |
| [`context.panel.handlebars`](/docs/plugins/marcusolsson-dynamictext-panel/latest/javascript-code/context-parameters/#panelhandlebars)                                                | Handlebars library.                                                                                                                                                                                                                                  | Yes           | Yes          |
| [`context.panel.panelData`](/docs/plugins/marcusolsson-dynamictext-panel/latest/javascript-code/context-parameters/#panelpaneldata)                                                  | Panel data.                                                                                                                                                                                                                                          | Yes           | Yes          |

## Custom Handlebars helper

You can add a custom Handlebars helper to replace the field’s value according to some pattern.

handlebars [Copy code to clipboard] Copy

```handlebars
{{replace Test "Pattern" "Replaced"}}
```

> Note
>
> Handlebars are not available in **After Content Render**.

Create handlebars in **Before content Render** because they are used during the rendering process to convert Handlebars &gt; Markdown &gt; HTML.

The **After Content Render** works with already-created HTML elements, and handlebars are not available at this point.

### JavaScript code

This code snippet registers a function with the `replace` helper that accepts three arguments:

1. `context`: An object that contains the data for the template.
2. `pattern`: The text to search for.
3. `replacement`: The text to use to replace the pattern.

This code calls the function and passes the `pattern` and `replacement` arguments to it.

js [Copy code to clipboard] Copy

```js
context.handlebars.registerHelper("replace", (context, pattern, replacement) =>
  context.replace(pattern, replacement)
);
```

[](/media/docs/grafana/panels-visualizations/business-text/replace.png)

## Event handler

To respond to a button click, you can add a custom event handler.

HTML [Copy code to clipboard] Copy

```html
<button onclick="myFunc()">{{test}}</button>
```

### JavaScript code

This code snippet defines a function called `myFunc`. The function accepts no arguments and returns no value. The function body calls the `alert()` function to display “Bonjour!” in a dialog box.

js [Copy code to clipboard] Copy

```js
myFunc = () => {
  alert("Bonjour!");
};
```

[](/media/docs/grafana/panels-visualizations/business-text/event-handler.png)

## Internationalization

Grafana 9 and later versions offer internationalization, but most plugins do not yet have full access to this feature.

You can use the `getLocale()` method to get a value for the chosen locale and display terms from a defined dictionary.

### Content

This code snippet uses the `translate` helper to translate the text “Hello” to the current language. Text translation occurs if the `translate` helper is defined. Otherwise, the text “Hello” displays.

handlebars [Copy code to clipboard] Copy

```handlebars
{{translate "Hello"}}
```

### Default content

This code snippet uses the `translate` helper to show the translation of a default message if the query does not return any results.

handlebars [Copy code to clipboard] Copy

```handlebars
{{translate "Default"}}
```

### JavaScript code

js [Copy code to clipboard] Copy

```js
const messages = {
  Hello: {
    en: "Hello",
    fr: "Salut",
    es: "Hola",
  },
  Default: {
    en: "The query didn't return any results.",
    fr: "La requête n'a renvoyé aucun résultat.",
    es: "La consulta no arrojó ningún resultado.",
  },
};

const locale = getLocale();

context.handlebars.registerHelper(
  "translate",
  (message) => messages[message][locale] ?? messages[message]["en"]
);
```

## Time zone and range

You can display the selected dashboard time zone, browser’s time zone, and time ranges in Grafana.

[](/media/docs/grafana/panels-visualizations/business-text/time.png)

### Content

Use the following for the **Content**

HTML [Copy code to clipboard] Copy

````html
<h1>Dashboard {{tz}}</h1>
<h2>Browser {{browser}}</h2>

```json
{{{json (range)}}}
```
````

### JavaScript code

Use the following for the **JavaScript &gt; Before Content Rendering**

js [Copy code to clipboard] Copy

```js
const dashboardTimeZone = context.panelData.timeZone
const dashboardTimeRange = context.panelData.timeRange

context.handlebars.registerHelper('tz', () => dashboardTimeZone);
context.handlebars.registerHelper('range', () => dashboardTimeRange);
context.handlebars.registerHelper('browser', () => Intl.DateTimeFormat().resolvedOptions().timeZone);
```

## Automatic scrolling

If the table does not fit in the allocated panel area, you can add automatic scrolling using JavaScript with an adjustable interval.

### Content

Use the following for the **Content**:

HTML [Copy code to clipboard] Copy

```html
<table id="dataTable">
  <tr>
    <th>Title</th>
    <th>Date</th>
    <th>Category</th>
  </tr>
  {{#each data}}
  <tr>
    <td>{{title}}</td>
    <td>{{date pubDate 'MMM, DD YYYY'}}</td>
    <td>{{category}}</td>
  </tr>
  {{/each}}
</table>
```

### JavaScript code

Use the following for the **JavaScript &gt; Before Content Rendering**:

js [Copy code to clipboard] Copy

```js
const scrollWindow = () => {
  parentWindow =
    document.getElementById("dataTable").parentElement.parentElement;
  bottomOfWindow = parentWindow.scrollHeight - parentWindow.offsetHeight;

  /**
   * Scroll
   */
  if (parentWindow.scrollTop < bottomOfWindow) {
    parentWindow.scrollBy(0, 1);
    setTimeout(scrollWindow, 50);
    return;
  }

  /**
   * Scroll to the Top
   */
  setTimeout(function () {
    parentWindow.scrollTo({ top: 0, behavior: "smooth" });
  }, 1000);

  /**
   * Start scrolling again
   */
  setTimeout(scrollWindow, 1000);
};

$(() => {
  dataTable = document.getElementById("dataTable");

  /**
   * Avoid scrolling for short tables
   */
  if (
    dataTable.parentElement.scrollHeight <
    dataTable.parentElement.parentElement.offsetHeight
  ) {
    return;
  }

  /**
   * Already set to scroll
   */
  if (dataTable.parentElement.parentElement.getAttribute("listener")) {
    return;
  }

  dataTable.parentElement.parentElement.setAttribute("listener", true);
  scrollWindow();
});
```

## Unique values

You can sort out unique values from the `data` object using the `unique` helper that was implemented by the community member [goncalobsantos](https://community.grafana.com/u/goncalobsantos).

### Content

Use the following for the **Content**:

HTML [Copy code to clipboard] Copy

```html
<div>{{#each (unique data "hostname.keyword")}}{{this}}; {{/each}}</div>
```

### JavaScript code

Use the following for the **JavaScript &gt; Before Content Rendering**:

js [Copy code to clipboard] Copy

```js
context.handlebars.registerHelper("unique", (context, key) => {
  return [...new Set(context.map((item) => item[key]))];
});
```

## Dashboard variables

You can use the `context.grafana.replaceVariables` function to replace dashboard variables in the JavaScript code.

js [Copy code to clipboard] Copy

```js
const bonjour = context.grafana.replaceVariables("${variable}");
console.log(bonjour.toUpperCase())
```

## REST API

The Business Text plugin submits REST API requests.

[](/media/docs/grafana/panels-visualizations/business-text/rest.png)

### Content

Into the **Content**:

HTML [Copy code to clipboard] Copy

```html
<form id="myForm">
  <input name="firstName" />
  <input name="lastName" />

  <button>submit</button>
</form>
```

### JavaScript code

Into the **JavaScript &gt; After Content Ready**

js [Copy code to clipboard] Copy

```js
/**
 * Form Element
 */
const form = document.querySelector("#myForm");

/**
 * Handle Submit
 */
const handleSubmit = (event) => {
  /**
   * Prevent Default submition
   */
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  console.log(data);
  /**
   * Result: { firstName: '', lastName: '' }
   */

  /**
   * Your request to send form
   */
  fetch("url", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

form.addEventListener("submit", handleSubmit);

return () => {
  form.removeEventListener("submit", handleSubmit);
};
```

## JSON parsing

The community member [havedill](https://github.com/havedill) [asked](https://github.com/VolkovLabs/business-text/issues/255) how to parse a JSON data format in the case when the transformation **Convert field type** is not available.

[](/media/docs/grafana/panels-visualizations/business-text/json-parsing.png)

### JSON example

JSON [Copy code to clipboard] Copy

```json
{ "title": { "text": "Area Chart", "size": 45, "font": "Arial" } }
```

JSON [Copy code to clipboard] Copy

```json
{ "title": { "text": "Bar Chart", "color": "black" } }
```

### Content

JSON [Copy code to clipboard] Copy

```json
{{{json (parse JSON)}}}
```

### JavaScript

js [Copy code to clipboard] Copy

```js
context.handlebars.registerHelper("parse", (context) => JSON.parse(context));
```

## Anonymizer

Anonymizer converts real production data into dummy values in order to have your dashboards demo-ready. Anonymizer is another great example of how embedded JavaScript can simplify tedious and repetitive tasks.
