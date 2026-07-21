---
description: API reference for RtkChatComposerUi component (React Library)
title: RtkChatComposerUi
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkChatComposerUi

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkchatcomposerui/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

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

```tsx
import { RtkChatComposerUi } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkChatComposerUi />;
}
```

### With Properties

```tsx
import { RtkChatComposerUi } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkChatComposerUi
      canSendFiles={true}
      canSendTextMessage={true}
      size="md"
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkchatcomposerui/#page","headline":"RtkChatComposerUi · Cloudflare Realtime docs","description":"API reference for RtkChatComposerUi component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkchatcomposerui/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
