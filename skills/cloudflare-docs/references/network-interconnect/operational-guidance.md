---
title: Operational guidance
description: Maintenance windows and troubleshooting guidance for CNI
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/network-interconnect/operational-guidance.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Operational guidance

## Understanding maintenance and availability

Also refer to [Monitoring and alerts](https://developers.cloudflare.com/network-interconnect/monitoring-and-alerts).

Regular network maintenance may impact Cloudflare Network Interconnect (CNI) connectivity.

* **Maintenance impact**: Maintenance windows average six hours. Customers who are not redundantly connected to diverse devices, for instance in single-homed PoPs, will experience a complete service disruption on CNI in that location.
* **Designing for availability**: For critical applications, deploy CNI in locations that support diversity on the device level (multi-homed PoPs). Cloudflare does not guarantee coordinated maintenance between PoP locations.

## Maintenance expectations

### Notice periods

* **Routine maintenance**: Minimum two business days notice in multi-homed PoPs.
* **Emergency maintenance**: Best-effort notice, which may be less than two business days.

To receive advance alerts, configure [CNI maintenance notifications](https://developers.cloudflare.com/network-interconnect/monitoring-and-alerts/).

### Scheduling patterns

* Maintenance on redundant devices (for example, edge router one and edge router two) may occur on consecutive days with a minimum 16-hour gap between windows.
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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/network-interconnect/","name":"Network Interconnect"}},{"@type":"ListItem","position":3,"item":{"@id":"/network-interconnect/operational-guidance/","name":"Operational guidance"}}]}
```
