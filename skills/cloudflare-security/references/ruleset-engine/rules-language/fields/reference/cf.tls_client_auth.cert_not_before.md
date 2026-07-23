---
description: The mTLS client certificate is not valid before this date.
title: cf.tls_client_auth.cert_not_before
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.tls\_client\_auth.cert\_not\_before

`cf.tls_client_auth.cert_not_before` `String`

The mTLS client certificate is not valid before this date.

This field defaults to `""` if the connection does not use [mTLS authentication](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/).

Example value:

```txt
"Mar 21 13:35:00 2022 GMT"
```

Categories:
* Request
* mTLS

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_auth.cert_not_before/#page","headline":"cf.tls_client_auth.cert_not_before · Cloudflare Ruleset Engine docs","description":"The mTLS client certificate is not valid before this date.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_auth.cert_not_before/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
