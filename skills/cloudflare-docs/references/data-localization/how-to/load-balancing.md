---
title: Load Balancing
description: Configure Load Balancing with Regional Services and Customer Metadata Boundary.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/data-localization/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Load Balancing

The following sections describe how to configure Load Balancing with Regional Services and Customer Metadata Boundary to control where load balancing decisions and traffic processing occur.

## Regional Services

You can load balance traffic at different levels of the networking stack depending on the [proxy mode](https://developers.cloudflare.com/load-balancing/understand-basics/proxy-modes/): Layer 7 (`HTTP/S`) and Layer 4 (`TCP`) are supported; however, `DNS-only` is not supported, as it is not [proxied](https://developers.cloudflare.com/dns/proxy-status/).

To configure Regional Services for hostnames [proxied](https://developers.cloudflare.com/dns/proxy-status/) (meaning traffic routes through Cloudflare) through Cloudflare and ensure that the Load Balancer is available only in-region, follow these steps for the dashboard or API configuration:

* [ Dashboard ](#tab-panel-5333)
* [ API ](#tab-panel-5334)

1. In the Cloudflare dashboard, go to the **Load balancing** page.  
[ Go to **Load Balancing** ](https://dash.cloudflare.com/?to=/:account/:zone/traffic/load-balancing)
2. Follow the steps to [create a load balancer](https://developers.cloudflare.com/load-balancing/load-balancers/create-load-balancer/#create-a-load-balancer).
3. From the **Data Localization** dropdown, select the region you would like to use on your domain.
4. Select **Next** and continue with the regular setup.
5. Select **Save**.

1. Follow the instructions outlined to [create a load balancer](https://developers.cloudflare.com/load-balancing/load-balancers/create-load-balancer/#create-a-load-balancer) via API.
2. Run the [API POST](https://developers.cloudflare.com/data-localization/regional-services/get-started/#configure-regional-services-via-api) command on the Load Balancer hostname to create a `regional_hostnames` with a specific region.

## Customer Metadata Boundary

[Load Balancing Analytics](https://developers.cloudflare.com/load-balancing/reference/load-balancing-analytics/) are not available outside the US region when using Customer Metadata Boundary.

With Customer Metadata Boundary set to `EU`, **Traffic** \> **Load Balancing Analytics** \> **Overview and Latency** tab in the zone dashboard will not be populated.

Refer to the [Load Balancing documentation](https://developers.cloudflare.com/load-balancing/) for more information.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/data-localization/","name":"Data Localization Suite"}},{"@type":"ListItem","position":3,"item":{"@id":"/data-localization/how-to/","name":"Configuration guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/data-localization/how-to/load-balancing/","name":"Load Balancing"}}]}
```
