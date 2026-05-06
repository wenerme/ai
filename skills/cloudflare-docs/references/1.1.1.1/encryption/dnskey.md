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

Standard DNS has no built-in way to verify that a response actually came from the authoritative server for a domain. An attacker could return a forged answer, and a resolver would have no way to detect it.

[DNSSEC ↗](https://www.cloudflare.com/learning/dns/dns-records/dnskey-ds-records/) solves this by adding cryptographic signatures to DNS records. Domain owners sign their DNS records with a private key, and resolvers like 1.1.1.1 verify those signatures using the corresponding public key. This proves the response is authentic and has not been modified in transit.

DNSSEC uses two DNS record types to distribute the public keys needed for verification:

* **DNSKEY** records contain the public signing keys for a domain.
* **DS** (Delegation Signer) records link a child zone's keys to its parent zone, creating a chain of trust.

Resolvers use these keys to verify the signatures stored in [RRSIG records ↗](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/).

## Supported signature algorithms

1.1.1.1 supports the following DNSSEC signature algorithms:

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
