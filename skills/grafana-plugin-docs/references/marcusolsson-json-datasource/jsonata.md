---
title: "JSONata | Grafana Plugins documentation"
description: "This document explains the jsonata usage in JSON API data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

[Documentation](https://grafana.com/docs/)![breadcrumb arrow](https://grafana.com/static/assets/img/icons/grafana-icon-breadcrumb-arrow-gray.svg) [Plugins](https://grafana.com/docs/plugins/)![breadcrumb arrow](https://grafana.com/static/assets/img/icons/grafana-icon-breadcrumb-arrow-gray.svg) [JSON API data source](https://grafana.com/docs/plugins/marcusolsson-json-datasource/latest/)![breadcrumb arrow](https://grafana.com/static/assets/img/icons/grafana-icon-breadcrumb-arrow-gray.svg) JSONata

Open source Grafana Cloud

[JSONata](https://docs.jsonata.org/) is a query and transformation language for JSON data.

If you’re new to JSONata, start by looking at some [simple queries](https://docs.jsonata.org/simple).

[Dashboard variables](https://grafana.com/docs/grafana/latest/variables/) are available as JSONata variables, e.g. `$instanceName`. Since dashboard variables can have multiple values, the JSONata variable is always an array. If your variable contains a single value, you can use `$instanceName[0]` to index the first value in the array.
