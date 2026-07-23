---
description: API reference for RtkWebinarStageToggle component (React Native Library)
title: RtkWebinarStageToggle
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkWebinarStageToggle

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkwebinarstagetoggle/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Toggle button for requesting to join or leave the webinar stage. Only visible in webinar mode for participants with stage access permissions.

## Properties

| Property | Type                     | Required | Default  | Description                      |      |              |
| -------- | ------------------------ | -------- | -------- | -------------------------------- | ---- | ------------ |
| meeting  | RealtimeKitClient        | ✅        | \-       | The RealtimeKit meeting instance |      |              |
| iconPack | IconPack                 | ❌        | \-       | Custom icon pack                 |      |              |
| size     | 'lg' \| 'md'             | 'sm'     | 'xl'     | ❌                                | 'sm' | Size variant |
| variant  | 'button' \| 'horizontal' | ❌        | 'button' | Layout variant                   |      |              |
| t        | RtkI18n                  | ❌        | \-       | i18n translation function        |      |              |

## Usage Examples

### Basic Usage

```tsx
import { RtkWebinarStageToggle } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkWebinarStageToggle meeting={meeting} />;
}
```

### With Properties

```tsx
import { RtkWebinarStageToggle } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkWebinarStageToggle meeting={meeting} size="md" variant="button" />;
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkwebinarstagetoggle/#page","headline":"RtkWebinarStageToggle · Cloudflare Realtime docs","description":"API reference for RtkWebinarStageToggle component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkwebinarstagetoggle/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
