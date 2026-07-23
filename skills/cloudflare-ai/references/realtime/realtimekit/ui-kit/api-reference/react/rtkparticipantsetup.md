---
description: API reference for RtkParticipantSetup component (React Library)
title: RtkParticipantSetup
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkParticipantSetup

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkparticipantsetup/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Properties

| Property        | Type                  | Required       | Default               | Description                      |             |              |   |    |                      |
| --------------- | --------------------- | -------------- | --------------------- | -------------------------------- | ----------- | ------------ | - | -- | -------------------- |
| config          | UIConfig              | ❌              | createDefaultConfig() | Config object                    |             |              |   |    |                      |
| iconPack        | IconPack              | ❌              | defaultIconPack       | Icon pack                        |             |              |   |    |                      |
| isPreview       | boolean               | ✅              | \-                    | Whether tile is used for preview |             |              |   |    |                      |
| nameTagPosition | \| 'bottom-left'      | 'bottom-right' | 'bottom-center'       | 'top-left'                       | 'top-right' | 'top-center' | ✅ | \- | Position of name tag |
| participant     | Peer                  | ✅              | \-                    | Participant object               |             |              |   |    |                      |
| size            | Size                  | ✅              | \-                    | Size                             |             |              |   |    |                      |
| states          | States                | ✅              | \-                    | States object                    |             |              |   |    |                      |
| t               | RtkI18n               | ❌              | useLanguage()         | Language                         |             |              |   |    |                      |
| variant         | 'solid' \| 'gradient' | ✅              | \-                    | Variant                          |             |              |   |    |                      |

## Usage Examples

### Basic Usage

```tsx
import { RtkParticipantSetup } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkParticipantSetup />;
}
```

### With Properties

```tsx
import { RtkParticipantSetup } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkParticipantSetup
      isPreview={true}
      nameTagPosition={| 'bottom-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'top-left'
    | 'top-right'
    | 'top-center'}
      participant={participant}
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkparticipantsetup/#page","headline":"RtkParticipantSetup · Cloudflare Realtime docs","description":"API reference for RtkParticipantSetup component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkparticipantsetup/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
