---
title: "Variables | Grafana Plugins documentation"
description: "Learn how dashboard and global variables are automatically replaced in URLs, headers, payloads, JavaScript code, and form elements."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Variables

Business Forms automatically replaces dashboard and global variables in the following elements:

- URLs for initial and update requests
- Header parameter values
- Update request payloads
- JavaScript code
- Section names (starting from version 4.9.0)
- Form element labels (starting from version 4.9.0)
- Button text (starting from version 4.9.0)

[](https://grafana.com/media/docs/grafana/panels-visualizations/business-forms/var-sections-labels-buttons.png)

Variable types are thoroughly explained in the [Grafana Crash Course](https://grafana.com/docs/plugins/volkovlabs-form-panel/latest/exploring-variables/).

## JavaScript code

js ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

```js
const formIcon = context.panel.elements.find(
  (element) => element.id === "icon"
);
formIcon.value = "$IconVar";
```
