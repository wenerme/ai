---
description: API reference for RtkPluginsToggle component (React Native Library)
title: RtkPluginsToggle
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkPluginsToggle

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkpluginstoggle/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Toggle button to open the plugins sidebar panel. Hides if plugin permissions are not available.

## Properties

| Property | Type                     | Required | Default         | Description                      |    |           |
| -------- | ------------------------ | -------- | --------------- | -------------------------------- | -- | --------- |
| meeting  | RealtimeKitClient        | ✅        | \-              | The RealtimeKit meeting instance |    |           |
| size     | 'lg' \| 'md'             | 'sm'     | 'xl'            | ❌                                | \- | Icon size |
| states   | States                   | ❌        | \-              | UI state object                  |    |           |
| variant  | 'button' \| 'horizontal' | ❌        | \-              | Layout variant                   |    |           |
| iconPack | IconPack                 | ❌        | defaultIconPack | Custom icon pack                 |    |           |
| t        | RtkI18n                  | ❌        | \-              | i18n translation function        |    |           |

## Usage Examples

### Basic Usage

```tsx
import { RtkPluginsToggle } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkPluginsToggle meeting={meeting} />;
}
```

### With Properties

```tsx
import { RtkPluginsToggle } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkPluginsToggle meeting={meeting} size="md" variant="button" />;
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkpluginstoggle/#page","headline":"RtkPluginsToggle · Cloudflare Realtime docs","description":"API reference for RtkPluginsToggle component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkpluginstoggle/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
