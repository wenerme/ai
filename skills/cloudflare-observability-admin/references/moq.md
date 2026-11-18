---
description: Deliver low-latency live media content using the MoQ protocol over QUIC transport on Cloudflare's network.
title: Media over QUIC at Cloudflare
image: https://developers.cloudflare.com/moq/og.png?v=a38785c613daaafb
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/moq/llms.txt
> Use this file to discover all available pages before exploring further.

# Media over QUIC at Cloudflare

MoQ (Media over QUIC) is a protocol for delivering live media content using QUIC transport. It provides efficient, low-latency media streaming by leveraging QUIC's multiplexing and connection management capabilities.

MoQ is designed to be an Internet infrastructure level service that provides media delivery to applications, similar to how HTTP provides content delivery and WebRTC provides real-time communication.

Cloudflare recommends [draft-18 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-18) of the MoQ Transport specification for new deployments. Draft-16 and draft-14 endpoints remain available for existing clients. Refer to the [MoQ feature matrix](https://developers.cloudflare.com/moq/feature-matrix/) for draft-specific capabilities.

For the most up-to-date documentation on the protocol, please visit the IETF working group documentation.

## Get started

Cloudflare MoQ relays are available through the [Cloudflare dashboard ↗︎](https://dash.cloudflare.com/) and the [API](https://developers.cloudflare.com/api/resources/moq). They are free to use during the beta period.

### Provision a relay

Each relay provides an isolated scope — your namespaces, tracks, and objects are separated from those belonging to other relays. You control who can publish and who can subscribe by issuing tokens scoped to the operations each client needs.

Before using the API, [create a Cloudflare API token with MoQ permissions](https://developers.cloudflare.com/moq/use-the-api/#create-a-management-api-token). Use **Account** > **MoQ** > **Edit**, scoped to your account. The dashboard groups MoQ under Realtime, but Realtime permissions do not grant MoQ API access.

To create a relay via the API:

```sh
curl -X POST \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/moq/relays" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "My Relay"}'
```

Cloudflare returns a relay ID and two default tokens: one that can publish and subscribe, and one that can only subscribe. Token secrets are shown once in the response and never stored.

These relay connection tokens authenticate publishers and subscribers. They are separate from the Cloudflare API token used to manage relays. For response fields and token-management examples, refer to [Use the MoQ API](https://developers.cloudflare.com/moq/use-the-api/).

You can also create and manage relays in the Cloudflare dashboard under **Media** > **Realtime** > **MoQ Relay**.

### Connect a publisher and subscriber (draft-18)

Use `https://draft-18.cloudflare.mediaoverquic.com` with draft-18-compatible clients. Both publisher and subscriber must use the same draft endpoint and tokens from the same relay.

Clients send a relay connection token in the URL path when opening a MoQ session. For the open-source [moq-rs ↗︎](https://github.com/cloudflare/moq-rs/tree/draft-18-dev) tools, use the `draft-18-dev` branch for draft-18 support. Changing the endpoint alone does not upgrade a draft-16 client.

**Publisher:**

```sh
ffmpeg -stream_loop -1 -re -i input.mp4 \
  -f mp4 -movflags empty_moov+frag_every_frame+separate_moof+omit_tfhd_offset - \
  | moq-pub --name my-namespace \
    "https://draft-18.cloudflare.mediaoverquic.com/<PUBLISH_SUBSCRIBE_TOKEN>"
```

**Subscriber:**

```sh
moq-sub --name my-namespace \
  "https://draft-18.cloudflare.mediaoverquic.com/<SUBSCRIBE_TOKEN>" \
  | ffplay -hide_banner -
```

Token security

Tokens sent in the URL path appear in server access logs. Issue separate tokens per client, set short expiration times, and rotate tokens when a client's access should end. You can create additional tokens and set expiration times using the [API](https://developers.cloudflare.com/api/resources/moq).

The IETF MoQ working group is developing in-band authentication standards — [C4M ↗︎](https://datatracker.ietf.org/doc/draft-ietf-moq-c4m/) and [Privacy Pass for MoQ ↗︎](https://datatracker.ietf.org/doc/draft-ietf-moq-privacy-pass-auth/) — that will enable richer token schemes without URL exposure. Cloudflare plans to support these as they mature.

### Connect a publisher and subscriber (draft-16)

For draft-16 clients, use the same relay-token URL format with the draft-16 endpoint:

```txt
https://draft-16.cloudflare.mediaoverquic.com/<RELAY_CONNECTION_TOKEN>
```

### Connect a publisher and subscriber (draft-14)

Draft-14 clients use the draft-14 endpoint:

```txt
https://draft-14.cloudflare.mediaoverquic.com/
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/moq/#page","headline":"Media over QUIC at Cloudflare","description":"Deliver low-latency live media content using the MoQ protocol over QUIC transport on Cloudflare's network.","url":"https://developers.cloudflare.com/moq/","inLanguage":"en","image":"https://developers.cloudflare.com/moq/og.png?v=a38785c613daaafb","dateModified":"2026-11-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
