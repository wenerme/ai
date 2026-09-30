---
description: Set prices and control which requests require payment.
title: Monetization rules
image: https://developers.cloudflare.com/monetization-gateway/configuration/rules/og.png?v=ce80fde58746724b
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/monetization-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Monetization rules

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/monetization-gateway/configuration/rules/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Monetization rules determine which matching requests require payment. Each rule defines a domain, URL, price, and audience.

## Choose a pricing scheme

Choose a scheme based on when you determine the charge:

| Scheme | x402 scheme | Behavior |
| --- | --- | --- |
| Fixed | `exact` | Charges the same price for each request with fixed inputs. The gateway settles the signed amount. |
| Variable | `upto` | Authorizes a maximum price. Your origin discloses and settles the actual amount. |

## Enter a price

Prices and settlements use atomic units. One atomic unit equals $0.000001.

Use these conversions when setting prices:

| Amount | Atomic units |
| --- | --- |
| $0.001 | 1,000 |
| $0.01 | 10,000 |

The minimum settlement amount is $0.001, or 1,000 atomic units. The maximum price is $100, or 100,000,000 atomic units.

## Select an audience

Choose which visitors the rule charges:

| Audience | Behavior |
| --- | --- |
| Everyone | Charges all traffic matching the URL and advanced conditions. |
| Verified Bots | Charges matching bots identified through [BotBase](https://developers.cloudflare.com/bots/botbase/). |

## Choose HTTP methods

By default, a rule charges `GET` requests. You can select multiple HTTP methods for one rule.

## Add conditions

Advanced conditions refine which requests the rule charges. You can match these request properties:

| Property | Match input |
| --- | --- |
| Header | HTTP request header |
| URI Query String | URL query string |
| User Agent | User agent value |
| X-Forwarded-For | `X-Forwarded-For` header value |
| IP Source Address | Source IP address |
| Continent | Request continent |
| Country | Request country |
| European Union | European Union location status |
| Cookie Value | Request cookie value |
| Body | Request body (Enterprise only) |
| Body size | Request body size (Enterprise only) |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/monetization-gateway/configuration/rules/#page","headline":"Monetization rules","description":"Set prices and control which requests require payment.","url":"https://developers.cloudflare.com/monetization-gateway/configuration/rules/","inLanguage":"en","image":"https://developers.cloudflare.com/monetization-gateway/configuration/rules/og.png?v=ce80fde58746724b","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
