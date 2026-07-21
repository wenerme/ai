---
description: API reference for RtkJoinStage component (React Library)
title: RtkJoinStage
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkJoinStage

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkjoinstage/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Properties

| Property   | Type            | Required | Default               | Description    |
| ---------- | --------------- | -------- | --------------------- | -------------- |
| config     | UIConfig        | ❌        | createDefaultConfig() | UI Config      |
| dataConfig | ModalDataConfig | ✅        | \-                    | Content Config |
| iconPack   | IconPack        | ❌        | defaultIconPack       | Icon pack      |
| meeting    | Meeting         | ✅        | \-                    | Meeting object |
| size       | Size            | ✅        | \-                    | Size           |
| states     | States          | ✅        | \-                    | States object  |
| t          | RtkI18n         | ❌        | useLanguage()         | Language       |

## Usage Examples

### Basic Usage

```tsx
import { RtkJoinStage } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkJoinStage />;
}
```

### With Properties

```tsx
import { RtkJoinStage } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkJoinStage
      dataConfig={modaldataconfig}
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
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkjoinstage/#page","headline":"RtkJoinStage · Cloudflare Realtime docs","description":"API reference for RtkJoinStage component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkjoinstage/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
