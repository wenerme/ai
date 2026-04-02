---
title: rtk-tooltip
description: API reference for rtk-tooltip component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/angular/rtk-tooltip.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# rtk-tooltip

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

```

<!-- component.html -->

<rtk-tooltip></rtk-tooltip>


```

### With Properties

```

<!-- component.html -->

<rtk-tooltip

 delay="42"

 [disabled]="true"

 [kind]="tooltipkind">

</rtk-tooltip>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-tooltip/","name":"rtk-tooltip"}}]}
```
