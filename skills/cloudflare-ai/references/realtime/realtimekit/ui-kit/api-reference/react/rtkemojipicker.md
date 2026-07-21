---
description: API reference for RtkEmojiPicker component (React Library)
title: RtkEmojiPicker
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkEmojiPicker

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkemojipicker/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A very simple emoji picker component.

## Properties

| Property        | Type     | Required | Default         | Description                               |
| --------------- | -------- | -------- | --------------- | ----------------------------------------- |
| focusWhenOpened | boolean  | ✅        | \-              | Controls whether or not to focus on mount |
| iconPack        | IconPack | ❌        | defaultIconPack | Icon pack                                 |
| t               | RtkI18n  | ❌        | useLanguage()   | Language                                  |

## Usage Examples

### Basic Usage

```tsx
import { RtkEmojiPicker } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkEmojiPicker />;
}
```

### With Properties

```tsx
import { RtkEmojiPicker } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkEmojiPicker
      focusWhenOpened={true}
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkemojipicker/#page","headline":"RtkEmojiPicker · Cloudflare Realtime docs","description":"API reference for RtkEmojiPicker component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkemojipicker/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
