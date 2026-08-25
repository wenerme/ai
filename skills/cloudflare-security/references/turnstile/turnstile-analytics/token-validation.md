---
description: View token validation metrics for your Turnstile widgets.
title: Token validation
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt
> Use this file to discover all available pages before exploring further.

# Token validation

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/turnstile/turnstile-analytics/token-validation/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

After a visitor successfully completes a Turnstile challenge, a token is generated and validated via the Siteverify API. Token validation data shows how many tokens your server validated successfully versus how many failed. A high rate of invalid tokens may indicate bot activity, expired tokens, or implementation issues.

For example, the token validation values in your analytics may look like this:

![Token validation example values](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1019,height=1026,format=webp/_astro/token-validation.DRmcNOiF.png "Token validation example")

Token validation example

## Metrics

* **Siteverify requests**: The total number of requests made to the Siteverify API in the given timeframe.
* **Valid tokens**: The number of Siteverify requests with `success:true` responses.
* **Invalid tokens**: The number of Siteverify requests with `success:false` responses.

### Call Siteverify

It is important to [call the Siteverify API](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/). Without calling Siteverify API to validate the tokens, your website or application is not protected. Skipping token validation means you cannot confirm the visitor's legitimacy.

* Tokens can only be redeemed once. Even valid tokens will return `success:false` if they are reused, preventing token theft and replay attacks.
* Tokens expire after five minutes. Validation must occur within this window to be effective.
* Tokens can be invalid. Bots might complete challenges, but Cloudflare can detect bot-like signals and mark the token as invalid.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/turnstile-analytics/token-validation/#page","headline":"Token validation · Cloudflare Turnstile docs","description":"View token validation metrics for your Turnstile widgets.","url":"https://developers.cloudflare.com/turnstile/turnstile-analytics/token-validation/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Analytics"]}
```
