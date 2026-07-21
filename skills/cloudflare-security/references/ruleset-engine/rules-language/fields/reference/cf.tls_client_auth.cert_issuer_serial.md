---
description: Serial number of the direct issuer of the mTLS client certificate.
title: cf.tls_client_auth.cert_issuer_serial
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

#  cf.tls\_client\_auth.cert\_issuer\_serial

`cf.tls_client_auth.cert_issuer_serial` ` String `

Serial number of the direct issuer of the mTLS client certificate.

This field defaults to `""` if the connection does not use [mTLS authentication](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/).

Example value:

```txt
"2688201DBA77402EA87118876F2E1B24CF8B0395"
```

Categories:
* Request
* mTLS

Was this helpful?

YesNo

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_auth.cert_issuer_serial/#page","headline":"cf.tls_client_auth.cert_issuer_serial · Cloudflare Ruleset Engine docs","description":"Serial number of the direct issuer of the mTLS client certificate.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_auth.cert_issuer_serial/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
