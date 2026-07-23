---
title: RTKPlugin
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RTKPlugin

Last updated Jul 22, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkplugin/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The RTKPlugin module represents a single plugin in the meeting. A plugin can be obtained from one of the plugin arrays in `meeting.plugins`. For example,

```ts
const plugin1 = meeting.plugins.active.get(pluginId);
const plugin2 = meeting.plugins.all.get(pluginId);
```

* [RTKPlugin](#module%5FRTKPlugin)
  * [.component](#module%5FRTKPlugin+component)
  * [.activateForSelf()](#module%5FRTKPlugin+activateForSelf)
  * [.deactivateForSelf()](#module%5FRTKPlugin+deactivateForSelf)
  * [.activate()](#module%5FRTKPlugin+activate)
  * [.deactivate()](#module%5FRTKPlugin+deactivate)

### plugin.component

The component for this plugin, as provided in the plugin config.

**Kind**: instance property of [RTKPlugin](#module%5FRTKPlugin)

### plugin.activateForSelf()

**Kind**: instance method of [RTKPlugin](#module%5FRTKPlugin)

### plugin.deactivateForSelf()

**Kind**: instance method of [RTKPlugin](#module%5FRTKPlugin)

### plugin.activate()

Activate this plugin for all participants.

**Kind**: instance method of [RTKPlugin](#module%5FRTKPlugin)

### plugin.deactivate()

Deactivate this plugin for all participants.

**Kind**: instance method of [RTKPlugin](#module%5FRTKPlugin)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkplugin/#page","headline":"RTKPlugin · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkplugin/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
