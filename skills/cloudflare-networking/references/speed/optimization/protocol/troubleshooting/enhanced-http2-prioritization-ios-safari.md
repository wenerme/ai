---
description: Fix Enhanced HTTP/2 Prioritization issues on iOS and Safari.
title: Enhanced HTTP/2 Prioritization negatively affects iOS/Safari devices
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/speed/llms.txt
> Use this file to discover all available pages before exploring further.

# Enhanced HTTP/2 Prioritization negatively affects iOS/Safari devices

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/speed/optimization/protocol/troubleshooting/enhanced-http2-prioritization-ios-safari/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Occasionally, [Enhanced HTTP/2 Prioritization](https://developers.cloudflare.com/speed/optimization/protocol/enhanced-http2-prioritization/) can negatively affect the experience of visitors using Safari on macOS or any browser on iOS.

These visitors may notice not being able to load the site properly, such as images not displaying or content taking too long to load.

## Solution

If visitors using using Safari on macOS or any browser on iOS are experiencing issues with your site loading properly, try [disabling Enhanced HTTP/2 Prioritization](https://developers.cloudflare.com/speed/optimization/protocol/enhanced-http2-prioritization/#enable-enhanced-http2-prioritization).

Note

Sometimes, [HTTP/2](https://developers.cloudflare.com/speed/optimization/protocol/http2/) will cause **Enhanced HTTP/2 Prioritization** to be re-enabled automatically.

If you notice this happening, also disable **HTTP/2**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/speed/optimization/protocol/troubleshooting/enhanced-http2-prioritization-ios-safari/#page","headline":"Enhanced HTTP/2 Prioritization negatively affects iOS/Safari devices · Cloudflare Speed docs","description":"Fix Enhanced HTTP/2 Prioritization issues on iOS and Safari.","url":"https://developers.cloudflare.com/speed/optimization/protocol/troubleshooting/enhanced-http2-prioritization-ios-safari/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
