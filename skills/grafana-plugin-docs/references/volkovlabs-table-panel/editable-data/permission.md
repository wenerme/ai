---
title: "Permission | Grafana Plugins documentation"
description: "Learn how to set permissions for every tab and every action in the Business Table panel."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Permission

You set permissions for every tab and every action (add/delete/edit).

> Note
>
> Adding and deleting rows is supported starting from Business Table 1.9.0.

[](/media/docs/grafana/panels-visualizations/business-table/permissions-where.png)

In the **Permission** parameter of **Add Data**, **Edit Data**, or **Delete Data**, set the **Check** parameter to one of the following:

- **Always Allowed**: Every user has permission.
- **By Org User Role**: Specify which roles have permission (**Editor**, **Viewer**, **Admin**, **None**).
- **By Backend**: Specify a data frame column with a boolean value. If the value is **true**, the user has permission. If the value is **false**, the user doesn’t have permission.

[](/media/docs/grafana/panels-visualizations/business-table/permissions.png)
