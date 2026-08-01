---
description: Supported and unsupported MoQ Transport messages for each draft version deployed by Cloudflare.
title: MoQ Feature Matrix
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/moq/llms.txt
> Use this file to discover all available pages before exploring further.

# MoQ Feature Matrix

Last updated Jul 31, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/moq/feature-matrix/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Draft-16 messages

### Supported

| Message                             | Support | Relevant specification                                                                             |
| ----------------------------------- | ------- | -------------------------------------------------------------------------------------------------- |
| SUBSCRIBE                           | ✅       | [draft-ietf-moq-transport-16 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| UNSUBSCRIBE                         | ✅       | [draft-ietf-moq-transport-16 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| PUBLISH                             | ✅       | [draft-ietf-moq-transport-16 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| PUBLISH\_OK                         | ✅       | [draft-ietf-moq-transport-16 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| SUBSCRIBE\_NAMESPACE                | ✅       | [draft-ietf-moq-transport-16 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| SUBSCRIBE\_NAMESPACE\_OK            | ✅       | [draft-ietf-moq-transport-16 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| SUBSCRIBE\_NAMESPACE\_ERROR         | ✅       | [draft-ietf-moq-transport-16 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| UNSUBSCRIBE\_NAMESPACE              | ✅       | [draft-ietf-moq-transport-16 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| SUBSCRIBE\_OK                       | ✅       | [draft-ietf-moq-transport-16 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| SUBSCRIBE\_ERROR                    | ✅       | [draft-ietf-moq-transport-16 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| TRACK\_STATUS                       | ✅       | [draft-ietf-moq-transport-16 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| TRACK\_STATUS\_OK                   | ✅       | [draft-ietf-moq-transport-16 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| SETUP\_MESSAGES (client and server) | ✅       | [draft-ietf-moq-transport-16 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |

### Partial

| Message           | Support | Notes                                                                                                                                 | Relevant specification                                                                             |
| ----------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| MAX\_REQUEST\_ID  | Partial | Initial limit negotiated in SETUP and mid-session raises are applied. REQUESTS\_BLOCKED does not trigger an automatic limit increase. | [draft-ietf-moq-transport-16 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| REQUESTS\_BLOCKED | Partial | Received and logged. It does not trigger an automatic MAX\_REQUEST\_ID response.                                                      | [draft-ietf-moq-transport-16 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |

### Unsupported

| Message              | Support | Relevant specification                                                                             |
| -------------------- | ------- | -------------------------------------------------------------------------------------------------- |
| GOAWAY               | No      | [draft-ietf-moq-transport-16 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| SUBSCRIBE\_UPDATE    | No      | [draft-ietf-moq-transport-16 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| PUBLISH\_ERROR       | No      | [draft-ietf-moq-transport-16 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| FETCH                | No      | [draft-ietf-moq-transport-16 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| FETCH\_OK            | No      | [draft-ietf-moq-transport-16 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| FETCH\_ERROR         | No      | [draft-ietf-moq-transport-16 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| FETCH\_CANCEL        | No      | [draft-ietf-moq-transport-16 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |
| TRACK\_STATUS\_ERROR | No      | [draft-ietf-moq-transport-16 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) |

## Draft-14 messages

### Supported

| Message                             | Support | Relevant specification                                                                             |
| ----------------------------------- | ------- | -------------------------------------------------------------------------------------------------- |
| SUBSCRIBE                           | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| UNSUBSCRIBE                         | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| TRACK\_STATUS                       | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| PUBLISH\_NAMESPACE\_CANCEL          | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| PUBLISH\_NAMESPACE\_OK              | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| PUBLISH\_NAMESPACE\_ERROR           | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| PUBLISH\_OK                         | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| PUBLISH\_NAMESPACE                  | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| PUBLISH\_NAMESPACE\_DONE            | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| PUBLISH\_DONE                       | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| SUBSCRIBE\_OK                       | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| SUBSCRIBE\_ERROR                    | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| TRACK\_STATUS\_OK                   | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| SETUP\_MESSAGES (client and server) | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |

### Unsupported

| Message                     | Support | Relevant specification                                                                             |
| --------------------------- | ------- | -------------------------------------------------------------------------------------------------- |
| GOAWAY                      | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| MAX\_REQUEST\_ID            | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| REQUESTS\_BLOCKED           | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| SUBSCRIBE\_UPDATE           | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| PUBLISH\_ERROR              | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| FETCH                       | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| FETCH\_OK                   | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| FETCH\_ERROR                | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| FETCH\_CANCEL               | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| TRACK\_STATUS\_ERROR        | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| SUBSCRIBE\_NAMESPACE        | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| SUBSCRIBE\_NAMESPACE\_OK    | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| SUBSCRIBE\_NAMESPACE\_ERROR | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| UNSUBSCRIBE\_NAMESPACE      | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/moq/feature-matrix/#page","headline":"MoQ Feature Matrix · Cloudflare MoQ docs","description":"Supported and unsupported MoQ Transport messages for each draft version deployed by Cloudflare.","url":"https://developers.cloudflare.com/moq/feature-matrix/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-31","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
