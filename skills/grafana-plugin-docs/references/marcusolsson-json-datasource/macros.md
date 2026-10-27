---
title: "Macros | Grafana Plugins documentation"
description: "This document explains the macros provided by JSON API data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

[Documentation](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/)![breadcrumb arrow](http://grafana-com-website.grafana-com.svc.cluster.local.:80/static/assets/img/icons/grafana-icon-breadcrumb-arrow-gray.svg) [Plugins](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/)![breadcrumb arrow](http://grafana-com-website.grafana-com.svc.cluster.local.:80/static/assets/img/icons/grafana-icon-breadcrumb-arrow-gray.svg) [JSON API data source](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/marcusolsson-json-datasource/latest/)![breadcrumb arrow](http://grafana-com-website.grafana-com.svc.cluster.local.:80/static/assets/img/icons/grafana-icon-breadcrumb-arrow-gray.svg) Macros

Open source Grafana Cloud

Use macros to add dashboard context to your queries. Macros are available in HTTP params and JSONPath expressions.

Expand table

| Macro                | Description                                                                                |
|----------------------|--------------------------------------------------------------------------------------------|
| `$__unixEpochFrom()` | Start of the dashboard time interval as a Unix timestamp, i.e. 1494410783                  |
| `$__unixEpochTo()`   | End of the dashboard time interval as a Unix timestamp, i.e. 1494410783                    |
| `$__isoFrom()`       | Start of the dashboard time interval as a ISO8601 timestamp, i.e. 2021-05-17T20:48:09.000Z |
| `$__isoTo()`         | End of the dashboard time interval as a ISO8601 timestamp, i.e. 2021-05-17T20:48:09.000Z   |
