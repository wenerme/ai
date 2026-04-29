---
title: DNSKEY
description: DNSKEY records used by the 1.1.1.1 resolver.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/1.1.1.1/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DNSKEY

[DNSSEC is a protocol ↗](https://www.cloudflare.com/learning/dns/dns-records/dnskey-ds-records/) that adds a layer of security to the domain name system (DNS). DNSSEC does this by providing authentication through public signing keys using two DNS records: DNSKEY and DS. They can be used to verify DNSSEC signatures in [RRSIG records ↗](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/).

1.1.1.1 supports the following signature algorithms:

* RSA/SHA-1
* RSA/SHA-256
* RSA/SHA-512
* RSASHA1-NSEC3-SHA1
* ECDSA Curve P-256 with SHA-256 (ECDSAP256SHA256)
* ECDSA Curve P-384 with SHA-384 (ECDSAP384SHA384)
* ED25519

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1 (DNS Resolver)"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/encryption/","name":"Encryption"}},{"@type":"ListItem","position":4,"item":{"@id":"/1.1.1.1/encryption/dnskey/","name":"DNSKEY"}}]}
```
