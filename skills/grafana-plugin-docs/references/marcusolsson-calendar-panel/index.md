---
title: "Business Calendar | Grafana Plugins documentation"
description: "Learn how to display events in a stylish calendar format using the Business Calendar panel plugin."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Business Calendar

The Business Calendar panel is a Grafana plugin that displays events in a stylish calendar format. You can use data from various data sources.

[](/media/docs/grafana/panels-visualizations/business-calendar/dashboard.png)

## Requirements

- The Business Calendar panel 4.X requires **Grafana 11** or **Grafana 12**.
- The Business Calendar panel 3.X requires **Grafana 10** or **Grafana 11**.
- Calendar panel 2.X requires **Grafana 9.2** or **Grafana 10**.
- Calendar panel 1.X requires **Grafana 8.5** or **Grafana 9**.

## Getting started

You can install the Business Calendar panel plugin from the [Grafana Plugins catalog](/grafana/plugins/marcusolsson-calendar-panel/) or use the Grafana command line tool.

For the latter, please use the following command:

sh [Copy code to clipboard] Copy

```sh
grafana cli plugins install marcusolsson-calendar-panel
```

## Highlights

- Intuitive multi-language toolbar that allows you to:

  - Switch between the **Day**, **Week**, **Month**, **Work Week**, **Year**, and **Agenda** views.
  - Switch back to today’s events.
  - Display events from the previous and subsequent time ranges.
- Fetch and combine event data from any data source.
- Filter events by a time range.
- Color events based on Grafana Thresholds.
- Open a data link instead of a sidebar when you click an event.
- Display annotations across all dashboards for the specified period.
- Support for internationalization: Spanish, French, German, Portuguese, and Chinese.

## Documentation

Expand table

| Section                                                                               | Description                                          |
|---------------------------------------------------------------------------------------|------------------------------------------------------|
| [Basic configuration](/docs/plugins/marcusolsson-calendar-panel/latest/basic-config/) | Explains plugin basics                               |
| [Configuration](/docs/plugins/marcusolsson-calendar-panel/latest/configuration/)      | Describes configuration options                      |
| [Features](/docs/plugins/marcusolsson-calendar-panel/latest/features/)                | Describes plugin’s features                          |
| [Release notes](/docs/plugins/marcusolsson-calendar-panel/latest/release/)            | Stay up to date with the latest features and updates |

## License

Apache License Version 2.0, see [LICENSE](https://github.com/grafana/business-calendar/blob/main/LICENSE).
