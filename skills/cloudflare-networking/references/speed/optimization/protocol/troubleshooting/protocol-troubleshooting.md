---
description: Resolve common HTTP/2 and HTTP/3 connection issues.
title: Troubleshoot protocol issues
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/speed/llms.txt
> Use this file to discover all available pages before exploring further.

# Troubleshoot protocol issues

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/speed/optimization/protocol/troubleshooting/protocol-troubleshooting/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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

## Chrome stalls or fails only on HTTP/3

If the issue reproduces only in Chrome over HTTP/3 and disappears when HTTP/3 is disabled, the problem may be related to a browser-side QUIC handling issue rather than your origin server. This is a known Chrome issue ([crbug.com/41161335 ↗](https://issues.chromium.org/issues/41161335)) — Cloudflare's QUIC implementation is not the cause.

Symptoms can include:

* Large downloads stall unexpectedly.
* Pages with many concurrent requests hang for one to three minutes and then fail.
* Chrome reports `ERR_QUIC_PROTOCOL_ERROR` or `ERR_HTTP3_PROTOCOL_ERROR` after the connection stops making progress.
* Issue does not reproduce in Firefox or Safari.
* Issue resolves after disabling QUIC in `chrome://flags`.

### How to isolate the issue

1. Temporarily disable HTTP/3 for the zone.
2. Test the same request again over HTTP/2.
3. If the issue disappears over HTTP/2, capture a NetLog for Chrome and compare the behavior.

**Test immediately:** In Chrome, go to `chrome://flags`, search for "QUIC", set it to **Disabled**, then relaunch Chrome.

### Resolution

If the issue is limited to specific hostnames, you can apply a more targeted workaround: create a Response Header Modification Transform Rule to remove the `Alt-Svc` header for the affected hostname.

1. In the Cloudflare dashboard, go to the Rules **Overview** page.
2. Select **Create rule** \> **Response Header Transform Rule**.
3. Set the matching expression to your hostname: `(http.host eq "example.com")`.
4. Under **Modify response header**, select **Remove** and enter `Alt-Svc` as the header name.

This forces Chrome to use HTTP/2 for that hostname without disabling HTTP/3 globally. However, proxied hostnames can also advertise HTTP/3 through generated HTTPS records, so disabling HTTP/3 for the zone is the most reliable way to force HTTP/2 while you troubleshoot.

After changing `Alt-Svc`, remember that browsers may cache the advertised alternative service for up to 24 hours.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/speed/optimization/protocol/troubleshooting/protocol-troubleshooting/#page","headline":"Troubleshoot protocol issues · Cloudflare Speed docs","description":"Resolve common HTTP/2 and HTTP/3 connection issues.","url":"https://developers.cloudflare.com/speed/optimization/protocol/troubleshooting/protocol-troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging"]}
```
