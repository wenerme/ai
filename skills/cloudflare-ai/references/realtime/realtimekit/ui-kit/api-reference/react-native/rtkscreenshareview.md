---
description: API reference for RtkScreenshareView component (React Native Library)
title: RtkScreenshareView
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkScreenshareView

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkscreenshareview/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Renders a participant's screen share with fullscreen toggle, name tag, and audio indicator.

## Properties

| Property             | Type                             | Required       | Default         | Description                          |             |              |               |                                  |
| -------------------- | -------------------------------- | -------------- | --------------- | ------------------------------------ | ----------- | ------------ | ------------- | -------------------------------- |
| participant          | RTKParticipant                   | ✅              | \-              | The participant sharing their screen |             |              |               |                                  |
| meeting              | RealtimeKitClient                | ✅              | \-              | The RealtimeKit meeting instance     |             |              |               |                                  |
| hideFullScreenButton | boolean                          | ❌              | false           | Hide the fullscreen toggle button    |             |              |               |                                  |
| iconPack             | IconPack                         | ❌              | defaultIconPack | Custom icon pack                     |             |              |               |                                  |
| nameTagPosition      | 'bottom-center' \| 'bottom-left' | 'bottom-right' | 'top-center'    | 'top-left'                           | 'top-right' | ❌            | 'bottom-left' | Position of the name tag overlay |
| size                 | 'lg' \| 'md'                     | 'sm'           | 'xl'            | ❌                                    | 'sm'        | Size variant |               |                                  |
| variant              | 'gradient' \| 'solid'            | ❌              | 'solid'         | Visual style variant                 |             |              |               |                                  |
| t                    | RtkI18n                          | ❌              | \-              | i18n translation function            |             |              |               |                                  |

## Usage Examples

### Basic Usage

```tsx
import { RtkScreenshareView } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkScreenshareView participant={participant} meeting={meeting} />;
}
```

### With Properties

```tsx
import { RtkScreenshareView } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return (
		<RtkScreenshareView
			participant={participant}
			meeting={meeting}
			nameTagPosition="bottom-left"
			variant="solid"
			size="md"
		/>
	);
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkscreenshareview/#page","headline":"RtkScreenshareView · Cloudflare Realtime docs","description":"API reference for RtkScreenshareView component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkscreenshareview/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
