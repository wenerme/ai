---
title: "Charts function | Grafana Plugins documentation"
description: "Learn how to configure the charts function in the Business Charts panel, including the setOption() function, available parameters, and JavaScript code examples."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Charts function

The `setOption(options)` function is the primary method in the Apache ECharts library. The Business Charts panel calls this function with one required parameter: `options`.

The `options` parameter describes the chart in JSON format.

## Getting started

To configure the Business Charts panel, write the Charts Function. This function usually has two parts:

- JavaScript to read data points from the data source
- JSON to specify a graph as `options`

Both parts can use parameters passed into the Charts function. The following table lists all available parameters.

See the following schema and screenshot for illustration.

[](/media/docs/grafana/panels-visualizations/business-charts/schema.png)

[](/media/docs/grafana/panels-visualizations/business-charts/charts-function.png)

## Options

Specify the `options` parameter in the `return` clause. This parameter is passed to the `setOption(options)` function in the Apache ECharts library.

[](/media/docs/grafana/panels-visualizations/business-charts/function.png)

## Parameters

Expand table

| Parameter                                                                                                                                                                      | Description                                                                      |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| [`context.echarts`](/docs/plugins/volkovlabs-echarts-panel/latest/charts-function/context-parameters/#contextecharts)                                                          | Apache ECharts library.                                                          |
| [`context.ecStat`](/docs/plugins/volkovlabs-echarts-panel/latest/charts-function/context-parameters/#contextecstat)                                                            | A statistical and data mining tool for Apache ECharts.                           |
| [`context.editor.dataset`](/docs/plugins/volkovlabs-echarts-panel/latest/charts-function/context-parameters/#editordataset)                                                    | **\[Visual mode]** ECharts dataset.                                              |
| [`context.editor.series`](/docs/plugins/volkovlabs-echarts-panel/latest/charts-function/context-parameters/#editorseries)                                                      | **\[Visual mode]** ECharts series.                                               |
| [`context.grafana.eventBus`](/docs/plugins/volkovlabs-echarts-panel/latest/charts-function/context-parameters/#grafanaeventbus)                                                | Publish and subscribe to application events.                                     |
| [`context.grafana.locationService`](/docs/plugins/volkovlabs-echarts-panel/latest/charts-function/context-parameters/#grafanalocationservice)                                  | Works with browser location and history.                                         |
| [`context.grafana.notifyError(['header', 'message'])`](/docs/plugins/volkovlabs-echarts-panel/latest/charts-function/context-parameters/#grafananotifyerrorheader-message)     | Display error notifications.                                                     |
| [`context.grafana.notifySuccess(['header', 'message'])`](/docs/plugins/volkovlabs-echarts-panel/latest/charts-function/context-parameters/#grafananotifysuccessheader-message) | Display success notifications.                                                   |
| [`context.grafana.refresh()`](/docs/plugins/volkovlabs-echarts-panel/latest/charts-function/context-parameters/#grafanarefresh)                                                | Function to refresh dashboard panels using application events.                   |
| [`context.grafana.replaceVariables()`](/docs/plugins/volkovlabs-echarts-panel/latest/charts-function/context-parameters/#grafanareplacevariables)                              | Function to interpolate variables.                                               |
| [`context.grafana.theme`](/docs/plugins/volkovlabs-echarts-panel/latest/charts-function/context-parameters/#grafanatheme)                                                      | Theme object.                                                                    |
| [`context.panel.chart`](/docs/plugins/volkovlabs-echarts-panel/latest/charts-function/context-parameters/#panelchart)                                                          | Instance of the Apache ECharts library. See the example in the screenshot above. |
| [`context.panel.data`](/docs/plugins/volkovlabs-echarts-panel/latest/charts-function/context-parameters/#paneldata)                                                            | Object containing a time range, series, and request information.                 |

### Inspect

To inspect those parameters, use the browser’s developer console.

JavaScript [Copy code to clipboard] Copy

```javascript
console.log(
  context.panel.data,
  context.grafana.theme,
  context.panel.chart,
  context.echarts,
  context.grafana.replaceVariables,
  context.grafana.locationService
);
```

## Notifications

You can display success and error notifications when handling specific events.

JavaScript [Copy code to clipboard] Copy

```javascript
context.grafana.notifySuccess(["Update", "Values updated successfully."]);
context.grafana.notifyError([
  "Update",
  `An error occurred while updating values.`,
]);
```
