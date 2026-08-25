---
description: API reference for rtk-stage component (Web Components (HTML) Library)
title: rtk-stage
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-stage

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-stage/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A component used as a stage that commonly houses the `grid` and `sidebar` components.

## Properties

| Property | Type     | Required | Default         | Description |
| -------- | -------- | -------- | --------------- | ----------- |
| iconPack | IconPack | ❌        | defaultIconPack | Icon pack   |
| t        | RtkI18n  | ❌        | useLanguage()   | Language    |

## Usage Examples

### Basic Usage

```html
<rtk-stage></rtk-stage>
```

### With Properties

```html
<rtk-stage>
</rtk-stage>
```

```html
<script>
  const el = document.querySelector("rtk-stage");

  el.iconPack= defaultIconPack
</script>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-stage/#page","headline":"rtk-stage · Cloudflare Realtime docs","description":"API reference for rtk-stage component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-stage/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
