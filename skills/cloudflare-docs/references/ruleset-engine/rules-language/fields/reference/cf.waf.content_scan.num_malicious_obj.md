---
title: cf.waf.content_scan.num_malicious_obj
description: The number of malicious content objects detected in the request (zero or greater).
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

#  cf.waf.content\_scan.num\_malicious\_obj 

`cf.waf.content_scan.num_malicious_obj` ` Integer ` 

The number of malicious content objects detected in the request (zero or greater).

Requires a Cloudflare Enterprise plan with [malicious uploads detection](https://developers.cloudflare.com/waf/detections/malicious-uploads/).

Example usage:

```

# Check if requests to a specific endpoint contain more than two malicious content objects

cf.waf.content_scan.num_malicious_obj > 2 and http.request.uri.path eq "/upload"


```

Categories: 
* Request

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
