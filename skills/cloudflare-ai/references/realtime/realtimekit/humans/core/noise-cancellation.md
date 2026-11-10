---
description: Filter background noise from microphone audio in RealtimeKit meetings on the web with React, Angular, or JavaScript.
title: Noise Cancellation
image: https://developers.cloudflare.com/realtime/realtimekit/humans/core/noise-cancellation/og.png?v=b0869dd1433e0bad
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Noise Cancellation

Last updated Nov 10, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/humans/core/noise-cancellation/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Use [`@cloudflare/realtimekit-noise-cancellation` ↗︎](https://www.npmjs.com/package/@cloudflare/realtimekit-noise-cancellation) to filter background noise from a participant's microphone. Audio processing runs on their device before sending audio to the meeting.

Noise cancellation supports web applications built with React, Angular, or JavaScript. Mobile SDKs are not supported.

Prerequisite

Initialize a RealtimeKit meeting instance before adding noise cancellation. Refer to [Initialize Core SDK](https://developers.cloudflare.com/realtime/realtimekit/humans/core/).

This page is not available for the **Mobile**platform.

WebMobile

ReactWeb ComponentsAngular

## Installation

Install the package:

npmyarnpnpmbun

```
npm i @cloudflare/realtimekit-noise-cancellation
```

```
yarn add @cloudflare/realtimekit-noise-cancellation
```

```
pnpm add @cloudflare/realtimekit-noise-cancellation
```

```
bun add @cloudflare/realtimekit-noise-cancellation
```

Import `RealtimeKitNoiseCancellation` in your application:

```js
// Skip this import if you use the CDN example.
import { RealtimeKitNoiseCancellation } from "@cloudflare/realtimekit-noise-cancellation";
```

Alternatively, use the CDN. The Core SDK script exposes `RealtimeKitClient` globally. Load noise cancellation as an ES module after initializing the meeting:

```html
<script src="https://cdn.jsdelivr.net/npm/@cloudflare/realtimekit@latest/dist/browser.js"></script>

<script type="module">
	RealtimeKitClient.init({
		authToken: "<participant_auth_token>",
	})
		.then((meeting) => {
			// Continue with your meeting.join() or UI Kit setup.

			// Load and start noise cancellation without delaying join.
			void import("https://cdn.jsdelivr.net/npm/@cloudflare/realtimekit-noise-cancellation@0.1.0/dist/index.js")
				.then(({ RealtimeKitNoiseCancellation }) =>
					RealtimeKitNoiseCancellation.init({ meeting }),
				)
				.catch(console.warn);
		})
		.catch(console.error);
</script>
```

Use the [Add participant API](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/add_participant/) to fetch the `authToken`.

## Initialisation

Pass your initialized meeting to `init()`. Initialize one noise canceller per meeting instance:

```js
const noiseCanceller = await RealtimeKitNoiseCancellation.init({ meeting });
```

In React, add this setup after `initMeeting()` resolves.

In Angular, add this setup after `RealtimeKitClient.init()` resolves, for example in `ngAfterViewInit()`.

In JavaScript or HTML, add this setup after `RealtimeKitClient.init()` resolves. If you use UI Kit, attach the meeting to the meeting element first.

Keep noise cancellation setup separate from your meeting join or UI flow so participants can join while processing loads.

By default, `autoManage` is `true`. The package starts processing when the microphone is available and maintains processing through mute/unmute and reconnections. If the microphone is muted during initialization, processing starts when you unmute it. The package does not unmute the microphone.

## Initialisation options

| Option | Required | Description |
| --- | --- | --- |
| `meeting` | Yes | The RealtimeKit meeting instance. |
| `autoManage` | No | Defaults to `true`. Automatically starts processing when the microphone is available and disposes the instance when the participant leaves. Set to `false` to manage activation and cleanup yourself. |
| `onError` | No | Receives runtime and automatic lifecycle errors as an `Error`. |
| `signal` | No | An `AbortSignal` that cancels initialization and disposes the instance when aborted. |

The package exports the `NoiseCancellationOptions` TypeScript type for these options.

## States

Read `enabled` to check whether noise cancellation is turned on:

```js
const isEnabled = noiseCanceller.enabled;
```

| Value | Meaning |
| --- | --- |
| `true` | Noise cancellation is turned on. |
| `false` | Processing has not started, has been turned off, or the instance has been disposed. |

Call `getStatus()` only while processing is active. It returns a `NoiseCancellationStatus` object with processing and capture metadata, including sample rates and model packaging:

```js
if (noiseCanceller.enabled) {
	const status = noiseCanceller.getStatus();
	console.log(status);
}
```

## Control methods

| Method | Description |
| --- | --- |
| `enable()` | Starts noise cancellation. The microphone must be active and unmuted. |
| `disable()` | Stops noise cancellation and restores the microphone's previous processing settings. You can call `enable()` to start processing again. |
| `dispose()` | Releases the instance and its resources. Initialize a new instance if you need noise cancellation again. |

Each method returns a `Promise<void>`. Handle rejections from `init()` and explicit method calls in your application. The `onError` callback handles runtime and automatic lifecycle errors and does not replace this error handling.

With `autoManage: true`, the package calls `dispose()` when the participant leaves. Temporary disconnections do not dispose the instance. Switching to a connected meeting disposes the old instance; initialize a new one for the new meeting object.

Disposing an instance does not stop the microphone track or close RealtimeKit's `AudioContext`.

## Manual handling

Set `autoManage: false` when your application needs to control when processing starts and when resources are released. Initialization creates the instance without starting noise cancellation or registering automatic cleanup on meeting leave.

1. Initialize the noise canceller with automatic management turned off:

   ```js
   const noiseCanceller = await RealtimeKitNoiseCancellation.init({
   	meeting,
   	autoManage: false,
   });
   ```

2. After the microphone becomes active and unmuted, start processing:

   ```js
   await noiseCanceller.enable();
   ```

3. (Optional) To temporarily stop filtering, call `disable()`. Call `enable()` again when the microphone is active and unmuted:

   ```js
   await noiseCanceller.disable();
   ```

4. When the participant leaves, your application switches meetings, or the component unmounts, release the instance:

   ```js
   await noiseCanceller.dispose();
   ```

You can also pass an `AbortController`'s `signal` to `init()` and abort it during application or component teardown. This disposes the instance even when `autoManage` is `false`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/humans/core/noise-cancellation/#page","headline":"Noise Cancellation","description":"Filter background noise from microphone audio in RealtimeKit meetings on the web with React, Angular, or JavaScript.","url":"https://developers.cloudflare.com/realtime/realtimekit/humans/core/noise-cancellation/","inLanguage":"en","image":"https://developers.cloudflare.com/realtime/realtimekit/humans/core/noise-cancellation/og.png?v=b0869dd1433e0bad","dateModified":"2026-11-10","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
