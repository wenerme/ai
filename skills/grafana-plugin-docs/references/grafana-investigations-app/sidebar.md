---
title: "Investigations sidebar | Grafana Plugins documentation"
description: "Overview of the sidebar in the Investigations app"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Sidebar

The sidebar is the main way to interact with investigations. It shows a list of investigations and allows you to create new ones.

## Your and other’s investigations

The investigation list shows your past investigations and those created by others.

Any items you favorited using the star icon will appear at the top.

[List your and other’s investigations.](/media/docs/investigations/screenshot-investigations-list.png)

## An Investigation

An investigation is a group of items collected from across the Drilldown apps.

[The investigation header contains the title, description, and actions.](/media/docs/investigations/screenshot-investigation-title-2.png)

- Setting a meaningful title is important if you want to use that investigation in the future
- The **Add investigation summary** feature optional but can be useful to provide a status update or summary after the investigation is complete
- The star icon allows you to favorite an investigation - these items will show up at the top of the investigation list
- The three-dot menu contains actions you can perform on the investigation

Use the **Add this page** button to add any other Grafana pages that might be relevant to your investigation.

## Curate items within investigations

To build up an investigation, you can add items from across the Drilldown apps.

[An example investigation item.](/media/docs/investigations/screenshot-investigation-item.png)

- The item name appears as the title. **You can click this to navigate back to the source app**
- The handle in the top left corner allows you to reorder the item with the investigation
- The icon shows you the source of the item
- The trash can in the top right hand corner allows you to remove the item from the investigation

The body of the item is made up of a visualization of the data you add from the other apps.

Below the graph are the comments. Comments let you keep track of important thoughts along the way. They show up in other visualisations.

## Investigation features

This section explains each of the features in the Investigations app.

### Adding items

To add an item to an investigation, choose the **Add to investigation** option from the three-dots menu on panels in the Drilldown apps.

- The item will be added to the last open investigation or else create a new one
- A new investigation will get a general title, it is recommended to rename it to be more descriptive - especially if you plan to reuse it in the future

[Look for the Add to Investigation menu item throughout the Drilldown apps.](/media/docs/investigations/screenshot-add-to-investigation.png)

### Comments

There is a space below each item where you can add and edit comments. Markdown is supported, and clicking the little markdown icon in the app will present a panel with the syntax help.

[Markdown preview panel accessible in the app.](/media/docs/investigations/screenshot-markdown.png)

### Reordering items

Each item gets a draggable handle to the left of the title which can be used to reorder the items. Items should be ordered in the best way to tell the story of the investigation.

### Removing items

To remove an item from an investigation, click the trash can icon in the top right corner of the item.

### Setting an overview note

There is space at the top of an investigation where you can add a note to the investigation. This is useful to provide a status update during an investigation, or to provide a summary after the investigation is complete.

### Do more with the three-dot menu

The three-dot menu in an investigation lets you:

1. Toggle between **Compact view** and expanded view (expanded view shows taller graphs)
2. Toggle **Show all tooltips** - additional details on all graphs when you hover over a shared point on a graph
3. Open the Compare time ranges tool
4. Open the Timeline view
5. Create a dashboard from the investigation
6. Delete the investigation

# What next?

Learn about the [Timeline view](../timeline) and the [Compare time ranges tool](../compare-time-ranges).
