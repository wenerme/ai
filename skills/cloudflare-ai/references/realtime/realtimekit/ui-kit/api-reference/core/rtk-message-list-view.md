---
description: API reference for rtk-message-list-view component (Web Components (HTML) Library)
title: rtk-message-list-view
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-message-list-view

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-message-list-view/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A component which renders list of messages.

## Properties

| Property          | Type                              | Required | Default         | Description                                                                   |
| ----------------- | --------------------------------- | -------- | --------------- | ----------------------------------------------------------------------------- |
| estimateItemSize  | number                            | ✅        | \-              | Estimated height of an item                                                   |
| iconPack          | IconPack1                         | ❌        | defaultIconPack | Icon pack                                                                     |
| loadMore          | (lastMessage: Message)            | ✅        | \-              | Function to load more messages. Messages returned from this will be prepended |
| messages          | Message\[\]                       | ✅        | \-              | Messages to render                                                            |
| renderer          | (message: Message, index: number) | ✅        | \-              | Render function of the message                                                |
| visibleItemsCount | number                            | ✅        | \-              | Maximum visible messages                                                      |

## Usage Examples

### Basic Usage

```html
<rtk-message-list-view></rtk-message-list-view>
```

### With Properties

```html
<rtk-message-list-view>
</rtk-message-list-view>
```

```html
<script>
  const el = document.querySelector("rtk-message-list-view");

  el.estimateItemSize= 42;
  el.messages= [];
</script>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-message-list-view/#page","headline":"rtk-message-list-view · Cloudflare Realtime docs","description":"API reference for rtk-message-list-view component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-message-list-view/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
