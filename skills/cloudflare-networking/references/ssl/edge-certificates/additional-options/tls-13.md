---
description: Enable TLS 1.3 for improved performance and security.
title: TLS 1.3
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# TLS 1.3

Last updated Aug 14, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/tls-13/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

TLS 1.3 enables the latest version of the TLS protocol (when supported) for improved security and performance.

## What is TLS 1.3?

TLS 1.3 is the newest, fastest, and most secure version of the [TLS protocol](https://developers.cloudflare.com/ssl/reference/protocols/).

By turning on the TLS 1.3 feature, traffic to and from your website will be served over the TLS 1.3 protocol when supported by clients. TLS 1.3 protocol has improved latency over older versions, has several new features, and is currently supported in all updated major browsers.

## Availability

|              | Free | Pro | Business | Enterprise |
| ------------ | ---- | --- | -------- | ---------- |
| Availability | Yes  | Yes | Yes      | Yes        |

## Enable TLS 1.3

TLS 1.3 can be activated in the Cloudflare dashboard or through the API:

To enable TLS 1.3 in the dashboard:

1. In the Cloudflare dashboard, go to the **Edge Certificates** page.
[Go to **Edge Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. For **TLS 1.3**, switch the toggle to **On**.

To adjust your TLS 1.3 settings with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `tls_1_3` as the setting name in the URI path, and set the `value` parameter to your desired setting (`"on"`, `"zrt"` or `"off"`). `zrt` refers to [Zero Round Trip Time Resumption (0-RTT) ↗](https://blog.cloudflare.com/introducing-0-rtt/).

### Troubleshooting

Since TLS 1.3 implementations are relatively new, some failures may occur. If you experience errors, submit a Cloudflare Support ticket with the following information:

* Steps to replicate the issue (if possible)
* Client build version
* Client diagnostic information
* Packet captures

Chrome users should submit a [net-internals trace ↗](https://dev.chromium.org/for-testers/providing-network-details) to Google. Firefox users should [report bugs to Mozilla ↗](https://bugzilla.mozilla.org/home).

## Limitations

You cannot set specific TLS 1.3 ciphers. Instead, you can enable [TLS 1.3](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/tls-13/#enable-tls-13) for your entire zone and Cloudflare will use [all applicable TLS 1.3 cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/supported-cipher-suites/). In combination with this, you can still [disable weak cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/) for TLS 1.0-1.2.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/tls-13/#page","headline":"TLS 1.3 · Cloudflare SSL/TLS docs","description":"Enable TLS 1.3 for improved performance and security.","url":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/tls-13/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-14","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TLS"]}
```
