---
description: Create your first seller payment rule.
title: Get started
image: https://developers.cloudflare.com/monetization-gateway/get-started/og.png?v=3057726880ed7e95
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/monetization-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Get started

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/monetization-gateway/get-started/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Create a rule that charges matching requests for a resource.

## Review prerequisites

- Your account and zone meet the [eligibility requirements](https://developers.cloudflare.com/monetization-gateway/eligibility/).
- You have a receiving wallet.

## Configure a payment rule

1. In Monetization Gateway, select the domain you would like to monetize.
2. Select the receiving wallet for payments.
3. Enter the URL for the request to be monetized.
4. Select an audience:
   - Select *Everyone* to charge all matching traffic.
   - Select *Verified Bots* to charge bots identified by [BotBase](https://developers.cloudflare.com/bots/botbase/).
5. Select a pricing scheme:
   - Select *Fixed* to charge the same amount per request.
   - Select *Variable* to authorize a maximum amount. You must [report the actual amount](https://developers.cloudflare.com/monetization-gateway/configuration/payment-validation/#report-variable-settlement) to finalize the transaction.
6. Enter the price to be charged. The minimum amount is $0.001.
7. For advanced settings, refer to [Monetization rules](https://developers.cloudflare.com/monetization-gateway/configuration/rules/).

## Complete configuration

To complete configuration, Cloudflare strongly recommends that you [verify payment](https://developers.cloudflare.com/monetization-gateway/configuration/payment-validation/#validate-the-context) at your origin.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/monetization-gateway/get-started/#page","headline":"Get started","description":"Create your first seller payment rule.","url":"https://developers.cloudflare.com/monetization-gateway/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/monetization-gateway/get-started/og.png?v=3057726880ed7e95","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
