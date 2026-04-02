---
title: Remove a response header
description: Create a response header transform rule (part of Transform Rules) to remove the `cf-connecting-ip` HTTP header from the response.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Response modification ](https://developers.cloudflare.com/search/?tags=Response%20modification) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/transform/examples/remove-response-header.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Remove a response header

Create a response header transform rule (part of Transform Rules) to remove the `cf-connecting-ip` HTTP header from the response.

The following response header transform rule removes the `cf-connecting-ip` header from the HTTP response:

Text in **Expression Editor**:

```

starts_with(http.request.uri.path, "/private/")


```

Selected operation under **Modify response header**: _Remove_

**Header name**: `cf-connecting-ip`

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/examples/","name":"Transform Rules examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/transform/examples/remove-response-header/","name":"Remove a response header"}}]}
```
