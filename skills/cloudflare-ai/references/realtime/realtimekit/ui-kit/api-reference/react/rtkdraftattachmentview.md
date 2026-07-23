---
description: API reference for RtkDraftAttachmentView component (React Library)
title: RtkDraftAttachmentView
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkDraftAttachmentView

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkdraftattachmentview/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A component which renders the draft attachment to send

## Properties

| Property   | Type                                     | Required | Default         | Description           |
| ---------- | ---------------------------------------- | -------- | --------------- | --------------------- |
| attachment | { type: 'image' \| 'file'; file: File; } | ✅        | \-              | Attachment to display |
| iconPack   | IconPack1                                | ❌        | defaultIconPack | Icon pack             |
| t          | RtkI18n1                                 | ❌        | useLanguage()   | Language              |

## Usage Examples

### Basic Usage

```tsx
import { RtkDraftAttachmentView } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkDraftAttachmentView />;
}
```

### With Properties

```tsx
import { RtkDraftAttachmentView } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkDraftAttachmentView
      attachment={{}}
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkdraftattachmentview/#page","headline":"RtkDraftAttachmentView · Cloudflare Realtime docs","description":"API reference for RtkDraftAttachmentView component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkdraftattachmentview/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
