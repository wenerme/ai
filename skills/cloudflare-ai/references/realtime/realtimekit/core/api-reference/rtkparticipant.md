---
title: RTKParticipant
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RTKParticipant

Last updated Jul 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkparticipant/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

This module represents a single participant in the meeting. The participant object can be accessed from one of the participant lists present in the `meeting.participants` object. For example,

```ts
const participant1 = meeting.participants.active.get(participantId);
const participant2 = meeting.participants.joined.get(participantId);
const participant3 = meeting.participants.active.toArray()[0];
const participantsNamedJohn = meeting.participants.active.toArray()
  .filter((p) => p.name === 'John');
```

- [RTKParticipant](#module_RTKParticipant)
  - [.id](#module_RTKParticipant+id)
  - [.userId](#module_RTKParticipant+userId)
  - [.name](#module_RTKParticipant+name)
  - [.picture](#module_RTKParticipant+picture)
  - [.customParticipantId](#module_RTKParticipant+customParticipantId)
  - [.device](#module_RTKParticipant+device)
  - [.videoTrack](#module_RTKParticipant+videoTrack)
  - [.audioTrack](#module_RTKParticipant+audioTrack)
  - [.screenShareTracks](#module_RTKParticipant+screenShareTracks)
  - [.videoEnabled](#module_RTKParticipant+videoEnabled)
  - [.audioEnabled](#module_RTKParticipant+audioEnabled)
  - [.screenShareEnabled](#module_RTKParticipant+screenShareEnabled)
  - [.producers](#module_RTKParticipant+producers)
  - [.manualProducerConfig](#module_RTKParticipant+manualProducerConfig)
  - [.supportsRemoteControl](#module_RTKParticipant+supportsRemoteControl)
  - [.presetName](#module_RTKParticipant+presetName)
  - [.stageStatus](#module_RTKParticipant+stageStatus)
  - [.isPinned](#module_RTKParticipant+isPinned)
  - [.pin()](#module_RTKParticipant+pin)
  - [.unpin()](#module_RTKParticipant+unpin)
  - [.disableAudio()](#module_RTKParticipant+disableAudio)
  - [.kick()](#module_RTKParticipant+kick)
  - [.disableVideo()](#module_RTKParticipant+disableVideo)
  - [.registerVideoElement(videoElem)](#module_RTKParticipant+registerVideoElement)
  - [.deregisterVideoElement(\[videoElem\])](#module_RTKParticipant+deregisterVideoElement)

### participant.id

The peer ID of the participant. The participants are indexed by this ID in the participant map.

**Kind**: instance property of [`RTKParticipant`](#module_RTKParticipant)

### participant.userId

The user ID of the participant.

**Kind**: instance property of [`RTKParticipant`](#module_RTKParticipant)

### participant.name

The name of the participant.

**Kind**: instance property of [`RTKParticipant`](#module_RTKParticipant)

### participant.picture

The picture of the participant.

**Kind**: instance property of [`RTKParticipant`](#module_RTKParticipant)

### participant.customParticipantId

The custom id of the participant set during [https://developers.cloudflare.com/api/resources/realtime\_kit/subresources/meetings/methods/add\_participant ↗](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/add_participant) REST API

**Kind**: instance property of [`RTKParticipant`](#module_RTKParticipant)

### participant.device

The device configuration of the participant.

**Kind**: instance property of [`RTKParticipant`](#module_RTKParticipant)

### participant.videoTrack

The participant's video track.

**Kind**: instance property of [`RTKParticipant`](#module_RTKParticipant)

### participant.audioTrack

The participant's audio track.

**Kind**: instance property of [`RTKParticipant`](#module_RTKParticipant)

### participant.screenShareTracks

The participant's screenshare video and audio track.

**Kind**: instance property of [`RTKParticipant`](#module_RTKParticipant)

### participant.videoEnabled

This is true if the participant's video is enabled.

**Kind**: instance property of [`RTKParticipant`](#module_RTKParticipant)

### participant.audioEnabled

This is true if the participant's audio is enabled.

**Kind**: instance property of [`RTKParticipant`](#module_RTKParticipant)

### participant.screenShareEnabled

This is true if the participant is screensharing.

**Kind**: instance property of [`RTKParticipant`](#module_RTKParticipant)

### participant.producers

producers created by participant

**Kind**: instance property of [`RTKParticipant`](#module_RTKParticipant)

### participant.manualProducerConfig

producer config passed during manual subscription

**Kind**: instance property of [`RTKParticipant`](#module_RTKParticipant)

### participant.supportsRemoteControl

This is true if the participant supports remote control.

**Kind**: instance property of [`RTKParticipant`](#module_RTKParticipant)

### participant.presetName

The preset of the participant.

**Kind**: instance property of [`RTKParticipant`](#module_RTKParticipant)

### participant.stageStatus

Denotes the participants's current stage status.

**Kind**: instance property of [`RTKParticipant`](#module_RTKParticipant)

### participant.isPinned

Returns true if the participant is pinned.

**Kind**: instance property of [`RTKParticipant`](#module_RTKParticipant)

### participant.pin()

Returns `participant.id` if user has permission to pin participants.

**Kind**: instance method of [`RTKParticipant`](#module_RTKParticipant)

### participant.unpin()

Returns `participant.id` if user has permission to unpin participants.

**Kind**: instance method of [`RTKParticipant`](#module_RTKParticipant)

### participant.disableAudio()

Disables audio for this participant. Requires the permission to disable participant audio.

**Kind**: instance method of [`RTKParticipant`](#module_RTKParticipant)

### participant.kick()

Kicks this participant from the meeting. Requires the permission to kick a participant.

**Kind**: instance method of [`RTKParticipant`](#module_RTKParticipant)

### participant.disableVideo()

Disables video for this participant. Requires the permission to disable video for a participant.

**Kind**: instance method of [`RTKParticipant`](#module_RTKParticipant)

### participant.registerVideoElement(videoElem)

**Kind**: instance method of [`RTKParticipant`](#module_RTKParticipant)

| Param | Type |
| --- | --- |
| videoElem | `HTMLVideoElement` |

### participant.deregisterVideoElement(\[videoElem])

**Kind**: instance method of [`RTKParticipant`](#module_RTKParticipant)

| Param | Type |
| --- | --- |
| \[videoElem] | `HTMLVideoElement` |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkparticipant/#page","headline":"RTKParticipant · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkparticipant/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
