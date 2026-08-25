---
description: Rotate your Turnstile secret key for security or key compromise.
title: Rotate secret key
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt
> Use this file to discover all available pages before exploring further.

# Rotate secret key

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/turnstile/troubleshooting/rotate-secret-key/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can rotate the secret key using the following steps:

1. In the Cloudflare dashboard, go to the **Turnstile** page.
[Go to **Turnstile** ↗](https://dash.cloudflare.com/?to=/:account/turnstile)
2. [Create a new Turnstile widget](https://developers.cloudflare.com/turnstile/get-started/).
3. In the widget overview, select **Settings** \> **Rotate Secret Key**.
4. Configure your website to use the new secret key.

The rotation occurs over the course of two hours. During this time, both the old secret key and the new secret key are valid. This allows you to swap the secret key while avoiding any issues with your website.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/troubleshooting/rotate-secret-key/#page","headline":"Rotate secret key · Cloudflare Turnstile docs","description":"Rotate your Turnstile secret key for security or key compromise.","url":"https://developers.cloudflare.com/turnstile/troubleshooting/rotate-secret-key/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
