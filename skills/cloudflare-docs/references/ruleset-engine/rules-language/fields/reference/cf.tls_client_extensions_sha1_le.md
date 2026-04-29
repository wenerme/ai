---
title: cf.tls_client_extensions_sha1_le
description: The SHA-1 fingerprint of TLS client extensions, encoded in Base64 using little-endian format.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

#  cf.tls\_client\_extensions\_sha1\_le 

`cf.tls_client_extensions_sha1_le` ` String ` 

The SHA-1 fingerprint of TLS client extensions, encoded in Base64 using little-endian format.

For the big-endian version of this field, refer to [cf.tls\_client\_extensions\_sha1](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fextensions%5Fsha1/).

Example value:

```

"7zIpdDU5pvFPPBI2/PCzqbaXnRA="


```

Categories: 
* Request
* SSL/TLS

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
