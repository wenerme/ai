---
title: "Variables | Grafana Plugins documentation"
description: "Learn how to replace dashboard and global variables in business charts using the replaceVariables function."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Variables

Use the `context.grafana.replaceVariables()` function to replace dashboard and global variables in Business Charts.

JavaScript ![Copy code to clipboard](http://grafana-com-website.grafana-com.svc.cluster.local.:80/media/images/icons/icon-copy-small-2.svg) Copy

```javascript
const email = context.grafana.replaceVariables("${__user.email}");
```

You can get familiar with three types of variables in the [Grafana Crash Course](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/volkovlabs-echarts-panel/latest/exploring-variables/).

## Replace variables

In the following example, we replaced the series’s name with a value from the variable.

[](http://grafana-com-website.grafana-com.svc.cluster.local.:80/media/docs/grafana/panels-visualizations/business-charts/variables.png)

### Example

js ![Copy code to clipboard](http://grafana-com-website.grafana-com.svc.cluster.local.:80/media/images/icons/icon-copy-small-2.svg) Copy

```js
let names = [];
let amounts = [];

context.panel.data.series.map((s) => {
  names = s.fields.find((f) => f.name === "Name").values;
  amounts = s.fields.find((f) => f.name === "Amount").values;
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
  legend: {},
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

## Update variables

You can update dashboard variables with [event handlers](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/volkovlabs-echarts-panel/latest/features/event-handling/), where

- `name` is the name of the variable. Add `var-` to update the variable value in the URL.
- `value` is the updated value.

js ![Copy code to clipboard](http://grafana-com-website.grafana-com.svc.cluster.local.:80/media/images/icons/icon-copy-small-2.svg) Copy

```js
context.panel.chart.on("click", (params) => {
  context.grafana.locationService.partial({ "var-name": value }, true);
});
```
