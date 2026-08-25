---
description: Cloudflare Realtime SFU and TURN pricing, free tier details, and billing information.
title: Pricing
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Pricing

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/sfu/pricing/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare Realtime billing is based on data sent from Cloudflare edge to your application.

Cloudflare Realtime SFU and TURN services cost $0.05 per GB of data egress.

There is a free tier of 1,000 GB before any charges start. This free tier includes usage from both SFU and TURN services, not two independent free tiers. Cloudflare Realtime billing appears as a single line item on your Cloudflare bill, covering both SFU and TURN.

Traffic between Cloudflare Realtime TURN and Cloudflare Realtime SFU or Cloudflare Stream (WHIP/WHEP) does not get double charged, so if you are using both SFU and TURN at the same time, you will get charged for only one.

### TURN

Please see the [TURN FAQ page](https://developers.cloudflare.com/realtime/turn/faq), where there is additional information on specifically which traffic path from RFC8656 is measured and counts towards billing.

### SFU

Only traffic originating from Cloudflare towards clients incurs charges. Traffic pushed to Cloudflare incurs no charge even if there is no client pulling same traffic from Cloudflare.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/sfu/pricing/#page","headline":"Pricing · Cloudflare Realtime docs","description":"Cloudflare Realtime SFU and TURN pricing, free tier details, and billing information.","url":"https://developers.cloudflare.com/realtime/sfu/pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
