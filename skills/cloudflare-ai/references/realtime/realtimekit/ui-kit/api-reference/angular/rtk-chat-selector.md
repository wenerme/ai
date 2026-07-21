---
description: API reference for rtk-chat-selector component (Angular Library)
title: rtk-chat-selector
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  rtk-chat-selector

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-chat-selector/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Properties

| Property  | Type       | Required | Default               | Description    |
| --------- | ---------- | -------- | --------------------- | -------------- |
| config    | UIConfig1  | ❌        | createDefaultConfig() | Config         |
| iconPack  | IconPack   | ❌        | defaultIconPack       | Icon pack      |
| meeting   | Meeting    | ✅        | \-                    | Meeting object |
| overrides | Overrides1 | ❌        | defaultOverrides      | UI Overrides   |
| size      | Size       | ✅        | \-                    | Size           |
| states    | States1    | ✅        | \-                    | States object  |
| t         | RtkI18n    | ❌        | useLanguage()         | Language       |

## Usage Examples

### Basic Usage

```html
<!-- component.html -->
<rtk-chat-selector></rtk-chat-selector>
```

### With Properties

```html
<!-- component.html -->
<rtk-chat-selector
 [meeting]="meeting"
 size="md">
</rtk-chat-selector>
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-chat-selector/#page","headline":"rtk-chat-selector · Cloudflare Realtime docs","description":"API reference for rtk-chat-selector component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-chat-selector/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
