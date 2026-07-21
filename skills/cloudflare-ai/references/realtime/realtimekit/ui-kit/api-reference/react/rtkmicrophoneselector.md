---
description: API reference for RtkMicrophoneSelector component (React Library)
title: RtkMicrophoneSelector
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkMicrophoneSelector

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkmicrophoneselector/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A component which lets to manage your audio devices and audio preferences. Emits `rtkStateUpdate` event with data for muting notification sounds:

```ts
{
 prefs: {
   muteNotificationSounds: boolean
 }
}
```

## Properties

| Property | Type               | Required | Default         | Description    |
| -------- | ------------------ | -------- | --------------- | -------------- |
| iconPack | IconPack           | ❌        | defaultIconPack | Icon pack      |
| meeting  | Meeting            | ✅        | \-              | Meeting object |
| size     | Size               | ✅        | \-              | Size           |
| t        | RtkI18n            | ❌        | useLanguage()   | Language       |
| variant  | 'full' \| 'inline' | ✅        | \-              | variant        |

## Usage Examples

### Basic Usage

```tsx
import { RtkMicrophoneSelector } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkMicrophoneSelector />;
}
```

### With Properties

```tsx
import { RtkMicrophoneSelector } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkMicrophoneSelector
      meeting={meeting}
      size="md"
      variant={'full' | 'inline'}
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkmicrophoneselector/#page","headline":"RtkMicrophoneSelector · Cloudflare Realtime docs","description":"API reference for RtkMicrophoneSelector component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkmicrophoneselector/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
