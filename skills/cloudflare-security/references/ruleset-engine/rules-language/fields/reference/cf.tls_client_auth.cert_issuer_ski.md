---
description: The Subject Key Identifier (SKI) of the direct issuer of the mTLS client certificate.
title: cf.tls_client_auth.cert_issuer_ski
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.tls\_client\_auth.cert\_issuer\_ski

`cf.tls_client_auth.cert_issuer_ski` `String`

The Subject Key Identifier (SKI) of the direct issuer of the mTLS client certificate.

This field defaults to `""` if the connection does not use [mTLS authentication](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/).

Example value:

```txt
"8204924CF49D471E855862706D889F58F6B784D3"
```

Categories:
* Request
* mTLS

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_auth.cert_issuer_ski/#page","headline":"cf.tls_client_auth.cert_issuer_ski · Cloudflare Ruleset Engine docs","description":"The Subject Key Identifier (SKI) of the direct issuer of the mTLS client certificate.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_auth.cert_issuer_ski/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
