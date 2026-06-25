---
title: "Confirmation window | Grafana Plugins documentation"
description: "Learn how to configure and customize the confirmation window to highlight changes before submitting form updates."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Confirmation window

When enabled, the confirmation window displays after you click the submit button. It highlights the changes you made in the Business Form.

> Note
>
> Custom confirmation window labels have been supported starting from version 3.3.0.

You can customize all labels using the **Update Confirmation Window** category.

[](/media/docs/grafana/panels-visualizations/business-forms/confirm-update.png)

## Display Values parameter

> Note
>
> The **Display Values** parameter is supported starting from version 4.0.0.

The **Display Values** parameter has two options:

- **All values**: Shows all data elements, regardless of whether their values changed.
- **Updated Only**: Shows only the data elements with changed values.

[](/media/docs/grafana/panels-visualizations/business-forms/display-values.png)
