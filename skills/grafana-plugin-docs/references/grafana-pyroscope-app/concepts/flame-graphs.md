---
title: "Flame graphs | Grafana Plugins documentation"
description: "Learn about flame graphs to help visualize performance data."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Flame graphs

Flame graphs provide a visual summary of your profile data. A flame graph is a complete visualization of hierarchical data, for example stack trace and, file system contents, with a metric, typically resource usage, attached to the data.

A fundamental aspect of continuous profiling is the flame graph, a convenient way to visualize performance data. These graphs provide a clear, intuitive understanding of resource allocation and bottlenecks within the application.

[Brendan Gregg](https://www.brendangregg.com/flamegraphs.html), the creator of flame graphs, was inspired by the inability to view, read, and understand stack traces using the regular profilers to debug performance issues.

## How Pyroscope creates flame graphs

This diagram shows how code is turned into a flame graph. In this case, Pyroscope samples the stacktrace of your application to understand how many CPU cycles are spent in each function. It then aggregates this data and turns it into a flame graph.

## What does a flame graph represent?

Horizontally, the flame graph represents 100% of the time that this application was running. The width of each node represents the amount of time spent in that function. The wider the node, the more time spent in that function. The narrower the node, the less time spent in that function.

Vertically, the nodes in the flame graph represent the hierarchy of functions called and time spent in each function. The top node is the root node and represents the total amount of time spent in the application. The nodes below it represent the functions called and time spent in each function. The nodes below those represent the functions called from those functions and time spent in each function. This continues until you reach the bottom of the flame graph.

This is a CPU profile, but profiles can represent many other types of resource such as memory, network, disk, etc.

## Flame graph visualization panel UI

To learn more about the flame graph user interface in Grafana, Grafana Cloud, and Grafana Profiles Drilldown, refer to [Flame graph visualization panel](/docs/grafana-cloud/visualizations/panels-visualizations/visualizations/flame-graph/).

To learn more about the flame graph in the Pyroscope UI, refer to [Pyroscope UI](/docs/pyroscope/latest/view-and-analyze-profile-data/pyroscope-ui/).
