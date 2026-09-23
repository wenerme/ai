---
description: Use the Realtime SFU HTTPS API from your backend to manage sessions, tracks, DataChannels, and WebSocket media adapters.
title: Connection API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Connection API

Last updated Sep 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/sfu/api/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Use the Connection API to manage a Realtime SFU application's media resources. Your backend sends authenticated HTTPS requests, while endpoints exchange media and DataChannels with the SFU over WebRTC.

Base URL:

```txt
https://rtc.live.cloudflare.com/v1
```

Send `Authorization: Bearer <APP_SECRET>` and `Content-Type: application/json`. Keep the App Secret on trusted backend infrastructure. Endpoint authentication and resource authorization belong to your application.

[Download the full OpenAPI schema](https://developers.cloudflare.com/realtime/static/realtime-api-2024-05-21.yaml) for request and response fields.

To implement a connection, follow the [browser and backend recipes](https://developers.cloudflare.com/realtime/sfu/get-started/connection-patterns/) for publication, reception, messages, or media with controls. Use this reference to look up operations and fields.

## Create an application

Create an SFU app in the dashboard or through the [Cloudflare account API](https://developers.cloudflare.com/api/resources/calls/subresources/sfu/methods/create/). App creation uses your Cloudflare account authorization. The Connection API uses the resulting SFU App ID and App Secret.

The [quickstart](https://developers.cloudflare.com/realtime/sfu/get-started/) shows this setup with a Worker backend.

## Session and track operations

The paths in this table are relative to the base URL:

| Operation | Method and path |
| --- | --- |
| Create a session | `POST /apps/{appId}/sessions/new` |
| Publish or subscribe to tracks | `POST /apps/{appId}/sessions/{sessionId}/tracks/new` |
| Update tracks | `PUT /apps/{appId}/sessions/{sessionId}/tracks/update` |
| Submit a renegotiation answer | `PUT /apps/{appId}/sessions/{sessionId}/renegotiate` |
| Close tracks | `PUT /apps/{appId}/sessions/{sessionId}/tracks/close` |
| Read session information | `GET /apps/{appId}/sessions/{sessionId}` |

Refer to [sessions and tracks](https://developers.cloudflare.com/realtime/sfu/concepts/sessions-tracks/) for publication and identifier ownership.

### Correlate session creation

The optional `correlationId` query parameter on `sessions/new` is a diagnostic label. Repeating it creates another session. The API cannot look up sessions by this label. Retain the returned `sessionId`, and follow [recovery guidance](https://developers.cloudflare.com/realtime/sfu/concepts/negotiation/#retry-and-reconnect) if the response is lost.

### Inspect a session

Call `GET /apps/{appId}/sessions/{sessionId}` to inspect the session's media tracks and DataChannels. The response identifies media by `mid` and channels by their allocated `id`. For a remote resource, `sessionId` identifies its publisher:

```json
{
  "tracks": [
    {
      "location": "local",
      "mid": "0",
      "trackName": "camera",
      "status": "inactive"
    }
  ],
  "dataChannels": [
    {
      "location": "remote",
      "sessionId": "<PUBLISHER_SESSION_ID>",
      "dataChannelName": "controls",
      "id": 2,
      "status": "active"
    }
  ]
}
```

Interpret the resource's `status` as follows:

| Status | Media track | DataChannel |
| --- | --- | --- |
| `active` | Has not closed or become unavailable. | Open. |
| `inactive` | Closed or unavailable. | No longer connecting or open. |
| `initializing` | Not applicable. | Still connecting. |

A media track marked `active` does not prove that packets are arriving or playing. Use [endpoint statistics](https://developers.cloudflare.com/realtime/sfu/observability/#inspect-browser-media-statistics) to check delivery. Forced closure can leave a track listed as `inactive`.

The response contains resource state, not SDP or request history. Pending requests can still change it, even when the resource lists are empty. Follow [retry and reconnect guidance](https://developers.cloudflare.com/realtime/sfu/concepts/negotiation/#retry-and-reconnect) before resuming mutations.

## DataChannel operations

These operations act on the same session and negotiation state as its media tracks:

| Operation | Method and path |
| --- | --- |
| Establish transport | `POST /apps/{appId}/sessions/{sessionId}/datachannels/establish` |
| Publish or subscribe to channels | `POST /apps/{appId}/sessions/{sessionId}/datachannels/new` |
| Update subscription flags | `PUT /apps/{appId}/sessions/{sessionId}/datachannels/update` |
| Close channels | `PUT /apps/{appId}/sessions/{sessionId}/datachannels/close` |

Refer to [DataChannels](https://developers.cloudflare.com/realtime/sfu/features/datachannels/) for negotiated IDs, reliability, readiness, and reply access.

## WebSocket adapter operations

Create adapters to ingest external audio or stream existing audio/video publications to WebSocket endpoints:

| Operation | Method and path |
| --- | --- |
| Create adapters | `POST /apps/{appId}/adapters/websocket/new` |
| Close adapters | `POST /apps/{appId}/adapters/websocket/close` |

The [WebSocket adapter reference](https://developers.cloudflare.com/realtime/sfu/features/media-transport-adapters/websocket-adapter/) covers formats, request limits, partial success, reconnect, and close behavior.

## Batch resource operations

Track and DataChannel create, update, and close operations accept multiple entries in their `tracks` or `dataChannels` array. For example, publish camera and microphone tracks together, or request several publications in one receiving-session call. Each batch targets the session in the request URL.

For `tracks/new` and `datachannels/new`, keep every entry `local` or every entry `remote`. A remote batch can reference different publishing sessions. Follow the [operation's limits](https://developers.cloudflare.com/realtime/sfu/platform/limits/#api-and-resource-limits) when choosing its size. WebSocket adapter creation and closure accept one to four entries per request.

## Handle responses and negotiation

Check the HTTP status, top-level errors, and every per-track or per-channel result. Public errors use `errorCode` and `errorDescription`. Preserve successful allocations from partially successful requests. Look up the code and its next action in [Error codes](https://developers.cloudflare.com/realtime/sfu/observability/error-codes/).

Complete any required SDP exchange before starting the next mutation on that session. Other sessions can proceed independently. [Connection patterns](https://developers.cloudflare.com/realtime/sfu/get-started/connection-patterns/) gives the request sequences, including how to answer an SFU offer. [Negotiation and session lifecycle](https://developers.cloudflare.com/realtime/sfu/concepts/negotiation/) explains concurrent handlers, uncertain request outcomes, and retries.

## Network connectivity

Configure endpoint ICE, STUN, and TURN as part of [connection preparation](https://developers.cloudflare.com/realtime/sfu/get-started/connection-patterns/#network-connectivity). That section also covers connection waits and candidate gathering.

## Learn with an example

[Run the video room](https://developers.cloudflare.com/realtime/sfu/get-started/) to follow backend session and track operations. The [DataChannel example ↗](https://github.com/cloudflare/realtime-examples/tree/main/echo-datachannels#api-and-lifecycle) shows the same API boundary in a small local Node.js server.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/sfu/api/#page","headline":"Connection API","description":"Use the Realtime SFU HTTPS API from your backend to manage sessions, tracks, DataChannels, and WebSocket media adapters.","url":"https://developers.cloudflare.com/realtime/sfu/api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
