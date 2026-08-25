---
description: API reference for rtk-meeting component (Angular Library)
title: rtk-meeting
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-meeting

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-meeting/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A single component which renders an entire meeting UI. It loads your preset and renders the UI based on it. With this component, you don't have to handle all the states, dialogs and other smaller bits of managing the application.

## Properties

| Property             | Type        | Required | Default          | Description                                                         |
| -------------------- | ----------- | -------- | ---------------- | ------------------------------------------------------------------- |
| applyDesignSystem    | boolean     | ✅        | \-               | Whether to apply the design system on the document root from config |
| config               | UIConfig    | ✅        | \-               | UI Config                                                           |
| gridLayout           | GridLayout1 | ✅        | \-               | Grid layout                                                         |
| iconPack             | IconPack    | ❌        | defaultIconPack  | Icon pack                                                           |
| leaveOnUnmount       | boolean     | ✅        | \-               | Whether participant should leave when this component gets unmounted |
| loadConfigFromPreset | boolean     | ✅        | \-               | Whether to load config from preset                                  |
| meeting              | Meeting     | ✅        | \-               | Meeting object                                                      |
| mode                 | MeetingMode | ✅        | \-               | Fill type                                                           |
| overrides            | Overrides   | ❌        | defaultOverrides | UI Kit Overrides                                                    |
| showSetupScreen      | boolean     | ✅        | \-               | Whether to show setup screen or not                                 |
| size                 | Size        | ✅        | \-               | Size                                                                |
| t                    | RtkI18n     | ❌        | useLanguage()    | Language                                                            |

## Usage Examples

### Basic Usage

```html
<!-- component.html -->
<rtk-meeting></rtk-meeting>
```

### With Properties

```html
<!-- component.html -->
<rtk-meeting
 [applyDesignSystem]="true"
 [config]="defaultUiConfig"
 [gridLayout]="gridlayout1">
</rtk-meeting>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-meeting/#page","headline":"rtk-meeting · Cloudflare Realtime docs","description":"API reference for rtk-meeting component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-meeting/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
