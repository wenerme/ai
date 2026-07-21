---
description: API reference for rtk-viewer-count component (Web Components (HTML) Library)
title: rtk-viewer-count
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  rtk-viewer-count

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-viewer-count/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A component which shows count of total joined participants in a meeting.

## Properties

| Property | Type               | Required | Default         | Description          |
| -------- | ------------------ | -------- | --------------- | -------------------- |
| iconPack | IconPack           | ❌        | defaultIconPack | Icon pack            |
| meeting  | Meeting            | ✅        | \-              | Meeting object       |
| t        | RtkI18n            | ❌        | useLanguage()   | Language             |
| variant  | ViewerCountVariant | ✅        | \-              | Viewer count variant |

## Usage Examples

### Basic Usage

```html
<rtk-viewer-count></rtk-viewer-count>
```

### With Properties

```html
<rtk-viewer-count
 variant="primary">
</rtk-viewer-count>
```

```html
<script>
  const el = document.querySelector("rtk-viewer-count");

  el.meeting= meeting
</script>
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-viewer-count/#page","headline":"rtk-viewer-count · Cloudflare Realtime docs","description":"API reference for rtk-viewer-count component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-viewer-count/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
