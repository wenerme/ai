---
title: "Coloring events | Grafana Plugins documentation"
description: "Learn how to use colors to improve the visual perception of calendar events."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Coloring events

You can color events using the Business Calendar plugin to improve the visual perception of the calendar layout. Use colors to represent different event types, priorities, and more.

You can color events based on the following **Layout**:

- Frame
- Event
- Thresholds

[](/media/docs/grafana/panels-visualizations/business-calendar/colors-by.png)

## Frame

All events from the same data frame are colored with the same color. This coloring works when you set the **Data &gt; Color** field to NULL.

[](/media/docs/grafana/panels-visualizations/business-calendar/frame.png)

## Event

All events are colored with a different color. This coloring works when you set the **Data &gt; Color** field to NULL.

[](/media/docs/grafana/panels-visualizations/business-calendar/event.png)

## Thresholds

You can color events in different tones based on whether their values fall within a specific threshold. In addition, you can choose a classic color palette in the plugin’s options.

[](/media/docs/grafana/panels-visualizations/business-calendar/threshold.png)
