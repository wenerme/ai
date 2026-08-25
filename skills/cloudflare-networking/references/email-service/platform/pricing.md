---
description: Email Service pricing for outbound sending and inbound routing across Workers Free and Paid plans.
title: Pricing
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt
> Use this file to discover all available pages before exploring further.

# Pricing

Last updated Jun 9, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/email-service/platform/pricing/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare Email Service pricing is based on your Cloudflare plan and email usage.

## Plan pricing

Email Routing is available on both the Workers Free and Workers Paid plans. Sending to arbitrary recipients requires the Workers Paid plan. Sending to [verified destination addresses](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/#destination-addresses) in your account is free on all plans, including when only Email Routing is configured.

|                                     | Workers Free  | Workers Paid                                          |
| ----------------------------------- | ------------- | ----------------------------------------------------- |
| **Outbound emails (Email Sending)** | Not available | 3,000 included per month, then $0.35 per 1,000 emails |
| **Inbound emails (Email Routing)**  | Unlimited     | Unlimited                                             |

The 3,000 included emails apply per account, per month, aligned with your Cloudflare subscription billing cycle. Emails that hard-bounce or are otherwise accepted by Email Service count toward the quota. Emails rejected at the API boundary, including sends blocked by the [suppression list](https://developers.cloudflare.com/email-service/concepts/suppressions/), do not count toward the quota.

Sends to verified destination addresses are free and do not count toward the included quota.

Email Routing Workers is billed according to [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/email-service/platform/pricing/#page","headline":"Pricing · Cloudflare Email Service docs","description":"Email Service pricing for outbound sending and inbound routing across Workers Free and Paid plans.","url":"https://developers.cloudflare.com/email-service/platform/pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
