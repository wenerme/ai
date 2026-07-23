---
description: API reference for rtk-mute-all-confirmation component (Web Components (HTML) Library)
title: rtk-mute-all-confirmation
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-mute-all-confirmation

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-mute-all-confirmation/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Properties

| Property | Type     | Required | Default         | Description    |
| -------- | -------- | -------- | --------------- | -------------- |
| iconPack | IconPack | ❌        | defaultIconPack | Icon pack      |
| meeting  | Meeting  | ✅        | \-              | Meeting object |
| states   | States   | ✅        | \-              | States object  |
| t        | RtkI18n  | ❌        | useLanguage()   | Language       |

## Usage Examples

### Basic Usage

```html
<rtk-mute-all-confirmation></rtk-mute-all-confirmation>
```

### With Properties

```html
<rtk-mute-all-confirmation>
</rtk-mute-all-confirmation>
```

```html
<script>
  const el = document.querySelector("rtk-mute-all-confirmation");

  el.meeting= meeting
</script>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-mute-all-confirmation/#page","headline":"rtk-mute-all-confirmation · Cloudflare Realtime docs","description":"API reference for rtk-mute-all-confirmation component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-mute-all-confirmation/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
