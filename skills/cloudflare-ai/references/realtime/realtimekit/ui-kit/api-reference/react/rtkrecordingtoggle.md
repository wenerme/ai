---
description: API reference for RtkRecordingToggle component (React Library)
title: RtkRecordingToggle
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkRecordingToggle

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkrecordingtoggle/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A button which toggles recording state of a meeting. Only a privileged user can perform this action, thus the button will not be visible for participants who don't have the permission to record a meeting.

## Properties

| Property | Type              | Required | Default         | Description        |
| -------- | ----------------- | -------- | --------------- | ------------------ |
| disabled | boolean           | ✅        | \-              | Disable the button |
| iconPack | IconPack          | ❌        | defaultIconPack | Icon pack          |
| meeting  | Meeting           | ✅        | \-              | Meeting object     |
| size     | Size              | ✅        | \-              | Size               |
| t        | RtkI18n           | ❌        | useLanguage()   | Language           |
| variant  | ControlBarVariant | ✅        | \-              | Variant            |

## Usage Examples

### Basic Usage

```tsx
import { RtkRecordingToggle } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkRecordingToggle />;
}
```

### With Properties

```tsx
import { RtkRecordingToggle } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkRecordingToggle
      disabled={true}
      meeting={meeting}
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
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkrecordingtoggle/#page","headline":"RtkRecordingToggle · Cloudflare Realtime docs","description":"API reference for RtkRecordingToggle component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkrecordingtoggle/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
