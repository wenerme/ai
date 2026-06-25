---
title: "Investigations App | Grafana Plugins documentation"
description: "Investigations let you curate interesting signals from the Drilldown apps."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Investigations App

Investigations let you curate interesting signals from the Drilldown apps.

* * *

> Note
>
> Investigations is currently in [public preview](/docs/release-life-cycle/). Grafana Labs offers limited support, and breaking changes might occur prior to the feature being made generally available.

## Overview

The Investigations app lets you collect interesting signals from around the Drilldown apps into easy-to-manage lists.

[Investigations app lets you collect lists of interesting signals.](/media/docs/investigations/screenshot-investigations-app.png)

With Investigations you can:

- Collect metrics, logs, traces and profiles and annotate them to explain their significance
- Easily navigate between the various signals without opening lots of browser tabs
- View the items at different time ranges to quickly analyse recurring issues
- Create a dashboard from an investigation to level up your observability

## Get started

To enable comprehensive investigations, start by using the Drilldown apps, which now explicitly support mixing metrics, logs, traces, and profiles within the same analysis.

However, you can add any URL to an investigation using the **Add this page** button in the investigation sidebar. A link is added to the investigation items, and you can add comments like any other item.

To learn more about the app, start with the [Sidebar](./sidebar) - it’s where the app lives, and the place you’ll interact with it the most.

## Your feedback is welcome

We are keen to hear about your experience - [please complete this form](https://forms.gle/SbVBmYZ7rbmBEsQb8) - it helps us improve the app.

## Explore

[Sidebar
\
The sidebar is the main way to interact with investigations. It shows your investigations and lets you create new ones.](sidebar)

[Timeline view
\
The Timeline view shows investigation items on a true time scale, making it easy to see when events occurred and how they relate.](timeline)

[Compare time ranges
\
The Compare time ranges tool lets you look at the same investigation items across different periods, making it easy to spot patterns and changes.](compare-time-ranges)
