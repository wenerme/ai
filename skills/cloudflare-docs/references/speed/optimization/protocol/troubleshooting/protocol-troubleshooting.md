---
title: Troubleshoot protocol issues
description: This guide covers common HTTP/2 and HTTP/3 issues, including origin incompatibility, multiplexing errors, and browser errors, with steps to diagnose and resolve them.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/speed/optimization/protocol/troubleshooting/protocol-troubleshooting.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Troubleshoot protocol issues

This guide covers common HTTP/2 and HTTP/3 issues, including origin incompatibility, multiplexing errors, and browser errors, with steps to diagnose and resolve them.

## H2 to Origin - Origin incompatibility

* The origin's `max_concurrent_streams` is negotiated during the handshake process.
* If a `GOAWAY(0)` is received, it is likely due to a server restart or another reason causing the server to refuse new streams.
* For more information, refer to [RFC 9113 - SETTINGS\_MAX\_CONCURRENT\_STREAMS ↗](https://datatracker.ietf.org/doc/html/rfc9113).

## H2 Multiplexing - Origin incompatibility/issues

* Multiplexing issues can arise due to incorrect server configurations.
* Use [netlogs ↗](https://www.chromium.org/developers/design-documents/network-stack/netlog/) to identify `SETTINGS_MAX_CONCURRENT_STREAMS` violations or unexpected `GOAWAY` frames.
* For more information, refer to [Stream Concurrency Issues ↗](https://datatracker.ietf.org/doc/html/rfc9113#name-stream-concurrency).

## Generic browser errors

Common browser errors include:

* `ERR_HTTP2_PROTOCOL_ERROR`
* `ERR_HTTP3_PROTOCOL_ERROR`
* `ERR_QUIC_PROTOCOL_ERROR`

These errors do not necessarily indicate a protocol-level issue. Follow these steps:

1. Attempt reproduction using HTTP/1.1.
2. If the issue persists in HTTP/1.1, address the underlying error before testing HTTP/2 or HTTP/3.
3. If the issue does not persist, analyze netlogs for HTTP/2 or HTTP/3-specific issues.

For more information, refer to [Chromium URL Request Header ↗](https://chromium.googlesource.com/chromium/src/+/HEAD/net/url%5Frequest/url%5Frequest.h).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/speed/","name":"Speed"}},{"@type":"ListItem","position":3,"item":{"@id":"/speed/optimization/","name":"Settings"}},{"@type":"ListItem","position":4,"item":{"@id":"/speed/optimization/protocol/","name":"Protocol optimization"}},{"@type":"ListItem","position":5,"item":{"@id":"/speed/optimization/protocol/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":6,"item":{"@id":"/speed/optimization/protocol/troubleshooting/protocol-troubleshooting/","name":"Troubleshoot protocol issues"}}]}
```
