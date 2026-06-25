---
title: "Choose a RED metric | Grafana Plugins documentation"
description: "Choose a rate, error, or duration metric for your investigation."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Choose a RED metric

Traces Drilldown uses RED metrics generated from your tracing data to guide your investigation. In this context, RED metrics mean:

- **Rates** show the rate of incoming spans per second.
- **Errors** show spans that are failing.
- **Duration** displays the amount of time those spans take; represented as a heat map that shows response time and latency.

When you select a RED metric, the tabs underneath the metric selection change to match the context. **Breakdown** and **Comparison** tabs are always present regardless of which metric you choose. For example, selecting **Duration** displays **Root cause latency** and **Slow traces** tabs in addition to **Breakdown** and **Comparison**. Choosing **Errors** shows **Root cause errors**, **Exceptions**, and **Errored traces** tabs in addition to **Breakdown** and **Comparison**. **Rate** shows **Service structure** and **Traces** tabs in addition to **Breakdown** and **Comparison**. These tabs are used when you [analyze tracing data](../analyze-tracing-data/).

To choose a RED metric:

1. Select a graph to select a **Rate**, **Errors**, or **Duration** metric type. Notice that your selection changes the first drop-down list on the filter bar.
2. Optional: Select the signal you want to observe. **Root spans** is the default selection.
3. Look for spikes or trends in the data to help identify issues.

> Tip
>
> If no data or limited data appears, refresh the page. Verify that you have selected the correct data source in the Data source drop-down as well as a valid time range.
