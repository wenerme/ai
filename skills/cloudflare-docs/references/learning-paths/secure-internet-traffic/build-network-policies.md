---
title: Build network security policies
description: After creating policies for security based on DNS resolution, we can layer in additional security controls with the Gateway network firewall, which operates at Layer 4 of the OSI model. The Gateway network firewall allows you to build specific policies to block users or services' ability to connect to endpoints at specific IPs or on specific ports. You can also use Protocol Detection to block proxying specific protocols.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/learning-paths/secure-internet-traffic/build-network-policies/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Build network security policies

After creating policies for security based on DNS resolution, we can layer in additional security controls with the Gateway network firewall, which operates at Layer 4 of the OSI model. The Gateway network firewall allows you to build specific policies to block users or services' ability to connect to endpoints at specific IPs or on specific ports. You can also use [Protocol Detection ↗](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/) to block proxying specific protocols.

## Objectives

By the end of this module, you will be able to:

* Creat your first Gateway network policy.
* Add recommended network security policies.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/build-network-policies/","name":"Build network security policies"}}]}
```
