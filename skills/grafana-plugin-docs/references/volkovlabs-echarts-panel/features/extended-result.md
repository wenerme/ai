---
title: "Extended result | Grafana Plugins documentation"
description: "Learn how to return extended result objects with additional properties and subscribe functions for enhanced chart functionality."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Extended result

> Note
>
> The Business Charts panel supports the extended result object starting from version 5.0.0.

The extended result object lets you return:

- Configuration
- Options
- Unsubscribe function

JSON [Copy code to clipboard] Copy

```json
return {
  version: 2,
  config: { notMerge: true },
  option: {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        detail: {
          formatter: '{value}'
        },
        data: [
          {
            value: 50,
            name: 'SCORE'
          }
        ]
      }
    ]
  },
  unsubscribe: () => {
    console.log('unsubscribeFunction')
  }
};
```

## Version

The version is reserved for future improvements. The only supported version is 2.

## Configuration

Expand table

| Option       | Description                                                                            | Default |
|--------------|----------------------------------------------------------------------------------------|---------|
| `lazyUpdate` | Specifies whether it’s required to update the modified chart instantly or not.         | `false` |
| `notMerge`   | Specifies whether it’s required to merge the current option with a previous one.       | `true`  |
| `silent`     | Specifies whether it’s required to prevent triggering events when calling `setOption`. | `false` |

> Note
>
> To find more details on configuration options, please see the [Apache ECharts library documentation](https://echarts.apache.org/en/api.html#echartsInstance.setOption).

## Option

The option is the chart configuration in the JSON format described in the [Charts Functions](/docs/plugins/volkovlabs-echarts-panel/latest/charts-function/).

## Unsubscribe

The unsubscribe section allows the addition of JavaScript code which is executed before the object is destroyed.

One of the use cases relates to unsubscription from [Grafana events using an event bus](/docs/plugins/volkovlabs-echarts-panel/latest/features/grafana-events/).
