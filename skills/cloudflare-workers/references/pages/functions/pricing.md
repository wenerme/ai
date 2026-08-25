---
description: Pages Functions requests are billed as Cloudflare Workers requests across free and paid plans.
title: Pricing
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt
> Use this file to discover all available pages before exploring further.

# Pricing

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/pages/functions/pricing/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Requests to your Functions are billed as Cloudflare Workers requests. Workers plans and pricing can be found [in the Workers documentation](https://developers.cloudflare.com/workers/platform/pricing/).

## Paid Plans

Requests to your Pages functions count towards your quota for Workers Paid plans, including requests from your Function to KV or Durable Object bindings.

Pages supports the [Standard usage model](https://developers.cloudflare.com/workers/platform/pricing/#example-pricing-standard-usage-model).

Note

Workers Enterprise accounts are billed based on the usage model specified in their contract. To switch to the Standard usage model, reach out to your Customer Success Manager (CSM). Some Workers Enterprise customers maintain the ability to [change usage models](https://developers.cloudflare.com/workers/platform/pricing/#how-to-switch-usage-models).

### Static asset requests

On both free and paid plans, requests to static assets are free and unlimited. A request is considered static when it does not invoke Functions. Refer to [Functions invocation routes](https://developers.cloudflare.com/pages/functions/routing/#functions-invocation-routes) to learn more about when Functions are invoked.

## Free Plan

Requests to your Pages Functions count towards your quota for the Workers Free plan. For example, you could use 50,000 Functions requests and 50,000 Workers requests to use your full 100,000 daily request usage. The free plan daily request limit resets at midnight UTC.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/functions/pricing/#page","headline":"Pricing · Cloudflare Pages docs","description":"Pages Functions requests are billed as Cloudflare Workers requests across free and paid plans.","url":"https://developers.cloudflare.com/pages/functions/pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
