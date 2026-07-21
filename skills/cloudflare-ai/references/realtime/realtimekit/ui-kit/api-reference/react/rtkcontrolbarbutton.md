---
description: API reference for RtkControlbarButton component (React Library)
title: RtkControlbarButton
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkControlbarButton

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkcontrolbarbutton/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A skeleton component used for composing custom controlbar buttons.

## Properties

| Property    | Type               | Required | Default         | Description                                                    |
| ----------- | ------------------ | -------- | --------------- | -------------------------------------------------------------- |
| brandIcon   | boolean            | ✅        | \-              | Whether icon requires brand color                              |
| disabled    | boolean            | ✅        | \-              | Whether button is disabled                                     |
| icon        | string             | ✅        | \-              | Icon                                                           |
| iconPack    | IconPack           | ❌        | defaultIconPack | Icon pack                                                      |
| isLoading   | boolean            | ✅        | \-              | Loading state Ignores current icon and shows a spinner if true |
| label       | string             | ✅        | \-              | Label of button                                                |
| showWarning | boolean            | ✅        | \-              | Whether to show warning icon                                   |
| size        | Size               | ✅        | \-              | Size                                                           |
| variant     | ControlBarVariant1 | ✅        | \-              | Variant                                                        |

## Usage Examples

### Basic Usage

```tsx
import { RtkControlbarButton } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkControlbarButton />;
}
```

### With Properties

```tsx
import { RtkControlbarButton } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkControlbarButton
      brandIcon={true}
      disabled={true}
      icon="example"
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkcontrolbarbutton/#page","headline":"RtkControlbarButton · Cloudflare Realtime docs","description":"API reference for RtkControlbarButton component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkcontrolbarbutton/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
