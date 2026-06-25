---
title: "Business Variable | Grafana Plugins documentation"
description: "Learn how to use the Business Variable panel to create customizable dashboard filters with multiple display modes and layouts."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Business Variable

The Business Variable panel builds on top of regular dashboard variables. You can place dashboard filters in a separate panel anywhere on the dashboard.

The Business Variable panel offers many layouts with robust options, including an advanced TreeView layout. With the latest updates, you can [switch between dashboards](/docs/plugins/volkovlabs-variable-panel/latest/features/redirect/) for a better user experience.

## Requirements

- Business Variable panel 4.X requires **Grafana 11** or **Grafana 12**.
- Business Variable panel 3.X requires **Grafana 10** or **Grafana 11**.
- Variable panel 1.X, 2.X requires **Grafana 9.2** or **Grafana 10**.

## Getting started

The Business Variable panel can be installed from the [Grafana Catalog](/grafana/plugins/volkovlabs-variable-panel/) or utilizing the Grafana command line tool.

To install using the command line, run the following command:

sh [Copy code to clipboard] Copy

```sh
grafana cli plugins install volkovlabs-variable-panel
```

## Highlights

- Work with dashboard variables in the **Table**, **Minimize**, **Button**, and **Slider** display modes.
- Configure the **Table** display mode as a TreeView.
- Display statuses based on thresholds from data sources.
- Use single and multi-value variables with the All option.
- Filter values by pattern and selected favorites.
- Enable the panel to follow when scrolling (**Sticky position**).
- Create multiple TreeViews using groups and tabs.
- Use input text (**Input box**) variables.

## Documentation

Expand table

| Section                                                                      | Description                              |
|------------------------------------------------------------------------------|------------------------------------------|
| [Data flow](/docs/plugins/volkovlabs-variable-panel/latest/data-flow/)       | Explains the Business Variable data flow |
| [Display mode](/docs/plugins/volkovlabs-variable-panel/latest/display-mode/) | Explains different display modes         |
| [Features](/docs/plugins/volkovlabs-variable-panel/latest/features/)         | Explains panel features                  |
| [Release notes](/docs/plugins/volkovlabs-variable-panel/latest/release/)     | The latest features and updates          |

## License

Apache License Version 2.0, see [LICENSE](https://github.com/grafana/business-variable/blob/main/LICENSE).
