---
title: RTKConnectedMeetings
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RTKConnectedMeetings

Last updated Jul 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkconnectedmeetings/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

This consists of the methods to facilitate connected meetings

- [RTKConnectedMeetings](#module_RTKConnectedMeetings)
  - [.getConnectedMeetings()](#module_RTKConnectedMeetings+getConnectedMeetings)
  - [.createMeetings(request)](#module_RTKConnectedMeetings+createMeetings)
  - [.updateMeetings(request)](#module_RTKConnectedMeetings+updateMeetings)
  - [.deleteMeetings(meetingIds)](#module_RTKConnectedMeetings+deleteMeetings)
  - [.moveParticipants(sourceMeetingId, destinationMeetingId, participantIds)](#module_RTKConnectedMeetings+moveParticipants)
  - [.moveParticipantsWithCustomPreset(sourceMeetingId, destinationMeetingId, participants)](#module_RTKConnectedMeetings+moveParticipantsWithCustomPreset)

### meeting.connectedMeetings.getConnectedMeetings()

get connected meeting state

**Kind**: instance method of [`RTKConnectedMeetings`](#module_RTKConnectedMeetings)

### meeting.connectedMeetings.createMeetings(request)

create connected meetings

**Kind**: instance method of [`RTKConnectedMeetings`](#module_RTKConnectedMeetings)

| Param | Type |
| --- | --- |
| request | `Array.<{title: string}>` |

### meeting.connectedMeetings.updateMeetings(request)

update meeting title

**Kind**: instance method of [`RTKConnectedMeetings`](#module_RTKConnectedMeetings)

| Param | Type |
| --- | --- |
| request | `Array.<{id: string, title: string}>` |

### meeting.connectedMeetings.deleteMeetings(meetingIds)

delete connected meetings

**Kind**: instance method of [`RTKConnectedMeetings`](#module_RTKConnectedMeetings)

| Param | Type |
| --- | --- |
| meetingIds | `Array.<string>` |

### meeting.connectedMeetings.moveParticipants(sourceMeetingId, destinationMeetingId, participantIds)

Trigger event to move participants

**Kind**: instance method of [`RTKConnectedMeetings`](#module_RTKConnectedMeetings)

| Param | Type | Description |
| --- | --- | --- |
| sourceMeetingId | `string` | id of source meeting |
| destinationMeetingId | `string` | id of destination meeting |
| participantIds | `Array.<string>` | list of id of the participants |

### meeting.connectedMeetings.moveParticipantsWithCustomPreset(sourceMeetingId, destinationMeetingId, participants)

Trigger event to move participants with custom preset

**Kind**: instance method of [`RTKConnectedMeetings`](#module_RTKConnectedMeetings)

| Param | Type | Description |
| --- | --- | --- |
| sourceMeetingId | `string` | id of source meeting |
| destinationMeetingId | `string` | id of destination meeting |
| participants | `Array.<{id: string, presetId: string}>` | |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkconnectedmeetings/#page","headline":"RTKConnectedMeetings · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkconnectedmeetings/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
