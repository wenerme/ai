---
description: Serve Google Fonts from your domain to improve privacy and performance.
title: Cloudflare Fonts
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/speed/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare Fonts

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/speed/optimization/content/fonts/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare Fonts is a feature designed for websites that use [Google Fonts ↗](https://fonts.google.com/). It rewrites Google Fonts to be delivered from a website’s own origin, eliminating the need to rely on third-party font providers. Cloudflare Fonts is tailored to improve website performance and user privacy without the need for any code changes or self-hosting of fonts.

## How Cloudflare Fonts works

Cloudflare Fonts works by rewriting your webpage’s HTML. It removes Google Fonts links and replaces them with inline CSS. This CSS includes links to fonts from your own Cloudflare zone rather than from Google servers. This ensures that font files are served from your domain through Cloudflare's infrastructure, optimizing performance and enhancing user privacy.

### Browser support

Cloudflare Fonts is compatible with browsers that support Unicode-range subsetting and WOFF or WOFF2 formats, including:

```plaintext
Chrome 36+
Edge 16+
Safari 10+
Firefox 44+
Opera 22+
IE 9+
Chrome for Android 115+
Safari on iOS 10+
Samsung Internet 5+
```

## Get started

To enable Cloudflare Fonts for your entire domain:

1. In the Cloudflare dashboard, go to the **Speed** \> **Settings** page.
[Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/speed/optimization)
2. Go to **Content Optimization**.
3. For **Cloudflare Fonts**, switch the toggle to **On**.

Note

To use this feature on specific hostnames - instead of across your entire zone - use a [configuration rule](https://developers.cloudflare.com/rules/configuration-rules/).

## Limitations

While Cloudflare Fonts offers powerful font optimization capabilities, it is important to be aware of its limitations:

* **Font transformation**: Currently, Cloudflare Fonts exclusively supports Google Fonts transformation.
* **APO compatibility**: Cloudflare Fonts does not operate when [Automatic Platform Optimization](https://developers.cloudflare.com/automatic-platform-optimization/) (APO) is enabled. Cloudflare APO automatically optimizes Google Fonts in a similar way.
* **CSS import**: Cloudflare Fonts is compatible only with the `<link>` setup for Google Fonts and does not support the CSS `@import` method.
* **CSP headers**: Cloudflare Fonts does not modify [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy) headers. Certain CSP configurations may make Cloudflare Fonts stop working, such as restrictions on inline styles through [style-src ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src), or restriction of fonts originating from the site's own origin via [font-src ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/font-src).
* **Fallback mechanism**: In cases where Cloudflare Fonts does not support a specific page, it will gracefully fallback to using Google Fonts.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/speed/optimization/content/fonts/#page","headline":"Cloudflare Fonts · Cloudflare Speed docs","description":"Serve Google Fonts from your domain to improve privacy and performance.","url":"https://developers.cloudflare.com/speed/optimization/content/fonts/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Google"]}
```
