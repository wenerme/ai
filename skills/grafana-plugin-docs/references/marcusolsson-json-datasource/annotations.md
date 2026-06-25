---
title: "Variables | Grafana Plugins documentation"
description: "This document explains the process of setting up variables using JSON API data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

[Documentation](/docs/)[breadcrumb arrow] [Plugins](/docs/plugins/)[breadcrumb arrow] [JSON API data source](/docs/plugins/marcusolsson-json-datasource/latest/)[breadcrumb arrow] Variables

Open source Grafana Cloud

[Annotations](/docs/grafana/latest/dashboards/annotations/) let you extract data from a data source and use it to annotate a dashboard.

> **Info:** Annotations support was added in **v1.0.1**. If you can’t select the JSON API data source from the list of data sources, try updating to a more recent version.

To use the JSON API data source for annotations, follow the instructions on [Querying other data sources](/docs/grafana/latest/dashboards/annotations/#querying-other-data-sources). Make sure to select the JSON API from the list of data sources.

Configure a query with *at least* two fields:

- A **String** field for the annotation text
- A **Time** field for the annotation time

If you want to add titles or tags to the annotations, you can add additional **Fields** with the appropriate types.

For more information on how to configure a query, refer to [Query editor](query-editor.md).
