---
title: Route filtering and RPKI
description: How route filtering and RPKI protect against route hijacking.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/byoip/concepts/route-filtering-rpki.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Route filtering and RPKI

As referred in the [IRR concept page](https://developers.cloudflare.com/byoip/concepts/irr-entries/), network operators use IRR records to configure backbone routers. In summary, it is the IRR records that provide information about IP prefixes and the autonomous systems (ASN) authorized to announce them. Then, network operators will apply filtering policies to avoid invalid announcements.

Considering this important role of IRR records, validation via Resource Public Key Infrastructure (RPKI) was introduced. With RPKI, the IP/ASN association is cryptographically validated before being passed on to the routers.

When registering your prefix under one of the five Regional Internet Registries (RIRs)[1](#user-content-fn-1), you can generate a cryptographically-signed object called Route Origin Authorization (ROA). ROAs are public and you can use [Cloudflare's RPKI Portal ↗](https://rpki.cloudflare.com/?view=validator) or other sources, such as [Routinator ↗](https://rpki-validator.ripe.net/ui/), to check your prefixes.

## Footnotes

1. AFRINIC, APNIC, ARIN, LACNIC, and RIPE. [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/byoip/","name":"BYOIP"}},{"@type":"ListItem","position":3,"item":{"@id":"/byoip/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/byoip/concepts/route-filtering-rpki/","name":"Route filtering and RPKI"}}]}
```
