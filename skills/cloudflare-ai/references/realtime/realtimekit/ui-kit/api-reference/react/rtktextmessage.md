---
description: API reference for RtkTextMessage component (React Library)
title: RtkTextMessage
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkTextMessage

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtktextmessage/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

@deprecated `rtk-text-message` is deprecated and will be removed soon. Use `rtk-text-message-view` instead. A component which renders a text message from chat.

## Properties

| Property    | Type        | Required | Default         | Description                                             |
| ----------- | ----------- | -------- | --------------- | ------------------------------------------------------- |
| iconPack    | IconPack    | ❌        | defaultIconPack | Icon pack                                               |
| isContinued | boolean     | ✅        | \-              | Whether the message is continued by same user           |
| message     | TextMessage | ✅        | \-              | Text message object                                     |
| now         | Date        | ✅        | \-              | Date object of now, to calculate distance between dates |
| showBubble  | boolean     | ✅        | \-              | show message in bubble                                  |
| t           | RtkI18n     | ❌        | useLanguage()   | Language                                                |

## Usage Examples

### Basic Usage

```tsx
import { RtkTextMessage } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkTextMessage />;
}
```

### With Properties

```tsx
import { RtkTextMessage } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkTextMessage
      isContinued={true}
      message={textmessage}
      now={date}
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtktextmessage/#page","headline":"RtkTextMessage · Cloudflare Realtime docs","description":"API reference for RtkTextMessage component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtktextmessage/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
