---
title: "Sort by status | Grafana Plugins documentation"
description: "Learn how to enable sorting of variable panel values based on numeric data retrieved from your data source."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Sort by status

You can let users sort Business Variable panel values based on data retrieved from the data source.

To enable sorting, set **Sort by Status** to **Enabled** and specify:

- **Field with variable values**: This field maps the data frame with the variable panel values.
- **Field with status values**: This field must be numeric. The values are used for sorting.

[](/media/docs/grafana/panels-visualizations/business-variable/sorting.png)

The sorting button alternates between three modes when you click it:

- Neutral: The variable panel is in this state after the page loads and after each page refresh.
- Descending
- Ascending

[](/media/docs/grafana/panels-visualizations/business-variable/sorting-alt.png)
