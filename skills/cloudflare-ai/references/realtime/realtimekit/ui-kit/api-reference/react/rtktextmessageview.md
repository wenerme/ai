---
description: API reference for RtkTextMessageView component (React Library)
title: RtkTextMessageView
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkTextMessageView

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtktextmessageview/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A component which renders a text message from chat.

## Properties

| Property   | Type    | Required | Default | Description                               |
| ---------- | ------- | -------- | ------- | ----------------------------------------- |
| isMarkdown | boolean | ✅        | \-      | Renders text as markdown (default = true) |
| text       | string  | ✅        | \-      | Text message                              |

## Usage Examples

### Basic Usage

```tsx
import { RtkTextMessageView } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkTextMessageView />;
}
```

### With Properties

```tsx
import { RtkTextMessageView } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkTextMessageView
      isMarkdown={true}
      text="example"
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtktextmessageview/#page","headline":"RtkTextMessageView · Cloudflare Realtime docs","description":"API reference for RtkTextMessageView component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtktextmessageview/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
