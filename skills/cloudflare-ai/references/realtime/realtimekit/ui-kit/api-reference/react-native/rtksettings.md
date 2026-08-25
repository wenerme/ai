---
description: API reference for RtkSettings component (React Native Library)
title: RtkSettings
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkSettings

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtksettings/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Settings dialog with audio device selection, video device selection, and network connection status.

## Properties

| Property | Type              | Required | Default         | Description                           |      |              |
| -------- | ----------------- | -------- | --------------- | ------------------------------------- | ---- | ------------ |
| meeting  | RealtimeKitClient | ✅        | \-              | The RealtimeKit meeting instance      |      |              |
| size     | 'lg' \| 'md'      | 'sm'     | 'xl'            | ❌                                     | 'sm' | Size variant |
| states   | States            | ❌        | \-              | UI state object                       |      |              |
| iconPack | IconPack          | ❌        | defaultIconPack | Custom icon pack                      |      |              |
| t        | RtkI18n           | ❌        | \-              | i18n translation function             |      |              |
| onClose  | any               | ❌        | \-              | Callback to close the settings dialog |      |              |

## Usage Examples

### Basic Usage

```tsx
import { RtkSettings } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkSettings meeting={meeting} />;
}
```

### With Properties

```tsx
import { RtkSettings } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return (
		<RtkSettings
			meeting={meeting}
			size="md"
			onClose={() => setSettingsOpen(false)}
		/>
	);
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtksettings/#page","headline":"RtkSettings · Cloudflare Realtime docs","description":"API reference for RtkSettings component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtksettings/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
