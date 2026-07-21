---
title: Build your own plugins
description: Build custom plugins for RealtimeKit meetings.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Build your own plugins

This guide explains how to build a custom plugin and run it inside a meeting using the Cloudflare RealtimeKit Core SDK.

A custom plugin is a DOM element that you register with the SDK. When a participant activates the plugin, RealtimeKit makes it active for everyone in the session and renders it in the meeting layout.

This page is not available for the **Mobile**platform.

WebMobile

ReactWeb ComponentsAngular

## Prerequisites

This page builds on the [Initialize SDK](https://developers.cloudflare.com/realtime/realtimekit/core/) and [Plugins](https://developers.cloudflare.com/realtime/realtimekit/core/plugins/) guides. Read those first.

The examples assume you have already imported the necessary packages and initialized the SDK.

## How a plugin works

A plugin has two parts:

* A **component**: a DOM element (`HTMLElement`) that holds your plugin's UI and logic.
* A **registration**: a configuration object you pass to the SDK so it can list, activate, and render the component.

RealtimeKit synchronizes activation state across the session. To share plugin data between participants, use [collaborative stores](https://developers.cloudflare.com/realtime/realtimekit/collaborative-stores/).

## 1\. Build the plugin component

A plugin component must be an `HTMLElement`. Build it directly as a custom element, or create a container element and mount your framework component tree into it.

Define your plugin as a custom element, then create an instance to pass as the `component`.

**my-counter-plugin.ts**

```ts
class MyCounterPlugin extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="counter">
        <button id="increment">This is a counter plugin</button>
        <span id="value">0</span>
      </div>
    `;
  }
}


customElements.define("my-counter-plugin", MyCounterPlugin);


const pluginElement = document.createElement("my-counter-plugin");
```

Create a container element and mount your component tree into it. Pass the container as the `component`.

**counter-plugin.tsx**

```tsx
import { createRoot } from "react-dom/client";


function CounterPlugin() {
  return <div className="counter">This is a counter plugin</div>;
}


const pluginElement = document.createElement("div");
createRoot(pluginElement).render(<CounterPlugin />);
```

Create a container element and mount your component tree into it. Pass the container as the `component`.

**counter-plugin.ts**

```ts
import {
  createComponent,
  ApplicationRef,
  EnvironmentInjector,
} from "@angular/core";
import { CounterPluginComponent } from "./counter-plugin.component";


const pluginElement = document.createElement("div");


const componentRef = createComponent(CounterPluginComponent, {
  environmentInjector: this.injector,
  hostElement: pluginElement,
});


this.appRef.attachView(componentRef.hostView);
```

## 2\. Register and render the plugin

Register the plugins available in a session when you initialize the SDK. Pass an array of plugin configurations as `defaults.plugins`, using the `pluginElement` you created in step 1 as the `component`.

**TypeScript**

```ts
RealtimeKitClient.init({
  authToken: "<auth_token>",
  defaults: {
    plugins: [
      {
        id: "counter",
        name: "Counter",
        icon: "https://example.com/counter.png",
        permissions: {
          canActivate: true,
          canDeactivate: true,
        },
        component: pluginElement,
      },
    ],
  },
});
```

For a description of every configuration field, refer to [Register a plugin](https://developers.cloudflare.com/realtime/realtimekit/core/plugins/#register-a-plugin).

After registration, the plugin appears in `meeting.plugins.all`. Activate it to make it active for everyone in the session.

**JavaScript**

```js
const plugin = meeting.plugins.all.get(pluginId);
await plugin.activate();
```

```jsx
const plugins = useRealtimeKitSelector((m) => m.plugins);
const plugin = plugins.all.get(pluginId);
await plugin.activate();
```

Note

If you use the UI Kit, the plugin components handle activation and rendering for you.

## 3\. Respond to plugin events

A `Plugin` object emits events as its state changes. Use them to set up or tear down your component when it is activated or deactivated.

**JavaScript**

```js
const plugin = meeting.plugins.all.get(pluginId);


plugin.on("enabled", () => {
  // The plugin became active for the local participant
});


plugin.on("closed", () => {
  // The plugin was deactivated for the local participant
});
```

For the full list of plugin events, refer to [Listen to plugin events](https://developers.cloudflare.com/realtime/realtimekit/core/plugins/#listen-to-plugin-events).

## 4\. Sync data across participants

Each participant runs their own copy of the plugin component, so you need a way to share state between them. RealtimeKit offers two built-in options for real-time communication:

* [Collaborative stores](https://developers.cloudflare.com/realtime/realtimekit/collaborative-stores/) — a shared key-value store that syncs state across the session.
* [Message broadcasts](https://developers.cloudflare.com/realtime/realtimekit/broadcast-apis/) — send custom events to every participant in a meeting.

For plugins with simple requirements, these built-in APIs are enough to handle your collaborative logic.

**JavaScript**

```js
// Create or get a store for your plugin
const store = meeting.stores.create("counter");


// Update a value for all participants
await store.set("value", 1);


// React to updates from any participant
store.subscribe("value", ({ value }) => {
  document.querySelector("#value").textContent = value;
});
```

For richer, full-featured collaboration, you can pair your plugin with a dedicated third-party framework:

| Framework                                        | Description                                                  | Notes       |
| ------------------------------------------------ | ------------------------------------------------------------ | ----------- |
| **[Collab-Kit ↗](https://docs.collab-kit.com/)** | Full-featured SDK for building collaborative apps.           | Beta        |
| **[Party-Kit ↗](https://docs.partykit.io/)**     | Low-level framework for building collaborative applications. | Open source |

## Next steps

* Review the [Plugins](https://developers.cloudflare.com/realtime/realtimekit/core/plugins/) API for the complete `Plugin` and `Plugins` reference.
* Use [collaborative stores](https://developers.cloudflare.com/realtime/realtimekit/collaborative-stores/) to build richer shared experiences.
* Get started with the [RealtimeKit plugins example ↗](https://github.com/cloudflare/realtimekit-web-examples/tree/main/react-examples/examples/plugins) for a working React implementation.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/custom-plugins/build-your-own-plugins/#page","headline":"Build your own plugins · Cloudflare Realtime docs","description":"Build custom plugins for RealtimeKit meetings.","url":"https://developers.cloudflare.com/realtime/realtimekit/custom-plugins/build-your-own-plugins/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-18","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/custom-plugins/","name":"Custom Plugins"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/custom-plugins/build-your-own-plugins/","name":"Build your own plugins"}}]}
```
