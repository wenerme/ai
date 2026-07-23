---
description: Encrypt DNS queries using HTTPS with 1.1.1.1.
title: DNS over HTTPS
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/1.1.1.1/llms.txt
> Use this file to discover all available pages before exploring further.

# DNS over HTTPS

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

DNS over HTTPS (DoH) encrypts DNS queries by wrapping them inside regular HTTPS requests. This prevents attackers from forging or altering your DNS traffic.

DoH sends DNS traffic over port `443` — the default port for HTTPS web traffic. Because DoH queries use the same port and protocol as normal web browsing, they are difficult to distinguish from other HTTPS traffic on the network.

DoH supports the HTTP, HTTP/2, and HTTP/3 protocols.

* [Make API requests to 1.1.1.1](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/)
* [Configure DoH on your browser](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/encrypted-dns-browsers/)
* [Connect to 1.1.1.1 using DoH clients](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/dns-over-https-client/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/#page","headline":"DNS over HTTPS | Cloudflare Docs","description":"Encrypt DNS queries using HTTPS with 1.1.1.1.","url":"https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
