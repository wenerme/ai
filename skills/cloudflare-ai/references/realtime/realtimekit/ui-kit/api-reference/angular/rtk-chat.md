---
description: API reference for rtk-chat component (Angular Library)
title: rtk-chat
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  rtk-chat

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-chat/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Fully featured chat component with image & file upload, emoji picker and auto-scroll.

## Properties

| Property  | Type      | Required | Default               | Description    |
| --------- | --------- | -------- | --------------------- | -------------- |
| config    | UIConfig1 | ❌        | createDefaultConfig() | Config         |
| iconPack  | IconPack  | ❌        | defaultIconPack       | Icon pack      |
| meeting   | Meeting   | ✅        | \-                    | Meeting object |
| overrides | Overrides | ❌        | defaultOverrides      | UI Overrides   |
| size      | Size      | ✅        | \-                    | Size           |
| t         | RtkI18n   | ❌        | useLanguage()         | Language       |

## Usage Examples

### Basic Usage

```html
<!-- component.html -->
<rtk-chat></rtk-chat>
```

### With Properties

```html
<!-- component.html -->
<rtk-chat
 [meeting]="meeting"
 size="md">
</rtk-chat>
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-chat/#page","headline":"rtk-chat · Cloudflare Realtime docs","description":"API reference for rtk-chat component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-chat/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
