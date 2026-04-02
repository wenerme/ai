---
title: cf.tls_ciphers_sha1
description: The SHA-1 fingerprint of the client TLS cipher list in received order, encoded in Base64 using big-endian format.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/fields/index.yaml) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

#  cf.tls\_ciphers\_sha1 

`cf.tls_ciphers_sha1` ` String ` 

The SHA-1 fingerprint of the client TLS cipher list in received order, encoded in Base64 using big-endian format.

Example value:

```

"GXSPDLP4G3X+prK73a4wBuOaHRc="


```

Categories: 
* Request
* SSL/TLS

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
