---
description: The Distinguished Name (DN) of the owner (or requester) of the mTLS client certificate in a legacy format.
title: cf.tls_client_auth.cert_subject_dn_legacy
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.tls\_client\_auth.cert\_subject\_dn\_legacy

`cf.tls_client_auth.cert_subject_dn_legacy` `String`

The Distinguished Name (DN) of the owner (or requester) of the mTLS client certificate in a legacy format.

This field defaults to `""` if the connection does not use [mTLS authentication](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/).

Example value:

```txt
"/C=US/ST=Texas/L=Austin/O=Access/OU=Access Admins/CN=James Royal"
```

Categories:
* Request
* mTLS

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_auth.cert_subject_dn_legacy/#page","headline":"cf.tls_client_auth.cert_subject_dn_legacy · Cloudflare Ruleset Engine docs","description":"The Distinguished Name (DN) of the owner (or requester) of the mTLS client certificate in a legacy format.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_auth.cert_subject_dn_legacy/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
