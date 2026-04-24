---
title: RTKMeta
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/core/api-reference/RTKMeta.md) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# RTKMeta

This consists of the metadata of the meeting, such as the room name and the title.

* [RTKMeta](#module%5FRTKMeta)  
   * [module.exports](#exp%5Fmodule%5FRTKMeta--module.exports) ⏏  
         * [new module.exports(context, self, viewType, roomSocketHandler, meetingTitle)](#new%5Fmodule%5FRTKMeta--module.exports%5Fnew)  
         * [.selfActiveTab](#module%5FRTKMeta--module.exports+selfActiveTab)  
         * [.broadcastTabChanges](#module%5FRTKMeta--module.exports+broadcastTabChanges)  
         * [.viewType](#module%5FRTKMeta--module.exports+viewType)  
         * [.meetingStartedTimestamp](#module%5FRTKMeta--module.exports+meetingStartedTimestamp)  
         * [.meetingTitle](#module%5FRTKMeta--module.exports+meetingTitle)  
         * [.sessionId](#module%5FRTKMeta--module.exports+sessionId)  
         * [.meetingId](#module%5FRTKMeta--module.exports+meetingId)  
         * [.setBroadcastTabChanges(broadcastTabChanges)](#module%5FRTKMeta--module.exports+setBroadcastTabChanges)  
         * [.setSelfActiveTab(spotlightTab, tabChangeSource)](#module%5FRTKMeta--module.exports+setSelfActiveTab)

### module.exports ⏏

**Kind**: Exported class  

#### new module.exports(context, self, viewType, roomSocketHandler, meetingTitle)

| Param             | Type              |
| ----------------- | ----------------- |
| context           | Context           |
| self              | Self              |
| viewType          | string            |
| roomSocketHandler | RoomSocketHandler |
| meetingTitle      | string            |

#### module.exports.selfActiveTab

Represents the current active tab

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKMeta--module.exports)  

#### module.exports.broadcastTabChanges

Represents whether current user is spotlighted

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKMeta--module.exports)  

#### module.exports.viewType

The `viewType` tells the type of the meeting possible values are: GROUP\_CALL| LIVESTREAM | CHAT | AUDIO\_ROOM

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKMeta--module.exports)  

#### module.exports.meetingStartedTimestamp

The timestamp of the time when the meeting started.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKMeta--module.exports)  

#### module.exports.meetingTitle

The title of the meeting.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKMeta--module.exports)  

#### module.exports.sessionId

(Experimental) The sessionId this meeting object is part of.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKMeta--module.exports)  

#### module.exports.meetingId

The room name of the meeting.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKMeta--module.exports)  

#### module.exports.setBroadcastTabChanges(broadcastTabChanges)

Sets current user as broadcasting tab changes

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKMeta--module.exports)

| Param               | Type    |
| ------------------- | ------- |
| broadcastTabChanges | boolean |

#### module.exports.setSelfActiveTab(spotlightTab, tabChangeSource)

Sets current active tab for user

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKMeta--module.exports)

| Param           | Type            |
| --------------- | --------------- |
| spotlightTab    | ActiveTab       |
| tabChangeSource | TabChangeSource |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/core/api-reference/rtkmeta/","name":"RTKMeta"}}]}
```
