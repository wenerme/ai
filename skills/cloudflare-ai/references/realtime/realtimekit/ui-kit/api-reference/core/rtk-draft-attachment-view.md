---
description: API reference for rtk-draft-attachment-view component (Web Components (HTML) Library)
title: rtk-draft-attachment-view
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  rtk-draft-attachment-view

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-draft-attachment-view/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A component which renders the draft attachment to send

## Properties

| Property   | Type                                     | Required | Default         | Description           |
| ---------- | ---------------------------------------- | -------- | --------------- | --------------------- |
| attachment | { type: 'image' \| 'file'; file: File; } | ✅        | \-              | Attachment to display |
| iconPack   | IconPack1                                | ❌        | defaultIconPack | Icon pack             |
| t          | RtkI18n1                                 | ❌        | useLanguage()   | Language              |

## Usage Examples

### Basic Usage

```html
<rtk-draft-attachment-view></rtk-draft-attachment-view>
```

### With Properties

```html
<rtk-draft-attachment-view>
</rtk-draft-attachment-view>
```

```html
<script>
  const el = document.querySelector("rtk-draft-attachment-view");

  el.attachment= {};
</script>
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-draft-attachment-view/#page","headline":"rtk-draft-attachment-view · Cloudflare Realtime docs","description":"API reference for rtk-draft-attachment-view component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-draft-attachment-view/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
