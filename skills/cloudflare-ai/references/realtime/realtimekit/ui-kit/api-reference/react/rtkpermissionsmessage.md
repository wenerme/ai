---
description: API reference for RtkPermissionsMessage component (React Library)
title: RtkPermissionsMessage
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkPermissionsMessage

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkpermissionsmessage/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A component which shows permission related troubleshooting information.

## Properties

| Property | Type     | Required | Default         | Description    |
| -------- | -------- | -------- | --------------- | -------------- |
| iconPack | IconPack | ❌        | defaultIconPack | Icon Pack      |
| meeting  | Meeting  | ✅        | \-              | Meeting object |
| states   | States   | ✅        | \-              | States object  |
| t        | RtkI18n  | ❌        | useLanguage()   | Language       |

## Usage Examples

### Basic Usage

```tsx
import { RtkPermissionsMessage } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkPermissionsMessage />;
}
```

### With Properties

```tsx
import { RtkPermissionsMessage } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkPermissionsMessage
      meeting={meeting}
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkpermissionsmessage/#page","headline":"RtkPermissionsMessage · Cloudflare Realtime docs","description":"API reference for RtkPermissionsMessage component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkpermissionsmessage/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
