---
description: API reference for rtk-dialog-manager component (Web Components (HTML) Library)
title: rtk-dialog-manager
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  rtk-dialog-manager

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-dialog-manager/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A component which handles all dialog elements in a component such as:

* rtk-settings
* rtk-leave-meeting
* rtk-permissions-message
* rtk-image-viewer
* rtk-breakout-rooms-manager This components depends on the values from `states` object.

## Properties

| Property | Type     | Required | Default               | Description    |
| -------- | -------- | -------- | --------------------- | -------------- |
| config   | UIConfig | ❌        | createDefaultConfig() | UI Config      |
| iconPack | IconPack | ❌        | defaultIconPack       | Icon pack      |
| meeting  | Meeting  | ✅        | \-                    | Meeting object |
| size     | Size     | ✅        | \-                    | Size           |
| states   | States   | ✅        | \-                    | States object  |
| t        | RtkI18n  | ❌        | useLanguage()         | Language       |

## Usage Examples

### Basic Usage

```html
<rtk-dialog-manager></rtk-dialog-manager>
```

### With Properties

```html
<rtk-dialog-manager
 size="md">
</rtk-dialog-manager>
```

```html
<script>
  const el = document.querySelector("rtk-dialog-manager");

  el.meeting= meeting
</script>
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-dialog-manager/#page","headline":"rtk-dialog-manager · Cloudflare Realtime docs","description":"API reference for rtk-dialog-manager component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-dialog-manager/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
