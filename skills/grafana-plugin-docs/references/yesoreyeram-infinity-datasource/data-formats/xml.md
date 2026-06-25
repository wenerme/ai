---
title: "XML | Grafana Plugins documentation"
description: "Query XML APIs and files with the Infinity data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# XML

Select **XML** as the query type to retrieve data from XML APIs or files. You can query data from a URL or provide inline XML data.

Give it a try using Grafana Play

With Grafana Play, you can explore and see how it works, learning from practical examples to accelerate your development. This feature can be seen on [Infinity plugin XML demo](https://play.grafana.org/d/infinity-xml).

[Try it](https://play.grafana.org/d/infinity-xml)

## Selector syntax

XML selectors use dot notation to navigate the document structure. Special syntax is available for attributes and text content.

Expand table

| Selector        | Description                           |
|-----------------|---------------------------------------|
| `element.child` | Select child elements                 |
| `$.attribute`   | Select an attribute (prefix with `$`) |
| `_`             | Select the text content of an element |

## Example: Elements with child nodes and attributes

**XML data**:

xml [Copy code to clipboard] Copy

```xml
<users>
    <user age="20">
        <name>User A</name>
    </user>
    <user age="21">
        <name>User B</name>
    </user>
</users>
```

**Configuration**:

Expand table

| Setting           | JSONata parser | JQ parser     |
|-------------------|----------------|---------------|
| **Root selector** | `$.users.user` | `.users.user` |

Expand table

| Column selector | Title | Description                        |
|-----------------|-------|------------------------------------|
| `name`          | Name  | Selects the `<name>` child element |
| `-age`          | Age   | Selects the `age` attribute        |
