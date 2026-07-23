---
description: API reference for rtk-chat-message component (Angular Library)
title: rtk-chat-message
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-chat-message

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-chat-message/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

@deprecated `rtk-chat-message` is deprecated and will be removed soon. Use `rtk-message-view` instead.

## Properties

| Property             | Type        | Required | Default         | Description                            |
| -------------------- | ----------- | -------- | --------------- | -------------------------------------- |
| alignRight           | boolean     | ✅        | \-              | aligns message to right                |
| canDelete            | boolean     | ✅        | \-              | can delete message                     |
| canEdit              | boolean     | ✅        | \-              | can edit message                       |
| canPin               | boolean     | ✅        | \-              | can pin this message                   |
| canReply             | boolean     | ✅        | \-              | can quote reply this message           |
| child                | HTMLElement | ✅        | \-              | Child                                  |
| disableControls      | boolean     | ✅        | \-              | disables controls                      |
| hideAvatar           | boolean     | ✅        | \-              | hides avatar                           |
| iconPack             | IconPack1   | ❌        | defaultIconPack | Icon pack                              |
| isContinued          | boolean     | ✅        | \-              | is continued                           |
| isSelf               | boolean     | ✅        | \-              | if sender is self                      |
| isUnread             | boolean     | ✅        | \-              | is unread                              |
| leftAlign            | boolean     | ✅        | \-              | Whether to left align the chat bubbles |
| message              | Message     | ✅        | \-              | message item                           |
| senderDisplayPicture | string      | ✅        | \-              | sender display picture url             |
| size                 | Size        | ✅        | \-              | Size                                   |
| t                    | RtkI18n1    | ❌        | useLanguage()   | Language                               |

## Usage Examples

### Basic Usage

```html
<!-- component.html -->
<rtk-chat-message></rtk-chat-message>
```

### With Properties

```html
<!-- component.html -->
<rtk-chat-message
 [alignRight]="true"
 [canDelete]="true"
 [canEdit]="true">
</rtk-chat-message>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-chat-message/#page","headline":"rtk-chat-message · Cloudflare Realtime docs","description":"API reference for rtk-chat-message component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-chat-message/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
