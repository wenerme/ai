---
agent:
  instructions: "This site offers a search API that returns relevant content across the entire site. Use the search endpoint to find information instead of crawling individual pages."
  search: "https://developers.cloudflare.com/.well-known/search?q={query}"
description: Email Service pricing for outbound sending and inbound routing across Workers Free and Paid plans.
title: Pricing
image: https://developers.cloudflare.com/email-service/platform/pricing/og.png?v=36248b01a1557d58
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt
> Use this file to discover all available pages before exploring further.

# Pricing

Cloudflare Email Service pricing is based on your Cloudflare plan and email usage.

## Plan pricing

Email Sending and Email Routing are available on both the Workers Free and Workers Paid plans. On the Workers Free plan, Email Sending sends only to [verified destination addresses](https://developers.cloudflare.com/email-service/configuration/destination-addresses/) in your account. Sending to any other recipient requires the Workers Paid plan.

|  | Outbound emails (Email Sending) | Inbound emails (Email Routing) |
| --- | --- | --- |
| **Workers Free** | Free, to verified destination addresses only | Unlimited |
| **Workers Paid** | 3,000 included per month, then $0.35 per 1,000 emails | Unlimited |

The 3,000 included emails apply per account, per month, aligned with your Cloudflare subscription billing cycle. Emails that hard-bounce or are otherwise accepted by Email Service count toward the quota. Emails rejected at the API boundary, including sends blocked by the [suppression list](https://developers.cloudflare.com/email-service/concepts/suppressions/), do not count toward the quota.

Sends to verified destination addresses are free on every plan, including when only Email Routing is configured. They do not count toward the included quota.

Email Routing Workers is billed according to [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/email-service/platform/pricing/#page","headline":"Pricing","description":"Email Service pricing for outbound sending and inbound routing across Workers Free and Paid plans.","url":"https://developers.cloudflare.com/email-service/platform/pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/email-service/platform/pricing/og.png?v=36248b01a1557d58","dateModified":"2026-11-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
