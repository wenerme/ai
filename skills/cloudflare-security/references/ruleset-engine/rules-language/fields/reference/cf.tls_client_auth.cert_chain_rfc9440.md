---
description: The mTLS client certificate chain (excluding the leaf certificate) encoded as a structured field list per [RFC 9440](https://datatracker.ietf.org/doc/html/rfc9440).
title: cf.tls_client_auth.cert_chain_rfc9440
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.tls\_client\_auth.cert\_chain\_rfc9440

`cf.tls_client_auth.cert_chain_rfc9440` `String`

The mTLS client certificate chain (excluding the leaf certificate) encoded as a structured field list per [RFC 9440](https://datatracker.ietf.org/doc/html/rfc9440).

Contains the DER-encoded, Base64-wrapped client certificate chain formatted as an [RFC 9440](https://datatracker.ietf.org/doc/html/rfc9440#name-client-cert-chain-http-head) `Client-Cert-Chain` HTTP header value. The value is a structured field list of byte sequences. The leaf certificate is not included in the chain (it is available in [cf.tls\_client\_auth.cert\_rfc9440](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Frfc9440/)). The chain reflects the certificates as sent by the client, without any reordering or validation.

This field is populated regardless of the certificate validation result. Before using this value, verify the certificate status by checking [cf.tls\_client\_auth.cert\_verified](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fverified/) and [cf.tls\_client\_auth.cert\_revoked](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Frevoked/).

Returns `""` if the client did not send any intermediate certificates or if the encoded value exceeds the 16 KiB size limit. Refer to [cf.tls\_client\_auth.cert\_chain\_rfc9440\_too\_large](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fchain%5Frfc9440%5Ftoo%5Flarge/) to distinguish between these cases.

This field defaults to `""` if the connection does not use [mTLS authentication](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/).

Example value:

```txt
":MII.....=:, :MII....=:"
```

Categories:
* Request
* mTLS

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_auth.cert_chain_rfc9440/#page","headline":"cf.tls_client_auth.cert_chain_rfc9440 · Cloudflare Ruleset Engine docs","description":"The mTLS client certificate chain (excluding the leaf certificate) encoded as a structured field list per RFC 9440.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_auth.cert_chain_rfc9440/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
