---
description: Turn on Rocket Loader for your zone.
title: Enable
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/speed/llms.txt
> Use this file to discover all available pages before exploring further.

# Enable

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/enable/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

To enable or disable Rocket Loader, use the following instructions.

To enable or disable **Rocket Loader** in the dashboard:

1. In the Cloudflare dashboard, go to the **Speed** \> **Settings** page.
[Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/speed/optimization)
2. Go to **Content Optimization**.
3. For **Rocket Loader**, switch the toggle to **On**.

If you have a Content Security Policy (CSP) in place for your domain, you will need to [update your headers](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/content-security-policies/#product-requirements) to support Rocket Loader.

To enable or disable **Rocket Loader** with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `rocket_loader` as the setting name in the URI path, and the `value` parameter set to `"on"` or `"off"`.

If you have a Content Security Policy (CSP) in place for your domain, you will need to [update your headers](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/content-security-policies/#product-requirements) to support Rocket Loader.

Note

To use this feature on specific hostnames - instead of across your entire zone - use a [configuration rule](https://developers.cloudflare.com/rules/configuration-rules/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/speed/optimization/content/rocket-loader/enable/#page","headline":"Enable Rocket Loader · Cloudflare Speed docs","description":"Turn on Rocket Loader for your zone.","url":"https://developers.cloudflare.com/speed/optimization/content/rocket-loader/enable/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
