---
title: DDoS testing guide
description: Cloudflare's Network Flow can be used to test a simulated DDoS attack.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/network-flow/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DDoS testing guide

**Last reviewed:**  almost 2 years ago 

To test Network Flow (formerly Magic Network Monitoring) in a repeatable manner, simulate a DDoS attack. At a high level, you need to:

1. Select and install a trusted, open source DDoS simulation tool.
2. Conduct a small DDoS test attack in a safe test environment.

## Permission requirements

You need to contact Cloudflare to obtain permission before conducting a DDoS test if:

* Your property is hosted in Cloudflare.
* Internet traffic goes through Cloudflare before reaching your property.

If you are an Enterprise customer with Network Flow enabled, contact your Cloudflare Account Manager before starting DDoS testing, even if the property is not hosted in Cloudflare.

Refer to [Simulating test DDoS attacks](https://developers.cloudflare.com/ddos-protection/reference/simulate-ddos-attack/) for more information.

If you need help conducting a simulated DDoS attack, [fill out this form ↗](https://forms.gle/6tBZNu7shoaCmP9h6).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/network-flow/","name":"Network Flow"}},{"@type":"ListItem","position":3,"item":{"@id":"/network-flow/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/network-flow/tutorials/ddos-testing-guide/","name":"DDoS testing guide"}}]}
```
