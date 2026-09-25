---
description: Build browser video rooms with Realtime SFU publication, track discovery, backend authorization, and explicit cleanup.
title: Custom video room
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom video room

Last updated Sep 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/sfu/examples/video-room/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Build a browser room where participants publish camera and microphone tracks and receive each other's media. The example exposes the SFU operations and the application state that connects them.

[Run the quickstart](https://developers.cloudflare.com/realtime/sfu/get-started/) [Open the source](https://github.com/cloudflare/realtime-examples/tree/main/video-room)

The example is experimental. It includes backend authentication and authorization, reconnect, and cleanup. Its [production guide ↗︎](https://github.com/cloudflare/realtime-examples/blob/main/video-room/PRODUCTION.md) identifies the policies and controls to integrate for your application.

## How it works

Each browser owns separate publishing and receiving PeerConnections. Each connection corresponds to an SFU session. This makes the two negotiation lifecycles independent.

Trusted application boundary

Realtime SFU

**Browser participant**

**Worker**

**Room Durable Object**

**Producer session**

**Consumer session**

Access identity + member capability · HTTP owns snapshots, SDP, and mutations

Authenticated HTTP request

Typed RPC

Tagged result

Authorized JSON + SDP

Separate producer and consumer PeerConnections · Separate per-session SDP queues

SFU API with server credential

Publish audio + video

SFU API with server credential

Remote audio + video

WebSocket upgrade + single-use ticket

fetch() for upgrade only

room-changed revision

Notification triggers an authorized HTTP snapshot

The components have these responsibilities:

| Component | Responsibility |
| --- | --- |
| Browser | Capture media, apply SDP, receive tracks, and display room and connection state |
| Worker | Authenticate requests and route authorized application operations |
| Durable Object | Own room membership, track discovery, room permissions, reconnect state, and cleanup |
| Realtime SFU | Receive published audio/video and forward the tracks requested by each receiving session |

A hibernating WebSocket notifies browsers that a room revision changed. Browsers fetch the authoritative snapshot over HTTP. A periodic safety poll also checks for changes. Closing the notification socket does not by itself remove a participant.

## Publication and discovery

The publisher sends an SDP offer through the backend to `tracks/new`. After publication succeeds, the Durable Object stores the track names and media kinds in the room's discovery state.

Other participants request the publications they want. The backend translates those requests into remote track subscriptions using publisher session IDs and track names. Any required SFU offer/answer exchange completes before another mutation starts on that session.

Refer to [sessions and tracks](https://developers.cloudflare.com/realtime/sfu/concepts/sessions-tracks/) and [negotiation](https://developers.cloudflare.com/realtime/sfu/concepts/negotiation/) for the shared model.

## Identity and room permissions

A deployed room uses Cloudflare Access identity. A browser also receives application membership that owns its subsequent room operations. Room names, participant IDs, track names, and SFU session IDs are locators, not credentials.

The first successful participant becomes the room creator and can terminate the room. Other participants can leave their own membership. The example keeps provider secrets on the Worker and validates operations before calling the SFU.

## Deploy the room

Complete the [local quickstart](https://developers.cloudflare.com/realtime/sfu/get-started/) to prepare the checkout and `.dev.vars` file. A deployed room uses Workers, Durable Objects, and a Cloudflare Access application protecting the Worker hostname.

1. Complete the [Access application setup](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) for your Worker hostname. Keep the Access team domain and application audience for deployment.
2. From `realtime-examples/video-room`, run the deployment script:npmyarnpnpm

   ```
   npm run deploy -- --secrets-file .dev.vars --var "CF_ACCESS_TEAM_DOMAIN:<TEAM_NAME>.cloudflareaccess.com" --var "CF_ACCESS_AUD:<ACCESS_APPLICATION_AUDIENCE>"
   ```

   ```
   yarn run deploy -- --secrets-file .dev.vars --var "CF_ACCESS_TEAM_DOMAIN:<TEAM_NAME>.cloudflareaccess.com" --var "CF_ACCESS_AUD:<ACCESS_APPLICATION_AUDIENCE>"
   ```

   ```
   pnpm run deploy -- --secrets-file .dev.vars --var "CF_ACCESS_TEAM_DOMAIN:<TEAM_NAME>.cloudflareaccess.com" --var "CF_ACCESS_AUD:<ACCESS_APPLICATION_AUDIENCE>"
   ```

   Replace both Access placeholders. The script uploads the SFU values as Worker secrets. The Worker verifies the matching Access identity before allowing room operations.
3. On the protected hostname, open `/rooms/two-browser-check`. Sign in and repeat the quickstart's two-participant verification before sharing the deployment.

## Reconnect and cleanup

The application defines these transitions:

| Action | Behavior |
| --- | --- |
| Join | Create membership plus publishing and receiving sessions |
| Refresh or replace a failed connection | Retain application identity, replace SFU sessions, republish, and rebuild subscriptions |
| Leave | Close known resources and confirm cleanup before clearing membership in the browser |
| Terminate room | The creator ends the room and starts cleanup for its participants |
| Abandoned tab | Heartbeat expiry schedules cleanup, with retries when resource closure fails |

A missing heartbeat can leave an abandoned participant visible for up to 45 seconds before it becomes eligible for cleanup. Backend errors can delay completion. Repeated reconnect setup failures can require a page reload.

### Remove a deployment

End active rooms and wait for cleanup confirmation before removing the backend. From the example directory, delete the Worker:

npmyarnpnpm

```
npx wrangler delete
```

```
yarn wrangler delete
```

```
pnpm wrangler delete
```

Remove the associated Access application separately. Delete `.dev.vars` when you no longer need the credentials. Delete a dedicated SFU app only after all applications using it have stopped.

## Adapt the room

Keep authentication, resource ownership, and the per-session negotiation queues when adapting the example. Replace display and presence behavior through the browser/backend contract rather than trusting browser-supplied SFU identifiers.

The example does not implement screen sharing, chat, recording, simulcast controls, or advanced layouts. Rate limiting, room quotas, and Access policy provisioning remain application responsibilities.

## Inspect the implementation

Trace the example's [signaling and state flow ↗︎](https://github.com/cloudflare/realtime-examples/blob/main/video-room/ARCHITECTURE.md#signaling-and-state-flow) and [SDP serialization ↗︎](https://github.com/cloudflare/realtime-examples/blob/main/video-room/ARCHITECTURE.md#sdp-serialization).

## Troubleshooting

Use the [troubleshooting guide ↗︎](https://github.com/cloudflare/realtime-examples/blob/main/video-room/TROUBLESHOOTING.md) for media, authentication, and lifecycle symptoms.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/sfu/examples/video-room/#page","headline":"Custom video room","description":"Build browser video rooms with Realtime SFU publication, track discovery, backend authorization, and explicit cleanup.","url":"https://developers.cloudflare.com/realtime/sfu/examples/video-room/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
