---
title: Magic Transit egress
description: Configure Network Firewall for Magic Transit egress traffic.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

# Magic Transit egress

The suggestions in the [Minimal ruleset](https://developers.cloudflare.com/cloudflare-network-firewall/best-practices/minimal-ruleset/) and [Extended ruleset](https://developers.cloudflare.com/cloudflare-network-firewall/best-practices/extended-ruleset/) are recommendations for ingress traffic.

For Magic Transit egress traffic, consider the following information:

* The Cloudflare Network Firewall (formerly Magic Firewall) rules will apply to both Magic Transit ingress and egress traffic passing via Cloudflare.
* Network Firewall is not stateful for your Magic Transit egress traffic.
* Network Firewall is not stateful in both directions after DDoS mitigations.
* If you have a Network Firewall "default drop" catchall rule for ingress traffic, you will need to add an earlier rule to permit traffic sourced from your Magic Transit prefix with the destination as **any** to allow outbound egress traffic.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-network-firewall/","name":"Cloudflare Network Firewall"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-network-firewall/best-practices/","name":"Best practices"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-network-firewall/best-practices/magic-transit-egress/","name":"Magic Transit egress"}}]}
```
