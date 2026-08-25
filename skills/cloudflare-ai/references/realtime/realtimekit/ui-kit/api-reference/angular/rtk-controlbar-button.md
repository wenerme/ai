---
description: API reference for rtk-controlbar-button component (Angular Library)
title: rtk-controlbar-button
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-controlbar-button

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-controlbar-button/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A skeleton component used for composing custom controlbar buttons.

## Properties

| Property    | Type               | Required | Default         | Description                                                    |
| ----------- | ------------------ | -------- | --------------- | -------------------------------------------------------------- |
| brandIcon   | boolean            | ✅        | \-              | Whether icon requires brand color                              |
| disabled    | boolean            | ✅        | \-              | Whether button is disabled                                     |
| icon        | string             | ✅        | \-              | Icon                                                           |
| iconPack    | IconPack           | ❌        | defaultIconPack | Icon pack                                                      |
| isLoading   | boolean            | ✅        | \-              | Loading state Ignores current icon and shows a spinner if true |
| label       | string             | ✅        | \-              | Label of button                                                |
| showWarning | boolean            | ✅        | \-              | Whether to show warning icon                                   |
| size        | Size               | ✅        | \-              | Size                                                           |
| variant     | ControlBarVariant1 | ✅        | \-              | Variant                                                        |

## Usage Examples

### Basic Usage

```html
<!-- component.html -->
<rtk-controlbar-button></rtk-controlbar-button>
```

### With Properties

```html
<!-- component.html -->
<rtk-controlbar-button
 [brandIcon]="true"
 [disabled]="true"
 icon="example">
</rtk-controlbar-button>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-controlbar-button/#page","headline":"rtk-controlbar-button · Cloudflare Realtime docs","description":"API reference for rtk-controlbar-button component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-controlbar-button/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
