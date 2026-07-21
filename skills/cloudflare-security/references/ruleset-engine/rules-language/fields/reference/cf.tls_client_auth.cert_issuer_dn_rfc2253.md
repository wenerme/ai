---
description: The Distinguished Name (DN) of the Certificate Authority (CA) that issued the mTLS client certificate in [RFC 2253](https://datatracker.ietf.org/doc/html/rfc2253) format.
title: cf.tls_client_auth.cert_issuer_dn_rfc2253
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

#  cf.tls\_client\_auth.cert\_issuer\_dn\_rfc2253

`cf.tls_client_auth.cert_issuer_dn_rfc2253` ` String `

The Distinguished Name (DN) of the Certificate Authority (CA) that issued the mTLS client certificate in [RFC 2253](https://datatracker.ietf.org/doc/html/rfc2253) format.

This field defaults to `""` if the connection does not use [mTLS authentication](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/).

Example value:

```txt
"CN=Access Testing CA,OU=TX,O=Access Testing,L=Austin,ST=Texas,C=US"
```

Categories:
* Request
* mTLS

Was this helpful?

YesNo

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_auth.cert_issuer_dn_rfc2253/#page","headline":"cf.tls_client_auth.cert_issuer_dn_rfc2253 · Cloudflare Ruleset Engine docs","description":"The Distinguished Name (DN) of the Certificate Authority (CA) that issued the mTLS client certificate in RFC 2253 format.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_auth.cert_issuer_dn_rfc2253/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
