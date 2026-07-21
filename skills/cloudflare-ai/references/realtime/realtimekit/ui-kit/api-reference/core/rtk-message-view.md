---
description: API reference for rtk-message-view component (Web Components (HTML) Library)
title: rtk-message-view
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  rtk-message-view

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-message-view/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Properties

| Property       | Type                     | Required | Default         | Description                             |
| -------------- | ------------------------ | -------- | --------------- | --------------------------------------- |
| actions        | MessageAction\[\]        | ✅        | \-              | List of actions to show in menu         |
| authorName     | string                   | ✅        | \-              | Author display label                    |
| avatarUrl      | string                   | ✅        | \-              | Avatar image url                        |
| hideAuthorName | boolean                  | ✅        | \-              | Hides author display label              |
| hideAvatar     | boolean                  | ✅        | \-              | Hides avatar                            |
| hideMetadata   | boolean                  | ✅        | \-              | Hides metadata (time)                   |
| iconPack       | IconPack1                | ❌        | defaultIconPack | Icon pack                               |
| isEdited       | boolean                  | ✅        | \-              | Has the message been edited             |
| isSelf         | boolean                  | ✅        | \-              | Is the message sent by the current user |
| messageType    | Message\['type'\]        | ✅        | \-              | Type of message                         |
| pinned         | boolean                  | ✅        | \-              | Is message pinned                       |
| time           | Date                     | ✅        | \-              | Time when message was sent              |
| variant        | 'plain' \| 'bubble'      | ✅        | \-              | Appearance                              |
| viewType       | 'incoming' \| 'outgoing' | ✅        | \-              | Render                                  |

## Usage Examples

### Basic Usage

```html
<rtk-message-view></rtk-message-view>
```

### With Properties

```html
<rtk-message-view
 authorName="example"
 avatarUrl="example">
</rtk-message-view>
```

```html
<script>
  const el = document.querySelector("rtk-message-view");

  el.actions= [];
</script>
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-message-view/#page","headline":"rtk-message-view · Cloudflare Realtime docs","description":"API reference for rtk-message-view component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-message-view/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
