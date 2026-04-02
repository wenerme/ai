---
title: Cloudflare Fonts
description: Cloudflare Fonts is a feature designed for websites that use Google Fonts. It rewrites Google Fonts to be delivered from a website’s own origin, eliminating the need to rely on third-party font providers. Cloudflare Fonts is tailored to improve website performance and user privacy without the need for any code changes or self-hosting of fonts.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/speed/optimization/content/fonts/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Cloudflare Fonts

Cloudflare Fonts is a feature designed for websites that use Google Fonts. It rewrites Google Fonts to be delivered from a website’s own origin, eliminating the need to rely on third-party font providers. Cloudflare Fonts is tailored to improve website performance and user privacy without the need for any code changes or self-hosting of fonts.

## How Cloudflare Fonts works

Cloudflare Fonts works by rewriting your webpage’s HTML. It removes Google Fonts links and replaces them with inline CSS. This CSS includes links to fonts from your own Cloudflare zone rather than from Google servers. This ensures that font files are served from your domain through Cloudflare's infrastructure, optimizing performance and enhancing user privacy.

### Browser support

Cloudflare Fonts is compatible with browsers that support Unicode-range subsetting and WOFF or WOFF2 formats, including:

```

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
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/speed/optimization)
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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/speed/","name":"Speed"}},{"@type":"ListItem","position":3,"item":{"@id":"/speed/optimization/","name":"Settings"}},{"@type":"ListItem","position":4,"item":{"@id":"/speed/optimization/content/","name":"Content optimizations"}},{"@type":"ListItem","position":5,"item":{"@id":"/speed/optimization/content/fonts/","name":"Cloudflare Fonts"}}]}
```
