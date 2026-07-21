---
description: Rotate your Turnstile secret key for security or key compromise.
title: Rotate secret key
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt
> Use this file to discover all available pages before exploring further.

#  Rotate secret key

Last updated Apr 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/turnstile/troubleshooting/rotate-secret-key/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

You can rotate the secret key using the following steps:

1. In the Cloudflare dashboard, go to the **Turnstile** page.
[ Go to **Turnstile** ↗ ](https://dash.cloudflare.com/?to=/:account/turnstile)
2. [Create a new Turnstile widget](https://developers.cloudflare.com/turnstile/get-started/).
3. In the widget overview, select **Settings** \> **Rotate Secret Key**.
4. Configure your website to use the new secret key.

The rotation occurs over the course of two hours. During this time, both the old secret key and the new secret key are valid. This allows you to swap the secret key while avoiding any issues with your website.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/troubleshooting/rotate-secret-key/#page","headline":"Rotate secret key · Cloudflare Turnstile docs","description":"Rotate your Turnstile secret key for security or key compromise.","url":"https://developers.cloudflare.com/turnstile/troubleshooting/rotate-secret-key/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
