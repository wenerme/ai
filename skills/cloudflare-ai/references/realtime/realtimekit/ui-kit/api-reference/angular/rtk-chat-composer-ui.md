---
description: API reference for rtk-chat-composer-ui component (Angular Library)
title: rtk-chat-composer-ui
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-chat-composer-ui

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-chat-composer-ui/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

@deprecated . This component is deprecated, please use rtk-chat-composer-view instead.

## Properties

| Property           | Type                                                                                      | Required | Default         | Description                         |
| ------------------ | ----------------------------------------------------------------------------------------- | -------- | --------------- | ----------------------------------- |
| canSendFiles       | boolean                                                                                   | ✅        | \-              | Whether user can send file messages |
| canSendTextMessage | boolean                                                                                   | ✅        | \-              | Whether user can send text messages |
| iconPack           | IconPack1                                                                                 | ❌        | defaultIconPack | Icon pack                           |
| prefill            | { suggestedReplies?: string\[\]; editMessage?: TextMessage; replyMessage?: TextMessage; } | ❌        | \-              | prefill the composer                |
| size               | Size1                                                                                     | ✅        | \-              | Size                                |
| t                  | RtkI18n                                                                                   | ❌        | useLanguage()   | Language                            |

## Usage Examples

### Basic Usage

```html
<!-- component.html -->
<rtk-chat-composer-ui></rtk-chat-composer-ui>
```

### With Properties

```html
<!-- component.html -->
<rtk-chat-composer-ui
 [canSendFiles]="true"
 [canSendTextMessage]="true"
 size="md">
</rtk-chat-composer-ui>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-chat-composer-ui/#page","headline":"rtk-chat-composer-ui · Cloudflare Realtime docs","description":"API reference for rtk-chat-composer-ui component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-chat-composer-ui/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
