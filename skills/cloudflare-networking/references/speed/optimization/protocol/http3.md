---
description: Serve content over HTTP/3 with QUIC for faster connections.
title: HTTP/3 (with QUIC)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/speed/llms.txt
> Use this file to discover all available pages before exploring further.

# HTTP/3 (with QUIC)

Last updated Aug 14, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/speed/optimization/protocol/http3/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

HTTP/3 uses QUIC, which is a secure-by-default transport protocol. HTTP/3 improves page load times in a similar way to HTTP/2\. However, the QUIC transport protocol solves TCP's head-of-line blocking problem, meaning that performance over lossy networks can be better.

Note

For more background on HTTP/3, visit the [Learning Center ↗](https://www.cloudflare.com/learning/performance/what-is-http3/).

Note

This setting is for connection between the user and Cloudflare. HTTP/3 connection to the origin is not yet supported.

## Availability

|              | Free | Pro | Business | Enterprise |
| ------------ | ---- | --- | -------- | ---------- |
| Availability | Yes  | Yes | Yes      | Yes        |

## Enable HTTP/3

HTTP/3 is available to all plans (though it does require an [SSL certificate at Cloudflare’s edge network](https://developers.cloudflare.com/ssl/get-started/)).

To enable **HTTP/3** in the dashboard:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com).
2. Select your account and zone.
3. Go to **Speed** \> **Settings**.
4. Go to **Protocol Optimization**.
5. For **HTTP/3**, switch the toggle to **On**.

To enable **HTTP/3** with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `http3` as the setting name in the URI path, and the `value` parameter set to `"on"`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/speed/optimization/protocol/http3/#page","headline":"HTTP/3 (with QUIC) · Cloudflare Speed docs","description":"Serve content over HTTP/3 with QUIC for faster connections.","url":"https://developers.cloudflare.com/speed/optimization/protocol/http3/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-14","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["QUIC"]}
```
