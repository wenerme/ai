---
description: API reference for RtkTextComposerView component (React Library)
title: RtkTextComposerView
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkTextComposerView

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtktextcomposerview/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A component which renders a text composer

## Properties

| Property          | Type                            | Required | Default         | Description                                   |
| ----------------- | ------------------------------- | -------- | --------------- | --------------------------------------------- |
| disabled          | boolean                         | ✅        | \-              | Disable the text input (default = false)      |
| iconPack          | IconPack1                       | ❌        | defaultIconPack | Icon pack                                     |
| keyDownHandler    | (e: KeyboardEvent)              | ✅        | \-              | Keydown event handler function                |
| maxLength         | number                          | ✅        | \-              | Max length for text input                     |
| placeholder       | string                          | ✅        | \-              | Placeholder text                              |
| rateLimitBreached | boolean                         | ✅        | \-              | Boolean to indicate if rate limit is breached |
| setText           | (text: string, focus?: boolean) | ❌        | \-              | Sets value of the text input                  |
| t                 | RtkI18n1                        | ❌        | useLanguage()   | Language                                      |
| value             | string                          | ✅        | \-              | Default value for text input                  |

## Usage Examples

### Basic Usage

```tsx
import { RtkTextComposerView } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkTextComposerView />;
}
```

### With Properties

```tsx
import { RtkTextComposerView } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkTextComposerView
      disabled={true}
      keyDownHandler={(e: keyboardevent)}
      maxLength={42}
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtktextcomposerview/#page","headline":"RtkTextComposerView · Cloudflare Realtime docs","description":"API reference for RtkTextComposerView component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtktextcomposerview/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
