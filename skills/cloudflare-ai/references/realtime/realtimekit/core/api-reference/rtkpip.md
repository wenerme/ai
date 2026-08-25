---
title: RTKPip
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RTKPip

Last updated Jul 22, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkpip/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Modules

[RTKPip](#module%5FRTKPip)

## Functions

[getInitials()](#getInitials)

Code from ui-kit. Same method used in the avatar component

* [RTKPip](#module%5FRTKPip)
  * [.disable](#module%5FRTKPip+disable)
  * [.init(\[options\])](#module%5FRTKPip+init)
  * [.disableSource(source)](#module%5FRTKPip+disableSource)
  * [.addSource(id, element, enabled, \[displayText\])](#module%5FRTKPip+addSource)
  * [.updateSource(id, source)](#module%5FRTKPip+updateSource)
  * [.removeSource(id)](#module%5FRTKPip+removeSource)
  * [.removePinnedSource(id)](#module%5FRTKPip+removePinnedSource)
  * [.removeAllSources()](#module%5FRTKPip+removeAllSources)
  * [.enable()](#module%5FRTKPip+enable)

### meeting.participants.pip.disable

Disable PiP

**Kind**: instance property of [RTKPip](#module%5FRTKPip)

### meeting.participants.pip.init(\[options\])

Initialize PiP and prepare sources

**Kind**: instance method of [RTKPip](#module%5FRTKPip)

| Param              | Type   |
| ------------------ | ------ |
| \[options\]        | Object |
| \[options.height\] | number |
| \[options.width\]  | number |

### meeting.participants.pip.disableSource(source)

**Kind**: instance method of [RTKPip](#module%5FRTKPip)

| Param  | Type   |
| ------ | ------ |
| source | string |

### meeting.participants.pip.addSource(id, element, enabled, \[displayText\])

Add a video source from the participant grid

**Kind**: instance method of [RTKPip](#module%5FRTKPip)

| Param           | Type             | Description                            |
| --------------- | ---------------- | -------------------------------------- |
| id              | string           | id for the source (ex. participant id) |
| element         | HTMLVideoElement | HTMLVideoElement for the video source  |
| enabled         | boolean          | if source is enabled                   |
| \[displayText\] | string           | two character display text             |

### meeting.participants.pip.updateSource(id, source)

Update a video source

**Kind**: instance method of [RTKPip](#module%5FRTKPip)

| Param  | Type   |
| ------ | ------ |
| id     | string |
| source | any    |

### meeting.participants.pip.removeSource(id)

Remove the video source for the participant

**Kind**: instance method of [RTKPip](#module%5FRTKPip)

| Param | Description                            |
| ----- | -------------------------------------- |
| id    | id for the source (ex. participant id) |

### meeting.participants.pip.removePinnedSource(id)

Remove the pinned source

**Kind**: instance method of [RTKPip](#module%5FRTKPip)

| Param | Description                            |
| ----- | -------------------------------------- |
| id    | id for the source (ex. participant id) |

### meeting.participants.pip.removeAllSources()

Remove all sources

**Kind**: instance method of [RTKPip](#module%5FRTKPip)

### meeting.participants.pip.enable()

Enable PiP

**Kind**: instance method of [RTKPip](#module%5FRTKPip)

Code from ui-kit. Same method used in the avatar component

**Kind**: global function

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkpip/#page","headline":"RTKPip · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkpip/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
