---
description: How to configure and use a full-stack application with Workers.
title: Full-stack application
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

#  Full-stack application

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers/static-assets/routing/full-stack-application/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Full-stack applications are web applications which are span both the client and server. The build process of these applications will produce a HTML files, accompanying client-side resources (e.g. JavaScript bundles, CSS stylesheets, images, fonts, etc.) and a Worker script. Data is typically fetched the Worker script at request-time and the initial page response is usually server-side rendered (SSR). From there, the client is then hydrated and a SPA-like experience ensues.

The following full-stack frameworks are natively supported by Workers:

* [ Astro ](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/)
* [ React Router (formerly Remix) ](https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/)
* [ Next.js ](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)
* [ RedwoodSDK ](https://developers.cloudflare.com/workers/framework-guides/web-apps/redwoodsdk/)
* [ TanStack Start ](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/)
* [ Vike ](https://developers.cloudflare.com/workers/framework-guides/web-apps/vike/)
* [ Analog ](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/analog/)
* [ Angular ](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/angular/)
* [ Nuxt ](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/nuxt/)
* [ Qwik ](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/qwik/)
* [ Solid ](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/solid/)
* [ Waku ](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/waku/)

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/static-assets/routing/full-stack-application/#page","headline":"Full-stack application · Cloudflare Workers docs","description":"How to configure and use a full-stack application with Workers.","url":"https://developers.cloudflare.com/workers/static-assets/routing/full-stack-application/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
