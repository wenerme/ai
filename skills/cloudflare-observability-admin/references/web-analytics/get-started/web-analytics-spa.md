---
description: Configure Web Analytics for single-page applications.
title: Web Analytics for SPAs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/web-analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Web Analytics for SPAs

Last updated Aug 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/web-analytics/get-started/web-analytics-spa/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare Web Analytics automatically tracks user interactions on Single Page Applications (SPAs) via one of the following three methods, depending on which is supported:

1. Using the [Soft Navigations API ↗](https://developer.chrome.com/docs/web-platform/soft-navigations)
2. Listening on `navigate` events via the [Navigation API ↗](https://developer.mozilla.org/en-US/docs/Web/API/Navigation%5FAPI)
3. By patching the [History API ↗](https://developer.mozilla.org/en-US/docs/Web/API/History%5FAPI)'s `pushState` function and listening to the `onpopstate` event

## Disable SPA measurement

If you want to disable the automatic tracking for SPAs, you can do so by adding the `spa` option with a value of `false` in the data attribute of the script tag, as shown below:

```html
<script
  type="module"
  src="https://static.cloudflareinsights.com/beacon.min.js"
  data-cf-beacon='{"token": "...", "spa": false}'
></script>
```

Note: this requires using [the manual embedding approach](https://developers.cloudflare.com/web-analytics/get-started/#sites-not-proxied-through-cloudflare).

### Google Tag Manager (GTM)

If you are using Google Tag Manager (GTM), you can disable SPA tracking by passing the `spa=false` option via the query string in the script URL:

```html
<script
  type="module"
  src="https://static.cloudflareinsights.com/beacon.min.js?token=...&spa=false"
></script>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/web-analytics/get-started/web-analytics-spa/#page","headline":"Web Analytics for Single Page Applications (SPAs) · Cloudflare Web Analytics docs","description":"Configure Web Analytics for single-page applications.","url":"https://developers.cloudflare.com/web-analytics/get-started/web-analytics-spa/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SPA"]}
```
