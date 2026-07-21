---
description: API reference for rtk-chat-messages-ui component (Angular Library)
title: rtk-chat-messages-ui
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  rtk-chat-messages-ui

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-chat-messages-ui/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

@deprecated Use `rtk-chat-messages-ui-paginated` instead.

## Properties

| Property       | Type      | Required | Default         | Description                         |
| -------------- | --------- | -------- | --------------- | ----------------------------------- |
| canPinMessages | boolean   | ✅        | \-              | Can current user pin/unpin messages |
| iconPack       | IconPack1 | ❌        | defaultIconPack | Icon pack                           |
| messages       | Chat\[\]  | ✅        | \-              | Chat Messages                       |
| selectedGroup  | string    | ✅        | \-              | Selected group key                  |
| selfUserId     | string    | ✅        | \-              | User ID of self user                |
| size           | Size1     | ✅        | \-              | Size                                |
| t              | RtkI18n   | ❌        | useLanguage()   | Language                            |

## Usage Examples

### Basic Usage

```html
<!-- component.html -->
<rtk-chat-messages-ui></rtk-chat-messages-ui>
```

### With Properties

```html
<!-- component.html -->
<rtk-chat-messages-ui
 [canPinMessages]="true"
 [messages]="[]"
 selectedGroup="example">
</rtk-chat-messages-ui>
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-chat-messages-ui/#page","headline":"rtk-chat-messages-ui · Cloudflare Realtime docs","description":"API reference for rtk-chat-messages-ui component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-chat-messages-ui/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
