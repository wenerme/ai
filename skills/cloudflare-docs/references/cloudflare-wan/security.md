---
title: Security filters
description: Apply security filters to WAN traffic.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-wan/security.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Security filters

Once your traffic flows through Cloudflare's network, you can apply security policies to it without deploying additional hardware. Cloudflare WAN (formerly Magic WAN) integrates with two primary security services, each operating at different layers of the network stack.

**[Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/)** filters traffic at layers 3 and 4 of the [OSI model ↗](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/) — the network and transport layers. You can allow or block traffic based on packet characteristics such as source and destination IP addresses, ports, protocols, and packet length. All Cloudflare WAN customers have [automatic access to Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/plans/).

**[Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-wan/security/%7Bprops.gatewayURL%7D)** inspects traffic at higher layers, including DNS queries, network sessions, and HTTP requests. Use Gateway to set up policies that control Internet-bound traffic and access to your private network infrastructure. Refer to [Connect to Cloudflare Gateway with Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/zero-trust/cloudflare-gateway/) to learn how to filter Cloudflare WAN traffic with Gateway policies.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-wan/security/","name":"Security filters"}}]}
```
