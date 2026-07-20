---
title: RTKPlugin
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# RTKPlugin

The RTKPlugin module represents a single plugin in the meeting. A plugin can be obtained from one of the plugin arrays in `meeting.plugins`. For example,

**TypeScript**

```ts
const plugin1 = meeting.plugins.active.get(pluginId);
const plugin2 = meeting.plugins.all.get(pluginId);
```

* [RTKPlugin](#module%5FRTKPlugin)
  * [.component](#module%5FRTKPlugin+component)
  * [.telemetry](#module%5FRTKPlugin+telemetry)
  * [.activePluginsStore](#module%5FRTKPlugin+activePluginsStore)
  * [.activateForSelf()](#module%5FRTKPlugin+activateForSelf)
  * [.deactivateForSelf()](#module%5FRTKPlugin+deactivateForSelf)
  * [.activate()](#module%5FRTKPlugin+activate)
  * [.deactivate()](#module%5FRTKPlugin+deactivate)

### plugin.component

The component for this plugin, as provided in the plugin config.

**Kind**: instance property of [RTKPlugin](#module%5FRTKPlugin)

### plugin.telemetry

**Kind**: instance property of [RTKPlugin](#module%5FRTKPlugin)

### plugin.activePluginsStore

**Kind**: instance property of [RTKPlugin](#module%5FRTKPlugin)

| Param              | Type               |
| ------------------ | ------------------ |
| context            | Context            |
| config             | ClientPluginConfig |
| activePluginsStore | Store              |
| self               | Self               |

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

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkplugin/#page","headline":"RTKPlugin · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkplugin/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/core/api-reference/rtkplugin/","name":"RTKPlugin"}}]}
```
