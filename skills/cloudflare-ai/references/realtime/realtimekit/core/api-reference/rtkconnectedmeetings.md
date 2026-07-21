---
title: RTKConnectedMeetings
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RTKConnectedMeetings

Last updated Jul 20, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkconnectedmeetings/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

This consists of the methods to facilitate connected meetings

* [RTKConnectedMeetings](#module%5FRTKConnectedMeetings)
  * [module.exports](#exp%5Fmodule%5FRTKConnectedMeetings--module.exports) ⏏
    * [new module.exports(context)](#new%5Fmodule%5FRTKConnectedMeetings--module.exports%5Fnew)
    * [.getConnectedMeetings()](#module%5FRTKConnectedMeetings--module.exports+getConnectedMeetings)
    * [.createMeetings(request)](#module%5FRTKConnectedMeetings--module.exports+createMeetings)
    * [.updateMeetings(request)](#module%5FRTKConnectedMeetings--module.exports+updateMeetings)
    * [.deleteMeetings(meetingIds)](#module%5FRTKConnectedMeetings--module.exports+deleteMeetings)
    * [.moveParticipants(sourceMeetingId, destinationMeetingId, participantIds)](#module%5FRTKConnectedMeetings--module.exports+moveParticipants)
    * [.moveParticipantsWithCustomPreset(sourceMeetingId, destinationMeetingId, participants)](#module%5FRTKConnectedMeetings--module.exports+moveParticipantsWithCustomPreset)

### module.exports ⏏

**Kind**: Exported class

#### new module.exports(context)

| Param   | Type    |
| ------- | ------- |
| context | Context |

#### module.exports.getConnectedMeetings()

get connected meeting state

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKConnectedMeetings--module.exports)

#### module.exports.createMeetings(request)

create connected meetings

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKConnectedMeetings--module.exports)

| Param   | Type                    |
| ------- | ----------------------- |
| request | Array.<{title: string}> |

#### module.exports.updateMeetings(request)

update meeting title

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKConnectedMeetings--module.exports)

| Param   | Type                                |
| ------- | ----------------------------------- |
| request | Array.<{id: string, title: string}> |

#### module.exports.deleteMeetings(meetingIds)

delete connected meetings

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKConnectedMeetings--module.exports)

| Param      | Type           |
| ---------- | -------------- |
| meetingIds | Array.<string> |

#### module.exports.moveParticipants(sourceMeetingId, destinationMeetingId, participantIds)

Trigger event to move participants

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKConnectedMeetings--module.exports)

| Param                | Type           | Description                    |
| -------------------- | -------------- | ------------------------------ |
| sourceMeetingId      | string         | id of source meeting           |
| destinationMeetingId | string         | id of destination meeting      |
| participantIds       | Array.<string> | list of id of the participants |

#### module.exports.moveParticipantsWithCustomPreset(sourceMeetingId, destinationMeetingId, participants)

Trigger event to move participants with custom preset

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKConnectedMeetings--module.exports)

| Param                | Type                                   | Description               |
| -------------------- | -------------------------------------- | ------------------------- |
| sourceMeetingId      | string                                 | id of source meeting      |
| destinationMeetingId | string                                 | id of destination meeting |
| participants         | Array.<{id: string, presetId: string}> |                           |

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkconnectedmeetings/#page","headline":"RTKConnectedMeetings · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkconnectedmeetings/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
