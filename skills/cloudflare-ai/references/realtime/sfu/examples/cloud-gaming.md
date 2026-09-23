---
description: Stream a Container's audio and video to browsers and return authorized keyboard and pointer input through Realtime SFU.
title: Cloud gaming
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloud gaming

Last updated Sep 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/sfu/examples/cloud-gaming/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Run Freedoom in a Cloudflare Container, stream its audio and video through Realtime SFU, and send browser input back over DataChannels. Multiple viewers can watch while one browser tab controls the game.

This experimental example demonstrates a native publisher and browser receivers. The same media-and-control topology can inform remote application and device interfaces.

[Open the example](https://github.com/cloudflare/realtime-examples/tree/main/cloud-gaming)

## How it works

The Container captures H.264 video and Opus audio. Its native publisher sends both tracks through a WebRTC connection to Realtime SFU. Each browser uses one SFU session and PeerConnection for received media and input DataChannels.

Application boundary

**Browser tab**

**Worker**

**Game state**

**Realtime SFU**

**Container publisher**

Access identity + per-tab capability · One SFU session and PeerConnection per browser tab

App request

Typed RPC

Start or stop

Register publisher

Create SFU resources

Publish H.264 + Opus

Publish two input channels

Subscribe to media + channels

Enable controller replies

Reliable keyboard + buttons

Replaceable pointer movement

Forward controller input

A Worker authenticates browser requests and holds the SFU credentials. A Durable Object owns the game run, viewer membership, controller selection, and resource cleanup. The Container's publisher and the browser exchange media and input through the SFU.

## Requirements

- A Cloudflare account with [Workers Paid and Containers](https://developers.cloudflare.com/containers/get-started/).
- Node.js 22.12 or later and Docker or a compatible container engine.
- An [SFU App ID and App Secret](https://developers.cloudflare.com/realtime/sfu/get-started/#create-your-first-app).
- A desktop browser with keyboard and pointer-lock support.
- Cloudflare Access for a deployed application.

## Run and verify

1. **Prepare the example.** Run:

   ```sh
   git clone https://github.com/cloudflare/realtime-examples.git
   cd realtime-examples/cloud-gaming
   ```

   npmyarnpnpmbun

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

   Create the ignored configuration file:

   ```sh
   cp .dev.vars.example .dev.vars
   chmod 600 .dev.vars
   ```

   Set `REALTIME_SFU_APP_ID` and `REALTIME_SFU_BEARER_TOKEN` to your SFU app values.
2. **Start the application.** With your container engine running, start development:npmyarnpnpm

   ```
   npm run dev
   ```

   ```
   yarn run dev
   ```

   ```
   pnpm run dev
   ```

   Open `http://localhost:8787/`. The local identity path works on loopback hosts only.
3. **Start the game.** Select **Start** and wait for **Running**. Open a second browser tab and confirm both tabs receive video and audio.
4. **Take control.** In one tab, select **Take control**. Once control is ready, select the game to capture the pointer, then use the keyboard and mouse. The other tab should remain view-only.

   Use **Send Esc** for the game menu. The browser's Escape action releases pointer lock. Select **Release control** to allow another tab to take control.

For deployment, follow the example's [deployment instructions ↗](https://github.com/cloudflare/realtime-examples/tree/main/cloud-gaming#deploy). They install the SFU values as Worker secrets and configure the Access team domain and audience. Protect the hostname with the matching Access policy before inviting viewers.

## Choose delivery settings for input

The example uses separate named channels for discrete actions and replaceable input:

| Input | Delivery | Reason |
| --- | --- | --- |
| Keyboard, buttons, wheel, and reset | Reliable and ordered | Preserve discrete actions and their order |
| Pointer movement | Unordered, `maxRetransmits: 0` | New movement replaces older movement |

The publisher chooses each channel's policy, and every subscriber mirrors it. Each browser uses the matching delivery settings with its own allocated channel ID. Refer to [DataChannel delivery settings](https://developers.cloudflare.com/realtime/sfu/features/datachannels/#configure-message-delivery).

## Control ownership

Viewers initially subscribe with `canReply: false` and acknowledge channel readiness with `waitForAck`. The backend grants reply access by updating the selected viewer's existing subscriptions.

The application identifies each controller selection with a generation. The browser sends input only after the publisher confirms its viewer and generation. The application releases held input when control changes, pointer lock is lost, or the run ends.

`canReply` restricts the SFU return path. The backend still authenticates and authorizes the operator. Refer to [reply access](https://developers.cloudflare.com/realtime/sfu/features/datachannels/#return-to-publisher-canreply) and the example's [architecture ↗](https://github.com/cloudflare/realtime-examples/blob/main/cloud-gaming/ARCHITECTURE.md).

## Stop and clean up

Select **Stop game** and wait for **Offline** before deleting a deployment. The application stops the Container and closes known SFU tracks and DataChannels. Follow the [cleanup instructions ↗](https://github.com/cloudflare/realtime-examples/tree/main/cloud-gaming#clean-up) to remove the Worker and Access application.

A failed media pipeline ends the run; transparent publisher restart is not implemented.

## Adapt the example

The example implements one fixed game slot and one controller. Admission limits, rate limiting, and Access policy provisioning are deployment responsibilities.

For a shared CAD viewer or simulation, replace Freedoom and adapt application startup, capture, and input handling. Preserve viewer authorization, controller ownership, and cleanup. Add the file ownership and save/export behavior your application needs. Refer to [production integration ↗](https://github.com/cloudflare/realtime-examples/blob/main/cloud-gaming/PRODUCTION.md) for the application policies and controls to add.

## Inspect the implementation

Inspect the example's [input channel definitions ↗](https://github.com/cloudflare/realtime-examples/blob/main/cloud-gaming/src/shared/input-channels.ts) to compare reliable controls with transient pointer movement.

## Troubleshooting

Use the [troubleshooting guide ↗](https://github.com/cloudflare/realtime-examples/blob/main/cloud-gaming/TROUBLESHOOTING.md) to diagnose Container startup, media, and control failures.

## Try another example

[Pocket Radio](https://developers.cloudflare.com/realtime/sfu/examples/embedded-devices/) applies a related observer/controller pattern on embedded hardware.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/sfu/examples/cloud-gaming/#page","headline":"Cloud gaming","description":"Stream a Container's audio and video to browsers and return authorized keyboard and pointer input through Realtime SFU.","url":"https://developers.cloudflare.com/realtime/sfu/examples/cloud-gaming/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
