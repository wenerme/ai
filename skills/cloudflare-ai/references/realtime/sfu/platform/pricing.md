---
description: Understand Realtime SFU, TURN, and WebSocket adapter egress pricing and the shared monthly free tier.
title: Pricing
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Pricing

Last updated Sep 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/sfu/platform/pricing/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Realtime billing is based on data sent from Cloudflare to your application. The SFU and TURN services cost $0.05 per GB of egress.

The first 1,000 GB each month is free. SFU and TURN share this allowance; they do not have independent free tiers. Realtime usage appears as a single line item on your Cloudflare bill.

## SFU

Traffic from Cloudflare to clients incurs egress charges. Traffic published into Cloudflare is free, including when no client subscribes to that publication.

## WebSocket adapter

WebSocket adapter usage is tracked in Realtime billing. Traffic from Cloudflare to your WebSocket endpoint follows the Realtime egress rate and shares the Realtime free tier. Audio ingested from a WebSocket endpoint into the SFU is not charged as ingress.

The adapter close response's `bytesProcessed` field is an operational statistic. It is not the authoritative billed-usage total.

Workers, Durable Objects, Containers, and AI services used by an application have their own pricing.

## TURN

Traffic between Realtime TURN and Realtime SFU or Cloudflare Stream WHIP/WHEP is not charged twice. Refer to the [TURN FAQ](https://developers.cloudflare.com/realtime/turn/faq/) for the traffic paths measured for TURN billing.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/sfu/platform/pricing/#page","headline":"Pricing","description":"Understand Realtime SFU, TURN, and WebSocket adapter egress pricing and the shared monthly free tier.","url":"https://developers.cloudflare.com/realtime/sfu/platform/pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
