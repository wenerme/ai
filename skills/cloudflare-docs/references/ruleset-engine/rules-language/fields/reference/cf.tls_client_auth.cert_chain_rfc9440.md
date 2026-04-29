---
title: cf.tls_client_auth.cert_chain_rfc9440
description: The mTLS client certificate chain (excluding the leaf certificate) encoded as a structured field list per [RFC 9440](https://datatracker.ietf.org/doc/html/rfc9440).
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

#  cf.tls\_client\_auth.cert\_chain\_rfc9440 

`cf.tls_client_auth.cert_chain_rfc9440` ` String ` 

The mTLS client certificate chain (excluding the leaf certificate) encoded as a structured field list per [RFC 9440](https://datatracker.ietf.org/doc/html/rfc9440).

Contains the DER-encoded, Base64-wrapped client certificate chain formatted as an [RFC 9440](https://datatracker.ietf.org/doc/html/rfc9440#name-client-cert-chain-http-head) `Client-Cert-Chain` HTTP header value. The value is a structured field list of byte sequences. The leaf certificate is not included in the chain (it is available in [cf.tls\_client\_auth.cert\_rfc9440](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Frfc9440/)). The chain reflects the certificates as sent by the client, without any reordering or validation.

This field is populated regardless of the certificate validation result. Before using this value, verify the certificate status by checking [cf.tls\_client\_auth.cert\_verified](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fverified/) and [cf.tls\_client\_auth.cert\_revoked](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Frevoked/).

Returns `""` if the client did not send any intermediate certificates or if the encoded value exceeds the 16 KiB size limit. Refer to [cf.tls\_client\_auth.cert\_chain\_rfc9440\_too\_large](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fchain%5Frfc9440%5Ftoo%5Flarge/) to distinguish between these cases.

This field defaults to `""` if the connection does not use [mTLS authentication](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/).

Example value:

```

":MII.....=:, :MII....=:"


```

Categories: 
* Request
* mTLS

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
