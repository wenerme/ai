---
title: Remove a request header
description: Create a request header transform rule (part of Transform Rules) to remove the `cf-connecting-ip` HTTP header from the request.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Request modification ](https://developers.cloudflare.com/search/?tags=Request%20modification) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/transform/examples/remove-request-header.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Remove a request header

Create a request header transform rule (part of Transform Rules) to remove the `cf-connecting-ip` HTTP header from the request.

The following request header transform rule removes the `cf-connecting-ip` header from the HTTP request:

Text in **Expression Editor**:

```

starts_with(http.request.uri.path, "/private/")


```

Selected operation under **Modify request header**: _Remove_

**Header name**: `cf-connecting-ip`

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/examples/","name":"Transform Rules examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/transform/examples/remove-request-header/","name":"Remove a request header"}}]}
```
