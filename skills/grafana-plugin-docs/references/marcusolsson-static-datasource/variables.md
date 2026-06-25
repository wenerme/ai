---
title: "Variables | Grafana Plugins documentation"
description: "Learn how to use dashboard and global variables in the Business Input data source string fields."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Variables

The Business Input data source supports dashboard and global variables in String fields.

The [Grafana Crash Course](/docs/plugins/marcusolsson-static-datasource/latest/exploring-variables/) discusses three types of variables.

## Code editor

To get started, create a new `custom` variable:

js [Copy code to clipboard] Copy

```js
2022-02-10T00:00:00.000Z,
2022-03-10T00:00:00.000Z,
2022-04-10T00:00:00.000Z
```

[](/media/docs/grafana/panels-visualizations/business-input/1st-variable.png)

1. Create another variable that relates to the first variable. Use the `Business Input Data Source` and set the variable type to `Query` with the `Code editor`.
2. In Query options, set the Data source to `Static`.
3. In the code, take the value of the `from` variable and add 7 days to it for each iteration.
4. Use the `${variable_name}` syntax to reference your variable in code.

### Code

js [Copy code to clipboard] Copy

```js
const array = Array.from({ length: 3 }, (v, i) => `${i + 1}`);

const result = {
  ...frame,
  fields: frame.fields.map((field) => ({
    ...field,
    values: array.map((item) => {
      const currentFrom = `${from}`;
      const date = new Date(currentFrom);
      const newTo = new Date(date.getTime() + item * 7 * 24 * 60 * 60 * 1000);
      return newTo.toISOString();
    }),
  })),
};

return Promise.resolve(result);
```

[](/media/docs/grafana/panels-visualizations/business-input/2nd-variable.png)

The `to` variable will have the following values:

js [Copy code to clipboard] Copy

```js
2022-02-17T00:00:00.000Z
2022-02-24T00:00:00.000Z
2022-03-03T00:00:00.000Z
```

When you change the value of the `from` variable, the values of the `to` variable also change:

[](/media/docs/grafana/panels-visualizations/business-input/variable-reference.png)

[](/media/docs/grafana/panels-visualizations/business-input/variable-reference-2.png)

## Manual editor

You can use variables in the `Manual editor`. Use the `$variable_name` syntax in the input field.

[](/media/docs/grafana/panels-visualizations/business-input/manual-editor-variable.png)
