---
title: FAQs
description: Answers to common Load Balancing questions.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# FAQs

## Overview

For more detailed information about Load Balancing — including how-to guides, tutorials, and other reference information — check out our [product documentation](https://developers.cloudflare.com/load-balancing/).

Note

Are you trying to turn on Load Balancing? [Enable Load Balancing ↗](https://dash.cloudflare.com/?to=/:account/:zone/traffic/load-balancing).

---

## Why is my origin receiving so many health monitor requests?

This issue may be caused by a combination of two issues.

### Multiple Health Monitor Regions

When you [attach a monitor to a pool](https://developers.cloudflare.com/load-balancing/monitors/create-monitor/#create-a-monitor), you can specify the **Health Monitor Regions** that Cloudflare uses to monitor your endpoint health.

If you select multiple regions or choose **All Data Centers (Enterprise Only)**, you may [dramatically increase traffic](https://developers.cloudflare.com/load-balancing/understand-basics/health-details/#how-an-endpoint-becomes-unhealthy) to that pool and its associated endpoints. Each region sends individual health monitor requests from 3 data centers. Using **All Data Centers** sends individual health monitor requests from all existing Cloudflare data centers (and that number of data centers is growing all the time).

To reduce traffic, reduce the number of selected regions or choose an option besides **All Data Centers**.

### Low intervals for health monitor requests

If you have a low interval for your health monitor requests, you may increase the traffic sent to your endpoints.

---

## Why is my endpoint or pool considered unhealthy?

To learn more about how endpoints and pools become unhealthy, refer to [Endpoint and pool health](https://developers.cloudflare.com/load-balancing/understand-basics/health-details).

If you know that your endpoint is healthy but load balancing is reporting it as unhealthy, check the following settings on the [monitor](https://developers.cloudflare.com/load-balancing/monitors):

* Perform a `curl` request against the configured endpoint. Make sure the response you are seeing matches your settings for the monitor.
* Ensure your firewall or web server does not block or rate limit [our health monitors](https://developers.cloudflare.com/fundamentals/reference/cloudflare-site-crawling/#specific-products) and accepts requests from [Cloudflare IP addresses](https://developers.cloudflare.com/fundamentals/concepts/cloudflare-ip-addresses/).
* If you are looking for a specific value in the **Response Body**, make sure that value is relatively static and within the first 10 KB of the HTML page.
* If your endpoint responds with a `301` or `302` status code, make sure **Follow Redirects** is selected.
* Try increasing the **Timeout** value.
* Review the **Host Header** for the health monitor.
* If you are using [Authenticated Origin Pulls](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/), [Argo Smart Routing](https://developers.cloudflare.com/argo-smart-routing/), make sure that you entered a zone value for **Simulate Zone**.

---

## Why does my load balancer route traffic to a secondary pool when the primary pool is still healthy?

You occasionally might see traffic routed away from a pool if a health monitor request fails from a specific data center (even if the endpoint is still healthy). That data center may direct a small number of requests to another pool that is considered healthy by that data center.

To learn more about how endpoints and pools become unhealthy, refer to [Endpoint and pool health](https://developers.cloudflare.com/load-balancing/understand-basics/health-details).

---

## What happens when a pool or endpoint becomes unhealthy?

When a pool or endpoint becomes unhealthy, traffic may be rerouted to other healthy pools or endpoints based on your configuration. You might experience this behavior when using:

1 - Pools with **All-Datacenters** monitoring and the monitor fails in a specific data center. In this case, all traffic will be steered away from impacted endpoints in that datacenter until the monitor succeeds again. These instances are reflected in LB request analytics as steering away from an unhealthy endpoint or pool.

2 - Pools with FQDN endpoint addresses and the recursive DNS lookup fails in a specific data center. In this case, only requests for which the DNS request fails will be steered away from impacted endpoints. This could be sporadic, especially if upstream authoritative resolvers occasionally time out or fail, when the local DNS cache TTL expires and a remote lookup is required in the hot path. This also appears in LB request analytics as steering away from an unhealthy endpoint, and the resolved endpoint IP will be missing from the request log.

To avoid these scenarios:

1 - Do not use **All-Datacenters** monitoring.

2 - Use IP addresses for endpoint configurations. If that is not feasible, use domains for which Cloudflare is authoritative (primary or secondary).

To learn more about how endpoints and pools become unhealthy, refer to [Endpoint and pool health](https://developers.cloudflare.com/load-balancing/understand-basics/health-details).

---

## What is the difference between Load Balancing and Health Checks?

[Cloudflare Load Balancing](https://developers.cloudflare.com/load-balancing/) helps monitor endpoints health and — based on that and other information — route incoming requests accordingly. Individual endpoints have monitors attached, which issue monitor requests at regular intervals.

[Cloudflare Health Checks](https://developers.cloudflare.com/health-checks/) are identical to monitors within a load balancer, but only meant for probing server health (and not distributing traffic).

---

## Why do I see different numbers of requests in Load Balancing Analytics?

You may see different numbers of requests when reviewing [Load Balancing Analytics](https://developers.cloudflare.com/load-balancing/reference/load-balancing-analytics/), especially when compared to other Cloudflare dashboards (Caching, etc.).

Load balancing **requests** are the number of uncached requests made by your load balancer. By default, Cloudflare caches resolved IP addresses for up to five seconds. This built-in caching is often the cause of an discrepancies.

---

## I'm seeing a specific error code for my load balancer or monitor.

For a list of specific error codes and next steps, refer to [Load Balancing Troubleshooting](https://developers.cloudflare.com/load-balancing/troubleshooting).

---

## Related resources

* [Endpoint and pool health](https://developers.cloudflare.com/load-balancing/understand-basics/health-details)
* [Monitors](https://developers.cloudflare.com/load-balancing/monitors)
* [Load Balancing Analytics](https://developers.cloudflare.com/load-balancing/reference/load-balancing-analytics/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/load-balancing/troubleshooting/load-balancing-faq/","name":"FAQs"}}]}
```
