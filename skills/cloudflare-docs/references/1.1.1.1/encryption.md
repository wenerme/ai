---
title: Encryption
description: Encryption options for DNS queries to 1.1.1.1.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/1.1.1.1/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Encryption

When you visit a website, your device first sends a DNS query to translate the domain name (for example, `example.com`) into an IP address. Traditionally, these queries are sent in plaintext — unencrypted and readable by anyone on the network path.

Unencrypted DNS queries can be monitored, modified, or used for tracking by ISPs, network operators, or malicious actors.

To protect your DNS traffic, 1.1.1.1 supports three encryption standards:

* [DNS over TLS (DoT)](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-tls/) — Encrypts DNS queries over a dedicated TLS connection on port `853`.
* [DNS over HTTPS (DoH)](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/) — Encrypts DNS queries inside regular HTTPS traffic on port `443`.
* [Oblivious DNS over HTTPS (ODoH)](https://developers.cloudflare.com/1.1.1.1/encryption/oblivious-dns-over-https/) — Adds a privacy layer to DoH so that no single entity can see both your identity and your query.

You can also [configure your browser](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/encrypted-dns-browsers/) to secure your DNS queries.

To secure connections on your smartphone, refer to the 1.1.1.1 [iOS](https://developers.cloudflare.com/1.1.1.1/setup/ios/) or [Android](https://developers.cloudflare.com/1.1.1.1/setup/android/) apps.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1 (DNS Resolver)"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/encryption/","name":"Encryption"}}]}
```
