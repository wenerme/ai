---
description: API reference for RtkPoll component (React Native Library)
title: RtkPoll
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkPoll

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkpoll/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Renders a single poll with question, votable options, vote counts, and voter avatars.

## Properties

| Property      | Type              | Required | Default         | Description                                          |
| ------------- | ----------------- | -------- | --------------- | ---------------------------------------------------- |
| poll          | Poll              | ✅        | \-              | The poll object to display                           |
| meeting       | RealtimeKitClient | ✅        | \-              | The RealtimeKit meeting instance                     |
| onRtkVotePoll | any               | ❌        | \-              | Callback when a vote is cast (receives option index) |
| self          | string            | ❌        | \-              | Self user ID                                         |
| iconPack      | IconPack          | ❌        | defaultIconPack | Custom icon pack                                     |
| t             | RtkI18n           | ❌        | \-              | i18n translation function                            |

## Usage Examples

### Basic Usage

```tsx
import { RtkPoll } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkPoll poll={poll} meeting={meeting} />;
}
```

### With Properties

```tsx
import { RtkPoll } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return (
		<RtkPoll
			poll={poll}
			meeting={meeting}
			onRtkVotePoll={(index) => handleVote(index)}
			self={selfUserId}
		/>
	);
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkpoll/#page","headline":"RtkPoll · Cloudflare Realtime docs","description":"API reference for RtkPoll component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkpoll/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
