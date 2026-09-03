---
description: Allow the domains and ports required for RealtimeKit connectivity.
title: Network allowlist
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Network allowlist

Last updated Sep 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/network-allowlist/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If your network restricts outbound traffic, allow the following RealtimeKit domains and ports.

## Allow service domains

Allow these domains for RealtimeKit SDKs:

| Domain                               | Purpose                                                           |
| ------------------------------------ | ----------------------------------------------------------------- |
| api.realtime.cloudflare.com          | Handles requests from RealtimeKit SDKs                            |
| api-silos.realtime.cloudflare.com    | Collects SDK logs                                                 |
| da-collector.realtime.cloudflare.com | Collects call statistics                                          |
| location.realtime.cloudflare.com     | Determines the location in call statistics reports                |
| r2.cloudflarestorage.com             | Stores and retrieves chat messages                                |
| socket-edge.realtime.cloudflare.com  | Establishes signaling connections between clients and RealtimeKit |

If your application uses RealtimeKit Web UI Kit, also allow these domains:

| Domain                              | Purpose                                                |
| ----------------------------------- | ------------------------------------------------------ |
| rtk-assets.realtime.cloudflare.com  | Serves Web UI Kit assets, including speaker-test audio |
| rtk-uploads.realtime.cloudflare.com | Serves notification sounds and other Web UI Kit assets |

Applications that use only RealtimeKit Core do not require the Web UI Kit asset domains.

## Allow media traffic

RealtimeKit uses the [Cloudflare Realtime SFU](https://developers.cloudflare.com/realtime/sfu/) for media connections. Allow the following Session Traversal Utilities for NAT (STUN) and Traversal Using Relays around NAT (TURN) traffic:

| Protocol      | Domain              | Primary port | Alternate port |
| ------------- | ------------------- | ------------ | -------------- |
| STUN over UDP | stun.cloudflare.com | 3478/udp     | 53/udp         |
| TURN over UDP | turn.cloudflare.com | 3478/udp     | 53/udp         |
| TURN over TCP | turn.cloudflare.com | 3478/tcp     | 80/tcp         |
| TURN over TLS | turn.cloudflare.com | 5349/tcp     | 443/tcp        |

Allow the primary and alternate ports where possible. Do not rely only on `53/udp`, because Internet service providers and browsers can block this port.

For protocol details, refer to [Service address and ports](https://developers.cloudflare.com/realtime/turn/#service-address-and-ports).

## Use a wildcard domain

If your network policy supports wildcard domains, you can use `*.realtime.cloudflare.com` instead of the listed `realtime.cloudflare.com` domains.

Individual domain rules are recommended because they restrict access to only the required services. If you use the wildcard domain, you must still allow `r2.cloudflarestorage.com`, `stun.cloudflare.com`, and `turn.cloudflare.com` separately, because the wildcard does not cover them.

## Verify connectivity

Run the [RealtimeKit pre-call test ↗](https://test.realtime.cloudflare.com/) to verify your device can reach the required services.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/network-allowlist/#page","headline":"Network allowlist · Cloudflare Realtime docs","description":"Allow the domains and ports required for RealtimeKit connectivity.","url":"https://developers.cloudflare.com/realtime/realtimekit/network-allowlist/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-03","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
