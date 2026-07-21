---
description: Maintenance windows and troubleshooting guidance for CNI
title: Operational guidance
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/network-interconnect/llms.txt
> Use this file to discover all available pages before exploring further.

#  Operational guidance

Last updated May 4, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/network-interconnect/operational-guidance/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Understanding maintenance and availability

Also refer to [Monitoring and alerts](https://developers.cloudflare.com/network-interconnect/monitoring-and-alerts).

Regular network maintenance may impact Cloudflare Network Interconnect (CNI) connectivity.

* **Maintenance impact**: Maintenance windows average six hours. Customers who are not redundantly connected to diverse devices, for instance in single-homed PoPs, will experience a complete service disruption on CNI in that location.
* **Designing for availability**: For critical applications, deploy CNI in locations that support diversity on the device level (multi-homed PoPs). Cloudflare does not guarantee coordinated maintenance between PoP locations.

## Maintenance expectations

### Notice periods

For Dataplane v2 connectivity in multi-homed PoPs only:

* **Routine maintenance**: Minimum two business days notice.
* **Emergency maintenance**: Best-effort notice, which may be less than two business days.

To receive advance alerts, configure [CNI maintenance notifications](https://developers.cloudflare.com/network-interconnect/monitoring-and-alerts/).

### Scheduling patterns

* Maintenance on redundant devices at the same location may occur on consecutive days with a minimum 16-hour gap between windows.
* Cloudflare does not coordinate maintenance timing between different PoP locations.
* Routine maintenance is generally not rescheduled to accommodate customer schedule preferences.

### Customer responsibility

Your CNI deployment must tolerate an unplanned outage on any single circuit at any time. This means:

* Traffic failover between redundant circuits must be automatic.
* If your operations require manual intervention to reroute traffic during maintenance, your configuration needs review.
* Contact your account team to validate your failover design.

## Troubleshooting

When facing connectivity problems, your first action should be to check for broader service disruptions. Visit [Cloudflare Status ↗](https://www.cloudflarestatus.com/) to see if any scheduled maintenance or active incidents are impacting services. This helps determine if the issue originates outside your network. Refer to [Monitoring and alerts](https://developers.cloudflare.com/network-interconnect/monitoring-and-alerts/).

If no system-wide problems are reported, gather the following information before submitting a support case. Providing comprehensive details facilitates a faster resolution:

* **Timeline**: When the issue began and ended (if applicable), including the timezone.
* **Identification**: The CNI IP address or point-to-point prefix for the impacted CNI. If your CNI is part of a Magic setup, please also provide the name of the Magic Transit/WAN interconnect as listed in your dashboard.
* **Physical Layer**: Light levels of the CNI link (if applicable).
* **Service Impact**: Confirmation whether Magic Transit / WAN traffic was affected.
* **Problem Description**: A clear summary of the issue (for example, CNI down, Border Gateway Protocol (BGP) session down, prefixes withdrawn).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/network-interconnect/operational-guidance/#page","headline":"Operational guidance · Cloudflare Network Interconnect docs","description":"Maintenance windows and troubleshooting guidance for CNI","url":"https://developers.cloudflare.com/network-interconnect/operational-guidance/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-04","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
