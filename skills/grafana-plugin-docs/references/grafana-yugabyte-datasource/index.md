---
title: "Yugabyte data source | Grafana Plugins documentation"
description: "This document introduces the Yugabyte data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Yugabyte data source plugin

The Yugabyte data source for Grafana allows you to query and visualize data from YugabyteDB.

> Note
>
> Grafana **Yugabyte** data source plugin is currently in [public preview](/docs/release-life-cycle/). Grafana Labs offers limited support, and breaking changes might occur prior to the feature being made generally available.

## Requirements

The Yugabyte data source has the following requirements:

- A YugabyteDB instance (on-prem/cloud)

## Yugabyte data source plugin vs Postgres data source plugin

Opting for the Yugabyte data source over the PostgreSQL data source can provide several advantages, particularly when exclusively working with YugabyteDB clusters. Unlike the Postgres data source, which is focused on PostgreSQL databases, the Yugabyte data source gives us the ability to implement Yugabyte-specific features and tailored query capabilities.

## Known limitations

- Grafana ad-hoc filters are not supported
- TLS / Network customization is not supported yet

## Compatibility requirements

- Grafana version &gt;= 10.4.5
