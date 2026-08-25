---
description: Bypass the cache temporarily with Development Mode.
title: Development Mode
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt
> Use this file to discover all available pages before exploring further.

# Development Mode

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cache/reference/development-mode/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Development Mode temporarily suspends Cloudflare's edge caching and [Polish](https://developers.cloudflare.com/images/polish/) features for three hours unless disabled beforehand. Development Mode allows customers to immediately observe changes to their [cacheable content](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/#default-cached-file-extensions) like images, CSS, or JavaScript.

Note

To bypass cache for longer than three hours, use bypass cache in [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#bypass-cache).

## Enable Development Mode

Development Mode temporarily bypasses Cloudflare's cache and does not purge cached files. To instantly purge your Cloudflare cache, refer to [purge cache](https://developers.cloudflare.com/cache/how-to/purge-cache/).

1. In the Cloudflare dashboard, go to the **Configuration** page.
[Go to **Configuration** ↗](https://dash.cloudflare.com/?to=/:account/:zone/caching/configuration)
2. Toggle **Development Mode** to **On**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/reference/development-mode/#page","headline":"Development Mode · Cloudflare Cache (CDN) docs","description":"Bypass the cache temporarily with Development Mode.","url":"https://developers.cloudflare.com/cache/reference/development-mode/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
