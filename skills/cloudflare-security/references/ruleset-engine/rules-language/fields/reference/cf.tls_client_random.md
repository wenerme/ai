---
description: The value of the 32-byte random value provided by the client in a [TLS handshake](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake), encoded in Base64.
title: cf.tls_client_random
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

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

Was this helpful?

YesNo

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_random/#page","headline":"cf.tls_client_random · Cloudflare Ruleset Engine docs","description":"The value of the 32-byte random value provided by the client in a TLS handshake, encoded in Base64.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_random/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
