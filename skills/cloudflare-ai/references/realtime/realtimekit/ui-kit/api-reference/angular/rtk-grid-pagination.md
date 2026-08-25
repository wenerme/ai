---
description: API reference for rtk-grid-pagination component (Angular Library)
title: rtk-grid-pagination
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-grid-pagination

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-grid-pagination/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A component which allows you to change current page and view mode of active participants list. This is reflected in the `rtk-grid` component.

## Properties

| Property | Type                   | Required | Default         | Description    |
| -------- | ---------------------- | -------- | --------------- | -------------- |
| iconPack | IconPack               | ❌        | defaultIconPack | Icon Pack      |
| meeting  | Meeting                | ✅        | \-              | Meeting object |
| size     | Size                   | ✅        | \-              | Size Prop      |
| states   | States                 | ✅        | \-              | States         |
| t        | RtkI18n                | ❌        | useLanguage()   | Language       |
| variant  | GridPaginationVariants | ✅        | \-              | Variant        |

## Usage Examples

### Basic Usage

```html
<!-- component.html -->
<rtk-grid-pagination></rtk-grid-pagination>
```

### With Properties

```html
<!-- component.html -->
<rtk-grid-pagination
 [meeting]="meeting"
 size="md"
 [variant]="gridpaginationvariants">
</rtk-grid-pagination>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-grid-pagination/#page","headline":"rtk-grid-pagination · Cloudflare Realtime docs","description":"API reference for rtk-grid-pagination component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-grid-pagination/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
