---
description: API reference for RtkMeeting component (React Library)
title: RtkMeeting
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkMeeting

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkmeeting/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A single component which renders an entire meeting UI. It loads your preset and renders the UI based on it. With this component, you don't have to handle all the states, dialogs and other smaller bits of managing the application.

## Properties

| Property             | Type        | Required | Default          | Description                                                         |
| -------------------- | ----------- | -------- | ---------------- | ------------------------------------------------------------------- |
| applyDesignSystem    | boolean     | ✅        | \-               | Whether to apply the design system on the document root from config |
| config               | UIConfig    | ✅        | \-               | UI Config                                                           |
| gridLayout           | GridLayout1 | ✅        | \-               | Grid layout                                                         |
| iconPack             | IconPack    | ❌        | defaultIconPack  | Icon pack                                                           |
| leaveOnUnmount       | boolean     | ✅        | \-               | Whether participant should leave when this component gets unmounted |
| loadConfigFromPreset | boolean     | ✅        | \-               | Whether to load config from preset                                  |
| meeting              | Meeting     | ✅        | \-               | Meeting object                                                      |
| mode                 | MeetingMode | ✅        | \-               | Fill type                                                           |
| overrides            | Overrides   | ❌        | defaultOverrides | UI Kit Overrides                                                    |
| showSetupScreen      | boolean     | ✅        | \-               | Whether to show setup screen or not                                 |
| size                 | Size        | ✅        | \-               | Size                                                                |
| t                    | RtkI18n     | ❌        | useLanguage()    | Language                                                            |

## Usage Examples

### Basic Usage

```tsx
import { RtkMeeting } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkMeeting />;
}
```

### With Properties

```tsx
import { RtkMeeting } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkMeeting
      applyDesignSystem={true}
      config={defaultUiConfig}
      gridLayout={gridlayout1}
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkmeeting/#page","headline":"RtkMeeting · Cloudflare Realtime docs","description":"API reference for RtkMeeting component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkmeeting/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
