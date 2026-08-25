---
description: API reference for rtk-paginated-list component (Angular Library)
title: rtk-paginated-list
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-paginated-list

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-paginated-list/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Properties

| Property       | Type                                                 | Required | Default         | Description                                    |
| -------------- | ---------------------------------------------------- | -------- | --------------- | ---------------------------------------------- |
| autoScroll     | boolean                                              | ✅        | \-              | auto scroll list to bottom                     |
| createNodes    | (data: unknown\[\])                                  | ✅        | \-              | Create nodes                                   |
| emptyListLabel | string                                               | ✅        | \-              | label to show when empty                       |
| fetchData      | (timestamp: number, size: number, reversed: boolean) | ✅        | \-              | Fetch the data                                 |
| iconPack       | IconPack                                             | ❌        | defaultIconPack | Icon pack                                      |
| pageSize       | number                                               | ✅        | \-              | Page Size                                      |
| pagesAllowed   | number                                               | ✅        | \-              | Number of pages allowed to be shown            |
| rerenderList   | ()                                                   | ✅        | \-              | Rerender paginated list                        |
| reset          | (timestamp?: number)                                 | ❌        | \-              | Resets the paginated list to a given timestamp |
| t              | RtkI18n                                              | ❌        | useLanguage()   | Language                                       |

## Usage Examples

### Basic Usage

```html
<!-- component.html -->
<rtk-paginated-list></rtk-paginated-list>
```

### With Properties

```html
<!-- component.html -->
<rtk-paginated-list
 [autoScroll]="true"
 [createNodes]="[]"
 emptyListLabel="example">
</rtk-paginated-list>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-paginated-list/#page","headline":"rtk-paginated-list · Cloudflare Realtime docs","description":"API reference for rtk-paginated-list component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-paginated-list/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
