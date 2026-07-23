---
description: API reference for RtkChatMessagesUiPaginated component (React Library)
title: RtkChatMessagesUiPaginated
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkChatMessagesUiPaginated

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkchatmessagesuipaginated/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Properties

| Property             | Type                | Required | Default         | Description                                                                                      |
| -------------------- | ------------------- | -------- | --------------- | ------------------------------------------------------------------------------------------------ |
| iconPack             | IconPack            | ❌        | defaultIconPack | Icon pack                                                                                        |
| meeting              | Meeting             | ✅        | \-              | Meeting object                                                                                   |
| privateChatRecipient | Participant \| null | ✅        | \-              | Selected recipient for private chat; when unset, messages are loaded for public chat (Everyone). |
| size                 | Size                | ✅        | \-              | Size                                                                                             |
| t                    | RtkI18n             | ❌        | useLanguage()   | Language                                                                                         |

## Usage Examples

### Basic Usage

```tsx
import { RtkChatMessagesUiPaginated } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkChatMessagesUiPaginated />;
}
```

### With Properties

```tsx
import { RtkChatMessagesUiPaginated } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkChatMessagesUiPaginated
      meeting={meeting}
      privateChatRecipient={participant | null}
      size="md"
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkchatmessagesuipaginated/#page","headline":"RtkChatMessagesUiPaginated · Cloudflare Realtime docs","description":"API reference for RtkChatMessagesUiPaginated component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkchatmessagesuipaginated/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
