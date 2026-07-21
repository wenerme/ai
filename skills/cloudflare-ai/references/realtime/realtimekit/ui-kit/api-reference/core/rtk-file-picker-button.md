---
description: API reference for rtk-file-picker-button component (Web Components (HTML) Library)
title: rtk-file-picker-button
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  rtk-file-picker-button

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-file-picker-button/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Properties

| Property | Type            | Required | Default         | Description                               |
| -------- | --------------- | -------- | --------------- | ----------------------------------------- |
| filter   | string          | ✅        | \-              | File type filter to open file picker with |
| icon     | keyof IconPack1 | ✅        | \-              | Icon                                      |
| iconPack | IconPack1       | ❌        | defaultIconPack | Icon pack                                 |
| label    | string          | ✅        | \-              | Label for tooltip                         |
| t        | RtkI18n1        | ❌        | useLanguage()   | Language                                  |

## Usage Examples

### Basic Usage

```html
<rtk-file-picker-button></rtk-file-picker-button>
```

### With Properties

```html
<rtk-file-picker-button
 filter="example"
 label="example">
</rtk-file-picker-button>
```

```html
<script>
  const el = document.querySelector("rtk-file-picker-button");

  el.icon= defaultIconPack
</script>
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-file-picker-button/#page","headline":"rtk-file-picker-button · Cloudflare Realtime docs","description":"API reference for rtk-file-picker-button component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-file-picker-button/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
