---
title: "Macros | Grafana Plugins documentation"
description: "This document explains the macros provided by JSON API data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

[Documentation](/docs/)[breadcrumb arrow] [Plugins](/docs/plugins/)[breadcrumb arrow] [JSON API data source](/docs/plugins/marcusolsson-json-datasource/latest/)[breadcrumb arrow] Macros

Open source Grafana Cloud

Use macros to add dashboard context to your queries. Macros are available in HTTP params and JSONPath expressions.

Expand table

| Macro                | Description                                                                                |
|----------------------|--------------------------------------------------------------------------------------------|
| `$__unixEpochFrom()` | Start of the dashboard time interval as a Unix timestamp, i.e. 1494410783                  |
| `$__unixEpochTo()`   | End of the dashboard time interval as a Unix timestamp, i.e. 1494410783                    |
| `$__isoFrom()`       | Start of the dashboard time interval as a ISO8601 timestamp, i.e. 2021-05-17T20:48:09.000Z |
| `$__isoTo()`         | End of the dashboard time interval as a ISO8601 timestamp, i.e. 2021-05-17T20:48:09.000Z   |
