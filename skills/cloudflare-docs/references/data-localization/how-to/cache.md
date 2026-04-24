---
title: Cache
description: Configure Cache with Regional Services and Customer Metadata Boundary.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/data-localization/how-to/cache.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Cache

In the following sections, we will give you some details about how to configure Cache with Regional Services and Customer Metadata Boundary.

## Regional Services

To configure Regional Services for hostnames [proxied](https://developers.cloudflare.com/dns/proxy-status/) through Cloudflare and ensure that [eligible assets](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/) are cached only in-region, follow these steps for the dashboard or API configuration:

* [ Dashboard ](#tab-panel-6631)
* [ API ](#tab-panel-6632)

1. In the Cloudflare dashboard, go to the **Records** page.  
[ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
2. Follow these steps to [create a DNS record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/).
3. From the **Region** dropdown, select the region you would like to use on your domain.
4. Select **Save**.

1. To create records with the API, use the [API POST](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/) command.
2. Run the [API POST](https://developers.cloudflare.com/data-localization/regional-services/get-started/#configure-regional-services-via-api) command on the hostname to create a `regional_hostnames` with a specific region.

Note

Take into consideration that only [Generic Global Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/#generic-global-tiered-cache) and [Custom Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/#custom-tiered-cache) respect Regional Services. [Smart Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/#smart-tiered-cache) is incompatible with Regional Services.

## Customer Metadata Boundary

[Cache Analytics](https://developers.cloudflare.com/cache/performance-review/cache-analytics/), Generic Global Tiered Cache and Custom Tiered Cache are compatible with Customer Metadata Boundary. With Customer Metadata Boundary set to EU, the **Caching** \> **Tiered Cache** tab in the zone dashboard will not be populated.

For more information on CDN and caching, refer to the [Cache documentation](https://developers.cloudflare.com/cache/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/data-localization/","name":"Data Localization Suite"}},{"@type":"ListItem","position":3,"item":{"@id":"/data-localization/how-to/","name":"Configuration guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/data-localization/how-to/cache/","name":"Cache"}}]}
```
