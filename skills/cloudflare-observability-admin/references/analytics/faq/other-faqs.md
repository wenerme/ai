---
description: Additional frequently asked questions about analytics.
title: Other FAQs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

#  Other FAQs

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/analytics/faq/other-faqs/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Why do I see a large amount of traffic from CLOUDFLARENET ASN 13335 in Analytics? Does this indicate a DDoS attack?

There is a number of different types of traffic which may originate from **CLOUDFLARENET ASN 13335**; just because there is a lot of traffic from this AS, it likely does not indicate a DDoS attack.

Some sources of traffic from ASN13335 include:

* [Workers subrequests](https://developers.cloudflare.com/workers/runtime-apis/fetch/)
* [WARP](https://developers.cloudflare.com/warp-client/known-issues-and-faq/#does-warp-reveal-my-ip-address-to-websites-i-visit)
* [iCloud Private Relay ↗](https://blog.cloudflare.com/icloud-private-relay/) (For reference, iCloud Private Relay’s egress IP addresses are available in this [CSV form ↗](https://mask-api.icloud.com/egress-ip-ranges.csv))
* [Cloudflare Privacy Proxy ↗](https://blog.cloudflare.com/building-privacy-into-internet-standards-and-how-to-make-your-app-more-private-today/)
* Other Cloudflare features like [Health Checks](https://developers.cloudflare.com/health-checks/)

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/faq/other-faqs/#page","headline":"Other FAQs · Cloudflare Analytics docs","description":"Additional frequently asked questions about analytics.","url":"https://developers.cloudflare.com/analytics/faq/other-faqs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
