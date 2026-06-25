---
title: "Business Charts | Grafana Plugins documentation"
description: "Learn how to create data for the Business Charts panel using manual values or the JavaScript Values Editor."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Business Charts

You can use the Business Input data source to test the [Business Charts panel](/docs/plugins/volkovlabs-echarts-panel/latest/). The following examples show how to create values:

- Manually
- By using the **JavaScript Values Editor**

Both examples use the Business Charts [Visual Editor](/docs/plugins/volkovlabs-echarts-panel/latest/visualeditor/) to read the data frame values and pass them to the Business Charts.

> Note
>
> You can use the Business Charts demo project to play with both the Business Input data source settings and the Business Charts parameters following the link [Business Charts Pie examples](https://echarts.volkovlabs.io/d/0b5-q7K4k/pie?orgId=1). Go to Edit mode and start experimenting.

## Manual

You can use the Business Input data source to add files and values manually.

[](/media/docs/grafana/panels-visualizations/business-input/bi-charts-pie-manual-editor.png)

## JavaScript Values Editor

You can use the JavaScript **Values Editor** to generate data frame values.

[](/media/docs/grafana/panels-visualizations/business-input/bi-charts-pie-code-editor.png)

The following JavaScript code creates values for the Business Input data source:

JavaScript [Copy code to clipboard] Copy

```javascript
const values = [
  ["Search Engine", "Direct", "Email", "Union Ads", "Video Ads"],
  [1048, 735, 580, 484, 300],
];

const result = {
  ...frame,
  fields: frame.fields.map((field, index) => ({
    ...field,
    values: values[index],
  })),
};

return Promise.resolve(result);
```

The Business Charts function.

JavaScript [Copy code to clipboard] Copy

```javascript
return {
  dataset: {
    source: context.editor.dataset.source,
  },
  tooltip: {
    trigger: "item",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: "80%",
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};
```
