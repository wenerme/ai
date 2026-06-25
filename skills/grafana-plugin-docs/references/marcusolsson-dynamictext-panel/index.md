---
title: "Business Text | Grafana Plugins documentation"
description: "Learn how to convert plain text and table data into visually appealing information cards using Markdown, Handlebars, CSS, and JavaScript."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Business Text

The Business Text panel is a Grafana visualization plugin that converts plain text and table data into visually appealing, easy-to-read information cards. The plugin offers the following features:

- Access to variables (dashboard and global)
- Markdown
- Handlebars
- Helpers (predefined and custom)
- CSS styles
- JavaScript

When working with the Business Text plugin, you construct a text visualization template by:

- Using the features listed above.
- Indicating where to place fetched data frame elements.

## Requirements

- Business Text panel 6.X requires **Grafana 11** or **Grafana 12**.
- Business Text panel 5.X requires **Grafana 10** or **Grafana 11**.
- Dynamic Text panel 4.X requires **Grafana 9.2** or **Grafana 10**.
- Dynamic Text panel 2.X and 3.X require **Grafana 8.5** or **Grafana 9**.
- Dynamic Text panel 1.X requires **Grafana 7**.

## Getting started

You can install the Business Text panel from the [Grafana Plugins catalog](/grafana/plugins/marcusolsson-dynamictext-panel/) or using the Grafana command line tool.

Alternatively, use the Grafana command-line tool with the following command:

sh [Copy code to clipboard] Copy

```sh
grafana cli plugins install marcusolsson-dynamictext-panel
```

## Highlights

- Provides an in-panel code editor with automatic JavaScript code formatting. Use it to add your JavaScript code and to [import external JavaScript libraries](/docs/plugins/marcusolsson-dynamictext-panel/latest/use-cases/).
- Supports [Markdown](https://commonmark.org/help/) and [Handlebars](https://handlebarsjs.com/guide/expressions.html#basic-usage).
- Renders [markdown-it](https://github.com/markdown-it/markdown-it) into HTML elements.

  - Supports code syntax highlighting using A11Y styles.
- Provides code sanitization:

  - Sanitizes HTML inside templates using [XSS](https://jsxss.com/en/index.html).
  - You can disable this in the Grafana configuration through the `disable_sanitize_html` parameter.
- Supports display of nested objects using the `{{json object}}` Handlebars helper.
- Supports display of time global variables (`__to` and `__from`) as seconds, ISO timestamps, or formatted using the `dayjs` library.
- Supports adding Handlebars helpers and event handlers.
- Supports adding CSS styles with dashboard variables.
- Supports internationalization using custom helpers.

[](/media/docs/grafana/panels-visualizations/business-text/screenshot.png)

## Documentation

Expand table

| Section                                                                       | Description                                                    |
|-------------------------------------------------------------------------------|----------------------------------------------------------------|
| [Rendering](/docs/plugins/marcusolsson-dynamictext-panel/latest/rendering/)   | Explains how to create a visualization template for your data. |
| [Features](/docs/plugins/marcusolsson-dynamictext-panel/latest/features/)     | Explains the plugin’s features.                                |
| [Use cases](/docs/plugins/marcusolsson-dynamictext-panel/latest/use-cases/)   | Demonstrates interesting Community use cases.                  |
| [Release notes](/docs/plugins/marcusolsson-dynamictext-panel/latest/release/) | Stay up to date with the latest features and updates.          |

## License

Apache License Version 2.0, see [LICENSE](https://github.com/grafana/business-text/blob/main/LICENSE).
