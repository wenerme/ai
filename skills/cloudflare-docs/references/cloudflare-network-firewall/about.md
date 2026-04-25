---
title: About
description: How Cloudflare Network Firewall protects your network traffic.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

# About

Review the content below to learn more about concepts related to Cloudflare Network Firewall (formerly Magic Firewall).

Important

When using Cloudflare Network Firewall alongside other Cloudflare services that proxy traffic (for example, CDN and Spectrum), be aware of the following:

* Firewall rules that block traffic based on source IP address may not work as intended because rules are evaluated after Cloudflare terminates the incoming TCP connections.
* You must allow [Cloudflare IP addresses ↗](https://www.cloudflare.com/ips/).
* When using Cloudflare Network Firewall, fragmented packets are reassembled into complete packets before they are inspected. As a result, you cannot create firewall rules for fragments.

* [ Analytics ](https://developers.cloudflare.com/cloudflare-network-firewall/about/analytics/)
* [ IDS ](https://developers.cloudflare.com/cloudflare-network-firewall/about/ids/)
* [ List types ](https://developers.cloudflare.com/cloudflare-network-firewall/about/list-types/)
* [ Protocol validation rules ](https://developers.cloudflare.com/cloudflare-network-firewall/about/protocol-validation-rules/)
* [ Ruleset logic ](https://developers.cloudflare.com/cloudflare-network-firewall/about/ruleset-logic/)
* [ Traffic types ](https://developers.cloudflare.com/cloudflare-network-firewall/about/traffic-types/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-network-firewall/","name":"Cloudflare Network Firewall"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-network-firewall/about/","name":"About"}}]}
```
