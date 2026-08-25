---
description: API reference for RtkTabBar component (React Library)
title: RtkTabBar
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkTabBar

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtktabbar/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Properties

| Property  | Type        | Required | Default               | Description    |
| --------- | ----------- | -------- | --------------------- | -------------- |
| activeTab | Tab         | ✅        | \-                    | Active tab     |
| config    | UIConfig    | ❌        | createDefaultConfig() | UI Config      |
| iconPack  | IconPack    | ❌        | defaultIconPack       | Icon Pack      |
| layout    | GridLayout1 | ✅        | \-                    | Grid Layout    |
| meeting   | Meeting     | ✅        | \-                    | Meeting object |
| size      | Size        | ✅        | \-                    | Size           |
| states    | States      | ✅        | \-                    | States object  |
| t         | RtkI18n     | ❌        | useLanguage()         | Language       |
| tabs      | Tab\[\]     | ✅        | \-                    | Tabs           |

## Usage Examples

### Basic Usage

```tsx
import { RtkTabBar } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkTabBar />;
}
```

### With Properties

```tsx
import { RtkTabBar } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkTabBar
      activeTab={tab}
      layout={gridlayout1}
      meeting={meeting}
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtktabbar/#page","headline":"RtkTabBar · Cloudflare Realtime docs","description":"API reference for RtkTabBar component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtktabbar/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
