---
description: API reference for rtk-more-toggle component (Web Components (HTML) Library)
title: rtk-more-toggle
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-more-toggle

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-more-toggle/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A button which toggles visibility of a more menu. When clicked it emits a `rtkStateUpdate` event with the data:

```ts
{ activeMoreMenu: boolean; }
```

## Properties

| Property | Type     | Required | Default         | Description   |
| -------- | -------- | -------- | --------------- | ------------- |
| iconPack | IconPack | ❌        | defaultIconPack | Icon pack     |
| size     | Size     | ✅        | \-              | Size          |
| states   | States   | ✅        | \-              | States object |
| t        | RtkI18n  | ❌        | useLanguage()   | Language      |

## Usage Examples

### Basic Usage

```html
<rtk-more-toggle></rtk-more-toggle>
```

### With Properties

```html
<rtk-more-toggle
 size="md">
</rtk-more-toggle>
```

```html
<script>
  const el = document.querySelector("rtk-more-toggle");

</script>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-more-toggle/#page","headline":"rtk-more-toggle · Cloudflare Realtime docs","description":"API reference for rtk-more-toggle component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-more-toggle/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
