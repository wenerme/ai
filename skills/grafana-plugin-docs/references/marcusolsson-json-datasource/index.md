---
title: "JSON API data source for Grafana | Grafana Plugins documentation"
description: "This document introduces the JSON API data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

[Documentation](/docs/)[breadcrumb arrow] [Plugins](/docs/plugins/)[breadcrumb arrow] JSON API data source

Open source Grafana Cloud

> Warning
>
> This plugin is now in maintenance mode, no new features will be added. We recommend using the [Infinity data source plugin](/grafana/plugins/yesoreyeram-infinity-datasource/) instead

JSON API is an open source data source plugin for Grafana that lets you visualize data from any URL that returns JSON, such as REST APIs or static file servers.

## Known Limitations

- Since the plugin doesn’t keep a record of previous queries, each query needs to contain the complete data set you want to visualize. If you’d like to visualize how the data changes over time, you’re probably better off storing the data in a database.
- This plugin doesn’t support backend operations such as alerting, recorded queries, shared dashboards, enterprise query caching, etc. If you prefer to use one of those options, use the [Grafana Infinity Datasource plugin](/grafana/plugins/yesoreyeram-infinity-datasource/) instead.
- This plugins doesn’t support authentication methods such as OAuth2, digest authentication, jwt authentication. If you prefer to use one of those options, use the [Grafana Infinity Datasource plugin](/grafana/plugins/yesoreyeram-infinity-datasource/) instead.
