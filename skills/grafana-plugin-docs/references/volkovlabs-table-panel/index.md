---
title: "Business Table | Grafana Plugins documentation"
description: "Learn how to use the Business Table Panel plugin to create powerful, flexible data visualizations with advanced features like tree views, data editing, custom cell rendering, and export capabilities."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Business Table

The **Business Table Panel** is a powerful and flexible Grafana plugin designed to elevate data visualization in table format. Tailored for business analytics and reporting dashboards, it offers advanced features like tree views, custom cell rendering, data editing, and export capabilities.

## Requirements

The Business Table panel version requirements for Grafana are as follows:

- **Business Table Panel 3.x** requires **Grafana 11** or **Grafana 12**.
- **Business Table Panel 1.x, 2.x** requires **Grafana 10.3** or **Grafana 11**.

## Getting started

The Business Table panel can be installed from the [Grafana Catalog](/grafana/plugins/volkovlabs-table-panel/) or utilizing the Grafana command line tool.

For the latter, please use the following command.

sh [Copy code to clipboard] Copy

```sh
grafana cli plugins install volkovlabs-table-panel
```

## Highlights

- **Tree View**: Display hierarchical data with expandable and collapsible rows.
- **Tabbed Views**: Switch between multiple data frames within a single panel.
- **Dynamic Filtering**: Filter table data using dashboard variables.
- **Pagination**: Support for client-side and server-side pagination for large datasets.
- **Thresholds**: Apply Grafana’s threshold styling for visual data insights.
- **Custom Cell Types**: Render cells as JSON, Gauge, Image, HTML/Markdown, and more.
- **Data Editing**: Enable permission-based editing with query integration.
- **Export Options**: Download table data as CSV or Excel files.

[](/media/docs/grafana/panels-visualizations/business-table/groups.png)

## Documentation

Expand table

| Section                                                                     | Description                                           |
|-----------------------------------------------------------------------------|-------------------------------------------------------|
| [Editable data](/docs/plugins/volkovlabs-table-panel/latest/editable-data/) | Explains 7 configurable data flows.                   |
| [Features](/docs/plugins/volkovlabs-table-panel/latest/features/)           | Explains the plugin features.                         |
| [Release notes](/docs/plugins/volkovlabs-table-panel/latest/release/)       | Stay up to date with the latest features and updates. |

## License

Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/business-table/blob/main/LICENSE).
