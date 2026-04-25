---
title: Health Checks
description: Monitor origin server availability and receive notifications when status changes.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Health Checks

Availability

Available for Pro, Business, and Enterprise customers in all Smart Shield packages.

A health check is a service that runs on Cloudflare's edge network to monitor whether an origin server is online. This allows you to view the health of your origin servers even if there is only one origin or you do not yet need to balance traffic across your infrastructure.

Health Checks support various configurations to hone in on what you can check, including response codes, protocol types, and intervals. You can specify a particular path if an origin server serves multiple applications or check a larger subset of response codes for your staging environment. All of these options allow you to properly target your Health Check, providing a precise picture of what is wrong with an origin server.

## Regions

Cloudflare has data centers in [hundreds of cities worldwide ↗](https://www.cloudflare.com/network/). Health checks do not run from every single of these data centers as this would result in numerous requests to your servers. Instead, you are able to choose between one and thirteen regions from which to run health checks. Cloudflare will run Health Checks from three data centers in each region that you select.

Note

The exact location of these data centers are subject to change at any moment.

The Internet is not the same everywhere around the world and your users may not have the same experience on your application according to where they are. Running Health Checks from different regions lets you know the health of your application from the point of view of the Cloudflare network in each of these regions.

Analytics are presented at two levels:

* Regional Aggregates: Combined results from the three data centers within a specific region.
* Global Aggregates: Total results across all configured regions and data centers.

In the event log, entries are labeled by region or as **Global**. We do not provide granular data for individual data centers.

If you select multiple regions or choose **All Regions** (Business and Enterprise Only), you may increase traffic to your servers. Each region sends individual health checks from three data centers.

## Further reading

* [ Manage Health Checks ](https://developers.cloudflare.com/smart-shield/configuration/health-checks/setup/)
* [ Health Checks analytics ](https://developers.cloudflare.com/smart-shield/configuration/health-checks/analytics/)
* [ Zone Lockdown ](https://developers.cloudflare.com/smart-shield/configuration/health-checks/zone-lockdown/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/smart-shield/","name":"Smart Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/smart-shield/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/smart-shield/configuration/health-checks/","name":"Health Checks"}}]}
```
