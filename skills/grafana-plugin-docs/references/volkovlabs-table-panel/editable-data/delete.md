---
title: "Delete data | Grafana Plugins documentation"
description: "Learn how to delete rows from your Business Table panel with proper configuration and safety measures."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Delete data

> Note
>
> Deleting rows is supported starting from Business Table 1.9.0.

This is one of the most requested features. You can [add](/docs/plugins/volkovlabs-table-panel/latest/editable-data/add/) and delete rows from your Grafana dashboard.

You configure data deletion and permissions in the **Delete Data** category.

## Row deletion configuration

To configure the delete row feature, use the **Delete data** parameter category to specify:

- Which tabs of your Business Table panel allow deleting rows.
- [Permission](/docs/plugins/volkovlabs-table-panel/latest/editable-data/permission/), which provides granular control over who can delete a row.
- **Delete Request**, which consists of a data source and query.

[](/media/docs/grafana/panels-visualizations/business-table/delete-conf.png)

## Delete request

Configure the **Delete Request** in the **Delete Data** section.

First, select the data source where you want to send delete commands. Then, choose the **Query Editor** mode if your data source supports it:

- **Builder**. It uses the standard Grafana query builder.
- **Code**. It allows you to specify an update request query in a language appropriate for your data source.
