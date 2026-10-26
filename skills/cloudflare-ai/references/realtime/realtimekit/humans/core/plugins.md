---
description: Register and control plugins in RealtimeKit meetings.
title: Plugins
image: https://developers.cloudflare.com/realtime/realtimekit/humans/core/plugins/og.png?v=84931cceda75276f
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Plugins

Last updated Oct 26, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/humans/core/plugins/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide explains how to register, activate, and render plugins in a meeting using the Cloudflare RealtimeKit Core SDK.

Plugins are interactive real-time applications that run inside a meeting, such as a shared whiteboard or a document viewer. When a participant activates a plugin, it becomes active for everyone in the session.

WebMobile

ReactWeb ComponentsAngular

Note

You must register a plugin with the same `id` on every platform your participants use. A plugin is only visible to a participant who has registered it, and activation state only syncs across participants who share the same plugin `id`. If a web participant registers a plugin under one `id` and a mobile participant uses a different `id`, the plugin will not be visible or synced across both platforms.

## The Plugins module

The meeting plugins object is available at `meeting.plugins`. It exposes two collections of [`Plugin`](#the-plugin-object) objects:

- `all`: every plugin available to the local participant.
- `active`: the plugins that are currently running in the session.

```js
// All plugins available to you
const allPlugins = meeting.plugins.all.toArray();

// Plugins currently active in the session
const activePlugins = meeting.plugins.active.toArray();

// Get a single plugin by its id
const plugin = meeting.plugins.all.get(pluginId);
```

Use the `useRealtimeKitSelector` hook to read plugins reactively. The hook only works when your component tree is wrapped in `RealtimeKitProvider`.

```jsx
import { useRealtimeKitSelector } from "@cloudflare/realtimekit-react";

const allPlugins = useRealtimeKitSelector((m) => m.plugins.all.toArray());
const activePlugins = useRealtimeKitSelector((m) => m.plugins.active.toArray());
```

```kotlin
// All plugins available to you
val allPlugins = meeting.plugins.all

// Plugins currently active in the session
val activePlugins = meeting.plugins.active

// Get a single plugin by its id
val plugin = meeting.plugins.all.firstOrNull { it.id == pluginId }
```

```swift
// All plugins available to you
let allPlugins = meeting.plugins.all

// Plugins currently active in the session
let activePlugins = meeting.plugins.active

// Get a single plugin by its id
let plugin = meeting.plugins.all.first { $0.id == pluginId }
```

Use the `useRealtimeKitSelector` hook to read plugins reactively.

```tsx
import { useRealtimeKitSelector } from "@cloudflare/realtimekit-react-native";

const allPlugins = useRealtimeKitSelector((m) => m.plugins.all.toArray());
const activePlugins = useRealtimeKitSelector((m) => m.plugins.active.toArray());

// Get a single plugin by its namespaced id
const plugin = useRealtimeKitSelector((m) => m.plugins.all.get(pluginId));
```

## Register a plugin

You register the plugins available in a session when you initialize the SDK. Each configuration provides the metadata RealtimeKit uses to list the plugin and the location it loads.

Pass an array of plugin configurations as `defaults.plugins`. Each configuration provides the metadata RealtimeKit uses to list the plugin and the `component` it renders.

```ts
RealtimeKitClient.init({
	authToken: "<auth_token>",
	defaults: {
		plugins: [
			{
				// User-provided unique id. The SDK prefixes it with
				// `{meetingId}:` to create the namespaced `plugin.id`.
				id: "whiteboard",
				// Display name shown in the plugins panel
				name: "Whiteboard",
				// Icon URL or data URI shown next to the name
				icon: "https://example.com/whiteboard.png",
				// Per-plugin permissions for the local participant
				permissions: {
					canActivate: true,
					canDeactivate: true,
				},
				// The element rendered when the plugin is active
				component: document.createElement("my-whiteboard"),
			},
		],
	},
});
```

The `component` is an `HTMLElement`. The [`rtk-plugin-main`](https://developers.cloudflare.com/realtime/realtimekit/humans/ui-kit/api-reference/core/rtk-plugin-main/) component projects it into the meeting layout, so your application styles continue to apply.

Each plugin configuration accepts the following fields:

| Field | Description | Type | Required |
| --- | --- | --- | --- |
| `id` | Unique identifier for the plugin. The SDK prefixes it with `{meetingId}:` to form `plugin.id`. | `string` | true |
| `name` | Display name shown in the plugins panel. | `string` | true |
| `icon` | Icon URL or data URI shown next to the name. | `string` | true |
| `permissions` | Controls whether the local participant can activate or deactivate the plugin. | `{ canActivate: boolean; canDeactivate: boolean }` | true |
| `component` | Element rendered when the plugin is active. | `HTMLElement` | true |

Pass plugin configurations as `defaults.plugins` when calling `initMeeting`. In React Native, `component` should be an object with a `src` property containing the URL to render — you can load this in a `WebView` or use the UI Kit to handle rendering automatically.

```tsx
const [meeting, initMeeting] = useRealtimeKitClient();

await initMeeting({
  authToken: "<auth_token>",
  defaults: {
    plugins: [
      {
        // User-provided unique id. The SDK prefixes it with
        // `{meetingId}:` to create the namespaced `plugin.id`.
        id: "whiteboard",
        // Display name shown in the plugins panel
        name: "Whiteboard",
        // Icon URL shown next to the name
        icon: "https://example.com/whiteboard.png",
        // Per-plugin permissions for the local participant
        permissions: {
          canActivate: true,
          canDeactivate: true,
        },
        // URL to render when the plugin is active.
        // Pass an object with a src property: { src: string }.
        component: { src: "https://example.com/whiteboard/" },
      },
    ],
  },
});
```

Each plugin configuration accepts the following fields:

| Field | Description | Type | Required |
| --- | --- | --- | --- |
| `id` | Unique identifier for the plugin. The SDK prefixes it with `{meetingId}:` to form `plugin.id`. | `string` | true |
| `name` | Display name shown in the plugins panel. | `string` | true |
| `icon` | Icon URL shown next to the name. | `string` | true |
| `permissions` | Controls whether the local participant can activate or deactivate the plugin. | `{ canActivate: boolean; canDeactivate: boolean }` | true |
| `component` | Object with a `src` URL to render when the plugin is active. | `{ src: string }` | true |

Pass a list of `RtkClientPluginConfig` objects as `plugins` to `RtkMeetingInfo`. The SDK loads each plugin's `url` into a WebView when you [render the plugin](#render-plugins).

```kotlin
val meetingInfo = RtkMeetingInfo(
	authToken = "<auth_token>",
	plugins = listOf(
		RtkClientPluginConfig(
			// User-provided unique id. The SDK prefixes it with
			// `{meetingId}:` to create the namespaced `plugin.id`.
			id = "whiteboard",
			// Display name shown in the plugins list
			name = "Whiteboard",
			// Icon URL shown next to the name
			icon = "https://example.com/whiteboard.png",
			// URL loaded into the plugin WebView when the plugin is active
			url = "https://example.com/whiteboard/",
			// Per-plugin permissions for the local participant
			permissions = RtkClientPluginPermissions(
				canActivate = true,
				canDeactivate = true,
			),
		),
	),
)
```

Each plugin configuration accepts the following fields:

| Field | Description | Type | Required |
| --- | --- | --- | --- |
| `id` | Unique identifier for the plugin. The SDK prefixes it with `{meetingId}:` to form `plugin.id`. | `String` | true |
| `name` | Display name shown in the plugins list. | `String` | true |
| `icon` | Icon URL shown next to the name. | `String` | true |
| `url` | URL loaded into the plugin WebView when the plugin is active. Must use `https://`. | `String` | true |
| `permissions` | Controls whether the local participant can activate or deactivate the plugin. | `RtkClientPluginPermissions` | true |

Pass an array of `RtkClientPluginConfig` objects as `plugins` to `RtkMeetingInfo`. The SDK loads each plugin's `url` into a WebView when you [render the plugin](#render-plugins).

```swift
let meetingInfo = RtkMeetingInfo(
	authToken: "<auth_token>",
	plugins: [
		RtkClientPluginConfig(
			// User-provided unique id. The SDK prefixes it with
			// `{meetingId}:` to create the namespaced `plugin.id`.
			id: "whiteboard",
			// Display name shown in the plugins list
			name: "Whiteboard",
			// Icon URL shown next to the name
			icon: "https://example.com/whiteboard.png",
			// URL loaded into the plugin WebView when the plugin is active
			url: "https://example.com/whiteboard/",
			// Per-plugin permissions for the local participant
			permissions: RtkClientPluginPermissions(
				canActivate: true,
				canDeactivate: true
			)
		)
	]
)
```

Each plugin configuration accepts the following fields:

| Field | Description | Type | Required |
| --- | --- | --- | --- |
| `id` | Unique identifier for the plugin. The SDK prefixes it with `{meetingId}:` to form `plugin.id`. | `String` | true |
| `name` | Display name shown in the plugins list. | `String` | true |
| `icon` | Icon URL shown next to the name. | `String` | true |
| `url` | URL loaded into the plugin WebView when the plugin is active. Must use `https://`. | `String` | true |
| `permissions` | Controls whether the local participant can activate or deactivate the plugin. | `RtkClientPluginPermissions` | true |

## Activate and deactivate a plugin

Activation lives on the `Plugin` object. Calling `activate()` enables the plugin for every participant in the session, and `deactivate()` disables it for everyone. Both methods respect the plugin's `permissions`.

```js
const plugin = meeting.plugins.all.get(pluginId);

// Activate for all participants
await plugin.activate();

// Deactivate for all participants
await plugin.deactivate();
```

```jsx
const plugins = useRealtimeKitSelector((m) => m.plugins);

const plugin = plugins.all.get(pluginId);

// Activate for all participants
await plugin.activate();

// Deactivate for all participants
await plugin.deactivate();
```

```kotlin
val plugin = meeting.plugins.all.firstOrNull { it.id == pluginId } ?: return

// Activate for all participants
plugin.activate()

// Deactivate for all participants
plugin.deactivate()
```

```swift
guard let plugin = meeting.plugins.all.first(where: { $0.id == pluginId }) else { return }

// Activate for all participants
plugin.activate()

// Deactivate for all participants
plugin.deactivate()
```

Note

A participant can only activate a plugin when `permissions.canActivate` is `true`. A participant can deactivate a plugin when `permissions.canDeactivate` is `true`, or when they are the participant who activated it.

## The Plugin object

A `Plugin` object represents a single plugin. You obtain it from either collection in `meeting.plugins`.

| Property | Description | Type |
| --- | --- | --- |
| `id` | Namespaced plugin id, in the form `{meetingId}:{configId}`. | `string` |
| `name` | Display name of the plugin. | `string` |
| `icon` | Icon URL or data URI. | `string` |
| `permissions` | Activation permissions for the local participant. | `{ canActivate: boolean; canDeactivate: boolean }` |
| `component` | Element rendered when the plugin is active. | `HTMLElement` |
| `active` | Whether the plugin is currently running. | `boolean` |
| `enabledBy` | Id of the participant who activated the plugin. | `string` |

| Property | Description | Type |
| --- | --- | --- |
| `id` | Namespaced plugin id, in the form `{meetingId}:{configId}`. | `String` |
| `name` | Display name of the plugin. | `String` |
| `icon` | Icon URL. | `String` |
| `permissions` | Activation permissions for the local participant. | `RtkClientPluginPermissions` |
| `isActive` | Whether the plugin is currently running. | `Boolean` |
| `enabledBy` | Id of the participant who activated the plugin. | `String?` |

To display an active plugin, refer to [Render plugins](#render-plugins). To exchange data with it, refer to [Exchange messages with a plugin](#exchange-messages-with-a-plugin).

| Property | Description | Type |
| --- | --- | --- |
| `id` | Namespaced plugin id, in the form `{meetingId}:{configId}`. | `String` |
| `name` | Display name of the plugin. | `String` |
| `icon` | Icon URL. | `String` |
| `permissions` | Activation permissions for the local participant. | `RtkClientPluginPermissions` |
| `isActive` | Whether the plugin is currently running. | `Bool` |
| `enabledBy` | Id of the participant who activated the plugin. | `String?` |

To display an active plugin, refer to [Render plugins](#render-plugins). To exchange data with it, refer to [Exchange messages with a plugin](#exchange-messages-with-a-plugin).

| Property | Description | Type |
| --- | --- | --- |
| `id` | Namespaced plugin id, in the form `{meetingId}:{configId}`. | `string` |
| `name` | Display name of the plugin. | `string` |
| `icon` | Icon URL. | `string` |
| `permissions` | Activation permissions for the local participant. | `{ canActivate: boolean; canDeactivate: boolean }` |
| `component` | The object provided at registration. Contains a `src` URL that your rendering layer loads. | `{ src: string }` |
| `active` | Whether the plugin is currently running. | `boolean` |
| `enabledBy` | Id of the participant who activated the plugin. | `string` |

## Listen to plugin events

A `Plugin` object emits events as its state changes. You can listen on a single plugin, or on a map to receive events for every plugin it contains.

| Event | Description |
| --- | --- |
| `stateUpdate` | Emitted when the plugin is activated or deactivated. |
| `enabled` | Emitted when the plugin becomes active for the local participant. |
| `closed` | Emitted when the plugin is deactivated for the local participant. |
| `ready` | Emitted when the plugin is ready to use. |

```js
const plugin = meeting.plugins.all.get(pluginId);

plugin.on("stateUpdate", ({ active, pluginId }) => {
	console.log(`Plugin ${pluginId} active:`, active);
});

// Listen for any plugin being added to or removed from the map
meeting.plugins.all.on("pluginAdded", (plugin) => {
	console.log("Plugin added:", plugin.name);
});

meeting.plugins.all.on("pluginDeleted", (plugin) => {
	console.log("Plugin removed:", plugin.name);
});
```

Register an `RtkPluginsEventListener` to receive plugin events.

| Callback | Description |
| --- | --- |
| `onPluginActivated` | Called when a plugin is activated for all participants. |
| `onPluginDeactivated` | Called when a plugin is deactivated for all participants. |
| `onPluginMessage` | Called when a plugin's web page sends a message to the app. Refer to [Exchange messages with a plugin](#exchange-messages-with-a-plugin). |
| `onPluginFileRequest` | Called when a plugin requests a file from the app. |

```kotlin
val pluginsEventListener = object : RtkPluginsEventListener {
	override fun onPluginActivated(plugin: RtkPlugin) {
		// A plugin became active for all participants
	}

	override fun onPluginDeactivated(plugin: RtkPlugin) {
		// A plugin was deactivated for all participants
	}

	override fun onPluginMessage(plugin: RtkPlugin, eventName: String, data: Any?) {
		// A plugin sent a message to the app
	}

	override fun onPluginFileRequest(plugin: RtkPlugin) {
		// A plugin requested a file from the app
	}
}

meeting.addPluginsEventListener(pluginsEventListener)

// Remove the listener when the owning screen is torn down
meeting.removePluginsEventListener(pluginsEventListener)
```

Conform to `RtkPluginsEventListener` and register the listener to receive plugin events.

| Callback | Description |
| --- | --- |
| `onPluginActivated` | Called when a plugin is activated for all participants. |
| `onPluginDeactivated` | Called when a plugin is deactivated for all participants. |
| `onPluginMessage` | Called when a plugin's web page sends a message to the app. Refer to [Exchange messages with a plugin](#exchange-messages-with-a-plugin). |
| `onPluginFileRequest` | Called when a plugin requests a file from the app. |

```swift
extension MeetingViewModel: RtkPluginsEventListener {
	func onPluginActivated(plugin: RtkPlugin) {
		// A plugin became active for all participants
	}

	func onPluginDeactivated(plugin: RtkPlugin) {
		// A plugin was deactivated for all participants
	}

	func onPluginMessage(plugin: RtkPlugin, eventName: String, data: Any?) {
		// A plugin sent a message to the app
	}

	func onPluginFileRequest(plugin: RtkPlugin) {
		// A plugin requested a file from the app
	}
}

meeting.addPluginsEventListener(pluginsEventListener: self)

// Remove the listener when the owning screen is torn down
meeting.removePluginsEventListener(pluginsEventListener: self)
```

## Render plugins

If you use the UI Kit, RealtimeKit provides ready-made components for plugins:

- [`rtk-plugins-toggle`](https://developers.cloudflare.com/realtime/realtimekit/humans/ui-kit/api-reference/core/rtk-plugins-toggle/): a control bar button that opens and closes the plugins sidebar.
- [`rtk-plugins`](https://developers.cloudflare.com/realtime/realtimekit/humans/ui-kit/api-reference/core/rtk-plugins/): a list of available plugins with controls to activate or deactivate each one.
- [`rtk-plugin-main`](https://developers.cloudflare.com/realtime/realtimekit/humans/ui-kit/api-reference/core/rtk-plugin-main/): renders the `component` of an active plugin in the meeting layout.

These components read from `meeting.plugins`, so they reflect plugin state automatically once you register your plugins at initialization.

When a plugin is active, `getPluginView()` returns the Android `WebView` that hosts it. Add this view to your layout from the `onPluginActivated` callback of your [plugins event listener](#listen-to-plugin-events).

The first call to `getPluginView()` after activation creates the WebView and starts loading the plugin's `url`. Later calls return the same view while the plugin stays active. The method returns `null` while the plugin is inactive. When the plugin is deactivated, the SDK discards its WebView, so remove the view from your layout and call `getPluginView()` again after the plugin is reactivated.

```kotlin
// In your RtkPluginsEventListener
override fun onPluginActivated(plugin: RtkPlugin) {
	runOnUiThread {
		// Returns an Android WebView you can add to your layout
		val pluginView = plugin.getPluginView() ?: return@runOnUiThread
		pluginContainer.addView(pluginView)
	}
}

override fun onPluginDeactivated(plugin: RtkPlugin) {
	runOnUiThread {
		// The SDK discards the WebView on deactivation
		pluginContainer.removeAllViews()
	}
}
```

When a plugin is active, `getPluginView()` returns the `WKWebView` that hosts it. Add this view to your view hierarchy from the `onPluginActivated` callback of your [plugins event listener](#listen-to-plugin-events).

The first call to `getPluginView()` after activation creates the WebView and starts loading the plugin's `url`. Later calls return the same view while the plugin stays active. The method returns `nil` while the plugin is inactive. When the plugin is deactivated, the SDK discards its WebView, so remove the view from your view hierarchy and call `getPluginView()` again after the plugin is reactivated.

```swift
// In your RtkPluginsEventListener
func onPluginActivated(plugin: RtkPlugin) {
	DispatchQueue.main.async {
		// Returns a WKWebView you can add to your view hierarchy
		guard let pluginView = plugin.getPluginView() else { return }
		self.pluginContainer.addSubview(pluginView)
	}
}

func onPluginDeactivated(plugin: RtkPlugin) {
	DispatchQueue.main.async {
		// The SDK discards the WebView on deactivation
		self.pluginContainer.subviews.forEach { $0.removeFromSuperview() }
	}
}
```

The React Native UI Kit provides ready-made components for plugins:

- [`RtkPluginsToggle`](https://developers.cloudflare.com/realtime/realtimekit/humans/ui-kit/api-reference/react-native/rtkpluginstoggle/): a control bar button that opens and closes the plugins sidebar.
- [`RtkPlugins`](https://developers.cloudflare.com/realtime/realtimekit/humans/ui-kit/api-reference/react-native/rtkplugins/): a panel listing available plugins with controls to activate or deactivate each one.
- [`RtkPluginMain`](https://developers.cloudflare.com/realtime/realtimekit/humans/ui-kit/api-reference/react-native/rtkpluginmain/): renders the active plugin in a `WebView`.

These components read from `meeting.plugins` automatically once plugins are registered at initialization. If you use `RtkMeeting`, plugin UI is included without any additional setup.

## Exchange messages with a plugin

On web, a plugin's `component` is an `HTMLElement` that runs in your own page, so RealtimeKit does not provide a separate messaging API. Exchange data with the plugin using the mechanisms your UI framework provides, such as properties, attributes, callbacks, or DOM events.

If your plugin component embeds an `iframe`, send messages to it with `iframe.contentWindow.postMessage(message, targetOrigin)`, and listen for replies with a `message` event listener on `window`. Always pass the plugin's origin as `targetOrigin`, and check `event.origin` before you trust an incoming message.

Messaging between the app and a plugin through `sendData` and `onPluginMessage` is available in the Android and iOS Core SDKs. Select Android or iOS in the SDK selector to view this section.

On Android and iOS, a plugin is a web page that the SDK loads into a WebView. Your app and the page exchange messages through a bridge that the SDK injects into the WebView. The bridge has two independent, one-way directions. It does not pair messages into requests and responses.

| Direction | App API | Message `type` | Plugin page API |
| --- | --- | --- | --- |
| App → plugin | `RtkPlugin.sendData(eventName, data)` | `24` | `window.addEventListener("message", handler)` |
| Plugin → app | `RtkPluginsEventListener.onPluginMessage(plugin, eventName, data)` | `20` | `window.parent.postMessage(message, "*")` |

Each message carries a string event name and optional data. Event names are your own application convention; the SDK does not reserve any. Data must be JSON-compatible: `null`, strings, numbers, booleans, lists, and maps with string keys.

Messages travel only between your app and the plugin WebView on the same device. They are not sent to other participants. To share plugin state across participants, use the [meeting key-value store](https://developers.cloudflare.com/realtime/realtimekit/collaboration/meeting-key-value-store/) or [message broadcast](https://developers.cloudflare.com/realtime/realtimekit/collaboration/message-broadcast/).

The bridge does not authenticate the page that sends messages. Only register plugin URLs that you trust, and validate every message you receive on either side.

### Receive messages from the plugin

The SDK calls `onPluginMessage` on every registered `RtkPluginsEventListener` when the plugin page sends a message. Implement it in the listener you registered in [Listen to plugin events](#listen-to-plugin-events). The plugin must be active, and the listener must be registered before the page sends the message.

```kotlin
override fun onPluginMessage(plugin: RtkPlugin, eventName: String, data: Any?) {
	when (eventName) {
		"ready" -> {
			// The plugin page has loaded and is listening for messages
			plugin.sendData("init", mapOf("theme" to "dark"))
		}
		"score.updated" -> {
			val payload = data as? Map<*, *> ?: return
			val score = payload["score"] as? Int ?: return
			// Update your app with score
		}
	}
}
```

The SDK converts the JSON `data` sent by the page to Kotlin values:

| JSON value | Kotlin type |
| --- | --- |
| Object | `Map<String, Any?>` |
| Array | `List<Any?>` |
| String | `String` |
| Boolean | `Boolean` |
| Number | `Int`, `Long`, or `Double` |
| `null` or omitted | `null` |

```swift
func onPluginMessage(plugin: RtkPlugin, eventName: String, data: Any?) {
	switch eventName {
	case "ready":
		// The plugin page has loaded and is listening for messages
		plugin.sendData(eventName: "init", data: ["theme": "dark"])
	case "score.updated":
		guard let payload = data as? [String: Any],
			let score = payload["score"] as? NSNumber else { return }
		// Update your app with score
	default:
		break
	}
}
```

The SDK converts the JSON `data` sent by the page to Foundation values. Cast objects with `as? [String: Any]`, arrays with `as? [Any]`, strings with `as? String`, and numbers or booleans with `as? NSNumber`. If the page sends `null` or omits `data`, `data` is `nil`.

### Send messages to the plugin

Call `sendData` on an active `RtkPlugin` to send an event to its web page.

```kotlin
val error = plugin.sendData(
	eventName = "init",
	data = mapOf("theme" to "dark", "locale" to "en-US"),
)

if (error != null) {
	// PluginError.NotActive: the plugin is not active
}
```

```swift
if let error = plugin.sendData(eventName: "init", data: ["theme": "dark", "locale": "en-US"]) {
	// PluginError.NotActive: the plugin is not active
	print(error)
}
```

`sendData` returns `PluginError.NotActive` if the plugin is not active. Otherwise it returns no error and delivers the message asynchronously. A missing error means the SDK accepted the message, not that the page received it. The SDK drops the message without reporting an error when:

- You have not called `getPluginView()` since the plugin was activated, so no WebView exists.
- The page has not loaded yet, or it has not registered its `message` listener.
- `data` contains a value that is not JSON-compatible.

The SDK does not queue messages or acknowledge delivery. To avoid sending before the page is ready, have the page send a `ready` event after it loads, and call `sendData` only after `onPluginMessage` receives that event. The examples on this page follow this pattern.

### Receive messages in the plugin

In the plugin page, listen for `message` events on `window`. The SDK delivers each message as an object with this shape:

```json
{
	"type": 24,
	"uuid": "",
	"payload": {
		"eventName": "init",
		"data": { "theme": "dark", "locale": "en-US" }
	}
}
```

Register the listener in an inline script in the page `<head>` so that it is installed before your app sends anything:

```html
<script>
	window.addEventListener("message", (event) => {
		const message = event.data;
		// Ignore anything that is not a message from the app
		if (!message || message.type !== 24 || !message.payload) return;

		const { eventName, data } = message.payload;
		if (eventName === "init") {
			// Validate data before using it
			document.body.dataset.theme = data?.theme ?? "light";
		}
	});
</script>
```

`event.data` is already an object. Do not call `JSON.parse` on it.

### Send messages from the plugin

To send a message to the app, call `window.parent.postMessage` with an object that has `type: 20` and a `payload` object containing a string `eventName` and optional `data`.

The SDK replaces `window.parent.postMessage` in the WebView each time a page starts loading, but it does not signal when the replacement is in place. Send your first message after the page's `load` event instead of from a script that runs while the page is parsed.

```js
function sendToApp(eventName, data) {
	window.parent.postMessage({ type: 20, payload: { eventName, data } }, "*");
}

// Tell the app that the page is ready to receive messages
window.addEventListener("load", () => sendToApp("ready"));

// Send application events after the page has loaded
document.querySelector("#submit-score").addEventListener("click", () => {
	sendToApp("score.updated", { score: 42 });
});
```

The SDK ignores the second argument to `postMessage`. It does not restrict which origins can send messages. The app does not receive messages that use a different `type`, omit `payload`, or are sent while the plugin is inactive. If you need to correlate a reply with a request, include your own identifier in `data`.

Caution

Pass the message as an object. Do not call `JSON.stringify` on it first: the bridge serializes the object itself, and a pre-serialized string or an `eventName` that is not a string can cause an uncaught exception in the native SDK and crash your app.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/humans/core/plugins/#page","headline":"Plugins","description":"Register and control plugins in RealtimeKit meetings.","url":"https://developers.cloudflare.com/realtime/realtimekit/humans/core/plugins/","inLanguage":"en","image":"https://developers.cloudflare.com/realtime/realtimekit/humans/core/plugins/og.png?v=84931cceda75276f","dateModified":"2026-10-26","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
