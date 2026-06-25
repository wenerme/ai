---
title: "Content wrapping | Grafana Plugins documentation"
description: "Learn how the content wrapping option controls whether rows are automatically wrapped in paragraph tags."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Content wrapping

The **Content &gt; Wrap automatically in paragraphs** option:

- If enabled, every row of the content wraps in paragraph `<p>` tags.
- If disabled, rows do not wrap in paragraph `<p>` tags.

The following example shows **Content** that does not contain any spaces. In this case, the **Content &gt; Wrap automatically in paragraphs** parameter is irrelevant. Both **Enabled** and **Disabled** modes generate the same output.

[](/media/docs/grafana/panels-visualizations/business-text/no-empty-lines.png)

The following example shows **Content** that contains one empty line and how the form is interpreted with **Enabled** and **Disabled** modes.

[](/media/docs/grafana/panels-visualizations/business-text/yes-empty-lines.png)

The code used in the examples above:

HTML [Copy code to clipboard] Copy

```html
<figure>
  <ul>
    <li>In Progress : 34</li>
    <li>Completed : 5</li>
  </ul>
</figure>
```
