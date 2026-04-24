---
title: Magic Transit egress
description: How Magic Transit egress works in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/traffic-policies/packet-filtering/best-practices/magic-transit-egress.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Magic Transit egress

The suggestions in the [Minimal ruleset](https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/best-practices/minimal-ruleset) and [Extended ruleset](https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/best-practices/extended-ruleset) are recommendations for ingress (incoming) traffic. This page covers the additional consideration needed for egress (outgoing) traffic.

Cloudflare Network Firewall does not track connection state (it is not "stateful"). A stateful firewall automatically allows return traffic for active connections — for example, if you send a request outbound, the response is allowed back in. Because Network Firewall is not stateful, each packet — whether ingress or egress — is evaluated independently against your rules. This means ingress block rules can inadvertently block egress traffic.

For Magic Transit egress traffic, consider the following:

* Network Firewall rules apply to both Magic Transit ingress and egress traffic passing through Cloudflare.
* If you have a "default drop" catchall rule (a final rule that blocks all traffic not matched by earlier rules) for ingress traffic, you must add an earlier rule to permit traffic sourced from your Magic Transit prefix with the destination as **any** to allow outbound egress traffic.  
For example, place the following allow rule before any default-drop catchall rule:  
**Match**: `ip.src in {<YOUR_MAGIC_TRANSIT_PREFIX>}`  
**Action**: Allow

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/packet-filtering/","name":"Packet filtering"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/traffic-policies/packet-filtering/best-practices/","name":"Best practices"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/traffic-policies/packet-filtering/best-practices/magic-transit-egress/","name":"Magic Transit egress"}}]}
```
