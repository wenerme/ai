---
description: Charge for protected resources through the x402 protocol.
title: Monetization Gateway
image: https://developers.cloudflare.com/monetization-gateway/og.png?v=a348e152d73ed12b
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/monetization-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Monetization Gateway

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/monetization-gateway/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Closed beta

Monetization Gateway is in closed beta. Request access in the [Cloudflare Dashboard ↗︎](https://dash.cloudflare.com/?to=/:account/monetize/monetization-gateway).

Monetization Gateway applies [x402](https://developers.cloudflare.com/agents/tools/payments/x402/) payment requirements to matching traffic. You define the shape of therequest to match, how much to charge for it, and the receiving wallet.

Use Monetization Gateway to protect APIs, Model Context Protocol (MCP) tools, sites, and datasets. Buyers and sellers must be based in the United States.

## Protect resources

You can match requests by URL, headers, query parameters, or caller attributes. For example, payment rules can charge every caller or only verified bots.

Payments happen within the HTTP request flow. Buyers simply sign a cryptographic payment authorization, no need for a checkout redirect or separate payment API call.

## Understand the payment flow

1. A buyer requests a protected resource.
2. Monetization Gateway returns payment requirements.
3. The buyer signs an authorization and retries the request.
4. Monetization Gateway verifies the authorized payment is valid.
5. Your origin server receives the verified payment, produces a response.
6. The gateway settles the payment through the Coinbase x402 Facilitator.
7. The buyer receives the requested resource.

For fixed pricing, the gateway settles the authorized signed amount. For variable pricing, your origin reports the actual amount.

For request and response examples, refer to [x402 protocol](https://developers.cloudflare.com/monetization-gateway/x402/). To implement a buyer, refer to [x402 payments](https://developers.cloudflare.com/agents/tools/payments/x402/).

## Continue setup

- [Eligibility](https://developers.cloudflare.com/monetization-gateway/eligibility/)
- [Get started](https://developers.cloudflare.com/monetization-gateway/get-started/)
- [x402 protocol](https://developers.cloudflare.com/monetization-gateway/x402/)
- [Configuration](https://developers.cloudflare.com/monetization-gateway/configuration/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/monetization-gateway/#page","headline":"Monetization Gateway","description":"Charge for protected resources through the x402 protocol.","url":"https://developers.cloudflare.com/monetization-gateway/","inLanguage":"en","image":"https://developers.cloudflare.com/monetization-gateway/og.png?v=a348e152d73ed12b","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
