---
description: API reference for RtkBreakoutRoomsToggle component (React Native Library)
title: RtkBreakoutRoomsToggle
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkBreakoutRoomsToggle

Last updated Jul 9, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkbreakoutroomstoggle/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Control bar button that opens and closes the `RtkBreakoutRoomsManager`. Automatically hides if the local participant has neither `canAlterConnectedMeetings` nor `canSwitchConnectedMeetings` permission.

## Properties

| Property | Type              | Required | Default         | Description                      |    |           |
| -------- | ----------------- | -------- | --------------- | -------------------------------- | -- | --------- |
| meeting  | RealtimeKitClient | ✅        | \-              | The RealtimeKit meeting instance |    |           |
| size     | 'lg' \| 'md'      | 'sm'     | 'xl'            | ❌                                | \- | Icon size |
| iconPack | IconPack          | ❌        | defaultIconPack | Custom icon pack                 |    |           |
| t        | RtkI18n           | ❌        | \-              | i18n translation function        |    |           |

## Usage Examples

### Basic Usage

```tsx
import { RtkBreakoutRoomsToggle } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkBreakoutRoomsToggle meeting={meeting} />;
}
```

### With Size

```tsx
import { RtkBreakoutRoomsToggle } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkBreakoutRoomsToggle meeting={meeting} size="md" />;
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkbreakoutroomstoggle/#page","headline":"RtkBreakoutRoomsToggle · Cloudflare Realtime docs","description":"API reference for RtkBreakoutRoomsToggle component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkbreakoutroomstoggle/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
