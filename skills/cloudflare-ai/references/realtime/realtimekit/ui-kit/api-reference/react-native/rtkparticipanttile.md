---
description: API reference for RtkParticipantTile component (React Native Library)
title: RtkParticipantTile
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkParticipantTile

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkparticipanttile/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A video tile for a single participant showing their video feed, name tag with audio indicator, avatar (when video is off), and pin indicator.

## Properties

| Property        | Type                             | Required       | Default         | Description                                            |             |              |   |               |                                  |
| --------------- | -------------------------------- | -------------- | --------------- | ------------------------------------------------------ | ----------- | ------------ | - | ------------- | -------------------------------- |
| meeting         | RealtimeKitClient                | ✅              | \-              | The RealtimeKit meeting instance                       |             |              |   |               |                                  |
| participant     | RTKParticipant \| RTKSelf        | ✅              | \-              | The participant to render                              |             |              |   |               |                                  |
| config          | UIConfig                         | ❌              | defaultConfig   | UI configuration object                                |             |              |   |               |                                  |
| style           | StyleProp<any>                   | ❌              | \-              | Custom styles (typically width/height for grid sizing) |             |              |   |               |                                  |
| nameTagPosition | 'bottom-center' \| 'bottom-left' | 'bottom-right' | 'top-center'    | 'top-left'                                             | 'top-right' | 'none'       | ❌ | 'bottom-left' | Position of the name tag overlay |
| isPreview       | boolean                          | ❌              | false           | Whether this is a preview tile (setup screen)          |             |              |   |               |                                  |
| iconPack        | IconPack                         | ❌              | defaultIconPack | Custom icon pack                                       |             |              |   |               |                                  |
| size            | 'lg' \| 'md'                     | 'sm'           | 'xl'            | ❌                                                      | 'sm'        | Size variant |   |               |                                  |
| states          | States                           | ❌              | \-              | UI state object                                        |             |              |   |               |                                  |
| t               | RtkI18n                          | ❌              | \-              | i18n translation function                              |             |              |   |               |                                  |
| children        | ReactNode                        | ❌              | \-              | Additional content to overlay on the tile              |             |              |   |               |                                  |

## Usage Examples

### Basic Usage

```tsx
import { RtkParticipantTile } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkParticipantTile meeting={meeting} participant={participant} />;
}
```

### With Properties

```tsx
import { RtkParticipantTile } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return (
		<RtkParticipantTile
			meeting={meeting}
			participant={participant}
			nameTagPosition="bottom-left"
			isPreview={false}
			size="md"
		/>
	);
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkparticipanttile/#page","headline":"RtkParticipantTile · Cloudflare Realtime docs","description":"API reference for RtkParticipantTile component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkparticipanttile/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
