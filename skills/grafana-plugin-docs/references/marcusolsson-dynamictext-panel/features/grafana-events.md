---
title: "Grafana events | Grafana Plugins documentation"
description: "Learn how to subscribe to Grafana application events and respond to user interactions using the event bus."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Grafana events

> Note
>
> The Business Text panel supports the event bus starting from version 4.0.0.

Grafana uses an event bus to publish application events that notify different parts of Grafana when users interact with it. The Business Text panel can respond to these interactions by subscribing to one or more events.

## Predefined events

For a complete list of events, refer to the [Grafana Crash Course](/docs/plugins/marcusolsson-dynamictext-panel/latest/exploring-eventbus/).

## Subscribe to events

To avoid memory leaks, unsubscribe from all events.

js [Copy code to clipboard] Copy

```js
const subscription = context.grafana.eventBus.subscribe(
  { type: "data-hover" },
  () => {
    console.log("React to Data Hover");
  }
);

return () => {
  subscription.unsubscribe();
  console.log("Unsubscribed");
};
```

## EventBus example

The following sections show the Business Text panel configuration.

[](/media/docs/grafana/panels-visualizations/business-text/eb-edit.png)

**Content** to copy

HTML [Copy code to clipboard] Copy

```html
<pre id="event"></pre>
```

**Before content rendering** to copy

js [Copy code to clipboard] Copy

```js
const subscription = context.grafana.eventBus.subscribe(
  { type: "theme-changed" },
  (event) => {
    document.getElementById("event").innerHTML = JSON.stringify(
      event,
      undefined,
      2
    );
    console.log("React to Theme Changed");
  }
);

function decycle(obj, stack = []) {
  if (!obj || typeof obj !== "object") return obj;

  if (stack.includes(obj)) return null;

  let s = stack.concat([obj]);

  return Array.isArray(obj)
    ? obj.map((x) => decycle(x, s))
    : Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [k, decycle(v, s)])
      );
}

const subscription2 = context.grafana.eventBus.subscribe(
  { type: "data-hover" },
  (data) => {
    document.getElementById("event").innerHTML = JSON.stringify(
      decycle(data),
      undefined,
      2
    );
    console.log("React to Data Hover", data);
  }
);

return () => {
  subscription.unsubscribe();
  subscription2.unsubscribe();
  console.log("Unsubscribed");
};
```
