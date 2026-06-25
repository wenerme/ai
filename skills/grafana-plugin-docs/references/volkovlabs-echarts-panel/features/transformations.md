---
title: "Transformations | Grafana Plugins documentation"
description: "Learn how to work with Grafana transformations to modify and prepare data for use in business charts."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Transformations

Transformations can modify the returned data frames and may require code updates to retrieve values from `context.panel.data`.

## Sort by

The `Sort by` transformation modifies the structure of the returned data frames and requires:

- Setting an array with order identifiers.
- Setting an array with values.
- Getting sorted values for each array.

[](/media/docs/grafana/panels-visualizations/business-charts/transformations.png)

### Example

js [Copy code to clipboard] Copy

```js
let names = [];
let amounts = [];

context.panel.data.series.map((s) => {
  names = s.fields.find((f) => f.name === "Name").values;
  namesOrder = s.fields.find((f) => f.name === "Name").values;
  amounts = s.fields.find((f) => f.name === "Amount").values;
  amountsOrder = s.fields.find((f) => f.name === "Amount").values.order;
});

return {
  grid: {
    bottom: "3%",
    containLabel: true,
    left: "3%",
    right: "4%",
    top: "4%",
  },
  tooltip: {},
  legend: {
    data: [context.grafana.replaceVariables("$var")],
  },
  xAxis: {
    data: names,
  },
  yAxis: {},
  toolbox: { feature: { restore: {} } },
  series: [
    {
      name: context.grafana.replaceVariables("$var"),
      type: "bar",
      data: amounts,
    },
  ],
};
```
