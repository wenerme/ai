---
title: "Status field | Grafana Plugins documentation"
description: "Learn how to use the status field to dynamically set background or foreground colors based on threshold ranges."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Status field

> Note
>
> The Business Text panel supports the status field starting from version 4.1.0.

Use the `statusColor` variable to set a background or foreground color for any HTML element.

[](/media/docs/grafana/panels-visualizations/business-text/status.png)

## Threshold

Colors are defined based on threshold ranges for the selected status field.

## Example

handlebars [Copy code to clipboard] Copy

```handlebars
<div style="background-color: {{statusColor}}">
  {{A-series}}
</div>
```
