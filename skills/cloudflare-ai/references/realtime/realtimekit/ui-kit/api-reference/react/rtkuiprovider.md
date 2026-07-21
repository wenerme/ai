---
description: API reference for RtkUiProvider component (React Library)
title: RtkUiProvider
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkUiProvider

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkuiprovider/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Properties

| Property        | Type            | Required | Default          | Description                         |
| --------------- | --------------- | -------- | ---------------- | ----------------------------------- |
| config          | UIConfig1       | ✅        | \-               | Config                              |
| iconPack        | IconPack1       | ❌        | defaultIconPack  | Icon pack                           |
| meeting         | Meeting \| null | ❌        | null             | Meeting                             |
| mode            | MeetingMode1    | ✅        | \-               | Fill type                           |
| overrides       | Overrides1      | ❌        | defaultOverrides | UI Kit Overrides                    |
| showSetupScreen | boolean         | ✅        | \-               | Whether to show setup screen or not |
| t               | RtkI18n1        | ❌        | useLanguage()    | Language utility                    |

## Usage Examples

### Basic Usage

```tsx
import { RtkUiProvider } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkUiProvider />;
}
```

### With Properties

```tsx
import { RtkUiProvider } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkUiProvider
      config={defaultUiConfig}
      mode={meeting}
      showSetupScreen={true}
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkuiprovider/#page","headline":"RtkUiProvider · Cloudflare Realtime docs","description":"API reference for RtkUiProvider component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkuiprovider/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
