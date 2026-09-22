---
title: RealtimeKitClient
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RealtimeKitClient

Last updated Jul 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/realtimekitclient/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The RealtimeKitClient class is the main class of the web core library. An object of the RealtimeKitClient class can be created using `await RealtimeKitClient.init({ ... })`. Typically, an object of `RealtimeKitClient` is named `meeting`.

- [RealtimeKitClient](#module_RealtimeKitClient)
  - *instance*
    - [.participants](#module_RealtimeKitClient+participants)
    - [.self](#module_RealtimeKitClient+self)
    - [.meta](#module_RealtimeKitClient+meta)
    - [.ai](#module_RealtimeKitClient+ai)
    - [.plugins](#module_RealtimeKitClient+plugins)
    - [.chat](#module_RealtimeKitClient+chat)
    - [.polls](#module_RealtimeKitClient+polls)
    - [.connectedMeetings](#module_RealtimeKitClient+connectedMeetings)
    - [.**internals**](#module_RealtimeKitClient+__internals__)
    - [.join()](#module_RealtimeKitClient+join)
    - [.leave()](#module_RealtimeKitClient+leave)
  - *static*
    - [.initMedia(\[options\], \[skipAwaits\], \[cachedUserDetails\])](#module_RealtimeKitClient.initMedia)
    - [.init(options)](#module_RealtimeKitClient.init)

### meeting.participants

The `participants` object consists of 4 maps of participants, `waitlisted`, `joined`, `active`, `pinned`. The maps are indexed by `peerId`s, and the values are the corresponding participant objects.

**Kind**: instance property of [`RealtimeKitClient`](#module_RealtimeKitClient)

### meeting.self

The `self` object can be used to manipulate audio and video settings, and other configurations for the local participant. This exposes methods to enable and disable media tracks, share the user's screen, etc.

**Kind**: instance property of [`RealtimeKitClient`](#module_RealtimeKitClient)

### meeting.meta

The `room` object stores information about the current meeting, such as chat messages, polls, room name, etc.

**Kind**: instance property of [`RealtimeKitClient`](#module_RealtimeKitClient)

### meeting.ai

The `ai` object is used to interface with AI features. You can obtain the live meeting transcript and use other meeting AI features such as summary, and agenda using this object.

**Kind**: instance property of [`RealtimeKitClient`](#module_RealtimeKitClient)

### meeting.plugins

The `plugins` object stores information about the plugins available in the current meeting. It exposes methods to activate and deactivate them.

**Kind**: instance property of [`RealtimeKitClient`](#module_RealtimeKitClient)

### meeting.chat

The chat object stores the chat messages that were sent in the meeting. This includes text messages, images, and files.

**Kind**: instance property of [`RealtimeKitClient`](#module_RealtimeKitClient)

### meeting.polls

The polls object stores the polls that were initiated in the meeting. It exposes methods to create and vote on polls.

**Kind**: instance property of [`RealtimeKitClient`](#module_RealtimeKitClient)

### meeting.connectedMeetings

The connectedMeetings object stores the connected meetings states. It exposes methods to create/read/update/delete methods for connected meetings.

**Kind**: instance property of [`RealtimeKitClient`](#module_RealtimeKitClient)

### meeting.\_\_internals\_\_

The **internals** object exposes the internal tools & utilities such as features and logger so that client can utilise the same to build their own feature based UI. Logger (**internals**.logger) can be used to send logs to servers to inform of issues, if any, proactively.

**Kind**: instance property of [`RealtimeKitClient`](#module_RealtimeKitClient)

### meeting.join()

The `join()` method can be used to join the meeting. A `roomJoined` event is emitted on `self` when the room is joined successfully.

**Kind**: instance method of [`RealtimeKitClient`](#module_RealtimeKitClient)

### meeting.leave()

The `leave()` method can be used to leave a meeting.

**Kind**: instance method of [`RealtimeKitClient`](#module_RealtimeKitClient)

### meeting.initMedia(\[options], \[skipAwaits], \[cachedUserDetails])

**Kind**: static method of [`RealtimeKitClient`](#module_RealtimeKitClient)

| Param | Type | Default |
| --- | --- | --- |
| \[options] | `Object` | |
| \[options.video] | `boolean` | |
| \[options.audio] | `boolean` | |
| \[options.constraints] | `MediaConstraints` | |
| \[skipAwaits] | `boolean` | `false` |
| \[cachedUserDetails] | `CachedUserDetails` | |

### meeting.init(options)

The `init` method can be used to instantiate the RealtimeKitClient class. This returns an instance of RealtimeKitClient, which can be used to perform actions on the meeting.

**Kind**: static method of [`RealtimeKitClient`](#module_RealtimeKitClient)

| Param | Description |
| --- | --- |
| options | The options object. |
| options.authToken | The authorization token received using the API. |
| options.baseURI | The base URL of the API. |
| options.defaults | The default audio and video settings. |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/realtimekitclient/#page","headline":"RealtimeKitClient","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/realtimekitclient/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
