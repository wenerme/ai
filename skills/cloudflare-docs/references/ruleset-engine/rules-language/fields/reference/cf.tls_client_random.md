---
title: cf.tls_client_random
description: The value of the 32-byte random value provided by the client in a [TLS handshake](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake), encoded in Base64.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/fields/index.yaml) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

#  cf.tls\_client\_random 

`cf.tls_client_random` ` String ` 

The value of the 32-byte random value provided by the client in a [TLS handshake](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake), encoded in Base64.

For more details, refer to [RFC 8446](https://datatracker.ietf.org/doc/html/rfc8446#section-4.1.2).

Example value:

```

"YWJjZA=="


```

Categories: 
* Request
* SSL/TLS

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
