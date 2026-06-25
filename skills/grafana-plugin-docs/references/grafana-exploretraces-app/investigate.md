---
title: "Investigate trends and spikes | Grafana Plugins documentation"
description: "Investigate trends and spikes to identify issues."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Investigate trends and spikes

Grafana Traces Drilldown provides powerful tools that help you identify and analyze problems in your applications and services.

Using these steps, you can use the tracing data to investigate issues.

1. [Select **Root spans** or **All spans**](./choose-span-data/) to look at either the first span in a trace (the root span) or all span data.
2. [Choose the metric](./choose-red-metric/) you want to use: rates, errors, or duration.
3. [Analyze data](./analyze-tracing-data/) using **Breakdown**, **Comparison**, **Service structure** (Rate), **Root cause errors** and **Exceptions** (Errors), **Root cause latency** (Duration), and **Traces** tabs.
4. [Add filters](./add-filters/) to refine the view of your data.
5. [Save and load queries](./save-load-queries/) to preserve and reuse filter configurations.

You can use these steps in any order and move between them as many times as needed. Depending on what you find, you may start with root spans, delve into error data, and then select **All spans** to access all of the tracing data.

Give it a try using Grafana Play

With Grafana Play, you can explore and see how it works, learning from practical examples to accelerate your development. This feature can be seen on [the Grafana Play site](https://play.grafana.org/a/grafana-exploretraces-app/explore).

[Try it](https://play.grafana.org/a/grafana-exploretraces-app/explore)
