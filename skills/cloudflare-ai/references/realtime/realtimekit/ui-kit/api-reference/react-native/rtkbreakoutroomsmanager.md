---
description: API reference for RtkBreakoutRoomsManager component (React Native Library)
title: RtkBreakoutRoomsManager
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkBreakoutRoomsManager

Last updated Jul 9, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkbreakoutroomsmanager/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Full-screen modal for managing breakout rooms. Hosts can create rooms, assign participants, rename rooms, shuffle participants randomly, and start, update, or close a breakout session. Participants without alter permissions see a simplified room-switcher view instead.

The component is visibility-controlled by the `activeBreakoutRoomsManager` field in the UI state. Use `RtkBreakoutRoomsToggle` to open it, or set the state directly.

## Properties

| Property | Type              | Required | Default         | Description                      |
| -------- | ----------------- | -------- | --------------- | -------------------------------- |
| meeting  | RealtimeKitClient | ✅        | \-              | The RealtimeKit meeting instance |
| iconPack | IconPack          | ❌        | defaultIconPack | Custom icon pack                 |
| t        | RtkI18n           | ❌        | \-              | i18n translation function        |
| states   | States            | ❌        | \-              | UI state object                  |

## Usage Examples

### Basic Usage

```tsx
import { RtkBreakoutRoomsManager } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkBreakoutRoomsManager meeting={meeting} />;
}
```

### With Custom Icon Pack

```tsx
import { RtkBreakoutRoomsManager } from "@cloudflare/realtimekit-react-native-ui";
import { myIconPack } from "./icons";

function MyComponent() {
	return <RtkBreakoutRoomsManager meeting={meeting} iconPack={myIconPack} />;
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkbreakoutroomsmanager/#page","headline":"RtkBreakoutRoomsManager · Cloudflare Realtime docs","description":"API reference for RtkBreakoutRoomsManager component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkbreakoutroomsmanager/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
