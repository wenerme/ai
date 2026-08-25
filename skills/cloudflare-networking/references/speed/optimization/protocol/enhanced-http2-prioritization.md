---
description: Improve page load order with Enhanced HTTP/2 Prioritization.
title: Enhanced HTTP/2 Prioritization
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/speed/llms.txt
> Use this file to discover all available pages before exploring further.

# Enhanced HTTP/2 Prioritization

Last updated Aug 14, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/speed/optimization/protocol/enhanced-http2-prioritization/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

With Enhanced HTTP/2 Prioritization, Cloudflare delivers resources in the optimal order for the fastest experience across all browsers. It also supports control of content delivery when used in conjunction with [Workers](https://developers.cloudflare.com/workers/).

## Availability

|              | Free | Pro | Business | Enterprise |
| ------------ | ---- | --- | -------- | ---------- |
| Availability | No   | Yes | Yes      | Yes        |

## How it works

The speed of loading web content, from the user’s perspective, is dependent on the order in which the resources load. With HTTP/2, by default, Cloudflare will follow the order requested by the browser. This ordering varies from browser to browser, causing a significant difference in performance.

With Enhanced HTTP/2 Prioritization, Cloudflare overrides the default browser behavior to optimize the order of resource delivery, independent of the browser. The greatest improvements will be experienced by visitors using Safari and Edge browsers.

For more details, refer to [the introductory blog post ↗](https://blog.cloudflare.com/better-http-2-prioritization-for-a-faster-web/).

## Enable Enhanced HTTP/2 Prioritization

To enable **Enhanced HTTP/2 Prioritization** in the Cloudflare dashboard:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com).
2. Select your account and zone.
3. Go to **Speed** \> **Settings**.
4. Go to **Protocol Optimization**.
5. For **Enhanced HTTP/2 Prioritization**, switch the toggle to **On**.

To enable **Enhanced HTTP/2 Prioritization** using the Cloudflare API, send a [PATCH request](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) with `h2_prioritization` as the setting name in the URI path, and the `value` parameter set to `"on"`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/speed/optimization/protocol/enhanced-http2-prioritization/#page","headline":"Enhanced HTTP/2 Prioritization · Cloudflare Speed docs","description":"Improve page load order with Enhanced HTTP/2 Prioritization.","url":"https://developers.cloudflare.com/speed/optimization/protocol/enhanced-http2-prioritization/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-14","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
