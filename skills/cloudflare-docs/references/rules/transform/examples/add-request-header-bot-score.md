---
title: Add a request header with the current bot score
description: Create a request header transform rule to add a `X-Bot-Score` HTTP header to the request with the current bot score.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Add a request header with the current bot score

Create a request header transform rule to add a `X-Bot-Score` HTTP header to the request with the current bot score.

The following request header transform rule adds a header named `X-Bot-Score` with the current bot score to the HTTP request:

Text in **Expression Editor**:

```

starts_with(http.request.uri.path, "/en/")


```

Selected operation under **Modify request header**: _Set dynamic_

**Header name**: `X-Bot-Score`

**Value**: `to_string(cf.bot_management.score)`

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/examples/","name":"Transform Rules examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/transform/examples/add-request-header-bot-score/","name":"Add a request header with the current bot score"}}]}
```
