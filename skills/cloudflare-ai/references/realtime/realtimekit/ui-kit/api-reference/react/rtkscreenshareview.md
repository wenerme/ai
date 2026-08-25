---
description: API reference for RtkScreenshareView component (React Library)
title: RtkScreenshareView
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkScreenshareView

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkscreenshareview/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A component which plays a participant's screenshared video. It also allows for placement of other components similar to `rtk-participant-tile`. This component will not render anything if the participant hasn't start screensharing.

## Properties

| Property             | Type                  | Required       | Default         | Description             |             |              |   |    |                      |
| -------------------- | --------------------- | -------------- | --------------- | ----------------------- | ----------- | ------------ | - | -- | -------------------- |
| hideFullScreenButton | boolean               | ✅              | \-              | Hide full screen button |             |              |   |    |                      |
| iconPack             | IconPack              | ❌              | defaultIconPack | Icon pack               |             |              |   |    |                      |
| meeting              | Meeting               | ✅              | \-              | Meeting object          |             |              |   |    |                      |
| nameTagPosition      | \| 'bottom-left'      | 'bottom-right' | 'bottom-center' | 'top-left'              | 'top-right' | 'top-center' | ✅ | \- | Position of name tag |
| participant          | Peer                  | ✅              | \-              | Participant object      |             |              |   |    |                      |
| size                 | Size                  | ✅              | \-              | Size                    |             |              |   |    |                      |
| t                    | RtkI18n               | ❌              | useLanguage()   | Language                |             |              |   |    |                      |
| variant              | 'solid' \| 'gradient' | ✅              | \-              | Variant                 |             |              |   |    |                      |

## Usage Examples

### Basic Usage

```tsx
import { RtkScreenshareView } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkScreenshareView />;
}
```

### With Properties

```tsx
import { RtkScreenshareView } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkScreenshareView
      hideFullScreenButton={true}
      meeting={meeting}
      nameTagPosition={| 'bottom-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'top-left'
    | 'top-right'
    | 'top-center'}
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkscreenshareview/#page","headline":"RtkScreenshareView · Cloudflare Realtime docs","description":"API reference for RtkScreenshareView component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkscreenshareview/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
