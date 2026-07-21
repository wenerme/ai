---
description: API reference for rtk-participants-viewer-list component (Web Components (HTML) Library)
title: rtk-participants-viewer-list
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  rtk-participants-viewer-list

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-participants-viewer-list/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Properties

| Property   | Type                 | Required | Default               | Description                     |
| ---------- | -------------------- | -------- | --------------------- | ------------------------------- |
| config     | UIConfig1            | ❌        | createDefaultConfig() | Config                          |
| hideHeader | boolean              | ✅        | \-                    | Hide Viewer Count Header        |
| iconPack   | IconPack1            | ❌        | defaultIconPack       | Icon pack                       |
| meeting    | Meeting              | ✅        | \-                    | Meeting object                  |
| search     | string               | ✅        | \-                    | Search                          |
| size       | Size1                | ✅        | \-                    | Size                            |
| t          | RtkI18n1             | ❌        | useLanguage()         | Language                        |
| view       | ParticipantsViewMode | ✅        | \-                    | View mode for participants list |

## Usage Examples

### Basic Usage

```html
<rtk-participants-viewer-list></rtk-participants-viewer-list>
```

### With Properties

```html
<rtk-participants-viewer-list
 search="example">
</rtk-participants-viewer-list>
```

```html
<script>
  const el = document.querySelector("rtk-participants-viewer-list");

  el.hideHeader= true;
  el.meeting= meeting
</script>
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-participants-viewer-list/#page","headline":"rtk-participants-viewer-list · Cloudflare Realtime docs","description":"API reference for rtk-participants-viewer-list component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-participants-viewer-list/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
