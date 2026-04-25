---
title: DNS over HTTPS
description: Encrypt DNS queries using HTTPS with 1.1.1.1.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

# DNS over HTTPS

With DNS over HTTPS (DoH), DNS queries and responses are encrypted and sent via the HTTP, HTTP/2 and HTTP/3 protocols. DoH ensures that attackers cannot forge or alter DNS traffic. DoH uses port 443, which is the standard HTTPS traffic port, to wrap the DNS query in an HTTPS request. DNS queries and responses are camouflaged within other HTTPS traffic, since it all comes and goes from the same port.

* [ Configure DoH on your browser ](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/encrypted-dns-browsers/)
* [ Connect to 1.1.1.1 using DoH clients ](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/dns-over-https-client/)
* [ Make API requests to 1.1.1.1 ](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1 (DNS Resolver)"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/encryption/","name":"Encryption"}},{"@type":"ListItem","position":4,"item":{"@id":"/1.1.1.1/encryption/dns-over-https/","name":"DNS over HTTPS"}}]}
```
