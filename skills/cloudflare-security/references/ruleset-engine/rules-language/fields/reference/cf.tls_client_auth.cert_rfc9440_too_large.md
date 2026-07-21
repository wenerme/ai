---
description: Returns `true` when the RFC 9440 encoded mTLS client certificate exceeds the 10 KiB size limit.
title: cf.tls_client_auth.cert_rfc9440_too_large
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

#  cf.tls\_client\_auth.cert\_rfc9440\_too\_large

`cf.tls_client_auth.cert_rfc9440_too_large` ` Boolean `

Returns `true` when the RFC 9440 encoded mTLS client certificate exceeds the 10 KiB size limit.

When `true`, [cf.tls\_client\_auth.cert\_rfc9440](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Frfc9440/) contains an empty string instead of the encoded certificate.

This field defaults to `false` if the connection does not use [mTLS authentication](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/).

Categories:
* Request
* mTLS

Was this helpful?

YesNo

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_auth.cert_rfc9440_too_large/#page","headline":"cf.tls_client_auth.cert_rfc9440_too_large · Cloudflare Ruleset Engine docs","description":"Returns true when the RFC 9440 encoded mTLS client certificate exceeds the 10 KiB size limit.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_auth.cert_rfc9440_too_large/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
