---
title: Protocol validation rules
description: Protocol validation rules for network traffic.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-network-firewall/about/protocol-validation-rules.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Protocol validation rules

Cloudflare Network Firewall (formerly Magic Firewall) supports [Session Initiation Protocol (SIP) ↗](https://datatracker.ietf.org/doc/html/rfc2543) to inspect traffic validity and enforce a positive security model.

You can use the `sip` field when creating a rule to determine if packets are valid SIP Layer 7 (L7) protocol. Refer to [Cloudflare Network Firewall fields](https://developers.cloudflare.com/cloudflare-network-firewall/reference/network-firewall-fields/), specifically the `sip` field, for more information on this topic.

Contact your account manager if you need Cloudflare Network Firewall to support additional protocols.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-network-firewall/","name":"Cloudflare Network Firewall"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-network-firewall/about/","name":"About"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-network-firewall/about/protocol-validation-rules/","name":"Protocol validation rules"}}]}
```
