---
description: Billing, troubleshooting, and limitations for Static assets on Workers
title: Billing and Limitations
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Billing and Limitations

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Billing

Requests to a project with static assets can either return static assets or invoke the Worker script, depending on if the request [matches a static asset or not](https://developers.cloudflare.com/workers/static-assets/routing/).

* Requests to static assets are free and unlimited. Requests to the Worker script (for example, in the case of SSR content) are billed according to Workers pricing. Refer to [pricing](https://developers.cloudflare.com/workers/platform/pricing/#example-2) for an example.
* There is no additional cost for storing Assets.
* **Important note for free tier users**: When using [run\_worker\_first](https://developers.cloudflare.com/workers/static-assets/binding/#run%5Fworker%5Ffirst), requests matching the specified patterns will always invoke your Worker script. If you exceed your free tier request limits, these requests will receive a 429 (Too Many Requests) response instead of falling back to static asset serving. Negative patterns (patterns beginning with `!/`) will continue to serve assets correctly, as requests are directed to assets, without invoking your Worker script.

## Limitations

See the [Platform Limits](https://developers.cloudflare.com/workers/platform/limits/#static-assets)

## Troubleshooting

* `assets.bucket is a required field` — if you see this error, you need to update Wrangler to at least `3.78.10` or later. `bucket` is not a required field.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/#page","headline":"Billing and Limitations · Cloudflare Workers docs","description":"Billing, troubleshooting, and limitations for Static assets on Workers","url":"https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
