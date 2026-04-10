---
title: Route to a different origin based on origin response
description: If response to the original request is not `200 OK` or a redirect, send to another origin.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Redirects ](https://developers.cloudflare.com/search/?tags=Redirects) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/snippets/examples/serve-different-origin.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Route to a different origin based on origin response

If response to the original request is not `200 OK` or a redirect, send to another origin.

JavaScript

```

export default {

  async fetch(request) {

    // Send original request to the origin

    const response = await fetch(request);


    // If response is not 200 OK or a redirect, send to another origin

    if (!response.ok && !response.redirected) {

      // First, clone the original request to construct a new request

      const newRequest = new Request(request);

      // Add a header to identify a re-routed request at the new origin

      newRequest.headers.set("X-Rerouted", "1");

      // Clone the original URL

      const url = new URL(request.url);

      // Send request to a different origin / hostname

      url.hostname = "example.com";

      // Serve response to the new request from the origin

      return await fetch(url, newRequest);

    }


    // If response is 200 OK or a redirect, serve it

    return response;

  },

};


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/examples/","name":"Snippets examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/snippets/examples/serve-different-origin/","name":"Route to a different origin based on origin response"}}]}
```
