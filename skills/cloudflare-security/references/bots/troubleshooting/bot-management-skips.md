---
description: Understand why Bot Management does not score certain requests.
title: Bot Management skips
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt
> Use this file to discover all available pages before exploring further.

# Bot Management skips

Last updated Apr 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/bots/troubleshooting/bot-management-skips/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

There are instances in which Bot Management does not run and certain fields, such as the [JA3/JA4 field](https://developers.cloudflare.com/bots/additional-configurations/ja3-ja4-fingerprint/), are not populated because it has been determined that running Bot Management would not be necessary.

Refer to [bot scores](https://developers.cloudflare.com/bots/concepts/bot-score/#not-computed) for more information about why a request is not scored.

## Common reasons for Bot Management to not score a request

### Requests to internal endpoints

Requests such as `/cdn-cgi/` are handled individually and will never receive a Bot Management score. Email Obfuscation, Web Analytics, Trace Requests, Challenge Pages, and JavaScript Detections do not receive bot scores. Refer to the table below for some examples of internal endpoints.

| Route                                                           |
| --------------------------------------------------------------- |
| /cdn-cgi/rum                                                    |
| /cdn-cgi/script\_monitor/report                                 |
| /cdn-cgi/trace                                                  |
| /cdn-cgi/challenge-platform/…                                   |
| /cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js |

### Purge requests

All HTTP purge requests will not receive a bot score.

### Early hints cache requests

Early hints cache requests will not receive a bot score.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/troubleshooting/bot-management-skips/#page","headline":"Bot Management skips · Cloudflare bot solutions docs","description":"Understand why Bot Management does not score certain requests.","url":"https://developers.cloudflare.com/bots/troubleshooting/bot-management-skips/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
