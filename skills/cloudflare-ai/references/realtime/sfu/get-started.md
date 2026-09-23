---
description: Run a custom video room and exchange audio and video between two browser participants using Realtime SFU.
title: Get started
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Get started

Last updated Sep 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/sfu/get-started/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Run a browser video room that publishes camera and microphone tracks through Realtime SFU. Open a second participant to receive the first participant's media and send media back.

This quickstart uses a Worker for signaling and a Durable Object for room state. SFU credentials stay on the backend. The [video-room guide](https://developers.cloudflare.com/realtime/sfu/examples/video-room/) explains how to adapt the application.

For a conferencing application, start with [RealtimeKit](https://developers.cloudflare.com/realtime/realtimekit/) for meeting SDKs and participant management. Use this example to learn how to build directly on the SFU.

## Prerequisites

- A [Cloudflare account](https://developers.cloudflare.com/fundamentals/account/create-account/).
- Git, Node.js 22.12 or later, and a package manager.
- A browser with camera and microphone access. Use headphones when testing audio on one computer.

The example is experimental. Local development uses an identity mechanism restricted to localhost. A deployed room requires Cloudflare Access.

## Run the video room

1. **Create your SFU app.** In the Cloudflare dashboard, select your account and go to **Realtime** > **Serverless SFU**. [Go to **Serverless SFU** ↗](https://dash.cloudflare.com/?to=/:account/realtime/sfu) Create an app and save its **App ID** and **App Secret**. You can also [create the app through the API](https://developers.cloudflare.com/api/resources/calls/subresources/sfu/methods/create/). Use separate apps for environments that need isolation.
2. **Clone the example.** In a terminal, run:

   ```sh
   git clone https://github.com/cloudflare/realtime-examples.git
   cd realtime-examples/video-room
   ```

   Install the dependencies:npmyarnpnpmbun

   ```
   npm install
   ```

   ```
   yarn install
   ```

   ```
   pnpm install
   ```

   ```
   bun install
   ```


3. **Configure the backend.** Create the ignored local secrets file:

   ```sh
   cp .dev.vars.example .dev.vars
   chmod 600 .dev.vars
   ```

   In `.dev.vars`, set `REALTIME_SFU_APP_ID` to the App ID and `REALTIME_SFU_BEARER_TOKEN` to the App Secret. Keep this file private. These values are read by the Worker, not sent to the browser.
4. **Start the application.** Run:npmyarnpnpm

   ```
   npm run dev
   ```

   ```
   yarn run dev
   ```

   ```
   pnpm run dev
   ```

   Open `http://localhost:8787/rooms/two-browser-check`. Enter a display name, join the room, and allow camera and microphone access.
5. **Connect another participant.** Select **Open another participant**. In the new tab, join with a different display name.

   Use this action instead of the browser's **Duplicate Tab** action, which can copy the first participant's identity. Both participants should show local and remote video. Confirm that remote audio plays.

## How the connection works

Each browser publishes its camera and microphone tracks to Realtime SFU. The Worker and Durable Object share the resulting publication identifiers with the other participant. That browser subscribes to those publications, and the SFU forwards the selected media.

The backend coordinates the room and checks permissions. Media travels directly between each browser and the SFU. [Sessions and tracks](https://developers.cloudflare.com/realtime/sfu/concepts/sessions-tracks/) explains the connections and identifiers behind this exchange.

## Clean up

Select **Leave** to remove one participant. The room creator can select **Terminate room** to end the room for everyone. Wait for confirmation; a failed cleanup remains available to retry.

Stop the local development process when finished. Delete `.dev.vars` when you no longer need the local credentials. Delete a dedicated SFU app only after all applications using it have stopped.

## Next steps

Start with [Sessions and tracks](https://developers.cloudflare.com/realtime/sfu/concepts/sessions-tracks/) to understand the SFU model, then follow [Connection patterns](https://developers.cloudflare.com/realtime/sfu/get-started/connection-patterns/) to build an endpoint. If you already know WebRTC, go directly to the recipe for your task.

To adapt this application, follow [the video-room architecture](https://developers.cloudflare.com/realtime/sfu/examples/video-room/#how-it-works). It explains separate publishing and receiving sessions, track discovery, and negotiation queues.

To share a deployed room, follow the video-room guide's [deployment instructions](https://developers.cloudflare.com/realtime/sfu/examples/video-room/#deploy-the-room).

[Explore more applications](https://developers.cloudflare.com/realtime/sfu/examples/)

If media does not appear, start with [troubleshooting](https://developers.cloudflare.com/realtime/sfu/observability/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/sfu/get-started/#page","headline":"Get started","description":"Run a custom video room and exchange audio and video between two browser participants using Realtime SFU.","url":"https://developers.cloudflare.com/realtime/sfu/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
