---
title: Plugins
description: Register and control plugins in RealtimeKit meetings.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

# Plugins

This guide explains how to register, activate, and render plugins in a meeting using the Cloudflare RealtimeKit Core SDK.

Plugins are interactive real-time applications that run inside a meeting, such as a shared whiteboard or a document viewer. When a participant activates a plugin, it becomes active for everyone in the session.

This page is not available for the **Mobile**platform.

WebMobile

ReactWeb ComponentsAngular

## The Plugins module

The meeting plugins object is available at `meeting.plugins`. It holds two maps of [Plugin](#the-plugin-object) objects, each indexed by `plugin.id`:

* `all`: every plugin available to the local participant.
* `active`: the plugins that are currently running in the session.

JavaScript

```
// All plugins available to youconst allPlugins = meeting.plugins.all.toArray();
// Plugins currently active in the sessionconst activePlugins = meeting.plugins.active.toArray();
// Get a single plugin by its idconst plugin = meeting.plugins.all.get(pluginId);
```

Use the `useRealtimeKitSelector` hook to read plugins reactively. The hook only works when your component tree is wrapped in `RealtimeKitProvider`.

```
import { useRealtimeKitSelector } from "@cloudflare/realtimekit-react";
const allPlugins = useRealtimeKitSelector((m) => m.plugins.all.toArray());const activePlugins = useRealtimeKitSelector((m) =>  m.plugins.active.toArray(),);
```

## Register a plugin

You register the plugins available in a session when you initialize the SDK. Pass an array of plugin configurations as `defaults.plugins`. Each configuration provides the metadata RealtimeKit uses to list the plugin and the `component` it renders.

TypeScript

```
RealtimeKitClient.init({  authToken: "<auth_token>",  defaults: {    plugins: [      {        // User-provided unique id. The SDK prefixes it with        // `{meetingId}:` to create the namespaced `plugin.id`.        id: "whiteboard",        // Display name shown in the plugins panel        name: "Whiteboard",        // Icon URL or data URI shown next to the name        icon: "https://example.com/whiteboard.png",        // Per-plugin permissions for the local participant        permissions: {          canActivate: true,          canDeactivate: true,        },        // The element rendered when the plugin is active        component: document.createElement("my-whiteboard"),      },    ],  },});
```

The `component` is an `HTMLElement`. The [rtk-plugin-main](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-plugin-main/) component projects it into the meeting layout, so your application styles continue to apply.

Each plugin configuration accepts the following fields:

| Field       | Description                                                                                | Type                                             | Required |
| ----------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------ | -------- |
| id          | Unique identifier for the plugin. The SDK prefixes it with {meetingId}: to form plugin.id. | string                                           | true     |
| name        | Display name shown in the plugins panel.                                                   | string                                           | true     |
| icon        | Icon URL or data URI shown next to the name.                                               | string                                           | true     |
| permissions | Controls whether the local participant can activate or deactivate the plugin.              | { canActivate: boolean; canDeactivate: boolean } | true     |
| component   | Element rendered when the plugin is active.                                                | HTMLElement                                      | true     |

## Activate and deactivate a plugin

Activation lives on the `Plugin` object. Calling `activate()` enables the plugin for every participant in the session, and `deactivate()` disables it for everyone. Both methods respect the plugin's `permissions`.

JavaScript

```
const plugin = meeting.plugins.all.get(pluginId);
// Activate for all participantsawait plugin.activate();
// Deactivate for all participantsawait plugin.deactivate();
```

```
const plugins = useRealtimeKitSelector((m) => m.plugins);
const plugin = plugins.all.get(pluginId);
// Activate for all participantsawait plugin.activate();
// Deactivate for all participantsawait plugin.deactivate();
```

Note

A participant can only activate a plugin when `permissions.canActivate` is `true`. A participant can deactivate a plugin when `permissions.canDeactivate` is `true`, or when they are the participant who activated it.

## The Plugin object

A `Plugin` object represents a single plugin. You obtain it from either map in `meeting.plugins`.

| Property    | Description                                               | Type                                             |
| ----------- | --------------------------------------------------------- | ------------------------------------------------ |
| id          | Namespaced plugin id, in the form {meetingId}:{configId}. | string                                           |
| name        | Display name of the plugin.                               | string                                           |
| icon        | Icon URL or data URI.                                     | string                                           |
| permissions | Activation permissions for the local participant.         | { canActivate: boolean; canDeactivate: boolean } |
| component   | Element rendered when the plugin is active.               | HTMLElement                                      |
| active      | Whether the plugin is currently running.                  | boolean                                          |
| enabledBy   | Id of the participant who activated the plugin.           | string                                           |

## Listen to plugin events

A `Plugin` object emits events as its state changes. You can listen on a single plugin, or on a map to receive events for every plugin it contains.

| Event       | Description                                                       |
| ----------- | ----------------------------------------------------------------- |
| stateUpdate | Emitted when the plugin is activated or deactivated.              |
| enabled     | Emitted when the plugin becomes active for the local participant. |
| closed      | Emitted when the plugin is deactivated for the local participant. |
| ready       | Emitted when the plugin is ready to use.                          |

JavaScript

```
const plugin = meeting.plugins.all.get(pluginId);
plugin.on("stateUpdate", ({ active, pluginId }) => {  console.log(`Plugin ${pluginId} active:`, active);});
// Listen for any plugin being added to or removed from the mapmeeting.plugins.all.on("pluginAdded", (plugin) => {  console.log("Plugin added:", plugin.name);});
meeting.plugins.all.on("pluginDeleted", (plugin) => {  console.log("Plugin removed:", plugin.name);});
```

## Render plugins with the UI Kit

If you use the UI Kit, RealtimeKit provides ready-made components for plugins:

* [rtk-plugins-toggle](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-plugins-toggle/): a control bar button that opens and closes the plugins sidebar.
* [rtk-plugins](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-plugins/): a list of available plugins with controls to activate or deactivate each one.
* [rtk-plugin-main](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-plugin-main/): renders the `component` of an active plugin in the meeting layout.

These components read from `meeting.plugins`, so they reflect plugin state automatically once you register your plugins at initialization.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/plugins/#page","headline":"Plugins · Cloudflare Realtime docs","description":"Register and control plugins in RealtimeKit meetings.","url":"https://developers.cloudflare.com/realtime/realtimekit/core/plugins/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-18","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/plugins/","name":"Plugins"}}]}
```
