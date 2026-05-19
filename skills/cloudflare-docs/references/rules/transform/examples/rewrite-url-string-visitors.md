---
title: Rewrite URL query string
description: Create a transform rule to rewrite the request path from `/blog` to `/blog?sort-by=date`.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Rewrite URL query string

Create a transform rule to rewrite the request path from `/blog` to `/blog?sort-by=date`.

To rewrite a request to the `/blog` path to `/blog?sort-by=date`, create a URL rewrite rule with the following settings:

Text in **Expression Editor**:

```

http.request.uri.path == "/blog"


```

Text after **Query** \> **Rewrite to** \> _Static_:

```

sort-by=date


```

Additionally, set the path rewrite action of the same rule to _Preserve_ so that the URL path does not change.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/examples/","name":"Transform Rules examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/transform/examples/rewrite-url-string-visitors/","name":"Rewrite URL query string"}}]}
```
