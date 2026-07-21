---
title: RTKThemePreset
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RTKThemePreset

Last updated Jul 20, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkthemepreset/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The RTKThemePreset class represents the meeting theme for the current participant

* [RTKThemePreset](#module%5FRTKThemePreset)
  * [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports) ⏏
    * [new module.exports(preset)](#new%5Fmodule%5FRTKThemePreset--module.exports%5Fnew)
    * _instance_
      * ~~[.setupScreen](#module%5FRTKThemePreset--module.exports+setupScreen)~~
      * ~~[.waitingRoom](#module%5FRTKThemePreset--module.exports+waitingRoom)~~
      * ~~[.controlBar](#module%5FRTKThemePreset--module.exports+controlBar)~~
      * ~~[.header](#module%5FRTKThemePreset--module.exports+header)~~
      * ~~[.pipMode](#module%5FRTKThemePreset--module.exports+pipMode)~~
      * [.viewType](#module%5FRTKThemePreset--module.exports+viewType)
      * [.livestreamViewerQualities](#module%5FRTKThemePreset--module.exports+livestreamViewerQualities)
      * [.maxVideoStreams](#module%5FRTKThemePreset--module.exports+maxVideoStreams)
      * [.maxScreenShareCount](#module%5FRTKThemePreset--module.exports+maxScreenShareCount)
      * ~~[.plugins](#module%5FRTKThemePreset--module.exports+plugins)~~
      * [.disabledPlugins](#module%5FRTKThemePreset--module.exports+disabledPlugins)
    * _static_
      * [.fromResponse(preset)](#module%5FRTKThemePreset--module.exports.fromResponse)
      * [.default()](#module%5FRTKThemePreset--module.exports.default)
      * [.init(\[preset\], \[useDefault\])](#module%5FRTKThemePreset--module.exports.init)

### module.exports ⏏

**Kind**: Exported class

#### new module.exports(preset)

| Param  | Type               |
| ------ | ------------------ |
| preset | PresetV2CamelCased |

#### ~~module.exports.setupScreen~~

_**Deprecated**_

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)

#### ~~module.exports.waitingRoom~~

_**Deprecated**_

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)

#### ~~module.exports.controlBar~~

_**Deprecated**_

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)

#### ~~module.exports.header~~

_**Deprecated**_

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)

#### ~~module.exports.pipMode~~

_**Deprecated**_

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)

#### module.exports.viewType

The `viewType` tells the type of the meeting possible values are: GROUP\_CALL| LIVESTREAM | CHAT | AUDIO\_ROOM

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)

#### module.exports.livestreamViewerQualities

The `livestreamViewerQualities` specifies the allowed qualities of a stream, that can be viewed by a livestream viewer

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)

#### module.exports.maxVideoStreams

The `maxVideoStreams` contains the maximum video streams for mobile and desktop

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)

#### module.exports.maxScreenShareCount

The `maxScreenShareCount` contains the maximum possible concurrent screen shares

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)

#### ~~module.exports.plugins~~

_**Deprecated**_

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)

#### module.exports.disabledPlugins

The `disabledPlugins` property returns id of all disabled plugins

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)

#### module.exports.fromResponse(preset)

**Kind**: static method of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)
**Deprecated.**: Use init()

| Param  | Type               |
| ------ | ------------------ |
| preset | PresetV2CamelCased |

#### module.exports.default()

**Kind**: static method of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)
**Deprecated.**: Use init()

#### module.exports.init(\[preset\], \[useDefault\])

**Kind**: static method of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)

| Param          | Type               | Default |
| -------------- | ------------------ | ------- |
| \[preset\]     | PresetV2CamelCased |         |
| \[useDefault\] | boolean            | true    |

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkthemepreset/#page","headline":"RTKThemePreset · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkthemepreset/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
