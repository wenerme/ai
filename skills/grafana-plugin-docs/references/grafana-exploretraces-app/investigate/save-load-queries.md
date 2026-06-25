---
title: "Save and load queries | Grafana Plugins documentation"
description: "Save and load filter configurations to reuse across sessions."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Save and load queries

Save your current filter configuration as a named query so you can quickly return to it later. This is useful when you have a set of filters you use repeatedly, such as filters for a specific service, error type, or latency threshold.

Saved queries capture your current **Filters** bar and **data source**. They don’t capture the time range, selected metric, group-by attribute, active tab, or other exploration state.

## Save a query

To save your current filters:

1. Add at least one filter using the **Filters** bar.
2. Select the **Save** button (save icon) in the header bar, next to the data source selector.
3. Enter a **Title** and optional **Description** for the query.
4. Select **Save**.

If a saved query with the same filter expression already exists for the current data source, a warning shows the title of the existing entry.

> Note
>
> The **Save** button only appears when at least one filter is applied.

## Load a saved query

To load a previously saved query:

1. Select the **Load** button (folder-open icon) in the header bar, next to the data source selector.
2. Browse the list of saved queries.
3. Select a query to preview its title, description, and filter expression.
4. Select **Select** to apply the saved filters.

Loading a saved query *replaces* your current filters. If the saved query uses a different data source, the data source switches automatically.

To remove a saved query you no longer need, select the **Delete** (trash) icon next to it in the load modal.

## Storage

Saved queries are stored in one of two ways, depending on your Grafana setup:

- **Saved Queries (query library)**: When the `queryLibrary` feature toggle is enabled in Grafana 12.4 or later, saved queries are stored server-side using Grafana’s query library. Queries saved this way are available across browsers and devices.
- **Local storage**: In Grafana open source, older Grafana versions, or when the query library toggle is not enabled, saved queries are stored in your browser’s local storage. These queries are specific to your browser and device and can’t be shared.
