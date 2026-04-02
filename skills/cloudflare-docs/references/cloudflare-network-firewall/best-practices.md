---
title: Best practices
description: By default, Cloudflare Network Firewall (formerly Magic Firewall) permits all ingress traffic that has passed through Cloudflare's core DDoS mitigations. To proactively mitigate attacks and minimize your attack surface and leakage of attack traffic into your environment, we recommend implementing your Cloudflare Network Firewall rules using the following guidelines.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-network-firewall/best-practices/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Best practices

By default, Cloudflare Network Firewall (formerly Magic Firewall) permits all ingress traffic that has passed through Cloudflare's core DDoS mitigations. To proactively mitigate attacks and minimize your attack surface and leakage of attack traffic into your environment, we recommend implementing your Cloudflare Network Firewall rules using the following guidelines.

The best approach is to replicate your current ingress perimeter firewall rules in Network Firewall. If you are unable to export your current perimeter firewall rules, contact your Implementation Manager for help translating the rules into Cloudflare Network Firewall rules.

* [ Minimal ruleset ](https://developers.cloudflare.com/cloudflare-network-firewall/best-practices/minimal-ruleset/)
* [ Extended ruleset ](https://developers.cloudflare.com/cloudflare-network-firewall/best-practices/extended-ruleset/)
* [ Magic Transit egress ](https://developers.cloudflare.com/cloudflare-network-firewall/best-practices/magic-transit-egress/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-network-firewall/","name":"Cloudflare Network Firewall"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-network-firewall/best-practices/","name":"Best practices"}}]}
```
