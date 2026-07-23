---
description: Learn about benefits of using magic transit in this guide.
title: Benefits of using Magic Transit
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Benefits of using Magic Transit

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/data-center-protection/concepts/benefits-magic-transit/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Magic Transit leverages Cloudflare's global anycast network. As of writing this guide, Cloudflare's global network spans over 330 cities, and has over 405 Tbps network capacity. This bandwidth allows it to absorb all manners of attack that otherwise would overwhelm a typical data center or on-premise hardware Distributed Denial-of-Service (DDoS) appliances.

The number of DDoS attacks has been steadily increasing in recent years. In the first quarter of 2025, Cloudflare [mitigated 16.8 million network-layer DDoS attacks ↗](https://blog.cloudflare.com/ddos-threat-report-for-2025-q1/#ddos-attacks-in-numbers). This represents a 397% increase quarter over quarter and a 509% increase year over year.

Other advantages of choosing Magic Transit:

* **Scalability**: As Cloudflare's global network expands, so does Magic Transit ability to absorb ever bigger DDoS attacks.
* **Ease of management**: Magic Transit offers centralized, cloud-based management tools that simplify configuration and monitoring of your network security.
* **Improvement of network performance**: Magic Transit steers traffic along tunnel routes based on priorities you define and uses equal-cost multi-path routing to provide load-balancing across tunnels with the same prefix and priority.
* **Integration with zero-trust services**: Magic Transit integrates with other Cloudflare products, including Cloudflare One's SASE offerings, Cloudflare Network Firewall, and more.
* **Integration with CNI**: Directly connect your infrastructure to Cloudflare with CNI and bypass the Internet. Beyond a more reliable and secure experience, using CNI is an alternative to anycast GRE tunnels for getting traffic delivered to your infrastructure with a 1500-byte maximum transmission unit (MTU) handoff.
* **Real-time traffic visibility and alerting**: Monitor and analyze traffic patterns, threat activity, and mitigation actions in real time through Cloudflare's analytics and logging tools. Set up customized alerts to notify you of potential threats, enabling faster incident response and better-informed network decisions.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/data-center-protection/concepts/benefits-magic-transit/#page","headline":"Benefits of using Magic Transit · Cloudflare Learning Paths","description":"Learn about benefits of using magic transit in this guide.","url":"https://developers.cloudflare.com/learning-paths/data-center-protection/concepts/benefits-magic-transit/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
