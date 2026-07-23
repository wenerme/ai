---
description: API reference for rtk-chat-search-results component (Web Components (HTML) Library)
title: rtk-chat-search-results
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-chat-search-results

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-chat-search-results/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

@deprecated `rtk-chat-search-results` is deprecated and will be removed soon. Use `rtk-chat-messages-ui-paginated` instead. -

## Properties

| Property  | Type      | Required | Default         | Description    |
| --------- | --------- | -------- | --------------- | -------------- |
| channelId | string    | ✅        | \-              | Channel id     |
| iconPack  | IconPack1 | ❌        | defaultIconPack | Icon pack      |
| meeting   | Meeting   | ✅        | \-              | Meeting object |
| query     | string    | ✅        | \-              | Search query   |
| t         | RtkI18n1  | ❌        | useLanguage()   | Language       |

## Usage Examples

### Basic Usage

```html
<rtk-chat-search-results></rtk-chat-search-results>
```

### With Properties

```html
<rtk-chat-search-results
 channelId="example"
 query="example">
</rtk-chat-search-results>
```

```html
<script>
  const el = document.querySelector("rtk-chat-search-results");

  el.meeting= meeting
</script>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-chat-search-results/#page","headline":"rtk-chat-search-results · Cloudflare Realtime docs","description":"API reference for rtk-chat-search-results component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-chat-search-results/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
