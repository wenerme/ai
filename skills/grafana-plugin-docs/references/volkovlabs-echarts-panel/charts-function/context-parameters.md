---
title: "Context parameters | Grafana Plugins documentation"
description: "Learn about the context parameters available in the Business Charts panel including echarts, ecStat, panel data, and Grafana services."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Context parameters

## `context.echarts`

The Apache ECharts library instance.

### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.echarts;
```

### Example

JavaScript [Copy code to clipboard] Copy

```javascript
const libraryECharts = context.echarts;
```

## `context.ecStat`

The statistical and data mining tool for Apache ECharts.

### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.ecStat;
```

### Example

[Copy code to clipboard] Copy

```none
context.echarts.registerTransform(context.ecStat.transform.regression);
```

## Visual Editor

### `editor.dataset`

ECharts dataset in Visual mode.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.editor.dataset;
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
return {
  dataset: context.editor.dataset,
  series: context.editor.series,
  grid: {
    bottom: "3%",
    containLabel: true,
    left: "3%",
    right: "4%",
    top: "4%",
  },
  toolbox: {
    left: "center",
    feature: {
      dataZoom: {
        yAxisIndex: "none",
      },
      restore: {},
    },
  },
  xAxis: {
    type: "category",
  },
  yAxis: {
    type: "value",
  },
};
```

### `editor.series`

ECharts series in Visual mode.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.editor.series;
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
return {
  dataset: context.editor.dataset,
  series: context.editor.series,
  grid: {
    bottom: "3%",
    containLabel: true,
    left: "3%",
    right: "4%",
    top: "4%",
  },
  toolbox: {
    left: "center",
    feature: {
      dataZoom: {
        yAxisIndex: "none",
      },
      restore: {},
    },
  },
  xAxis: {
    type: "category",
  },
  yAxis: {
    type: "value",
  },
};
```

## Grafana

### `grafana.eventBus`

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

### `grafana.locationService`

The `locationService` works with the browser location and history.

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

### `grafana.notifyError([header, message])`

Displays an error notification.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.grafana.notifyError([header, message]);
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
//
context.grafana.notifyError(["Error Title", `Show error message`]);
```

#### Arguments

- `header` *string*. Error title
- `message` *string*. Error message

### `grafana.notifySuccess([header, message])`

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

### `grafana.refresh()`

Function to refresh dashboard panels using application events.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.grafana.refresh();
```

### `grafana.replaceVariables()`

The `replaceVariables()` function to interpolate variables.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.grafana.replaceVariables();
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
const variable = context.grafana.replaceVariables("${variable}");
console.log(variable.toUpperCase());
```

### `grafana.theme`

Contains grafana Theme object.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.grafana.theme;
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
const theme = context.grafana.theme;
console.log(theme);
```

## Panel

### `panel.chart`

Instance of the Apache ECharts library.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.chart;
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.chart.on("brushSelected", function (params) {
  var brushed = [];
  var brushComponent = params.batch[0];
  for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
    var rawIndices = brushComponent.selected[sIdx].dataIndex;
    brushed.push("[Series " + sIdx + "] " + rawIndices.join(", "));
  }
  context.panel.chart.setOption({
    title: {
      backgroundColor: "#333",
      text: "SELECTED DATA INDICES: \n" + brushed.join("\n"),
      bottom: 0,
      right: "10%",
      width: 100,
      textStyle: {
        fontSize: 12,
        color: "#fff",
      },
    },
  });
});
```

### `panel.data`

Object containing a time range, series, and request information.

#### Usage

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.data;
```

#### Example

JavaScript [Copy code to clipboard] Copy

```javascript
context.panel.data.series.map((s) => {
  categories = s.fields.find((f) => f.name === "Category").values;
  values = s.fields.find((f) => f.name === "Value").values;
});
```
