---
title: cf.tls_client_auth.cert_verified
description: Returns `true` when an mTLS client presents a valid client certificate.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

#  cf.tls\_client\_auth.cert\_verified 

`cf.tls_client_auth.cert_verified` ` Boolean ` 

Returns `true` when an mTLS client presents a valid client certificate.

Also returns `true` when a client presents a valid certificate that was revoked (refer to [cf.tls\_client\_auth.cert\_revoked](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Frevoked/)).

This field defaults to `false` if the connection does not use [mTLS authentication](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/).

Categories: 
* Request
* mTLS

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_auth.cert_verified/#page","headline":"cf.tls_client_auth.cert_verified · Cloudflare Ruleset Engine docs","description":"Returns true when an mTLS client presents a valid client certificate.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls_client_auth.cert_verified/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
