---
title: Troubleshoot protocol issues
description: Resolve common HTTP/2 and HTTP/3 connection issues.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Debugging ](https://developers.cloudflare.com/search/?tags=Debugging) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/speed/optimization/protocol/troubleshooting/protocol-troubleshooting.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/speed/","name":"Speed"}},{"@type":"ListItem","position":3,"item":{"@id":"/speed/optimization/","name":"Settings"}},{"@type":"ListItem","position":4,"item":{"@id":"/speed/optimization/protocol/","name":"Protocol optimization"}},{"@type":"ListItem","position":5,"item":{"@id":"/speed/optimization/protocol/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":6,"item":{"@id":"/speed/optimization/protocol/troubleshooting/protocol-troubleshooting/","name":"Troubleshoot protocol issues"}}]}
```
