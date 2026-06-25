---
title: "Traces Drilldown | Grafana Plugins documentation"
description: "Learn about traces and how you can investigate tracing data with Grafana Traces Drilldown to understand and troubleshoot your application and services."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Grafana Traces Drilldown

Distributed traces provide a way to monitor applications by tracking requests across services. Traces record the details of a request to help understand why an issue is or was happening.

Grafana Traces Drilldown helps you visualize insights from your Tempo traces data. Using the app, you can:

- Use Rate, Errors, and Duration (RED) metrics derived from traces to investigate issues
- Uncover related issues and monitor changes over time
- Browse automatic visualizations of your data based on its characteristics
- Save and load filter configurations to quickly return to previous investigations
- Do all of this without writing TraceQL queries

Start your learning experience with Grafana Learning Paths

Grafana Learning Paths provide a clear, structured path that leads you from beginner concepts to advanced use cases. Learn about this Grafana feature on [Explore traces using Traces Drilldown](/docs/learning-journeys/drilldown-traces/).

[Start learning](https://grafana.com/docs/learning-journeys/drilldown-traces/)

You can use the Drilldown apps to explore your telemetry data. Refer to [Telemetry signal workflows](/docs/grafana-cloud/telemetry-signals/workflows/) to explore workflows across all the Drilldown apps.

## Who is Traces Drilldown for?

Traces Drilldown is for engineers of all levels of operational expertise. You no longer need to be an SRE wizard to get value from your traces.

Traditionally, you’d need a deep understanding of your systems and the tracing query language, TraceQL, to get the most out of your tracing data.

With Traces Drilldown, you get the same powerful insights, by viewing and clicking in visualizations which are automatically generated from your tracing data.

## Explore

[Get started
\
How do you use tracing data to investigate an issue? Start here.](./get-started/)

[Access or install
\
Access or install Traces Drilldown.](./access/)

[Concepts
\
Learn the concepts you need to use tracing.](./concepts/)

[Investigate trends and spikes
\
Use your tracing data to identify issues and determine the root cause.](./investigate/)

[Changelog
\
Learn about the updates, new features, and bugfixes in this version.](https://github.com/grafana/explore-traces/blob/main/CHANGELOG.md)

Give it a try using Grafana Play

With Grafana Play, you can explore and see how it works, learning from practical examples to accelerate your development. This feature can be seen on [Grafana Traces Drilldown](https://play.grafana.org/a/grafana-exploretraces-app/explore).

[Try it](https://play.grafana.org/a/grafana-exploretraces-app/explore)
