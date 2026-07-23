---
description: API reference for RtkParticipantWaiting component (React Native Library)
title: RtkParticipantWaiting
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkParticipantWaiting

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkparticipantwaiting/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A waiting participant card with accept/reject buttons for waitlist and stage request management.

## Properties

| Property    | Type              | Required | Default         | Description                      |
| ----------- | ----------------- | -------- | --------------- | -------------------------------- |
| participant | Peer              | ✅        | \-              | The waiting participant          |
| meeting     | RealtimeKitClient | ❌        | \-              | The RealtimeKit meeting instance |
| iconPack    | IconPack          | ❌        | defaultIconPack | Custom icon pack                 |
| t           | RtkI18n           | ❌        | \-              | i18n translation function        |

## Usage Examples

### Basic Usage

```tsx
import { RtkParticipantWaiting } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkParticipantWaiting participant={waitingParticipant} />;
}
```

### With Properties

```tsx
import { RtkParticipantWaiting } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return (
		<RtkParticipantWaiting
			participant={waitingParticipant}
			meeting={meeting}
			iconPack={customIconPack}
		/>
	);
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkparticipantwaiting/#page","headline":"RtkParticipantWaiting · Cloudflare Realtime docs","description":"API reference for RtkParticipantWaiting component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkparticipantwaiting/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
