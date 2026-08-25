---
description: The SHA-1 fingerprint of TLS client extensions, encoded in Base64 using big-endian format.
title: cf.tls_client_extensions_sha1
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.tls\_client\_extensions\_sha1

`cf.tls_client_extensions_sha1` `String`

The SHA-1 fingerprint of TLS client extensions, encoded in Base64 using big-endian format.

For the little-endian version of this field, refer to [cf.tls\_client\_extensions\_sha1\_le](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fextensions%5Fsha1%5Fle/).

Example value:

```txt
"OWFiM2I5ZDc0YWI0YWYzZmFkMGU0ZjhlYjhiYmVkMjgxNTU5YTU2Mg=="
```

Categories:
* Request
* SSL/TLS

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_extensions_sha1/#page","headline":"cf.tls_client_extensions_sha1 · Cloudflare Ruleset Engine docs","description":"The SHA-1 fingerprint of TLS client extensions, encoded in Base64 using big-endian format.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_extensions_sha1/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
