---
title: Custom TURN domains
description: Use custom domains with Cloudflare Realtime TURN via CNAME DNS records.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/turn/custom-domains.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Custom TURN domains

Cloudflare Realtime TURN service supports using custom domains for UDP, and TCP - but not TLS protocols. Custom domains do not affect any of the performance of Cloudflare Realtime TURN and is set up via a simple CNAME DNS record on your domain.

| Protocol      | Custom domains | Primary port | Alternate port |
| ------------- | -------------- | ------------ | -------------- |
| STUN over UDP | ✅              | 3478/udp     | 53/udp         |
| TURN over UDP | ✅              | 3478/udp     | 53 udp         |
| TURN over TCP | ✅              | 3478/tcp     | 80/tcp         |
| TURN over TLS | No             | 5349/tcp     | 443/tcp        |

## Setting up a CNAME record

To use custom domains for TURN, you must create a CNAME DNS record pointing to `turn.cloudflare.com`.

Warning

Do not resolve the address of `turn.cloudflare.com` or `stun.cloudflare.com` or use an IP address as the value you input to your DNS record. Only CNAME records are supported.

Any DNS provider, including Cloudflare DNS can be used to set up a CNAME for custom domains.

Note

If Cloudflare's authoritative DNS service is used, the record must be set to [DNS-only or "grey cloud" mode](https://developers.cloudflare.com/dns/proxy-status/#dns-only-records).\`

There is no additional charge to using a custom hostname with Cloudflare Realtime TURN.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/turn/","name":"TURN Service"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/turn/custom-domains/","name":"Custom TURN domains"}}]}
```
