---
description: Turn on Cloudflare Polish in the dashboard to automatically optimize images with lossy or lossless compression.
title: Activate Polish
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# Activate Polish

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/images/polish/activate-polish/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Images in the [cache must be purged](https://developers.cloudflare.com/cache/how-to/purge-cache/) or expired before seeing any changes in Polish settings.

Caution

Do not activate Polish and [image transformations](https://developers.cloudflare.com/images/optimization/transformations/overview) simultaneously. Image transformations already apply lossy compression, which makes Polish redundant.

1. In the Cloudflare dashboard, go to the **Account home** page.
[Go to **Account home** ↗](https://dash.cloudflare.com/?to=/:account/home)
2. Select the domain where you want to activate Polish.
3. Select **Speed** \> **Settings** \> **Image Optimization**.
4. Under **Polish**, select _Lossy_ or _Lossless_ from the drop-down menu. [_Lossy_](https://developers.cloudflare.com/images/polish/compression/#lossy) gives greater file size savings.
5. (Optional) Select **WebP**. Enable this option if you want to further optimize PNG and JPEG images stored in the origin server, and serve them as WebP files to browsers that support this format.

To ensure WebP is not served from cache to a browser without WebP support, disable any WebP conversion utilities at your origin web server when using Polish.

Note

To use this feature on specific hostnames - instead of across your entire zone - use a [configuration rule](https://developers.cloudflare.com/rules/configuration-rules/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/polish/activate-polish/#page","headline":"Activate Polish · Cloudflare Images docs","description":"Turn on Cloudflare Polish in the dashboard to automatically optimize images with lossy or lossless compression.","url":"https://developers.cloudflare.com/images/polish/activate-polish/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
