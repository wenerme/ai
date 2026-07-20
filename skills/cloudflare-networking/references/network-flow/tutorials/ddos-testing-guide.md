---
title: DDoS testing guide
description: Cloudflare's Network Flow can be used to test a simulated DDoS attack.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/network-flow/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# DDoS testing guide

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/network-flow/tutorials/ddos-testing-guide/#page","headline":"Network Flow DDoS testing guide · Cloudflare Network Flow docs","description":"Cloudflare's Network Flow can be used to test a simulated DDoS attack.","url":"https://developers.cloudflare.com/network-flow/tutorials/ddos-testing-guide/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/network-flow/","name":"Network Flow"}},{"@type":"ListItem","position":3,"item":{"@id":"/network-flow/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/network-flow/tutorials/ddos-testing-guide/","name":"DDoS testing guide"}}]}
```
