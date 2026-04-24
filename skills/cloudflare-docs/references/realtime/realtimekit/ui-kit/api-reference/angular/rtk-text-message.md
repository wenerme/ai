---
title: rtk-text-message
description: API reference for rtk-text-message component (Angular Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/angular/rtk-text-message.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# rtk-text-message

@deprecated `rtk-text-message` is deprecated and will be removed soon. Use `rtk-text-message-view` instead. A component which renders a text message from chat.

## Properties

| Property    | Type        | Required | Default         | Description                                             |
| ----------- | ----------- | -------- | --------------- | ------------------------------------------------------- |
| iconPack    | IconPack    | ❌        | defaultIconPack | Icon pack                                               |
| isContinued | boolean     | ✅        | \-              | Whether the message is continued by same user           |
| message     | TextMessage | ✅        | \-              | Text message object                                     |
| now         | Date        | ✅        | \-              | Date object of now, to calculate distance between dates |
| showBubble  | boolean     | ✅        | \-              | show message in bubble                                  |
| t           | RtkI18n     | ❌        | useLanguage()   | Language                                                |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-text-message></rtk-text-message>


```

### With Properties

```

<!-- component.html -->

<rtk-text-message

 [isContinued]="true"

 [message]="textmessage"

 [now]="date">

</rtk-text-message>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-text-message/","name":"rtk-text-message"}}]}
```
