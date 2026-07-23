---
description: API reference for rtk-button component (Angular Library)
title: rtk-button
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-button

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-button/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A button that follows RTK Design System.

## Properties

| Property | Type                        | Required | Default | Description                          |
| -------- | --------------------------- | -------- | ------- | ------------------------------------ |
| disabled | boolean                     | ✅        | \-      | Where the button is disabled or not  |
| kind     | ButtonKind                  | ✅        | \-      | Button type                          |
| reverse  | boolean                     | ✅        | \-      | Whether to reverse order of children |
| size     | Size                        | ✅        | \-      | Size                                 |
| type     | HTMLButtonElement\['type'\] | ✅        | \-      | Button type                          |
| variant  | ButtonVariant               | ✅        | \-      | Button variant                       |

## Usage Examples

### Basic Usage

```html
<!-- component.html -->
<rtk-button></rtk-button>
```

### With Properties

```html
<!-- component.html -->
<rtk-button
 [disabled]="true"
 [kind]="buttonkind"
 [reverse]="true">
</rtk-button>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-button/#page","headline":"rtk-button · Cloudflare Realtime docs","description":"API reference for rtk-button component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-button/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
