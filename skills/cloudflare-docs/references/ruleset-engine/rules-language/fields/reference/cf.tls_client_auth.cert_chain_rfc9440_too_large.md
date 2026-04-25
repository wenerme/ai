---
title: cf.tls_client_auth.cert_chain_rfc9440_too_large
description: Returns `true` when the RFC 9440 encoded client certificate chain exceeds the 16 KiB size limit.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

#  cf.tls\_client\_auth.cert\_chain\_rfc9440\_too\_large 

`cf.tls_client_auth.cert_chain_rfc9440_too_large` ` Boolean ` 

Returns `true` when the RFC 9440 encoded client certificate chain exceeds the 16 KiB size limit.

When `true`, [cf.tls\_client\_auth.cert\_chain\_rfc9440](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fchain%5Frfc9440/) contains an empty string instead of the encoded certificate chain.

This field defaults to `false` if the connection does not use [mTLS authentication](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/).

Categories: 
* Request
* mTLS

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
