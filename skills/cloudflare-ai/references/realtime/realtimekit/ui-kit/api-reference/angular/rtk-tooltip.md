---
description: API reference for rtk-tooltip component (Angular Library)
title: rtk-tooltip
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-tooltip

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-tooltip/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Tooltip component which follows RTK Design System.

## Properties

| Property  | Type           | Required | Default | Description                      |
| --------- | -------------- | -------- | ------- | -------------------------------- |
| delay     | number         | ✅        | \-      | Delay before showing the tooltip |
| disabled  | boolean        | ✅        | \-      | Disabled                         |
| kind      | TooltipKind    | ✅        | \-      | Tooltip kind                     |
| label     | string         | ✅        | \-      | Tooltip label                    |
| open      | boolean        | ✅        | \-      | Open                             |
| placement | Placement      | ✅        | \-      | Placement of menu                |
| size      | Size           | ✅        | \-      | Size                             |
| variant   | TooltipVariant | ✅        | \-      | Tooltip variant                  |

## Usage Examples

### Basic Usage

```html
<!-- component.html -->
<rtk-tooltip></rtk-tooltip>
```

### With Properties

```html
<!-- component.html -->
<rtk-tooltip
 delay="42"
 [disabled]="true"
 [kind]="tooltipkind">
</rtk-tooltip>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-tooltip/#page","headline":"rtk-tooltip · Cloudflare Realtime docs","description":"API reference for rtk-tooltip component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-tooltip/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
