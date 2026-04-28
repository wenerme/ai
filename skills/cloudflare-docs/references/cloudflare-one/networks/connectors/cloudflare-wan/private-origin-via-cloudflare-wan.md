---
title: Private origins via Cloudflare WAN
description: Use a Cloudflare WAN IPsec tunnel as the off-ramp for proxied traffic to private origins.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

# Private origins via Cloudflare WAN

A Cloudflare WAN (formerly Magic WAN) IPsec tunnel can serve as the off-ramp for proxied traffic from Cloudflare's CDN, WAF, and Cache to origins that live on a private network. Public hostnames continue to resolve through Cloudflare, but Cloudflare sends the request to the origin through your tunnel instead of over the public Internet. This capability is in closed beta.

To set up a public hostname that proxies to a private origin, refer to [Set up a private origin via Cloudflare WAN](https://developers.cloudflare.com/dns/manage-dns-records/how-to/private-origins/private-origin-via-cloudflare-wan/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/private-origin-via-cloudflare-wan/","name":"Private origins via Cloudflare WAN"}}]}
```
