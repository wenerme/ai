---
title: Default HTTP Privacy
description: How Cloudflare encrypts and processes HTTP requests across its global network.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/data-localization/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Default HTTP Privacy

Cloudflare runs one of the largest global anycast networks in the world, with all current data center locations accessible on the [network map ↗](https://www.cloudflare.com/network/).

Within the Cloudflare data centers, and between the Cloudflare network and a customer's origin, traffic is encrypted during transit. Customers have the flexibility to select which [encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/) and which [Cipher Suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/) they want to use.

Additionally, all request and response processing within a Cloudflare data center occurs in memory, with machine inspection used to prevent human access. Nothing is written to disk except for eligible content for caching or Cache Rules configured by the customer. Moreover, all cache disks are encrypted at rest.

![HTTP requests flow](https://developers.cloudflare.com/_astro/http-requests-flow.BQhq9Ov4_1odumR.webp) 

At a high level, when an end user's device connects to any Cloudflare data center, the request is processed in the following way:

1. Certain types of requests that can be used for cyber attacks are immediately dropped based on the addressing information (layer 3 / network layer).
2. Next, the encrypted request is decrypted and inspected using the customer's chosen business logic, for example, the products Configuration Rules, WAF Custom Rules, Rate Limiting Rules, following the [traffic sequence ↗](https://blog.cloudflare.com/traffic-sequence-which-product-runs-first/) and phases. This process enables the detection and prevention of a variety of different types of cyber attacks and malicious traffic, including layer 7 / application layer DDoS attacks, automated bot traffic, credential stuffing, and SQL injection, among others.
3. The inspected request is then passed to the cache module. If the cache can fulfill the request with a cached copy of the content, it does so; if not, it forwards the request to the customer's origin server. Traffic between the Cloudflare data center and the origin server is encrypted, unless the customer decides to use a different encryption mode.
4. When the response comes from the customer's origin server, any static and eligible content is cached onto encrypted disks. The response then goes back through the business logic to the user across the Internet.

By default, Cloudflare performs TLS termination globally in every data center, where the Internet end user connects to a website or application behind Cloudflare. However, customers can configure Regional Services to specify in which regions the processing and TLS termination occurs.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/data-localization/","name":"Data Localization Suite"}},{"@type":"ListItem","position":3,"item":{"@id":"/data-localization/regional-services/","name":"Regional Services"}},{"@type":"ListItem","position":4,"item":{"@id":"/data-localization/regional-services/http-requests/","name":"Default HTTP Privacy"}}]}
```
