---
title: "Load indication | Grafana Plugins documentation"
description: "Learn how the Business Forms panel indicates loading progress during initial and update requests."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Load indication

When data loading takes time, the Business Forms panel displays loading indicators.

## Initial request

A moving blue line displays at the top of the form.

[](/media/docs/grafana/panels-visualizations/business-forms/status-initial.png)

## Update request

All buttons are disabled and moving circular dots display in place of the Submit button icon.

[](/media/docs/grafana/panels-visualizations/business-forms/status-update.png)

## Custom code

Custom code can be asynchronous. For that, the custom code should return the `Promise`.

js [Copy code to clipboard] Copy

```js
const getInitialData = async () => {
  const response = await fetch("http://123");

  const data = await response.json();

  /**
   * Update Elements with data
   */
  context.panel.onChange([]);
};

/**
 * Return Promise
 */
return getInitialData();
```
