---
title: RTKLivestream
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RTKLivestream

Last updated Jul 20, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtklivestream/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The RTKLivestream module represents the state of the current livestream, and allows to start/stop live streams.

* [RTKLivestream](#module%5FRTKLivestream)
  * [module.exports](#exp%5Fmodule%5FRTKLivestream--module.exports) ⏏
    * [new module.exports(context, self)](#new%5Fmodule%5FRTKLivestream--module.exports%5Fnew)
    * [.telemetry](#module%5FRTKLivestream--module.exports+telemetry)
    * [.setLivestreamState(livestreamState)](#module%5FRTKLivestream--module.exports+setLivestreamState)
    * [.start(\[livestreamConfig\])](#module%5FRTKLivestream--module.exports+start)
    * [.stop()](#module%5FRTKLivestream--module.exports+stop)

### module.exports ⏏

**Kind**: Exported class

#### new module.exports(context, self)

| Param   | Type    |
| ------- | ------- |
| context | Context |
| self    | Self    |

#### module.exports.telemetry

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKLivestream--module.exports)

#### module.exports.setLivestreamState(livestreamState)

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKLivestream--module.exports)

| Param           | Type               |
| --------------- | ------------------ |
| livestreamState | RTKLivestreamState |

#### module.exports.start(\[livestreamConfig\])

Starts livestreaming the meeting.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKLivestream--module.exports)

| Param                | Type                  |
| -------------------- | --------------------- |
| \[livestreamConfig\] | StartLivestreamConfig |

#### module.exports.stop()

Stops livestreaming the meeting.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKLivestream--module.exports)

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtklivestream/#page","headline":"RTKLivestream · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtklivestream/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
