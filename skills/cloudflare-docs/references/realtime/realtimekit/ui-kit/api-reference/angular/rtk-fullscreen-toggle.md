---
title: rtk-fullscreen-toggle
description: API reference for rtk-fullscreen-toggle component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/angular/rtk-fullscreen-toggle.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# rtk-fullscreen-toggle

A button which toggles full screen mode for any existing `rtk-meeting` component in the DOM.

## Properties

| Property      | Type              | Required | Default         | Description                  |
| ------------- | ----------------- | -------- | --------------- | ---------------------------- |
| iconPack      | IconPack          | ❌        | defaultIconPack | Icon pack                    |
| size          | Size              | ✅        | \-              | Size                         |
| states        | States            | ✅        | \-              | States object                |
| t             | RtkI18n           | ❌        | useLanguage()   | Language                     |
| targetElement | HTMLElement       | ✅        | \-              | Target Element to fullscreen |
| variant       | ControlBarVariant | ✅        | \-              | Variant                      |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-fullscreen-toggle></rtk-fullscreen-toggle>


```

### With Properties

```

<!-- component.html -->

<rtk-fullscreen-toggle

 size="md"

 [targetElement]="htmlelement"

 variant="button">

</rtk-fullscreen-toggle>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-fullscreen-toggle/","name":"rtk-fullscreen-toggle"}}]}
```
