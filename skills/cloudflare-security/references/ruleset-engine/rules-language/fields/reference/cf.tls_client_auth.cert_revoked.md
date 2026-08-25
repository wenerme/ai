---
description: Indicates whether the mTLS client presented a valid but revoked client certificate.
title: cf.tls_client_auth.cert_revoked
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.tls\_client\_auth.cert\_revoked

`cf.tls_client_auth.cert_revoked` `Boolean`

Indicates whether the mTLS client presented a valid but revoked client certificate.

When `true`, the [cf.tls\_client\_auth.cert\_verified](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fverified/) field is also `true`.

This field defaults to `false` if the connection does not use [mTLS authentication](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/).

Categories:
* Request
* mTLS

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_auth.cert_revoked/#page","headline":"cf.tls_client_auth.cert_revoked · Cloudflare Ruleset Engine docs","description":"Indicates whether the mTLS client presented a valid but revoked client certificate.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_auth.cert_revoked/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
