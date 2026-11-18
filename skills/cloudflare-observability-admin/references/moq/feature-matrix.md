---
description: Supported and unsupported MoQ Transport messages for each draft version deployed by Cloudflare.
title: MoQ Feature Matrix
image: https://developers.cloudflare.com/moq/feature-matrix/og.png?v=2db53333c1a178be
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/moq/llms.txt
> Use this file to discover all available pages before exploring further.

# MoQ Feature Matrix

Use draft-18 for new deployments. Draft-16 and draft-14 remain available for existing clients. A client's MoQ Transport draft version must match its endpoint.

## Draft-18 capabilities

Connect draft-18-compatible clients to `draft-18.cloudflare.mediaoverquic.com`. Refer to [Get started](https://developers.cloudflare.com/moq/#get-started) for authentication and publisher/subscriber examples.

The draft-18 relay supports these workflows:

| Workflow | Messages | Notes |
| --- | --- | --- |
| Subscribe to a track | `SUBSCRIBE`, `SUBSCRIBE_OK`, `PUBLISH_DONE` | Receive live objects for a named track. |
| Publish a track | `PUBLISH`, `PUBLISH_OK`, `PUBLISH_DONE` | Push a track to the relay. |
| Advertise a namespace | `PUBLISH_NAMESPACE` | Make a publisher's namespace available for routing. |
| Discover namespaces | `SUBSCRIBE_NAMESPACE`, `NAMESPACE` | Discover matching namespaces. This does not subscribe to their tracks. |
| Subscribe to tracks under a prefix | `SUBSCRIBE_TRACKS`, `PUBLISH` | Receive track publications under a namespace prefix. |
| Fetch a range | `FETCH`, `FETCH_OK` | Forward standalone and joining FETCH requests to the publisher serving the namespace. The publisher must support FETCH and retain the requested objects. |
| Query track status | `TRACK_STATUS` | Request the status of a named track. |

Draft-18 uses `REQUEST_OK` and `REQUEST_ERROR` as shared responses for applicable requests. The draft-16 and draft-14 message tables do not apply to draft-18. Refer to [MoQ Transport draft-18 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-18) for wire formats.

## Draft-16 messages

### Supported

| Message | Support | Relevant specification |
| --- | --- | --- |
| SUBSCRIBE | ✅ | [draft-ietf-moq-transport-16 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| UNSUBSCRIBE | ✅ | [draft-ietf-moq-transport-16 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| PUBLISH | ✅ | [draft-ietf-moq-transport-16 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| PUBLISH\_OK | ✅ | [draft-ietf-moq-transport-16 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| SUBSCRIBE\_NAMESPACE | ✅ | [draft-ietf-moq-transport-16 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| SUBSCRIBE\_NAMESPACE\_OK | ✅ | [draft-ietf-moq-transport-16 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| SUBSCRIBE\_NAMESPACE\_ERROR | ✅ | [draft-ietf-moq-transport-16 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| UNSUBSCRIBE\_NAMESPACE | ✅ | [draft-ietf-moq-transport-16 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| SUBSCRIBE\_OK | ✅ | [draft-ietf-moq-transport-16 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| SUBSCRIBE\_ERROR | ✅ | [draft-ietf-moq-transport-16 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| TRACK\_STATUS | ✅ | [draft-ietf-moq-transport-16 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| TRACK\_STATUS\_OK | ✅ | [draft-ietf-moq-transport-16 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| SETUP\_MESSAGES (client and server) | ✅ | [draft-ietf-moq-transport-16 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |

### Partial

| Message | Support | Notes | Relevant specification |
| --- | --- | --- | --- |
| MAX\_REQUEST\_ID | Partial | Initial limit negotiated in SETUP and mid-session raises are applied. REQUESTS\_BLOCKED does not trigger an automatic limit increase. | [draft-ietf-moq-transport-16 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| REQUESTS\_BLOCKED | Partial | Received and logged. It does not trigger an automatic MAX\_REQUEST\_ID response. | [draft-ietf-moq-transport-16 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |

### Unsupported

| Message | Support | Relevant specification |
| --- | --- | --- |
| GOAWAY | No | [draft-ietf-moq-transport-16 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| SUBSCRIBE\_UPDATE | No | [draft-ietf-moq-transport-16 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| PUBLISH\_ERROR | No | [draft-ietf-moq-transport-16 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| FETCH | No | [draft-ietf-moq-transport-16 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| FETCH\_OK | No | [draft-ietf-moq-transport-16 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| FETCH\_ERROR | No | [draft-ietf-moq-transport-16 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| FETCH\_CANCEL | No | [draft-ietf-moq-transport-16 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| TRACK\_STATUS\_ERROR | No | [draft-ietf-moq-transport-16 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |

## Draft-14 messages

### Supported

| Message | Support | Relevant specification |
| --- | --- | --- |
| SUBSCRIBE | ✅ | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| UNSUBSCRIBE | ✅ | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| TRACK\_STATUS | ✅ | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| PUBLISH\_NAMESPACE\_CANCEL | ✅ | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| PUBLISH\_NAMESPACE\_OK | ✅ | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| PUBLISH\_NAMESPACE\_ERROR | ✅ | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| PUBLISH\_OK | ✅ | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| PUBLISH\_NAMESPACE | ✅ | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| PUBLISH\_NAMESPACE\_DONE | ✅ | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| PUBLISH\_DONE | ✅ | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| SUBSCRIBE\_OK | ✅ | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| SUBSCRIBE\_ERROR | ✅ | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| TRACK\_STATUS\_OK | ✅ | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| SETUP\_MESSAGES (client and server) | ✅ | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |

### Unsupported

| Message | Support | Relevant specification |
| --- | --- | --- |
| GOAWAY | No | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| MAX\_REQUEST\_ID | No | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| REQUESTS\_BLOCKED | No | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| SUBSCRIBE\_UPDATE | No | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| PUBLISH\_ERROR | No | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| FETCH | No | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| FETCH\_OK | No | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| FETCH\_ERROR | No | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| FETCH\_CANCEL | No | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| TRACK\_STATUS\_ERROR | No | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| SUBSCRIBE\_NAMESPACE | No | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| SUBSCRIBE\_NAMESPACE\_OK | No | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| SUBSCRIBE\_NAMESPACE\_ERROR | No | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| UNSUBSCRIBE\_NAMESPACE | No | [draft-ietf-moq-transport-14 ↗︎](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/moq/feature-matrix/#page","headline":"MoQ Feature Matrix","description":"Supported and unsupported MoQ Transport messages for each draft version deployed by Cloudflare.","url":"https://developers.cloudflare.com/moq/feature-matrix/","inLanguage":"en","image":"https://developers.cloudflare.com/moq/feature-matrix/og.png?v=2db53333c1a178be","dateModified":"2026-11-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
