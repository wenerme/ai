---
title: Return information about the incoming request
description: Respond with information about the incoming request provided by Cloudflare’s global network.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Logging ](https://developers.cloudflare.com/search/?tags=Logging)[ Response modification ](https://developers.cloudflare.com/search/?tags=Response%20modification) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/snippets/examples/return-incoming-request-properties.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Return information about the incoming request

Respond with information about the incoming request provided by Cloudflare’s global network.

JavaScript

```

export default {

  async fetch(request) {

    // For any request, respond with JSON object containing all incoming request properties provided by Cloudflare network

    return Response.json(request.cf, {

      // Add new header to identify request was served by Snippets

      headers: {

        "x-snippets-hello": "Hello from Cloudflare Snippets",

      },

    });

  },

};


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/examples/","name":"Snippets examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/snippets/examples/return-incoming-request-properties/","name":"Return information about the incoming request"}}]}
```
