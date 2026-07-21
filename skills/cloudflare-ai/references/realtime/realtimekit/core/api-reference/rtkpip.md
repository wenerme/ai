---
title: RTKPip
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RTKPip

Last updated Jul 20, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkpip/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Functions

[getInitials()](#getInitials)

Code from ui-kit. Same method used in the avatar component

[\_init(context, self)](#%5Finit)

[init(\[options\])](#init)

Initialize PiP and prepare sources

[disableSource(source)](#disableSource)

[addSource(id, element, enabled, \[displayText\])](#addSource)

Add a video source from the participant grid

[updateSource(id, source)](#updateSource)

Update a video source

[removeSource(id)](#removeSource)

Remove the video source for the participant

[removePinnedSource(id)](#removePinnedSource)

Remove the pinned source

[removeAllSources()](#removeAllSources)

Remove all sources

[enable()](#enable)

Enable PiP

Code from ui-kit. Same method used in the avatar component

**Kind**: global function

**Kind**: global function

| Param   | Type    |
| ------- | ------- |
| context | Context |
| self    | Self    |

Initialize PiP and prepare sources

**Kind**: global function

| Param              | Type   |
| ------------------ | ------ |
| \[options\]        | Object |
| \[options.height\] | number |
| \[options.width\]  | number |

**Kind**: global function

| Param  | Type   |
| ------ | ------ |
| source | string |

Add a video source from the participant grid

**Kind**: global function

| Param           | Type             | Description                            |
| --------------- | ---------------- | -------------------------------------- |
| id              | string           | id for the source (ex. participant id) |
| element         | HTMLVideoElement | HTMLVideoElement for the video source  |
| enabled         | boolean          | if source is enabled                   |
| \[displayText\] | string           | two character display text             |

Update a video source

**Kind**: global function

| Param  | Type   |
| ------ | ------ |
| id     | string |
| source | any    |

Remove the video source for the participant

**Kind**: global function

| Param | Description                            |
| ----- | -------------------------------------- |
| id    | id for the source (ex. participant id) |

Remove the pinned source

**Kind**: global function

| Param | Description                            |
| ----- | -------------------------------------- |
| id    | id for the source (ex. participant id) |

Remove all sources

**Kind**: global function

Enable PiP

**Kind**: global function

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkpip/#page","headline":"RTKPip · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkpip/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
