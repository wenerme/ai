---
title: "JavaScript Values Editor | Grafana Plugins documentation"
description: "Learn how to use the JavaScript Values Editor to generate data frames and import external libraries."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# JavaScript Values Editor

> Note
>
> The JavaScript Values Editor must return a data frame.

js [Copy code to clipboard] Copy

```js
const result = {
  ...frame,
  fields: frame.fields.map((field) => ({
    ...field,
    values: [],
  })),
};

return Promise.resolve(result);
```

[](/media/docs/grafana/panels-visualizations/business-input/import-js.png)

## Imports

The Business Input data source supports importing libraries in the **JavaScript** editor mode. You can import external or local libraries.

js [Copy code to clipboard] Copy

```js
import("https://esm.sh/mermaid").then(({ default: mermaid }) => {
  mermaid.initialize({ startOnLoad: true });

  mermaid.run({
    querySelector: ".mermaid",
    suppressErrors: false,
  });
});

const array = Array.from({ length: 3 }, (v, i) => `${i + 1}`);

const result = {
  ...frame,
  fields: frame.fields.map((field) => {
    return {
      ...field,
      values: array.map((item) => {
        return item;
      }),
    };
  }),
};

return Promise.resolve(result);
```
