---
description: API reference for RtkSpeakerSelector component (React Library)
title: RtkSpeakerSelector
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkSpeakerSelector

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkspeakerselector/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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
| states   | States             | ✅        | \-              | States object  |
| t        | RtkI18n            | ❌        | useLanguage()   | Language       |
| variant  | 'full' \| 'inline' | ✅        | \-              | variant        |

## Usage Examples

### Basic Usage

```tsx
import { RtkSpeakerSelector } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkSpeakerSelector />;
}
```

### With Properties

```tsx
import { RtkSpeakerSelector } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkSpeakerSelector
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

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkspeakerselector/#page","headline":"RtkSpeakerSelector · Cloudflare Realtime docs","description":"API reference for RtkSpeakerSelector component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkspeakerselector/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
