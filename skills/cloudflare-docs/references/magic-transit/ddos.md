---
title: DDoS protection
description: Cloudflare DDoS protection automatically detects and mitigates Distributed Denial of Service (DDoS) attacks using its Autonomous Edge. With Magic Transit, you have access to additional Advanced DDoS mitigation systems, such as:
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/magic-transit/ddos.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# DDoS protection

Cloudflare DDoS protection automatically detects and mitigates Distributed Denial of Service (DDoS) attacks using its [Autonomous Edge](https://developers.cloudflare.com/ddos-protection/about/components/#autonomous-edge). With Magic Transit, you have access to additional [Advanced DDoS mitigation systems](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/), such as:

* [Advanced TCP protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/)
* [Advanced DNS protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-dns-protection/)

Refer to [Cloudflare DDoS documentation](https://developers.cloudflare.com/ddos-protection/) for more information.

---

## Execution order

Magic Transit executes mitigation systems in the following order:

1. [DDoS managed rulesets](https://developers.cloudflare.com/ddos-protection/managed-rulesets/)
2. [Advanced TCP Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/)
3. [Advanced DNS Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-dns-protection/)
4. [Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/magic-transit/","name":"Magic Transit"}},{"@type":"ListItem","position":3,"item":{"@id":"/magic-transit/ddos/","name":"DDoS protection"}}]}
```
