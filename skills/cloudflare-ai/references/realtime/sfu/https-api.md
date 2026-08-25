---
description: Manage Realtime SFU sessions and media tracks using the HTTPS connection API.
title: Connection API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Connection API

Last updated Jul 30, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/sfu/https-api/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare Realtime simplifies the management of peer connections and media tracks through HTTPS API endpoints. These endpoints allow developers to efficiently manage sessions, add or remove tracks, and gather session information.

## API Endpoints

* **Create a New Session**: Initiates a new session on Cloudflare Realtime, which can be modified with other endpoints below.
  * `POST /apps/{appId}/sessions/new`
* **Add a New Track**: Adds a media track (audio or video) to an existing session.
  * `POST /apps/{appId}/sessions/{sessionId}/tracks/new`
* **Update Tracks**: Changes tracks by reusing existing transceivers.
  * `PUT /apps/{appId}/sessions/{sessionId}/tracks/update`
* **Renegotiate a Session**: Updates the session's negotiation state to accommodate new tracks or changes in the existing ones.
  * `PUT /apps/{appId}/sessions/{sessionId}/renegotiate`
* **Close a Track**: Removes a specified track from the session.
  * `PUT /apps/{appId}/sessions/{sessionId}/tracks/close`
* **Establish a DataChannel Transport**: Pulls the `server-events` channel to establish DataChannel transport. Call this before you add DataChannels.
  * `POST /apps/{appId}/sessions/{sessionId}/datachannels/establish`
* **Add DataChannels**: Publishes a local DataChannel or pulls a remote one (optional `waitForAck`, `canReply`).
  * `POST /apps/{appId}/sessions/{sessionId}/datachannels/new`
* **Update DataChannels**: Grants or revokes flags on an already pulled remote DataChannel (for example `canReply`).
  * `PUT /apps/{appId}/sessions/{sessionId}/datachannels/update`
* **Close DataChannels**: Removes a specified DataChannel from the session.
  * `PUT /apps/{appId}/sessions/{sessionId}/datachannels/close`
* **Retrieve Session Information**: Fetches detailed information about a specific session.
  * `GET /apps/{appId}/sessions/{sessionId}`

[View full API and schema (OpenAPI format)](https://developers.cloudflare.com/realtime/static/realtime-api-2024-05-21.yaml)

## Handling Secrets

It is vital to manage App ID and its secret securely. While track and session IDs can be public, they should be protected to prevent misuse. An attacker could exploit these IDs to disrupt service if your backend server does not authenticate request origins properly, for example by sending requests to close tracks on sessions other than their own. Ensuring the security and authenticity of requests to your backend server is crucial for maintaining the integrity of your application.

## Using STUN and TURN Servers

Cloudflare Realtime is designed to operate efficiently without the need for TURN servers in most scenarios, as Cloudflare exposes a publicly routable IP address for Realtime. However, integrating a STUN server can be necessary for facilitating peer discovery and connectivity.

* **Cloudflare STUN Server**: `stun.cloudflare.com:3478`

Utilizing Cloudflare's STUN server can help the connection process for Realtime applications.

## Lifecycle of a Simple Session

This section provides an overview of the typical lifecycle of a simple session, focusing on audio-only applications. It illustrates how clients are notified by the backend server as new remote clients join or leave, incorporating video would introduce additional tracks and considerations into the session.

sequenceDiagram
    participant WA as WebRTC Agent
    participant BS as Backend Server
    participant CA as Realtime API

    Note over BS: Client Joins

    WA->>BS: Request
    BS->>CA: POST /sessions/new
    CA->>BS: newSessionResponse
    BS->>WA: Response

    WA->>BS: Request
    BS->>CA: POST /sessions/<ID>/tracks/new (Offer)
    CA->>BS: newTracksResponse (Answer)
    BS->>WA: Response

    WA-->>CA: ICE Connectivity Check
    Note over WA: iceconnectionstatechange (connected)
    WA-->>CA: DTLS Handshake
    Note over WA: connectionstatechange (connected)

    WA<<->>CA: *Media Flow*

    Note over BS: Remote Client Joins

    WA->>BS: Request
    BS->>CA: POST /sessions/<ID>/tracks/new
    CA->>BS: newTracksResponse (Offer)
    BS->>WA: Response

    WA->>BS: Request
    BS->>CA: PUT /sessions/<ID>/renegotiate (Answer)
    CA->>BS: OK
    BS->>WA: Response

    Note over BS: Remote Client Leaves

    WA->>BS: Request
    BS->>CA: PUT /sessions/<ID>/tracks/close
    CA->>BS: closeTracksResponse
    BS->>WA: Response

    Note over BS: Client Leaves

    WA->>BS: Request
    BS->>CA: PUT /sessions/<ID>/tracks/close
    CA->>BS: closeTracksResponse
    BS->>WA: Response

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/sfu/https-api/#page","headline":"Connection API · Cloudflare Realtime docs","description":"Manage Realtime SFU sessions and media tracks using the HTTPS connection API.","url":"https://developers.cloudflare.com/realtime/sfu/https-api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
