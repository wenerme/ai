---
title: Smart Tiered Cache
description: Reduce origin requests by serving cached content from upper-tier data centers.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/smart-shield/configuration/smart-tiered-cache.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Smart Tiered Cache

Availability

Available in all Smart Shield packages.

With data centers around the world, Cloudflare caches content very close to end users. However, if a piece of content is not in cache, the Cloudflare data centers must contact the origin server to receive the cacheable content. Tiered cache works by dividing Cloudflare's data centers into a hierarchy of lower-tiers and upper-tiers, where only upper-tiers can ask your origin for content.

Smart Tiered Cache dynamically selects the single closest upper tier for each of your website’s origins with no configuration required, using our in-house performance and routing data. Cloudflare collects latency data for each request to an origin, and uses the latency data to determine how well any upper-tier data center is connected with an origin. As a result, Cloudflare can select the data center with the lowest latency to be the upper-tier for an origin.

#### Load Balancing interaction

While Smart Tiered Cache selects one Upper Tier per origin, when using Load Balancing, Smart Tiered Cache will select the single best Upper Tier for the entire [Load Balancing Pool](https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-components/#pools).

#### Caveats

Smart Tiered Cache does not work when an origin is behind an [anycast ↗](https://www.cloudflare.com/en-gb/learning/cdn/glossary/anycast-network/) or a regional unicast network because that will prevent us from knowing where the origin is located. As a result, we are unable to select the optimal upper tier and latency may be negatively impacted.

You need to be careful when updating your origin IPs/DNS records while Smart Tiered Cache is enabled. Depending on the changes made, it may cause the existing assigned upper tiers to change, resulting in an increased `MISS` rate as cache is refilled in the new upper tiers. If the origin is switched to a network behind anycast, it will significantly reduce the effectiveness of Smart Tiered Cache.

If you need to use anycast or regional unicast and want to use Smart Tiered cache, please engage your account team.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/smart-shield/","name":"Smart Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/smart-shield/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/smart-shield/configuration/smart-tiered-cache/","name":"Smart Tiered Cache"}}]}
```
