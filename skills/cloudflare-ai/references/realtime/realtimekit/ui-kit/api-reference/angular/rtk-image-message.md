---
description: API reference for rtk-image-message component (Angular Library)
title: rtk-image-message
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-image-message

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-image-message/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

@deprecated `rtk-image-message` is deprecated and will be removed soon. Use `rtk-image-message-view` instead. A component which renders an image message from chat.

## Properties

| Property    | Type         | Required | Default         | Description                                             |
| ----------- | ------------ | -------- | --------------- | ------------------------------------------------------- |
| iconPack    | IconPack     | ❌        | defaultIconPack | Icon pack                                               |
| isContinued | boolean      | ✅        | \-              | Whether the message is continued by same user           |
| message     | ImageMessage | ✅        | \-              | Text message object                                     |
| now         | Date         | ✅        | \-              | Date object of now, to calculate distance between dates |
| showBubble  | boolean      | ✅        | \-              | show message in bubble                                  |
| t           | RtkI18n      | ❌        | useLanguage()   | Language                                                |

## Usage Examples

### Basic Usage

```html
<!-- component.html -->
<rtk-image-message></rtk-image-message>
```

### With Properties

```html
<!-- component.html -->
<rtk-image-message
 [isContinued]="true"
 [message]="imagemessage"
 [now]="date">
</rtk-image-message>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-image-message/#page","headline":"rtk-image-message · Cloudflare Realtime docs","description":"API reference for rtk-image-message component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-image-message/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
