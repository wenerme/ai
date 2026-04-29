---
title: Plans
description: Compare Network Firewall features by plan.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-network-firewall/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Plans

If you are a [Magic Transit](https://developers.cloudflare.com/magic-transit/) or [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/) user, you are automatically provided with a standard list of Cloudflare Network Firewall (formerly Magic Firewall) features. For additional features available for purchase, refer to the list of advanced features below.

## Standard features

* Filtering rules based on protocol, port, IP addresses, packet length, and bit field match.
* Fast propagation of rule changes in less than a minute.
* Single dashboard to manage firewall and network configuration.
* Programmable API for automated deployment and management — compatible with infrastructure-as-code platforms like [Terraform](https://developers.cloudflare.com/terraform/).
* Traffic analytics per rule in the dashboard and using the [GraphQL API](https://developers.cloudflare.com/analytics/graphql-api/).
* Integration with [Cloudflare WAN network-as-a-service](https://developers.cloudflare.com/cloudflare-wan/).
* Included DDoS protection with [Magic Transit](https://developers.cloudflare.com/magic-transit/).

## Advanced features

All standard features are included with the purchase of the advanced features below:

* Customizable IP lists.
* Managed threat intelligence IP lists (Anonymizer, Botnet, Malware, Open Proxies, VPNs).
* Geoblocking based on user location by country.
* Block or allow packets based on Autonomous System Number (ASN).
* Packet captures on demand for network troubleshooting.
* [Protocol validation rules](https://developers.cloudflare.com/cloudflare-network-firewall/about/protocol-validation-rules/) to inspect traffic validity and enforce a positive security model.
* [Secure Web Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) filtering for outbound Internet traffic (network and HTTP policies). The Secure Web Gateway supports all TCP and UDP ports, as well as traffic sourced from RFC 1918 address space. Gateway will proxy BYOIP traffic to egress via the default Cloudflare IPs or your assigned [dedicated egress IPs](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/dedicated-egress-ips/).
* Intrusion Detection System (IDS).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-network-firewall/","name":"Cloudflare Network Firewall"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-network-firewall/plans/","name":"Plans"}}]}
```
