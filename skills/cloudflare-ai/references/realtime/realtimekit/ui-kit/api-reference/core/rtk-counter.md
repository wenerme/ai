---
description: API reference for rtk-counter component (Web Components (HTML) Library)
title: rtk-counter
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  rtk-counter

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-counter/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A number picker with increment and decrement buttons.

## Properties

| Property | Type      | Required | Default         | Description   |
| -------- | --------- | -------- | --------------- | ------------- |
| iconPack | IconPack1 | ❌        | defaultIconPack | Icon pack     |
| minValue | number    | ✅        | \-              | Minimum value |
| size     | Size1     | ✅        | \-              | Size          |
| t        | RtkI18n   | ❌        | useLanguage()   | Language      |
| value    | number    | ✅        | \-              | Initial value |

## Usage Examples

### Basic Usage

```html
<rtk-counter></rtk-counter>
```

### With Properties

```html
<rtk-counter
 size="md">
</rtk-counter>
```

```html
<script>
  const el = document.querySelector("rtk-counter");

  el.minValue= 42;
  el.value= 42;
</script>
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-counter/#page","headline":"rtk-counter · Cloudflare Realtime docs","description":"API reference for rtk-counter component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-counter/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
