---
description: The SHA-256 fingerprint of the mTLS client certificate.
title: cf.tls_client_auth.cert_fingerprint_sha256
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.tls\_client\_auth.cert\_fingerprint\_sha256

`cf.tls_client_auth.cert_fingerprint_sha256` `String`

The SHA-256 fingerprint of the mTLS client certificate.

This field defaults to `""` if the connection does not use [mTLS authentication](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/).

Example value:

```txt
"af363dc85bc942a892d3cee9796190fdb36d89cd588a4f1cb17c74a943439714"
```

Categories:
* Request
* mTLS

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_auth.cert_fingerprint_sha256/#page","headline":"cf.tls_client_auth.cert_fingerprint_sha256 · Cloudflare Ruleset Engine docs","description":"The SHA-256 fingerprint of the mTLS client certificate.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_auth.cert_fingerprint_sha256/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
