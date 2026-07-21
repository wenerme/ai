---
description: API reference for RtkAvatar component (React Library)
title: RtkAvatar
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkAvatar

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkavatar/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Avatar component which renders a participant's image or their initials.

## Properties

| Property    | Type                          | Required                          | Default         | Description |                    |
| ----------- | ----------------------------- | --------------------------------- | --------------- | ----------- | ------------------ |
| iconPack    | IconPack                      | ❌                                 | defaultIconPack | Icon pack   |                    |
| participant | Peer \| WaitlistedParticipant | { name: string; picture: string } | ✅               | \-          | Participant object |
| size        | Size                          | ✅                                 | \-              | Size        |                    |
| t           | RtkI18n                       | ❌                                 | useLanguage()   | Language    |                    |
| variant     | AvatarVariant                 | ✅                                 | \-              | Avatar type |                    |

## Usage Examples

### Basic Usage

```tsx
import { RtkAvatar } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkAvatar />;
}
```

### With Properties

```tsx
import { RtkAvatar } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkAvatar
      participant="example"
      size="md"
      variant="circular"
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkavatar/#page","headline":"RtkAvatar · Cloudflare Realtime docs","description":"API reference for RtkAvatar component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkavatar/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
