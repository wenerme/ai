---
description: API reference for RtkAudioVisualizer component (React Native Library)
title: RtkAudioVisualizer
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkAudioVisualizer

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkaudiovisualizer/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Displays an audio visualizer with animated bars representing a participant's audio levels.

## Properties

| Property      | Type                   | Required | Default         | Description                                    |      |                        |
| ------------- | ---------------------- | -------- | --------------- | ---------------------------------------------- | ---- | ---------------------- |
| participant   | Peer \| RTKParticipant | ✅        | \-              | The participant whose audio to visualize       |      |                        |
| iconPack      | IconPack               | ❌        | defaultIconPack | Custom icon pack for icons                     |      |                        |
| isScreenshare | boolean                | ❌        | false           | Whether this is a screenshare audio visualizer |      |                        |
| size          | 'lg' \| 'md'           | 'sm'     | 'xl'            | ❌                                              | 'sm' | Size of the visualizer |
| variant       | 'bar'                  | ❌        | 'bar'           | Visual variant of the visualizer               |      |                        |

## Usage Examples

### Basic Usage

```tsx
import { RtkAudioVisualizer } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkAudioVisualizer participant={participant} />;
}
```

### With Properties

```tsx
import { RtkAudioVisualizer } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return (
		<RtkAudioVisualizer participant={participant} size="md" variant="bar" />
	);
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkaudiovisualizer/#page","headline":"RtkAudioVisualizer · Cloudflare Realtime docs","description":"API reference for RtkAudioVisualizer component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkaudiovisualizer/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
