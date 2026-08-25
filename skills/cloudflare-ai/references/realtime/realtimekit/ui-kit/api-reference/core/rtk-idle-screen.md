---
description: API reference for rtk-idle-screen component (Web Components (HTML) Library)
title: rtk-idle-screen
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-idle-screen

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-idle-screen/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A screen that handles the idle state, i.e; when you are waiting for data about the meeting, specifically the `meeting` object.

## Properties

| Property | Type     | Required | Default               | Description   |
| -------- | -------- | -------- | --------------------- | ------------- |
| config   | UIConfig | ❌        | createDefaultConfig() | Config object |
| iconPack | IconPack | ❌        | defaultIconPack       | Icon pack     |
| meeting  | Meeting  | ✅        | \-                    | Meeting       |
| t        | RtkI18n  | ❌        | useLanguage()         | Language      |

## Usage Examples

### Basic Usage

```html
<rtk-idle-screen></rtk-idle-screen>
```

### With Properties

```html
<rtk-idle-screen>
</rtk-idle-screen>
```

```html
<script>
  const el = document.querySelector("rtk-idle-screen");

  el.meeting= meeting
</script>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-idle-screen/#page","headline":"rtk-idle-screen · Cloudflare Realtime docs","description":"API reference for rtk-idle-screen component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-idle-screen/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
