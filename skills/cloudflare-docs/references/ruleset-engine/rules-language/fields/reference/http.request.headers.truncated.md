---
title: http.request.headers.truncated
description: Indicates whether the HTTP request contains too many headers.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

#  http.request.headers.truncated 

`http.request.headers.truncated` ` Boolean ` 

Indicates whether the HTTP request contains too many headers.

When `true`, [http.request.headers](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers/), [http.request.headers.names](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers.names/), and [http.request.headers.values](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers.values/) may not contain all of the headers sent in the HTTP request.

Categories: 
* Request
* Headers

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers.truncated/#page","headline":"http.request.headers.truncated · Cloudflare Ruleset Engine docs","description":"Indicates whether the HTTP request contains too many headers.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers.truncated/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
