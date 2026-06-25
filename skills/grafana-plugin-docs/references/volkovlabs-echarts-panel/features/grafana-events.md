---
title: "Grafana events | Grafana Plugins documentation"
description: "Learn how to handle Grafana events using the EventBus for publishing and subscribing to application events."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Grafana events

Grafana uses an event bus to publish application events and notify different parts of Grafana when users interact with a chart. The Business Charts panel can react to these actions by subscribing to one or more events.

> Note
>
> Business Charts 5.0.0 lets you unsubscribe from events to avoid memory leaks by returning an [extended result object](/docs/plugins/volkovlabs-echarts-panel/latest/features/extended-result/).

## Predefined events

A full list of events is available in the [Grafana Crash Course](/docs/plugins/volkovlabs-echarts-panel/latest/exploring-eventbus/).

## Subscribe to events

To subscribe and unsubscribe from events, create an extended result object.

[Copy code to clipboard] Copy

```none
const subscription = context.grafana.eventBus.subscribe({ type: 'data-hover' }, () => {
  console.log('React to Data Hover')
})

return {
  version: 2,
  config: { notMerge: true },
  option: {},
  unsubscribe: () => {
    subscription.unsubscribe();
    console.log('Unsubscribed');
  }
}
```
