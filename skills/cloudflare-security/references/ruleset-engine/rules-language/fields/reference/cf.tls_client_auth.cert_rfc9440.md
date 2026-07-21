---
description: The mTLS client certificate encoded as a Structured Fields Byte Sequence per [RFC 9440](https://datatracker.ietf.org/doc/html/rfc9440).
title: cf.tls_client_auth.cert_rfc9440
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

#  cf.tls\_client\_auth.cert\_rfc9440

`cf.tls_client_auth.cert_rfc9440` ` String `

The mTLS client certificate encoded as a Structured Fields Byte Sequence per [RFC 9440](https://datatracker.ietf.org/doc/html/rfc9440).

Contains the DER-encoded, Base64-wrapped client leaf certificate formatted as an [RFC 9440](https://datatracker.ietf.org/doc/html/rfc9440#name-client-cert-http-header-fie) `Client-Cert` HTTP header value. The value is a Structured Fields Byte Sequence (the Base64 data prefixed and suffixed by `:`).

This field is populated regardless of the certificate validation result. Before using this value, verify the certificate status by checking [cf.tls\_client\_auth.cert\_verified](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fverified/) and [cf.tls\_client\_auth.cert\_revoked](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Frevoked/).

Returns `""` if no client certificate was presented or if the encoded value exceeds the 10 KiB size limit. Refer to [cf.tls\_client\_auth.cert\_rfc9440\_too\_large](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Frfc9440%5Ftoo%5Flarge/) to distinguish between these cases.

This field defaults to `""` if the connection does not use [mTLS authentication](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/).

Example value:

```txt
":MIIBqDCCAU6g......:"
```

Categories:
* Request
* mTLS

Was this helpful?

YesNo

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_auth.cert_rfc9440/#page","headline":"cf.tls_client_auth.cert_rfc9440 · Cloudflare Ruleset Engine docs","description":"The mTLS client certificate encoded as a Structured Fields Byte Sequence per RFC 9440.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_auth.cert_rfc9440/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
