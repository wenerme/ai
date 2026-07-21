---
title: Regional Tiered Cache
description: Limit upper-tier data centers to your preferred region for data locality.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/smart-shield/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Regional Tiered Cache

Availability

Regional Tiered Cache is included with Enterprise plans. Smart Shield Advanced, which includes Regional Tiered Cache, is currently only available to Enterprise customers. If you are interested in Smart Shield Advanced, contact our [Enterprise Sales team ↗](https://www.cloudflare.com/resource/contact-enterprise-sales/).

Regional Tiered Cache provides an additional layer of caching for customers who have a global traffic footprint and want to serve content faster by avoiding network latency when there is a cache `MISS` in a lower-tier, resulting in an upper-tier fetch in a data center located far away.

Regional Tiered Cache instructs Cloudflare to check a regional hub data center near the lower tier before going to the upper tier that may be outside of the region.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/smart-shield/configuration/regional-tiered-cache/#page","headline":"Regional Tiered Cache · Cloudflare Smart Shield docs","description":"Limit upper-tier data centers to your preferred region for data locality.","url":"https://developers.cloudflare.com/smart-shield/configuration/regional-tiered-cache/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-06-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Caching"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/smart-shield/","name":"Smart Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/smart-shield/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/smart-shield/configuration/regional-tiered-cache/","name":"Regional Tiered Cache"}}]}
```
