---
title: Change origin and modify paths
description: Route requests to a different origin, prepend a directory to the URL path, and remove specific segments.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ URL rewrite ](https://developers.cloudflare.com/search/?tags=URL%20rewrite) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/snippets/examples/route-and-rewrite.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Change origin and modify paths

Reroute a request to a different origin and modify the URL path.

This example demonstrates how to use Cloudflare Snippets to:

* Reroute incoming requests to a different origin.
* Prepend a directory to the URL path.
* Remove specific segments from the URL path.

JavaScript

```

export default {

  async fetch(request) {

    // Clone the original request to create a new request object

    const newRequest = new Request(request);


    // Add a header to identify a rerouted request at the new origin

    newRequest.headers.set("X-Rerouted", "1");


    // Clone and parse the original URL

    const url = new URL(request.url);


    // Step 1: Reroute to a different origin

    url.hostname = "example.com"; // Change the hostname to the new origin


    // Step 2: Append a directory to the path

    url.pathname = `/new-path${url.pathname}`; // Prepend "/new-path" to the current path


    // Step 3: Remove a specific segment from the path

    url.pathname = url.pathname.replace("/remove-me", ""); // Rewrite `/remove-me/something` to `/something`


    // Fetch the modified request from the updated URL

    return await fetch(url, newRequest);

  },

};


```

This configuration will perform the following rewrites:

| Request URL                       | URL after rewrite                |
| --------------------------------- | -------------------------------- |
| https://subdomain.example.com/foo | https://example.com/new-path/foo |
| https://example.com/remove-me/bar | https://example.com/new-path/bar |
| https://example.net/remove-me     | https://example.com/new-path     |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/examples/","name":"Snippets examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/snippets/examples/route-and-rewrite/","name":"Change origin and modify paths"}}]}
```
