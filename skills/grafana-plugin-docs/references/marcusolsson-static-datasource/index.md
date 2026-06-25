---
title: "Business Input | Grafana Plugins documentation"
description: "Learn how to store and emulate data in Grafana using the Business Input data source plugin."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Business Input

The Business Input data source is a plugin for Grafana that allows storing and emulating your data.

## Requirements

- Business Input data source version 5.X requires **Grafana 11** or **Grafana 12**.
- Business Input data source version 4.X requires **Grafana 10.2** or **Grafana 11**.
- Static data source version 3.X requires **Grafana 9.2** or **Grafana 10**.
- Static data source version 2.X requires **Grafana 8.5** or **Grafana 9**.
- Static data source version 1.X requires **Grafana 7.3**.

## Getting started

You can install the Business Input data source from the [Grafana Catalog](/grafana/plugins/marcusolsson-static-datasource/) or by using the Grafana command line tool.

To install using the command line tool, run the following command:

sh [Copy code to clipboard] Copy

```sh
grafana cli plugins install marcusolsson-static-datasource
```

## Highlights

- Create static visualizations that do not depend on a specific data source.
- Specify values [manually or by using the JavaScript Values Editor](/docs/plugins/marcusolsson-static-datasource/latest/panels/business-charts/).
- Generate data with OpenAI and LLM App.
- Build custom query responses for testing or developing panel plugins.
- Store data and images directly in the dashboard.
- Use variables in text fields.
- Use the Number input for Number fields and the Date Time Picker for Time fields.
- Use the Text Area for String inputs with more than 100 characters.

[](/media/docs/grafana/panels-visualizations/business-input/dashboard.png)

## Documentation

Expand table

| Section                                                                           | Description                                           |
|-----------------------------------------------------------------------------------|-------------------------------------------------------|
| [Provisioning](/docs/plugins/marcusolsson-static-datasource/latest/provisioning/) | Learn how to automatically provision the data source. |
| [Variables](/docs/plugins/marcusolsson-static-datasource/latest/variables/)       | Learn how to use variables.                           |
| [Panels](/docs/plugins/marcusolsson-static-datasource/latest/panels/)             | Learn how to use the data source with panels.         |
| [Release notes](/docs/plugins/marcusolsson-static-datasource/latest/release/)     | Stay up to date with the latest features and updates. |

## License

Apache License Version 2.0, see [LICENSE](https://github.com/grafana/business-input/blob/main/LICENSE).
