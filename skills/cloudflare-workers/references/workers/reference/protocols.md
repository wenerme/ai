---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Supported HTTP, TCP, gRPC, WebSocket, HTTP/3, and email interfaces on the Workers platform.
title: Protocols
image: https://developers.cloudflare.com/workers/reference/protocols/og.png?v=198e55cc958fd875
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Protocols

Cloudflare Workers support the following protocols and interfaces:

| Protocol | Inbound | Outbound |
| --- | --- | --- |
| **HTTP / HTTPS** | Handle incoming HTTP requests using the [`fetch()` handler](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/). | Make HTTP subrequests using the [`fetch()` API](https://developers.cloudflare.com/workers/runtime-apis/fetch/). |
| **Direct TCP sockets** | Handle TCP connections forwarded over a [service binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/) or through a [Spectrum application](https://developers.cloudflare.com/spectrum/how-to/route-tcp-traffic-to-a-worker/) using the [`connect()` handler](https://developers.cloudflare.com/workers/runtime-apis/handlers/connect/) (public beta). | Create outbound TCP connections using the [`connect()` API](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/). |
| **gRPC** | Route gRPC, including bidirectional streams, through Spectrum to a Worker and [Cloudflare Container](https://developers.cloudflare.com/containers/examples/bidirectional-grpc/) (public beta). | — |
| **WebSockets** | Accept incoming WebSocket connections using the [`WebSocket` API](https://developers.cloudflare.com/workers/runtime-apis/websockets/). | — |
| **HTTP/3 (QUIC)** | Accept inbound requests over [HTTP/3 ↗︎](https://www.cloudflare.com/learning/performance/what-is-http3/) by enabling it on your [zone](https://developers.cloudflare.com/fundamentals/concepts/accounts-and-zones/#zones) in **Speed** > **Settings** > **Protocol Optimization** in the [Cloudflare dashboard ↗︎](https://dash.cloudflare.com/). | — |
| **SMTP** | Use [Email Workers](https://developers.cloudflare.com/email-service/api/route-emails/email-handler/) to process and forward email without managing TCP connections to SMTP email servers. | Use [Email Workers](https://developers.cloudflare.com/email-service/api/route-emails/email-handler/). |

For gRPC, the Worker receives the connection as a raw TCP byte stream. In this path, the Worker does not parse gRPC or HTTP/2 frames. It forwards the stream to a gRPC server running in a Container. Refer to [Bidirectional gRPC with Workers and Containers](https://developers.cloudflare.com/containers/examples/bidirectional-grpc/) for a complete example.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/reference/protocols/#page","headline":"Protocols","description":"Supported HTTP, TCP, gRPC, WebSocket, HTTP/3, and email interfaces on the Workers platform.","url":"https://developers.cloudflare.com/workers/reference/protocols/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/reference/protocols/og.png?v=198e55cc958fd875","dateModified":"2026-11-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
