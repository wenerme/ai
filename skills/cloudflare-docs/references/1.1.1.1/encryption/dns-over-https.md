---
title: DNS over HTTPS
description: Encrypt DNS queries using HTTPS with 1.1.1.1.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/1.1.1.1/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DNS over HTTPS

DNS over HTTPS (DoH) encrypts DNS queries by wrapping them inside regular HTTPS requests. This prevents attackers from forging or altering your DNS traffic.

DoH sends DNS traffic over port `443` — the default port for HTTPS web traffic. Because DoH queries use the same port and protocol as normal web browsing, they are difficult to distinguish from other HTTPS traffic on the network.

DoH supports the HTTP, HTTP/2, and HTTP/3 protocols.

* [ Configure DoH on your browser ](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/encrypted-dns-browsers/)
* [ Connect to 1.1.1.1 using DoH clients ](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/dns-over-https-client/)
* [ Make API requests to 1.1.1.1 ](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1 (DNS Resolver)"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/encryption/","name":"Encryption"}},{"@type":"ListItem","position":4,"item":{"@id":"/1.1.1.1/encryption/dns-over-https/","name":"DNS over HTTPS"}}]}
```
