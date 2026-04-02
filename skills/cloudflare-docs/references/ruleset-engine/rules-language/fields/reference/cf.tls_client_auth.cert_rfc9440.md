---
title: cf.tls_client_auth.cert_rfc9440
description: The mTLS client certificate encoded as a Structured Fields Byte Sequence per [RFC 9440](https://datatracker.ietf.org/doc/html/rfc9440).
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/fields/index.yaml) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

#  cf.tls\_client\_auth.cert\_rfc9440 

`cf.tls_client_auth.cert_rfc9440` ` String ` 

The mTLS client certificate encoded as a Structured Fields Byte Sequence per [RFC 9440](https://datatracker.ietf.org/doc/html/rfc9440).

Contains the DER-encoded, Base64-wrapped client leaf certificate formatted as an [RFC 9440](https://datatracker.ietf.org/doc/html/rfc9440#name-client-cert-http-header-fie) `Client-Cert` HTTP header value. The value is a Structured Fields Byte Sequence (the Base64 data prefixed and suffixed by `:`).

This field is populated regardless of the certificate validation result. Before using this value, verify the certificate status by checking [cf.tls\_client\_auth.cert\_verified](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fverified/) and [cf.tls\_client\_auth.cert\_revoked](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Frevoked/).

Returns `""` if no client certificate was presented or if the encoded value exceeds the 10 KiB size limit. Refer to [cf.tls\_client\_auth.cert\_rfc9440\_too\_large](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Frfc9440%5Ftoo%5Flarge/) to distinguish between these cases.

This field defaults to `""` if the connection does not use [mTLS authentication](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/).

Example value:

```

":MIIBqDCCAU6g......:"


```

Categories: 
* Request
* mTLS

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
