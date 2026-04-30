---
title: Remove response headers
description: Remove from response all headers that start with a certain name.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ Response modification ](https://developers.cloudflare.com/search/?tags=Response%20modification) 

# Remove response headers

Remove from response all headers that start with a certain name.

JavaScript

```

export default {

  async fetch(request) {

    // Define the prefix of the headers you want to remove

    const headerPrefix = "x-header-";


    // Receive response from the origin

    const response = await fetch(request);


    // Create a new Headers object to modify response headers

    const newHeaders = new Headers(response.headers);


    // Remove headers that start with the specified prefix

    for (const [key] of newHeaders.entries()) {

      if (key.startsWith(headerPrefix)) {

        newHeaders.delete(key);

      }

    }


    // Return the modified response with updated headers

    return new Response(response.body, {

      status: response.status,

      headers: newHeaders,

    });

  },

};


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/examples/","name":"Snippets examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/snippets/examples/remove-response-headers/","name":"Remove response headers"}}]}
```
