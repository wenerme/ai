---
title: cf.tls_client_random
description: The value of the 32-byte random value provided by the client in a [TLS handshake](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake), encoded in Base64.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

#  cf.tls\_client\_random

`cf.tls_client_random` ` String `

The value of the 32-byte random value provided by the client in a [TLS handshake](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake), encoded in Base64.

For more details, refer to [RFC 8446](https://datatracker.ietf.org/doc/html/rfc8446#section-4.1.2).

Example value:

```txt
"YWJjZA=="
```

Categories:
* Request
* SSL/TLS

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_random/#page","headline":"cf.tls_client_random · Cloudflare Ruleset Engine docs","description":"The value of the 32-byte random value provided by the client in a TLS handshake, encoded in Base64.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_random/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
