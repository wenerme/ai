---
description: Troubleshoot HTTP 421 error responses.
title: Error 421
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 421

Last updated Sep 25, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-421/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

## 421 Misdirected Request

The `421 Misdirected Request` status code indicates that the request was directed to a server that is not able to produce a response for the combination of scheme and authority included in the request URI.

For more details, refer to [RFC 9110 ↗︎](https://www.rfc-editor.org/rfc/rfc9110#section-15.5.20).

### Common use cases

This error commonly occurs in HTTP/2 and HTTP/3 environments where connection reuse or alternative service selection is involved. A server may return a `421` response when:

- The `Host` header value does not match the SNI (Server Name Indication) used during the TLS handshake, causing the server to reject the request as misdirected.
- A single HTTP/2 connection is reused (coalesced) across multiple origins, but the server is not configured to respond for one of those origins.
- The client selected an alternative service (via the `Alt-Svc` header) that cannot handle the request for that specific scheme and host combination.

Upon receiving a `421`, the client may retry the request on a new connection.

### Cloudflare-specific information

Cloudflare may generate or forward a `421` response in several scenarios:

- **SNI mismatch**: The most common cause. If the SNI value used during the TLS handshake does not match the `Host` header in the HTTP request, Cloudflare returns `421` directly. Ensure your TLS certificate covers all hostnames you intend to serve — for example, use a wildcard or SAN certificate.
- **Connection coalescing**: Cloudflare may coalesce HTTP/2 or HTTP/3 connections across multiple origins. If the origin is not configured to serve all coalesced hostnames, a `421` results. Verify that your origin correctly handles all domain names sharing a connection.
- **Cloudflare Tunnel**: A `421` can occur if the tunnel ingress rule hostname does not match the request's `Host` header. Review your tunnel ingress configuration.
- **R2 and Workers custom domains**: A mismatch between the custom domain TLS SNI and the requested hostname can produce a `421`. Verify that the custom domain is correctly configured and that the TLS certificate covers the relevant hostname.

If you receive a `421`, retry the request on a new connection with the correct SNI and host combination.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-421/#page","headline":"Error 421","description":"Troubleshoot HTTP 421 error responses.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-421/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
