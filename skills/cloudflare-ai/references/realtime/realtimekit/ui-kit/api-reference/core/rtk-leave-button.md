---
description: API reference for rtk-leave-button component (Web Components (HTML) Library)
title: rtk-leave-button
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-leave-button

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-leave-button/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A button which toggles visilibility of the leave confirmation dialog.

## Properties

| Property | Type              | Required | Default         | Description |
| -------- | ----------------- | -------- | --------------- | ----------- |
| iconPack | IconPack          | ❌        | defaultIconPack | Icon pack   |
| size     | Size              | ✅        | \-              | Size        |
| t        | RtkI18n           | ❌        | useLanguage()   | Language    |
| variant  | ControlBarVariant | ✅        | \-              | Variant     |

## Usage Examples

### Basic Usage

```html
<rtk-leave-button></rtk-leave-button>
```

### With Properties

```html
<rtk-leave-button
 size="md"
 variant"button">
</rtk-leave-button>
```

```html
<script>
  const el = document.querySelector("rtk-leave-button");

</script>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-leave-button/#page","headline":"rtk-leave-button · Cloudflare Realtime docs","description":"API reference for rtk-leave-button component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-leave-button/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
