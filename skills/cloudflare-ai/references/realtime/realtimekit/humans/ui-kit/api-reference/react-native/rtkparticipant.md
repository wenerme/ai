---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: API reference for RtkParticipant component (React Native Library)
title: RtkParticipant
image: https://developers.cloudflare.com/realtime/realtimekit/humans/ui-kit/api-reference/react-native/rtkparticipant/og.png?v=02ad94acb9e49702
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkParticipant

A participant list item card showing avatar, name, audio/video status icons, and host control options (pin, kick, mute, stage management).

## Properties

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `participant` | `Peer` | ✅ | - | The participant to display |
| `meeting` | `RealtimeKitClient` | ❌ | - | The RealtimeKit meeting instance |
| `iconPack` | `IconPack` | ❌ | `defaultIconPack` | Custom icon pack |
| `t` | `RtkI18n` | ❌ | - | i18n translation function |

## Usage Examples

### Basic Usage

```tsx
import { RtkParticipant } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkParticipant participant={participant} />;
}
```

### With Properties

```tsx
import { RtkParticipant } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return (
		<RtkParticipant
			participant={participant}
			meeting={meeting}
			iconPack={customIconPack}
		/>
	);
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/humans/ui-kit/api-reference/react-native/rtkparticipant/#page","headline":"RtkParticipant","description":"API reference for RtkParticipant component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/humans/ui-kit/api-reference/react-native/rtkparticipant/","inLanguage":"en","image":"https://developers.cloudflare.com/realtime/realtimekit/humans/ui-kit/api-reference/react-native/rtkparticipant/og.png?v=02ad94acb9e49702","dateModified":"2026-10-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
