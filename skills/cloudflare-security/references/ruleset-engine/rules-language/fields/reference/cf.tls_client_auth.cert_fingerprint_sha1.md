---
description: The SHA-1 fingerprint of the mTLS client certificate.
title: cf.tls_client_auth.cert_fingerprint_sha1
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.tls\_client\_auth.cert\_fingerprint\_sha1

`cf.tls_client_auth.cert_fingerprint_sha1` `String`

The SHA-1 fingerprint of the mTLS client certificate.

This field defaults to `""` if the connection does not use [mTLS authentication](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/).

Example value:

```txt
"933ad5282c560ae3f482a43ecd73bc9de878a190"
```

Categories:
* Request
* mTLS

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_auth.cert_fingerprint_sha1/#page","headline":"cf.tls_client_auth.cert_fingerprint_sha1 · Cloudflare Ruleset Engine docs","description":"The SHA-1 fingerprint of the mTLS client certificate.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_auth.cert_fingerprint_sha1/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
