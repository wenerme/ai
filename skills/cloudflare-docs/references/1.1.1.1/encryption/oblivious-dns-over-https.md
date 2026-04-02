---
title: Oblivious DNS over HTTPS
description: Learn how Cloudflare 1.1.1.1 supports Oblivious DNS over HTTPS (ODoH) to enhance privacy by separating HTTP request contents from requester IP addresses.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/1.1.1.1/encryption/oblivious-dns-over-https.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Oblivious DNS over HTTPS

As announced on [our blog ↗](https://blog.cloudflare.com/oblivious-dns/), since late 2020, Cloudflare 1.1.1.1 supports Oblivious DNS over HTTPS (ODoH).

Warning

ODoH is defined in [RFC 9230 ↗](https://www.rfc-editor.org/rfc/rfc9230.html). This RFC is experimental and is not endorsed by the IETF.

## How ODoH works

ODoH improves privacy by separating the contents of an HTTP request (and response) from its requester IP address. To achieve this, a proxy and a target are introduced between the client and the upstream DNS resolver:

* The proxy has no visibility into the DNS messages, with no ability to identify, read, or modify either the query being sent by the client or the answer being returned by the target.
* The target only has access to the encrypted query and the proxy's IP address, while not having visibility over the client's IP address.
* Only the intended target can read the content of the query and produce a response, which is also encrypted.

This means that, as long as the proxy and the target do not collude, no single entity can have access to both the DNS messages and the client IP address at the same time. Also, clients are in complete control of proxy and target selection.

Additionally, clients encrypt their query for the target using Hybrid Public Key Encryption (HPKE). A target's public key is obtained via DNS, where it is bundled into an HTTPS resource record and protected by DNSSEC.

## Cloudflare and third-party products

Cloudflare 1.1.1.1 supports ODoH by acting as a target that can be reached at `odoh.cloudflare-dns.com`.

To make ODoH queries you can use open source clients such as [dnscrypt-proxy ↗](https://github.com/DNSCrypt/dnscrypt-proxy).

Also, [iCloud Private Relay ↗](https://support.apple.com/102602) is based on ODoH and uses [Cloudflare as one of their partners ↗](https://blog.cloudflare.com/icloud-private-relay/).

## Related resources

* [HPKE: Standardizing public-key encryption ↗](https://blog.cloudflare.com/hybrid-public-key-encryption/) blog post
* [Privacy Gateway](https://developers.cloudflare.com/privacy-gateway/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/encryption/","name":"Encryption"}},{"@type":"ListItem","position":4,"item":{"@id":"/1.1.1.1/encryption/oblivious-dns-over-https/","name":"Oblivious DNS over HTTPS"}}]}
```
