---
title: RTKParticipant
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RTKParticipant

Last updated Jul 22, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkparticipant/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This module represents a single participant in the meeting. The participant object can be accessed from one of the participant lists present in the `meeting.participants` object. For example,

```ts
const participant1 = meeting.participants.active.get(participantId);
const participant2 = meeting.participants.joined.get(participantId);
const participant3 = meeting.participants.active.toArray()[0];
const participantsNamedJohn = meeting.participants.active.toArray()
  .filter((p) => p.name === 'John');
```

* [RTKParticipant](#module%5FRTKParticipant)
  * [.id](#module%5FRTKParticipant+id)
  * [.userId](#module%5FRTKParticipant+userId)
  * [.name](#module%5FRTKParticipant+name)
  * [.picture](#module%5FRTKParticipant+picture)
  * [.customParticipantId](#module%5FRTKParticipant+customParticipantId)
  * [.device](#module%5FRTKParticipant+device)
  * [.videoTrack](#module%5FRTKParticipant+videoTrack)
  * [.audioTrack](#module%5FRTKParticipant+audioTrack)
  * [.screenShareTracks](#module%5FRTKParticipant+screenShareTracks)
  * [.videoEnabled](#module%5FRTKParticipant+videoEnabled)
  * [.audioEnabled](#module%5FRTKParticipant+audioEnabled)
  * [.screenShareEnabled](#module%5FRTKParticipant+screenShareEnabled)
  * [.producers](#module%5FRTKParticipant+producers)
  * [.manualProducerConfig](#module%5FRTKParticipant+manualProducerConfig)
  * [.supportsRemoteControl](#module%5FRTKParticipant+supportsRemoteControl)
  * [.presetName](#module%5FRTKParticipant+presetName)
  * [.stageStatus](#module%5FRTKParticipant+stageStatus)
  * [.isPinned](#module%5FRTKParticipant+isPinned)
  * [.pin()](#module%5FRTKParticipant+pin)
  * [.unpin()](#module%5FRTKParticipant+unpin)
  * [.disableAudio()](#module%5FRTKParticipant+disableAudio)
  * [.kick()](#module%5FRTKParticipant+kick)
  * [.disableVideo()](#module%5FRTKParticipant+disableVideo)
  * [.registerVideoElement(videoElem)](#module%5FRTKParticipant+registerVideoElement)
  * [.deregisterVideoElement(\[videoElem\])](#module%5FRTKParticipant+deregisterVideoElement)

### participant.id

The peer ID of the participant. The participants are indexed by this ID in the participant map.

**Kind**: instance property of [RTKParticipant](#module%5FRTKParticipant)

### participant.userId

The user ID of the participant.

**Kind**: instance property of [RTKParticipant](#module%5FRTKParticipant)

### participant.name

The name of the participant.

**Kind**: instance property of [RTKParticipant](#module%5FRTKParticipant)

### participant.picture

The picture of the participant.

**Kind**: instance property of [RTKParticipant](#module%5FRTKParticipant)

### participant.customParticipantId

The custom id of the participant set during [https://developers.cloudflare.com/api/resources/realtime\_kit/subresources/meetings/methods/add\_participant ↗](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/add%5Fparticipant) REST API

**Kind**: instance property of [RTKParticipant](#module%5FRTKParticipant)

### participant.device

The device configuration of the participant.

**Kind**: instance property of [RTKParticipant](#module%5FRTKParticipant)

### participant.videoTrack

The participant's video track.

**Kind**: instance property of [RTKParticipant](#module%5FRTKParticipant)

### participant.audioTrack

The participant's audio track.

**Kind**: instance property of [RTKParticipant](#module%5FRTKParticipant)

### participant.screenShareTracks

The participant's screenshare video and audio track.

**Kind**: instance property of [RTKParticipant](#module%5FRTKParticipant)

### participant.videoEnabled

This is true if the participant's video is enabled.

**Kind**: instance property of [RTKParticipant](#module%5FRTKParticipant)

### participant.audioEnabled

This is true if the participant's audio is enabled.

**Kind**: instance property of [RTKParticipant](#module%5FRTKParticipant)

### participant.screenShareEnabled

This is true if the participant is screensharing.

**Kind**: instance property of [RTKParticipant](#module%5FRTKParticipant)

### participant.producers

producers created by participant

**Kind**: instance property of [RTKParticipant](#module%5FRTKParticipant)

### participant.manualProducerConfig

producer config passed during manual subscription

**Kind**: instance property of [RTKParticipant](#module%5FRTKParticipant)

### participant.supportsRemoteControl

This is true if the participant supports remote control.

**Kind**: instance property of [RTKParticipant](#module%5FRTKParticipant)

### participant.presetName

The preset of the participant.

**Kind**: instance property of [RTKParticipant](#module%5FRTKParticipant)

### participant.stageStatus

Denotes the participants's current stage status.

**Kind**: instance property of [RTKParticipant](#module%5FRTKParticipant)

### participant.isPinned

Returns true if the participant is pinned.

**Kind**: instance property of [RTKParticipant](#module%5FRTKParticipant)

### participant.pin()

Returns `participant.id` if user has permission to pin participants.

**Kind**: instance method of [RTKParticipant](#module%5FRTKParticipant)

### participant.unpin()

Returns `participant.id` if user has permission to unpin participants.

**Kind**: instance method of [RTKParticipant](#module%5FRTKParticipant)

### participant.disableAudio()

Disables audio for this participant. Requires the permission to disable participant audio.

**Kind**: instance method of [RTKParticipant](#module%5FRTKParticipant)

### participant.kick()

Kicks this participant from the meeting. Requires the permission to kick a participant.

**Kind**: instance method of [RTKParticipant](#module%5FRTKParticipant)

### participant.disableVideo()

Disables video for this participant. Requires the permission to disable video for a participant.

**Kind**: instance method of [RTKParticipant](#module%5FRTKParticipant)

### participant.registerVideoElement(videoElem)

**Kind**: instance method of [RTKParticipant](#module%5FRTKParticipant)

| Param     | Type             |
| --------- | ---------------- |
| videoElem | HTMLVideoElement |

### participant.deregisterVideoElement(\[videoElem\])

**Kind**: instance method of [RTKParticipant](#module%5FRTKParticipant)

| Param         | Type             |
| ------------- | ---------------- |
| \[videoElem\] | HTMLVideoElement |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkparticipant/#page","headline":"RTKParticipant · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkparticipant/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
