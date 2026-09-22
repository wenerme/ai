---
title: RTKPermissionsPreset
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RTKPermissionsPreset

Last updated Jul 20, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkpermissionspreset/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The PermissionPreset class represents the meeting permissions for the current participant

- [PermissionPreset](#module_PermissionPreset)
  - [.stageEnabled](#module_PermissionPreset+stageEnabled)
  - [.stageAccess](#module_PermissionPreset+stageAccess)
  - [.acceptWaitingRequests](#module_PermissionPreset+acceptWaitingRequests)
  - [.requestProduceVideo](#module_PermissionPreset+requestProduceVideo)
  - [.requestProduceAudio](#module_PermissionPreset+requestProduceAudio)
  - [.requestProduceScreenshare](#module_PermissionPreset+requestProduceScreenshare)
  - [.canAllowParticipantAudio](#module_PermissionPreset+canAllowParticipantAudio)
  - [.canAllowParticipantScreensharing](#module_PermissionPreset+canAllowParticipantScreensharing)
  - [.canAllowParticipantVideo](#module_PermissionPreset+canAllowParticipantVideo)
  - [.canDisableParticipantAudio](#module_PermissionPreset+canDisableParticipantAudio)
  - [.canDisableParticipantVideo](#module_PermissionPreset+canDisableParticipantVideo)
  - [.kickParticipant](#module_PermissionPreset+kickParticipant)
  - [.pinParticipant](#module_PermissionPreset+pinParticipant)
  - [.canRecord](#module_PermissionPreset+canRecord)
  - [.waitingRoomBehaviour](#module_PermissionPreset+waitingRoomBehaviour)
  - [.plugins](#module_PermissionPreset+plugins)
  - [.polls](#module_PermissionPreset+polls)
  - [.canProduceVideo](#module_PermissionPreset+canProduceVideo)
  - [.canProduceScreenshare](#module_PermissionPreset+canProduceScreenshare)
  - [.canProduceAudio](#module_PermissionPreset+canProduceAudio)
  - [.chatPublic](#module_PermissionPreset+chatPublic)
  - [.chatPrivate](#module_PermissionPreset+chatPrivate)
  - [.hiddenParticipant](#module_PermissionPreset+hiddenParticipant)
  - [.showParticipantList](#module_PermissionPreset+showParticipantList)
  - [.canChangeParticipantPermissions](#module_PermissionPreset+canChangeParticipantPermissions)
  - [.canLivestream](#module_PermissionPreset+canLivestream)

### meeting.self.permissions.stageEnabled

The `stageEnabled` property returns a boolean value. If `true`, stage management is available for the participant.

**Kind**: instance property of [`PermissionPreset`](#module_PermissionPreset)

### meeting.self.permissions.stageAccess

The `stageAccess` property dictates how a user interacts with the stage. The possible values are `ALLOWED`, `NOT_ALLOWED`, `CAN_REQUEST`;

**Kind**: instance property of [`PermissionPreset`](#module_PermissionPreset)

### meeting.self.permissions.acceptWaitingRequests

The `acceptWaitingRequests` returns boolean value. If `true`, participant can accept the request of waiting participant.

**Kind**: instance property of [`PermissionPreset`](#module_PermissionPreset)

### meeting.self.permissions.requestProduceVideo

The `requestProduceVideo` returns boolean value. If `true`, participant can send request to participants about producing video.

**Kind**: instance property of [`PermissionPreset`](#module_PermissionPreset)

### meeting.self.permissions.requestProduceAudio

The `requestProduceAudio` returns boolean value. If `true`, participant can send request to participants about producing audio.

**Kind**: instance property of [`PermissionPreset`](#module_PermissionPreset)

### meeting.self.permissions.requestProduceScreenshare

The `requestProduceScreenshare` returns boolean value. If `true`, participant can send request to participants about sharing screen.

**Kind**: instance property of [`PermissionPreset`](#module_PermissionPreset)

### meeting.self.permissions.canAllowParticipantAudio

The `canAllowParticipantAudio` returns boolean value. If `true`, participant can enable other participants\` audio.

**Kind**: instance property of [`PermissionPreset`](#module_PermissionPreset)

### meeting.self.permissions.canAllowParticipantScreensharing

The `canAllowParticipantScreensharing` returns boolean value. If `true`, participant can enable other participants\` screen share.

**Kind**: instance property of [`PermissionPreset`](#module_PermissionPreset)

### meeting.self.permissions.canAllowParticipantVideo

The `canAllowParticipantVideo` returns boolean value. If `true`, participant can enable other participants\` video.

**Kind**: instance property of [`PermissionPreset`](#module_PermissionPreset)

### meeting.self.permissions.canDisableParticipantAudio

If `true`, a participant can disable other participants\` audio.

**Kind**: instance property of [`PermissionPreset`](#module_PermissionPreset)

### meeting.self.permissions.canDisableParticipantVideo

If `true`, a participant can disable other participants\` video.

**Kind**: instance property of [`PermissionPreset`](#module_PermissionPreset)

### meeting.self.permissions.kickParticipant

The `kickParticipant` returns boolean value. If `true`, participant can remove other participants from the meeting.

**Kind**: instance property of [`PermissionPreset`](#module_PermissionPreset)

### meeting.self.permissions.pinParticipant

The `pinParticipant` returns boolean value. If `true`, participant can pin a participant in the meeting.

**Kind**: instance property of [`PermissionPreset`](#module_PermissionPreset)

### meeting.self.permissions.canRecord

The `canRecord` returns boolean value. If `true`, participant can record the meeting.

**Kind**: instance property of [`PermissionPreset`](#module_PermissionPreset)

### meeting.self.permissions.waitingRoomBehaviour

The `waitingRoomType` returns string value. type of waiting room behavior possible values are `SKIP`, `ON_PRIVILEGED_USER_ENTRY`, `SKIP_ON_ACCEPT`

**Kind**: instance property of [`PermissionPreset`](#module_PermissionPreset)

### meeting.self.permissions.plugins

The `plugins` tells if the participant can act on plugins there are 2 permissions with boolean values, `canStart` and `canClose`.

**Kind**: instance property of [`PermissionPreset`](#module_PermissionPreset)

### meeting.self.permissions.polls

The `polls` tells if the participant can use polls. There are 3 permissions with boolean values, `canCreate`, `canVote`, `canViewResults`

**Kind**: instance property of [`PermissionPreset`](#module_PermissionPreset)

### meeting.self.permissions.canProduceVideo

The `canProduceVideo` shows permissions for enabling video. There possible values are `ALLOWED`, `NOT_ALLOWED`, `CAN_REQUEST`

**Kind**: instance property of [`PermissionPreset`](#module_PermissionPreset)

### meeting.self.permissions.canProduceScreenshare

The `canProduceScreenshare` shows permissions for sharing screen. There possible values are `ALLOWED`, `NOT_ALLOWED`, `CAN_REQUEST`

**Kind**: instance property of [`PermissionPreset`](#module_PermissionPreset)

### meeting.self.permissions.canProduceAudio

The `canProduceAudio` shows permissions for enabling audio. There possible values are `ALLOWED`, `NOT_ALLOWED`, `CAN_REQUEST`

**Kind**: instance property of [`PermissionPreset`](#module_PermissionPreset)

### meeting.self.permissions.chatPublic

The `chatPublic` shows permissions for public chat there are 4 permissions `canSend` - if true, the participant can send chat `text` - if true, the participant can send text `files` - if true, the participant can send files

**Kind**: instance property of [`PermissionPreset`](#module_PermissionPreset)

### meeting.self.permissions.chatPrivate

The `chatPrivate` shows permissions for public chat there are 4 permissions `canSend` - if true, the participant can send private chat `text` - if true, the participant can send text as private chat `files` - if true, the participant can send files as private chat `canReceive` - (optional) if true, the participant can receive private chat

**Kind**: instance property of [`PermissionPreset`](#module_PermissionPreset)

### meeting.self.permissions.hiddenParticipant

The `hiddenParticipant` returns boolean value. If `true`, participant is hidden.

**Kind**: instance property of [`PermissionPreset`](#module_PermissionPreset)

### meeting.self.permissions.showParticipantList

The `showParticipantList` returns boolean value. If `true`, participant list can be shown to the participant.

**Kind**: instance property of [`PermissionPreset`](#module_PermissionPreset)

### meeting.self.permissions.canChangeParticipantPermissions

The `canChangeParticipantPermissions` returns boolean value. If `true`, allow changing the participants' permissions.

**Kind**: instance property of [`PermissionPreset`](#module_PermissionPreset)

### meeting.self.permissions.canLivestream

Livestream

**Kind**: instance property of [`PermissionPreset`](#module_PermissionPreset)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkpermissionspreset/#page","headline":"RTKPermissionsPreset","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkpermissionspreset/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
