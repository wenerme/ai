---
description: Deliver low-latency live media content using the MoQ protocol over QUIC transport on Cloudflare's network.
title: Media over QUIC at Cloudflare
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/moq/llms.txt
> Use this file to discover all available pages before exploring further.

# Media over QUIC at Cloudflare

Last updated Jul 31, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/moq/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

MoQ (Media over QUIC) is a protocol for delivering live media content using QUIC transport. It provides efficient, low-latency media streaming by leveraging QUIC's multiplexing and connection management capabilities.

MoQ is designed to be an Internet infrastructure level service that provides media delivery to applications, similar to how HTTP provides content delivery and WebRTC provides real-time communication.

Cloudflare currently supports [draft-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) and [draft-16 ↗](https://www.ietf.org/archive/id/draft-ietf-moq-transport-16.html) of the MoQ Transport specification. For a full breakdown of supported messages per draft, refer to [MoQ Feature Matrix](https://developers.cloudflare.com/moq/feature-matrix/).

For the most up-to-date documentation on the protocol, please visit the IETF working group documentation.

## Get started

Cloudflare MoQ relays are available through the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and the [API](https://developers.cloudflare.com/api/resources/moq). They are free to use during the beta period.

### Provision a relay

Each relay provides an isolated scope — your namespaces, tracks, and objects are separated from those belonging to other relays. You control who can publish and who can subscribe by issuing tokens scoped to the operations each client needs.

To create a relay via the API:

```sh
curl -X POST \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/moq/relays" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "My Relay"}'
```

Cloudflare returns a relay ID and two default tokens: one that can publish and subscribe, and one that can only subscribe. Token secrets are shown once in the response and never stored.

You can also create and manage relays in the Cloudflare dashboard under **Media** \> **Realtime** \> **MoQ Relay**.

### Connect a publisher and subscriber (draft-16)

Draft-16 requires authentication. Clients send a token in the URL path when opening a MoQ session. Using the open-source [moq-rs ↗](https://github.com/cloudflare/moq-rs) tools:

**Publisher:**

```sh
ffmpeg -stream_loop -1 -re -i input.mp4 \
  -f mp4 -movflags empty_moov+frag_every_frame+separate_moof+omit_tfhd_offset - \
  | moq-pub --name my-namespace \
    "https://draft-16.cloudflare.mediaoverquic.com/<publish_subscribe_token>"
```

**Subscriber:**

```sh
moq-sub --name my-namespace \
  "https://draft-16.cloudflare.mediaoverquic.com/<subscribe_token>" \
  | ffplay -hide_banner -
```

Token security

Tokens sent in the URL path appear in server access logs. Issue separate tokens per client, set short expiration times, and rotate tokens when a client's access should end. You can create additional tokens and set expiration times using the [API](https://developers.cloudflare.com/api/resources/moq).

The IETF MoQ working group is developing in-band authentication standards — [C4M ↗](https://datatracker.ietf.org/doc/draft-ietf-moq-c4m/) and [Privacy Pass for MoQ ↗](https://datatracker.ietf.org/doc/draft-ietf-moq-privacy-pass-auth/) — that will enable richer token schemes without URL exposure. Cloudflare plans to support these as they mature.

### Connect a publisher and subscriber (draft-14)

Draft-14 clients connect to:

```txt
https://draft-14.cloudflare.mediaoverquic.com/
```

### Test draft-18

Cloudflare is working on draft-18 support ahead of a global deployment. To test against a draft-18 relay in the meantime, refer to [moq-interop-runner ↗](https://github.com/englishm/moq-interop-runner).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/moq/#page","headline":"Overview · Cloudflare MoQ docs","description":"Deliver low-latency live media content using the MoQ protocol over QUIC transport on Cloudflare's network.","url":"https://developers.cloudflare.com/moq/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-31","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
