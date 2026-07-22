---
title: RTKParticipants
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RTKParticipants

Last updated Jul 22, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkparticipants/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

This module represents all the participants in the meeting (except the local user). It consists of 4 maps:

* `joined`: A map of all participants that have joined the meeting.
* `waitlisted`: A map of all participants that have been added to the waitlist.
* `active`: A map of active participants who should be displayed in the meeting grid.
* `pinned`: A map of pinned participants.
* [RTKParticipants](#module%5FRTKParticipants)
  * [.waitlisted](#module%5FRTKParticipants+waitlisted)
  * [.joined](#module%5FRTKParticipants+joined)
  * [.active](#module%5FRTKParticipants+active)
  * [.videoSubscribed](#module%5FRTKParticipants+videoSubscribed)
  * [.audioSubscribed](#module%5FRTKParticipants+audioSubscribed)
  * [.pinned](#module%5FRTKParticipants+pinned)
  * [.all](#module%5FRTKParticipants+all)
  * [.pip](#module%5FRTKParticipants+pip)
  * [.viewMode](#module%5FRTKParticipants+viewMode)
  * [.currentPage](#module%5FRTKParticipants+currentPage)
  * [.lastActiveSpeaker](#module%5FRTKParticipants+lastActiveSpeaker)
  * [.selectedPeers](#module%5FRTKParticipants+selectedPeers)
  * [.count](#module%5FRTKParticipants+count)
  * [.maxActiveParticipantsCount](#module%5FRTKParticipants+maxActiveParticipantsCount)
  * [.pageCount](#module%5FRTKParticipants+pageCount)
  * [.setMaxActiveParticipantsCount(limit)](#module%5FRTKParticipants+setMaxActiveParticipantsCount)
  * [.acceptWaitingRoomRequest(id)](#module%5FRTKParticipants+acceptWaitingRoomRequest)
  * [.acceptAllWaitingRoomRequest(userIds)](#module%5FRTKParticipants+acceptAllWaitingRoomRequest)
  * [.rejectWaitingRoomRequest(id)](#module%5FRTKParticipants+rejectWaitingRoomRequest)
  * [.setViewMode(viewMode)](#module%5FRTKParticipants+setViewMode)
  * [.subscribe(peerIds, \[kinds\])](#module%5FRTKParticipants+subscribe)
  * [.unsubscribe(peerIds, \[kinds\])](#module%5FRTKParticipants+unsubscribe)
  * [.setPage(page)](#module%5FRTKParticipants+setPage)
  * [.disableAllAudio(allowUnmute)](#module%5FRTKParticipants+disableAllAudio)
  * [.disableAllVideo()](#module%5FRTKParticipants+disableAllVideo)
  * [.kickAll()](#module%5FRTKParticipants+kickAll)
  * [.broadcastMessage(type, payload, target)](#module%5FRTKParticipants+broadcastMessage)
  * [.getAllJoinedPeers(searchQuery, limit, offset)](#module%5FRTKParticipants+getAllJoinedPeers)
  * [.getParticipantsInMeetingPreJoin()](#module%5FRTKParticipants+getParticipantsInMeetingPreJoin)

### meeting.participants.waitlisted

Returns a list of participants waiting to join the meeting.

**Kind**: instance property of [RTKParticipants](#module%5FRTKParticipants)

### meeting.participants.joined

Returns a list of all participants in the meeting.

**Kind**: instance property of [RTKParticipants](#module%5FRTKParticipants)

### meeting.participants.active

Returns a list of participants whose streams are currently consumed.

**Kind**: instance property of [RTKParticipants](#module%5FRTKParticipants)

### meeting.participants.videoSubscribed

Returns a list of participants whose video streams are currently consumed.

**Kind**: instance property of [RTKParticipants](#module%5FRTKParticipants)

### meeting.participants.audioSubscribed

Returns a list of participants whose audio streams are currently consumed.

**Kind**: instance property of [RTKParticipants](#module%5FRTKParticipants)

### meeting.participants.pinned

Returns a list of participants who have been pinned.

**Kind**: instance property of [RTKParticipants](#module%5FRTKParticipants)

### meeting.participants.all

Returns all added participants irrespective of whether they are currently in the meeting or not

**Kind**: instance property of [RTKParticipants](#module%5FRTKParticipants)

### meeting.participants.pip

Return the controls for Picture-in-Picture

**Kind**: instance property of [RTKParticipants](#module%5FRTKParticipants)

### meeting.participants.viewMode

Indicates whether the meeting is in 'ACTIVE\_GRID' mode or 'PAGINATED' mode.

In 'ACTIVE\_GRID' mode, participants are populated in the participants.active map dynamically. The participants present in the map will keep changing when other participants unmute their audio or turn on their videos.

In 'PAGINATED' mode, participants are populated in the participants.active map just once, and the participants in the map will only change if the page number is changed by the user using setPage(page).

**Kind**: instance property of [RTKParticipants](#module%5FRTKParticipants)

### meeting.participants.currentPage

This indicates the current page that has been set by the user in PAGINATED mode. If the meeting is in ACTIVE\_GRID mode, this value will be 0.

**Kind**: instance property of [RTKParticipants](#module%5FRTKParticipants)

### meeting.participants.lastActiveSpeaker

This stores the `participantId` of the last participant who spoke in the meeting.

**Kind**: instance property of [RTKParticipants](#module%5FRTKParticipants)

### meeting.participants.selectedPeers

Keeps a list of all participants who have been present in the selected peers list.

**Kind**: instance property of [RTKParticipants](#module%5FRTKParticipants)

### meeting.participants.count

Returns the number of participants who are joined in the meeting.

**Kind**: instance property of [RTKParticipants](#module%5FRTKParticipants)

### meeting.participants.maxActiveParticipantsCount

Returns the maximum number of participants that can be present in the active map.

**Kind**: instance property of [RTKParticipants](#module%5FRTKParticipants)

### meeting.participants.pageCount

Returns the number of pages that are available in the meeting in PAGINATED mode. If the meeting is in ACTIVE\_GRID mode, this value will be 0.

**Kind**: instance property of [RTKParticipants](#module%5FRTKParticipants)

### meeting.participants.setMaxActiveParticipantsCount(limit)

Updates the maximum number of participants that are populated in the active map.

**Kind**: instance method of [RTKParticipants](#module%5FRTKParticipants)

| Param | Type   | Description       |
| ----- | ------ | ----------------- |
| limit | number | Updated max limit |

### meeting.participants.acceptWaitingRoomRequest(id)

Accepts requests from waitlisted participants if user has appropriate permissions.

**Kind**: instance method of [RTKParticipants](#module%5FRTKParticipants)

| Param | Type   | Description                                     |
| ----- | ------ | ----------------------------------------------- |
| id    | string | peerId or userId of the waitlisted participant. |

### meeting.participants.acceptAllWaitingRoomRequest(userIds)

We need a new event for socket service events since if we send them all together, sequence of events can be unreliable

**Kind**: instance method of [RTKParticipants](#module%5FRTKParticipants)

| Param   | Type           |
| ------- | -------------- |
| userIds | Array.<string> |

### meeting.participants.rejectWaitingRoomRequest(id)

Rejects requests from waitlisted participants if user has appropriate permissions.

**Kind**: instance method of [RTKParticipants](#module%5FRTKParticipants)

| Param | Type   | Description                                  |
| ----- | ------ | -------------------------------------------- |
| id    | string | participantId of the waitlisted participant. |

### meeting.participants.setViewMode(viewMode)

Sets the view mode of the meeting to either ACTIVE\_GRID or PAGINATED.

**Kind**: instance method of [RTKParticipants](#module%5FRTKParticipants)

| Param    | Type     | Description                                          |
| -------- | -------- | ---------------------------------------------------- |
| viewMode | ViewMode | The mode in which the active map should be populated |

### meeting.participants.subscribe(peerIds, \[kinds\])

**Kind**: instance method of [RTKParticipants](#module%5FRTKParticipants)

| Param     | Type                                                             |
| --------- | ---------------------------------------------------------------- |
| peerIds   | Array.<string>                                                   |
| \[kinds\] | Array.<('audio'\|'video'|'screenshareAudio'|'screenshareVideo')> |

### meeting.participants.unsubscribe(peerIds, \[kinds\])

**Kind**: instance method of [RTKParticipants](#module%5FRTKParticipants)

| Param     | Type                                                             |
| --------- | ---------------------------------------------------------------- |
| peerIds   | Array.<string>                                                   |
| \[kinds\] | Array.<('audio'\|'video'|'screenshareAudio'|'screenshareVideo')> |

### meeting.participants.setPage(page)

Populates the active map with participants present in the page number indicated by the parameter `page` in PAGINATED mode. Does not do anything in ACTIVE\_GRID mode.

**Kind**: instance method of [RTKParticipants](#module%5FRTKParticipants)

| Param | Type   | Description                |
| ----- | ------ | -------------------------- |
| page  | number | The page number to be set. |

### meeting.participants.disableAllAudio(allowUnmute)

Disables audio for all participants in the meeting.

**Kind**: instance method of [RTKParticipants](#module%5FRTKParticipants)

| Param       | Type    | Description                                        |
| ----------- | ------- | -------------------------------------------------- |
| allowUnmute | boolean | Allow participants to unmute after they are muted. |

### meeting.participants.disableAllVideo()

Disables video for all participants in the meeting.

**Kind**: instance method of [RTKParticipants](#module%5FRTKParticipants)

### meeting.participants.kickAll()

Kicks all participants from the meeting.

**Kind**: instance method of [RTKParticipants](#module%5FRTKParticipants)

### meeting.participants.broadcastMessage(type, payload, target)

Broadcasts the message to participants

If no `target` is specified it is sent to all participants including `self`.

**Kind**: instance method of [RTKParticipants](#module%5FRTKParticipants)

| Param   | Type                    | Description                                                                                                                        |
| ------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| type    | string                  |                                                                                                                                    |
| payload | BroadcastMessagePayload |                                                                                                                                    |
| target  | BroadcastMessageTarget  | object containing a list of participantIds or object containing presetName \- every user with that preset will be sent the message |

### meeting.participants.getAllJoinedPeers(searchQuery, limit, offset)

Returns all peers currently present in the room If you are in a group call, use `meeting.participants.joined`instead

**Kind**: instance method of [RTKParticipants](#module%5FRTKParticipants)

| Param       | Type   |
| ----------- | ------ |
| searchQuery | string |
| limit       | number |
| offset      | number |

### meeting.participants.getParticipantsInMeetingPreJoin()

Returns all peers currently in the room, is a non paginated call and should only be used if you are in a non room joined state, if in a joined group call, use `meeting.participants.joined`

**Kind**: instance method of [RTKParticipants](#module%5FRTKParticipants)

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkparticipants/#page","headline":"RTKParticipants · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkparticipants/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
