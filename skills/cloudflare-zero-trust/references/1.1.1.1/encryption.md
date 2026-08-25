---
description: Encryption options for DNS queries to 1.1.1.1.
title: Encryption
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/1.1.1.1/llms.txt
> Use this file to discover all available pages before exploring further.

# Encryption

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/1.1.1.1/encryption/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When you visit a website, your device first sends a DNS query to translate the domain name (for example, `example.com`) into an IP address. Traditionally, these queries are sent in plaintext — unencrypted and readable by anyone on the network path.

Unencrypted DNS queries can be monitored, modified, or used for tracking by ISPs, network operators, or malicious actors.

To protect your DNS traffic, 1.1.1.1 supports three encryption standards:

* [DNS over TLS (DoT)](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-tls/) — Encrypts DNS queries over a dedicated TLS connection on port `853`.
* [DNS over HTTPS (DoH)](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/) — Encrypts DNS queries inside regular HTTPS traffic on port `443`.
* [Oblivious DNS over HTTPS (ODoH)](https://developers.cloudflare.com/1.1.1.1/encryption/oblivious-dns-over-https/) — Adds a privacy layer to DoH so that no single entity can see both your identity and your query.

You can also [configure your browser](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/encrypted-dns-browsers/) to secure your DNS queries.

To secure connections on your smartphone, refer to the 1.1.1.1 [iOS](https://developers.cloudflare.com/1.1.1.1/setup/ios/) or [Android](https://developers.cloudflare.com/1.1.1.1/setup/android/) apps.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/1.1.1.1/encryption/#page","headline":"Encrypt DNS traffic · Cloudflare 1.1.1.1 docs","description":"Encryption options for DNS queries to 1.1.1.1.","url":"https://developers.cloudflare.com/1.1.1.1/encryption/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
