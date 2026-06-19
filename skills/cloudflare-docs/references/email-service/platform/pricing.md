---
title: Pricing
description: Email Service pricing for outbound sending and inbound routing across Workers Free and Paid plans.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

# Pricing

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

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/email-service/platform/pricing/#page","headline":"Pricing · Cloudflare Email Service docs","description":"Email Service pricing for outbound sending and inbound routing across Workers Free and Paid plans.","url":"https://developers.cloudflare.com/email-service/platform/pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/platform/pricing/","name":"Pricing"}}]}
```
