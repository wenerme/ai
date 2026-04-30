---
title: Internet Routing Registry (IRR)
description: How Internet Routing Registry entries validate prefix ownership.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/byoip/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Internet Routing Registry (IRR)

The [Internet Routing Registry (IRR)](http://www.irr.net/index.html) is a globally distributed database of routing information which contains announced routes and routing policies in a common format. Network operators use this information, as well as [RPKI](https://developers.cloudflare.com/byoip/concepts/route-filtering-rpki/), to configure backbone routers.

IRR entries serve as a public record of which networks are authorized to announce specific IP prefixes. When Cloudflare advertises your IP prefixes on your behalf, other networks check IRR records to verify that Cloudflare has permission to do so. Without accurate IRR entries, your traffic may not be properly routed on the Internet.

The IRR consists of many individual [routing registries ↗](http://www.irr.net/docs/list.html), some managed by regional entities such as the American Registry for Internet Numbers (ARIN) and the Regional Internet Registry for Europe, Middle East and Central Asia (RIPE). Each routing registry contains IRR entries that provide information about IP prefixes and the [autonomous systems ↗](https://www.cloudflare.com/learning/network-layer/what-is-an-autonomous-system/) authorized to announce them.

To announce your IP prefixes through Cloudflare, you must have accurate IRR entries for your prefixes and autonomous system numbers (ASNs).

When you configure network infrastructure for services such as [Magic Transit](https://developers.cloudflare.com/magic-transit/about/), or before onboarding your IPs to Cloudflare, [verify your IRR entries](https://developers.cloudflare.com/byoip/concepts/irr-entries/best-practices/#verify-an-irr-entry).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/byoip/","name":"BYOIP"}},{"@type":"ListItem","position":3,"item":{"@id":"/byoip/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/byoip/concepts/irr-entries/","name":"Internet Routing Registry (IRR)"}}]}
```
