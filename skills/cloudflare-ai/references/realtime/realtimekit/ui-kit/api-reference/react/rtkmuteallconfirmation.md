---
description: API reference for RtkMuteAllConfirmation component (React Library)
title: RtkMuteAllConfirmation
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkMuteAllConfirmation

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkmuteallconfirmation/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Properties

| Property | Type     | Required | Default         | Description    |
| -------- | -------- | -------- | --------------- | -------------- |
| iconPack | IconPack | ❌        | defaultIconPack | Icon pack      |
| meeting  | Meeting  | ✅        | \-              | Meeting object |
| states   | States   | ✅        | \-              | States object  |
| t        | RtkI18n  | ❌        | useLanguage()   | Language       |

## Usage Examples

### Basic Usage

```tsx
import { RtkMuteAllConfirmation } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkMuteAllConfirmation />;
}
```

### With Properties

```tsx
import { RtkMuteAllConfirmation } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkMuteAllConfirmation
      meeting={meeting}
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkmuteallconfirmation/#page","headline":"RtkMuteAllConfirmation · Cloudflare Realtime docs","description":"API reference for RtkMuteAllConfirmation component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkmuteallconfirmation/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
