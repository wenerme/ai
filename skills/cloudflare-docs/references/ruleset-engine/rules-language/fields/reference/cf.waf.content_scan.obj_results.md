---
title: cf.waf.content_scan.obj_results
description: An array of scan results in the order the content objects were detected in the request.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

#  cf.waf.content\_scan.obj\_results 

`cf.waf.content_scan.obj_results` ` Array<String> ` 

An array of scan results in the order the content objects were detected in the request.

The possible values are: `clean`, `suspicious`, `infected`, and `not scanned`.

Requires a Cloudflare Enterprise plan with [malicious uploads detection](https://developers.cloudflare.com/waf/detections/malicious-uploads/).

Example usage:

```

# Check if requests to a specific endpoint contain any suspicious or infected content objects

any(cf.waf.content_scan.obj_results[*] in {"suspicious" "infected"}) and http.request.uri.path eq "/upload"


```

Categories: 
* Request

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
