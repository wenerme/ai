---
title: "Edit data | Grafana Plugins documentation"
description: "Learn how to configure data editing and permissions in the Business Table panel using the Edit Data category."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Edit data

You configure data editing and permissions in the **Edit Data** category. You can further configure all columns that you added in the **Layout** category.

[](/media/docs/grafana/panels-visualizations/business-table/category.png)

To allow editing on a column, enable the switch. The **Editable** tag appears next to the column name in the **Layout** category.

[](/media/docs/grafana/panels-visualizations/business-table/edit-tag.png)

## Update request

The **Update Request** takes the values you enter and sends them to your data source, serving as a bridge between your input and the data source. Configure it in the **Edit Data &gt; Settings** section.

First, select the data source where you want to send the updated values. Then, choose the **Query Editor** mode if your data source supports it:

- **Builder**. It uses the standard Grafana query builder.
- **Code**. It allows you to specify an update request query in a language appropriate for your data source.

[](/media/docs/grafana/panels-visualizations/business-table/update-request.png)
