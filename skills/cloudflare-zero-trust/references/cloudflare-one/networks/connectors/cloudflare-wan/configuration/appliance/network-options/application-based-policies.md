---
description: How Application-aware policies works in Zero Trust networking.
title: Application-aware policies
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

#  Application-aware policies

Last updated Apr 17, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/application-based-policies/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Standard traffic policies match on network-layer attributes like IP addresses and port ranges. Application-aware policies go further — they identify traffic by the application generating it, so you can make routing and security decisions based on what the traffic is, not just where it is going.

Cloudflare One Appliance (formerly Magic WAN Connector) classifies traffic using the same application categories used across Cloudflare's [Secure Web Gateway](https://developers.cloudflare.com/cloudflare-one/policies/gateway/). This means routing decisions on the Appliance and security policies in Gateway use the same application definitions.

For the full list of recognized applications and categories, refer to [Applications and app types](https://developers.cloudflare.com/cloudflare-one/policies/gateway/application-app-types/).

With application-aware policies, you can:

* **Break out traffic directly to the Internet** — route specific applications directly to the Internet from the Appliance, bypassing Cloudflare's security filtering.
* **Prioritize traffic** — assign higher priority to specific applications so the Appliance processes them first when the network is congested.

For details, refer to the following pages:

* [ Breakout traffic ](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/application-based-policies/breakout-traffic/)
* [ Prioritized traffic ](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/application-based-policies/prioritized-traffic/)

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/application-based-policies/#page","headline":"Application-aware policies · Cloudflare One docs","description":"How Application-aware policies works in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/application-based-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
