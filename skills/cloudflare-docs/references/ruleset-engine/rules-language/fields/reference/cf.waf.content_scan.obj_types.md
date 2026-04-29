---
title: cf.waf.content_scan.obj_types
description: An array of file types in the order the content objects were detected in the request.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

#  cf.waf.content\_scan.obj\_types 

`cf.waf.content_scan.obj_types` ` Array<String> ` 

An array of file types in the order the content objects were detected in the request.

If Cloudflare cannot determine the file type of a content object, the corresponding value in the `obj_types` array will be `application/octet-stream`.

Requires a Cloudflare Enterprise plan with [malicious uploads detection](https://developers.cloudflare.com/waf/detections/malicious-uploads/).

Example usage:

```

# Check if requests to a specific endpoint contain content objects other than PDFs

any(cf.waf.content_scan.obj_types[*] != "application/pdf") and http.request.uri.path eq "/upload"


```

Categories: 
* Request

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
