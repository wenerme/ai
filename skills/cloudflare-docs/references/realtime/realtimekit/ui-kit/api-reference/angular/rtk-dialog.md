---
title: rtk-dialog
description: API reference for rtk-dialog component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/angular/rtk-dialog.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# rtk-dialog

A dialog component.

## Properties

| Property         | Type     | Required | Default               | Description                            |
| ---------------- | -------- | -------- | --------------------- | -------------------------------------- |
| config           | UIConfig | ❌        | createDefaultConfig() | UI Config                              |
| disableEscapeKey | boolean  | ✅        | \-                    | Whether Escape key can close the modal |
| hideCloseButton  | boolean  | ✅        | \-                    | Whether to show the close button       |
| iconPack         | IconPack | ❌        | defaultIconPack       | Icon pack                              |
| meeting          | Meeting  | ✅        | \-                    | Meeting object                         |
| open             | boolean  | ✅        | \-                    | Whether a dialog is open or not        |
| size             | Size     | ✅        | \-                    | Size                                   |
| states           | States   | ✅        | \-                    | States object                          |
| t                | RtkI18n  | ❌        | useLanguage()         | Language                               |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-dialog></rtk-dialog>


```

### With Properties

```

<!-- component.html -->

<rtk-dialog

 [disableEscapeKey]="true"

 [hideCloseButton]="true"

 [meeting]="meeting">

</rtk-dialog>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-dialog/","name":"rtk-dialog"}}]}
```
