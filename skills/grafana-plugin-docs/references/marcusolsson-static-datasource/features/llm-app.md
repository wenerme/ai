---
title: "LLM App and OpenAI | Grafana Plugins documentation"
description: "Learn how to generate data using LLM models and OpenAI integration with the Business Input data source."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# LLM App and OpenAI

The Business Input Data Source supports LLM models (OpenAI, custom) using LLM App from Grafana.

## LLM App

To get started:

1. Add the [LLM App](/grafana/plugins/grafana-llm-app/) plugin.
2. Set up your `OpenAI API Key` and `OpenAI API Organization ID`.

[](/media/docs/grafana/panels-visualizations/business-input/llm-app.png)

After you configure the LLM App, a text area appears in the `Code` editor mode of the Business Input data source.

> Note
>
> Dashboard and global variables are supported in the text area.

This text area lets you use the response from the LLM App with OpenAI. The system stores the result in `context.llmResult`.

[](/media/docs/grafana/panels-visualizations/business-input/llm-app-message-box.png)

## Example with BTC price

### Message

js [Copy code to clipboard] Copy

```js
Please return JSON with 2 arrays: datetime and price which contain BTC price
from ${__from:date} to ${__to:date} for every hour
```

### JavaScript code editor

js [Copy code to clipboard] Copy

```js
console.log("result", context.llmResult);

const content = context.llmResult?.choices?.[0]?.message?.content;
let data = {};

try {
  data = JSON.parse(content);
} catch (e) {
  console.error("Unable to parse result", e);
}

console.log("parsedData", data);

const result = {
  ...frame,
  fields: frame.fields.map((field) => ({
    ...field,
    values: field.name === "date" ? data.datetime || [] : data.price || [],
  })),
};

return Promise.resolve(result);
```

### Result

You can display the data frame with any panel plugin.

[](/media/docs/grafana/panels-visualizations/business-input/llm-result.png)
