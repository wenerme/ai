---
title: "Editable data/data flow | Grafana Plugins documentation"
description: "Learn how to use the multifarious editing data functionality in the Business Table panel to provide extensive capabilities for working with table data."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Editable data/data flow

The Business Table provides comprehensive data editing functionality that gives you extensive capabilities for working with table data.

> Note
>
> Make sure you have at least version 1.9.0 of the Business Table to access all the features described for editable data.

## Data flows

You can configure 7 data flows:

- Add data
- Edit data
- Delete data
- Nested objects &gt; Get Options
- Nested objects &gt; Add Options
- Nested objects &gt; Edit Options
- Nested objects &gt; Delete Options

## Highlights

Some highlights of data editing in the Business Table panel:

- Every tab has separate add/delete and permission settings.
- Every column has separate edit and permission settings.
- You can enter a new value manually or select from a predefined list from your data source.
- The Add, Update, and Delete requests are configurable and allow custom logic.
- Permissions can be Grafana user-based (Viewer, Editor, Admin, and None) or regulated from the backend.
- **Nested Objects** have their own get, add, edit, and delete configuration.

[](/media/docs/grafana/panels-visualizations/business-table/table-data-flow.png)

## Categories

Expand table

| Category                                                                            | Description                                                                                                                                                                                                                                    |
|-------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Layout](/docs/plugins/volkovlabs-table-panel/latest/editable-data/layout/)         | The **Layout** parameter category determines the set of tabs and then the set of columns and their types for each tab.                                                                                                                         |
| [Add data](/docs/plugins/volkovlabs-table-panel/latest/editable-data/add/)          | The **Add Data** parameter category determines the tabs where a user can add data, then the columns that should be populated when a row is being added, **Editor Type** for every such column, **Data Source** with **Query**, and permission. |
| [Edit data](/docs/plugins/volkovlabs-table-panel/latest/editable-data/edit/)        | The **Edit Data** parameter category determines the columns that should be populated when a row is being edited, **Editor Type** for every such column, **Data Source** with **Query**, and permission.                                        |
| [Delete data](/docs/plugins/volkovlabs-table-panel/latest/editable-data/delete/)    | The **Delete Data** parameter category determines the tabs where a user can delete a data row, **Data Source** with **Query**, and permission.                                                                                                 |
| [Nested objects](/docs/plugins/volkovlabs-table-panel/latest/editable-data/nested/) | The **Nested Objects** parameter category collects settings for the **Nested Objects** display along with add/edit/delete functionality.                                                                                                       |
