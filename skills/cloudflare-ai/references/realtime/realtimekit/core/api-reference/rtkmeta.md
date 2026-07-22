---
title: RTKMeta
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RTKMeta

Last updated Jul 22, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkmeta/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

This consists of the metadata of the meeting, such as the room name and the title.

* [RTKMeta](#module%5FRTKMeta)
  * [.selfActiveTab](#module%5FRTKMeta+selfActiveTab)
  * [.broadcastTabChanges](#module%5FRTKMeta+broadcastTabChanges)
  * [.viewType](#module%5FRTKMeta+viewType)
  * [.meetingStartedTimestamp](#module%5FRTKMeta+meetingStartedTimestamp)
  * [.meetingTitle](#module%5FRTKMeta+meetingTitle)
  * [.sessionId](#module%5FRTKMeta+sessionId)
  * [.meetingId](#module%5FRTKMeta+meetingId)
  * [.setBroadcastTabChanges(broadcastTabChanges)](#module%5FRTKMeta+setBroadcastTabChanges)
  * [.setSelfActiveTab(spotlightTab, tabChangeSource)](#module%5FRTKMeta+setSelfActiveTab)

### meeting.meta.selfActiveTab

Represents the current active tab

**Kind**: instance property of [RTKMeta](#module%5FRTKMeta)

### meeting.meta.broadcastTabChanges

Represents whether current user is spotlighted

**Kind**: instance property of [RTKMeta](#module%5FRTKMeta)

### meeting.meta.viewType

The `viewType` tells the type of the meeting possible values are: GROUP\_CALL| LIVESTREAM | CHAT | AUDIO\_ROOM

**Kind**: instance property of [RTKMeta](#module%5FRTKMeta)

### meeting.meta.meetingStartedTimestamp

The timestamp of the time when the meeting started.

**Kind**: instance property of [RTKMeta](#module%5FRTKMeta)

### meeting.meta.meetingTitle

The title of the meeting.

**Kind**: instance property of [RTKMeta](#module%5FRTKMeta)

### meeting.meta.sessionId

(Experimental) The sessionId this meeting object is part of.

**Kind**: instance property of [RTKMeta](#module%5FRTKMeta)

### meeting.meta.meetingId

The room name of the meeting.

**Kind**: instance property of [RTKMeta](#module%5FRTKMeta)

### meeting.meta.setBroadcastTabChanges(broadcastTabChanges)

Sets current user as broadcasting tab changes

**Kind**: instance method of [RTKMeta](#module%5FRTKMeta)

| Param               | Type    |
| ------------------- | ------- |
| broadcastTabChanges | boolean |

### meeting.meta.setSelfActiveTab(spotlightTab, tabChangeSource)

Sets current active tab for user

**Kind**: instance method of [RTKMeta](#module%5FRTKMeta)

| Param           | Type            |
| --------------- | --------------- |
| spotlightTab    | ActiveTab       |
| tabChangeSource | TabChangeSource |

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkmeta/#page","headline":"RTKMeta · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkmeta/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
