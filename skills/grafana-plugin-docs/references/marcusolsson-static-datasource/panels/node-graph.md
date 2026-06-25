---
title: "Node graph | Grafana Plugins documentation"
description: "Learn how to create node and edge data for testing the Node Graph panel in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Node graph

You can use the Static data source to test graph panels like Node Graph.

## Node fields

- Use the String field `id` for node IDs.
- Use the String field `title` for node names.

## Edge fields

- Use the String field `id` for edge IDs.
- Use the String field `source` for source IDs.
- Use the String field `target` for target IDs.
- Use the Number field `mainstat` for the value.

[](/media/docs/grafana/panels-visualizations/business-input/graph.png)
