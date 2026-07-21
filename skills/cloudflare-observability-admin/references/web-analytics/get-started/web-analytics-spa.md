---
description: Configure Web Analytics for single-page applications.
title: Web Analytics for SPAs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/web-analytics/llms.txt
> Use this file to discover all available pages before exploring further.

#  Web Analytics for SPAs

Last updated Apr 17, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/web-analytics/get-started/web-analytics-spa/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Cloudflare Web Analytics can automatically track user interactions on Single Page Applications (SPAs) by overriding the History API's `pushState` function and listening to the `onpopstate` event. Note that hash-based routers are not supported.

## Disable SPA measurement

If you want to disable the automatic tracking for SPAs, you can do so by adding the `spa` option with a value of `false` in the data attribute of the script tag, as shown below:

```html
<script
  defer
  src="https://static.cloudflareinsights.com/beacon.min.js"
  data-cf-beacon=' {"token": "42e216b9090ru59384ygu891dce9eecde", "spa": false} '
></script>
```

### Google Tag Manager (GTM)

If you are using Google Tag Manager (GTM), you can disable SPA tracking by passing the spa option via the query string in the script URL:

```html
<script
  defer
  src="https://static.cloudflareinsights.com/beacon.min.js?token=42e216b9090ru59384ygu891dce9eecde&spa=false"
></script>
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/web-analytics/get-started/web-analytics-spa/#page","headline":"Web Analytics for Single Page Applications (SPAs) · Cloudflare Web Analytics docs","description":"Configure Web Analytics for single-page applications.","url":"https://developers.cloudflare.com/web-analytics/get-started/web-analytics-spa/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SPA"]}
```
