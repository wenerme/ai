---
title: cf.tls_client_auth.cert_subject_dn_legacy
description: The Distinguished Name (DN) of the owner (or requester) of the mTLS client certificate in a legacy format.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

#  cf.tls\_client\_auth.cert\_subject\_dn\_legacy 

`cf.tls_client_auth.cert_subject_dn_legacy` ` String ` 

The Distinguished Name (DN) of the owner (or requester) of the mTLS client certificate in a legacy format.

This field defaults to `""` if the connection does not use [mTLS authentication](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/).

Example value:

```

"/C=US/ST=Texas/L=Austin/O=Access/OU=Access Admins/CN=James Royal"


```

Categories: 
* Request
* mTLS

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
