---
description: Review the TLS cipher suites supported by `cloudflared` for secure connections between your origin and Cloudflare's network.

title: Cipher suites
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Cipher suites

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/cipher-suites/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare Tunnel connections use the cipher suites supported by `cloudflared`, which relies on the Go TLS library for its TLS implementation. These cipher suites apply to both the TLS connection between Cloudflare's network and `cloudflared`, and the HTTPS connection between `cloudflared` and your origin. In both cases, `cloudflared` negotiates the most secure cipher suite supported by both sides. All tunnel connections use TLS 1.3 and post-quantum encryption by default.

The following table lists the cipher suites supported by `cloudflared`:

| Protocol support            | Cipher suites                                                                                                                                                                                                                                                                            |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TLS 1.3 only                | TLS\_AES\_128\_GCM\_SHA256TLS\_AES\_256\_GCM\_SHA384TLS\_CHACHA20\_POLY1305\_SHA256                                                                                                                                                                                                      |
| TLS 1.2 only                | TLS\_ECDHE\_ECDSA\_WITH\_AES\_128\_GCM\_SHA256TLS\_ECDHE\_ECDSA\_WITH\_AES\_256\_GCM\_SHA384TLS\_ECDHE\_RSA\_WITH\_AES\_128\_GCM\_SHA256TLS\_ECDHE\_RSA\_WITH\_AES\_256\_GCM\_SHA384TLS\_ECDHE\_RSA\_WITH\_CHACHA20\_POLY1305\_SHA256TLS\_ECDHE\_ECDSA\_WITH\_CHACHA20\_POLY1305\_SHA256 |
| Up to and including TLS 1.2 | TLS\_ECDHE\_RSA\_WITH\_AES\_256\_CBC\_SHATLS\_ECDHE\_RSA\_WITH\_AES\_128\_CBC\_SHATLS\_ECDHE\_ECDSA\_WITH\_AES\_256\_CBC\_SHATLS\_ECDHE\_ECDSA\_WITH\_AES\_128\_CBC\_SHA                                                                                                                 |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/cipher-suites/#page","headline":"Cipher suites · Cloudflare One docs","description":"Review the TLS cipher suites supported by cloudflared for secure connections between your origin and Cloudflare's network.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/cipher-suites/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TLS"]}
```
