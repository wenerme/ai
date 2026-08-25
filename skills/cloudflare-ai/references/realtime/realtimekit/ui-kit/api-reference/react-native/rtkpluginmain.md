---
description: API reference for RtkPluginMain component (React Native Library)
title: RtkPluginMain
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkPluginMain

Last updated Jul 9, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkpluginmain/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Renders an active plugin by loading `plugin.component.src` in a `WebView`. Includes a header bar with the plugin name, a fullscreen toggle, and an optional close button (shown when `plugin.permissions.canDeactivate` is `true`). Pressing close calls `plugin.deactivate()`.

## Properties

| Property | Type              | Required | Default         | Description                      |
| -------- | ----------------- | -------- | --------------- | -------------------------------- |
| meeting  | RealtimeKitClient | ✅        | \-              | The RealtimeKit meeting instance |
| plugin   | RTKPlugin         | ✅        | \-              | The plugin to render             |
| iconPack | IconPack          | ❌        | defaultIconPack | Custom icon pack                 |

## Usage Examples

### Basic Usage

```tsx
import { RtkPluginMain } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkPluginMain meeting={meeting} plugin={activePlugin} />;
}
```

### With Properties

```tsx
import { RtkPluginMain } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return (
		<RtkPluginMain
			meeting={meeting}
			plugin={activePlugin}
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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkpluginmain/#page","headline":"RtkPluginMain · Cloudflare Realtime docs","description":"API reference for RtkPluginMain component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkpluginmain/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-09","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
