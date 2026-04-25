---
title: Internet Routing Registry (IRR)
description: How Internet Routing Registry entries validate prefix ownership.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Internet Routing Registry (IRR)

The [Internet Routing Registry (IRR)](http://www.irr.net/index.html) is a globally distributed database of routing information which contains announced routes and routing policies in a common format. Network operators use this information, as well as [RPKI](https://developers.cloudflare.com/byoip/concepts/route-filtering-rpki/), to configure backbone routers.

The IRR consists of many individual [routing registries ↗](http://www.irr.net/docs/list.html), and some are managed by regional entities - such as the American Registry for Internet Numbers (ARIN), the Regional Internet Registry for Europe, Middle East and Central Asia (RIPE), and so on. Each routing registry contains IRR entries that provide information about IP prefixes and the [autonomous systems ↗](https://www.cloudflare.com/learning/network-layer/what-is-an-autonomous-system/) authorized to announce them.

To announce your subnet prefixes, Cloudflare requires accurate IRR entries for your prefixes and autonomous system numbers (ASNs).

When you configure network infrastructure for services such as [Magic Transit](https://developers.cloudflare.com/magic-transit/about/), or before onboarding your IP to Cloudflare, [verify your IRR entries](https://developers.cloudflare.com/byoip/concepts/irr-entries/best-practices/#verify-an-irr-entry).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/byoip/","name":"BYOIP"}},{"@type":"ListItem","position":3,"item":{"@id":"/byoip/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/byoip/concepts/irr-entries/","name":"Internet Routing Registry (IRR)"}}]}
```
