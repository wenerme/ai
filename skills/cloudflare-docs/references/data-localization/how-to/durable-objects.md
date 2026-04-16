---
title: Durable Objects
description: Configure Durable Objects with Regional Services and Customer Metadata Boundary.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/data-localization/how-to/durable-objects.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Durable Objects

In the following sections, we will give you some details about how to configure Durable Objects with Regional Services and Customer Metadata Boundary.

## Regional Services

To configure Regional Services for hostnames [proxied](https://developers.cloudflare.com/dns/proxy-status/) through Cloudflare and ensure that processing of a Durable Object (DO) occurs only in-region, follow these steps:

1. Follow the steps in the Durable Objects [Get Started](https://developers.cloudflare.com/durable-objects/get-started/) guide.
2. [Restrict Durable Objects to a jurisdiction](https://developers.cloudflare.com/durable-objects/reference/data-location/#restrict-durable-objects-to-a-jurisdiction), in order to control where the DO itself runs and persists data, by creating a jurisidictional subnamespace in your Worker’s code.
3. Follow the [Workers guide](https://developers.cloudflare.com/data-localization/how-to/workers/#regional-services) to configure a custom domain with Regional Services, in order to control the regions from which Cloudflare responds to requests.

## Customer Metadata Boundary

DO Logs and Analytics are not available outside the US region when using Customer Metadata Boundary. With Customer Metadata Boundary set to `EU`, **Workers & Pages** \> **Workers** \> **Metrics** tab related to DO in the zone dashboard will not be populated.

Refer to the [Durable Objects documentation](https://developers.cloudflare.com/durable-objects/) for more information.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/data-localization/","name":"Data Localization Suite"}},{"@type":"ListItem","position":3,"item":{"@id":"/data-localization/how-to/","name":"Configuration guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/data-localization/how-to/durable-objects/","name":"Durable Objects"}}]}
```
