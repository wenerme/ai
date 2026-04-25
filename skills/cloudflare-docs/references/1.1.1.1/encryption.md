---
title: Encryption
description: Encryption options for DNS queries to 1.1.1.1.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

# Encryption

Traditionally, DNS queries and replies are performed over plaintext. They are sent over the Internet without any kind of encryption or protection, even when you are accessing a secured website. This has a great impact on security and privacy, as these queries might be subject to surveillance, spoofing and tracking by malicious actors, advertisers, ISPs, and others.

To prevent untrustworthy entities from interpreting and manipulating your queries, 1.1.1.1 supports different standards to encrypt plaintext DNS traffic and improve DNS privacy:

* [DNS over TLS (DoT)](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-tls/)
* [DNS over HTTPS (DoH)](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/)
* [Oblivious DNS over HTTPS (ODoH)](https://developers.cloudflare.com/1.1.1.1/encryption/oblivious-dns-over-https/)

You can also [configure your browser](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/encrypted-dns-browsers/) to secure your DNS queries.

If you need to secure connections in your smartphone, refer to 1.1.1.1 [iOS](https://developers.cloudflare.com/1.1.1.1/setup/ios/) or [Android](https://developers.cloudflare.com/1.1.1.1/setup/android/) apps.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1 (DNS Resolver)"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/encryption/","name":"Encryption"}}]}
```
