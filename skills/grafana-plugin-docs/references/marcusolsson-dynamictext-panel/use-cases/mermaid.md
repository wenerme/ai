---
title: "Mermaid | Grafana Plugins documentation"
description: "Learn how to create dynamic diagrams and charts using Markdown-defined text with the Mermaid library in the Business Text panel."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Mermaid

Mermaid is a popular JavaScript-based diagramming and charting tool that dynamically creates and modifies diagrams using Markdown-defined text definitions.

> Note
>
> Previously, two Business Text (formerly Dynamic Text) plugin builds were maintained: one with an embedded Mermaid library and one without.
>
> The Mermaid library size was the primary reason for maintaining two builds. After the addition of the External Resources feature, maintaining two builds is no longer necessary. You can now import the Mermaid library as an external resource.

[](/media/docs/grafana/panels-visualizations/business-text/diagram.png)

## Example

[](/media/docs/grafana/panels-visualizations/business-text/mer.png)

Use the following external library

md [Copy code to clipboard] Copy

```md
https://esm.sh/mermaid
```

## Code to copy

Use the following for the **Content** (when your data source is set to return something) or in the **Default Content** (when your data source returns nothing):

diagram [Copy code to clipboard] Copy

```diagram
<pre class="mermaid">
    graph LR
    A --- B
    B-->C[fa:fa-ban {{data.0.test}}]
    B-->D(fa:fa-spinner);
</pre>
```

## After Content Ready

> Warning
>
> Plug-in libraries may change their versions and the code in the example may not work or cause an error.

Use the following for the **JavaScript &gt; After Content Ready**:

js [Copy code to clipboard] Copy

```js
import("https://esm.sh/mermaid").then(({ default: mermaid }) => {
  mermaid.initialize({ startOnLoad: true });

  mermaid.run({
    querySelector: ".mermaid",
    suppressErrors: false,
  });
});
```
