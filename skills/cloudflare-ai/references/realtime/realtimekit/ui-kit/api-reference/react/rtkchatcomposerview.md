---
description: API reference for RtkChatComposerView component (React Library)
title: RtkChatComposerView
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkChatComposerView

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkchatcomposerview/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A component which renders a chat composer

## Properties

| Property             | Type                                        | Required | Default         | Description                             |
| -------------------- | ------------------------------------------- | -------- | --------------- | --------------------------------------- |
| canSendFiles         | boolean                                     | ✅        | \-              | Whether user can send file messages     |
| canSendTextMessage   | boolean                                     | ✅        | \-              | Whether user can send text messages     |
| iconPack             | IconPack1                                   | ❌        | defaultIconPack | Icon pack                               |
| inputTextPlaceholder | string                                      | ✅        | \-              | Placeholder for text input              |
| isEditing            | boolean                                     | ✅        | \-              | Sets composer to edit mode              |
| maxLength            | number                                      | ✅        | \-              | Max length for text input               |
| message              | string                                      | ✅        | \-              | Message to be pre-populated             |
| quotedMessage        | string                                      | ✅        | \-              | Quote message to be displayed           |
| rateLimits           | { period: number; maxInvocations: number; } | ✅        | \-              | Rate limits                             |
| storageKey           | string                                      | ✅        | \-              | Key for storing message in localStorage |
| t                    | RtkI18n1                                    | ❌        | useLanguage()   | Language                                |

## Usage Examples

### Basic Usage

```tsx
import { RtkChatComposerView } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkChatComposerView />;
}
```

### With Properties

```tsx
import { RtkChatComposerView } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkChatComposerView
      canSendFiles={true}
      canSendTextMessage={true}
      inputTextPlaceholder="example"
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkchatcomposerview/#page","headline":"RtkChatComposerView · Cloudflare Realtime docs","description":"API reference for RtkChatComposerView component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkchatcomposerview/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
