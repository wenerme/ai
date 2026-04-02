---
title: rtk-button
description: API reference for rtk-button component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/angular/rtk-button.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# rtk-button

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

```

<!-- component.html -->

<rtk-button></rtk-button>


```

### With Properties

```

<!-- component.html -->

<rtk-button

 [disabled]="true"

 [kind]="buttonkind"

 [reverse]="true">

</rtk-button>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-button/","name":"rtk-button"}}]}
```
