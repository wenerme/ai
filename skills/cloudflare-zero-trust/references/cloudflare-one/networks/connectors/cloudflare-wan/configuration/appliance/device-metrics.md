---
description: Device metrics in Zero Trust networking.
title: Device metrics
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Device metrics

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/device-metrics/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare customers can inspect metrics for a specific Cloudflare One Appliance (formerly Magic WAN Connector) in the Cloudflare dashboard. These metrics help you troubleshoot potential issues with your Cloudflare One Appliance. For details, refer to [Troubleshooting](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/troubleshooting/).

## Query metrics with GraphQL

Customers can query Cloudflare's GraphQL API to fetch their Cloudflare One Appliance device metrics. The Cloudflare dashboard displays Cloudflare One Appliance device metrics over the past one hour. Via the GraphQL API, customers can query for up to 30 days of historical Cloudflare One Appliance device metrics.

For example:

```graphql
query telemetry(
  $accountTag: string
  $snapshotsFilter: AccountMconnTelemetrySnapshotsAdaptiveGroupsFilter_InputObject!
  $snapshotMountsFilter: AccountMconnTelemetrySnapshotMountsAdaptiveGroupsFilter_InputObject!
  $snapshotThermalsFilter: AccountMconnTelemetrySnapshotThermalsAdaptiveGroupsFilter_InputObject!
  $limit: int64!
) {
  viewer {
    accounts(filter: { accountTag: $accountTag }) {
      snapshots: mconnTelemetrySnapshots(
        filter: $snapshotsFilter
        limit: $limit
        orderBy: [datetimeFiveMinutes_DESC]
      ) {
        max {
          cpuCount
          loadAverage1m
          memoryFreeBytes
          memoryTotalBytes
        }
        dimensions {
          connectorId
          datetimeFiveMinutes
        }
      }
      snapshotMounts: mconnTelemetrySnapshotMounts(
        filter: $snapshotMountsFilter
        limit: $limit
        orderBy: [datetimeFiveMinutes_DESC]
      ) {
        max {
          availableBytes
          totalBytes
        }
        dimensions {
          connectorId
          datetimeFiveMinutes
        }
      }
      snapshotThermals: mconnTelemetrySnapshotThermals(
        filter: $snapshotThermalsFilter
        limit: $limit
        orderBy: [datetimeFiveMinutes_DESC, connectorId_DESC]
      ) {
        max {
          currentCelsius
        }
        dimensions {
          connectorId
          datetimeFiveMinutes
        }
      }
    }
  }
}
```

### Average CPU load explained

The metric `average CPU load` is unique and distinctly different from `CPU utilization` which is another common CPU metric. The Cloudflare One Appliance uses a [Unix-style CPU load calculation ↗](https://en.wikipedia.org/wiki/Load%5F%28computing%29).

CPU load is a measure of the number of processes that are currently running and that are waiting to be run on the CPU. Cloudflare collects the one minute load average from the device and converts that into a percentage based on the total number of cores in the CPU. If the Cloudflare One Appliance CPU has eight cores, and a one minute load average of two, then the average CPU load is 25%. If the average CPU load is above 100%, then there are processes in the queue that are waiting to be executed on the CPU.

Cloudflare is still evaluating the typical CPU load operating range on the Cloudflare One Appliance. In general, a healthy range for average CPU load on any device is between 30% and 70%. Customers may experience decreased Cloudflare One Appliance performance if the average CPU load is consistently above 100%.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/device-metrics/#page","headline":"Device metrics · Cloudflare One docs","description":"Device metrics in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/device-metrics/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
