---
title: Best practices
description: How Best practices works in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/traffic-policies/packet-filtering/best-practices/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Best practices

By default, Cloudflare Network Firewall allows all incoming (ingress) traffic that has passed through Cloudflare's core DDoS mitigations. To reduce your exposure to attacks and prevent unwanted traffic from reaching your network, configure rules using the following guidelines.

If you are setting up firewall rules for the first time, start with the [Minimal ruleset](https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/best-practices/minimal-ruleset/). If you have existing on-premises or edge firewall rules, the best approach is to replicate those rules in Network Firewall. If you are unable to export your current firewall rules, contact your Cloudflare Implementation Manager for help translating the rules into Network Firewall rules.

* [ Minimal ruleset ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/best-practices/minimal-ruleset/)
* [ Extended ruleset ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/best-practices/extended-ruleset/)
* [ Magic Transit egress ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/best-practices/magic-transit-egress/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/packet-filtering/","name":"Packet filtering"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/traffic-policies/packet-filtering/best-practices/","name":"Best practices"}}]}
```
