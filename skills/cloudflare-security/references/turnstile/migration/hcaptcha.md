---
description: Migrate from hCaptcha to Cloudflare Turnstile.
title: Migrate from hCaptcha
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt
> Use this file to discover all available pages before exploring further.

# Migrate from hCaptcha

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/turnstile/migration/hcaptcha/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If you are using hCaptcha today, you can switch seamlessly to Cloudflare Turnstile by following the step-by-step guide below to assist with the upgrade process.

To complete the migration, you must obtain the [sitekey and secret key](https://developers.cloudflare.com/turnstile/get-started/widget-management/).

## Client-side integration

1. Update the client-side integration by inserting the Turnstile script snippet in your HTML's `<head>` element:
```html
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
```
2. Locate the `hcaptcha.render()` calls and replace the sitekey with your Turnstile sitekey and the API.
```js
  // before
  hcaptcha.render(element, {
      sitekey: "00000000-0000-0000-0000-000000000000"
  })
  // after
  turnstile.render(element, {
      sitekey: "1x00000000000000000000AA"
  })
```

Note

Turnstile supports:

* the `render()` call
* hCaptcha invisible mode with the `execute()` call

## Server-side integration

1. Update the server-side integration by replacing the Siteverify URL.
Replace: `https://hcaptcha.com/siteverify` with the following:
```txt
https://challenges.cloudflare.com/turnstile/v0/siteverify
```
2. Replace the `h-captcha-response` input name with the following:
```txt
cf-turnstile-response
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/migration/hcaptcha/#page","headline":"Migrate from hCaptcha · Cloudflare Turnstile docs","description":"Migrate from hCaptcha to Cloudflare Turnstile.","url":"https://developers.cloudflare.com/turnstile/migration/hcaptcha/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Migration"]}
```
